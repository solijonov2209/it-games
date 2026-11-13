const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('scoreDisplay');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const finalScoreDisplay = document.getElementById('finalScore');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// O'yin sozlamalari
const LANE_COUNT = 3;
const ROAD_MARGIN = 30;
const ROAD_WIDTH = canvas.width - ROAD_MARGIN * 2;
const LANE_WIDTH = ROAD_WIDTH / LANE_COUNT;

let gameRunning = false;
let score = 0;
let highScore = localStorage.getItem('retroRaceHighScore') || 0;
highScoreDisplay.textContent = highScore;

let baseSpeed = 5;
let roadOffset = 0;
let frameCount = 0;
let animationId;

// O'yinchi mashinasi
const player = {
    lane: 1, // 0: chap, 1: o'rta, 2: o'ng
    width: 44,
    height: 76,
    x: 0,
    y: canvas.height - 110,
    color: '#00f3ff'
};

function getLaneCenterX(laneIndex, objWidth) {
    return ROAD_MARGIN + (laneIndex * LANE_WIDTH) + (LANE_WIDTH - objWidth) / 2;
}

player.x = getLaneCenterX(player.lane, player.width);

let obstacles = [];
let bonuses = [];

// Boshqaruv
function moveLeft() {
    if (!gameRunning) return;
    if (player.lane > 0) {
        player.lane--;
    }
}

function moveRight() {
    if (!gameRunning) return;
    if (player.lane < LANE_COUNT - 1) {
        player.lane++;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') moveLeft();
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') moveRight();
});

leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveLeft(); });
rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveRight(); });
leftBtn.addEventListener('mousedown', moveLeft);
rightBtn.addEventListener('mousedown', moveRight);

// Chizish funksiyalari
function drawRoad() {
    // Yo'l chetidagi hudud
    ctx.fillStyle = '#181822';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Asfalt
    ctx.fillStyle = '#2c2c38';
    ctx.fillRect(ROAD_MARGIN, 0, ROAD_WIDTH, canvas.height);

    // Yo'l chetidagi qizil-oq bordyurlar
    const stripeHeight = 30;
    for (let y = -stripeHeight; y < canvas.height + stripeHeight; y += stripeHeight) {
        const drawY = y + (roadOffset % (stripeHeight * 2));
        const isRed = Math.floor((y + roadOffset) / stripeHeight) % 2 === 0;
        ctx.fillStyle = isRed ? '#ff0055' : '#ffffff';
        ctx.fillRect(ROAD_MARGIN - 8, drawY, 8, stripeHeight);
        ctx.fillRect(canvas.width - ROAD_MARGIN, drawY, 8, stripeHeight);
    }

    // Yo'lak ajratuvchi uzuq chiziqlar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    const dashHeight = 40;
    const dashGap = 40;
    for (let i = 1; i < LANE_COUNT; i++) {
        const lineX = ROAD_MARGIN + i * LANE_WIDTH - 2;
        for (let y = -dashHeight; y < canvas.height + dashHeight; y += dashHeight + dashGap) {
            const drawY = y + (roadOffset % (dashHeight + dashGap));
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

function drawNitro(bonus) {
    ctx.fillStyle = '#00ff66';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff66';
    ctx.fillRect(bonus.x, bonus.y, bonus.width, bonus.height);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#000';
    ctx.font = '14px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', bonus.x + bonus.width / 2, bonus.y + bonus.height / 2 + 2);
}

// To'siq va bonus yaratish
function spawnEntities() {
    const spawnRate = Math.max(35, Math.floor(85 - baseSpeed * 3));
    if (frameCount % spawnRate === 0) {
        const lane = Math.floor(Math.random() * LANE_COUNT);
        const isTruck = Math.random() < 0.3;
        const width = isTruck ? 50 : 44;
        const height = isTruck ? 105 : 74;
        const colors = ['#ff0055', '#ff9900', '#aa00ff', '#ff3333'];
        const color = isTruck ? '#8c9ba5' : colors[Math.floor(Math.random() * colors.length)];

        const tooClose = obstacles.some(obs => obs.lane === lane && obs.y < 180);
        if (!tooClose) {
            obstacles.push({
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

    // Nitro bonusi
    if (frameCount % 220 === 0) {
        const lane = Math.floor(Math.random() * LANE_COUNT);
        const size = 32;
        const occupied = obstacles.some(obs => obs.lane === lane && obs.y < 120);
        if (!occupied) {
            bonuses.push({
                x: getLaneCenterX(lane, size),
                y: -size,
                width: size,
                height: size
            });
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

function update() {
    if (!gameRunning) return;

    frameCount++;
    baseSpeed = 5 + Math.floor(score / 150) * 0.6;
    roadOffset += baseSpeed;

    // O'yinchi mashinasini silliq harakatlantirish
    const targetX = getLaneCenterX(player.lane, player.width);
    player.x += (targetX - player.x) * 0.25;

    spawnEntities();

    // To'siqlarni yangilash
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += baseSpeed + obs.speedOffset;

        if (checkCollision(player, obs)) {
            endGame();
            return;
        }

        if (obs.y > canvas.height) {
            obstacles.splice(i, 1);
            score += 10;
            scoreDisplay.textContent = score;
        }
    }

    // Bonuslarni yangilash
    for (let i = bonuses.length - 1; i >= 0; i--) {
        const b = bonuses[i];
        b.y += baseSpeed;

        if (checkCollision(player, b)) {
            score += 50;
            scoreDisplay.textContent = score;
            bonuses.splice(i, 1);
            continue;
        }

        if (b.y > canvas.height) {
            bonuses.splice(i, 1);
        }
    }
}

function draw() {
    drawRoad();

    bonuses.forEach(drawNitro);
    obstacles.forEach(obs => drawCar(obs.x, obs.y, obs.width, obs.height, obs.color, obs.isTruck));
    drawCar(player.x, player.y, player.width, player.height, player.color, false);
}

function gameLoop() {
    if (!gameRunning) return;
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    score = 0;
    baseSpeed = 5;
    frameCount = 0;
    obstacles = [];
    bonuses = [];
    player.lane = 1;
    player.x = getLaneCenterX(1, player.width);
    scoreDisplay.textContent = '0';

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameRunning = true;
    gameLoop();
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('retroRaceHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }

    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// Dastlabki fonni chizib qo'yish
drawRoad();
drawCar(player.x, player.y, player.width, player.height, player.color, false);