/* =========================================================
   app.js — umumiy yordamchilar + bosh sahifa (katalog) mantiqi

   Bu fayl ikkala sahifada ham ulanadi:
     - index.html  → katalogni chizadi
     - play.html   → faqat umumiy yordamchilardan (Store, createCard,
                     tema) foydalanadi
   ========================================================= */

/* ---------- 1. localStorage bilan ishlash ---------- */
// localStorage ba'zan bloklangan bo'lishi mumkin (maxfiy rejim),
// shuning uchun har bir murojaat try/catch ichida.
var Store = {
  get: function (key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  },
  set: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* saqlab bo'lmasa — jim o'tamiz */ }
  },

  /* Sevimlilar: id'lar massivi */
  getFavorites: function () { return Store.get("gp_favorites", []); },
  isFavorite: function (id) { return Store.getFavorites().indexOf(id) !== -1; },
  toggleFavorite: function (id) {
    var favs = Store.getFavorites();
    var i = favs.indexOf(id);
    if (i === -1) favs.unshift(id); else favs.splice(i, 1);
    Store.set("gp_favorites", favs);
    return i === -1; // true — endi sevimli
  },

  /* Yaqinda o'ynalganlar: oxirgi 8 ta id */
  getRecent: function () { return Store.get("gp_recent", []); },
  addRecent: function (id) {
    var list = Store.getRecent().filter(function (x) { return x !== id; });
    list.unshift(id);
    Store.set("gp_recent", list.slice(0, 8));
  },

  /* O'ynalganlar soni: { "tohirjon-ilon": 3, ... } */
  getPlays: function (id) { return Store.get("gp_plays", {})[id] || 0; },
  addPlay: function (id) {
    var plays = Store.get("gp_plays", {});
    plays[id] = (plays[id] || 0) + 1;
    Store.set("gp_plays", plays);
  }
};

/* ---------- 2. Kichik yordamchi funksiyalar ---------- */

// HTML ichiga matn qo'yishdan oldin xavfsiz holga keltirish
function escapeHTML(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// id bo'yicha o'yinni topish
function findGame(id) {
  for (var i = 0; i < window.GAMES.length; i++) {
    if (window.GAMES[i].id === id) return window.GAMES[i];
  }
  return null;
}

// Massivdan takrorlanmaydigan qiymatlar
function unique(list) {
  return list.filter(function (item, i) { return list.indexOf(item) === i; });
}

/* ---------- 3. Kun/tun rejimi ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  var btn = document.getElementById("themeBtn");
  if (btn) {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.title = theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim";
  }
}

function initTheme() {
  var current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current);
  var btn = document.getElementById("themeBtn");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    Store.set("gp_theme", next);
  });
}

/* ---------- 4. Kartochka yaratish ---------- */
// small = true bo'lsa, gorizontal qator uchun kichik kartochka
function createCard(game, small) {
  var card = document.createElement("a");
  card.className = "card" + (small ? " small" : "");
  card.href = "play.html?id=" + encodeURIComponent(game.id);
  card.title = game.title;

  var plays = Store.getPlays(game.id);
  var fav = Store.isFavorite(game.id);

  card.innerHTML =
    '<div class="card-thumb">' +
      '<img loading="lazy" alt="" src="' + escapeHTML(game.thumb) + '">' +
      '<div class="card-play"><span>▶ O\'ynash</span></div>' +
      '<button class="fav-btn' + (fav ? " active" : "") + '" type="button" ' +
        'aria-label="Sevimlilarga qo\'shish">' + (fav ? "♥" : "♡") + '</button>' +
    '</div>' +
    '<div class="card-body">' +
      '<h3 class="card-title">' + escapeHTML(game.title) + '</h3>' +
      '<p class="card-author">👤 ' + escapeHTML(game.author) + '</p>' +
      '<div class="card-meta">' +
        '<span class="badge" data-cat="' + escapeHTML(game.category) + '">' + escapeHTML(game.category) + '</span>' +
        '<span class="plays" title="Necha marta o\'ynalgan">▶ ' + plays + '</span>' +
      '</div>' +
    '</div>';

  // Rasm topilmasa — placeholder
  var img = card.querySelector("img");
  img.onerror = function () {
    img.onerror = null;
    img.src = "assets/placeholder.svg";
  };

  // ♥ tugmasi bosilganda havola ochilmasligi kerak
  card.querySelector(".fav-btn").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    Store.toggleFavorite(game.id);
    document.dispatchEvent(new CustomEvent("favorites-changed"));
  });

  return card;
}

