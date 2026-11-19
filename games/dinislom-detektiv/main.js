// 1888-yil London tergov ma'lumotlari
const locations = [
    {
        id: "study",
        name: "1. Lordning Kabineti (Voqea joyi)",
        desc: "Kamin yonida singan chashka va ochiq qolgan po'lat seyf turibdi. Deraza ichkaridan yopiq.",
        clueId: "clue_window",
        clueText: "Deraza ichkaridan qulflangan va tashqaridagi qorda hech qanday oyoq izi yo'q. O'g'ri uy ichidan chiqqan!",
        witness: {
            name: "Xizmatkor Thomas",
            role: "Qasr boshqaruvchisi (20 yillik xizmatchi)",
            avatar: "🤵",
            isSuspect: true,
            greeting: "Janob detektiv, bu dahshat! Seyf kaliti faqat Lord Blackwoodning o'zida bo'lardi.",
            quickQuestions: [
                { q: "Tunda qayerda edingiz?", key: "alibi" },
                { q: "Seyf kaliti haqida nima bilasiz?", key: "kalit" },
                { q: "Oxirgi marta kimni ko'rdingiz?", key: "kim" }
            ],
            answers: {
                alibi: "Soat 00:30 dan boshlab o'z xonamda uxlab yotgan edim. Qo'shnim — oshpaz xonim ham buni tasdiqlashi mumkin.",
                kalit: "Lord kechki ovqatdan so'ng kalitni paltosining cho'ntagiga solganini ko'rdim. Paltosi esa dahlizda osig'liq edi.",
                kim: "Soat 00:15 larda xonim Clara kabinet oldidan shoshilib o'tib ketayotganini ko'rdim, qo'lida shamdon bor edi.",
                default: "Men bor-yo'g'i sodiq xizmatkorman, janob. O'g'rilikka hech qanday aloqam yo'q."
            }
        }
    },
    {
        id: "garden",
        name: "2. Tumanli Bog' Darvozasi",
        desc: "Temir panjarali darvoza oldida gaz fonari miltillab turibdi. Yo'lakda loy izlari ko'rinadi.",
        clueId: "clue_mud",
        clueText: "Kabinet gilamida topilgan qizil loy izlari faqat bog'dagi atirgulzor yonida uchraydi.",
        witness: {
            name: "Ko'cha supuruvchi Arthur",
            role: "Tungi navbatchi ko'cha tozalovchi",
            avatar: "🧹",
            isSuspect: false,
            greeting: "Xayrli tun, ser. 1888-yilning eng sovuq tumani tushdi, lekin ko'zim hamma narsani ilg'aydi.",
            quickQuestions: [
                { q: "Qasrga kimdir kirib-chiqdimi?", key: "kirish" },
                { q: "Bog' atrofida kimni ko'rdingiz?", key: "bog" },
                { q: "Soat nechada shovqin eshitildi?", key: "soat" }
            ],
            answers: {
                kirish: "Tungi 12 dan keyin ko'cha darvozasidan hech kim kirmadi ham, chiqmadi ham. Qor top-toza.",
                bog: "Soat 00:40 larda qasrning bog' tomonidagi eshigidan bir erkak chiqib, atirgulzor yoniga nimadir ko'mgandek bo'ldi. U oqsoqlanib yurardi!",
                soat: "Big Ben soati bir marta bong urganida (01:00 da) qasr ichidan baqir-chaqir eshitildi.",
                default: "Men oddiy ko'cha supuruvchiman, janob. Ko'rganlarimni aytdim."
            }
        }
    },
    {
        id: "hall",
        name: "3. Mehmonlar Zali",
        desc: "Kechki ziyofatdan qolgan shaxmat taxtasi va yarim ichilgan sharob qadahlari.",
        clueId: "clue_glove",
        clueText: "Kamin kulidan kuygan chap qo'l charm qo'lqop bo'lagi topildi. Unda dorixona hidi bor.",
        witness: {
            name: "Xonim Clara",
            role: "Lordning jiyani va merosxo'ri",
            avatar: "👩",
            isSuspect: true,
            greeting: "Umid qilamanki, bu ishni tezroq hal qilasiz. Ertaga Parijga ketishim kerak.",
            quickQuestions: [
                { q: "Tunda kabinet oldida nima qilayotgan edingiz?", key: "kabinet" },
                { q: "Qarzlaringiz borligi rostmi?", key: "qarz" },
                { q: "Doktor Julian haqida fikringiz?", key: "doktor" }
            ],
            answers: {
                kabinet: "Kutubxonadan kitob olgani chiqqandim! Thomas meni ko'rgan bo'lsa, demak o'zi ham uyg'oq bo'lgan!",
                qarz: "Ha, biroz qarzim bor, lekin amakimning olmosini o'g'irlab, o'z obro'yimni to'kmayman.",
                doktor: "Doktor Julian kechqurun oyog'i og'riyotganidan shikoyat qilib, oqsoqlanib yurgan edi. Kamin oldida uzoq o'tirdi.",
                default: "Meni behuda shubha ostiga olmang, detektiv."
            }
        }
    },
    {
        id: "clinic",
        name: "4. Doktorning Mehmon Xonasi",
        desc: "Stol ustida tibbiy sumka, retsept qog'ozlari va bir juft loy tekkan etik turibdi.",
        clueId: "clue_boots",
        clueText: "Doktor Julianning etigi tagida qizil bog' loyi bor va chap qo'lida yangi kuyish izi ko'rinib turibdi!",
        witness: {
            name: "Doktor Julian",
            role: "Oilaviy shifokor",
            avatar: "🩺",
            isSuspect: true,
            greeting: "Salom, hamkasb. Lord Blackwoodning yuragi zaif, shuning uchun bugun qasrda tunab qoldim.",
            quickQuestions: [
                { q: "Oyog'ingizga nima qilgan?", key: "oyoq" },
                { q: "Etigingizdagi qizil loy qayerdan keldi?", key: "loy" },
                { q: "Chap qo'lingiz nega bog'langan?", key: "qol" }
            ],
            answers: {
                oyoq: "Eski jarohatim, yomg'irli havoda biroz oqsoqlanaman. Lekin kechasi xonamdan chiqmadim.",
                loy: "Bu... kecha kunduzi bog'da sayr qilganimda yopishgan bo'lsa kerak! (Asabiylashmoqda)",
                qol: "Kechqurun shamdon ushlaganimda bexosdan kuydirib oldim. Bunda shubhali narsa yo'q!",
                default: "Men shifokorman, insonlarga yordam beraman, o'g'rilik qilmayman!"
            }
        }
    }
];

