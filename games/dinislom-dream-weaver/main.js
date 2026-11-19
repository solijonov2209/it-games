const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const awakenedDisplay = document.getElementById('awakened-display');
const patientNumDisplay = document.getElementById('patient-num-display');
const levelDisplay = document.getElementById('level-display');
const memoryDisplay = document.getElementById('memory-display');
const stateDisplay = document.getElementById('state-display');
const progressBar = document.getElementById('progress-bar');

const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayDesc = document.getElementById('overlay-desc');
const startBtn = document.getElementById('start-btn');

const TOTAL_PEOPLE = 400;
const STAGES_PER_PERSON = 7;

// Saqlangan natijani yuklash (400 ta odamdan nechtasi uyg'ongan)
let awakenedPeople = parseInt(localStorage.getItem('dreamWeaver_awakened')) || 0;
let isRunning = false;
let currentStage = 0; // 0 dan 6 gacha (jami 7 ta bosqich)
let gravityDirection = 1;
let particles = [];

const player = {
    x: 50,
    y: 350,
    width: 26,
    height: 26,
    vx: 0,
    vy: 0,
    speed: 4.6,
    jumpForce: 10.6,
    grounded: false
};

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Space' && isRunning) {
        e.preventDefault();
        toggleDreamState();
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// 7 ta bosqich (har bir odamni uyg'otish uchun 7 ta bosqichdan o'tiladi)
const stageTemplates = [
    // 1-bosqich: Kirish tushi
    {
        start: { x: 50, y: 360 },
        platforms: [
            { x: 0, y: 420, w: 800, h: 30 },
            { x: 0, y: 0, w: 800, h: 30 },
            { x: 180, y: 330, w: 150, h: 18 },
            { x: 420, y: 240, w: 150, h: 18 },
            { x: 200, y: 120, w: 160, h: 18 }
        ],
        memories: [
            { x: 250, y: 295, collected: false },
            { x: 490, y: 205, collected: false },
            { x: 275, y: 160, collected: false }
        ],
        nightmares: [
            { x: 350, y: 390, w: 26, h: 26, vx: 2.0, minX: 250, maxX: 550 }
        ],
        portal: { x: 725, y: 65, r: 22 }
    },
    // 2-bosqich: Teskari shift
    {
        start: { x: 40, y: 360 },
        platforms: [
            { x: 0, y: 420, w: 800, h: 30 },
            { x: 0, y: 0, w: 800, h: 30 },
            { x: 150, y: 310, w: 120, h: 18 },
            { x: 330, y: 130, w: 140, h: 18 },
            { x: 530, y: 300, w: 130, h: 18 }
        ],
        memories: [
            { x: 205, y: 275, collected: false },
            { x: 395, y: 170, collected: false },
            { x: 590, y: 265, collected: false }
        ],
        nightmares: [
            { x: 220, y: 390, w: 26, h: 26, vx: 2.6, minX: 160, maxX: 480 },
            { x: 420, y: 32, w: 26, h: 26, vx: -2.4, minX: 260, maxX: 620 }
        ],
        portal: { x: 740, y: 360, r: 22 }
    },
    // 3-bosqich: Ko'zgu labirinti
    {
        start: { x: 45, y: 50 },
        platforms: [
            { x: 0, y: 420, w: 800, h: 30 },
            { x: 0, y: 0, w: 800, h: 30 },
            { x: 160, y: 140, w: 130, h: 18 },
            { x: 360, y: 290, w: 130, h: 18 },
            { x: 560, y: 140, w: 130, h: 18 }
        ],
        memories: [
            { x: 220, y: 180, collected: false },
            { x: 420, y: 255, collected: false },
            { x: 620, y: 180, collected: false }
        ],
        nightmares: [
            { x: 200, y: 390, w: 26, h: 26, vx: 3.1, minX: 100, maxX: 700 },
            { x: 500, y: 32, w: 26, h: 26, vx: -2.8, minX: 200, maxX: 680 }
        ],
        portal: { x: 735, y: 65, r: 22 }
    },
    // 4-bosqich: Qo'rquv qo'riqchilari
    {
        start: { x: 40, y: 360 },
        platforms: [
            { x: 0, y: 420, w: 800, h: 30 },
            { x: 0, y: 0, w: 800, h: 30 },
            { x: 220, y: 220, w: 120, h: 20 },
            { x: 460, y: 220, w: 120, h: 20 }
        ],
        memories: [
            { x: 280, y: 185, collected: false },
            { x: 280, y: 265, collected: false },
            { x: 520, y: 185, collected: false },
            { x: 520, y: 265, collected: false }
        ],
        nightmares: [
            { x: 180, y: 390, w: 26, h: 26, vx: 3.4, minX: 140, maxX: 650 },
            { x: 550, y: 32, w: 26, h: 26, vx: -3.4, minX: 140, maxX: 650 }
        ],
        portal: { x: 740, y: 225, r: 22 }
    },
    // 5-bosqich: Chukur ong osti
    {
        start: { x: 40, y: 360 },
        platforms: [
            { x: 0, y: 420, w: 800, h: 30 },
            { x: 0, y: 0, w: 800, h: 30 },
            { x: 140, y: 320, w: 90, h: 16 },
            { x: 300, y: 120, w: 90, h: 16 },
            { x: 460, y: 320, w: 90, h: 16 },
            { x: 610, y: 120, w: 90, h: 16 }
        ],
        memories: [
            { x: 185, y: 285, collected: false },
            { x: 345, y: 155, collected: false },
            { x: 505, y: 285, collected: false },
            { x: 655, y: 155, collected: false }
        ],
        nightmares: [
            { x: 220, y: 390, w: 26, h: 26, vx: 3.5, minX: 130, maxX: 660 },
            { x: 400, y: 32, w: 26, h: 26, vx: -3.5, minX: 130, maxX: 660 }
        ],
        portal: { x: 750, y: 360, r: 22 }
    },
    // 6-bosqich: Xotiralar bo'roni
    {
        start: { x: 45, y: 50 },
        platforms: [
            { x: 0, y: 420, w: 800, h: 30 },
            { x: 0, y: 0, w: 800, h: 30 },
            { x: 180, y: 215, w: 100, h: 20 },
            { x: 350, y: 110, w: 100, h: 18 },
            { x: 350, y: 320, w: 100, h: 18 },
            { x: 530, y: 215, w: 100, h: 20 }
        ],
        memories: [
            { x: 230, y: 180, collected: false },
            { x: 400, y: 150, collected: false },
            { x: 400, y: 285, collected: false },
            { x: 580, y: 180, collected: false }
        ],
        nightmares: [
            { x: 150, y: 390, w: 26, h: 26, vx: 3.8, minX: 120, maxX: 680 },
            { x: 600, y: 32, w: 26, h: 26, vx: -3.8, minX: 120, maxX: 680 },
            { x: 360, y: 212, w: 24, h: 24, vx: 2.2, minX: 300, maxX: 500 }
        ],
        portal: { x: 745, y: 65, r: 22 }
    },
    // 7-bosqich (Yakuniy uyg'onish darvozasi)
    {
        start: { x: 40, y: 360 },
        platforms: [
            { x: 0, y: 420, w: 800, h: 30 },
            { x: 0, y: 0, w: 800, h: 30 },
            { x: 150, y: 300, w: 85, h: 16 },
            { x: 290, y: 140, w: 85, h: 16 },
            { x: 430, y: 300, w: 85, h: 16 },
            { x: 570, y: 140, w: 85, h: 16 }
        ],
        memories: [
            { x: 192, y: 265, collected: false },
            { x: 332, y: 175, collected: false },
            { x: 472, y: 265, collected: false },
            { x: 612, y: 175, collected: false },
            { x: 400, y: 225, collected: false }
        ],
        nightmares: [
            { x: 150, y: 390, w: 26, h: 26, vx: 4.0, minX: 120, maxX: 680 },
            { x: 620, y: 32, w: 26, h: 26, vx: -4.0, minX: 120, maxX: 680 },
            { x: 250, y: 215, w: 24, h: 24, vx: 2.8, minX: 200, maxX: 580 }
        ],
        portal: { x: 745, y: 360, r: 24 }
    }
];

