const canvas = document.getElementById('pitch');
const ctx = canvas.getContext('2d');

const PITCH_W = 1200;
const PITCH_H = 720;
const MARGIN = 45;
const GOAL_W = 28;
const GOAL_H = 170;

const scoreHomeEl = document.getElementById('score-home');
const scoreAwayEl = document.getElementById('score-away');
const timerEl = document.getElementById('timer');
const startOverlay = document.getElementById('start-overlay');
const endOverlay = document.getElementById('end-overlay');
const goalBanner = document.getElementById('goal-banner');
const goalScorerText = document.getElementById('goal-scorer-text');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;

  if (type === 'kick') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === 'whistle') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2800, now);
    osc.frequency.setValueAtTime(2950, now + 0.1);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (type === 'goal') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(440, now + 0.4);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.start(now);
    osc.stop(now + 0.6);
  }
}

let gameState = 'menu';
let difficulty = 'medium';
let score = { home: 0, away: 0 };
let matchTime = 90;
let lastTimestamp = 0;
let particles = [];

const DIFF_SETTINGS = {
  easy: { aiSpeed: 2.3, aiReaction: 0.04, gkSpeed: 2.5 },
  medium: { aiSpeed: 3.1, aiReaction: 0.08, gkSpeed: 3.5 },
  hard: { aiSpeed: 3.8, aiReaction: 0.14, gkSpeed: 4.5 }
};

const keys = {};
let joyInput = { x: 0, y: 0 };
let shootCharge = 0;
let isChargingShoot = false;

const ball = {
  x: PITCH_W / 2,
  y: PITCH_H / 2,
  vx: 0,
  vy: 0,
  radius: 11,
  owner: null,
  spin: 0,
  reset() {
    this.x = PITCH_W / 2;
    this.y = PITCH_H / 2;
    this.vx = 0;
    this.vy = 0;
    this.owner = null;
  }
};

class Player {
  constructor(team, role, number, homeX, homeY, hairColor) {
    this.team = team;
    this.role = role;
    this.number = number;
    this.homeX = homeX;
    this.homeY = homeY;
    this.x = homeX;
    this.y = homeY;
    this.vx = 0;
    this.vy = 0;
    this.radius = 16;
    this.angle = team === 'home' ? 0 : Math.PI;
    this.walkCycle = 0;
    this.kickAnim = 0;
    this.tackleTimer = 0;
    this.cooldown = 0;
    this.hairColor = hairColor;
    this.skinColor = '#f1c27d';
  }

  reset() {
    this.x = this.homeX;
    this.y = this.homeY;
    this.vx = 0;
    this.vy = 0;
    this.tackleTimer = 0;
    this.angle = this.team === 'home' ? 0 : Math.PI;
  }

  update(dt) {
    if (this.cooldown > 0) this.cooldown -= dt;
    if (this.kickAnim > 0) this.kickAnim -= dt * 5;

    if (this.tackleTimer > 0) {
      this.tackleTimer -= dt;
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.92;
      this.vy *= 0.92;
    } else {
      this.x += this.vx;
      this.y += this.vy;
    }

    this.x = Math.max(MARGIN + 15, Math.min(PITCH_W - MARGIN - 15, this.x));
    this.y = Math.max(MARGIN + 15, Math.min(PITCH_H - MARGIN - 15, this.y));

    const speed = Math.hypot(this.vx, this.vy);
    if (speed > 0.2) {
      this.walkCycle += speed * 0.22;
      if (this.tackleTimer <= 0) {
        this.angle = Math.atan2(this.vy, this.vx);
      }
    } else {
      this.walkCycle = 0;
    }

    if (ball.owner === this) {
      const distAhead = this.radius + ball.radius + 3;
      ball.x = this.x + Math.cos(this.angle) * distAhead;
      ball.y = this.y + Math.sin(this.angle) * distAhead;
      ball.vx = this.vx;
      ball.vy = this.vy;
      ball.spin += speed * 0.1;
    }
  }

