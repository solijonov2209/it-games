const BOARD_SIZE = 10;
const LETTERS = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

const FLEET_CONFIG = [
  { size: 4, count: 1 },
  { size: 3, count: 2 },
  { size: 2, count: 3 },
  { size: 1, count: 4 }
];

// O'yin bosqichlari:
// SETUP_P1 -> SETUP_P2 -> BATTLE_P1 -> BATTLE_P2 -> GAME_OVER
let phase = 'SETUP_P1';
let isHorizontal = true;
let selectedShipSize = 4;
let soundEnabled = true;

let p1Board = [];
let p2Board = [];
let p1Ships = [];
let p2Ships = [];
let availableFleet = {};

let p1Score = 0;
let p2Score = 0;
let stats = {
  p1Shots: 0, p1Hits: 0,
  p2Shots: 0, p2Hits: 0
};

// DOM elementlar
const leftBoardEl = document.getElementById('leftBoard');
const rightBoardEl = document.getElementById('rightBoard');
const leftBoardBox = document.getElementById('leftBoardBox');
const rightBoardBox = document.getElementById('rightBoardBox');
const leftBoardTitle = document.getElementById('leftBoardTitle');
const rightBoardTitle = document.getElementById('rightBoardTitle');
const leftAliveEl = document.getElementById('leftAlive');
const rightAliveEl = document.getElementById('rightAlive');

const setupPanel = document.getElementById('setupPanel');
const shipDockEl = document.getElementById('shipDock');
const statusBanner = document.getElementById('statusBanner');
const rotateBtn = document.getElementById('rotateBtn');
const autoPlaceBtn = document.getElementById('autoPlaceBtn');
const clearBtn = document.getElementById('clearBtn');
const confirmSetupBtn = document.getElementById('confirmSetupBtn');
const newGameBtn = document.getElementById('newGameBtn');
const soundToggleBtn = document.getElementById('soundToggle');

const passTurnOverlay = document.getElementById('passTurnOverlay');
const curtainTitle = document.getElementById('curtainTitle');
const curtainDesc = document.getElementById('curtainDesc');
const curtainReadyBtn = document.getElementById('curtainReadyBtn');
const winModal = document.getElementById('winModal');

let pendingNextPhase = null;

// Ovoz effektlari
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (!soundEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const now = audioCtx.currentTime;

  if (type === 'place') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.07);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
    osc.start(now);
    osc.stop(now + 0.07);
  } else if (type === 'miss') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(210, now);
    osc.frequency.exponentialRampToValueAtTime(85, now + 0.16);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
    osc.start(now);
    osc.stop(now + 0.16);
  } else if (type === 'hit') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.start(now);
    osc.stop(now + 0.25);
  } else if (type === 'sunk') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.45);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    osc.start(now);
    osc.stop(now + 0.45);
  }
}

function renderCoordinates() {
  ['leftLetters', 'rightLetters'].forEach(id => {
    document.getElementById(id).innerHTML = LETTERS.map(l => `<span>${l}</span>`).join('');
  });
  ['leftNumbers', 'rightNumbers'].forEach(id => {
    document.getElementById(id).innerHTML = Array.from({ length: 10 }, (_, i) => `<span>${i + 1}</span>`).join('');
  });
}

function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      hasShip: false,
      shipId: null,
      hit: false,
      miss: false,
      sunk: false
    }))
  );
}

function resetFleetStock() {
  FLEET_CONFIG.forEach(item => {
    availableFleet[item.size] = item.count;
  });
  selectedShipSize = 4;
  isHorizontal = true;
  updateRotateBtn();
  confirmSetupBtn.disabled = true;
}

