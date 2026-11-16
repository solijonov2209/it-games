// ===== Ilon o'yini: 1 yoki 2 o'yinchi, 3 xil xarita =====
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var messageEl = document.getElementById("message");

var CELL = 20;                       // bitta katak o'lchami
var COLS = canvas.width / CELL;      // 30
var ROWS = canvas.height / CELL;     // 20

// Menyudagi tanlovlar
var settings = { players: "1", map: "classic", speed: "110" };
document.querySelectorAll("[data-group]").forEach(function (row) {
  row.addEventListener("click", function (e) {
    var btn = e.target.closest(".opt");
    if (!btn) return;
    row.querySelectorAll(".opt").forEach(function (b) { b.classList.remove("sel"); });
    btn.classList.add("sel");
    settings[row.dataset.group] = btn.dataset.value;
  });
});

var snakes, apple, golden, rocks, timer, running, paused, ticks;
var best = Number(localStorage.getItem("tohirjon-ilon-best")) || 0;
document.getElementById("best").textContent = best;

// Bitta ilon yaratish
function makeSnake(x, y, dx, color, head) {
  return {
    body: [{ x: x, y: y }, { x: x - dx, y: y }, { x: x - 2 * dx, y: y }],
    dir: { x: dx, y: 0 }, next: { x: dx, y: 0 },
    color: color, head: head, score: 0, alive: true
  };
}

function isFree(x, y) {
  if (rocks.some(function (r) { return r.x === x && r.y === y; })) return false;
  return !snakes.some(function (s) { return s.body.some(function (b) { return b.x === x && b.y === y; }); });
}

function randomFreeCell() {
  var c;
  do { c = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; } while (!isFree(c.x, c.y));
  return c;
}

// "To'siqlar" xaritasi uchun toshlar
function buildRocks() {
  rocks = [];
  if (settings.map !== "rocks") return;
  // [x, y, eni, bo'yi] — ilonlarning boshlang'ich yo'lida tosh bo'lmasligi kerak
  var shapes = [[10, 4, 10, 1], [10, 15, 10, 1], [3, 9, 1, 3], [26, 8, 1, 3]];
  shapes.forEach(function (s) {
    for (var i = 0; i < s[2]; i++) for (var j = 0; j < s[3]; j++) rocks.push({ x: s[0] + i, y: s[1] + j });
  });
}

function start() {
  rocks = [];
  snakes = [makeSnake(6, 10, 1, "#2f8a2f", "#1f5c1f")];
  if (settings.players === "2") {
    snakes[0] = makeSnake(6, 7, 1, "#2f8a2f", "#1f5c1f");
    snakes.push(makeSnake(23, 13, -1, "#2f6fd1", "#1c4a91"));
  }
  buildRocks();
  apple = randomFreeCell();
  golden = null;
  ticks = 0;
  running = true;
  paused = false;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("p2box").classList.toggle("hidden", settings.players !== "2");
  updateScore();
  messageEl.textContent = "Probel — pauza";
  clearInterval(timer);
  timer = setInterval(step, Number(settings.speed));
}

function updateScore() {
  document.getElementById("score1").textContent = snakes[0].score;
  if (snakes[1]) document.getElementById("score2").textContent = snakes[1].score;
}

function gameOver() {
  running = false;
  clearInterval(timer);
  var top = Math.max.apply(null, snakes.map(function (s) { return s.score; }));
  if (top > best) {
    best = top;
    localStorage.setItem("tohirjon-ilon-best", best);
    document.getElementById("best").textContent = best;
  }
  if (snakes.length === 2) {
    var a = snakes[0], b = snakes[1], text;
    if (a.alive && !b.alive) text = "🟢 Yashil ilon yutdi!";
    else if (b.alive && !a.alive) text = "🔵 Ko'k ilon yutdi!";
    else text = a.score === b.score ? "🤝 Durang!" : (a.score > b.score ? "🟢 Yashil ilon yutdi!" : "🔵 Ko'k ilon yutdi!");
    messageEl.textContent = text + " (" + a.score + " : " + b.score + ")";
  } else {
    messageEl.textContent = "💥 O'yin tugadi! Ball: " + snakes[0].score;
  }
  setTimeout(function () { document.getElementById("menu").classList.remove("hidden"); }, 900);
}

