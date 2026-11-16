const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startScreen = document.getElementById('startScreen');
const pauseScreen = document.getElementById('pauseScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// O'yin sozlamalari (bitta yo'l o'lchami)
const VIEW_W = 360;
const VIEW_H = 600;
const LANE_COUNT = 3;
const ROAD_MARGIN = 30;
const ROAD_WIDTH = VIEW_W - ROAD_MARGIN * 2;
const LANE_WIDTH = ROAD_WIDTH / LANE_COUNT;

// Trassalar: har birining rangi va o'ziga xos xususiyati bor
const TRACKS = [
    { name: 'NEON', side: '#181822', road: '#2c2c38', curbA: '#ff0055', curbB: '#ffffff', line: 'rgba(255,255,255,0.6)', decor: ['💡'] },
    { name: "CHO'L", side: '#d6a85c', road: '#5a4a3a', curbA: '#ffcc00', curbB: '#222222', line: 'rgba(255,230,160,0.7)', decor: ['🌵', '🪨'] },
    { name: 'QOR', side: '#e8f0f7', road: '#3b4250', curbA: '#2a7fff', curbB: '#ffffff', line: 'rgba(255,255,255,0.7)', decor: ['🌲', '⛄'], snow: true },
    { name: 'TUN', side: '#05050a', road: '#16161f', curbA: '#9b30ff', curbB: '#30ffd0', line: 'rgba(160,120,255,0.6)', decor: ['🌙'], dark: true }
];

let mode = 1;
let track = TRACKS[0];
let players = [];
let gameRunning = false;
let paused = false;
let animationId;
let highScore = Number(localStorage.getItem('retroRaceHighScore')) || 0;
let snow = [];

// ===== Menyu tanlovlari =====
const trackChoice = document.getElementById('trackChoice');
TRACKS.forEach((t, i) => {
    const b = document.createElement('button');
    b.className = 'pick' + (i === 0 ? ' sel' : '');
    b.textContent = t.name;
    b.onclick = () => {
        track = t;
        [...trackChoice.children].forEach(x => x.classList.toggle('sel', x === b));
        drawPreview();
    };
    trackChoice.appendChild(b);
});
document.querySelectorAll('[data-mode]').forEach(b => {
    b.onclick = () => {
        mode = Number(b.dataset.mode);
        document.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('sel', x === b));
        drawPreview();
    };
});

function getLaneCenterX(laneIndex, objWidth) {
    return ROAD_MARGIN + (laneIndex * LANE_WIDTH) + (LANE_WIDTH - objWidth) / 2;
}

// O'yinchi mashinasi
function makePlayer(id) {
    return {
        id: id,
        lane: 1, // 0: chap, 1: o'rta, 2: o'ng
        width: 44,
        height: 76,
        x: getLaneCenterX(1, 44),
        y: VIEW_H - 110,
        color: id === 0 ? '#00f3ff' : '#ffea00',
        score: 0,
        speed: 5,
        roadOffset: 0,
        frame: 0,
        obstacles: [],
        bonuses: [],
        lives: 3,
        invincible: 0,  // urilgandan keyin qisqa vaqt himoya
        shield: false,
        nitro: 0,       // nitro qolgan kadrlar soni
        alive: true
    };
}

// ===== Boshqaruv =====
function move(p, dir) {
    if (!gameRunning || paused || !p || !p.alive) return;
    p.lane = Math.max(0, Math.min(LANE_COUNT - 1, p.lane + dir));
}

document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if ((k === 'p' || e.key === 'Escape') && gameRunning) { togglePause(); return; }
    if (e.key === 'Enter' && !gameRunning && !startScreen.classList.contains('hidden')) { startGame(); return; }

    if (mode === 1) {
        if (e.key === 'ArrowLeft' || k === 'a') move(players[0], -1);
        if (e.key === 'ArrowRight' || k === 'd') move(players[0], 1);
    } else {
        if (k === 'a') move(players[0], -1);
        if (k === 'd') move(players[0], 1);
        if (e.key === 'ArrowLeft') move(players[1], -1);
        if (e.key === 'ArrowRight') move(players[1], 1);
    }
    if (e.key.startsWith('Arrow')) e.preventDefault();
});

leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); move(players[0], -1); });
rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); move(players[0], 1); });
leftBtn.addEventListener('mousedown', () => move(players[0], -1));
rightBtn.addEventListener('mousedown', () => move(players[0], 1));

// ===== Chizish funksiyalari =====
function drawRoad(p) {
    // Yo'l chetidagi hudud
    ctx.fillStyle = track.side;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    // Yo'l chetidagi bezaklar
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < 6; i++) {
        const y = ((i * 120 + p.roadOffset * 0.9) % 720) - 60;
        const icon = track.decor[i % track.decor.length];
        ctx.fillText(icon, 13, y);
        ctx.fillText(icon, VIEW_W - 13, y + 60);
    }

    // Asfalt
    ctx.fillStyle = track.road;
    ctx.fillRect(ROAD_MARGIN, 0, ROAD_WIDTH, VIEW_H);

    // Yo'l chetidagi rangli bordyurlar
    const stripeHeight = 30;
    for (let y = -stripeHeight; y < VIEW_H + stripeHeight; y += stripeHeight) {
        const drawY = y + (p.roadOffset % (stripeHeight * 2));
        const isA = Math.floor((y + p.roadOffset) / stripeHeight) % 2 === 0;
        ctx.fillStyle = isA ? track.curbA : track.curbB;
        ctx.fillRect(ROAD_MARGIN - 8, drawY, 8, stripeHeight);
        ctx.fillRect(VIEW_W - ROAD_MARGIN, drawY, 8, stripeHeight);
    }

    // Yo'lak ajratuvchi uzuq chiziqlar
    ctx.fillStyle = track.line;
    const dashHeight = 40;
    const dashGap = 40;
    for (let i = 1; i < LANE_COUNT; i++) {
        const lineX = ROAD_MARGIN + i * LANE_WIDTH - 2;
        for (let y = -dashHeight; y < VIEW_H + dashHeight; y += dashHeight + dashGap) {
            const drawY = y + (p.roadOffset % (dashHeight + dashGap));
            ctx.fillRect(lineX, drawY, 4, dashHeight);
        }
    }
}

function drawCar(x, y, width, height, color, isTruck = false) {
    // G'ildiraklar
    ctx.fillStyle = '#000';
    ctx.fillRect(x - 4, y + 10, 4, 14);
    ctx.fillRect(x + width, y + 10, 4, 14);
    ctx.fillRect(x - 4, y + height - 24, 4, 14);
    ctx.fillRect(x + width, y + height - 24, 4, 14);

    // Kuzov
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    // Old va orqa oynalar
    ctx.fillStyle = '#111827';
    if (isTruck) {
        ctx.fillRect(x + 6, y + height - 25, width - 12, 16);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(x + 4, y + 6, width - 8, height - 38);
    } else {
        ctx.fillRect(x + 6, y + 16, width - 12, 14);
        ctx.fillRect(x + 8, y + height - 22, width - 16, 10);
    }

    // Faralar
    ctx.fillStyle = '#ffea00';
    ctx.fillRect(x + 4, y, 8, 4);
    ctx.fillRect(x + width - 12, y, 8, 4);
}

function drawBonus(b) {
    const styles = {
        nitro: { color: '#00ff66', text: 'N' },
        coin: { color: '#ffea00', text: '$' },
        shield: { color: '#4da3ff', text: 'S' }
    };
    const s = styles[b.type];
    ctx.fillStyle = s.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = s.color;
    ctx.fillRect(b.x, b.y, b.width, b.height);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#000';
    ctx.font = '14px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.text, b.x + b.width / 2, b.y + b.height / 2 + 2);
}

function drawHud(p) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, VIEW_W, 46);
    ctx.font = '10px "Press Start 2P"';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillStyle = p.color;
    ctx.fillText(mode === 2 ? (p.id + 1) + '-O\'YINCHI' : 'OCHKO', 10, 8);
    ctx.fillStyle = '#fff';
    ctx.fillText(String(p.score), 10, 26);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ff0055';
    ctx.fillText('♥'.repeat(p.lives) + '·'.repeat(3 - p.lives), VIEW_W - 10, 8);
    ctx.fillStyle = '#ffea00';
    ctx.fillText('REKORD ' + highScore, VIEW_W - 10, 26);
}