// O'yin holati
let currentLocation = null;
let foundClues = [];
let gameMinutes = 0; // 01:00 dan 06:00 gacha (300 daqiqa)
let isGameOver = false;

const locationListEl = document.getElementById('location-list');
const sceneTitleEl = document.getElementById('scene-title');
const sceneDescEl = document.getElementById('scene-desc');
const inspectBtn = document.getElementById('inspect-btn');

const suspectAvatarEl = document.getElementById('suspect-avatar');
const suspectNameEl = document.getElementById('suspect-name');
const suspectRoleEl = document.getElementById('suspect-role');
const chatBoxEl = document.getElementById('chat-box');
const quickQuestionsEl = document.getElementById('quick-questions');
const userQuestionInput = document.getElementById('user-question');
const sendBtn = document.getElementById('send-btn');

const cluesListEl = document.getElementById('clues-list');
const cluesCountEl = document.getElementById('clues-count');
const timeDisplayEl = document.getElementById('time-display');

// Boshlang'ich manzillarni chizish
function init() {
    locations.forEach((loc) => {
        const btn = document.createElement('button');
        btn.className = 'loc-btn';
        btn.textContent = loc.name;
        btn.onclick = () => selectLocation(loc, btn);
        locationListEl.appendChild(btn);
    });
}

function advanceTime(mins) {
    if (isGameOver) return;
    gameMinutes += mins;
    const totalMins = 60 + gameMinutes; // 01:00 = 60 daqiqa
    const hours = Math.floor(totalMins / 60);
    const minutes = totalMins % 60;
    timeDisplayEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    if (hours >= 6) {
        finishGame(false, "Tong otdi (06:00)! Jinoyatchi birinchi poyezd bilan Londondan qochib ketdi.");
    }
}

function selectLocation(loc, btnEl) {
    if (isGameOver) return;
    currentLocation = loc;
    advanceTime(10); // Har bir joyga o'tish 10 daqiqa vaqt oladi

    document.querySelectorAll('.loc-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    sceneTitleEl.textContent = loc.name;
    sceneDescEl.textContent = loc.desc;
    inspectBtn.classList.remove('hidden');
    inspectBtn.disabled = foundClues.some(c => c.id === loc.clueId);
    inspectBtn.textContent = inspectBtn.disabled ? "✅ Joy tekshirilgan" : "🔍 Joyni ko'zdan kechirish";

    // Guvohni yuklash
    const w = loc.witness;
    suspectAvatarEl.textContent = w.avatar;
    suspectNameEl.textContent = w.name;
    suspectRoleEl.textContent = w.role;

    userQuestionInput.disabled = false;
    sendBtn.disabled = false;

    addMessage('system', `Siz <b>${loc.name}</b> manziliga keldingiz. Qarshingizda <b>${w.name}</b> turibdi.`);
    addMessage('witness', `<b>${w.name}:</b> "${w.greeting}"`);

    // Tezkor savollar tugmalari
    quickQuestionsEl.innerHTML = '';
    w.quickQuestions.forEach(item => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'q-chip';
        chip.textContent = item.q;
        chip.onclick = () => askQuestion(item.q, item.key);
        quickQuestionsEl.appendChild(chip);
    });
}