function initMatch() {
  phase = 'SETUP_P1';
  p1Board = createEmptyBoard();
  p2Board = createEmptyBoard();
  p1Ships = [];
  p2Ships = [];
  stats = { p1Shots: 0, p1Hits: 0, p2Shots: 0, p2Hits: 0 };

  resetFleetStock();
  winModal.classList.remove('show');
  passTurnOverlay.classList.remove('show');
  setupPanel.style.display = 'flex';
  confirmSetupBtn.textContent = '✅ Tayyor (2-O‘yinchiga o‘tish)';

  updateStatus("1-O'yinchi: Kemalaringizni joylashtiring (2-O'yinchi qaramasin!)", 'turn-p1');
  renderShipDock();
  renderAll();
}

function updateStatus(msg, cls = '') {
  statusBanner.textContent = msg;
  statusBanner.className = 'status-note ' + cls;
}

function updateRotateBtn() {
  rotateBtn.textContent = `🔄 Aylantirish (${isHorizontal ? 'Gorizontal' : 'Vertikal'})`;
}

function renderShipDock() {
  shipDockEl.innerHTML = '';
  FLEET_CONFIG.forEach(item => {
    const count = availableFleet[item.size];
    const row = document.createElement('div');
    row.className = `dock-row ${selectedShipSize === item.size && count > 0 ? 'selected' : ''} ${count === 0 ? 'depleted' : ''}`;

    const shipDiv = document.createElement('div');
    shipDiv.className = 'sketch-ship';
    for (let i = 0; i < item.size; i++) {
      shipDiv.appendChild(document.createElement('span'));
    }

    const countEl = document.createElement('b');
    countEl.style.color = '#15438c';
    countEl.textContent = `×${count}`;

    row.appendChild(shipDiv);
    row.appendChild(countEl);

    row.addEventListener('click', () => {
      if (count > 0) {
        selectedShipSize = item.size;
        renderShipDock();
      }
    });

    shipDockEl.appendChild(row);
  });
}

function canPlaceShip(board, row, col, size, horizontal) {
  for (let i = 0; i < size; i++) {
    const r = horizontal ? row : row + i;
    const c = horizontal ? col + i : col;
    if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return false;

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
          if (board[nr][nc].hasShip) return false;
        }
      }
    }
  }
  return true;
}

function placeShip(board, shipsList, row, col, size, horizontal) {
  const shipId = shipsList.length + 1;
  const cells = [];
  for (let i = 0; i < size; i++) {
    const r = horizontal ? row : row + i;
    const c = horizontal ? col + i : col;
    board[r][c].hasShip = true;
    board[r][c].shipId = shipId;
    cells.push({ r, c });
  }
  shipsList.push({ id: shipId, size, cells, hits: 0, sunk: false });
}

function autoPlaceFleet(board, shipsList) {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      board[r][c] = { hasShip: false, shipId: null, hit: false, miss: false, sunk: false };
    }
  }
  shipsList.length = 0;

  FLEET_CONFIG.forEach(item => {
    for (let k = 0; k < item.count; k++) {
      let placed = false;
      let tries = 0;
      while (!placed && tries < 500) {
        const horiz = Math.random() < 0.5;
        const r = Math.floor(Math.random() * BOARD_SIZE);
        const c = Math.floor(Math.random() * BOARD_SIZE);
        if (canPlaceShip(board, r, c, item.size, horiz)) {
          placeShip(board, shipsList, r, c, item.size, horiz);
          placed = true;
        }
        tries++;
      }
    }
  });
}

function renderSingleBoard(boardEl, boardData, shipsList, options) {
  const { showShips, allowPlace, allowShoot, onCellClick } = options;
  boardEl.innerHTML = '';

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cellData = boardData[r][c];
      const cell = document.createElement('div');
      cell.className = 'cell';

      if (showShips && cellData.hasShip) cell.classList.add('ship');
      if (cellData.miss) cell.classList.add('miss');
      if (cellData.hit) cell.classList.add('hit');
      if (cellData.sunk) cell.classList.add('sunk');

      if (allowPlace) {
        cell.addEventListener('mouseenter', () => previewShip(boardEl, boardData, r, c));
        cell.addEventListener('mouseleave', () => clearPreview(boardEl));
        cell.addEventListener('click', () => onCellClick(r, c));
      } else if (allowShoot && !cellData.hit && !cellData.miss) {
        cell.addEventListener('click', () => onCellClick(r, c));
      }

      boardEl.appendChild(cell);
    }
  }
}

