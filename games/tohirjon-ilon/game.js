// ===== Ilon o'yini =====
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var scoreEl = document.getElementById("score");
var bestEl = document.getElementById("best");
var messageEl = document.getElementById("message");

var CELL = 20;                       // bitta katak o'lchami
var COLS = canvas.width / CELL;      // 30
var ROWS = canvas.height / CELL;     // 20

var snake, dir, nextDir, apple, score, timer, running, paused;
var best = Number(localStorage.getItem("tohirjon-ilon-best")) || 0;
bestEl.textContent = best;

function reset() {
  snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  dir = { x: 1, y: 0 };
  nextDir = dir;
  score = 0;
  scoreEl.textContent = 0;
  placeApple();
}

function placeApple() {
  do {
    apple = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(function (s) { return s.x === apple.x && s.y === apple.y; }));
}

function start() {
  reset();
  running = true;
  paused = false;
  messageEl.textContent = "Probel — pauza";
  clearInterval(timer);
  timer = setInterval(step, 110);
}

function gameOver() {
  running = false;
  clearInterval(timer);
  if (score > best) {
    best = score;
    localStorage.setItem("tohirjon-ilon-best", best);
    bestEl.textContent = best;
  }
  messageEl.textContent = "💥 O'yin tugadi! Qayta boshlash uchun strelkani bosing";
}

function step() {
  if (paused) return;
  dir = nextDir;
  var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Devorga yoki o'ziga urildimi?
  var hitWall = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
  var hitSelf = snake.some(function (s) { return s.x === head.x && s.y === head.y; });
  if (hitWall || hitSelf) return gameOver();

  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    scoreEl.textContent = score;
    placeApple();
  } else {
    snake.pop();
  }
  draw();
}

function draw() {
  ctx.fillStyle = "#a8d672";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Olma
  ctx.font = CELL + "px Arial";
  ctx.textBaseline = "top";
  ctx.fillText("🍎", apple.x * CELL, apple.y * CELL);

  // Ilon
  snake.forEach(function (s, i) {
    ctx.fillStyle = i === 0 ? "#1f5c1f" : "#2f8a2f";
    ctx.beginPath();
    ctx.roundRect
      ? ctx.roundRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2, 5)
      : ctx.rect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    ctx.fill();
  });
}

function turn(name) {
  var map = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
  var d = map[name];
  if (!d) return;
  if (!running) start();
  // Teskari tomonga burilib bo'lmaydi
  if (d.x === -dir.x && d.y === -dir.y) return;
  nextDir = d;
}

document.addEventListener("keydown", function (e) {
  var keys = {
    ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
    w: "up", s: "down", a: "left", d: "right", W: "up", S: "down", A: "left", D: "right"
  };
  if (keys[e.key]) {
    e.preventDefault();
    turn(keys[e.key]);
  } else if (e.key === " " && running) {
    e.preventDefault();
    paused = !paused;
    messageEl.textContent = paused ? "⏸ Pauza" : "Probel — pauza";
  }
});

document.querySelectorAll(".pad button").forEach(function (btn) {
  btn.addEventListener("click", function () { turn(btn.dataset.dir); });
});

reset();
draw();