let levelData = null;

// Har bir keyingi bemorda ozgina variasiya bo'lishi uchun bosqichni yuklash
function loadStage(stageIndex) {
    levelData = JSON.parse(JSON.stringify(stageTemplates[stageIndex]));
    
    // Bemor raqamiga qarab dushmanlar tezligini biroz moslashtirish
    const speedBonus = Math.min((awakenedPeople % 20) * 0.04, 0.8);
    levelData.nightmares.forEach(n => {
        n.vx += n.vx > 0 ? speedBonus : -speedBonus;
    });

    player.x = levelData.start.x;
    player.y = levelData.start.y;
    player.vx = 0;
    player.vy = 0;
    gravityDirection = 1;
    document.body.classList.remove('inverted-dream');
    updateUI();
}

function toggleDreamState() {
    gravityDirection *= -1;
    player.grounded = false;
    document.body.classList.toggle('inverted-dream');
    createParticles(player.x + player.width / 2, player.y + player.height / 2, '#f472b6', 15);
    updateUI();
}

function updateUI() {
    awakenedDisplay.textContent = `${awakenedPeople} / ${TOTAL_PEOPLE}`;
    const currentPatient = Math.min(awakenedPeople + 1, TOTAL_PEOPLE);
    patientNumDisplay.textContent = `#${currentPatient}`;
    levelDisplay.textContent = `${currentStage + 1} / ${STAGES_PER_PERSON}`;
    
    const collected = levelData.memories.filter(m => m.collected).length;
    memoryDisplay.textContent = `${collected}/${levelData.memories.length}`;
    
    stateDisplay.textContent = gravityDirection === 1 ? 'Tinch tush' : 'Teskari tush';
    stateDisplay.style.color = gravityDirection === 1 ? '#38bdf8' : '#f472b6';

    const percent = (awakenedPeople / TOTAL_PEOPLE) * 100;
    progressBar.style.width = `${percent}%`;
}

function createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 30,
            color
        });
    }
}

function update() {
    if (!isRunning) return;

    if (keys['ArrowLeft'] || keys['KeyA']) {
        player.vx = -player.speed;
    } else if (keys['ArrowRight'] || keys['KeyD']) {
        player.vx = player.speed;
    } else {
        player.vx *= 0.8;
    }

    if ((keys['ArrowUp'] || keys['KeyW']) && player.grounded) {
        player.vy = -player.jumpForce * gravityDirection;
        player.grounded = false;
    }

    player.vy += 0.55 * gravityDirection;

    // X o'qi
    player.x += player.vx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    for (let p of levelData.platforms) {
        if (checkCollision(player, p)) {
            if (player.vx > 0) player.x = p.x - player.width;
            if (player.vx < 0) player.x = p.x + p.w;
        }
    }

    // Y o'qi
    player.y += player.vy;
    player.grounded = false;

    for (let p of levelData.platforms) {
        if (checkCollision(player, p)) {
            if (gravityDirection === 1) {
                if (player.vy > 0) {
                    player.y = p.y - player.height;
                    player.vy = 0;
                    player.grounded = true;
                } else if (player.vy < 0) {
                    player.y = p.y + p.h;
                    player.vy = 0;
                }
            } else {
                if (player.vy < 0) {
                    player.y = p.y + p.h;
                    player.vy = 0;
                    player.grounded = true;
                } else if (player.vy > 0) {
                    player.y = p.y - player.height;
                    player.vy = 0;
                }
            }
        }
    }

    // Xotiralarni yig'ish
    for (let m of levelData.memories) {
        if (!m.collected) {
            const dist = Math.hypot((player.x + player.width / 2) - m.x, (player.y + player.height / 2) - m.y);
            if (dist < 24) {
                m.collected = true;
                createParticles(m.x, m.y, '#fde047', 18);
                updateUI();
            }
        }
    }

    // Qo'rquv soyalari
    for (let n of levelData.nightmares) {
        n.x += n.vx;
        if (n.x <= n.minX || n.x + n.w >= n.maxX) {
            n.vx *= -1;
        }
        if (checkCollision(player, n)) {
            showOverlay(
                false,
                `🌑 Kabus (${currentStage + 1}-bosqich)`,
                "Qo'rquv soyasi sizni tutib oldi! Ushbu bosqichdan qayta urinib ko'ring.",
                "Bosqichni qayta boshlash"
            );
            return;
        }
    }

    // Portalga yetish (7 ta bosqich tekshiruvi)
    const allCollected = levelData.memories.every(m => m.collected);
    if (allCollected) {
        const pDist = Math.hypot(
            (player.x + player.width / 2) - levelData.portal.x,
            (player.y + player.height / 2) - levelData.portal.y
        );
        if (pDist < levelData.portal.r + 12) {
            if (currentStage + 1 < STAGES_PER_PERSON) {
                // Keyingi bosqichga o'tish (1 -> 2 -> ... -> 7)
                currentStage++;
                createParticles(player.x, player.y, '#38bdf8', 30);
                loadStage(currentStage);
            } else {
                // 7-bosqich tugadi -> 1 ta odam uyg'ondi!
                awakenedPeople++;
                localStorage.setItem('dreamWeaver_awakened', awakenedPeople);
                currentStage = 0;
                updateUI();

                if (awakenedPeople >= TOTAL_PEOPLE) {
                    showOverlay(
                        true,
                        "🏆 Barcha 400 ta odam uyg'ondi!",
                        "Qoyil! Siz 400 nafar bemorning barchasini 7 bosqichli tush olamidan muvaffaqiyatli olib chiqdingiz!",
                        "Qaytadan boshlash (0/400)"
                    );
                } else {
                    showOverlay(
                        true,
                        `✨ ${awakenedPeople}-odam uyg'ondi!`,
                        `7 ta tush bosqichining barchasi yakunlandi va bemor ko'zini ochdi.<br>Uyg'otilganlar: <b>${awakenedPeople} / ${TOTAL_PEOPLE}</b>. Endi navbat <b>#${awakenedPeople + 1}</b> bemorga!`,
                        `#${awakenedPeople + 1} bemor tushiga kirish`
                    );
                }
                return;
            }
        }
    }

    particles.forEach((pt, idx) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;
        if (pt.life <= 0) particles.splice(idx, 1);
    });
}