function renderAll() {
  leftBoardBox.classList.remove('inactive-board', 'active-target');
  rightBoardBox.classList.remove('inactive-board', 'active-target');

  if (phase === 'SETUP_P1') {
    leftBoardTitle.textContent = "1-O'yinchi maydoni (Siz)";
    rightBoardTitle.textContent = "2-O'yinchi maydoni";
    rightBoardBox.classList.add('inactive-board');

    renderSingleBoard(leftBoardEl, p1Board, p1Ships, {
      showShips: true,
      allowPlace: true,
      allowShoot: false,
      onCellClick: (r, c) => handleManualPlace(p1Board, p1Ships, r, c)
    });
    renderSingleBoard(rightBoardEl, p2Board, p2Ships, {
      showShips: false, allowPlace: false, allowShoot: false
    });
  } else if (phase === 'SETUP_P2') {
    leftBoardTitle.textContent = "1-O'yinchi maydoni";
    rightBoardTitle.textContent = "2-O'yinchi maydoni (Siz)";
    leftBoardBox.classList.add('inactive-board');

    renderSingleBoard(leftBoardEl, p1Board, p1Ships, {
      showShips: false, allowPlace: false, allowShoot: false
    });
    renderSingleBoard(rightBoardEl, p2Board, p2Ships, {
      showShips: true,
      allowPlace: true,
      allowShoot: false,
      onCellClick: (r, c) => handleManualPlace(p2Board, p2Ships, r, c)
    });
  } else if (phase === 'BATTLE_P1') {
    leftBoardTitle.textContent = "1-O'yinchi (Sizning flotingiz)";
    rightBoardTitle.textContent = "2-O'yinchi (Nishon 🎯)";
    rightBoardBox.classList.add('active-target');

    renderSingleBoard(leftBoardEl, p1Board, p1Ships, {
      showShips: true, allowPlace: false, allowShoot: false
    });
    renderSingleBoard(rightBoardEl, p2Board, p2Ships, {
      showShips: false,
      allowPlace: false,
      allowShoot: true,
      onCellClick: (r, c) => handleShot(1, r, c)
    });
  } else if (phase === 'BATTLE_P2') {
    leftBoardTitle.textContent = "1-O'yinchi (Nishon 🎯)";
    rightBoardTitle.textContent = "2-O'yinchi (Sizning flotingiz)";
    leftBoardBox.classList.add('active-target');

    renderSingleBoard(leftBoardEl, p1Board, p1Ships, {
      showShips: false,
      allowPlace: false,
      allowShoot: true,
      onCellClick: (r, c) => handleShot(2, r, c)
    });
    renderSingleBoard(rightBoardEl, p2Board, p2Ships, {
      showShips: true, allowPlace: false, allowShoot: false
    });
  } else if (phase === 'GAME_OVER') {
    leftBoardTitle.textContent = "1-O'yinchi maydoni";
    rightBoardTitle.textContent = "2-O'yinchi maydoni";
    renderSingleBoard(leftBoardEl, p1Board, p1Ships, {
      showShips: true, allowPlace: false, allowShoot: false
    });
    renderSingleBoard(rightBoardEl, p2Board, p2Ships, {
      showShips: true, allowPlace: false, allowShoot: false
    });
  }

  leftAliveEl.textContent = `Kemalar: ${p1Ships.filter(s => !s.sunk).length}`;
  rightAliveEl.textContent = `Kemalar: ${p2Ships.filter(s => !s.sunk).length}`;
}

