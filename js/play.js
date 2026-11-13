/* =========================================================
   play.js — o'yin sahifasi mantiqi (play.html?id=...)
   Umumiy yordamchilar (Store, createCard, findGame) app.js'da.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- 1. URL'dan id'ni olish ---------- */
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var game = id ? findGame(id) : null;

  if (!game) {
    showNotFound();
    return;
  }

  /* ---------- 2. Ma'lumotlarni chiqarish ---------- */
  document.title = game.title + " — IT School Games";
  document.getElementById("gameTitle").textContent = game.title;
  document.getElementById("gameAuthor").textContent = "👤 " + game.author;
  document.getElementById("gameDesc").textContent = game.description || "";
  document.getElementById("gameControls").textContent = game.controls || "—";

  var badge = document.getElementById("gameCategory");
  badge.textContent = game.category;
  badge.setAttribute("data-cat", game.category);

  /* ---------- 3. Statistika ---------- */
  Store.addPlay(game.id);    // o'ynalganlar soni +1
  Store.addRecent(game.id);  // "Yaqinda o'ynalganlar" ro'yxatiga

  /* ---------- 4. O'yinni iframe'da yuklash ---------- */
  var stage = document.getElementById("stage");
  var frame = document.getElementById("gameFrame");
  var loader = document.getElementById("loader");

  if (game.orientation === "portrait") stage.classList.add("portrait");

  frame.addEventListener("load", function () {
    if (!frame.getAttribute("src")) return; // bo'sh about:blank yuklanishini e'tiborsiz qoldiramiz
    loader.classList.add("done");
    focusGame();
  });

  frame.src = game.path;

  // Klaviatura darhol ishlashi uchun iframe'ga focus beramiz
  function focusGame() {
    frame.focus();
    try { frame.contentWindow.focus(); } catch (e) { /* boshqa domen bo'lsa */ }
  }

  // O'yin maydoni bosilganda ham focus qaytsin
  stage.addEventListener("click", focusGame);

  /* ---------- 5. Tugmalar ---------- */

  // ♥ Sevimli
  var favBtn = document.getElementById("favBtn");
  function updateFav() {
    var fav = Store.isFavorite(game.id);
    favBtn.textContent = fav ? "♥" : "♡";
    favBtn.classList.toggle("active", fav);
    favBtn.title = fav ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish";
  }
  favBtn.addEventListener("click", function () {
    Store.toggleFavorite(game.id);
    updateFav();
    focusGame();
  });
  updateFav();

  // ↻ Qayta boshlash — iframe'ni qayta yuklaymiz
  document.getElementById("restartBtn").addEventListener("click", function () {
    loader.classList.remove("done");
    try {
      frame.contentWindow.location.reload();
    } catch (e) {
      frame.src = game.path;
    }
  });

  // ⛶ To'liq ekran (Fullscreen API)
  var fsBtn = document.getElementById("fullscreenBtn");
  fsBtn.addEventListener("click", function () {
    var fsElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsElement) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      var request = stage.requestFullscreen || stage.webkitRequestFullscreen;
      if (request) {
        var result = request.call(stage);
        if (result && result.then) result.then(focusGame).catch(function () {});
      } else {
        alert("Brauzeringiz to'liq ekran rejimini qo'llab-quvvatlamaydi.");
      }
    }
  });

  /* ---------- 6. Pastdagi tavsiyalar ---------- */
  var others = window.GAMES.filter(function (g) { return g.id !== game.id; });

  // Shu muallifning boshqa o'yinlari
  var byAuthor = others.filter(function (g) { return g.author === game.author; });
  document.getElementById("authorTitle").textContent = "👤 " + game.author + "ning boshqa o'yinlari";
  fillRow("authorSection", "authorRow", byAuthor);

  // O'xshash o'yinlar — shu kategoriyadan, boshqa mualliflar
  var similar = others.filter(function (g) {
    return g.category === game.category && g.author !== game.author;
  });
  fillRow("similarSection", "similarRow", similar);

  function fillRow(sectionId, rowId, list) {
    var row = document.getElementById(rowId);
    list.forEach(function (g) { row.appendChild(createCard(g, true)); });
    document.getElementById(sectionId).classList.toggle("hidden", list.length === 0);
  }

  // Kartochkadagi ♥ bosilsa, yuqoridagi tugmani ham yangilaymiz
  document.addEventListener("favorites-changed", function () {
    updateFav();
    document.querySelectorAll(".row .fav-btn").forEach(function (btn) {
      var href = btn.closest(".card").getAttribute("href");
      var gid = decodeURIComponent(href.split("id=")[1]);
      var fav = Store.isFavorite(gid);
      btn.classList.toggle("active", fav);
      btn.textContent = fav ? "♥" : "♡";
    });
  });
});

/* ---------- O'yin topilmadi ---------- */
function showNotFound() {
  document.title = "O'yin topilmadi — IT School Games";
  document.querySelector(".play-info").innerHTML = "";
  document.querySelector(".play-actions").innerHTML =
    '<button id="themeBtn" class="icon-btn" type="button" aria-label="Kun/tun rejimi">🌙</button>';
  initTheme(); // tugma qayta yaratildi, shuning uchun qayta ulaymiz

  document.getElementById("main").innerHTML =
    '<div class="not-found">' +
      '<div class="big">🕹️❓</div>' +
      '<h1>O\'yin topilmadi</h1>' +
      '<p>Bunday o\'yin mavjud emas yoki havola noto\'g\'ri.</p>' +
      '<a class="btn" href="index.html">🏠 Bosh sahifaga qaytish</a>' +
    '</div>';
}