function step() {
  if (paused) return;
  ticks++;

  // Oltin olma ba'zan paydo bo'ladi va 5 soniyadan keyin yo'qoladi
  if (!golden && Math.random() < 0.02) golden = Object.assign(randomFreeCell(), { born: ticks });
  if (golden && (ticks - golden.born) * Number(settings.speed) > 5000) golden = null;

  // Avval hamma yangi bosh joyini hisoblaymiz
  var heads = snakes.map(function (s) {
    if (!s.alive) return null;
    s.dir = s.next;
    var h = { x: s.body[0].x + s.dir.x, y: s.body[0].y + s.dir.y };
    if (settings.map === "portal") {  // chetdan chiqsa — qarama-qarshi tomondan kiradi
      h.x = (h.x + COLS) % COLS;
      h.y = (h.y + ROWS) % ROWS;
    }
    return h;
  });

  snakes.forEach(function (s, i) {
    var h = heads[i];
    if (!h) return;
    var hitWall = h.x < 0 || h.y < 0 || h.x >= COLS || h.y >= ROWS;
    var hitRock = rocks.some(function (r) { return r.x === h.x && r.y === h.y; });
    var hitBody = snakes.some(function (o) { return o.body.some(function (b) { return b.x === h.x && b.y === h.y; }); });
    var hitHead = heads.some(function (o, j) { return j !== i && o && o.x === h.x && o.y === h.y; });
    if (hitWall || hitRock || hitBody || hitHead) { s.alive = false; return; }

    s.body.unshift(h);
    if (h.x === apple.x && h.y === apple.y) {
      s.score++;
      apple = randomFreeCell();
    } else if (golden && h.x === golden.x && h.y === golden.y) {
      s.score += 5;
      s.body.push(Object.assign({}, s.body[s.body.length - 1]));
      golden = null;
    } else {
      s.body.pop();
    }
  });
  updateScore();
  draw();

  var alive = snakes.filter(function (s) { return s.alive; }).length;
  if ((snakes.length === 1 && alive === 0) || (snakes.length === 2 && alive < 2)) gameOver();
}

function draw() {
  ctx.fillStyle = settings.map === "portal" ? "#9fd6a8" : "#a8d672";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Shaxmat naqshli maysa
  ctx.fillStyle = "rgba(0,0,0,0.04)";
  for (var x = 0; x < COLS; x++) for (var y = 0; y < ROWS; y++) if ((x + y) % 2) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);

  ctx.fillStyle = "#6b6b6b";
  rocks.forEach(function (r) { ctx.fillRect(r.x * CELL + 1, r.y * CELL + 1, CELL - 2, CELL - 2); });

  ctx.font = CELL + "px Arial";
  ctx.textBaseline = "top";
  ctx.fillText("🍎", apple.x * CELL, apple.y * CELL);
  if (golden) ctx.fillText("🌟", golden.x * CELL, golden.y * CELL);

  snakes.forEach(function (s) {
    s.body.forEach(function (b, i) {
      ctx.globalAlpha = s.alive ? 1 : 0.4;
      ctx.fillStyle = i === 0 ? s.head : s.color;
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(b.x * CELL + 1, b.y * CELL + 1, CELL - 2, CELL - 2, 5)
        : ctx.rect(b.x * CELL + 1, b.y * CELL + 1, CELL - 2, CELL - 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  });
}

var DIRS = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
function turn(s, name) {
  var d = DIRS[name];
  if (!d || !s || !running) return;
  // Teskari tomonga burilib bo'lmaydi
  if (d.x === -s.dir.x && d.y === -s.dir.y) return;
  s.next = d;
}

document.addEventListener("keydown", function (e) {
  var wasd = { w: "up", s: "down", a: "left", d: "right" };
  var arrows = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };
  var k = e.key.toLowerCase();
  if (arrows[e.key] || e.key === " ") e.preventDefault();

  if (!running && (e.key === "Enter")) { start(); return; }
  if (e.key === " " && running) {
    paused = !paused;
    messageEl.textContent = paused ? "⏸ Pauza" : "Probel — pauza";
    return;
  }
  if (!running) return;
  if (wasd[k]) turn(snakes[0], wasd[k]);
  // 1 kishilikda strelkalar ham 1-ilonni boshqaradi
  if (arrows[e.key]) turn(snakes.length === 2 ? snakes[1] : snakes[0], arrows[e.key]);
});

document.querySelectorAll(".pad button").forEach(function (btn) {
  btn.addEventListener("click", function () { turn(snakes && snakes[0], btn.dataset.dir); });
});
document.getElementById("startBtn").addEventListener("click", start);

// Menyu ortida bo'sh maydonni chizib qo'yamiz
snakes = [makeSnake(6, 10, 1, "#2f8a2f", "#1f5c1f")];
rocks = [];
apple = { x: 20, y: 10 };
draw();
