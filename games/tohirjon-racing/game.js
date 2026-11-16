(() => {
  const maps = [
    { name: "TOSHKENT", sub: "Zamonaviy shahar", sky: 0x75b9e8, ground: 0x527c48, road: 0x30343a, buildings: [0x7895a8,0xb5c4cb,0x5e7d91], landmark: "tower" },
    { name: "SAMARQAND", sub: "Registon maydoni", sky: 0xf0b879, ground: 0x8a9b54, road: 0x4a4540, buildings: [0xb68a58,0x397b91,0xd5ad72], landmark: "dome" },
    { name: "BUXORO", sub: "Eski shahar", sky: 0xe9b77b, ground: 0x9b8954, road: 0x51483f, buildings: [0xb17a48,0x8f6040,0xc99a5d], landmark: "minaret" },
    { name: "FARG‘ONA", sub: "Yashil vodiy", sky: 0x83c9ef, ground: 0x3c9655, road: 0x343b3d, buildings: [0x83a9a0,0x6c8795,0xc0c8b5], landmark: "trees" },
    { name: "NAMANGAN", sub: "Gullar shahri", sky: 0x91c9e8, ground: 0x4b9651, road: 0x34383c, buildings: [0x9caeae,0x6c879b,0xd3c6a6], landmark: "trees" },
    { name: "XIVA", sub: "Ichan qal’a", sky: 0xe9bd83, ground: 0x9c8b5c, road: 0x51473b, buildings: [0xb98751,0x9e7146,0xd0a66d], landmark: "wall" }
  ];
  const cars = [
    { name: "NEON GT", color: 0x00c9ff, emoji: "🏎️" },
    { name: "TURBO X", color: 0xff342e, emoji: "🚗" },
    { name: "GOLD VIPER", color: 0xffb51b, emoji: "🏁" }
  ];
  // Ob-havo: kunduz, kechqurun, tun, yomg'ir
  const weathers = [
    { name: "KUNDUZ", emoji: "☀️", light: 1.15, sun: 1.1, tint: null, fog: [35, 125] },
    { name: "TUN", emoji: "🌙", light: 0.35, sun: 0.15, tint: 0x0b1530, fog: [25, 95], night: true },
    { name: "YOMG‘IR", emoji: "🌧️", light: 0.75, sun: 0.4, tint: 0x6f7f8c, fog: [15, 70], rain: true }
  ];

  const $ = id => document.getElementById(id);
  let mapIndex = 0, carIndex = 0, weatherIndex = 0, mode = 1;
  let scene, camera, renderer, clock, rain = null;
  let roadMarks = [], buildings = [], traffic = [], coinMeshes = [];
  let racers = [];   // o'yinchilar (1 yoki 2 ta)
  let running = false, paused = false, distance = 0;
  let baseSpeed = 31, speed = 31, spawnTimer = 0, coinTimer = 0;
  let keys = {}, animationId = 0, lastTime = 0;

  // 1 kishilikda 3 polosa, 2 kishilikda 4 polosa
  const lanesFor = m => (m === 2 ? [-4.5, -1.5, 1.5, 4.5] : [-4, 0, 4]);
  let LANES = lanesFor(1);

  // ===== Menyu =====
  function pickGrid(grid, items, render, onPick) {
    items.forEach((item, i) => {
      const b = document.createElement("button");
      b.className = grid.id === "mapGrid" ? "map-card" : "car-card";
      if (i === 0) b.classList.add("selected");
      b.innerHTML = render(item);
      b.onclick = () => { onPick(i); [...grid.children].forEach((x, j) => x.classList.toggle("selected", j === i)); };
      grid.appendChild(b);
    });
  }
  pickGrid($("mapGrid"), maps, m => `<strong>${m.name}</strong><span>${m.sub}</span>`, i => mapIndex = i);
  pickGrid($("carGrid"), cars, c => `<div class="car-preview">${c.emoji}</div><strong>${c.name}</strong>`, i => carIndex = i);
  pickGrid($("weatherGrid"), weathers, w => `<div class="car-preview">${w.emoji}</div><strong>${w.name}</strong>`, i => weatherIndex = i);
  [...$("modeGrid").children].forEach(b => b.onclick = () => {
    mode = Number(b.dataset.mode);
    [...$("modeGrid").children].forEach(x => x.classList.toggle("selected", x === b));
    $("carHint").textContent = mode === 2 ? "(1-o'yinchi; 2-o'yinchi — oq-sariq)" : "(1-o'yinchi)";
  });

  // ===== 3D yordamchilar =====
  function mat(color, roughness=0.8, metalness=0) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  }
  function box(w,h,d, material, x=0,y=0,z=0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material);
    mesh.position.set(x,y,z); mesh.castShadow = true; mesh.receiveShadow = true; return mesh;
  }
  function makeCar(color, withLights=false) {
    const group = new THREE.Group();
    // Mashinaning orqasi (+z) kameraga qaragan: orqa chiroqlar qizil, old faralar oq
    const bodyMat = mat(color, .3, .55), glass = mat(0x142b3b,.18,.5), tire = mat(0x090d12), light = new THREE.MeshBasicMaterial({color:0xff3b30});
    group.add(box(1.55,.48,2.8,bodyMat,0,.55,0));
    group.add(box(1.15,.48,1.25,glass,0,.94,-.12));
    group.add(box(1.65,.16,.55,bodyMat,0,.83,1.02));
    group.add(box(1.55,.13,.35,mat(0x161d28),0,.34,-1.2));
    for (const x of [-.83,.83]) for (const z of [-.88,.9]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.2,16), tire);
      wheel.rotation.z = Math.PI/2; wheel.position.set(x,.36,z); group.add(wheel);
    }
    group.add(box(.34,.13,.08,light,-.48,.57,1.42));
    group.add(box(.34,.13,.08,light,.48,.57,1.42));
    // Old faralar
    const front = new THREE.MeshBasicMaterial({color:0xfff3bd});
    group.add(box(.3,.12,.06,front,-.5,.6,-1.42));
    group.add(box(.3,.12,.06,front,.5,.6,-1.42));
    if (withLights) {
      // O'yinchi mashinasining faralari
      const head = new THREE.SpotLight(0xfff2c0, 2.2, 40, 0.45, 0.5);
      head.position.set(0, 1, -1.5); head.target.position.set(0, 0, -20);
      group.add(head); group.add(head.target);
    }
    group.userData.body = group.children[0];
    return group;
  }
  function makeTree(x,z,scale=1) {
    const g = new THREE.Group();
    g.add(box(.28,1.5,.28,mat(0x65452b),0,.75,0));
    const crown = new THREE.Mesh(new THREE.SphereGeometry(.85,10,9),mat(0x287443));
    crown.position.y=1.8; crown.scale.set(1,1.2,1); g.add(crown);
    g.position.set(x,0,z); g.scale.setScalar(scale); scene.add(g); buildings.push(g);
  }
  function makeBuilding(x,z,material,seed=1) {
    const g = new THREE.Group();
    const h = 4 + (seed%5)*1.4, w=2.8+(seed%3)*.7;
    g.add(box(w,h,3.5,material,0,h/2,0));
    // Tunda derazalar yonib turadi
    const night = weathers[weatherIndex].night;
    const winMat = night ? new THREE.MeshBasicMaterial({color:0xffd56a}) : mat(0x243e52,.4,.15);
    const darkWin = mat(0x243e52,.4,.15);
    let k = 0;
    for(let y=1.1;y<h-.5;y+=1.25) for(let xx=-w/2+.55;xx<w/2-.2;xx+=.85)
      g.add(box(.34,.48,.04,(night && (k++ % 3)) ? winMat : darkWin,xx,y,1.77));
    g.position.set(x,0,z); scene.add(g); buildings.push(g);
    return g;
  }
  function addLandmark(side,z) {
    const m = maps[mapIndex], x=side*13;
    if(m.landmark==="tower") {
      const g=new THREE.Group();
      g.add(box(2.2,10,2.2,mat(0x9db2bd),0,5,0));
      g.add(box(2.7,.35,2.7,mat(0xdce8ed),0,8.2,0));
      g.add(box(1.2,2,1.2,mat(0x6b8798),0,10,0));
      g.position.set(x,0,z); scene.add(g); buildings.push(g);
    } else if(m.landmark==="dome" || m.landmark==="minaret") {
      const g=new THREE.Group();
      g.add(box(4,3,3.5,mat(0xb9824e),0,1.5,0));
      const dome=new THREE.Mesh(new THREE.SphereGeometry(1.8,16,10,0,Math.PI*2,0,Math.PI/2),mat(m.landmark==="dome"?0x168b9d:0x9c744b));
      dome.position.y=3; dome.scale.z=.9; g.add(dome);
      if(m.landmark==="minaret") g.add(box(1.2,7,1.2,mat(0xc99b62),0,6,0));
      g.position.set(x,0,z); scene.add(g); buildings.push(g);
    } else if(m.landmark==="wall") {
      const g=new THREE.Group();
      g.add(box(5,5,1.5,mat(0xb9854e),0,2.5,0));
      g.add(box(5.4,.5,1.8,mat(0xd2a56d),0,5,0));
      g.position.set(x,0,z); scene.add(g); buildings.push(g);
    } else makeTree(x,z,1.5);
  }
  function makeStreetLamp(x, z) {
    const g = new THREE.Group();
    g.add(box(.15, 5, .15, mat(0x555c66), 0, 2.5, 0));
    g.add(box(1.4, .12, .2, mat(0x555c66), -Math.sign(x) * .7, 5, 0));
    const bulb = box(.4, .15, .3, new THREE.MeshBasicMaterial({ color: 0xfff1b0 }), -Math.sign(x) * 1.3, 4.9, 0);
    g.add(bulb);
    const glow = new THREE.PointLight(0xffe6a0, 1.2, 14);
    glow.position.set(-Math.sign(x) * 1.3, 4.5, 0);
    g.add(glow);
    g.position.set(x, 0, z); scene.add(g); buildings.push(g);
  }

  function setupWorld() {
    const m = maps[mapIndex], w = weathers[weatherIndex];
    roadMarks = []; buildings = [];
    // Ob-havoga qarab osmon rangi o'zgaradi
    const sky = new THREE.Color(m.sky);
    if (w.tint !== null) sky.lerp(new THREE.Color(w.tint), w.night ? 0.85 : 0.6);
    scene = new THREE.Scene();
    scene.background = sky;
    scene.fog = new THREE.Fog(sky, w.fog[0], w.fog[1]);
    camera = new THREE.PerspectiveCamera(62, innerWidth/innerHeight,.1,220);
    camera.position.set(0, mode === 2 ? 8.5 : 7.5, mode === 2 ? 14.5 : 13.5);
    camera.lookAt(0,1,-10);
    renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
    renderer.setSize(innerWidth,innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const game = $("gameScreen");
    const old=game.querySelector("canvas"); if(old) old.remove();
    game.insertBefore(renderer.domElement, game.firstChild);

    scene.add(new THREE.HemisphereLight(0xffffff,0x4a5a42,w.light));
    const sun=new THREE.DirectionalLight(0xffffff,w.sun); sun.position.set(-8,18,9); sun.castShadow=true; scene.add(sun);

    const ground= new THREE.Mesh(new THREE.PlaneGeometry(180,220),mat(m.ground));
    ground.rotation.x=-Math.PI/2; ground.position.set(0,-.12,-70); ground.receiveShadow=true; scene.add(ground);
    // Yomg'irda yo'l yaltiroq bo'ladi
    const road = new THREE.Mesh(new THREE.PlaneGeometry(12.6,220), w.rain ? mat(m.road, .25, .5) : mat(m.road));
    road.rotation.x=-Math.PI/2; road.position.set(0,0,-70); road.receiveShadow=true; scene.add(road);
    const edgeMat=mat(0xf2f2e9);
    for(const x of [-6.3,6.3]) { const edge=box(.16,.04,220,edgeMat,x,.04,-70); scene.add(edge); }
    // Polosa chiziqlari polosalar orasida turadi
    const markX = [];
    for (let i = 0; i < LANES.length - 1; i++) markX.push((LANES[i] + LANES[i + 1]) / 2);
    for(let z=-165;z<30;z+=10) {
      for(const x of markX) { const mark=box(.12,.035,4,mat(0xf4f2df),x,.05,z); scene.add(mark); roadMarks.push(mark); }
    }
    for(let z=-170;z<25;z+=22) {
      const idx=Math.abs(Math.floor(z/22));
      makeBuilding(-10-(idx%3)*1.3,z,mat(m.buildings[idx%3]),idx+1);
      makeBuilding(10+(idx%2)*1.4,z-8,mat(m.buildings[(idx+1)%3]),idx+3);
      if(idx%3===0) addLandmark(idx%2===0?-1:1,z-14);
      if (w.night && idx % 2 === 0) makeStreetLamp(idx % 4 === 0 ? -7.2 : 7.2, z - 4);
    }

    // O'yinchilar
    racers = [];
    const colors = [cars[carIndex].color, 0xf2f2f2];
    const startLanes = mode === 2 ? [1, 2] : [1];
    for (let i = 0; i < mode; i++) {
      const mesh = makeCar(colors[i], w.night);
      if (i === 1) {
        // 2-o'yinchi mashinasiga sariq chiziq
        mesh.add(box(.35, .02, 2.82, mat(0xffb51b, .4), 0, .8, 0));
      }
      mesh.position.set(LANES[startLanes[i]], 0, 5);
      scene.add(mesh);
      racers.push({ id: i, mesh, lane: startLanes[i], lives: 3, coins: 0, score: 0, alive: true, invincible: 0, jump: 0, jumpCool: 0 });
    }

    // Yomg'ir tomchilari
    rain = null;
    if (w.rain) {
      const n = 1500, pos = new Float32Array(n * 6);
      for (let i = 0; i < n; i++) {
        const x = (Math.random() - .5) * 60, y = Math.random() * 25, z = -Math.random() * 80 + 10;
        pos.set([x, y, z, x, y - .6, z], i * 6);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      rain = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xaaccee, transparent: true, opacity: .55 }));
      scene.add(rain);
    }

    clock=new THREE.Clock();
    traffic=[]; coinMeshes=[];
  }
  function createTraffic() {
    const colors=[0xff302b,0xf4f1e8,0x263eae,0xffb21c,0x222831];
    const car=makeCar(colors[Math.floor(Math.random()*colors.length)]);
    const laneX=LANES[Math.floor(Math.random()*LANES.length)];
    car.position.set(laneX,0,-95);
    car.userData.speed=12+Math.random()*9;
    scene.add(car); traffic.push(car);
  }
  function createCoin() {
    const coin=new THREE.Mesh(new THREE.TorusGeometry(.42,.13,8,18),new THREE.MeshStandardMaterial({color:0xffd21c,metalness:.8,roughness:.2,emissive:0x704400}));
    coin.position.set(LANES[Math.floor(Math.random()*LANES.length)],1.15,-95);
    coin.rotation.x=Math.PI/2; scene.add(coin); coinMeshes.push(coin);
  }
  function showMessage(text) {
    const el=$("message"); el.textContent=text; el.classList.remove("hidden");
    clearTimeout(showMessage.t);
    showMessage.t = setTimeout(()=>el.classList.add("hidden"),850);
  }
  const hearts = n => "❤️".repeat(Math.max(0, n)) + "🖤".repeat(3 - Math.max(0, n));
  function updateHud() {
    const p1 = racers[0];
    $("distance").textContent=Math.floor(distance)+" m";
    $("score").textContent=p1.score;
    $("coins").textContent=p1.coins;
    $("speed").textContent=Math.floor(speed*4.1)+" km/h";
    $("lives1").textContent=hearts(p1.lives);
    $("p1Label").textContent = mode === 2 ? "1-O'YINCHI" : "JON";
    $("p2Pill").classList.toggle("hidden", mode !== 2);
    if (mode === 2) $("p2Info").textContent = hearts(racers[1].lives) + " · " + racers[1].score;
  }
  function finish() {
    running=false; cancelAnimationFrame(animationId);
    if (mode === 1) {
      $("resultTitle").textContent = "POYGA TUGADI";
      $("resultBody").innerHTML = `<p>Hisob: <b>${racers[0].score}</b></p><p>Yig‘ilgan coin: <b>${racers[0].coins}</b></p><p>Masofa: <b>${Math.floor(distance)} m</b></p>`;
    } else {
      const [a, b] = racers;
      const title = a.score === b.score ? "DURANG!" : (a.score > b.score ? "1-O'YINCHI YUTDI!" : "2-O'YINCHI YUTDI!");
      $("resultTitle").textContent = title;
      $("resultBody").innerHTML = `<p>1-o'yinchi: <b>${a.score}</b> (coin: ${a.coins})</p><p>2-o'yinchi: <b>${b.score}</b> (coin: ${b.coins})</p>`;
    }
    $("resultScreen").classList.remove("hidden");
  }

  // Mashinaga urilganda: jon kamayadi, qisqa vaqt himoya
  function crash(r) {
    r.lives--;
    r.invincible = 1.6;
    showMessage(mode === 2 ? `${r.id + 1}-O'YINCHI URILDI!` : "URILDINGIZ!");
    if (r.lives <= 0) {
      r.alive = false;
      r.mesh.visible = false;
    }
  }

  function tick(now) {
    if(!running || paused) return;
    animationId=requestAnimationFrame(tick);
    const dt=Math.min((now-lastTime)/1000 || 0, .04); lastTime=now;

    // Tezlik masofa bilan asta-sekin oshadi
    baseSpeed = Math.min(52, 31 + distance / 180);
    const nitro = mode === 1 && (keys[" "] || keys.nitro);
    speed = baseSpeed * (nitro ? 1.65 : 1);
    distance += speed*dt*1.8;

    racers.forEach(r => {
      if (!r.alive) return;
      const target = LANES[r.lane];
      r.mesh.position.x += (target - r.mesh.position.x) * Math.min(1, dt * 9);
      r.mesh.rotation.z = (target - r.mesh.position.x) * -.035;
      // Sakrash: mashina yoyday ko'tarilib tushadi
      r.jumpCool = Math.max(0, r.jumpCool - dt);
      if (r.jump > 0) {
        r.jump = Math.max(0, r.jump - dt);
        const t = 1 - r.jump / 0.8;
        r.mesh.position.y = Math.sin(t * Math.PI) * 2.4;
        r.mesh.rotation.x = Math.sin(t * Math.PI * 2) * -.15;
      } else { r.mesh.position.y = 0; r.mesh.rotation.x = 0; }
      r.invincible = Math.max(0, r.invincible - dt);
      r.mesh.visible = r.invincible === 0 || Math.floor(r.invincible * 10) % 2 === 0;
      r.score = Math.floor(distance / 2) + r.coins * 25;
    });

    roadMarks.forEach(mark=>{ mark.position.z+=speed*dt; if(mark.position.z>18) mark.position.z=-180; });
    buildings.forEach(b=>{ b.position.z+=speed*dt*.82; if(b.position.z>22) b.position.z-=198; });
    if (rain) { rain.position.y -= dt * 30; if (rain.position.y < -12) rain.position.y = 0; rain.position.z = (rain.position.z + speed * dt) % 10; }

    spawnTimer+=dt; coinTimer+=dt;
    const spawnEvery = Math.max(.45, 1.25 - distance / 900) / (mode === 2 ? 1.35 : 1);
    if(spawnTimer>spawnEvery){createTraffic();spawnTimer=0;}
    if(coinTimer>1.2){createCoin();coinTimer=0;}

    for (let i = traffic.length - 1; i >= 0; i--) {
      const car = traffic[i];
      car.position.z+=(speed-car.userData.speed)*dt;
      if(car.position.z>15){scene.remove(car);traffic.splice(i,1);continue;}
      racers.forEach(r => {
        if (!r.alive || r.invincible > 0 || r.mesh.position.y > 1.1) return; // sakrayotgan mashina ustidan o'tadi
        if(Math.abs(car.position.z-r.mesh.position.z)<2.0 && Math.abs(car.position.x-r.mesh.position.x)<1.35) crash(r);
      });
    }
    for (let i = coinMeshes.length - 1; i >= 0; i--) {
      const coin = coinMeshes[i];
      coin.position.z+=speed*dt; coin.rotation.z+=dt*3;
      if(coin.position.z>15){scene.remove(coin);coinMeshes.splice(i,1);continue;}
      const taker = racers.find(r => r.alive && Math.abs(coin.position.z-r.mesh.position.z)<1.8 && Math.abs(coin.position.x-r.mesh.position.x)<1.5);
      if(taker){
        taker.coins++; scene.remove(coin); coinMeshes.splice(i,1);
        showMessage(mode === 2 ? `${taker.id + 1}-O'YINCHI +25 COIN!` : "+25 COIN!");
      }
    }

    // Kamera tirik o'yinchilar o'rtasiga qaraydi
    const alive = racers.filter(r => r.alive);
    const focusX = alive.length ? alive.reduce((s, r) => s + r.mesh.position.x, 0) / alive.length : 0;
    camera.position.x+=(focusX*.13-camera.position.x)*dt*2;
    camera.lookAt(focusX*.12,1,-10);
    updateHud();
    renderer.render(scene,camera);

    if (alive.length === 0) finish();
  }
  function startGame() {
    $("menu").classList.add("hidden"); $("resultScreen").classList.add("hidden"); $("pauseScreen").classList.add("hidden");
    $("gameScreen").classList.remove("hidden");
    $("cityLabel").textContent = maps[mapIndex].name + " · " + weathers[weatherIndex].emoji + (mode === 2 ? " · 2 O'YINCHI" : "");
    $("mobileControls").style.display = mode === 2 ? "none" : "";
    if(renderer){renderer.dispose(); const old=$("gameScreen").querySelector("canvas"); if(old)old.remove();}
    LANES = lanesFor(mode);
    distance=0; baseSpeed=31; speed=31; paused=false; spawnTimer=0; coinTimer=0;
    setupWorld(); running=true; lastTime=performance.now(); updateHud(); animationId=requestAnimationFrame(tick);
  }
  function pause() { if(!running)return; paused=true; $("pauseScreen").classList.remove("hidden"); }
  function resume() { paused=false; $("pauseScreen").classList.add("hidden"); lastTime=performance.now(); animationId=requestAnimationFrame(tick); }
  function backMenu() {
    running=false; paused=false; cancelAnimationFrame(animationId);
    $("pauseScreen").classList.add("hidden"); $("resultScreen").classList.add("hidden");
    $("gameScreen").classList.add("hidden"); $("menu").classList.remove("hidden");
  }

  // ===== Boshqaruv =====
  function moveLane(r, dir) {
    if (!r || !r.alive || !running || paused) return;
    const next = Math.max(0, Math.min(LANES.length - 1, r.lane + dir));
    // Ikkinchi o'yinchi turgan polosaga o'tib bo'lmaydi
    if (racers.some(o => o !== r && o.alive && o.lane === next)) return;
    r.lane = next;
  }
  function jump(r) {
    if (!r || !r.alive || !running || paused || r.jump > 0 || r.jumpCool > 0) return;
    r.jump = 0.8; r.jumpCool = 1.6;
  }
  function bindHold(id, key, onPress) {
    const el=$(id);
    el.addEventListener("pointerdown",e=>{e.preventDefault();keys[key]=true;el.setPointerCapture(e.pointerId);if(onPress)onPress();});
    ["pointerup","pointercancel","lostpointercapture"].forEach(ev=>el.addEventListener(ev,()=>keys[key]=false));
  }
  bindHold("leftBtn","left",()=>moveLane(racers[0],-1));
  bindHold("rightBtn","right",()=>moveLane(racers[0],1));
  bindHold("nitroBtn","nitro");
  $("startBtn").onclick=startGame;
  $("pauseBtn").onclick=pause; $("resumeBtn").onclick=resume;
  $("restartBtn").onclick=startGame; $("againBtn").onclick=startGame;
  $("menuBtn").onclick=backMenu; $("resultMenuBtn").onclick=backMenu;
  window.addEventListener("keydown",e=>{
    if(["ArrowLeft","ArrowRight"," ","ArrowUp","ArrowDown"].includes(e.key))e.preventDefault();
    keys[e.key]=true;
    if(e.key==="Escape" && running && !paused){pause();return;}
    if(e.key==="Escape" && paused){resume();return;}
    if (e.repeat) return;
    const k = e.key.toLowerCase();
    const p1 = racers[0], arrowsOwner = mode === 2 ? racers[1] : racers[0];
    if (k === "a") moveLane(p1, -1);
    if (k === "d") moveLane(p1, 1);
    if (k === "w") jump(p1);
    if (e.key === "ArrowLeft") moveLane(arrowsOwner, -1);
    if (e.key === "ArrowRight") moveLane(arrowsOwner, 1);
    if (e.key === "ArrowUp") jump(arrowsOwner);
  });
  window.addEventListener("keyup",e=>keys[e.key]=false);
  window.addEventListener("resize",()=>{
    if(camera&&renderer){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
  });
})();
