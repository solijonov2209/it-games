const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const levelEl = document.getElementById('level-display');
const speedEl = document.getElementById('speed-display');
const timerEl = document.getElementById('timer-display');
const distanceEl = document.getElementById('distance-display');
const moneyEl = document.getElementById('money-display');
const shopMoneyEl = document.getElementById('shop-money-display');

const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayDesc = document.getElementById('overlay-desc');
const statusBadge = document.getElementById('status-badge');
const startBtn = document.getElementById('start-btn');
const soundToggle = document.getElementById('sound-toggle');

const shopModal = document.getElementById('shop-modal');
const shopBtn = document.getElementById('shop-btn');
const overlayShopBtn = document.getElementById('overlay-shop-btn');
const closeShopBtn = document.getElementById('close-shop-btn');
const carsGrid = document.getElementById('cars-grid');

const TOTAL_LANES = 5;
const MAX_LEVEL = 1000;
const TARGET_KM = 20;
const PIXELS_PER_KM = 900;

// ===== Yo'l turlari =====
const ROAD_THEMES = [
  { name: '🌌 Neon', bg: '#06060e', road: '#0d0f1d', edge: '#00bbf9', line: 'rgba(255,255,255,0.2)' },
  { name: '🏙️ Shahar', bg: '#3f7f46', road: '#3a3d44', edge: '#ffffff', line: 'rgba(255,255,255,0.75)', side: '🌳' },
  { name: "🏜️ Cho'l", bg: '#d9b26c', road: '#5c4b3b', edge: '#ffcc33', line: 'rgba(255,235,170,0.7)', side: '🌵' },
  { name: '🌧️ Yomg\'ir', bg: '#1d2b33', road: '#2a3138', edge: '#9fd8ff', line: 'rgba(200,230,255,0.5)', side: '🌲', rain: true },
  { name: '❄️ Qor', bg: '#e9f1f7', road: '#46505c', edge: '#2a7fff', line: 'rgba(255,255,255,0.8)', side: '⛄', snow: true }
];
let gameMode = 1;   // 1 yoki 2 o'yinchi
let roadTheme = ROAD_THEMES[0];
let weather = [];   // yomg'ir tomchilari / qor parchalari

document.querySelectorAll('#mode-picker .pick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    gameMode = Number(btn.dataset.mode);
    document.querySelectorAll('#mode-picker .pick-btn').forEach(b => b.classList.toggle('active', b === btn));
  });
});
const roadPicker = document.getElementById('road-picker');
ROAD_THEMES.forEach((t, i) => {
  const btn = document.createElement('button');
  btn.className = 'pick-btn' + (i === 0 ? ' active' : '');
  btn.textContent = t.name;
  btn.addEventListener('click', () => {
    roadTheme = t;
    [...roadPicker.children].forEach(b => b.classList.toggle('active', b === btn));
  });
  roadPicker.appendChild(btn);
});

// 50 ta afsonaviy mashina (shu jumladan Tesla Roadster uchadigan rejim va boshqalar)
const CARS = [
  { id: 'car_1', name: 'Tesla Roadster', price: 0, speedBonus: 3.5, bodyColor: '#ff2a6d', accentColor: '#ffffff', isFlying: true },
  { id: 'car_2', name: 'DeLorean DMC', price: 2000, speedBonus: 2.0, bodyColor: '#8892b0', accentColor: '#fee440', isFlying: false },
  { id: 'car_3', name: 'Nissan Skyline', price: 4500, speedBonus: 4.0, bodyColor: '#00bbf9', accentColor: '#00f5d4', isFlying: false },
  { id: 'car_4', name: 'Bugatti Chiron', price: 8000, speedBonus: 6.5, bodyColor: '#141829', accentColor: '#ff2a6d', isFlying: false },
  { id: 'car_5', name: 'Cyber Truck', price: 12000, speedBonus: 5.0, bodyColor: '#c0c5ce', accentColor: '#00f5d4', isFlying: false },
  { id: 'car_6', name: 'Batmobile Legend', price: 15000, speedBonus: 8.0, bodyColor: '#05070c', accentColor: '#fee440', isFlying: true }
];

