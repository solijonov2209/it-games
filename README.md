# 🎮 IT School Games — o'quvchilar o'yinlari platformasi

O'quvchilar HTML, CSS va JavaScript'da yozgan o'yinlarni bitta joyga yig'adigan sayt.
Backend, framework yoki `npm` kerak emas — oddiy fayllar.

Sayt quyidagi usullarning hammasida ishlaydi:
- `index.html` faylini ikki marta bosib brauzerda ochish (`file://`)
- GitHub Pages
- Netlify

---

## 📁 Papka tuzilmasi

```
/
├── index.html          bosh sahifa (o'yinlar katalogi)
├── play.html           o'yin sahifasi: play.html?id=tohirjon-ilon
├── css/style.css       barcha uslublar (kun/tun rejimi ham shu yerda)
├── js/games.js         O'YINLAR RO'YXATI (manifest)
├── js/app.js           katalog mantiqi + umumiy yordamchilar
├── js/play.js          o'yin sahifasi mantiqi
├── assets/placeholder.svg   rasm topilmasa ko'rsatiladigan rasm
└── games/
    ├── tohirjon-ilon/  index.html, thumb.png, boshqa fayllar
    ├── abubakir-moto/
    └── ...
```

---

## 1. ➕ Yangi o'yin qanday qo'shiladi

**1-qadam.** O'quvchining o'yin papkasini `games/` ichiga tashlang:

```
games/
└── sardor-racing/
    ├── index.html     ← albatta shu nomda!
    ├── thumb.png      ← 640x360 rasm
    ├── style.css
    ├── game.js
    └── img/
        └── car.png
```

**2-qadam.** `js/games.js` faylini oching va massiv oxiriga bitta yozuv qo'shing:

```js
  {
    id: "sardor-racing",
    title: "Poyga",
    author: "Sardor Aliyev",
    category: "Arcade",
    description: "Tez mashinada to'siqlardan qochib o'ting",
    path: "games/sardor-racing/index.html",
    thumb: "games/sardor-racing/thumb.png",
    controls: "Strelkalar",
    orientation: "landscape"
  },
```

Tamom! Sahifani yangilang (F5) — o'yin katalogda paydo bo'ladi.

> 💡 **Eslatmalar**
> - `id` papka nomi bilan bir xil bo'lsin.
> - Har bir `{ ... }` yozuvdan keyin **vergul** qo'ying.
> - Yangi `category` yozsangiz (masalan `"Sport"`), u filtrda avtomatik paydo bo'ladi.
> - Yangi o'quvchi ismi ham "O'quvchilar" ro'yxatiga avtomatik qo'shiladi.
> - `orientation`: `"landscape"` — yotiq ekran, `"portrait"` — tik ekran.
> - Xato qilsangiz, sahifa bo'sh ko'rinadi. Brauzerda **F12 → Console** ni ochib xatoni ko'ring.

---

## 2. 📏 O'quvchilar uchun qoidalar

| # | Qoida | ✅ To'g'ri | ❌ Noto'g'ri |
|---|-------|-----------|-------------|
| 1 | O'yinning kirish fayli **`index.html`** bo'lsin | `index.html` | `oyin.html`, `Index.HTML` |
| 2 | Barcha yo'llar **nisbiy** bo'lsin | `./img/a.png`, `img/a.png` | `/img/a.png`, `C:\Users\...\a.png` |
| 3 | Rasm **`thumb.png`**, o'lchami **640x360** (16:9) | `thumb.png` 640x360 | `rasm.jpg` 500x500 |
| 4 | Papka nomi **`ism-oyin`** formatida, kichik harflar, bo'sh joysiz | `tohirjon-ilon` | `Tohirjon Ilon`, `tohirjon_Ilon`, `ilon o'yini` |

**Nega bu muhim?**
- Platforma har doim `games/<papka>/index.html` faylini ochadi.
- `/img/a.png` saytning eng boshidan qidiriladi va o'yin papkasidan emas — rasm yo'qoladi.
- Bo'sh joy va katta harflar GitHub Pages'da havolalarni buzadi.
- Papka nomida faqat lotin harflari, raqamlar va `-` belgisini ishlating (`'` ham ishlatmang).

**Qo'shimcha maslahatlar:**
- O'yin oyna o'lchamiga moslashsin (`100vw`, `100vh`, yoki `max-width: 100%`).
- `alert()` dan kam foydalaning — o'yin iframe ichida ishlaydi.
- Rekordlarni `localStorage` da saqlasangiz, kalit nomiga o'yin nomini qo'shing:
  `localStorage.setItem("tohirjon-ilon-best", 10)` — boshqa o'yinlar bilan aralashmasin.

---

## 3. 🚀 GitHub Pages'ga joylash