function previewShip(boardEl, boardData, row, col) {
  clearPreview(boardEl);
  if (!selectedShipSize || availableFleet[selectedShipSize] <= 0) return;

  const valid = canPlaceShip(boardData, row, col, selectedShipSize, isHorizontal);
  for (let i = 0; i < selectedShipSize; i++) {
    const r = isHorizontal ? row : row + i;
    const c = isHorizontal ? col + i : col;
    if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      boardEl.children[r * BOARD_SIZE + c].classList.add(valid ? 'preview-valid' : 'preview-invalid');
    }
  }
}

function clearPreview(boardEl) {
  Array.from(boardEl.children).forEach(el => el.classList.remove('preview-valid', 'preview-invalid'));
}

function handleManualPlace(board, shipsList, row, col) {
  if (!selectedShipSize || availableFleet[selectedShipSize] <= 0) return;
  if (canPlaceShip(board, row, col, selectedShipSize, isHorizontal)) {
    placeShip(board, shipsList, row, col, selectedShipSize, isHorizontal);
    availableFleet[selectedShipSize]--;
    playSound('place');

    if (availableFleet[selectedShipSize] === 0) {
      const next = FLEET_CONFIG.find(f => availableFleet[f.size] > 0);
      selectedShipSize = next ? next.size : null;
    }

    confirmSetupBtn.disabled = !Object.values(availableFleet).every(v => v === 0);
    renderShipDock();
    renderAll();
  }
}

function markSurroundingAsMiss(board, ship) {
  ship.cells.forEach(({ r, c }) => {
    board[r][c].sunk = true;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
          if (!board[nr][nc].hasShip) board[nr][nc].miss = true;
        }
      }
    }
  });
}

function showCurtain(title, desc, nextPhase) {
  pendingNextPhase = nextPhase;
  curtainTitle.textContent = title;
  curtainDesc.textContent = desc;
  passTurnOverlay.classList.add('show');
}

function handleShot(shooter, r, c) {
  const targetBoard = shooter === 1 ? p2Board : p1Board;
  const targetShips = shooter === 1 ? p2Ships : p1Ships;
  const cell = targetBoard[r][c];

  if (cell.hit || cell.miss) return;

  if (shooter === 1) stats.p1Shots++;
  else stats.p2Shots++;

  if (cell.hasShip) {
    cell.hit = true;
    if (shooter === 1) stats.p1Hits++;
    else stats.p2Hits++;

    const ship = targetShips.find(s => s.id === cell.shipId);
    ship.hits++;

    if (ship.hits === ship.size) {
      ship.sunk = true;
      markSurroundingAsMiss(targetBoard, ship);
      playSound('sunk');
      updateStatus(`🔥 ${shooter}-O'yinchi kemani cho'ktirdi! Yana o'q uzing!`, shooter === 1 ? 'turn-p1' : 'turn-p2');
    } else {
      playSound('hit');
      updateStatus(`💥 Tegdi! ${shooter}-O'yinchi yana otadi!`, shooter === 1 ? 'turn-p1' : 'turn-p2');
    }

    renderAll();

    if (targetShips.every(s => s.sunk)) {
      finishMatch(shooter);
    }
  } else {
    cell.miss = true;
    playSound('miss');
    renderAll();

    const nextPlayer = shooter === 1 ? 2 : 1;
    const nextBattlePhase = shooter === 1 ? 'BATTLE_P2' : 'BATTLE_P1';
    updateStatus(`💦 Tegmadi! Navbat ${nextPlayer}-O'yinchiga o'tmoqda...`);

    setTimeout(() => {
      showCurtain(
        `Navbat ${nextPlayer}-O'yinchiga!`,
        `Qurilmani ${nextPlayer}-O'yinchiga uzating. Kemalar yashirildi.`,
        nextBattlePhase
      );
    }, 550);
  }
}