// Qolgan mashinalarni 50 tagacha to'ldiramiz
const baseColors = ['#ffffff', '#00bbf9', '#fee440', '#ff2a6d', '#9b5de5', '#00f5d4', '#f15bb5', '#90be6d'];
for (let i = 7; i <= 50; i++) {
  CARS.push({
    id: `car_${i}`,
    name: `Legend Hyper #${i}`,
    price: 15000 + (i - 6) * 400,
    speedBonus: 4.0 + (i * 0.08),
    bodyColor: baseColors[(i - 1) % baseColors.length],
    accentColor: '#ffffff',
    isFlying: i % 5 === 0
  });
}

// Boshlang'ich byudjet $15,000
let money = Number(localStorage.getItem('legendCarMoney')) || 15000;
let ownedCars = JSON.parse(localStorage.getItem('legendOwnedCars')) || ['car_1'];
let selectedCarId = localStorage.getItem('legendSelectedCar') || 'car_1';

function saveProgress() {
  localStorage.setItem('legendCarMoney', money);
  localStorage.setItem('legendOwnedCars', JSON.stringify(ownedCars));
  localStorage.setItem('legendSelectedCar', selectedCarId);
  updateMoneyUI();
}

function updateMoneyUI() {
  moneyEl.textContent = `$${money}`;
  shopMoneyEl.textContent = `$${money}`;
}
updateMoneyUI();

function getSelectedCar() {
  return CARS.find(c => c.id === selectedCarId) || CARS[0];
}

let gameState = 'menu';
let previousStateBeforeShop = 'menu';
let level = 1;
let soundEnabled = true;

let levelDistancePx = 0;
const targetDistancePx = TARGET_KM * PIXELS_PER_KM;
let finishLine = { active: false, y: -100 };

let gameTimeSeconds = 0;
let timerInterval = null;

let players = [];

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type = 'sine', duration = 0.12) {
  if (!soundEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playWinFanfare() {
  if (!soundEnabled) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
    setTimeout(() => playTone(freq, 'triangle', 0.25), idx * 110);
  });
}

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
});

function renderShop() {
  updateMoneyUI();
  carsGrid.innerHTML = '';
  CARS.forEach(car => {
    const isOwned = ownedCars.includes(car.id);
    const isSelected = selectedCarId === car.id;
    const item = document.createElement('div');
    item.className = `car-item ${isSelected ? 'selected' : ''}`;

    let btnHtml = '';
    if (isSelected) {
      btnHtml = `<button class="car-btn btn-equipped" disabled>TANLANGAN ✓</button>`;
    } else if (isOwned) {
      btnHtml = `<button class="car-btn btn-select" data-action="select" data-id="${car.id}">TANLASH</button>`;
    } else {
      const canAfford = money >= car.price;
      btnHtml = `<button class="car-btn btn-buy" data-action="buy" data-id="${car.id}" ${canAfford ? '' : 'disabled'}>SOTIB OLISH ($${car.price})</button>`;
    }

    item.innerHTML = `
      <div class="car-preview" style="background:${car.bodyColor}; box-shadow: 0 0 12px ${car.bodyColor}; border: 2px solid ${car.accentColor};"></div>
      <h3>${car.name}</h3>
      <div class="car-stats">${car.isFlying ? '✨ Uchadigan' : '🏎️ Yer usti'} | +${car.speedBonus.toFixed(1)}</div>
      ${btnHtml}
    `;
    carsGrid.appendChild(item);
  });
}

carsGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const carId = btn.dataset.id;
  const action = btn.dataset.action;
  const car = CARS.find(c => c.id === carId);
  if (!car) return;

  if (action === 'buy' && money >= car.price && !ownedCars.includes(car.id)) {
    money -= car.price;
    ownedCars.push(car.id);
    selectedCarId = car.id;
    saveProgress();
    playTone(880, 'triangle', 0.25);
    renderShop();
  } else if (action === 'select' && ownedCars.includes(car.id)) {
    selectedCarId = car.id;
    saveProgress();
    playTone(620, 'sine', 0.12);
    renderShop();
  }
});

function openShop() {
  if (gameState === 'paused_shop') return;
  previousStateBeforeShop = gameState;
  gameState = 'paused_shop';
  renderShop();
  shopModal.classList.remove('hidden');
}

function closeShop() {
  shopModal.classList.add('hidden');
  gameState = previousStateBeforeShop;
}

shopBtn.addEventListener('click', openShop);
overlayShopBtn.addEventListener('click', openShop);
closeShopBtn.addEventListener('click', closeShop);

let roadWidth = 540;
let roadLeft = 0;
let laneWidth = 0;
let laneCenters = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  roadWidth = Math.min(580, canvas.width * 0.92);
  roadLeft = (canvas.width - roadWidth) / 2;
  laneWidth = roadWidth / TOTAL_LANES;
  laneCenters = [];
  for (let i = 0; i < TOTAL_LANES; i++) {
    laneCenters.push(roadLeft + laneWidth * i + laneWidth / 2);
  }
}
window.addEventListener('resize', resize);
resize();

function initPlayers() {
  players = [];
  const colors = ['#00f5d4', '#ff2a6d', '#fee440', '#9b5de5', '#00bbf9'];
  const activeCar = getSelectedCar();

  for (let i = 0; i < 5; i++) {
    const isPlayer = i === 0;
    // 2 kishilik rejimda 2-mashinani ham odam boshqaradi
    const isHuman = isPlayer || (gameMode === 2 && i === 1);
    players.push({
      id: i,
      isPlayer: isPlayer,
      isHuman: isHuman,
      dist: 0,
      nitro: 0,
      lane: i,
      x: laneCenters[i],
      y: canvas.height - 140 + (isHuman ? 0 : Math.random() * 30),
      width: 40,
      height: 66,
      speed: 6,
      color: isPlayer ? activeCar.bodyColor : (isHuman ? '#ffb648' : colors[i]),
      accent: isPlayer ? activeCar.accentColor : '#ffffff',
      isFlying: isPlayer ? activeCar.isFlying : false,
      laneChangeTimer: 0
    });
  }
}

const keys = { w: false, s: false };   // 1-o'yinchi
const keys2 = { w: false, s: false };  // 2-o'yinchi
let entities = [];
let particles = [];
let roadOffset = 0;
let spawnTimer = 0;

function spawnParticles(x, y, color, count = 20) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 7 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 5 + 2,
      color,
      alpha: 1
    });
  }
}

function startLevel(targetLvl) {
  level = Math.min(MAX_LEVEL, targetLvl);
  gameState = 'playing';
  finishLine.active = false;
  finishLine.y = -100;

  levelDistancePx = 0;
  gameTimeSeconds = 0;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (gameState === 'playing') gameTimeSeconds++;
    const m = String(Math.floor(gameTimeSeconds / 60)).padStart(2, '0');
    const s = String(gameTimeSeconds % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }, 1000);

  initPlayers();

  entities = [];
  particles = [];
  spawnTimer = 0;

  // Ob-havo zarrachalari (yomg'ir yoki qor)
  weather = [];
  if (roadTheme.rain || roadTheme.snow) {
    for (let i = 0; i < 160; i++) {
      weather.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, s: 1 + Math.random() * 1.5 });
    }
  }

  levelEl.textContent = `${level} / ${MAX_LEVEL}`;
  distanceEl.textContent = `0.00 / ${TARGET_KM} km`;
  statusBadge.classList.add('hidden');
  overlay.classList.add('hidden');
  shopModal.classList.add('hidden');
  playTone(520, 'triangle', 0.18);
}