1. [github.com](https://github.com) da akkaunt oching (bo'lmasa).
2. **New repository** tugmasini bosing, nom bering (masalan `it-school-games`), **Public** ni tanlang va **Create repository** ni bosing.
3. **"uploading an existing file"** havolasini bosing.
4. Loyiha papkasidagi **hamma fayl va papkalarni** (index.html, play.html, css, js, assets, games) sudrab tashlang.
   > Papkaning o'zini emas, uning **ichidagilarni** tashlang — `index.html` repozitoriyaning ildizida bo'lishi kerak.
5. Pastda **Commit changes** ni bosing.
6. Repozitoriyada **Settings → Pages** bo'limiga o'ting.
7. **Source:** `Deploy from a branch`, **Branch:** `main`, papka: `/ (root)` → **Save**.
8. 1–2 daqiqadan keyin sayt manzili chiqadi:
   `https://<sizning-login>.github.io/it-school-games/`

**Yangi o'yin qo'shganda:** o'yin papkasini `games/` ga yuklang, `js/games.js` ni GitHub'da tahrirlang (✏️ belgisi) va **Commit** qiling. Bir necha daqiqada sayt yangilanadi.

### Netlify (muqobil, yanada oson)
[app.netlify.com/drop](https://app.netlify.com/drop) sahifasiga butun loyiha papkasini sudrab tashlang — tayyor.

---

## 💾 Brauzerda saqlanadigan ma'lumotlar

Quyidagilar `localStorage` da saqlanadi (faqat shu kompyuter va brauzerda):

| Kalit | Nima |
|-------|------|
| `gp_theme` | Kun/tun rejimi |
| `gp_favorites` | Sevimli o'yinlar |
| `gp_recent` | Oxirgi 8 ta o'ynalgan o'yin |
| `gp_plays` | Har bir o'yin necha marta ochilgani |

---

## 👥 O'quvchilar va o'yinlar

| O'quvchi | O'yinlar (papkalar) |
|----------|---------------------|
| Abubakir | `abubakir-moto`, `abubakir-futbol`, `abubakir-retro` |
| Azizbek  | `azizbek-bekinmachoq`, `azizbek-iloncha`, `azizbek-kosmik` |
| Dinislom | `dinislom-cars`, `dinislom-goyalar`, `dinislom-bilimdon`, `dinislom-dream-weaver`, `dinislom-dengiz-jangi`, `dinislom-detektiv`, `dinislom-xotira`, `dinislom-15` |
| Dovudxon | `dovudxon-futbol`, `dovudxon-sprinter`, `dovudxon-shaxmat`, `dovudxon-sakrovchi`, `dovudxon-hisob` |
| Ibrohim  | `ibrohim-skuter`, `ibrohim-velo`, `ibrohim-kosmik`, `ibrohim-x-va-o`, `ibrohim-tosh-qaychi`, `ibrohim-militsiya`, `ibrohim-askarlar` |
| Tohirjon | `tohirjon-racing`, `tohirjon-scooter`, `tohirjon-ilon`, `tohirjon-kukilar`, `tohirjon-sonni-top` |
| Temur    | `temur-minecraft`, `temur-mini-minecraft` |
| Kamron   | `kamron-3d-poyga`, `kamron-dr-driving`, `kamron-kosmik-urush`, `kamron-sakrash` |

O'yinni boshqa o'quvchiga o'tkazish uchun: papka nomini o'zgartiring va `games.js` dagi
`id`, `author`, `path`, `thumb` maydonlarini yangilang.

> ⚠️ Ba'zi o'quvchilar o'yinlari internetdan kutubxona yuklaydi (Tailwind, Three.js, Tone.js),
> shuning uchun ular internet bo'lmasa to'g'ri ishlamaydi.

---

## 👥 2 kishilik o'yinlar

Bitta klaviaturada ikki kishi o'ynaydi: **1-o'yinchi — W A S D**, **2-o'yinchi — strelkalar**.

| O'yin | 2 kishilik rejim | Qo'shimcha |
|-------|------------------|------------|
| Super Scooter 400 | ekran ikkiga bo'linadi, 5 km poyga | 4 trassa, jonlar, tanga va yoqilg'i |
| Retro Poyga | ikki yo'l yonma-yon | 4 trassa, nitro, qalqon |
| Afsonaviy mashinalar | bitta yo'lda poyga | 5 xil yo'l, yomg'ir/qor, ⚡ nitro |
| Uzbekistan 3D Racing | bitta yo'lda 4 polosa | kunduz / tun / yomg'ir, sakrash, jonlar |
| Super Velo | ekran ikkiga bo'linadi | 4 trassa: yoz, kuz, qish, cho'l |
| Skuterla poygasi | ekran ikkiga bo'linadi (3D) | kunduz / kechqurun / tun |
| Ilon | bitta maydonda 2 ilon | 3 xarita, 3 tezlik, oltin olma |
| Xotira kartalari | navbat bilan | 3 o'lcham, 3 mavzu |
| Sakrovchi | ekran yuqori/pastga bo'linadi | tangalar, qushlar, kun-tun |
| Tez hisob | duel (1-4 va 7-0 tugmalari) | 4 amal, 3 daraja |
| Kosmik jang | birga (kooperativ) | boss, bonuslar |
| Sonni top | navbat bilan | 3 oraliq, issiq-sovuq |
| X va O | do'st bilan | 3×3, 4×4, 5×5, kuchli kompyuter |

Toshkent 3D Moto Poygaga **4 xil yo'l sharoiti** qo'shilgan (o'yin davomida **T** tugmasi yoki pauza menyusi).