// Voqea joyini tekshirish (Dalil topish)
inspectBtn.onclick = () => {
    if (!currentLocation || isGameOver) return;
    advanceTime(15);

    if (!foundClues.some(c => c.id === currentLocation.clueId)) {
        foundClues.push({
            id: currentLocation.clueId,
            text: currentLocation.clueText
        });
        updateCluesUI();
        addMessage('system', `🔎 <b>Yangi dalil topildi:</b> ${currentLocation.clueText}`);
        inspectBtn.disabled = true;
        inspectBtn.textContent = "✅ Joy tekshirilgan";
    }
};

function updateCluesUI() {
    cluesCountEl.textContent = `${foundClues.length} / ${locations.length}`;
    cluesListEl.innerHTML = '';
    foundClues.forEach(clue => {
        const li = document.createElement('li');
        li.textContent = clue.text;
        cluesListEl.appendChild(li);
    });
}

// Savol berish (tezkor yoki yozma)
document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const text = userQuestionInput.value.trim();
    if (!text || !currentLocation) return;
    userQuestionInput.value = '';
    askQuestion(text, null);
};

function askQuestion(questionText, presetKey) {
    if (!currentLocation || isGameOver) return;
    advanceTime(10);

    addMessage('detective', `<b>Siz:</b> ${questionText}`);
    const w = currentLocation.witness;
    let reply = w.answers.default;

    if (presetKey && w.answers[presetKey]) {
        reply = w.answers[presetKey];
    } else {
        const lower = questionText.toLowerCase();
        for (let key in w.answers) {
            if (key !== 'default' && lower.includes(key)) {
                reply = w.answers[key];
                break;
            }
        }
    }

    setTimeout(() => {
        addMessage('witness', `<b>${w.name}:</b> "${reply}"`);
    }, 250);
}

function addMessage(type, htmlText) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerHTML = htmlText;
    chatBoxEl.appendChild(div);
    chatBoxEl.scrollTop = chatBoxEl.scrollHeight;
}

// Ayblov oynasi
const modalOverlay = document.getElementById('modal-overlay');
const suspectsChoiceEl = document.getElementById('suspects-choice');

document.getElementById('accuse-open-btn').onclick = () => {
    if (isGameOver) return;
    suspectsChoiceEl.innerHTML = '';

    locations.filter(l => l.witness.isSuspect).forEach(loc => {
        const w = loc.witness;
        const btn = document.createElement('button');
        btn.className = 'accuse-card';
        btn.innerHTML = `${w.avatar} <b>${w.name}</b> — ${w.role}`;
        btn.onclick = () => makeAccusation(w.name);
        suspectsChoiceEl.appendChild(btn);
    });

    modalOverlay.classList.remove('hidden');
};

document.getElementById('close-modal-btn').onclick = () => {
    modalOverlay.classList.add('hidden');
};

function makeAccusation(suspectName) {
    if (suspectName === "Doktor Julian") {
        finishGame(
            true,
            "🎉 Tergov muvaffaqiyatli yakunlandi! Haqiqiy o'g'ri Doktor Julian edi: u tunda oqsoqlanib bog'ga chiqib, 'Ko'k Oy' olmosini atirgulzor ostiga ko'mgan va kuygan charm qo'lqopini kaminga tashlagan!"
        );
    } else {
        finishGame(
            false,
            `❌ Xato ayblov! Siz ${suspectName}ni hibsga oldingiz. Haqiqiy jinoyatchi Doktor Julian esa fursatdan foydalanib olmosni olib qochib ketdi.`
        );
    }
}

function finishGame(isWin, message) {
    isGameOver = true;
    modalOverlay.classList.remove('hidden');
    document.getElementById('modal-title').textContent = isWin ? "⚖️ Adolat Qaror Topdi!" : "🌑 Tergov Muvaffaqiyatsiz Tugadi";
    document.getElementById('modal-desc').textContent = message;
    suspectsChoiceEl.innerHTML = `<button class="accuse-card" onclick="location.reload()">🔄 Yangi tergov boshlash</button>`;
    document.getElementById('close-modal-btn').classList.add('hidden');
}

init();