// ===== To'siq va bonus yaratish =====
function spawnEntities(p) {
    const spawnRate = Math.max(30, Math.floor(85 - p.speed * 3));
    if (p.frame % spawnRate === 0) {
        const lane = Math.floor(Math.random() * LANE_COUNT);
        const isTruck = Math.random() < 0.3;
        const width = isTruck ? 50 : 44;
        const height = isTruck ? 105 : 74;
        const colors = ['#ff0055', '#ff9900', '#aa00ff', '#ff3333'];
        const color = isTruck ? '#8c9ba5' : colors[Math.floor(Math.random() * colors.length)];

        const tooClose = p.obstacles.some(obs => obs.lane === lane && obs.y < 180);
        if (!tooClose) {
            p.obstacles.push({
                lane: lane,
                x: getLaneCenterX(lane, width),
                y: -height - 20,
                width: width,
                height: height,
                color: color,
                isTruck: isTruck,
                speedOffset: isTruck ? -1.2 : 0
            });
        }
    }

    // Bonuslar: tanga ko'p, nitro va qalqon kamroq
    if (p.frame % 110 === 0) {
        const lane = Math.floor(Math.random() * LANE_COUNT);
        const size = 32;
        const r = Math.random();
        const type = r < 0.6 ? 'coin' : (r < 0.85 ? 'nitro' : 'shield');
        const occupied = p.obstacles.some(obs => obs.lane === lane && obs.y < 120);
        if (!occupied) {
            p.bonuses.push({ type, x: getLaneCenterX(lane, size), y: -size, width: size, height: size });
        }
    }
}

function checkCollision(a, b) {
    const padding = 4;
    return (
        a.x + padding < b.x + b.width - padding &&
        a.x + a.width - padding > b.x + padding &&
        a.y + padding < b.y + b.height - padding &&
        a.y + a.height - padding > b.y + padding
    );
}

function updatePlayer(p) {
    if (!p.alive) return;

    p.frame++;
    p.speed = 5 + Math.floor(p.score / 150) * 0.6 + (p.nitro > 0 ? 4 : 0);
    p.roadOffset += p.speed;
    if (p.invincible > 0) p.invincible--;
    if (p.nitro > 0) p.nitro--;

    // Qorli trassada mashina sekinroq buriladi (sirpanadi)
    const targetX = getLaneCenterX(p.lane, p.width);
    p.x += (targetX - p.x) * (track.snow ? 0.1 : 0.25);

    spawnEntities(p);

    // To'siqlarni yangilash
    for (let i = p.obstacles.length - 1; i >= 0; i--) {
        const obs = p.obstacles[i];
        obs.y += p.speed + obs.speedOffset;

        if (checkCollision(p, obs) && p.invincible === 0 && p.nitro === 0) {
            p.obstacles.splice(i, 1);
            if (p.shield) {
                p.shield = false;           // qalqon zarbani o'ziga oladi
                p.invincible = 40;
            } else {
                p.lives--;
                p.invincible = 90;
                if (p.lives <= 0) p.alive = false;
            }
            continue;
        }

        if (obs.y > VIEW_H) {
            p.obstacles.splice(i, 1);
            p.score += 10;
        }
    }

    // Bonuslarni yangilash
    for (let i = p.bonuses.length - 1; i >= 0; i--) {
        const b = p.bonuses[i];
        b.y += p.speed;

        if (checkCollision(p, b)) {
            if (b.type === 'coin') p.score += 20;
            if (b.type === 'nitro') { p.score += 50; p.nitro = 180; }
            if (b.type === 'shield') p.shield = true;
            p.bonuses.splice(i, 1);
            continue;
        }
        if (b.y > VIEW_H) p.bonuses.splice(i, 1);
    }
}