  draw(ctx, isControlled) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (isControlled) {
      ctx.beginPath();
      ctx.ellipse(0, 12, 22, 12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 3;
      ctx.stroke();

      if (isChargingShoot && shootCharge > 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(-20, -34, 40, 6);
        ctx.fillStyle = shootCharge > 0.75 ? '#ef233c' : '#ffd60a';
        ctx.fillRect(-20, -34, 40 * shootCharge, 6);
      }
    }

    ctx.beginPath();
    ctx.ellipse(0, 11, 14, 7, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fill();

    if (this.tackleTimer > 0) {
      ctx.rotate(this.angle);
      ctx.fillStyle = this.team === 'home' ? '#ffffff' : '#d90429';
      ctx.fillRect(-18, -8, 30, 16);
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(14, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    const legSwing = Math.sin(this.walkCycle) * 6;
    const armSwing = Math.cos(this.walkCycle) * 5;
    const kickOffset = this.kickAnim > 0 ? Math.sin(this.kickAnim * Math.PI) * 10 : 0;

    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.ellipse(-5, 8 + legSwing, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(5, 8 - legSwing - kickOffset, 4.5, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.team === 'home' ? '#0077b6' : '#1b263b';
    ctx.fillRect(-9, 1, 18, 7);

    ctx.fillStyle = this.skinColor;
    ctx.beginPath();
    ctx.arc(-12, -3 - armSwing, 3.8, 0, Math.PI * 2);
    ctx.arc(12, -3 + armSwing, 3.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.role === 'GK'
      ? (this.team === 'home' ? '#38b000' : '#ff9f1c')
      : (this.team === 'home' ? '#ffffff' : '#d90429');
    ctx.beginPath();
    ctx.roundRect(-10, -11, 20, 14, 5);
    ctx.fill();
    ctx.strokeStyle = this.team === 'home' ? '#0077b6' : '#000000';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = this.team === 'home' && this.role !== 'GK' ? '#003566' : '#ffffff';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.number, 0, -1);

    ctx.fillStyle = this.skinColor;
    ctx.beginPath();
    ctx.arc(0, -17, 7.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.hairColor;
    ctx.beginPath();
    ctx.arc(0, -19, 7.5, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

const players = [
  new Player('home', 'GK', 1, MARGIN + 35, PITCH_H / 2, '#1f1f1f'),
  new Player('home', 'DEF', 4, 280, PITCH_H * 0.3, '#3b2f2f'),
  new Player('home', 'DEF', 5, 280, PITCH_H * 0.7, '#111111'),
  new Player('home', 'MID', 7, 450, PITCH_H * 0.35, '#2b1d0e'),
  new Player('home', 'FWD', 10, 520, PITCH_H * 0.65, '#1a1a1a'),

  new Player('away', 'GK', 1, PITCH_W - MARGIN - 35, PITCH_H / 2, '#4a3728'),
  new Player('away', 'DEF', 2, PITCH_W - 280, PITCH_H * 0.3, '#111111'),
  new Player('away', 'DEF', 3, PITCH_W - 280, PITCH_H * 0.7, '#5c4033'),
  new Player('away', 'MID', 8, PITCH_W - 450, PITCH_H * 0.65, '#1f1f1f'),
  new Player('away', 'FWD', 9, PITCH_W - 520, PITCH_H * 0.35, '#2b1d0e')
];

let controlledPlayer = players[4];

function getClosestPlayer(team, targetX, targetY, exclude = null) {
  let closest = null;
  let minDist = Infinity;
  for (const p of players) {
    if (p.team !== team || p === exclude || p.role === 'GK') continue;
    const d = Math.hypot(p.x - targetX, p.y - targetY);
    if (d < minDist) {
      minDist = d;
      closest = p;
    }
  }
  return closest;
}

function executeShootOrTackle() {
  if (gameState !== 'playing') return;

  if (ball.owner === controlledPlayer) {
    const power = 11 + shootCharge * 11;
    const shootAngle = controlledPlayer.angle;
    ball.owner = null;
    ball.vx = Math.cos(shootAngle) * power;
    ball.vy = Math.sin(shootAngle) * power;
    controlledPlayer.cooldown = 0.25;
    controlledPlayer.kickAnim = 1;
    playSound('kick');
    spawnParticles(ball.x, ball.y, '#ffd60a', 10);
  } else if (!ball.owner || ball.owner.team === 'away') {
    if (controlledPlayer.tackleTimer <= 0) {
      controlledPlayer.tackleTimer = 0.32;
      controlledPlayer.vx = Math.cos(controlledPlayer.angle) * 9.5;
      controlledPlayer.vy = Math.sin(controlledPlayer.angle) * 9.5;
    }
  }
  shootCharge = 0;
  isChargingShoot = false;
}

function executePass() {
  if (gameState !== 'playing') return;

  if (ball.owner === controlledPlayer) {
    let bestMate = null;
    let bestScore = -Infinity;
    const dirX = Math.cos(controlledPlayer.angle);
    const dirY = Math.sin(controlledPlayer.angle);

    for (const mate of players) {
      if (mate.team !== 'home' || mate === controlledPlayer) continue;
      const dx = mate.x - controlledPlayer.x;
      const dy = mate.y - controlledPlayer.y;
      const dist = Math.hypot(dx, dy);
      const dot = (dx / dist) * dirX + (dy / dist) * dirY;
      const score = dot * 300 - dist * 0.4;
      if (score > bestScore) {
        bestScore = score;
        bestMate = mate;
      }
    }

    if (bestMate) {
      const passAngle = Math.atan2(bestMate.y - ball.y, bestMate.x - ball.x);
      const dist = Math.hypot(bestMate.x - ball.x, bestMate.y - ball.y);
      const passSpeed = Math.min(15, Math.max(8, dist * 0.032));

      ball.owner = null;
      ball.vx = Math.cos(passAngle) * passSpeed;
      ball.vy = Math.sin(passAngle) * passSpeed;
      controlledPlayer.cooldown = 0.25;
      controlledPlayer.kickAnim = 1;
      controlledPlayer = bestMate;
      playSound('kick');
    }
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  const next = getClosestPlayer('home', ball.x, ball.y, controlledPlayer);
  if (next) controlledPlayer = next;
}

function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 4 + 1;
    particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 1,
      color
    });
  }
}

function updateLogic(dt) {
  const aiCfg = DIFF_SETTINGS[difficulty];

  if (ball.owner && ball.owner.team === 'home' && ball.owner.role !== 'GK') {
    controlledPlayer = ball.owner;
  }

  let moveX = joyInput.x;
  let moveY = joyInput.y;
  if (keys['ArrowUp'] || keys['KeyW']) moveY -= 1;
  if (keys['ArrowDown'] || keys['KeyS']) moveY += 1;
  if (keys['ArrowLeft'] || keys['KeyA']) moveX -= 1;
  if (keys['ArrowRight'] || keys['KeyD']) moveX += 1;

  const mag = Math.hypot(moveX, moveY);
  if (mag > 0) {
    moveX /= mag;
    moveY /= mag;
  }

  if (controlledPlayer.tackleTimer <= 0) {
    const isSprinting = keys['ShiftLeft'] || keys['ShiftRight'] || keys['MobileSprint'];
    const baseSpeed = ball.owner === controlledPlayer ? 3.5 : 3.9;
    const speed = isSprinting ? baseSpeed * 1.32 : baseSpeed;
    controlledPlayer.vx = moveX * speed;
    controlledPlayer.vy = moveY * speed;
  }

  if (isChargingShoot) {
    shootCharge = Math.min(1, shootCharge + dt * 1.6);
  }

  const homeChaser = getClosestPlayer('home', ball.x, ball.y);
  const awayChaser = getClosestPlayer('away', ball.x, ball.y);

  for (const p of players) {
    if (p === controlledPlayer) continue;
    if (p.tackleTimer > 0) continue;

    if (p.role === 'GK') {
      const goalX = p.team === 'home' ? MARGIN + 35 : PITCH_W - MARGIN - 35;
      const targetY = Math.max(
        PITCH_H / 2 - GOAL_H / 2 + 15,
        Math.min(PITCH_H / 2 + GOAL_H / 2 - 15, ball.y)
      );
      p.vx = (goalX - p.x) * 0.1;
      p.vy = (targetY - p.y) * 0.08 * (aiCfg.gkSpeed / 3.5);

      if (ball.owner === p) {
        const kickDir = p.team === 'home' ? 0 : Math.PI;
        ball.owner = null;
        ball.vx = Math.cos(kickDir + (Math.random() - 0.5) * 0.5) * 12;
        ball.vy = Math.sin(kickDir + (Math.random() - 0.5) * 0.5) * 12;
        p.cooldown = 0.4;
        playSound('kick');
      }
      continue;
    }

    let targetX = p.homeX;
    let targetY = p.homeY;
    let speed = p.team === 'home' ? 3.2 : aiCfg.aiSpeed;

    if (ball.owner === p) {
      const enemyGoalX = MARGIN;
      const enemyGoalY = PITCH_H / 2;
      targetX = enemyGoalX + 120;
      targetY = enemyGoalY + Math.sin(performance.now() * 0.003) * 80;

      if (p.x < 330 && Math.random() < aiCfg.aiReaction) {
        const shotAngle = Math.atan2(
          enemyGoalY + (Math.random() - 0.5) * (GOAL_H - 30) - p.y,
          enemyGoalX - p.x
        );
        ball.owner = null;
        ball.vx = Math.cos(shotAngle) * 13;
        ball.vy = Math.sin(shotAngle) * 13;
        p.cooldown = 0.3;
        p.kickAnim = 1;
        playSound('kick');
      }
    } else if ((p.team === 'home' && p === homeChaser) || (p.team === 'away' && p === awayChaser)) {
      targetX = ball.x;
      targetY = ball.y;
    } else {
      const shiftX = (ball.x - PITCH_W / 2) * 0.35;
      const shiftY = (ball.y - PITCH_H / 2) * 0.25;
      targetX = p.homeX + shiftX;
      targetY = p.homeY + shiftY;
    }

    const dx = targetX - p.x;
    const dy = targetY - p.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 8) {
      p.vx = (dx / dist) * speed;
      p.vy = (dy / dist) * speed;
    } else {
      p.vx *= 0.8;
      p.vy *= 0.8;
    }
  }
}

function updatePhysics(dt) {
  for (const p of players) p.update(dt);

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const a = players[i];
      const b = players[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const minDist = a.radius + b.radius;
      if (dist > 0 && dist < minDist) {
        const overlap = (minDist - dist) / 2;
        const nx = dx / dist;
        const ny = dy / dist;
        a.x -= nx * overlap;
        a.y -= ny * overlap;
        b.x += nx * overlap;
        b.y += ny * overlap;
      }
    }
  }

  if (!ball.owner) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vx *= 0.975;
    ball.vy *= 0.975;
    ball.spin += Math.hypot(ball.vx, ball.vy) * 0.08;

    if (ball.y - ball.radius < MARGIN) {
      ball.y = MARGIN + ball.radius;
      ball.vy *= -0.75;
    } else if (ball.y + ball.radius > PITCH_H - MARGIN) {
      ball.y = PITCH_H - MARGIN - ball.radius;
      ball.vy *= -0.75;
    }

    const inGoalY = ball.y > PITCH_H / 2 - GOAL_H / 2 && ball.y < PITCH_H / 2 + GOAL_H / 2;

    if (ball.x - ball.radius < MARGIN) {
      if (inGoalY) {
        handleGoal('away');
        return;
      } else {
        ball.x = MARGIN + ball.radius;
        ball.vx *= -0.75;
      }
    }

    if (ball.x + ball.radius > PITCH_W - MARGIN) {
      if (inGoalY) {
        handleGoal('home');
        return;
      } else {
        ball.x = PITCH_W - MARGIN - ball.radius;
        ball.vx *= -0.75;
      }
    }
  }

  for (const p of players) {
    if (p.cooldown > 0 || ball.owner === p) continue;
    const dist = Math.hypot(ball.x - p.x, ball.y - p.y);
    const reach = p.radius + ball.radius + (p.tackleTimer > 0 ? 8 : 2);

    if (dist < reach) {
      if (!ball.owner) {
        ball.owner = p;
        if (p.team === 'home' && p.role !== 'GK') controlledPlayer = p;
      } else if (ball.owner.team !== p.team) {
        if (p.tackleTimer > 0 || Math.random() < 0.08) {
          ball.owner.cooldown = 0.5;
          ball.owner = p;
          if (p.team === 'home' && p.role !== 'GK') controlledPlayer = p;
          spawnParticles(ball.x, ball.y, '#ffffff', 8);
        }
      }
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life -= dt * 2;
    if (pt.life <= 0) particles.splice(i, 1);
  }
}

function handleGoal(scoringTeam) {
  gameState = 'goal';
  playSound('goal');

  if (scoringTeam === 'home') {
    score.home++;
    scoreHomeEl.textContent = score.home;
    goalScorerText.textContent = "🇺🇿 O'ZBEKISTON GOL URDI!";
  } else {
    score.away++;
    scoreAwayEl.textContent = score.away;
    goalScorerText.textContent = "🚩 Raqib jamoa gol urdi!";
  }

  goalBanner.classList.remove('hidden');
  spawnParticles(ball.x, ball.y, '#ffd60a', 40);

  setTimeout(() => {
    goalBanner.classList.add('hidden');
    if (gameState === 'goal') {
      resetPositions();
      gameState = 'playing';
      playSound('whistle');
    }
  }, 2200);
}

function resetPositions() {
  ball.reset();
  for (const p of players) p.reset();
  controlledPlayer = players[4];
}

function drawPitch() {
  const stripeCount = 12;
  const stripeW = (PITCH_W - MARGIN * 2) / stripeCount;
  ctx.fillStyle = '#1b4332';
  ctx.fillRect(0, 0, PITCH_W, PITCH_H);

  for (let i = 0; i < stripeCount; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#2d6a4f' : '#245841';
    ctx.fillRect(MARGIN + i * stripeW, MARGIN, stripeW, PITCH_H - MARGIN * 2);
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 3;
  ctx.strokeRect(MARGIN, MARGIN, PITCH_W - MARGIN * 2, PITCH_H - MARGIN * 2);

  ctx.beginPath();
  ctx.moveTo(PITCH_W / 2, MARGIN);
  ctx.lineTo(PITCH_W / 2, PITCH_H - MARGIN);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(PITCH_W / 2, PITCH_H / 2, 85, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(PITCH_W / 2, PITCH_H / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  const boxW = 145;
  const boxH = 310;
  ctx.strokeRect(MARGIN, PITCH_H / 2 - boxH / 2, boxW, boxH);
  ctx.strokeRect(PITCH_W - MARGIN - boxW, PITCH_H / 2 - boxH / 2, boxW, boxH);

  drawGoal(MARGIN - GOAL_W, PITCH_H / 2 - GOAL_H / 2, GOAL_W, GOAL_H);
  drawGoal(PITCH_W - MARGIN, PITCH_H / 2 - GOAL_H / 2, GOAL_W, GOAL_H);
}

function drawGoal(x, y, w, h) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1;
  for (let gx = x; gx <= x + w; gx += 7) {
    ctx.beginPath();
    ctx.moveTo(gx, y);
    ctx.lineTo(gx, y + h);
    ctx.stroke();
  }
  for (let gy = y; gy <= y + h; gy += 10) {
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();
  }

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, w, h);
}

function drawBall() {
  ctx.save();
  ctx.translate(ball.x, ball.y);

  ctx.beginPath();
  ctx.ellipse(2, 7, ball.radius, ball.radius * 0.6, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fill();

  ctx.rotate(ball.spin);
  ctx.beginPath();
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.arc(0, 0, 4.2, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI * 2) / 5;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * 8.5, Math.sin(a) * 8.5, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function render() {
  drawPitch();

  for (const pt of particles) {
    ctx.globalAlpha = pt.life;
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const sortedPlayers = [...players].sort((a, b) => a.y - b.y);
  for (const p of sortedPlayers) {
    p.draw(ctx, p === controlledPlayer);
  }

  drawBall();
}

function gameLoop(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
  lastTimestamp = timestamp;

  if (gameState === 'playing') {
    matchTime -= dt;
    if (matchTime <= 0) {
      matchTime = 0;
      endMatch();
    }
    updateTimerDisplay();
    updateLogic(dt);
    updatePhysics(dt);
  }

  render();
  requestAnimationFrame(gameLoop);
}

function updateTimerDisplay() {
  const mins = Math.floor(matchTime / 60);
  const secs = Math.floor(matchTime % 60);
  timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function endMatch() {
  gameState = 'ended';
  playSound('whistle');
  document.getElementById('resume-btn').classList.add('hidden');
  document.getElementById('end-title').textContent = "O'YIN TUGADI!";
  document.getElementById('end-score').textContent = `O'zbekiston ${score.home} - ${score.away} Raqib`;

  const msgEl = document.getElementById('end-message');
  if (score.home > score.away) {
    msgEl.textContent = "🏆 Tabriklaymiz! O'zbekiston ajoyib g'alabaga erishdi!";
  } else if (score.home < score.away) {
    msgEl.textContent = "😔 Bu safar raqib ustun keldi. Yana urinib ko'ring!";
  } else {
    msgEl.textContent = "🤝 Jangovar durang!";
  }

  endOverlay.classList.remove('hidden');
}

function resizeCanvas() {
  const container = document.getElementById('game-container');
  const scaleX = (container.clientWidth - 20) / PITCH_W;
  const scaleY = (container.clientHeight - 20) / PITCH_H;
  const scale = Math.min(scaleX, scaleY);

  canvas.width = PITCH_W;
  canvas.height = PITCH_H;
  canvas.style.width = `${PITCH_W * scale}px`;
  canvas.style.height = `${PITCH_H * scale}px`;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'Space' || e.code === 'KeyZ') {
    e.preventDefault();
    if (ball.owner === controlledPlayer) {
      isChargingShoot = true;
    } else {
      executeShootOrTackle();
    }
  } else if (e.code === 'KeyX') {
    executePass();
  } else if (e.code === 'KeyC') {
    switchPlayer();
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
  if (e.code === 'Space' || e.code === 'KeyZ') {
    if (isChargingShoot) {
      executeShootOrTackle();
    }
  }
});

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    difficulty = btn.dataset.diff;
  });
});

function startNewGame() {
  score = { home: 0, away: 0 };
  scoreHomeEl.textContent = '0';
  scoreAwayEl.textContent = '0';
  matchTime = 90;
  resetPositions();
  startOverlay.classList.add('hidden');
  endOverlay.classList.add('hidden');
  gameState = 'playing';
  playSound('whistle');
}

document.getElementById('start-btn').addEventListener('click', startNewGame);
document.getElementById('restart-btn').addEventListener('click', startNewGame);

document.getElementById('pause-btn').addEventListener('click', () => {
  if (gameState === 'playing') {
    gameState = 'paused';
    document.getElementById('end-title').textContent = 'PAUZA';
    document.getElementById('end-score').textContent = `O'zbekiston ${score.home} - ${score.away} Raqib`;
    document.getElementById('end-message').textContent = "O'yin vaqtincha to'xtatildi.";
    document.getElementById('resume-btn').classList.remove('hidden');
    endOverlay.classList.remove('hidden');
  }
});

document.getElementById('resume-btn').addEventListener('click', () => {
  endOverlay.classList.add('hidden');
  gameState = 'playing';
});

const touchControlsEl = document.getElementById('touch-controls');
document.getElementById('toggle-controls-btn').addEventListener('click', () => {
  touchControlsEl.classList.toggle('hidden');
});

const joyBase = document.getElementById('joystick-base');
const joyStick = document.getElementById('joystick-stick');
let joyDragging = false;

function updateJoystick(clientX, clientY) {
  const rect = joyBase.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let dx = clientX - centerX;
  let dy = clientY - centerY;
  const maxDist = 36;
  const dist = Math.hypot(dx, dy);
  if (dist > maxDist) {
    dx = (dx / dist) * maxDist;
    dy = (dy / dist) * maxDist;
  }
  joyStick.style.transform = `translate(${dx}px, ${dy}px)`;
  joyInput.x = dx / maxDist;
  joyInput.y = dy / maxDist;
}

function resetJoystick() {
  joyDragging = false;
  joyStick.style.transform = 'translate(0px, 0px)';
  joyInput = { x: 0, y: 0 };
}

joyBase.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  joyDragging = true;
  joyBase.setPointerCapture(e.pointerId);
  updateJoystick(e.clientX, e.clientY);
});

joyBase.addEventListener('pointermove', (e) => {
  if (!joyDragging) return;
  e.preventDefault();
  updateJoystick(e.clientX, e.clientY);
});

joyBase.addEventListener('pointerup', resetJoystick);
joyBase.addEventListener('pointercancel', resetJoystick);

const btnShoot = document.getElementById('btn-shoot');
btnShoot.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  btnShoot.classList.add('pressed');
  if (ball.owner === controlledPlayer) isChargingShoot = true;
  else executeShootOrTackle();
});
const releaseShoot = (e) => {
  e.preventDefault();
  btnShoot.classList.remove('pressed');
  if (isChargingShoot) executeShootOrTackle();
};
btnShoot.addEventListener('pointerup', releaseShoot);
btnShoot.addEventListener('pointerleave', releaseShoot);

const btnPass = document.getElementById('btn-pass');
btnPass.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  btnPass.classList.add('pressed');
  executePass();
});
btnPass.addEventListener('pointerup', () => btnPass.classList.remove('pressed'));

const btnSwitch = document.getElementById('btn-switch');
btnSwitch.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  btnSwitch.classList.add('pressed');
  switchPlayer();
});
btnSwitch.addEventListener('pointerup', () => btnSwitch.classList.remove('pressed'));

const btnSprint = document.getElementById('btn-sprint');
btnSprint.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  btnSprint.classList.add('pressed');
  keys['MobileSprint'] = true;
});
const releaseSprint = () => {
  btnSprint.classList.remove('pressed');
  keys['MobileSprint'] = false;
};
btnSprint.addEventListener('pointerup', releaseSprint);
btnSprint.addEventListener('pointerleave', releaseSprint);

requestAnimationFrame(gameLoop);