function finishMatch(winner) {
  phase = 'GAME_OVER';
  renderAll();

  if (winner === 1) p1Score++;
  else p2Score++;

  document.getElementById('p1Score').textContent = p1Score;
  document.getElementById('p2Score').textContent = p2Score;

  const p1Acc = stats.p1Shots ? Math.round((stats.p1Hits / stats.p1Shots) * 100) : 0;
  const p2Acc = stats.p2Shots ? Math.round((stats.p2Hits / stats.p2Shots) * 100) : 0;

  document.getElementById('winnerTitle').textContent = `${winner}-O'YINCHI G'OLIB BO'LDI!`;
  document.getElementById('p1Acc').textContent = `${p1Acc}% (${stats.p1Hits}/${stats.p1Shots})`;
  document.getElementById('p2Acc').textContent = `${p2Acc}% (${stats.p2Hits}/${stats.p2Shots})`;

  setTimeout(() => winModal.classList.add('show'), 500);
}

// Tugmalar
rotateBtn.addEventListener('click', () => {
  isHorizontal = !isHorizontal;
  updateRotateBtn();
});

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'r' && (phase === 'SETUP_P1' || phase === 'SETUP_P2')) {
    isHorizontal = !isHorizontal;
    updateRotateBtn();
  }
});

autoPlaceBtn.addEventListener('click', () => {
  if (phase === 'SETUP_P1') autoPlaceFleet(p1Board, p1Ships);
  else if (phase === 'SETUP_P2') autoPlaceFleet(p2Board, p2Ships);

  FLEET_CONFIG.forEach(item => (availableFleet[item.size] = 0));
  selectedShipSize = null;
  confirmSetupBtn.disabled = false;
  playSound('place');
  renderShipDock();
  renderAll();
});

clearBtn.addEventListener('click', () => {
  if (phase === 'SETUP_P1') {
    p1Board = createEmptyBoard();
    p1Ships = [];
  } else if (phase === 'SETUP_P2') {
    p2Board = createEmptyBoard();
    p2Ships = [];
  }
  resetFleetStock();
  renderShipDock();
  renderAll();
});

confirmSetupBtn.addEventListener('click', () => {
  if (phase === 'SETUP_P1') {
    showCurtain(
      "Qurilmani 2-O'yinchiga bering",
      "1-O'yinchi kemalari saqlandi va yashirildi. Endi 2-O'yinchi joylashtiradi.",
      'SETUP_P2'
    );
  } else if (phase === 'SETUP_P2') {
    showCurtain(
      "Jang boshlanmoqda! (1-O'yinchi)",
      "Ikkala flot tayyor! Qurilmani birinchi zarba uchun 1-O'yinchiga bering.",
      'BATTLE_P1'
    );
  }
});

curtainReadyBtn.addEventListener('click', () => {
  passTurnOverlay.classList.remove('show');
  if (!pendingNextPhase) return;

  phase = pendingNextPhase;
  pendingNextPhase = null;

  if (phase === 'SETUP_P2') {
    resetFleetStock();
    confirmSetupBtn.textContent = '⚔️ Jangni boshlash';
    updateStatus("2-O'yinchi: Kemalaringizni joylashtiring", 'turn-p2');
    renderShipDock();
  } else if (phase === 'BATTLE_P1') {
    setupPanel.style.display = 'none';
    updateStatus("🎯 1-O'yinchi yurishi: O'ng maydonga o'q uzing", 'turn-p1');
  } else if (phase === 'BATTLE_P2') {
    setupPanel.style.display = 'none';
    updateStatus("🎯 2-O'yinchi yurishi: Chap maydonga o'q uzing", 'turn-p2');
  }

  renderAll();
});

newGameBtn.addEventListener('click', initMatch);
document.getElementById('rematchBtn').addEventListener('click', initMatch);

soundToggleBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggleBtn.textContent = soundEnabled ? '🔊' : '🔇';
});

// Ishga tushirish
renderCoordinates();
initMatch();