function drawPlayerView(p) {
    drawRoad(p);
    p.bonuses.forEach(drawBonus);
    p.obstacles.forEach(obs => drawCar(obs.x, obs.y, obs.width, obs.height, obs.color, obs.isTruck));

    // O'yinchi: urilgandan keyin miltillaydi
    const blink = p.invincible > 0 && Math.floor(p.invincible / 6) % 2 === 0;
    if (p.alive && !blink) {
        if (p.nitro > 0) {
            ctx.fillStyle = '#00ff66';
            ctx.fillRect(p.x + 10, p.y + p.height, 8, 18 + Math.random() * 10);
            ctx.fillRect(p.x + p.width - 18, p.y + p.height, 8, 18 + Math.random() * 10);
        }
        drawCar(p.x, p.y, p.width, p.height, p.color, false);
        if (p.shield) {
            ctx.strokeStyle = '#4da3ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(p.x + p.width / 2, p.y + p.height / 2, 38, 52, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // Qor yog'ishi
    if (track.snow) {
        ctx.fillStyle = '#fff';
        snow.forEach(s => ctx.fillRect(s.x, (s.y + p.roadOffset * 0.3) % VIEW_H, s.r, s.r));
    }

    // Tungi trassa: faqat fara yoritgan joy ko'rinadi
    if (track.dark && p.alive) {
        const cx = p.x + p.width / 2;
        const g = ctx.createRadialGradient(cx, p.y - 60, 40, cx, p.y - 60, 280);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(0,0,0,0.88)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    }

    drawHud(p);

    if (!p.alive) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);
        ctx.fillStyle = '#ff0055';
        ctx.font = '16px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AVARIYA!', VIEW_W / 2, VIEW_H / 2);
    }
}

function draw() {
    players.forEach((p, i) => {
        ctx.save();
        ctx.translate(i * VIEW_W, 0);
        ctx.beginPath();
        ctx.rect(0, 0, VIEW_W, VIEW_H);
        ctx.clip();
        drawPlayerView(p);
        ctx.restore();
    });
    // Ikki yo'l orasidagi ajratuvchi chiziq
    if (players.length === 2) {
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(VIEW_W - 2, 0, 4, VIEW_H);
    }
}

function gameLoop() {
    if (!gameRunning) return;
    if (!paused) {
        players.forEach(updatePlayer);
        draw();
        if (players.every(p => !p.alive)) {
            endGame();
            return;
        }
    }
    animationId = requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
    canvas.width = VIEW_W * mode;
    canvas.height = VIEW_H;
    // Telefon tugmalari faqat 1 kishilik rejimda kerak
    document.querySelector('.controls').style.display = mode === 1 ? '' : 'none';
}

function startGame() {
    resizeCanvas();
    players = [makePlayer(0)];
    if (mode === 2) players.push(makePlayer(1));
    snow = [];
    for (let i = 0; i < 50; i++) snow.push({ x: Math.random() * VIEW_W, y: Math.random() * VIEW_H, r: 2 + Math.random() * 2 });

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    pauseScreen.classList.add('hidden');
    paused = false;
    gameRunning = true;
    cancelAnimationFrame(animationId);
    gameLoop();
}

function togglePause() {
    paused = !paused;
    pauseScreen.classList.toggle('hidden', !paused);
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    const top = Math.max(...players.map(p => p.score));
    if (top > highScore) {
        highScore = top;
        localStorage.setItem('retroRaceHighScore', highScore);
    }

    const title = document.getElementById('overTitle');
    const text = document.getElementById('overText');
    if (mode === 1) {
        title.innerHTML = "O'YIN<br>TUGADI!";
        text.innerHTML = `Sizning ochko: <span style="color:#ffea00">${players[0].score}</span><br><br>Rekord: ${highScore}`;
    } else {
        const [a, b] = players;
        const winner = a.score === b.score ? 'DURANG!' : (a.score > b.score ? "1-O'YINCHI<br>YUTDI!" : "2-O'YINCHI<br>YUTDI!");
        title.innerHTML = winner;
        text.innerHTML = `<span style="color:#00f3ff">1-o'yinchi: ${a.score}</span><br><br><span style="color:#ffea00">2-o'yinchi: ${b.score}</span>`;
    }
    gameOverScreen.classList.remove('hidden');
}

function backToMenu() {
    gameOverScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    drawPreview();
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', startGame);
document.getElementById('resumeBtn').addEventListener('click', togglePause);
document.getElementById('menuBtn').addEventListener('click', backToMenu);

// Menyuda tanlangan trassani fonda ko'rsatish
function drawPreview() {
    resizeCanvas();
    players = [makePlayer(0)];
    if (mode === 2) players.push(makePlayer(1));
    draw();
}
drawPreview();