function completeLevel(winner) {
  gameState = 'level_complete';
  if (timerInterval) clearInterval(timerInterval);
  playWinFanfare();

  const reward = 2500;
  money += reward;
  saveProgress();

  const colors = ['#00f5d4', '#fee440', '#00bbf9', '#ff2a6d', '#9b5de5'];
  for (let i = 0; i < 6; i++) {
    spawnParticles(roadLeft + Math.random() * roadWidth, players[0].y - 40, colors[i % colors.length], 18);
  }

  const finishedLevel = level;
  const nextLevel = Math.min(MAX_LEVEL, level + 1);

  statusBadge.className = 'status-badge';
  statusBadge.textContent = `🏁 20 KM FINISH! +$${reward} MUKOFOT!`;
  statusBadge.classList.remove('hidden');

  if (gameMode === 2) {
    const winnerName = winner && winner.id === 1 ? "2-O'YINCHI" : "1-O'YINCHI";
    const p1 = players[0], p2 = players[1];
    statusBadge.textContent = `🏆 ${winnerName} YUTDI! +$${reward}`;
    overlayTitle.textContent = `🏆 ${winnerName} YUTDI!`;
    overlayDesc.innerHTML = `1-o'yinchi: <strong>${(p1.dist / PIXELS_PER_KM).toFixed(2)} km</strong>, $ ${p1.coins || 0} ta tanga<br>` +
      `2-o'yinchi: <strong>${(p2.dist / PIXELS_PER_KM).toFixed(2)} km</strong>, $ ${p2.coins || 0} ta tanga<br>Vaqt: ${timerEl.textContent}`;
    startBtn.innerHTML = `${nextLevel}-LEVELDA REVANSH (<kbd>ENTER</kbd>)`;
  } else if (finishedLevel >= MAX_LEVEL) {
    overlayTitle.textContent = 'TABRIKLAYMIZ!';
    overlayDesc.innerHTML = `Siz barcha <strong>1000-level</strong>dan o'tdingiz! Vaqt: ${timerEl.textContent}. Balans: <strong>$${money}</strong>`;
    startBtn.innerHTML = 'BOSHIDAN BOSHLASH (<kbd>ENTER</kbd>)';
  } else {
    overlayTitle.textContent = `SIZ ${finishedLevel}-LEVELDAN O‘TDINGIZ!`;
    overlayDesc.innerHTML = `20 km masofa ${timerEl.textContent} da zabt etildi! Keyingi bosqich — <strong>${nextLevel}-level</strong>ga o'tishga tayyormisiz?`;
    startBtn.innerHTML = `${nextLevel}-LEVELGA O‘TISH (<kbd>ENTER</kbd>)`;
  }

  overlay.classList.remove('hidden');
}

function spawnWave() {
  if (finishLine.active) return;

  // To'siqlar yo'q: tangalar ($) va ba'zan nitro (⚡) chiqadi
  const lane = Math.floor(Math.random() * TOTAL_LANES);
  if (Math.random() < 0.8) {
    entities.push({
      lane: lane,
      x: laneCenters[lane],
      y: -60,
      width: 32,
      height: 32,
      type: Math.random() < 0.15 ? 'nitro' : 'money'
    });
  }
}

// Bitta odam boshqaradigan mashinaning tezligi va joyi
function updateHuman(car, k, baseSpeed, minY, maxY) {
  const boost = car.nitro > 0 ? 1.5 : 1;
  if (car.nitro > 0) car.nitro--;
  if (k.w) {
    car.speed = baseSpeed * 1.9 * boost;
    car.y = Math.max(minY, car.y - 5);
  } else if (k.s) {
    car.speed = baseSpeed * 0.5 * boost;
    car.y = Math.min(maxY, car.y + 5);
  } else {
    car.speed = baseSpeed * boost;
    const defaultY = canvas.height - 140;
    car.y += (defaultY - car.y) * 0.08;
  }
  // Qor va yomg'irda mashina sekinroq polosa almashtiradi
  const grip = roadTheme.snow ? 0.08 : roadTheme.rain ? 0.14 : 0.25;
  car.x += (laneCenters[car.lane] - car.x) * grip;
}