function checkCollision(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.width > b.x &&
        a.y < b.y + b.h &&
        a.y + a.height > b.y
    );
}

function draw() {
    ctx.fillStyle = gravityDirection === 1 ? '#0d0a22' : '#1f0922';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc((i * 73) % 800, (i * 41) % 450, (i % 2) + 1, 0, Math.PI * 2);
        ctx.fill();
    }

    if (!levelData) return;

    // Platformalar
    for (let p of levelData.platforms) {
        ctx.fillStyle = gravityDirection === 1 ? '#312e81' : '#701a75';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.strokeStyle = gravityDirection === 1 ? '#6366f1' : '#e879f9';
        ctx.strokeRect(p.x, p.y, p.w, p.h);
    }

    // Uyg'onish portali
    const allCollected = levelData.memories.every(m => m.collected);
    ctx.beginPath();
    ctx.arc(levelData.portal.x, levelData.portal.y, levelData.portal.r, 0, Math.PI * 2);
    ctx.fillStyle = allCollected ? 'rgba(56, 189, 248, 0.35)' : 'rgba(148, 163, 184, 0.15)';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = allCollected ? '#38bdf8' : '#475569';
    ctx.stroke();

    // Agar 7-bosqich bo'lsa, portal ustiga "UYG'ONISH" belgisi chiziladi
    if (currentStage === STAGES_PER_PERSON - 1) {
        ctx.fillStyle = allCollected ? '#fde047' : '#94a3b8';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("UYG'ONISH", levelData.portal.x, levelData.portal.y - 28);
    }

    // Xotiralar
    for (let m of levelData.memories) {
        if (!m.collected) {
            ctx.beginPath();
            ctx.arc(m.x, m.y, 9, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Qo'rquv soyalari
    for (let n of levelData.nightmares) {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 12;
        ctx.fillRect(n.x, n.y, n.w, n.h);
        ctx.shadowBlur = 0;
    }

    // O'yinchi
    ctx.fillStyle = '#a78bfa';
    ctx.shadowColor = '#8b5cf6';
    ctx.shadowBlur = 15;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;

    // Zarrachalar
    for (let pt of particles) {
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x, pt.y, 4, 4);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function showOverlay(isSuccess, title, descHtml, btnText) {
    isRunning = false;
    overlayTitle.textContent = title;
    overlayDesc.innerHTML = descHtml;
    startBtn.textContent = btnText;
    overlay.classList.remove('hidden');
}

startBtn.addEventListener('click', () => {
    if (awakenedPeople >= TOTAL_PEOPLE) {
        awakenedPeople = 0;
        localStorage.setItem('dreamWeaver_awakened', 0);
        currentStage = 0;
    }
    loadStage(currentStage);
    overlay.classList.add('hidden');
    isRunning = true;
});

// Dastlabki holatni tayyorlash
overlayTitle.textContent = `#${awakenedPeople + 1} bemorning tushi`;
overlayDesc.innerHTML = `Jami <b>400</b> ta odam chuqur uyquda (Hozirgacha uyg'onganlar: <b>${awakenedPeople}/400</b>).<br>Har bir odamni uyg'otish uchun <b>7 ta bosqich</b>dan o'tib, barcha xotiralarni yig'ing!`;
loadStage(0);
gameLoop();