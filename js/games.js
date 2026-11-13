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
    description: "Toshkent ko'chalarida 3D mototsikl poygasi. Gazni bosing va raqiblardan o'zib keting!",
    path: "games/abubakir-moto/index.html",
    thumb: "games/abubakir-moto/thumb.png",
    controls: "W / ↑ — gaz, A D / ← → — burilish, R — qayta boshlash",
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
    description: "Retro uslubdagi arkada poyga. Mashinalardan qoching, yashil nitro qo'shimcha ochko beradi!",
    path: "games/abubakir-retro/index.html",
    thumb: "games/abubakir-retro/thumb.png",
    controls: "← → yoki A D — polosa almashtirish",
    orientation: "portrait"
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
    description: "$15 000 byudjet bilan avtosalondan mashina tanlang va 20 km masofani bosib o'ting. 1000 ta level!",
    path: "games/dinislom-cars/index.html",
    thumb: "games/dinislom-cars/thumb.png",
    controls: "W — gaz, S — tormoz, A D — polosa almashtirish, Enter — boshlash",
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
    id: "dinislom-xotira",
    title: "Xotira kartalari",
    author: "Dinislom",
    category: "Puzzle",
    description: "Bir xil rasmli juft kartalarni toping. Xotirangizni sinab ko'ring!",
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
    description: "Raqamlarni tartib bilan joylashtiring. Klassik boshqotirma.",
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
    description: "60 soniyada iloji boricha ko'p misol yeching. Xato javob 3 soniya oladi!",
    path: "games/dovudxon-hisob/index.html",
    thumb: "games/dovudxon-hisob/thumb.png",
    controls: "Sichqoncha yoki 1–4 raqamlari, Enter — boshlash",
    orientation: "landscape"
  },
  {
    id: "dovudxon-sakrovchi",
    title: "Sakrovchi",
    author: "Dovudxon",
    category: "Action",
    description: "To'siqlardan sakrab o'ting va iloji boricha uzoqqa yuguring. Havoda yana bir marta sakrash mumkin!",
    path: "games/dovudxon-sakrovchi/index.html",
    thumb: "games/dovudxon-sakrovchi/thumb.png",
    controls: "Probel, ↑ yoki ekranni bosish — sakrash",
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
    description: "Realistik 3D shahar poygasi skuterda.",
    path: "games/ibrohim-skuter/index.html",
    thumb: "games/ibrohim-skuter/thumb.png",
    controls: "Strelkalar yoki W A S D",
    orientation: "landscape"
  },
  {
    id: "ibrohim-velo",
    title: "Super Velo",
    author: "Ibrohim",
    category: "Poyga",
    description: "O'rmon bo'ylab velosiped poygasi.",
    path: "games/ibrohim-velo/index.html",
    thumb: "games/ibrohim-velo/thumb.png",
    controls: "W / ↑ — pedal, A D / ← → — burilish, Probel — sakrash",
    orientation: "landscape"
  },
  {
    id: "ibrohim-kosmik",
    title: "Kosmik jang",
    author: "Ibrohim",
    category: "Action",
    description: "Kemangizni boshqaring va dushman kemalarini yo'q qiling.",
    path: "games/ibrohim-kosmik/index.html",
    thumb: "games/ibrohim-kosmik/thumb.png",
    controls: "← → — harakat, Probel — o'q otish (telefonda barmoq bilan)",
    orientation: "landscape"
  },
  {
    id: "ibrohim-x-va-o",
    title: "X va O",
    author: "Ibrohim",
    category: "Puzzle",
    description: "Klassik X va O: kompyuterga qarshi yoki do'stingiz bilan o'ynang.",
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
    description: "Klassik ilon o'yini. Olmalarni yeb, iloningizni uzaytiring, lekin devorga va o'zingizga urilmang!",
    path: "games/tohirjon-ilon/index.html",
    thumb: "games/tohirjon-ilon/thumb.png",
    controls: "Strelkalar yoki W A S D, Probel — pauza",
    orientation: "landscape"
  },
  {
    id: "tohirjon-kukilar",
    title: "Kukilar fabrikasi",
    author: "Tohirjon",
    category: "Arcade",
    description: "Kukini bosing, ball yig'ing va yaxshilanishlar sotib oling. Qancha ko'p yig'a olasiz?",
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
    description: "Kompyuter 1 dan 100 gacha son o'yladi. Uni eng kam urinishda toping!",
    path: "games/tohirjon-sonni-top/index.html",
    thumb: "games/tohirjon-sonni-top/thumb.png",
    controls: "Klaviatura: raqam yozib Enter bosing",
    orientation: "landscape"
  },
  {
    id: "tohirjon-racing",
    title: "Uzbekistan 3D Racing",
    author: "Tohirjon",
    category: "Poyga",
    description: "Toshkent, Samarqand, Buxoro, Farg'ona, Namangan va Xiva yo'llarida 3D poyga. Neon GT, Turbo X yoki Gold Viper mashinasini tanlang!",
    path: "games/tohirjon-racing/index.html",
    thumb: "games/tohirjon-racing/thumb.png",
    controls: "← → / A D — burilish, Probel — nitro, Esc — pauza",
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