function update() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.022;
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  // Yomg'ir / qor
  weather.forEach(w => {
    w.y += roadTheme.snow ? w.s * 1.5 : w.s * 9;
    w.x += roadTheme.snow ? Math.sin(w.y / 40) * 0.6 : -1.5;
    if (w.y > canvas.height) { w.y = -10; w.x = Math.random() * canvas.width; }
  });

  if (gameState !== 'playing') return;

  const activeCar = getSelectedCar();
  const baseSpeed = Math.min(26, 8 + (level - 1) * 0.35 + activeCar.speedBonus);

  const playerCar = players[0];
  playerCar.color = activeCar.bodyColor;
  playerCar.accent = activeCar.accentColor;
  playerCar.isFlying = activeCar.isFlying;

  const minY = canvas.height * 0.35;
  const maxY = canvas.height - 85;

  const humans = players.filter(p => p.isHuman);
  updateHuman(playerCar, keys, baseSpeed, minY, maxY);
  if (gameMode === 2) updateHuman(players[1], keys2, baseSpeed, minY, maxY);

  // Yo'l eng tez mashina bilan birga harakatlanadi. Sekinroq o'yinchi pastga suriladi.
  const scroll = Math.max(...humans.map(h => h.speed));
  if (gameMode === 2) {
    humans.forEach(h => {
      h.y = Math.min(canvas.height - 50, h.y + (scroll - h.speed) * 0.35);
    });
  }

  const currentSpeedKmh = Math.round(playerCar.speed * 12.5);
  speedEl.textContent = gameMode === 2
    ? `${currentSpeedKmh} | ${Math.round(players[1].speed * 12.5)}`
    : `${currentSpeedKmh} km/h`;

  for (let i = 1; i < players.length; i++) {
    const bot = players[i];
    if (bot.isHuman) continue;
    bot.speed = baseSpeed * (0.88 + i * 0.03);
    const botTargetX = laneCenters[bot.lane];
    bot.x += (botTargetX - bot.x) * 0.2;

    bot.laneChangeTimer++;
    if (bot.laneChangeTimer > 110) {
      bot.laneChangeTimer = 0;
      // Bot odam turgan polosaga o'tmaydi
      const busy = l => humans.some(h => h.lane === l);
      if (Math.random() < 0.5 && bot.lane > 0 && !busy(bot.lane - 1)) bot.lane--;
      else if (Math.random() < 0.5 && bot.lane < TOTAL_LANES - 1 && !busy(bot.lane + 1)) bot.lane++;
    }
  }

  roadOffset = (roadOffset + scroll) % 60;

  humans.forEach(h => { h.dist += h.speed; });
  levelDistancePx = Math.max(...humans.map(h => h.dist));
  const km = d => Math.min(TARGET_KM, d / PIXELS_PER_KM).toFixed(2);
  distanceEl.textContent = gameMode === 2
    ? `${km(playerCar.dist)} | ${km(players[1].dist)} km`
    : `${km(playerCar.dist)} / ${TARGET_KM} km`;

  if (levelDistancePx >= targetDistancePx && !finishLine.active) {
    finishLine.active = true;
    finishLine.y = -60;
  }

  if (finishLine.active) {
    finishLine.y += scroll;
    const leader = humans.reduce((a, b) => (a.dist >= b.dist ? a : b));
    if (finishLine.y >= leader.y - leader.height / 2) {
      completeLevel(leader);
      return;
    }
  } else {
    spawnTimer += scroll;
    if (spawnTimer > 180) {
      spawnWave();
      spawnTimer = 0;
    }
  }

  // Tangalar va nitroni yig'ish
  for (let i = entities.length - 1; i >= 0; i--) {
    const ent = entities[i];
    ent.x = laneCenters[ent.lane];
    ent.y += scroll;

    const taker = humans.find(h =>
      Math.abs(h.x - ent.x) < (h.width + ent.width) * 0.4 &&
      Math.abs(h.y - ent.y) < (h.height + ent.height) * 0.4
    );

    if (taker) {
      if (ent.type === 'money') {
        money += 500;
        taker.coins = (taker.coins || 0) + 1;
        saveProgress();
        playTone(760, 'sine', 0.12);
        spawnParticles(ent.x, ent.y, '#fee440', 14);
      } else {
        taker.nitro = 150; // ~2.5 soniya tezlashish
        playTone(980, 'square', 0.15);
        spawnParticles(ent.x, ent.y, '#00f5d4', 18);
      }
      entities.splice(i, 1);
      continue;
    }

    if (ent.y > canvas.height + 60) {
      entities.splice(i, 1);
    }
  }
}

