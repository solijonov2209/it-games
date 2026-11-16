/* =========================================================
   O'YINLAR RO'YXATI (manifest)

   Yangi o'yin qo'shish uchun:
   1) O'yin papkasini games/ ichiga tashlang (masalan games/tohirjon-ilon/)
   2) Quyidagi massivga bitta yangi { ... } yozuv qo'shing.

   Maydonlar:
     id          — noyob nom, papka nomi bilan bir xil ("ism-oyin")
     title       — o'yin nomi
     author      — o'quvchining ism-familiyasi
     category    — Arcade, Puzzle, Action, Ta'limiy ... (yangi kategoriya
                   yozsangiz, u filtrda avtomatik paydo bo'ladi)
     description — qisqa tavsif
     path        — o'yinning index.html fayliga yo'l
     thumb       — rasm (640x360, 16:9)
     controls    — boshqaruv tugmalari
     orientation — "landscape" (yotiq) yoki "portrait" (tik)

   DIQQAT: har bir yozuvdan keyin vergul (,) qo'yishni unutmang!
   ========================================================= */

window.GAMES = [
  /* ---------- Abubakir ---------- */
  {
    id: "abubakir-moto",
    title: "Toshkent 3D Moto Poyga",
    author: "Abubakir",
    category: "Poyga",
    description: "Toshkent ko‘chalarida 3D mototsikl poygasi. 4 xil yo‘l sharoiti: oqshom, kunduz, tun (fara yonadi) va yomg‘ir!",
    path: "games/abubakir-moto/index.html",
    thumb: "games/abubakir-moto/thumb.png",
    controls: "W / ↑ — gaz, S — tormoz, A D / ← → — burilish, T — yo‘l sharoitini almashtirish, R — qayta boshlash",
    orientation: "landscape"
  },
  {
    id: "abubakir-futbol",
    title: "Futbol 5v5",
    author: "Abubakir",
    category: "Sport",
    description: "O'zbekiston terma jamoasi bilan maydonga tushing! 3 xil qiyinlik darajasi.",
    path: "games/abubakir-futbol/index.html",
    thumb: "games/abubakir-futbol/thumb.png",
    controls: "W A S D / Strelkalar — yugurish, Probel / Z — zarba, X — pas, C — almashtirish, Shift — tezlashish",
    orientation: "landscape"
  },
  {
    id: "abubakir-retro",
    title: "Retro Poyga",
    author: "Abubakir",
    category: "Poyga",
    description: "Retro arkada poyga: 1 yoki 2 o‘yinchi, 4 xil trassa (neon, cho‘l, qor, tun). Tanga, nitro va qalqon yig‘ing, har kimda 3 ta jon!",
    path: "games/abubakir-retro/index.html",
    thumb: "games/abubakir-retro/thumb.png",
    controls: "1-o‘yinchi: A D · 2-o‘yinchi: ← → · P — pauza",
    orientation: "landscape"
  },

  /* ---------- Azizbek ---------- */
  {
    id: "azizbek-bekinmachoq",
    title: "Bekinmachoq",
    author: "Azizbek",
    category: "Action",
    description: "Qidiruvchidan yashiring yoki o'zingiz qidiring — mashhur bolalar o'yini.",
    path: "games/azizbek-bekinmachoq/index.html",
    thumb: "games/azizbek-bekinmachoq/thumb.png",
    controls: "Strelkalar yoki W A S D",
    orientation: "landscape"
  },
  {
    id: "azizbek-iloncha",
    title: "Neon Iloncha",
    author: "Azizbek",
    category: "Arcade",
    description: "Neon chiroqlar ichida ilon o'yini. Ovqatni yeb, eng uzun ilonni yarating.",
    path: "games/azizbek-iloncha/index.html",
    thumb: "games/azizbek-iloncha/thumb.png",
    controls: "Strelkalar yoki W A S D",
    orientation: "landscape"
  },
  {
    id: "azizbek-kosmik",
    title: "Kosmik Himoyachi",
    author: "Azizbek",
    category: "Action",
    description: "Meteoritlarni yo'q qiling va galaktikani saqlab qoling!",
    path: "games/azizbek-kosmik/index.html",
    thumb: "games/azizbek-kosmik/thumb.png",
    controls: "Sichqoncha / barmoq bilan surish yoki ← → va Probel",
    orientation: "landscape"
  },

  /* ---------- Dinislom ---------- */
  {
    id: "dinislom-cars",
    title: "Afsonaviy mashinalar poygasi",
    author: "Dinislom",
    category: "Poyga",
    description: "Avtosalondan mashina tanlang va 20 km poygada g‘olib bo‘ling! 1 yoki 2 o‘yinchi, 5 xil yo‘l: neon, shahar, cho‘l, yomg‘ir, qor. ⚡ nitro bonusi.",
    path: "games/dinislom-cars/index.html",
    thumb: "games/dinislom-cars/thumb.png",
    controls: "1-o‘yinchi: W gaz, S tormoz, A D polosa · 2-o‘yinchi: strelkalar · Enter — boshlash",
    orientation: "landscape"
  },
  {
    id: "dinislom-goyalar",
    title: "Top 3 o'yin g'oyasi",
    author: "Dinislom",
    category: "Puzzle",
    description: "Uchta noyob o'yin g'oyasi va ularning mini-o'yinlari: Eco-Builder, Xotiralar sandig'i va boshqalar.",
    path: "games/dinislom-goyalar/index.html",
    thumb: "games/dinislom-goyalar/thumb.png",
    controls: "Sichqoncha bilan bosish",
    orientation: "landscape"
  },
  {
    id: "dinislom-bilimdon",
    title: "Bilimdon Arena",
    author: "Dinislom",
    category: "Ta'limiy",
    description: "Matematika, tarix, biologiya, ingliz tili va yana 6 ta fandan viktorina. Har bir fanda 30 ta savol, raqib bot va 30 soniya vaqt! O'zbek va rus tillarida.",
    path: "games/dinislom-bilimdon/index.html",
    thumb: "games/dinislom-bilimdon/thumb.png",
    controls: "Sichqoncha bilan javobni tanlash",
    orientation: "landscape"
  },
  {
    id: "dinislom-xotira",
    title: "Xotira kartalari",
    author: "Dinislom",
    category: "Puzzle",
    description: "Juft kartalarni toping: 12, 16 yoki 24 karta, 3 mavzu (hayvonlar, mevalar, transport). 2 o‘yinchi navbat bilan — kim ko‘p juftlik topsa, o‘sha yutadi!",
    path: "games/dinislom-xotira/index.html",
    thumb: "games/dinislom-xotira/thumb.png",
    controls: "Sichqoncha bilan bosish",
    orientation: "landscape"
  },
  {
    id: "dinislom-15",
    title: "15 boshqotirma",
    author: "Dinislom",
    category: "Puzzle",
    description: "Raqamlarni tartib bilan joylashtiring: 3×3, 4×4 yoki 5×5. Har bir o‘lcham uchun eng tez vaqt saqlanadi.",
    path: "games/dinislom-15/index.html",
    thumb: "games/dinislom-15/thumb.png",
    controls: "Sichqoncha yoki strelkalar",
    orientation: "portrait"
  },

  /* ---------- Dovudxon ---------- */
  {
    id: "dovudxon-futbol",
    title: "Futbol chempionati 11v11",
    author: "Dovudxon",
    category: "Sport",
    description: "El Clasico va Super Liga: jamoangizni tanlang va 11 ga 11 futbol o'ynang.",
    path: "games/dovudxon-futbol/index.html",
    thumb: "games/dovudxon-futbol/thumb.png",
    controls: "Strelkalar — harakat, A — zarba, B — pas, C — yuqoridan pas",
    orientation: "landscape"
  },
  {
    id: "dovudxon-sprinter",
    title: "Sprinter",
    author: "Dovudxon",
    category: "Sport",
    description: "2.5D yugurish musobaqasi. Tugmalarni navbatma-navbat tez bosib, birinchi bo'lib marraga yeting!",
    path: "games/dovudxon-sprinter/index.html",
    thumb: "games/dovudxon-sprinter/thumb.png",
    controls: "← va → (yoki A va D) navbatma-navbat, Enter / Probel — boshlash",
    orientation: "landscape"
  },
  {
    id: "dovudxon-hisob",
    title: "Tez hisob",
    author: "Dovudxon",
    category: "Ta'limiy",
    description: "Tez hisoblash: + − × ÷ amallarini va qiyinlikni tanlang. 60 soniyalik rekord yoki 2 o‘yinchi duel — 10 ochkogacha!",
    path: "games/dovudxon-hisob/index.html",
    thumb: "games/dovudxon-hisob/thumb.png",
    controls: "1-o‘yinchi: 1 2 3 4 · 2-o‘yinchi (duel): 7 8 9 0 · sichqoncha ham ishlaydi",
    orientation: "landscape"
  },
  {
    id: "dovudxon-sakrovchi",
    title: "Sakrovchi",
    author: "Dovudxon",
    category: "Action",
    description: "To‘siq va qushlardan sakrab o‘ting, tangalarni yig‘ing. Kun kechga, keyin tunga aylanadi. 2 o‘yinchi — kim uzoqroq yuguradi?",
    path: "games/dovudxon-sakrovchi/index.html",
    thumb: "games/dovudxon-sakrovchi/thumb.png",
    controls: "1-o‘yinchi: W yoki Probel · 2-o‘yinchi: ↑ · telefonda ekranni bosing",
    orientation: "landscape"
  },
  {
    id: "dovudxon-shaxmat",
    title: "Shaxmat ustasi",
    author: "Dovudxon",
    category: "Puzzle",
    description: "Do'stingiz bilan bitta kompyuterda shaxmat o'ynang: 3, 5 yoki 10 daqiqalik soat, yurishlar tarixi va taxtani aylantirish.",
    path: "games/dovudxon-shaxmat/index.html",
    thumb: "games/dovudxon-shaxmat/thumb.png",
    controls: "Sichqoncha: donani bosing, keyin borish kerak bo'lgan katakni bosing",
    orientation: "landscape"
  },

  /* ---------- Ibrohim ---------- */
  {
    id: "ibrohim-skuter",
    title: "Skuterla poygasi",
    author: "Ibrohim",
    category: "Poyga",
    description: "Realistik 3D shahar poygasi skuterda. 2 o‘yinchi uchun ekran ikkiga bo‘linadi. Kunduz, kechqurun yoki tunda poyga qiling!",
    path: "games/ibrohim-skuter/index.html",
    thumb: "games/ibrohim-skuter/thumb.png",
    controls: "1-o‘yinchi: W A S D · 2-o‘yinchi: strelkalar",
    orientation: "landscape"
  },
  {
    id: "ibrohim-velo",
    title: "Super Velo",
    author: "Ibrohim",
    category: "Poyga",
    description: "Velosiped poygasi: 1 yoki 2 o‘yinchi (ekran ikkiga bo‘linadi), 4 xil trassa — yozgi, kuzgi, qishki o‘rmon va cho‘l.",
    path: "games/ibrohim-velo/index.html",
    thumb: "games/ibrohim-velo/thumb.png",
    controls: "1-o‘yinchi: A D — burilish, W — tezlash · 2-o‘yinchi: ← → va ↑ · B — qo‘ng‘iroq",
    orientation: "landscape"
  },
  {
    id: "ibrohim-kosmik",
    title: "Kosmik jang",
    author: "Ibrohim",
    category: "Action",
    description: "Kosmik bosqinchilarni yo‘q qiling! 2 o‘yinchi birga o‘ynaydi, har 30 ochkoda 👹 boss, ⚡ qo‘sh o‘q, 🛡️ qalqon va ❤️ jon bonuslari.",
    path: "games/ibrohim-kosmik/index.html",
    thumb: "games/ibrohim-kosmik/thumb.png",
    controls: "1-o‘yinchi: A D + Probel · 2-o‘yinchi: ← → + Enter · telefonda barmoq bilan",
    orientation: "landscape"
  },
  {
    id: "ibrohim-x-va-o",
    title: "X va O",
    author: "Ibrohim",
    category: "Puzzle",
    description: "X va O: 3×3, 4×4 yoki 5×5 taxta. Kompyuterga qarshi (oson yoki qiyin — 3×3 da yengilmas!) yoki do‘st bilan.",
    path: "games/ibrohim-x-va-o/index.html",
    thumb: "games/ibrohim-x-va-o/thumb.png",
    controls: "Sichqoncha bilan bosish",
    orientation: "landscape"
  },
  {
    id: "ibrohim-tosh-qaychi",
    title: "Tosh, Qaychi, Qog'oz",
    author: "Ibrohim",
    category: "Arcade",
    description: "Klassik o'yinning zamonaviy talqini: kompyuterga qarshi o'ynang. Cheksiz, 3 yoki 5 g'alabagacha rejimlar, oddiy yoki aqlli AI.",
    path: "games/ibrohim-tosh-qaychi/index.html",
    thumb: "games/ibrohim-tosh-qaychi/thumb.png",
    controls: "Sichqoncha yoki 1 — tosh, 2 — qaychi, 3 — qog'oz",
    orientation: "landscape"
  },

  /* ---------- Tohirjon ---------- */
  {
    id: "tohirjon-ilon",
    title: "Ilon",
    author: "Tohirjon",
    category: "Arcade",
    description: "Klassik ilon: 1 yoki 2 o‘yinchi bitta maydonda! 3 xarita (klassik, teleport, to‘siqlar), 3 tezlik, 🌟 oltin olma +5.",
    path: "games/tohirjon-ilon/index.html",
    thumb: "games/tohirjon-ilon/thumb.png",
    controls: "1-o‘yinchi: W A S D · 2-o‘yinchi: strelkalar · Probel — pauza, Enter — boshlash",
    orientation: "landscape"
  },
  {
    id: "tohirjon-kukilar",
    title: "Kukilar fabrikasi",
    author: "Tohirjon",
    category: "Arcade",
    description: "Kukini bosing, 6 xil yaxshilanish sotib oling, 🌟 oltin kukini ushlab ×7 bonus oling va yutuqlarni to‘plang. Progress saqlanadi!",
    path: "games/tohirjon-kukilar/index.html",
    thumb: "games/tohirjon-kukilar/thumb.png",
    controls: "Sichqoncha yoki barmoq bilan bosish",
    orientation: "landscape"
  },
  {
    id: "tohirjon-sonni-top",
    title: "Sonni top",
    author: "Tohirjon",
    category: "Ta'limiy",
    description: "Kompyuter o‘ylagan sonni toping: 1–50, 1–100 yoki 1–1000. Issiq-sovuq ko‘rsatkichi yordam beradi. 2 o‘yinchi navbat bilan o‘ynashi mumkin.",
    path: "games/tohirjon-sonni-top/index.html",
    thumb: "games/tohirjon-sonni-top/thumb.png",
    controls: "Raqam yozib Enter bosing",
    orientation: "landscape"
  },
  {
    id: "tohirjon-racing",
    title: "Uzbekistan 3D Racing",
    author: "Tohirjon",
    category: "Poyga",
    description: "O‘zbekiston shaharlari bo‘ylab 3D poyga. 1 yoki 2 o‘yinchi, kunduz / tun / yomg‘ir, sakrash, 3 ta jon va tobora oshib boruvchi tezlik!",
    path: "games/tohirjon-racing/index.html",
    thumb: "games/tohirjon-racing/thumb.png",
    controls: "1-o‘yinchi: A D — polosa, W — sakrash, Probel — nitro · 2-o‘yinchi: ← → va ↑ · Esc — pauza",
    orientation: "landscape"
  },
  {
    id: "tohirjon-scooter",
    title: "Super Scooter 400",
    author: "Tohirjon",
    category: "Poyga",
    description: "400 km/soat tezlikda tirbandlikdan qoching! 1 yoki 2 o‘yinchi (ekran ikkiga bo‘linadi), 4 trassa: shahar, cho‘l, qorli tog‘, tungi shahar. Tanga, yoqilg‘i, 3 ta jon.",
    path: "games/tohirjon-scooter/index.html",
    thumb: "games/tohirjon-scooter/thumb.png",
    controls: "1-o‘yinchi: A D, W gaz, Probel turbo · 2-o‘yinchi: ← → ↑, Enter turbo · P — pauza",
    orientation: "landscape"
  },

  /* ---------- Temur ---------- */
  {
    id: "temur-minecraft",
    title: "Minecraft 2D",
    author: "Temur",
    category: "Action",
    description: "2D bloklar olami: daraxt kesing, taxta va verstak yasang, bloklarni qazib quring. (O'yin ichidagi yozuvlar rus tilida.)",
    path: "games/temur-minecraft/index.html",
    thumb: "games/temur-minecraft/thumb.png",
    controls: "A D / ← → — yurish, W / Probel — sakrash, chap tugma — qazish, o'ng tugma — qo'yish / verstak, 1–8 — tanlash, C — verstakni yopish",
    orientation: "landscape"
  }
];
