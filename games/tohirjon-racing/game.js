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

  const $ = id => document.getElementById(id);
  let mapIndex = 0, carIndex = 0, scene, camera, renderer, player, clock;
  let road, roadMarks = [], buildings = [], traffic = [], coinMeshes = [], particles = [];
  let running = false, paused = false, lane = 1, score = 0, coins = 0, distance = 0;
  let baseSpeed = 31, speed = 31, nitro = false, spawnTimer = 0, coinTimer = 0;
  let keys = {}, animationId = 0, lastTime = 0;

  const mapGrid = $("mapGrid"), carGrid = $("carGrid");
  maps.forEach((m, i) => {
    const b = document.createElement("button");
    b.className = "map-card" + (i === 0 ? " selected" : "");
    b.innerHTML = `<strong>${m.name}</strong><span>${m.sub}</span>`;
    b.onclick = () => { mapIndex = i; [...mapGrid.children].forEach((x,j)=>x.classList.toggle("selected",j===i)); };
    mapGrid.appendChild(b);
  });
  cars.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "car-card" + (i === 0 ? " selected" : "");
    b.innerHTML = `<div class="car-preview">${c.emoji}</div><strong>${c.name}</strong>`;
    b.onclick = () => { carIndex = i; [...carGrid.children].forEach((x,j)=>x.classList.toggle("selected",j===i)); };
    carGrid.appendChild(b);
  });

  function mat(color, roughness=0.8, metalness=0) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
  }
  function box(w,h,d, material, x=0,y=0,z=0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), material);
    mesh.position.set(x,y,z); mesh.castShadow = true; mesh.receiveShadow = true; return mesh;
  }
  function makeCar(color) {
    const group = new THREE.Group();
    const bodyMat = mat(color, .3, .55), glass = mat(0x142b3b,.18,.5), tire = mat(0x090d12), light = new THREE.MeshBasicMaterial({color:0xfff3bd});
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
    const winMat = mat(0x243e52,.4,.15);
    for(let y=1.1;y<h-.5;y+=1.25) for(let xx=-w/2+.55;xx<w/2-.2;xx+=.85)
      g.add(box(.34,.48,.04,winMat,xx,y,1.77));
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
  function setupWorld() {
    const m=maps[mapIndex];
    scene = new THREE.Scene();
    scene.background = new THREE.Color(m.sky);
    scene.fog = new THREE.Fog(m.sky, 35, 125);
    camera = new THREE.PerspectiveCamera(62, innerWidth/innerHeight,.1,220);
    camera.position.set(0,7.5,13.5);
    camera.lookAt(0,1,-10);
    renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
    renderer.setSize(innerWidth,innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const game = $("gameScreen");
    const old=game.querySelector("canvas"); if(old) old.remove();
    game.insertBefore(renderer.domElement, game.firstChild);

    scene.add(new THREE.HemisphereLight(0xffffff,0x4a5a42,1.15));
    const sun=new THREE.DirectionalLight(0xffffff,1.1); sun.position.set(-8,18,9); sun.castShadow=true; scene.add(sun);

    const ground= new THREE.Mesh(new THREE.PlaneGeometry(180,220),mat(m.ground));
    ground.rotation.x=-Math.PI/2; ground.position.set(0,-.12,-70); ground.receiveShadow=true; scene.add(ground);
    road = new THREE.Mesh(new THREE.PlaneGeometry(12,220),mat(m.road));
    road.rotation.x=-Math.PI/2; road.position.set(0,0,-70); road.receiveShadow=true; scene.add(road);
    const edgeMat=mat(0xf2f2e9);
    for(const x of [-6,6]) { const edge=box(.16,.04,220,edgeMat,x,.04,-70); scene.add(edge); }
    for(let z=-165;z<30;z+=10) {
      for(const x of [-2,2]) { const mark=box(.12,.035,4,mat(0xf4f2df),x,.05,z); scene.add(mark); roadMarks.push(mark); }
    }
    for(let z=-170;z<25;z+=22) {
      const idx=Math.abs(Math.floor(z/22));
      makeBuilding(-10-(idx%3)*1.3,z,mat(m.buildings[idx%3]),idx+1);
      makeBuilding(10+(idx%2)*1.4,z-8,mat(m.buildings[(idx+1)%3]),idx+3);
      if(idx%3===0) addLandmark(idx%2===0?-1:1,z-14);
    }
    player=makeCar(cars[carIndex].color); player.position.set(0,0,5); scene.add(player);
    clock=new THREE.Clock();
    traffic=[]; coinMeshes=[]; particles=[]; buildings=buildings;
  }
  function createTraffic() {
    const colors=[0xff302b,0xf4f1e8,0x263eae,0xffb21c,0x222831];
    const car=makeCar(colors[Math.floor(Math.random()*colors.length)]);
    const laneX=[-4,0,4][Math.floor(Math.random()*3)];
    car.position.set(laneX,0,-95);
    car.userData.speed=12+Math.random()*9;
    scene.add(car); traffic.push(car);
  }
  function createCoin() {
    const coin=new THREE.Mesh(new THREE.TorusGeometry(.42,.13,8,18),new THREE.MeshStandardMaterial({color:0xffd21c,metalness:.8,roughness:.2,emissive:0x704400}));
    coin.position.set([-4,0,4][Math.floor(Math.random()*3)],1.15,-95);
    coin.rotation.x=Math.PI/2; scene.add(coin); coinMeshes.push(coin);
  }
  function showMessage(text) {
    const el=$("message"); el.textContent=text; el.classList.remove("hidden");
    setTimeout(()=>el.classList.add("hidden"),850);
  }
  function updateHud() {
    $("distance").textContent=Math.floor(distance)+" m";
    $("score").textContent=score;
    $("coins").textContent=coins;
    $("speed").textContent=Math.floor(speed*4.1)+" km/h";
  }
  function finish() {
    running=false; cancelAnimationFrame(animationId);
    $("finalScore").textContent=score; $("finalCoins").textContent=coins;
    $("resultScreen").classList.remove("hidden");
  }
  function tick(now) {
    if(!running || paused) return;
    animationId=requestAnimationFrame(tick);
    const dt=Math.min((now-lastTime)/1000 || 0, .04); lastTime=now;
    const targetLane=[-4,0,4][lane];
    player.position.x += (targetLane-player.position.x)*Math.min(1,dt*9);
    player.rotation.z=(targetLane-player.position.x)*-.035;
    const boost=nitro?1.65:1;
    speed=baseSpeed*boost;
    distance+=speed*dt*1.8; score=Math.floor(distance/2)+coins*25;
    roadMarks.forEach(mark=>{ mark.position.z+=speed*dt; if(mark.position.z>18) mark.position.z=-180; });
    buildings.forEach(b=>{ b.position.z+=speed*dt*.82; if(b.position.z>22) b.position.z-=198; });
    spawnTimer+=dt; coinTimer+=dt;
    if(spawnTimer>Math.max(.55,1.25-distance/900)){createTraffic();spawnTimer=0;}
    if(coinTimer>1.35){createCoin();coinTimer=0;}
    traffic.forEach((car,i)=>{
      car.position.z+=(speed-car.userData.speed)*dt;
      if(car.position.z>15){scene.remove(car);traffic.splice(i,1);return;}
      if(Math.abs(car.position.z-player.position.z)<2.0 && Math.abs(car.position.x-player.position.x)<1.35){finish();}
    });
    coinMeshes.forEach((coin,i)=>{
      coin.position.z+=speed*dt; coin.rotation.z+=dt*3;
      if(coin.position.z>15){scene.remove(coin);coinMeshes.splice(i,1);return;}
      if(Math.abs(coin.position.z-player.position.z)<1.8 && Math.abs(coin.position.x-player.position.x)<1.5){
        coins++; score+=25; scene.remove(coin); coinMeshes.splice(i,1); showMessage("+25 COIN!");
      }
    });
    camera.position.x+=(player.position.x*.13-camera.position.x)*dt*2;
    camera.lookAt(player.position.x*.12,1,-10);
    updateHud();
    renderer.render(scene,camera);
  }
  function startGame() {
    $("menu").classList.add("hidden"); $("resultScreen").classList.add("hidden"); $("pauseScreen").classList.add("hidden");
    $("gameScreen").classList.remove("hidden"); $("cityLabel").textContent=maps[mapIndex].name;
    if(renderer){renderer.dispose(); const old=$("gameScreen").querySelector("canvas"); if(old)old.remove();}
    lane=1; score=0; coins=0; distance=0; baseSpeed=31; speed=31; nitro=false; paused=false;
    setupWorld(); running=true; lastTime=performance.now(); updateHud(); animationId=requestAnimationFrame(tick);
  }
  function pause() { if(!running)return; paused=true; $("pauseScreen").classList.remove("hidden"); }
  function resume() { paused=false; $("pauseScreen").classList.add("hidden"); lastTime=performance.now(); animationId=requestAnimationFrame(tick); }
  function backMenu() {
    running=false; paused=false; cancelAnimationFrame(animationId);
    $("pauseScreen").classList.add("hidden"); $("resultScreen").classList.add("hidden");
    $("gameScreen").classList.add("hidden"); $("menu").classList.remove("hidden");
  }
  function bindHold(id, key) {
    const el=$(id);
    el.addEventListener("pointerdown",e=>{e.preventDefault();keys[key]=true;el.setPointerCapture(e.pointerId);});
    ["pointerup","pointercancel","lostpointercapture"].forEach(ev=>el.addEventListener(ev,()=>keys[key]=false));
  }
  bindHold("leftBtn","left"); bindHold("rightBtn","right"); bindHold("nitroBtn","nitro");
  $("startBtn").onclick=startGame;
  $("pauseBtn").onclick=pause; $("resumeBtn").onclick=resume;
  $("restartBtn").onclick=startGame; $("againBtn").onclick=startGame;
  $("menuBtn").onclick=backMenu; $("resultMenuBtn").onclick=backMenu;
  window.addEventListener("keydown",e=>{
    if(["ArrowLeft","ArrowRight"," ","ArrowUp","ArrowDown"].includes(e.key))e.preventDefault();
    keys[e.key]=true;
    if(e.key==="Escape" && running && !paused)pause();
    if(e.key==="Escape" && paused)resume();
  });
  window.addEventListener("keyup",e=>keys[e.key]=false);
  const oldTick=tick;
  // Input updates lane independently of frame rate.
  let laneCooldown=0;
  function inputLoop() {
    if(running && !paused) {
      const now=performance.now();
      if(now-laneCooldown>165) {
        if(keys.ArrowLeft||keys.a||keys.left){lane=Math.max(0,lane-1);laneCooldown=now;}
        if(keys.ArrowRight||keys.d||keys.right){lane=Math.min(2,lane+1);laneCooldown=now;}
      }
      nitro=!!(keys[" "]||keys.nitro);
    }
    requestAnimationFrame(inputLoop);
  }
  inputLoop();
  window.addEventListener("resize",()=>{
    if(camera&&renderer){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
  });
})();