function drawFinishLine() {
  if (!finishLine.active) return;
  const rows = 3;
  const cols = 15;
  const cellW = roadWidth / cols;
  const cellH = 14;

  ctx.save();
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#00f5d4';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#ffffff' : '#111322';
      ctx.fillRect(roadLeft + c * cellW, finishLine.y + r * cellH, cellW, cellH);
    }
  }

  ctx.fillStyle = '#00f5d4';
  ctx.font = 'bold 18px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`🏁 20 KM FINISH — LEVEL ${level} 🏁`, roadLeft + roadWidth / 2, finishLine.y - 10);
  ctx.restore();
}

function draw() {
  const t = roadTheme;
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Yo'l chetidagi bezaklar (daraxt, kaktus...)
  if (t.side) {
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let y = -120; y < canvas.height + 120; y += 120) {
      const yy = y + (levelDistancePx * 0.5) % 120;
      ctx.fillText(t.side, roadLeft - 40, yy);
      ctx.fillText(t.side, roadLeft + roadWidth + 40, yy + 60);
    }
  }

  ctx.fillStyle = t.road;
  ctx.fillRect(roadLeft, 0, roadWidth, canvas.height);

  ctx.strokeStyle = t.edge;
  ctx.lineWidth = 4;
  ctx.shadowBlur = 15;
  ctx.shadowColor = t.edge;
  ctx.beginPath();
  ctx.moveTo(roadLeft, 0);
  ctx.lineTo(roadLeft, canvas.height);
  ctx.moveTo(roadLeft + roadWidth, 0);
  ctx.lineTo(roadLeft + roadWidth, canvas.height);
  ctx.stroke();

  ctx.strokeStyle = t.line;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 0;
  ctx.setLineDash([28, 28]);
  ctx.lineDashOffset = -roadOffset;

  for (let i = 1; i < TOTAL_LANES; i++) {
    const lineX = roadLeft + laneWidth * i;
    ctx.beginPath();
    ctx.moveTo(lineX, 0);
    ctx.lineTo(lineX, canvas.height);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  drawFinishLine();

  entities.forEach(ent => {
    ctx.save();
    const color = ent.type === 'nitro' ? '#00f5d4' : '#fee440';
    ctx.fillStyle = color;
    ctx.shadowBlur = 16;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.arc(ent.x, ent.y, ent.width / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#070710';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ent.type === 'nitro' ? '⚡' : '$', ent.x, ent.y + 1);
    ctx.restore();
  });

  // 5 ta o'yinchi mashinasi (Tesla Roadster uchish rejimida ko'tarilib turadi)
  players.forEach((p, index) => {
    ctx.save();
    const isFly = p.isFlying;
    const renderY = isFly ? p.y - 14 : p.y; // Uchadigan mashina biroz balandda ko'rinadi

    if (isFly) {
      // Uchish effekti (ostidagi nuri)
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#00f5d4';
      ctx.fillStyle = 'rgba(0, 245, 212, 0.35)';
      ctx.beginPath();
      ctx.ellipse(p.x, renderY + 20, p.width * 0.7, p.height * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = p.color;
    ctx.shadowBlur = isFly ? 35 : 18;
    ctx.shadowColor = p.accent;
    ctx.beginPath();
    ctx.roundRect(p.x - p.width / 2, renderY - p.height / 2, p.width, p.height, 10);
    ctx.fill();

    ctx.fillStyle = p.accent;
    ctx.fillRect(p.x - p.width / 2 + 6, renderY - p.height / 2 + 8, p.width - 12, 9);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    let label = `P${index + 1}`;
    if (gameMode === 2 && p.isHuman) label = p.id === 0 ? "1-O'YINCHI" : "2-O'YINCHI";
    else if (p.isPlayer) label = isFly ? '🚀 UCHAYOTGAN TESLA' : 'SIZ';
    if (p.nitro > 0) label = '⚡ ' + label;
    ctx.fillText(label, p.x, renderY - p.height / 2 - 8);
    ctx.restore();
  });

  // Yomg'ir chiziqlari yoki qor parchalari
  if (weather.length) {
    ctx.save();
    if (roadTheme.snow) {
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      weather.forEach(w => { ctx.beginPath(); ctx.arc(w.x, w.y, w.s * 1.6, 0, Math.PI * 2); ctx.fill(); });
    } else {
      ctx.strokeStyle = 'rgba(170,210,255,0.45)';
      ctx.lineWidth = 1.2;
      weather.forEach(w => { ctx.beginPath(); ctx.moveTo(w.x, w.y); ctx.lineTo(w.x - 3, w.y + 14); ctx.stroke(); });
    }
    ctx.restore();
  }

  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();

function handleActionButton() {
  if (gameState === 'level_complete') {
    const nextLvl = level >= MAX_LEVEL ? 1 : level + 1;
    startLevel(nextLvl);
  } else {
    startLevel(1);
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (e.key === 'Escape' && gameState === 'paused_shop') {
    closeShop();
    return;
  }

  if (e.key === 'Enter' && (gameState === 'menu' || gameState === 'level_complete')) {
    handleActionButton();
    return;
  }

  if (gameState !== 'playing') return;
  if (e.key.startsWith('Arrow')) e.preventDefault();

  // 1 kishilik rejimda strelkalar ham 1-o'yinchini boshqaradi,
  // 2 kishilik rejimda strelkalar — 2-o'yinchiniki
  const arrowsCar = gameMode === 2 ? players[1] : players[0];
  const arrowKeys = gameMode === 2 ? keys2 : keys;

  if (key === 'a') changeLane(players[0], -1);
  if (key === 'd') changeLane(players[0], 1);
  if (e.key === 'ArrowLeft') changeLane(arrowsCar, -1);
  if (e.key === 'ArrowRight') changeLane(arrowsCar, 1);

  if (key === 'w') keys.w = true;
  if (key === 's') keys.s = true;
  if (e.key === 'ArrowUp') arrowKeys.w = true;
  if (e.key === 'ArrowDown') arrowKeys.s = true;
});

function changeLane(car, dir) {
  const next = car.lane + dir;
  if (next < 0 || next > TOTAL_LANES - 1) return;
  // Boshqa odam o'yinchi turgan polosaga o'tib bo'lmaydi
  if (players.some(p => p !== car && p.isHuman && p.lane === next && Math.abs(p.y - car.y) < p.height)) return;
  car.lane = next;
  playTone(dir < 0 ? 420 : 460, 'sine', 0.06);
  spawnParticles(car.x, car.y, '#00bbf9', 6);
}

document.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  const arrowKeys = gameMode === 2 ? keys2 : keys;
  if (key === 'w') keys.w = false;
  if (key === 's') keys.s = false;
  if (e.key === 'ArrowUp') arrowKeys.w = false;
  if (e.key === 'ArrowDown') arrowKeys.s = false;
});

startBtn.addEventListener('click', handleActionButton);