/* =========================================================
   5. KATALOG (faqat index.html'da ishlaydi)
   ========================================================= */
function initCatalog() {
  var grid = document.getElementById("grid");
  if (!grid) return; // bu bosh sahifa emas

  var games = window.GAMES || [];
  var state = { category: "all", author: "all", query: "" };

  var searchInput = document.getElementById("search");
  var chipsBox = document.getElementById("chips");
  var authorSelect = document.getElementById("authorSelect");
  var countEl = document.getElementById("gameCount");

  /* Kategoriya chiplari — GAMES'dan avtomatik */
  var categories = unique(games.map(function (g) { return g.category; }));
  var chipHTML = '<button class="chip active" data-cat="all">🎮 Hammasi</button>';
  categories.forEach(function (cat) {
    chipHTML += '<button class="chip" data-cat="' + escapeHTML(cat) + '">' + escapeHTML(cat) + '</button>';
  });
  chipsBox.innerHTML = chipHTML;

  chipsBox.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip");
    if (!chip) return;
    chipsBox.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");
    state.category = chip.getAttribute("data-cat");
    renderGrid();
  });

  /* O'quvchilar dropdown'i */
  var authors = unique(games.map(function (g) { return g.author; })).sort();
  authors.forEach(function (author) {
    var opt = document.createElement("option");
    opt.value = author;
    opt.textContent = author;
    authorSelect.appendChild(opt);
  });
  authorSelect.addEventListener("change", function () {
    state.author = authorSelect.value;
    renderGrid();
  });

  /* Qidiruv — har bir harf yozilganda darhol */
  searchInput.addEventListener("input", function () {
    state.query = searchInput.value.trim().toLowerCase();
    renderGrid();
  });

  /* Asosiy grid */
  function renderGrid() {
    var list = games.filter(function (g) {
      if (state.category !== "all" && g.category !== state.category) return false;
      if (state.author !== "all" && g.author !== state.author) return false;
      if (state.query) {
        var text = (g.title + " " + g.author + " " + g.description).toLowerCase();
        if (text.indexOf(state.query) === -1) return false;
      }
      return true;
    });

    grid.innerHTML = "";
    countEl.textContent = list.length;

    if (list.length === 0) {
      grid.innerHTML =
        '<div class="empty"><span class="big">🙈</span>Hech narsa topilmadi. Boshqa so\'z bilan qidirib ko\'ring.</div>';
      return;
    }
    list.forEach(function (g) { grid.appendChild(createCard(g)); });
  }

  /* Gorizontal qatorlar (Yaqinda o'ynalganlar, Sevimlilar) */
  function renderRow(sectionId, rowId, ids) {
    var section = document.getElementById(sectionId);
    var row = document.getElementById(rowId);
    var list = ids.map(findGame).filter(Boolean);
    row.innerHTML = "";
    section.classList.toggle("hidden", list.length === 0);
    list.forEach(function (g) { row.appendChild(createCard(g, true)); });
  }

  function renderAll() {
    renderRow("recentSection", "recentRow", Store.getRecent());
    renderRow("favSection", "favRow", Store.getFavorites());
    renderGrid();
  }

  // ♥ bosilganda hammasini qayta chizamiz
  document.addEventListener("favorites-changed", renderAll);

  // Orqaga tugmasi bilan qaytilganda (bfcache) ma'lumotlarni yangilash
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) renderAll();
  });

  renderAll();
}

/* ---------- Ishga tushirish ---------- */
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initCatalog();
});
