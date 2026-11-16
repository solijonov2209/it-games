/* ==========================================================================
   1. MA'LUMOTLAR BAZASI (HAR BIR FANDA 30 TADAN SAVOL - O'ZBEK VA RUS TILLARIDA)
   ========================================================================== */
const DB_UZ = {
    math: [
        { q: "2 + 2 × 2 nechaga teng?", options: ["6", "8", "4", "10"], answer: 0, minGrade: 1 },
        { q: "15 dan 7 ni ayirsak necha qoladi?", options: ["7", "8", "9", "6"], answer: 1, minGrade: 1 },
        { q: "1 soatda necha daqiqa bor?", options: ["30", "45", "60", "100"], answer: 2, minGrade: 2 },
        { q: "7 × 8 nechaga teng?", options: ["54", "56", "64", "48"], answer: 1, minGrade: 2 },
        { q: "Rim raqamlarida 'L' harfi qaysi sonni bildiradi?", options: ["50", "100", "500", "1000"], answer: 0, minGrade: 3 },
        { q: "1 kilometrda necha metr bor?", options: ["100 m", "500 m", "1000 m", "10000 m"], answer: 2, minGrade: 3 },
        { q: "To'g'ri to'rtburchakning tomonlari 5 sm va 8 sm. Yuzini toping.", options: ["13 sm²", "26 sm²", "40 sm²", "45 sm²"], answer: 2, minGrade: 4 },
        { q: "25 ning kvadrati nechaga teng?", options: ["525", "625", "575", "650"], answer: 1, minGrade: 5 },
        { q: "Uchburchakning ichki burchaklari yig'indisi nechaga teng?", options: ["90°", "180°", "270°", "360°"], answer: 1, minGrade: 5 },
        { q: "1 gektar necha kvadrat metrga teng?", options: ["100 m²", "1 000 m²", "10 000 m²", "100 000 m²"], answer: 2, minGrade: 5 },
        { q: "80 sonining 25 foizi nechaga teng?", options: ["15", "20", "25", "30"], answer: 1, minGrade: 5 },
        { q: "Kvadratning perimetri 36 sm bo'lsa, uning yuzi necha sm²?", options: ["36", "64", "81", "72"], answer: 2, minGrade: 5 },
        { q: "Kubning nechta qirrasi bor?", options: ["6", "8", "10", "12"], answer: 3, minGrade: 5 },
        { q: "Eng kichik tub son qaysi?", options: ["0", "1", "2", "3"], answer: 2, minGrade: 6 },
        { q: "Doira uzunligi formulasi qaysi?", options: ["2πR", "πR²", "πD²", "2πR²"], answer: 0, minGrade: 6 },
        { q: "3x + 5 = 20 tenglamada x nechaga teng?", options: ["3", "4", "5", "6"], answer: 2, minGrade: 6 },
        { q: "15 va 20 sonlarining EKUKi nechaga teng?", options: ["30", "45", "60", "300"], answer: 2, minGrade: 6 },
        { q: "0.75 kasrni oddiy kasr ko'rinishida yozing:", options: ["1/4", "2/3", "3/4", "4/5"], answer: 2, minGrade: 6 },
        { q: "144 ning kvadrat ildizi nechaga teng?", options: ["11", "12", "13", "14"], answer: 1, minGrade: 7 },
        { q: "2 ning 10-darajasi nechaga teng?", options: ["512", "1024", "2048", "256"], answer: 1, minGrade: 7 },
        { q: "Parallel to'g'ri chiziqlar nechta nuqtada kesishadi?", options: ["1 ta", "2 ta", "Kesishmaydi", "Cheksiz ko'p"], answer: 2, minGrade: 7 },
        { q: "To'g'ri burchakli uchburchakda gipotenuza kvadrati nimaga teng?", options: ["Katetlar yig'indisiga", "Katetlar kvadratlari yig'indisiga", "Katetlar ko'paytmasiga", "Perimetrga"], answer: 1, minGrade: 8 },
        { q: "Muntazam oltiburchakning nechta tomoni bor?", options: ["5", "6", "7", "8"], answer: 1, minGrade: 8 },
        { q: "7! (7 faktorial) nechaga teng?", options: ["720", "5040", "40320", "120"], answer: 1, minGrade: 9 },
        { q: "sin(90°) ning qiymati nechaga teng?", options: ["0", "0.5", "1", "-1"], answer: 2, minGrade: 10 },
        { q: "log₂(32) ning qiymati nechaga teng?", options: ["4", "5", "6", "8"], answer: 1, minGrade: 11 },
        { q: "5 ning kubi nechaga teng?", options: ["125", "25", "75", "150"], answer: 0, minGrade: 6 },
        { q: "Proporsiyaning asosiy xossasi nima?", options: ["Qo'shiladi", "Hadlar ko'paytmasi teng", "Bo'linadi", "Ayiriladi"], answer: 1, minGrade: 6 },
        { q: "Diskriminant formulasi qaysi?", options: ["b² - 4ac", "b² + 4ac", "4ac - b²", "2bc - a"], answer: 0, minGrade: 8 },
        { q: "1 soat necha sekund?", options: ["3600 s", "600 s", "1800 s", "60 s"], answer: 0, minGrade: 4 }
    ],
    uzbek: [
        { q: "Hozirgi o'zbek lotin alifbosida nechta harf va harflar birikmasi bor?", options: ["26 ta", "29 ta", "31 ta", "35 ta"], answer: 1, minGrade: 1 },
        { q: "Alifboda nechta unli harf bor?", options: ["5 ta", "6 ta", "7 ta", "8 ta"], answer: 1, minGrade: 1 },
        { q: "'Kitob — bilim manbai' gapida nechta so'z bor?", options: ["2 ta", "3 ta", "4 ta", "5 ta"], answer: 1, minGrade: 2 },
        { q: "O'zbekiston Davlat madhiyasi so'zlarini kim yozgan?", options: ["Erkin Vohidov", "Abdulla Oripov", "Muhammad Yusuf", "Rauf Parfi"], answer: 1, minGrade: 4 },
        { q: "O'zbek tilida nechta unli tovush bor?", options: ["5 ta", "6 ta", "7 ta", "8 ta"], answer: 1, minGrade: 5 },
        { q: "Ma'nodosh so'zlar tilshunoslikda nima deb ataladi?", options: ["Omonim", "Sinonim", "Antonim", "Paronim"], answer: 1, minGrade: 5 },
        { q: "Zid ma'noli so'zlar nima deyiladi?", options: ["Sinonim", "Antonim", "Omonim", "Ibora"], answer: 1, minGrade: 5 },
        { q: "Fe'lning nechta zamoni bor?", options: ["2 ta", "3 ta", "4 ta", "5 ta"], answer: 1, minGrade: 5 },
        { q: "Gapning bosh bo'laklari qaysilar?", options: ["Ega va kesim", "Aniqlovchi va to'ldiruvchi", "Hol va undalma", "Kesim va hol"], answer: 0, minGrade: 5 },
        { q: "O'zbek tilida nechta kelishik mavjud?", options: ["5 ta", "6 ta", "7 ta", "8 ta"], answer: 1, minGrade: 6 },
        { q: "'Shum bola' qissasining muallifi kim?", options: ["Xudoyberdi To'xtaboyev", "G'afur G'ulom", "O'tkir Hoshimov", "Said Ahmad"], answer: 1, minGrade: 7 },
        { q: "'Sariq devni minib' asarining bosh qahramoni kim?", options: ["Qoravoy", "Hoshimjon", "Otabek", "Anvar"], answer: 1, minGrade: 7 },
        { q: "Alisher Navoiyning 'Xamsa' asari nechta dostondan iborat?", options: ["3 ta", "4 ta", "5 ta", "6 ta"], answer: 2, minGrade: 8 },
        { q: "'O'tkan kunlar' romanining muallifi kim?", options: ["Cho'lpon", "Abdulla Qodiriy", "Oybek", "G'afur G'ulom"], answer: 1, minGrade: 9 },
        { q: "O'zbek tiliga davlat tili maqomi qachon berilgan?", options: ["1989-yil 21-oktabr", "1991-yil 1-sentabr", "1992-yil 8-dekabr", "1990-yil 20-iyun"], answer: 0, minGrade: 9 },
        { q: "'Boburnoma' asari qaysi janrda yozilgan?", options: ["Doston", "Memuar (esdalik)", "Drama", "Ertak"], answer: 1, minGrade: 9 },
        { q: "'Yulduzli tunlar' romani kim haqida?", options: ["Amir Temur", "Zahiriddin Muhammad Bobur", "Mirzo Ulug'bek", "Jaloliddin Manguberdi"], answer: 1, minGrade: 9 },
        { q: "'Kecha va kunduz' romanini kim yozgan?", options: ["Fitrat", "Abdulhamid Cho'lpon", "Usmon Nosir", "Hamza"], answer: 1, minGrade: 10 },
        { q: "'Devonu lug'otit turk' asarini kim yaratgan?", options: ["Yusuf Xos Hojib", "Mahmud Koshg'ariy", "Ahmad Yugnakiy", "Rabg'uziy"], answer: 1, minGrade: 10 },
        { q: "Asqar Muxtorning mashhur romani qaysi?", options: ["Chinor", "Qutlug' qon", "Ikki eshik orasi", "Ufq"], answer: 0, minGrade: 9 },
        { q: "Shakldosh so'zlar nima deb ataladi?", options: ["Sinonim", "Omonim", "Antonim", "Paronim"], answer: 1, minGrade: 5 },
        { q: "O'zbek tilida nechta mustaqil so'z turkumi bor?", options: ["4 ta", "6 ta", "8 ta", "12 ta"], answer: 1, minGrade: 6 },
        { q: "Sifat qanday so'roqlarga javob beradi?", options: ["Kim? Nima?", "Qanday? Qanaqa?", "Nechta? Qancha?", "Nima qildi?"], answer: 1, minGrade: 3 },
        { q: "Yusuf Xos Hojibning mashhur asari qaysi?", options: ["Hibat ul-haqoyiq", "Qutadg'u bilig", "Muhokamat ul-lug'atayn", "Lison ut-tayr"], answer: 1, minGrade: 8 },
        { q: "'Dunyoning ishlari' qissasi muallifi kim?", options: ["Said Ahmad", "O'tkir Hoshimov", "Odil Yoqubov", "Pirimqul Qodirov"], answer: 1, minGrade: 7 },
        { q: "'Ufq' trilogiyasining muallifi kim?", options: ["O'tkir Hoshimov", "Said Ahmad", "Asqad Muxtor", "Oybek"], answer: 1, minGrade: 9 },
        { q: "Ot so'z turkumi nimani bildiradi?", options: ["Harakatni", "Predmet nomini", "Belgi-xususiyatni", "Son-sanoqni"], answer: 1, minGrade: 3 },
        { q: "Tutuq belgisi (’) qaysi vazifada ishlatiladi?", options: ["Urg'u qo'yish", "Unlini cho'zish va bo'g'in ajratish", "Gap oxirida", "So'roq bildirish"], answer: 1, minGrade: 4 },
        { q: "Alisher Navoiy qayerda tug'ilgan?", options: ["Samarqand", "Hirot", "Buxoro", "Andijon"], answer: 1, minGrade: 5 },
        { q: "'Mehrobdan chayon' romanining muallifi kim?", options: ["Cho'lpon", "Abdulla Qodiriy", "Fitrat", "G'afur G'ulom"], answer: 1, minGrade: 9 }
    ],
    history: [
        { q: "O'zbekiston poytaxti qaysi shahar?", options: ["Samarqand", "Toshkent", "Buxoro", "Xiva"], answer: 1, minGrade: 2 },
        { q: "O'zbekiston Davlat bayrog'i qachon qabul qilingan?", options: ["1991-yil 18-noyabr", "1992-yil 2-iyul", "1992-yil 10-dekabr", "1991-yil 1-sentabr"], answer: 0, minGrade: 5 },
        { q: "Qadimgi Misr ehromlari (piramidalari) qaysi shahar yaqinida joylashgan?", options: ["Qohira (Giza)", "Iskandariya", "Luksor", "Memfis"], answer: 0, minGrade: 6 },
        { q: "Buyuk Ipak yo'li qaysi davlatdan boshlangan?", options: ["Hindiston", "Xitoy", "Eron", "Misr"], answer: 1, minGrade: 6 },
        { q: "To'maris qaysi qabila malikasi bo'lgan?", options: ["Saka-massaget", "So'g'd", "Baqtriya", "Xorazm"], answer: 0, minGrade: 6 },
        { q: "Spitamen qaysi sarkardaga qarshi qo'zg'olon ko'targan?", options: ["Doro I", "Aleksandr Makedonskiy", "Kir II", "Chingizxon"], answer: 1, minGrade: 6 },
        { q: "Amir Temur qachon va qayerda tug'ilgan?", options: ["1336-yil, Xo'ja Ilg'or qishlog'ida", "1340-yil, Samarqandda", "1336-yil, Buxoroda", "1350-yil, Termizda"], answer: 0, minGrade: 7 },
        { q: "Mirzo Ulug'bek rasadxonasi qaysi shaharda qurilgan?", options: ["Buxoro", "Samarqand", "Xiva", "Toshkent"], answer: 1, minGrade: 7 },
        { q: "Jaloliddin Manguberdi qaysi bosqinchilarga qarshi kurashgan?", options: ["Aleksandr Makedonskiy", "Chingizxon boshchiligidagi mo'g'ullar", "Eron shohlari", "Rim imperiyasi"], answer: 1, minGrade: 7 },
        { q: "Amir Temur davlatining poytaxti qaysi shahar edi?", options: ["Shahrisabz", "Samarqand", "Buxoro", "Toshkent"], answer: 1, minGrade: 7 },
        { q: "Amerikani 1492-yilda kashf etgan sayyoh kim?", options: ["Vasko da Gama", "Xristofor Kolumb", "Fernan Magellan", "Amerigo Vespuchchi"], answer: 1, minGrade: 8 },
        { q: "O'zbekiston Respublikasi Mustaqilligi qachon e'lon qilingan?", options: ["1991-yil 31-avgust", "1991-yil 1-sentabr", "1992-yil 2-mart", "1990-yil 24-mart"], answer: 0, minGrade: 9 },
        { q: "O'zbekiston BMTga qachon a'zo bo'lgan?", options: ["1991-yil 1-sentabr", "1992-yil 2-mart", "1993-yil 15-may", "1991-yil 18-noyabr"], answer: 1, minGrade: 9 },
        { q: "O'zbekiston Respublikasi Konstitutsiyasi qachon qabul qilingan?", options: ["1991-yil 18-noyabr", "1992-yil 2-iyul", "1992-yil 8-dekabr", "1994-yil 1-iyul"], answer: 2, minGrade: 9 },
        { q: "Ikkinchi jahon urushi nechanchi yillarda bo'lib o'tgan?", options: ["1914–1918", "1939–1945", "1941–1945", "1936–1942"], answer: 1, minGrade: 9 },
        { q: "O'zbekiston Davlat gerbi qachon qabul qilingan?", options: ["1991-yil 18-noyabr", "1992-yil 2-iyul", "1992-yil 10-dekabr", "1994-yil 1-iyul"], answer: 1, minGrade: 5 },
        { q: "Milliy valyutamiz — so'm qachon muomalaga kiritilgan?", options: ["1991-yil 1-sentabr", "1994-yil 1-iyul", "1992-yil 8-dekabr", "1993-yil 15-noyabr"], answer: 1, minGrade: 6 },
        { q: "Zahiriddin Muhammad Bobur qayerda tug'ilgan?", options: ["Samarqand", "Andijon", "Toshkent", "Farg'ona"], answer: 1, minGrade: 7 },
        { q: "Bibixonim jome masjidi qaysi shaharda joylashgan?", options: ["Buxoro", "Samarqand", "Xiva", "Shahrisabz"], answer: 1, minGrade: 6 },
        { q: "Oqsaroy qaysi shaharda bunyod etilgan?", options: ["Samarqand", "Shahrisabz", "Buxoro", "Termiz"], answer: 1, minGrade: 7 },
        { q: "Qadimgi Bobil podshohi Hammurapi nimasi bilan mashhur?", options: ["Piramidalari bilan", "Qonunlar to'plami bilan", "Buyuk devori bilan", "Rasadxonasi bilan"], answer: 1, minGrade: 6 },
        { q: "Birinchi jahon urushi qachon boshlangan?", options: ["1912-yil", "1914-yil", "1918-yil", "1939-yil"], answer: 1, minGrade: 9 },
        { q: "Avesto qaysi dinning muqaddas kitobi hisoblanadi?", options: ["Buddaviylik", "Zardushtiylik", "Xristianlik", "Shomonlik"], answer: 1, minGrade: 6 },
        { q: "Shiroq qaysi bosqinchilarga qarshi jasorat ko'rsatgan?", options: ["Aleksandr Makedonskiy", "Doro I boshchiligidagi forslar", "Chingizxon", "Arab xalifaligi"], answer: 1, minGrade: 6 },
        { q: "Registon maydoni nechta madrasadan iborat?", options: ["2 ta", "3 ta", "4 ta", "5 ta"], answer: 1, minGrade: 5 },
        { q: "Buxorodagi Minorai Kalon qaysi hukmdor davrida qurilgan?", options: ["Amir Temur", "Arslonxon", "Ismoil Somoniy", "Abdullaxon II"], answer: 1, minGrade: 7 },
        { q: "Ichan-qal'a qaysi shaharda joylashgan?", options: ["Buxoro", "Xiva", "Samarqand", "Qo'qon"], answer: 1, minGrade: 5 },
        { q: "Boburiylar sulolasi qaysi mamlakatda hukmronlik qilgan?", options: ["Eron", "Hindiston", "Misr", "Turkiya"], answer: 1, minGrade: 8 },
        { q: "Fransiya inqilobi qachon boshlangan?", options: ["1776-yil", "1789-yil", "1812-yil", "1917-yil"], answer: 1, minGrade: 8 },
        { q: "Insoniyat tarixida kosmosga birinchi bo'lib uchgan inson kim?", options: ["Nil Armstrong", "Yuriy Gagarin", "Valentina Tereshkova", "Aleksey Leonov"], answer: 1, minGrade: 5 }
    ],
    geography: [
        { q: "Quyosh qaysi tomondan chiqadi?", options: ["G'arbdan", "Sharqdan", "Shimoldan", "Janubdan"], answer: 1, minGrade: 2 },
        { q: "Yilda nechta fasl bor?", options: ["2 ta", "3 ta", "4 ta", "5 ta"], answer: 2, minGrade: 1 },
        { q: "Dunyodagi eng katta okean qaysi?", options: ["Atlantika okeani", "Hind okeani", "Tinch okeani", "Shimoliy Muz okeani"], answer: 2, minGrade: 6 },
        { q: "Yer yuzidagi eng baland cho'qqi qaysi?", options: ["Elbrus", "Everest (Jomolungma)", "Kilimanjaro", "Hazrati Sulton"], answer: 1, minGrade: 6 },
        { q: "Dunyodagi eng uzun daryo qaysi?", options: ["Amazonka", "Nil", "Missisipi", "Amudaryo"], answer: 1, minGrade: 6 },
        { q: "Eng kichik materik qaysi?", options: ["Yevropa", "Antarktida", "Avstraliya", "Janubiy Amerika"], answer: 2, minGrade: 6 },
        { q: "Yer yuzida nechta materik bor?", options: ["5 ta", "6 ta", "7 ta", "4 ta"], answer: 1, minGrade: 6 },
        { q: "Dunyodagi eng chuqur ko'l qaysi?", options: ["Kaspiy", "Baykal", "Viktoriya", "Issiqko'l"], answer: 1, minGrade: 6 },
        { q: "O'zbekiston nechta davlat bilan chegaradosh?", options: ["4 ta", "5 ta", "6 ta", "7 ta"], answer: 1, minGrade: 7 },
        { q: "O'zbekistonning maydoni qancha?", options: ["448,9 ming km²", "350 ming km²", "520 ming km²", "600 ming km²"], answer: 0, minGrade: 7 },
        { q: "Yaponiyaning poytaxti qaysi shahar?", options: ["Seul", "Pekin", "Tokio", "Kioto"], answer: 2, minGrade: 7 },
        { q: "O'zbekistondagi eng yirik cho'l qaysi?", options: ["Qoraqum", "Qizilqum", "Mirzacho'l", "Ustyurt"], answer: 1, minGrade: 7 },
        { q: "Dunyodagi eng katta cho'l qaysi?", options: ["Qizilqum", "Gobi", "Sahroi Kabir", "Atakama"], answer: 2, minGrade: 7 },
        { q: "Farg'ona vodiysidan oqib o'tadigan eng yirik daryo qaysi?", options: ["Amudaryo", "Sirdaryo", "Zarafshon", "Qashqadaryo"], answer: 1, minGrade: 7 },
        { q: "Yer shari ekvatorining uzunligi taxminan qancha?", options: ["20 000 km", "40 000 km", "60 000 km", "10 000 km"], answer: 1, minGrade: 6 },
        { q: "Dunyodagi maydoni eng katta davlat qaysi?", options: ["Kanada", "Rossiya", "Xitoy", "AQSH"], answer: 1, minGrade: 7 },
        { q: "Dunyodagi eng katta orol qaysi?", options: ["Madagaskar", "Grenlandiya", "Yangi Gvineya", "Kalimantan"], answer: 1, minGrade: 6 },
        { q: "O'zbekistonning eng baland nuqtasi qaysi?", options: ["Chotqol", "Hazrati Sulton cho'qqisi", "Katta Chimyon", "Bobotog'"], answer: 1, minGrade: 7 },
        { q: "Quyosh sistemasidagi eng katta sayyora qaysi?", options: ["Saturn", "Yupiter", "Uran", "Neptun"], answer: 1, minGrade: 5 },
        { q: "Kompasning qizil strelkasi doimo qaysi tomonni ko'rsatadi?", options: ["Janubni", "Shimolni", "Sharqni", "G'arbni"], answer: 1, minGrade: 4 },
        { q: "Dunyodagi eng sersuv daryo qaysi?", options: ["Nil", "Amazonka", "Yangszı", "Volga"], answer: 1, minGrade: 6 },
        { q: "O'zbekistondagi eng yirik suv ombori qaysi?", options: ["Chorvoq", "Tuyamo'yin", "Andijon", "Kattaqo'rg'on"], answer: 1, minGrade: 7 },
        { q: "Fransiyaning poytaxti qaysi shahar?", options: ["London", "Parij", "Berlin", "Rim"], answer: 1, minGrade: 5 },
        { q: "Qaysi materikda doimiy aholi yashamaydi?", options: ["Avstraliya", "Antarktida", "Janubiy Amerika", "Afrika"], answer: 1, minGrade: 5 },
        { q: "Dunyodagi eng sho'r dengiz qaysi?", options: ["Qora dengiz", "O'lik dengiz", "Qizil dengiz", "O'rta yer dengizi"], answer: 1, minGrade: 6 },
        { q: "Dunyodagi eng baland sharshara qaysi?", options: ["Niagara", "Anxel", "Viktoriya", "Iguasu"], answer: 1, minGrade: 6 },
        { q: "O'zbekistonda nechta viloyat bor?", options: ["10 ta", "12 ta", "14 ta", "11 ta"], answer: 1, minGrade: 4 },
        { q: "Yer Quyosh atrofini necha kunda to'liq aylanib chiqadi?", options: ["360 kun", "365 kun (va 6 soat)", "300 kun", "354 kun"], answer: 1, minGrade: 4 },
        { q: "Misr davlati qaysi materikda joylashgan?", options: ["Osiyo", "Afrika", "Yevropa", "Avstraliya"], answer: 1, minGrade: 6 },
        { q: "Atmosfera bosimi qaysi asbob bilan o'lchanadi?", options: ["Termometr", "Barometr", "Gigrometr", "Flyuger"], answer: 1, minGrade: 6 }
    ],
    biology: [
        { q: "Odamda nechta sezgi organi bor?", options: ["4 ta", "5 ta", "6 ta", "7 ta"], answer: 1, minGrade: 3 },
        { q: "Quruqlikdagi eng tez yuguruvchi hayvon qaysi?", options: ["Sher", "Gepard", "Antilopa", "Bo'ri"], answer: 1, minGrade: 4 },
        { q: "Odamning normal tana harorati necha gradus Selsiy?", options: ["35.6 °C", "36.6 °C", "37.5 °C", "38.0 °C"], answer: 1, minGrade: 5 },
        { q: "Hasharotlarning nechta oyog'i bo'ladi?", options: ["4 ta", "6 ta", "8 ta", "10 ta"], answer: 1, minGrade: 5 },
        { q: "Fotosintez jarayoni o'simlikning qaysi qismida faol kechadi?", options: ["Ildizida", "Bargida (xloroplastlarda)", "Poyasida", "Gulida"], answer: 1, minGrade: 6 },
        { q: "O'simliklarning suv va mineral tuzlarni shimuvchi organi qaysi?", options: ["Barg", "Ildiz", "Gul", "Meva"], answer: 1, minGrade: 6 },
        { q: "Eng yirik sut emizuvchi hayvon qaysi?", options: ["Afrika fili", "Ko'k kit", "Jirafa", "Begemot"], answer: 1, minGrade: 7 },
        { q: "Inson yuragi nechta kameradan iborat?", options: ["2 ta", "3 ta", "4 ta", "5 ta"], answer: 2, minGrade: 8 },
        { q: "Odam organizmidagi eng katta organ qaysi?", options: ["Jigar", "Teri", "O'pka", "Oshqozon"], answer: 1, minGrade: 8 },
        { q: "Qonning qaysi hujayralari kislorod tashish vazifasini bajaradi?", options: ["Leykotsitlar", "Eritrotsitlar", "Trombotsitlar", "Limfotsitlar"], answer: 1, minGrade: 8 },
        { q: "Inson skeletida taxminan nechta suyak bor?", options: ["150 ga yaqin", "206 ta", "300 ta", "180 ta"], answer: 1, minGrade: 8 },
        { q: "DNK molekulasining tuzilishi qanday shaklda?", options: ["Bir zanjirli halqa", "Qo'sh spiral", "Kub shaklida", "To'g'ri chiziq"], answer: 1, minGrade: 9 },
        { q: "Hujayraning 'energetik stansiyasi' deb ataladigan organoid qaysi?", options: ["Ribosoma", "Mitoxondriya", "Lizosoma", "Yadro"], answer: 1, minGrade: 9 },
        { q: "O'rgimchaksimonlarning nechta oyog'i bor?", options: ["6 ta", "8 ta", "10 ta", "12 ta"], answer: 1, minGrade: 7 },
        { q: "O'simlik barglariga yashil rang beruvchi pigment nima?", options: ["Karotin", "Xlorofill", "Ksantofill", "Gemoglobin"], answer: 1, minGrade: 6 },
        { q: "Kattagina odamda nechta doimiy tish bo'ladi?", options: ["28 ta", "32 ta", "30 ta", "36 ta"], answer: 1, minGrade: 8 },
        { q: "Qonning ivishida qaysi qon shaklli elementlari qatnashadi?", options: ["Eritrotsitlar", "Trombotsitlar", "Leykotsitlar", "Plazma"], answer: 1, minGrade: 8 },
        { q: "Odamda nechta qon guruhi mavjud?", options: ["2 ta", "4 ta", "3 ta", "6 ta"], answer: 1, minGrade: 8 },
        { q: "Quyosh nuri ta'sirida inson terisida qaysi vitamin sintezlanadi?", options: ["A vitamini", "D vitamini", "C vitamini", "B12 vitamini"], answer: 1, minGrade: 8 },
        { q: "Zamburug'larni o'rganuvchi fan nima deb ataladi?", options: ["Botanika", "Mikologiya", "Zoologiya", "Sitologiya"], answer: 1, minGrade: 6 },
        { q: "Ucha olmaydigan, lekin juda yaxshi suzadigan qush qaysi?", options: ["Tuyaqush", "Pingvin", "Kivi", "Laylak"], answer: 1, minGrade: 5 },
        { q: "Odam organizmida safro qaysi organda ishlab chiqariladi?", options: ["Oshqozonda", "Jigarda", "Oshqozon osti bezida", "Buyrakda"], answer: 1, minGrade: 8 },
        { q: "Hujayrani o'rganuvchi fan qaysi?", options: ["Anatomiya", "Sitologiya", "Gistologiya", "Genetika"], answer: 1, minGrade: 9 },
        { q: "Irsiyat va o'zgaruvchanlik qonunlarini o'rganuvchi fan nima?", options: ["Ekologiya", "Genetika", "Evolyutsiya", "Seleksiya"], answer: 1, minGrade: 9 },
        { q: "O'simliklar nafas olganda qaysi gazni yutadi?", options: ["Karbonat angidrid", "Kislorod", "Azot", "Vodorod"], answer: 1, minGrade: 6 },
        { q: "Fotosintez jarayonida qaysi gaz ajralib chiqadi?", options: ["Karbonat angidrid", "Kislorod", "Azot", "Metan"], answer: 1, minGrade: 6 },
        { q: "Dunyodagi eng baland o't o'simlik (daraxtsimon) qaysi?", options: ["Qamish", "Bambuk", "Banan", "Palma"], answer: 1, minGrade: 6 },
        { q: "Markaziy nerv sistemasiga nimalar kiradi?", options: ["Faqat bosh miya", "Bosh miya va orqa miya", "Faqat nerv tolalari", "Sezgi organlari"], answer: 1, minGrade: 8 },
        { q: "Eng kichik qush qaysi?", options: ["Chumchuq", "Kolibri", "Qaldirg'och", "Bedana"], answer: 1, minGrade: 5 },
        { q: "Sut emizuvchilarning necha bo'yin umurtqasi bo'ladi (jirafada ham)?", options: ["5 ta", "7 ta", "9 ta", "12 ta"], answer: 1, minGrade: 7 }
    ],
    physics: [
        { q: "Kuchning Xalqaro birliklar tizimidagi (SI) birligi nima?", options: ["Joul", "Nyuton", "Vatt", "Paskal"], answer: 1, minGrade: 7 },
        { q: "Bosimning SI tizimidagi o'lchov birligi nima?", options: ["Nyuton", "Paskal", "Joul", "Vatt"], answer: 1, minGrade: 7 },
        { q: "Toza suv normal atmosfera bosimida necha gradusda qaynaydi?", options: ["90 °C", "95 °C", "100 °C", "110 °C"], answer: 2, minGrade: 7 },
        { q: "Zichlik formulasi qaysi?", options: ["ρ = m / V", "ρ = m · V", "ρ = V / m", "ρ = F / m"], answer: 0, minGrade: 7 },
        { q: "Yorug'likning vakuumdagi tezligi taxminan qancha?", options: ["300 000 km/s", "150 000 km/s", "340 m/s", "30 000 km/s"], answer: 0, minGrade: 8 },
        { q: "Elektr tokining kuchi qaysi asbob bilan o'lchanadi?", options: ["Voltmetr", "Ampermetr", "Ommetr", "Barometr"], answer: 1, minGrade: 8 },
        { q: "Om qonuni formulasi qaysi?", options: ["I = U / R", "U = I / R", "R = I · U", "P = I · R"], answer: 0, minGrade: 8 },
        { q: "Nyutonning ikkinchi qonuni formulasi qaysi?", options: ["F = m · a", "E = m · c²", "P = F / S", "A = F · s"], answer: 0, minGrade: 9 },
        { q: "Nisbiylik nazariyasining muallifi kim?", options: ["Maks Plank", "Albert Eynshteyn", "Nils Bor", "Maykl Faradey"], answer: 1, minGrade: 11 },
        { q: "Ish va energiyaning SI tizimidagi birligi nima?", options: ["Vatt", "Joul", "Nyuton", "Kulon"], answer: 1, minGrade: 7 },
        { q: "Quvvatning o'lchov birligi nima?", options: ["Joul", "Vatt", "Volt", "Amper"], answer: 1, minGrade: 7 },
        { q: "Elektr kuchlanish qaysi asbob bilan o'lchanadi?", options: ["Ampermetr", "Voltmetr", "Ommetr", "Vattmetr"], answer: 1, minGrade: 8 },
        { q: "Elektr qarshilikning birligi nima?", options: ["Amper", "Om", "Volt", "Farad"], answer: 1, minGrade: 8 },
        { q: "Tovushning havodagi tezligi taxminan qancha?", options: ["300 km/s", "340 m/s", "1500 m/s", "300 000 km/s"], answer: 1, minGrade: 7 },
        { q: "Erkin tushish tezlanishi (g) Yer yuzida taxminan nechaga teng?", options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "6.7 m/s²"], answer: 1, minGrade: 7 },
        { q: "Suyuqlik va gazlarga botirilgan jismga ta'sir etuvchi ko'taruvchi kuch kimning nomi bilan ataladi?", options: ["Nyuton kuchi", "Arximed kuchi", "Paskal kuchi", "Kulon kuchi"], answer: 1, minGrade: 7 },
        { q: "Suv necha gradus Selsiyda muzlaydi?", options: ["-4 °C", "0 °C", "+4 °C", "-10 °C"], answer: 1, minGrade: 6 },
        { q: "Haroratning Xalqaro birliklar tizimidagi (SI) asosiy birligi qaysi?", options: ["Selsiy", "Kelvin", "Farengeyt", "Reomyur"], answer: 1, minGrade: 8 },
        { q: "Massaning SI tizimidagi asosiy birligi nima?", options: ["Gramm", "Kilogramm", "Tonna", "Sentner"], answer: 1, minGrade: 7 },
        { q: "Tezlik formulasi qaysi?", options: ["v = s · t", "v = s / t", "v = t / s", "v = a · s"], answer: 1, minGrade: 7 },
        { q: "Elektr zaryadining o'lchov birligi nima?", options: ["Amper", "Kulon", "Volt", "Om"], answer: 1, minGrade: 8 },
        { q: "Magnitning nechta qutbi bor?", options: ["1 ta", "2 ta", "3 ta", "4 ta"], answer: 1, minGrade: 8 },
        { q: "Yorug'likning qaytish qonuniga ko'ra tushish burchagi nimaga teng?", options: ["90 gradusga", "Qaytish burchagiga", "Sinish burchagiga", "0 gradusga"], answer: 1, minGrade: 8 },
        { q: "Chastotaning o'lchov birligi nima?", options: ["Sekund", "Gers (Hz)", "Metr", "Vatt"], answer: 1, minGrade: 9 },
        { q: "Qaysi muhitda tovush tarqalmaydi?", options: ["Suvda", "Vakuumda (bo'shliqda)", "Havoda", "Po'latda"], answer: 1, minGrade: 7 },
        { q: "Moddaning eng kichik bo'linmas zarrachasi qadimda nima deb atalgan?", options: ["Molekula", "Atom", "Elektron", "Ion"], answer: 1, minGrade: 7 },
        { q: "Barcha jismlarning Yer tomon tortilish kuchi nima deyiladi?", options: ["Ishqalanish kuchi", "Og'irlik kuchi", "Elastiklik kuchi", "Arximed kuchi"], answer: 1, minGrade: 7 },
        { q: "Issiqlik miqdori qaysi birlikda o'lchanadi?", options: ["Vatt", "Joul", "Paskal", "Nyuton"], answer: 1, minGrade: 8 },
        { q: "Ko'zoynak linzalari yorug'likning qaysi hodisasiga asoslangan?", options: ["Qaytish", "Sinish", "Yutilish", "Tarqalish"], answer: 1, minGrade: 8 },
        { q: "Eynshteynning mashhur massa va energiya bog'liqlik formulasi qaysi?", options: ["F = ma", "E = mc²", "P = UI", "A = Fs"], answer: 1, minGrade: 11 }
    ],
    chemistry: [
        { q: "Suvning kimyoviy formulasi qanday?", options: ["CO₂", "H₂O", "H₂O₂", "O₂"], answer: 1, minGrade: 7 },
        { q: "Davriy jadvaldagi 1-raqamli element qaysi?", options: ["Geliy", "Vodorod", "Litiy", "Kislorod"], answer: 1, minGrade: 7 },
        { q: "Kimyoviy elementlar davriy jadvalini kim yaratgan?", options: ["M.V. Lomonosov", "D.I. Mendeleyev", "A.M. Butlerov", "J. Dalton"], answer: 1, minGrade: 8 },
        { q: "Oltinning kimyoviy belgisi qaysi?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1, minGrade: 8 },
        { q: "Havoda eng ko'p uchraydigan gaz qaysi (78%)?", options: ["Kislorod", "Azot", "Karbonat angidrid", "Vodorod"], answer: 1, minGrade: 8 },
        { q: "Osh tuzining kimyoviy formulasi qanday?", options: ["KCl", "NaCl", "CaCO₃", "NaOH"], answer: 1, minGrade: 8 },
        { q: "Oddiy sharoitda suyuq holda bo'ladigan yagona metall qaysi?", options: ["Qalay", "Simob", "Qo'rg'oshin", "Rux"], answer: 1, minGrade: 9 },
        { q: "Sulfat kislotaning formulasi qanday?", options: ["HCl", "HNO₃", "H₂SO₄", "H₃PO₄"], answer: 2, minGrade: 9 },
        { q: "Temirning kimyoviy belgisi qaysi?", options: ["Cu", "Fe", "Zn", "Al"], answer: 1, minGrade: 7 },
        { q: "Kislorodning nisbiy atom massasi nechaga teng?", options: ["12", "16", "14", "32"], answer: 1, minGrade: 7 },
        { q: "Karbonat angidrid gazining formulasi qanday?", options: ["CO", "CO₂", "CH₄", "SO₂"], answer: 1, minGrade: 7 },
        { q: "Kumushning kimyoviy belgisi qaysi?", options: ["Au", "Ag", "Pt", "Hg"], answer: 1, minGrade: 8 },
        { q: "Xlorid kislotaning formulasi qaysi?", options: ["H₂SO₄", "HCl", "HNO₃", "H₂CO₃"], answer: 1, minGrade: 8 },
        { q: "Metan gazining kimyoviy formulasi qanday?", options: ["C₂H₆", "CH₄", "C₂H₄", "C₂H₂"], answer: 1, minGrade: 9 },
        { q: "Olmos va grafit qaysi kimyoviy elementning allotropik shakl o'zgarishi?", options: ["Kremniy", "Uglerod", "Oltingugurt", "Fosfor"], answer: 1, minGrade: 8 },
        { q: "Ozon gazining formulasi qaysi?", options: ["O₂", "O₃", "H₂O₂", "CO₂"], answer: 1, minGrade: 7 },
        { q: "Misning kimyoviy belgisi qaysi?", options: ["Co", "Cu", "Ca", "Cr"], answer: 1, minGrade: 7 },
        { q: "Neytral muhitda pH ko'rsatkichi nechaga teng?", options: ["0", "7", "14", "5"], answer: 1, minGrade: 9 },
        { q: "Eng yengil gaz qaysi?", options: ["Geliy", "Vodorod", "Azot", "Kislorod"], answer: 1, minGrade: 7 },
        { q: "Natriy gidroksid (o'yuvchi natriy) formulasi qaysi?", options: ["NaCl", "NaOH", "Na₂CO₃", "NaNO₃"], answer: 1, minGrade: 8 },
        { q: "Bo'r va marmarning asosiy tarkibiy qismi nima?", options: ["CaO", "CaCO₃", "CaCl₂", "CaSO₄"], answer: 1, minGrade: 8 },
        { q: "Kalsiyning kimyoviy belgisi qaysi?", options: ["K", "Ca", "C", "Cu"], answer: 1, minGrade: 7 },
        { q: "Kaliyning kimyoviy belgisi qaysi?", options: ["Ca", "K", "Kr", "P"], answer: 1, minGrade: 7 },
        { q: "Nafas olish uchun zarur bo'lgan va yonishga yordam beruvchi gaz qaysi?", options: ["Azot", "Kislorod", "Karbonat angidrid", "Geliy"], answer: 1, minGrade: 7 },
        { q: "Avogadro doimiysi nechaga teng?", options: ["6.02 × 10²⁰", "6.02 × 10²³", "3.14 × 10²³", "9.8 × 10²³"], answer: 1, minGrade: 8 },
        { q: "Oddiy sharoitda suyuq holda bo'ladigan yagona metalmas qaysi?", options: ["Yod", "Brom", "Xlor", "Ftor"], answer: 1, minGrade: 9 },
        { q: "Alyuminiyning kimyoviy belgisi nima?", options: ["Au", "Al", "Ag", "Ar"], answer: 1, minGrade: 7 },
        { q: "Sirka kislotasining formulasi qaysi?", options: ["HCOOH", "CH₃COOH", "C₂H₅OH", "H₂CO₃"], answer: 1, minGrade: 10 },
        { q: "Etil spirtining formulasi qaysi?", options: ["CH₃OH", "C₂H₅OH", "C₃H₇OH", "CH₃CHO"], answer: 1, minGrade: 10 },
        { q: "Mendeleyev davriy jadvalida nechta davr bor?", options: ["5 ta", "7 ta", "8 ta", "10 ta"], answer: 1, minGrade: 8 }
    ],
    english: [
        { q: "'Apple' so'zining o'zbekcha tarjimasi nima?", options: ["Olma", "Banan", "Uzum", "Anor"], answer: 0, minGrade: 1 },
        { q: "'Red' qaysi rang?", options: ["Ko'k", "Qizil", "Yashil", "Sariq"], answer: 1, minGrade: 2 },
        { q: "'Child' so'zining ko'plik shakli qaysi?", options: ["Childs", "Childrens", "Children", "Childes"], answer: 2, minGrade: 4 },
        { q: "Bo'sh joyni to'ldiring: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], answer: 1, minGrade: 5 },
        { q: "'Beautiful' so'zining antonimi (qarama-qarshi ma'nosi) qaysi?", options: ["Pretty", "Ugly", "Smart", "Kind"], answer: 1, minGrade: 5 },
        { q: "'Knowledge is power' iborasining o'zbekcha tarjimasi nima?", options: ["Vaqt — oliy hakam", "Bilim — kuchdir", "Mehnat baxt keltiradi", "Salomatlik — tuman boylik"], answer: 1, minGrade: 6 },
        { q: "'Go' fe'lining o'tgan zamon (Past Simple) shakli qaysi?", options: ["Goed", "Gone", "Went", "Going"], answer: 2, minGrade: 6 },
        { q: "'Write' fe'lining V3 (Past Participle) shakli qaysi?", options: ["Wrote", "Writed", "Written", "Writing"], answer: 2, minGrade: 8 },
        { q: "'Book' so'zining tarjimasi nima?", options: ["Daftar", "Kitob", "Qalam", "Sumka"], answer: 1, minGrade: 1 },
        { q: "'Good morning' qanday tarjima qilinadi?", options: ["Xayrli kech", "Xayrli tong", "Xayrli tun", "Salom"], answer: 1, minGrade: 1 },
        { q: "'Mouse' (sichqon) so'zining ko'plik shakli qaysi?", options: ["Mouses", "Mice", "Mices", "Mouse"], answer: 1, minGrade: 5 },
        { q: "Bo'sh joyni to'ldiring: 'They ___ playing football now.'", options: ["is", "are", "am", "was"], answer: 1, minGrade: 4 },
        { q: "'Big' sifatining qiyosiy darajasi (Comparative) qaysi?", options: ["More big", "Bigger", "Biggest", "Bigest"], answer: 1, minGrade: 5 },
        { q: "'Good' sifatining orttirma darajasi (Superlative) qaysi?", options: ["Goodest", "The best", "Better", "Most good"], answer: 1, minGrade: 6 },
        { q: "'Tooth' (tish) so'zining ko'plik shakli qaysi?", options: ["Tooths", "Teeth", "Teeths", "Toothes"], answer: 1, minGrade: 5 },
        { q: "'Yesterday' so'zi nimani anglatadi?", options: ["Ertaga", "Kecha", "Bugun", "Hozir"], answer: 1, minGrade: 3 },
        { q: "Bo'sh joyni to'ldiring: 'I have lived in Tashkent ___ 2015.'", options: ["for", "since", "in", "at"], answer: 1, minGrade: 7 },
        { q: "'See' fe'lining o'tgan zamon (Past Simple) shakli qaysi?", options: ["Seed", "Saw", "Seen", "Seeing"], answer: 1, minGrade: 6 },
        { q: "'Library' so'zining ma'nosi nima?", options: ["Do'kon", "Kutubxona", "Maktab", "Shifoxona"], answer: 1, minGrade: 4 },
        { q: "Qaysi artikl unli tovush bilan boshlanuvchi birlikdagi otlar oldidan ishlatiladi?", options: ["a", "an", "the", "-"], answer: 1, minGrade: 3 },
        { q: "'Fast' so'zining sinonimi qaysi?", options: ["Slow", "Quick", "Heavy", "Weak"], answer: 1, minGrade: 5 },
        { q: "'Buy' fe'lining o'tgan zamon shakli qaysi?", options: ["Buyed", "Bought", "Brought", "Built"], answer: 1, minGrade: 6 },
        { q: "Haftaning 'Wednesday' kuni qaysi kun?", options: ["Seshanba", "Chorshanba", "Payshanba", "Juma"], answer: 1, minGrade: 3 },
        { q: "'Foot' (oyoq) so'zining ko'plik shakli qaysi?", options: ["Foots", "Feet", "Feets", "Footes"], answer: 1, minGrade: 5 },
        { q: "Bo'sh joyni to'ldiring: 'He ___ a doctor.'", options: ["am", "is", "are", "be"], answer: 1, minGrade: 2 },
        { q: "'Speak' fe'lining V3 (Past Participle) shakli qaysi?", options: ["Spoke", "Spoken", "Speaked", "Speaking"], answer: 1, minGrade: 7 },
        { q: "'Autumn' (yoki 'Fall') qaysi fasl?", options: ["Bahor", "Kuz", "Qish", "Yoz"], answer: 1, minGrade: 3 },
        { q: "'Dangerous' so'zining ma'nosi nima?", options: ["Xavfsiz", "Xavfli", "Qiziqarli", "Oson"], answer: 1, minGrade: 6 },
        { q: "Bo'sh joyni to'ldiring: 'We ___ to Samarkand tomorrow.'", options: ["went", "will go", "goes", "gone"], answer: 1, minGrade: 5 },
        { q: "'Honest' so'zining o'zbekcha tarjimasi nima?", options: ["Aqlli", "Halol / Rostgo'y", "Jasur", "Mehribon"], answer: 1, minGrade: 7 }
    ],
    informatics: [
        { q: "Kompyuterning ma'lumot kiritish qurilmasi qaysi?", options: ["Monitor", "Klaviatura", "Printer", "Kolonka"], answer: 1, minGrade: 3 },
        { q: "1 Kilobayt necha baytga teng?", options: ["1000 bayt", "1024 bayt", "512 bayt", "2048 bayt"], answer: 1, minGrade: 5 },
        { q: "Kompyuterning 'miyasi' hisoblanuvchi asosiy qurilma qaysi?", options: ["Monitor", "Protsessor (CPU)", "Klaviatura", "Printer"], answer: 1, minGrade: 5 },
        { q: "Ctrl + C tugmalar birikmasi qanday vazifani bajaradi?", options: ["Kesib olish", "Nusxa olish", "Joylashtirish", "Bekor qilish"], answer: 1, minGrade: 5 },
        { q: "1 bayt necha bitga teng?", options: ["4 bit", "8 bit", "16 bit", "32 bit"], answer: 1, minGrade: 6 },
        { q: "HTML nima uchun ishlatiladi?", options: ["Veb-sahifalar tuzilmasini yaratish", "Video montaj qilish", "Antivirus yaratish", "Operatsion tizim o'rnatish"], answer: 0, minGrade: 7 },
        { q: "Sanoq sistemasida ikkilik kod qaysi raqamlardan tashkil topgan?", options: ["1 va 2", "0 va 1", "0 dan 9 gacha", "A va B"], answer: 1, minGrade: 8 },
        { q: "WWW qisqartmasi nimani anglatadi?", options: ["World Wide Web", "World Web Window", "Wide World Work", "Web World Wide"], answer: 0, minGrade: 8 },
        { q: "Ctrl + V tugmalar birikmasi nima vazifani bajaradi?", options: ["Nusxa olish", "Joylashtirish (Paste)", "Saqlash", "Chop etish"], answer: 1, minGrade: 5 },
        { q: "Ctrl + Z tugmalar birikmasi nima uchun ishlatiladi?", options: ["Yopish", "Oxirgi amalni bekor qilish (Undo)", "Qidirish", "Barchasini belgilash"], answer: 1, minGrade: 5 },
        { q: "1 Megabayt necha Kilobaytga teng?", options: ["1000 KB", "1024 KB", "512 KB", "2048 KB"], answer: 1, minGrade: 6 },
        { q: "Qaysi biri operatsion tizim hisoblanadi?", options: ["Microsoft Word", "Windows 11", "Google Chrome", "Adobe Photoshop"], answer: 1, minGrade: 5 },
        { q: "CSS veb-dasturlashda nima uchun ishlatiladi?", options: ["Ma'lumotlar bazasi uchun", "Sahifaga dizayn va stil berish uchun", "Server yaratish uchun", "Hisob-kitob uchun"], answer: 1, minGrade: 7 },
        { q: "Qog'ozdagi ma'lumotni kompyuterga o'tkazuvchi qurilma qaysi?", options: ["Printer", "Skaner", "Plotter", "Proyektor"], answer: 1, minGrade: 4 },
        { q: "Kompyuterdagi ma'lumotlarni qog'ozga chop etuvchi qurilma qaysi?", options: ["Skaner", "Printer", "Modem", "Monitor"], answer: 1, minGrade: 4 },
        { q: "RAM (Tezkor xotira) ning asosiy xususiyati nima?", options: ["Ma'lumotni umrbod saqlaydi", "Kompyuter o'chganda ma'lumotlar o'chib ketadi", "Faqat rasmlarni saqlaydi", "Disk o'rnini bosadi"], answer: 1, minGrade: 6 },
        { q: "Python nima?", options: ["Antivirus dasturi", "Dasturlash tili", "Operatsion tizim", "Brauzer"], answer: 1, minGrade: 7 },
        { q: "Algoritm nima?", options: ["Kompyuter o'yini", "Maqsadga erishish uchun bajariladigan aniq buyruqlar ketma-ketligi", "Internet tezligi", "Klaviatura turi"], answer: 1, minGrade: 5 },
        { q: "Eng kichik axborot o'lchov birligi nima?", options: ["Bayt", "Bit", "Kilobayt", "Bod"], answer: 1, minGrade: 5 },
        { q: "1 Gigabayt necha Megabaytga teng?", options: ["1000 MB", "1024 MB", "512 MB", "100 MB"], answer: 1, minGrade: 6 },
        { q: "Qaysi biri veb-brauzer hisoblanadi?", options: ["Excel", "Google Chrome", "Telegram", "Paint"], answer: 1, minGrade: 4 },
        { q: "Ctrl + A tugmalar birikmasi nima qiladi?", options: ["Saqlaydi", "Barchasini belgilaydi", "O'chiradi", "Chop etadi"], answer: 1, minGrade: 5 },
        { q: "USB nima?", options: ["Dasturlash tili", "Qurilmalarni ulash interfeysi (port)", "Monitor turi", "Virus nomi"], answer: 1, minGrade: 6 },
        { q: "Ikkilik sanoq sistemasidagi 101 soni o'nlikda nechaga teng?", options: ["4", "5", "6", "7"], answer: 1, minGrade: 8 },
        { q: "IP-manzil nima?", options: ["Uy manzili", "Tarmoqdagi kompyuterning noyob manzili", "Elektron pochta paroli", "Fayl kengaytmasi"], answer: 1, minGrade: 8 },
        { q: "Microsoft Excel dasturi nima uchun mo'ljallangan?", options: ["Video ko'rish", "Elektron jadvallar bilan ishlash", "Rasm chizish", "Musiqa tinglash"], answer: 1, minGrade: 6 },
        { q: "PDF qanday fayl formati?", options: ["Audio fayl", "Elektron hujjat formati", "Video fayl", "Arxiv fayl"], answer: 1, minGrade: 6 },
        { q: "Kompyuter viruslaridan himoya qiluvchi dastur nima deyiladi?", options: ["Arxivator", "Antivirus", "Drayver", "Kompilyator"], answer: 1, minGrade: 5 },
        { q: "Ctrl + S tugmalar birikmasi qanday vazifani bajaradi?", options: ["Qidirish", "Hujjatni saqlash (Save)", "Yopish", "Nusxa olish"], answer: 1, minGrade: 5 },
        { q: "Sun'iy intellekt qisqartmasi ingliz tilida qanday yoziladi?", options: ["IT", "AI", "VR", "OS"], answer: 1, minGrade: 7 }
    ]
};

const DB_RU = {
    math: [
        { q: "Чему равно 2 + 2 × 2?", options: ["6", "8", "4", "10"], answer: 0, minGrade: 1 },
        { q: "Сколько останется, если из 15 вычесть 7?", options: ["7", "8", "9", "6"], answer: 1, minGrade: 1 },
        { q: "Сколько минут в 1 часе?", options: ["30", "45", "60", "100"], answer: 2, minGrade: 2 },
        { q: "Чему равно 7 × 8?", options: ["54", "56", "64", "48"], answer: 1, minGrade: 2 },
        { q: "Какое число обозначает буква 'L' в римских цифрах?", options: ["50", "100", "500", "1000"], answer: 0, minGrade: 3 },
        { q: "Сколько метров в 1 километре?", options: ["100 м", "500 м", "1000 м", "10000 м"], answer: 2, minGrade: 3 },
        { q: "Стороны прямоугольника 5 см и 8 см. Найдите площадь.", options: ["13 см²", "26 см²", "40 см²", "45 см²"], answer: 2, minGrade: 4 },
        { q: "Чему равен квадрат числа 25?", options: ["525", "625", "575", "650"], answer: 1, minGrade: 5 },
        { q: "Чему равна сумма внутренних углов треугольника?", options: ["90°", "180°", "270°", "360°"], answer: 1, minGrade: 5 },
        { q: "Сколько квадратных метров в 1 гектаре?", options: ["100 м²", "1 000 м²", "10 000 м²", "100 000 м²"], answer: 2, minGrade: 5 },
        { q: "Чему равны 25% от числа 80?", options: ["15", "20", "25", "30"], answer: 1, minGrade: 5 },
        { q: "Периметр квадрата равен 36 см. Чему равна его площадь (см²)?", options: ["36", "64", "81", "72"], answer: 2, minGrade: 5 },
        { q: "Сколько рёбер у куба?", options: ["6", "8", "10", "12"], answer: 3, minGrade: 5 },
        { q: "Какое наименьшее простое число?", options: ["0", "1", "2", "3"], answer: 2, minGrade: 6 },
        { q: "Какова формула длины окружности?", options: ["2πR", "πR²", "πD²", "2πR²"], answer: 0, minGrade: 6 },
        { q: "Чему равен x в уравнении 3x + 5 = 20?", options: ["3", "4", "5", "6"], answer: 2, minGrade: 6 },
        { q: "Чему равно НОК чисел 15 и 20?", options: ["30", "45", "60", "300"], answer: 2, minGrade: 6 },
        { q: "Запишите 0.75 в виде обыкновенной дроби:", options: ["1/4", "2/3", "3/4", "4/5"], answer: 2, minGrade: 6 },
        { q: "Чему равен квадратный корень из 144?", options: ["11", "12", "13", "14"], answer: 1, minGrade: 7 },
        { q: "Чему равна 10-я степень двойки?", options: ["512", "1024", "2048", "256"], answer: 1, minGrade: 7 },
        { q: "В скольких точках пересекаются параллельные прямые?", options: ["В одной", "В двух", "Не пересекаются", "Бесконечно много"], answer: 2, minGrade: 7 },
        { q: "Чему равен квадрат гипотенузы в прямоугольном треугольнике?", options: ["Сумме катетов", "Сумме квадратов катетов", "Произведению катетов", "Периметру"], answer: 1, minGrade: 8 },
        { q: "Сколько сторон у правильного шестиугольника?", options: ["5", "6", "7", "8"], answer: 1, minGrade: 8 },
        { q: "Чему равно 7! (7 факториал)?", options: ["720", "5040", "40320", "120"], answer: 1, minGrade: 9 },
        { q: "Чему равен sin(90°)?", options: ["0", "0.5", "1", "-1"], answer: 2, minGrade: 10 },
        { q: "Чему равен log₂(32)?", options: ["4", "5", "6", "8"], answer: 1, minGrade: 11 },
        { q: "Чему равен куб числа 5?", options: ["125", "25", "75", "150"], answer: 0, minGrade: 6 },
        { q: "Каково основное свойство пропорции?", options: ["Складываются", "Произведение крайних равно произведению средних", "Делятся", "Вычитаются"], answer: 1, minGrade: 6 },
        { q: "Какова формула дискриминанта?", options: ["b² - 4ac", "b² + 4ac", "4ac - b²", "2bc - a"], answer: 0, minGrade: 8 },
        { q: "Сколько секунд в 1 часе?", options: ["3600 с", "600 с", "1800 с", "60 с"], answer: 0, minGrade: 4 }
    ],
    uzbek: [
        { q: "Сколько букв и буквосочетаний в современном узбекском алфавите на латинице?", options: ["26", "29", "31", "35"], answer: 1, minGrade: 1 },
        { q: "Сколько гласных букв в алфавите?", options: ["5", "6", "7", "8"], answer: 1, minGrade: 1 },
        { q: "Сколько слов в предложении 'Kitob — bilim manbai'?", options: ["2", "3", "4", "5"], answer: 1, minGrade: 2 },
        { q: "Кто написал слова Государственного гимна Узбекистана?", options: ["Эркин Вохидов", "Абдулла Орипов", "Мухаммад Юсуф", "Рауф Парфи"], answer: 1, minGrade: 4 },
        { q: "Сколько гласных звуков в узбекском языке?", options: ["5", "6", "7", "8"], answer: 1, minGrade: 5 },
        { q: "Как называются слова с близким значением?", options: ["Омонимы", "Синонимы", "Антонимы", "Паронимы"], answer: 1, minGrade: 5 },
        { q: "Как называются слова с противоположным значением?", options: ["Синонимы", "Антонимы", "Омонимы", "Идиомы"], answer: 1, minGrade: 5 },
        { q: "Сколько времен у глагола?", options: ["2", "3", "4", "5"], answer: 1, minGrade: 5 },
        { q: "Каковы главные члены предложения?", options: ["Подлежащее и сказуемое", "Определение и дополнение", "Обстоятельство и обращение", "Сказуемое и дополнение"], answer: 0, minGrade: 5 },
        { q: "Сколько падежей в узбекском языке?", options: ["5", "6", "7", "8"], answer: 1, minGrade: 6 },
        { q: "Кто автор повести 'Шум бола' (Озорник)?", options: ["Худойберди Тухтабоев", "Гафур Гулям", "Уткир Хашимов", "Саид Ахмад"], answer: 1, minGrade: 7 },
        { q: "Кто главный герой произведения 'Верхом на желтом диве'?", options: ["Коравой", "Хашимжон", "Отабек", "Анвар"], answer: 1, minGrade: 7 },
        { q: "Из скольких поэм состоит 'Хамса' Алишера Навои?", options: ["3", "4", "5", "6"], answer: 2, minGrade: 8 },
        { q: "Кто автор романа 'Минувшее' (O'tkan kunlar)?", options: ["Чулпан", "Абдулла Кадырий", "Ойбек", "Гафур Гулям"], answer: 1, minGrade: 9 },
        { q: "Когда узбекскому языку был придан статус государственного?", options: ["21 октября 1989 г.", "1 сентября 1991 г.", "8 декабря 1992 г.", "20 июня 1990 г."], answer: 0, minGrade: 9 },
        { q: "В каком жанре написан труд 'Бабурнаме'?", options: ["Поэма", "Мемуары", "Драма", "Сказка"], answer: 1, minGrade: 9 },
        { q: "О ком написан роман 'Звездные ночи'?", options: ["Амир Темур", "Захириддин Мухаммад Бабур", "Мирзо Улугбек", "Джалалиддин Мангуберди"], answer: 1, minGrade: 9 },
        { q: "Кто написал роман 'Ночь и день'?", options: ["Фитрат", "Абдулхамид Чулпан", "Усман Насыр", "Хамза"], answer: 1, minGrade: 10 },
        { q: "Кто создал словарь 'Деван лугат ат-тюрк'?", options: ["Юсуф Хас Хаджиб", "Махмуд Кашгари", "Ахмад Югнаки", "Рабгузи"], answer: 1, minGrade: 10 },
        { q: "Какой известный роман написал Аскар Мухтор?", options: ["Чинара", "Священная кровь", "Между двух дверей", "Горизонт"], answer: 0, minGrade: 9 },
        { q: "Как называются слова, одинаковые по написанию, но разные по значению?", options: ["Синонимы", "Омонимы", "Антонимы", "Паронимы"], answer: 1, minGrade: 5 },
        { q: "Сколько самостоятельных частей речи в узбекском языке?", options: ["4", "6", "8", "12"], answer: 1, minGrade: 6 },
        { q: "На какие вопросы отвечает имя прилагательное?", options: ["Кто? Что?", "Какой? Какая? Какое?", "Сколько?", "Что делает?"], answer: 1, minGrade: 3 },
        { q: "Какое известное произведение написал Юсуф Хас Хаджиб?", options: ["Хибат ул-хакойик", "Кутадгу билиг", "Мухокамат ул-лугатайн", "Лисон ут-тайр"], answer: 1, minGrade: 8 },
        { q: "Кто автор повести 'Дела земные' (Dunyoning ishlari)?", options: ["Саид Ахмад", "Уткир Хашимов", "Адыл Якубов", "Пиримкул Кадыров"], answer: 1, minGrade: 7 },
        { q: "Кто автор трилогии 'Горизонт' (Ufq)?", options: ["Уткир Хашимов", "Саид Ахмад", "Аскад Мухтор", "Ойбек"], answer: 1, minGrade: 9 },
        { q: "Что обозначает имя существительное?", options: ["Действие", "Предмет", "Признак", "Количество"], answer: 1, minGrade: 3 },
        { q: "Для чего служит знак апострофа (’) в узбекской латинице?", options: ["Для ударения", "Для долготы гласного и разделения слогов", "В конце предложения", "Для вопроса"], answer: 1, minGrade: 4 },
        { q: "Где родился Алишер Навои?", options: ["Самарканд", "Герат", "Бухара", "Андижан"], answer: 1, minGrade: 5 },
        { q: "Кто автор романа 'Скорпион из алтаря'?", options: ["Чулпан", "Абдулла Кадырий", "Фитрат", "Гафур Гулям"], answer: 1, minGrade: 9 }
    ],
    history: [
        { q: "Какой город является столицей Узбекистана?", options: ["Самарканд", "Ташкент", "Бухара", "Хива"], answer: 1, minGrade: 2 },
        { q: "Когда был принят Государственный флаг Узбекистана?", options: ["18 ноября 1991 г.", "2 июля 1992 г.", "10 декабря 1992 г.", "1 сентября 1991 г."], answer: 0, minGrade: 5 },
        { q: "Где расположены пирамиды Древнего Египта?", options: ["Каир (Гиза)", "Александрия", "Луксор", "Мемфис"], answer: 0, minGrade: 6 },
        { q: "Из какой страны брал начало Великий Шелковый путь?", options: ["Индия", "Китай", "Иран", "Египет"], answer: 1, minGrade: 6 },
        { q: "Царицей какого племени была Томирис?", options: ["Саки-массагеты", "Согдийцы", "Бактрийцы", "Хорезмийцы"], answer: 0, minGrade: 6 },
        { q: "Против какого полководца поднял восстание Спитамен?", options: ["Дарий I", "Александр Македонский", "Кир II", "Чингисхан"], answer: 1, minGrade: 6 },
        { q: "Когда и где родился Амир Темур?", options: ["1336 г., селение Ходжа Илгар", "1340 г., Самарканд", "1336 г., Бухара", "1350 г., Термез"], answer: 0, minGrade: 7 },
        { q: "В каком городе была построена обсерватория Мирзо Улугбека?", options: ["Бухара", "Самарканд", "Хива", "Ташкент"], answer: 1, minGrade: 7 },
        { q: "Против каких захватчиков сражался Джалалиддин Мангуберди?", options: ["Александр Македонский", "Монголы во главе с Чингисханом", "Персидские шахи", "Римская империя"], answer: 1, minGrade: 7 },
        { q: "Какой город был столицей государства Амира Темура?", options: ["Шахрисабз", "Самарканд", "Бухара", "Ташкент"], answer: 1, minGrade: 7 },
        { q: "Какой мореплаватель открыл Америку в 1492 году?", options: ["Васко да Гама", "Христофор Колумб", "Фернан Магеллан", "Америго Веспуччи"], answer: 1, minGrade: 8 },
        { q: "Когда была провозглашена Независимость Узбекистана?", options: ["31 августа 1991 г.", "1 сентября 1991 г.", "2 марта 1992 г.", "24 марта 1990 г."], answer: 0, minGrade: 9 },
        { q: "Когда Узбекистан стал членом ООН?", options: ["1 сентября 1991 г.", "2 марта 1992 г.", "15 мая 1993 г.", "18 ноября 1991 г."], answer: 1, minGrade: 9 },
        { q: "Когда была принята Конституция Республики Узбекистан?", options: ["18 ноября 1991 г.", "2 июля 1992 г.", "8 декабря 1992 г.", "1 июля 1994 г."], answer: 2, minGrade: 9 },
        { q: "В какие годы проходила Вторая мировая война?", options: ["1914–1918", "1939–1945", "1941–1945", "1936–1942"], answer: 1, minGrade: 9 },
        { q: "Когда был принят Государственный герб Узбекистана?", options: ["18 ноября 1991 г.", "2 июля 1992 г.", "10 декабря 1992 г.", "1 июля 1994 г."], answer: 1, minGrade: 5 },
        { q: "Когда была введена в обращение национальная валюта — сум?", options: ["1 сентября 1991 г.", "1 июля 1994 г.", "8 декабря 1992 г.", "15 ноября 1993 г."], answer: 1, minGrade: 6 },
        { q: "Где родился Захириддин Мухаммад Бабур?", options: ["Самарканд", "Андижан", "Ташкент", "Фергана"], answer: 1, minGrade: 7 },
        { q: "В каком городе находится соборная мечеть Биби-Ханым?", options: ["Бухара", "Самарканд", "Хива", "Шахрисабз"], answer: 1, minGrade: 6 },
        { q: "В каком городе был возведен дворец Аксарай?", options: ["Самарканд", "Шахрисабз", "Бухара", "Термез"], answer: 1, minGrade: 7 },
        { q: "Чем прославился древневавилонский царь Хаммурапи?", options: ["Пирамидами", "Сводом законов", "Великой стеной", "Обсерваторией"], answer: 1, minGrade: 6 },
        { q: "Когда началась Первая мировая война?", options: ["1912 г.", "1914 г.", "1918 г.", "1939 г."], answer: 1, minGrade: 9 },
        { q: "Священной книгой какой религии является 'Авеста'?", options: ["Буддизм", "Зороастризм", "Христианство", "Шаманизм"], answer: 1, minGrade: 6 },
        { q: "Против каких захватчиков совершил подвиг пастух Ширак?", options: ["Александр Македонский", "Персы во главе с Дарием I", "Чингисхан", "Арабский халифат"], answer: 1, minGrade: 6 },
        { q: "Из скольких медресе состоит ансамбль площади Регистан?", options: ["Из 2", "Из 3", "Из 4", "Из 5"], answer: 1, minGrade: 5 },
        { q: "При каком правителе был построен минарет Калян в Бухаре?", options: ["Амир Темур", "Арслан-хан", "Исмаил Самани", "Абдулла-хан II"], answer: 1, minGrade: 7 },
        { q: "В каком городе находится крепость Ичан-Кала?", options: ["Бухара", "Хива", "Самарканд", "Коканд"], answer: 1, minGrade: 5 },
        { q: "В какой стране правила династия Бабуридов (Великих Моголов)?", options: ["Иран", "Индия", "Египет", "Турция"], answer: 1, minGrade: 8 },
        { q: "Когда началась Великая французская революция?", options: ["1776 г.", "1789 г.", "1812 г.", "1917 г."], answer: 1, minGrade: 8 },
        { q: "Кто стал первым человеком в истории, полетевшим в космос?", options: ["Нил Армстронг", "Юрий Гагарин", "Валентина Терешкова", "Алексей Леонов"], answer: 1, minGrade: 5 }
    ],
    geography: [
        { q: "С какой стороны восходит Солнце?", options: ["С запада", "С востока", "С севера", "С юга"], answer: 1, minGrade: 2 },
        { q: "Сколько времен года в году?", options: ["2", "3", "4", "5"], answer: 2, minGrade: 1 },
        { q: "Какой океан является самым большим на Земле?", options: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"], answer: 2, minGrade: 6 },
        { q: "Какая вершина является самой высокой на Земле?", options: ["Эльбрус", "Эверест (Джомолунгма)", "Килиманджаро", "Хазрати Султан"], answer: 1, minGrade: 6 },
        { q: "Какая река самая длинная в мире?", options: ["Амазонка", "Нил", "Миссисипи", "Амударья"], answer: 1, minGrade: 6 },
        { q: "Какой материк самый маленький?", options: ["Европа", "Антарктида", "Австралия", "Южная Америка"], answer: 2, minGrade: 6 },
        { q: "Сколько материков на Земле?", options: ["5", "6", "7", "4"], answer: 1, minGrade: 6 },
        { q: "Какое озеро является самым глубоким в мире?", options: ["Каспийское", "Байкал", "Виктория", "Иссык-Куль"], answer: 1, minGrade: 6 },
        { q: "Со сколькими государствами граничит Узбекистан?", options: ["4", "5", "6", "7"], answer: 1, minGrade: 7 },
        { q: "Какова площадь территории Узбекистана?", options: ["448,9 тыс. км²", "350 тыс. км²", "520 тыс. км²", "600 тыс. км²"], answer: 0, minGrade: 7 },
        { q: "Какой город является столицей Японии?", options: ["Сеул", "Пекин", "Токио", "Киото"], answer: 2, minGrade: 7 },
        { q: "Какая пустыня является крупнейшей в Узбекистане?", options: ["Каракумы", "Кызылкум", "Мирзачуль", "Устюрт"], answer: 1, minGrade: 7 },
        { q: "Какая пустыня самая большая в мире?", options: ["Кызылкум", "Гоби", "Сахара", "Атакама"], answer: 2, minGrade: 7 },
        { q: "Какая крупнейшая река протекает по Ферганской долине?", options: ["Амударья", "Сырдарья", "Зеравшан", "Кашкадарья"], answer: 1, minGrade: 7 },
        { q: "Какова примерная длина земного экватора?", options: ["20 000 км", "40 000 км", "60 000 км", "10 000 км"], answer: 1, minGrade: 6 },
        { q: "Какое государство является самым большим по площади в мире?", options: ["Канада", "Россия", "Китай", "США"], answer: 1, minGrade: 7 },
        { q: "Какой остров является самым большим в мире?", options: ["Мадагаскар", "Гренландия", "Новая Гвинея", "Калимантан"], answer: 1, minGrade: 6 },
        { q: "Какова высшая точка Узбекистана?", options: ["Чаткал", "Пик Хазрати Султан", "Большой Чимган", "Бабатаг"], answer: 1, minGrade: 7 },
        { q: "Какая планета Солнечной системы самая большая?", options: ["Сатурн", "Юпитер", "Уран", "Нептун"], answer: 1, minGrade: 5 },
        { q: "Куда всегда указывает красная стрелка компаса?", options: ["На юг", "На север", "На восток", "На запад"], answer: 1, minGrade: 4 },
        { q: "Какая река самая полноводная в мире?", options: ["Нил", "Амазонка", "Янцзы", "Волга"], answer: 1, minGrade: 6 },
        { q: "Какое водохранилище является крупнейшим в Узбекистане?", options: ["Чарвакское", "Туямуюнское", "Андижанское", "Каттакурганское"], answer: 1, minGrade: 7 },
        { q: "Какой город является столицей Франции?", options: ["Лондон", "Париж", "Берлин", "Рим"], answer: 1, minGrade: 5 },
        { q: "На каком материке нет постоянного населения?", options: ["Австралия", "Антарктида", "Южная Америка", "Африка"], answer: 1, minGrade: 5 },
        { q: "Какое море является самым соленым в мире?", options: ["Черное море", "Мертвое море", "Красное море", "Средиземное море"], answer: 1, minGrade: 6 },
        { q: "Какой водопад является самым высоким в мире?", options: ["Ниагарский", "Анхель", "Виктория", "Игуасу"], answer: 1, minGrade: 6 },
        { q: "Сколько областей в Узбекистане?", options: ["10", "12", "14", "11"], answer: 1, minGrade: 4 },
        { q: "За сколько дней Земля совершает полный оборот вокруг Солнца?", options: ["360 дней", "365 дней (и 6 часов)", "300 дней", "354 дня"], answer: 1, minGrade: 4 },
        { q: "На каком материке расположен Египет?", options: ["Азия", "Африка", "Европа", "Австралия"], answer: 1, minGrade: 6 },
        { q: "Каким прибором измеряют атмосферное давление?", options: ["Термометр", "Барометр", "Гигрометр", "Флюгер"], answer: 1, minGrade: 6 }
    ],
    biology: [
        { q: "Сколько органов чувств у человека?", options: ["4", "5", "6", "7"], answer: 1, minGrade: 3 },
        { q: "Какое сухопутное животное самое быстрое?", options: ["Лев", "Гепард", "Антилопа", "Волк"], answer: 1, minGrade: 4 },
        { q: "Какова нормальная температура тела человека (°C)?", options: ["35.6", "36.6", "37.5", "38.0"], answer: 1, minGrade: 5 },
        { q: "Сколько ног у насекомых?", options: ["4", "6", "8", "10"], answer: 1, minGrade: 5 },
        { q: "В какой части растения активно протекает фотосинтез?", options: ["В корнях", "В листьях", "В стебле", "В цветках"], answer: 1, minGrade: 6 },
        { q: "Какой орган растения всасывает воду и минеральные соли?", options: ["Лист", "Корень", "Цветок", "Плод"], answer: 1, minGrade: 6 },
        { q: "Какое млекопитающее является самым крупным на Земле?", options: ["Африканский слон", "Синий кит", "Жираф", "Бегемот"], answer: 1, minGrade: 7 },
        { q: "Из скольких камер состоит сердце человека?", options: ["2", "3", "4", "5"], answer: 2, minGrade: 8 },
        { q: "Какой орган является самым крупным в организме человека?", options: ["Печень", "Кожа", "Легкие", "Желудок"], answer: 1, minGrade: 8 },
        { q: "Какие клетки крови переносят кислород?", options: ["Лейкоциты", "Эритроциты", "Тромбоциты", "Лимфоциты"], answer: 1, minGrade: 8 },
        { q: "Сколько примерно костей в скелете взрослого человека?", options: ["Около 150", "206", "300", "180"], answer: 1, minGrade: 8 },
        { q: "Какую форму имеет молекула ДНК?", options: ["Кольцо", "Двойная спираль", "Куб", "Прямая линия"], answer: 1, minGrade: 9 },
        { q: "Какой органоид называют 'энергетической станцией' клетки?", options: ["Рибосома", "Митохондрия", "Лизосома", "Ядро"], answer: 1, minGrade: 9 },
        { q: "Сколько ног у паукообразных?", options: ["6", "8", "10", "12"], answer: 1, minGrade: 7 },
        { q: "Какой пигмент придает листьям растений зеленый цвет?", options: ["Каротин", "Хлорофилл", "Ксантофилл", "Гемоглобин"], answer: 1, minGrade: 6 },
        { q: "Сколько постоянных зубов у взрослого человека?", options: ["28", "32", "30", "36"], answer: 1, minGrade: 8 },
        { q: "Какие форменные элементы крови участвуют в ее свертывании?", options: ["Эритроциты", "Тромбоциты", "Лейкоциты", "Плазма"], answer: 1, minGrade: 8 },
        { q: "Сколько групп крови существует у человека?", options: ["2", "4", "3", "6"], answer: 1, minGrade: 8 },
        { q: "Какой витамин синтезируется в коже человека под действием солнечного света?", options: ["Витамин A", "Витамин D", "Витамин C", "Витамин B12"], answer: 1, minGrade: 8 },
        { q: "Как называется наука, изучающая грибы?", options: ["Ботаника", "Микология", "Зоология", "Цитология"], answer: 1, minGrade: 6 },
        { q: "Какая птица не умеет летать, но отлично плавает?", options: ["Страус", "Пингвин", "Киви", "Аист"], answer: 1, minGrade: 5 },
        { q: "В каком органе человека вырабатывается желчь?", options: ["В желудке", "В печени", "В поджелудочной железе", "В почках"], answer: 1, minGrade: 8 },
        { q: "Какая наука изучает клетку?", options: ["Анатомия", "Цитология", "Гистология", "Генетика"], answer: 1, minGrade: 9 },
        { q: "Наука о законах наследственности и изменчивости:", options: ["Экология", "Генетика", "Эволюция", "Селекция"], answer: 1, minGrade: 9 },
        { q: "Какой газ поглощают растения при дыхании?", options: ["Углекислый газ", "Кислород", "Азот", "Водород"], answer: 1, minGrade: 6 },
        { q: "Какой газ выделяется в процессе фотосинтеза?", options: ["Углекислый газ", "Кислород", "Азот", "Метан"], answer: 1, minGrade: 6 },
        { q: "Какое травянистое растение является самым высоким в мире?", options: ["Тростник", "Бамбук", "Банан", "Пальма"], answer: 1, minGrade: 6 },
        { q: "Что входит в центральную нервную систему?", options: ["Только головной мозг", "Головной и спинной мозг", "Только нервы", "Органы чувств"], answer: 1, minGrade: 8 },
        { q: "Какая птица самая маленькая в мире?", options: ["Воробей", "Колибри", "Ласточка", "Перепелка"], answer: 1, minGrade: 5 },
        { q: "Сколько шейных позвонков у млекопитающих (включая жирафа)?", options: ["5", "7", "9", "12"], answer: 1, minGrade: 7 }
    ],
    physics: [
        { q: "Какова единица измерения силы в СИ?", options: ["Джоуль", "Ньютон", "Ватт", "Паскаль"], answer: 1, minGrade: 7 },
        { q: "Какова единица измерения давления в СИ?", options: ["Ньютон", "Паскаль", "Джоуль", "Ватт"], answer: 1, minGrade: 7 },
        { q: "При какой температуре кипит чистая вода при нормальном давлении?", options: ["90 °C", "95 °C", "100 °C", "110 °C"], answer: 2, minGrade: 7 },
        { q: "Какова формула плотности?", options: ["ρ = m / V", "ρ = m · V", "ρ = V / m", "ρ = F / m"], answer: 0, minGrade: 7 },
        { q: "Какова скорость света в вакууме?", options: ["300 000 км/с", "150 000 км/с", "340 м/с", "30 000 км/с"], answer: 0, minGrade: 8 },
        { q: "Каким прибором измеряется сила тока?", options: ["Вольтметр", "Амперметр", "Омметр", "Барометр"], answer: 1, minGrade: 8 },
        { q: "Какова формула закона Ома для участка цепи?", options: ["I = U / R", "U = I / R", "R = I · U", "P = I · R"], answer: 0, minGrade: 8 },
        { q: "Какова формула второго закона Ньютона?", options: ["F = m · a", "E = m · c²", "P = F / S", "A = F · s"], answer: 0, minGrade: 9 },
        { q: "Кто является автором теории относительности?", options: ["Макс Планк", "Альберт Эйнштейн", "Нильс Бор", "Майкл Фарадей"], answer: 1, minGrade: 11 },
        { q: "Какова единица измерения работы и энергии в СИ?", options: ["Ватт", "Джоуль", "Ньютон", "Кулон"], answer: 1, minGrade: 7 },
        { q: "Какова единица измерения мощности?", options: ["Джоуль", "Ватт", "Вольт", "Ампер"], answer: 1, minGrade: 7 },
        { q: "Каким прибором измеряется электрическое напряжение?", options: ["Амперметр", "Вольтметр", "Омметр", "Ваттметр"], answer: 1, minGrade: 8 },
        { q: "Какова единица измерения электрического сопротивления?", options: ["Ампер", "Ом", "Вольт", "Фарад"], answer: 1, minGrade: 8 },
        { q: "Какова примерная скорость звука в воздухе?", options: ["300 км/с", "340 м/с", "1500 м/с", "300 000 км/с"], answer: 1, minGrade: 7 },
        { q: "Чему равно ускорение свободного падения (g) на Земле?", options: ["8.9 м/с²", "9.8 м/с²", "10.8 м/с²", "6.7 м/с²"], answer: 1, minGrade: 7 },
        { q: "Как называется выталкивающая сила, действующая на тело в жидкости или газе?", options: ["Сила Ньютона", "Сила Архимеда", "Сила Паскаля", "Сила Кулона"], answer: 1, minGrade: 7 },
        { q: "При какой температуре по Цельсию замерзает вода?", options: ["-4 °C", "0 °C", "+4 °C", "-10 °C"], answer: 1, minGrade: 6 },
        { q: "Какова основная единица температуры в СИ?", options: ["Цельсий", "Кельвин", "Фаренгейт", "Реомюр"], answer: 1, minGrade: 8 },
        { q: "Какова основная единица массы в СИ?", options: ["Грамм", "Килограмм", "Тонна", "Центнер"], answer: 1, minGrade: 7 },
        { q: "Какова формула скорости?", options: ["v = s · t", "v = s / t", "v = t / s", "v = a · s"], answer: 1, minGrade: 7 },
        { q: "Какова единица измерения электрического заряда?", options: ["Ампер", "Кулон", "Вольт", "Ом"], answer: 1, minGrade: 8 },
        { q: "Сколько полюсов у магнита?", options: ["1", "2", "3", "4"], answer: 1, minGrade: 8 },
        { q: "Чему равен угол падения луча согласно закону отражения света?", options: ["90 градусам", "Углу отражения", "Углу преломления", "0 градусам"], answer: 1, minGrade: 8 },
        { q: "Какова единица измерения частоты?", options: ["Секунда", "Герц (Гц)", "Метр", "Ватт"], answer: 1, minGrade: 9 },
        { q: "В какой среде звук не распространяется?", options: ["В воде", "В вакууме", "В воздухе", "В стали"], answer: 1, minGrade: 7 },
        { q: "Как в древности назвали мельчайшую неделимую частицу вещества?", options: ["Молекула", "Атом", "Электрон", "Ион"], answer: 1, minGrade: 7 },
        { q: "Как называется сила, с которой Земля притягивает к себе все тела?", options: ["Сила трения", "Сила тяжести", "Сила упругости", "Сила Архимеда"], answer: 1, minGrade: 7 },
        { q: "В каких единицах измеряется количество теплоты?", options: ["Ватт", "Джоуль", "Паскаль", "Ньютон"], answer: 1, minGrade: 8 },
        { q: "На каком явлении света основана работа линз в очках?", options: ["Отражение", "Преломление", "Поглощение", "Рассеяние"], answer: 1, minGrade: 8 },
        { q: "Какова знаменитая формула Эйнштейна о связи массы и энергии?", options: ["F = ma", "E = mc²", "P = UI", "A = Fs"], answer: 1, minGrade: 11 }
    ],
    chemistry: [
        { q: "Какова химическая формула воды?", options: ["CO₂", "H₂O", "H₂O₂", "O₂"], answer: 1, minGrade: 7 },
        { q: "Какой элемент стоит под номером 1 в таблице Менделеева?", options: ["Гелий", "Водород", "Литий", "Кислород"], answer: 1, minGrade: 7 },
        { q: "Кто создал периодическую систему элементов?", options: ["М.В. Ломоносов", "Д.И. Менделеев", "А.М. Бутлеров", "Ж. Дальтон"], answer: 1, minGrade: 8 },
        { q: "Каков химический символ золота?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1, minGrade: 8 },
        { q: "Какого газа больше всего в воздухе (78%)?", options: ["Кислород", "Азот", "Углекислый газ", "Водород"], answer: 1, minGrade: 8 },
        { q: "Какова формула поваренной соли?", options: ["KCl", "NaCl", "CaCO₃", "NaOH"], answer: 1, minGrade: 8 },
        { q: "Какой единственный металл при обычных условиях является жидким?", options: ["Олово", "Ртуть", "Свинец", "Цинк"], answer: 1, minGrade: 9 },
        { q: "Какова формула серной кислоты?", options: ["HCl", "HNO₃", "H₂SO₄", "H₃PO₄"], answer: 2, minGrade: 9 },
        { q: "Каков химический символ железа?", options: ["Cu", "Fe", "Zn", "Al"], answer: 1, minGrade: 7 },
        { q: "Чему равна относительная атомная масса кислорода?", options: ["12", "16", "14", "32"], answer: 1, minGrade: 7 },
        { q: "Какова формула углекислого газа?", options: ["CO", "CO₂", "CH₄", "SO₂"], answer: 1, minGrade: 7 },
        { q: "Каков химический символ серебра?", options: ["Au", "Ag", "Pt", "Hg"], answer: 1, minGrade: 8 },
        { q: "Какова формула соляной кислоты?", options: ["H₂SO₄", "HCl", "HNO₃", "H₂CO₃"], answer: 1, minGrade: 8 },
        { q: "Какова химическая формула метана?", options: ["C₂H₆", "CH₄", "C₂H₄", "C₂H₂"], answer: 1, minGrade: 9 },
        { q: "Аллотропными видоизменениями какого элемента являются алмаз и графит?", options: ["Кремний", "Углерод", "Сера", "Фосфор"], answer: 1, minGrade: 8 },
        { q: "Какова формула озона?", options: ["O₂", "O₃", "H₂O₂", "CO₂"], answer: 1, minGrade: 7 },
        { q: "Каков химический символ меди?", options: ["Co", "Cu", "Ca", "Cr"], answer: 1, minGrade: 7 },
        { q: "Чему равен показатель pH в нейтральной среде?", options: ["0", "7", "14", "5"], answer: 1, minGrade: 9 },
        { q: "Какой газ является самым легким?", options: ["Гелий", "Водород", "Азот", "Кислород"], answer: 1, minGrade: 7 },
        { q: "Какова формула гидроксида натрия (едкого натра)?", options: ["NaCl", "NaOH", "Na₂CO₃", "NaNO₃"], answer: 1, minGrade: 8 },
        { q: "Что является основным компонентом мела и мрамора?", options: ["CaO", "CaCO₃", "CaCl₂", "CaSO₄"], answer: 1, minGrade: 8 },
        { q: "Каков химический символ кальция?", options: ["K", "Ca", "C", "Cu"], answer: 1, minGrade: 7 },
        { q: "Каков химический символ калия?", options: ["Ca", "K", "Kr", "P"], answer: 1, minGrade: 7 },
        { q: "Какой газ необходим для дыхания и поддерживает горение?", options: ["Азот", "Кислород", "Углекислый газ", "Гелий"], answer: 1, minGrade: 7 },
        { q: "Чему равна постоянная Авогадро?", options: ["6.02 × 10²⁰", "6.02 × 10²³", "3.14 × 10²³", "9.8 × 10²³"], answer: 1, minGrade: 8 },
        { q: "Какой единственный неметалл при обычных условиях является жидким?", options: ["Йод", "Бром", "Хлор", "Фтор"], answer: 1, minGrade: 9 },
        { q: "Каков химический символ алюминия?", options: ["Au", "Al", "Ag", "Ar"], answer: 1, minGrade: 7 },
        { q: "Какова формула уксусной кислоты?", options: ["HCOOH", "CH₃COOH", "C₂H₅OH", "H₂CO₃"], answer: 1, minGrade: 10 },
        { q: "Какова формула этилового спирта?", options: ["CH₃OH", "C₂H₅OH", "C₃H₇OH", "CH₃CHO"], answer: 1, minGrade: 10 },
        { q: "Сколько периодов в таблице Менделеева?", options: ["5", "7", "8", "10"], answer: 1, minGrade: 8 }
    ],
    english: [
        { q: "Как переводится слово 'Apple'?", options: ["Яблоко", "Банан", "Виноград", "Гранат"], answer: 0, minGrade: 1 },
        { q: "Какой цвет означает слово 'Red'?", options: ["Синий", "Красный", "Зеленый", "Желтый"], answer: 1, minGrade: 2 },
        { q: "Множественное число слова 'Child':", options: ["Childs", "Childrens", "Children", "Childes"], answer: 2, minGrade: 4 },
        { q: "Заполните пропуск: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], answer: 1, minGrade: 5 },
        { q: "Антоним слова 'Beautiful' (красивый):", options: ["Pretty", "Ugly", "Smart", "Kind"], answer: 1, minGrade: 5 },
        { q: "Как переводится фраза 'Knowledge is power'?", options: ["Время — судья", "Знание — сила", "Труд — счастье", "Здоровье — богатство"], answer: 1, minGrade: 6 },
        { q: "Форма Past Simple глагола 'Go':", options: ["Goed", "Gone", "Went", "Going"], answer: 2, minGrade: 6 },
        { q: "Форма V3 (Past Participle) глагола 'Write':", options: ["Wrote", "Writed", "Written", "Writing"], answer: 2, minGrade: 8 },
        { q: "Как переводится слово 'Book'?", options: ["Тетрадь", "Книга", "Ручка", "Сумка"], answer: 1, minGrade: 1 },
        { q: "Как переводится фраза 'Good morning'?", options: ["Добрый вечер", "Доброе утро", "Спокойной ночи", "Привет"], answer: 1, minGrade: 1 },
        { q: "Множественное число слова 'Mouse' (мышь):", options: ["Mouses", "Mice", "Mices", "Mouse"], answer: 1, minGrade: 5 },
        { q: "Заполните пропуск: 'They ___ playing football now.'", options: ["is", "are", "am", "was"], answer: 1, minGrade: 4 },
        { q: "Сравнительная степень (Comparative) прилагательного 'Big':", options: ["More big", "Bigger", "Biggest", "Bigest"], answer: 1, minGrade: 5 },
        { q: "Превосходная степень (Superlative) прилагательного 'Good':", options: ["Goodest", "The best", "Better", "Most good"], answer: 1, minGrade: 6 },
        { q: "Множественное число слова 'Tooth' (зуб):", options: ["Tooths", "Teeth", "Teeths", "Toothes"], answer: 1, minGrade: 5 },
        { q: "Что означает слово 'Yesterday'?", options: ["Завтра", "Вчера", "Сегодня", "Сейчас"], answer: 1, minGrade: 3 },
        { q: "Заполните пропуск: 'I have lived in Tashkent ___ 2015.'", options: ["for", "since", "in", "at"], answer: 1, minGrade: 7 },
        { q: "Форма Past Simple глагола 'See':", options: ["Seed", "Saw", "Seen", "Seeing"], answer: 1, minGrade: 6 },
        { q: "Что означает слово 'Library'?", options: ["Магазин", "Библиотека", "Школа", "Больница"], answer: 1, minGrade: 4 },
        { q: "Какой артикль ставится перед существительным в ед. числе, начинающимся с гласного звука?", options: ["a", "an", "the", "-"], answer: 1, minGrade: 3 },
        { q: "Синоним слова 'Fast' (быстрый):", options: ["Slow", "Quick", "Heavy", "Weak"], answer: 1, minGrade: 5 },
        { q: "Форма Past Simple глагола 'Buy':", options: ["Buyed", "Bought", "Brought", "Built"], answer: 1, minGrade: 6 },
        { q: "Какой день недели обозначает 'Wednesday'?", options: ["Вторник", "Среда", "Четверг", "Пятница"], answer: 1, minGrade: 3 },
        { q: "Множественное число слова 'Foot' (ступня):", options: ["Foots", "Feet", "Feets", "Footes"], answer: 1, minGrade: 5 },
        { q: "Заполните пропуск: 'He ___ a doctor.'", options: ["am", "is", "are", "be"], answer: 1, minGrade: 2 },
        { q: "Форма V3 (Past Participle) глагола 'Speak':", options: ["Spoke", "Spoken", "Speaked", "Speaking"], answer: 1, minGrade: 7 },
        { q: "Какое время года обозначает 'Autumn' (или 'Fall')?", options: ["Весна", "Осень", "Зима", "Лето"], answer: 1, minGrade: 3 },
        { q: "Как переводится слово 'Dangerous'?", options: ["Безопасный", "Опасный", "Интересный", "Легкий"], answer: 1, minGrade: 6 },
        { q: "Заполните пропуск: 'We ___ to Samarkand tomorrow.'", options: ["went", "will go", "goes", "gone"], answer: 1, minGrade: 5 },
        { q: "Как переводится слово 'Honest'?", options: ["Умный", "Честный", "Храбрый", "Добрый"], answer: 1, minGrade: 7 }
    ],
    informatics: [
        { q: "Какое устройство служит для ввода текста?", options: ["Монитор", "Клавиатура", "Принтер", "Колонки"], answer: 1, minGrade: 3 },
        { q: "Сколько байт в 1 Килобайте?", options: ["1000 байт", "1024 байта", "512 байт", "2048 байт"], answer: 1, minGrade: 5 },
        { q: "Какое устройство является 'мозгом' компьютера?", options: ["Монитор", "Процессор (CPU)", "Клавиатура", "Принтер"], answer: 1, minGrade: 5 },
        { q: "Что делает комбинация Ctrl + C?", options: ["Вырезать", "Копировать", "Вставить", "Отменить"], answer: 1, minGrade: 5 },
        { q: "Сколько бит в 1 байте?", options: ["4 бита", "8 бит", "16 бит", "32 бита"], answer: 1, minGrade: 6 },
        { q: "Для чего используется HTML?", options: ["Создание структуры веб-страниц", "Видеомонтаж", "Создание антивирусов", "Установка ОС"], answer: 0, minGrade: 7 },
        { q: "Из каких цифр состоит двоичный код?", options: ["1 и 2", "0 и 1", "От 0 до 9", "A и B"], answer: 1, minGrade: 8 },
        { q: "Что означает аббревиатура WWW?", options: ["World Wide Web", "World Web Window", "Wide World Work", "Web World Wide"], answer: 0, minGrade: 8 },
        { q: "Что делает комбинация Ctrl + V?", options: ["Копировать", "Вставить (Paste)", "Сохранить", "Печать"], answer: 1, minGrade: 5 },
        { q: "Для чего используется комбинация Ctrl + Z?", options: ["Закрыть", "Отменить последнее действие (Undo)", "Поиск", "Выделить всё"], answer: 1, minGrade: 5 },
        { q: "Сколько Килобайт в 1 Мегабайте?", options: ["1000 КБ", "1024 КБ", "512 КБ", "2048 КБ"], answer: 1, minGrade: 6 },
        { q: "Что из перечисленного является операционной системой?", options: ["Microsoft Word", "Windows 11", "Google Chrome", "Adobe Photoshop"], answer: 1, minGrade: 5 },
        { q: "Для чего используется CSS в веб-разработке?", options: ["Для баз данных", "Для оформления и стилизации страниц", "Для создания серверов", "Для расчетов"], answer: 1, minGrade: 7 },
        { q: "Какое устройство переводит изображение с бумаги в компьютер?", options: ["Принтер", "Сканер", "Плоттер", "Проектор"], answer: 1, minGrade: 4 },
        { q: "Какое устройство выводит информацию из компьютера на бумагу?", options: ["Сканер", "Принтер", "Модем", "Монитор"], answer: 1, minGrade: 4 },
        { q: "Какова главная особенность оперативной памяти (RAM)?", options: ["Хранит данные вечно", "Данные стираются при выключении питания", "Хранит только фото", "Заменяет жесткий диск"], answer: 1, minGrade: 6 },
        { q: "Что такое Python?", options: ["Антивирус", "Язык программирования", "Операционная система", "Браузер"], answer: 1, minGrade: 7 },
        { q: "Что такое алгоритм?", options: ["Компьютерная игра", "Четкая последовательность команд для достижения цели", "Скорость интернета", "Тип клавиатуры"], answer: 1, minGrade: 5 },
        { q: "Какова наименьшая единица измерения информации?", options: ["Байт", "Бит", "Килобайт", "Бод"], answer: 1, minGrade: 5 },
        { q: "Сколько Мегабайт в 1 Гигабайте?", options: ["1000 МБ", "1024 МБ", "512 МБ", "100 МБ"], answer: 1, minGrade: 6 },
        { q: "Что из перечисленного является веб-браузером?", options: ["Excel", "Google Chrome", "Telegram", "Paint"], answer: 1, minGrade: 4 },
        { q: "Что делает комбинация Ctrl + A?", options: ["Сохраняет", "Выделяет всё", "Удаляет", "Печатает"], answer: 1, minGrade: 5 },
        { q: "Что такое USB?", options: ["Язык программирования", "Интерфейс (порт) для подключения устройств", "Тип монитора", "Название вируса"], answer: 1, minGrade: 6 },
        { q: "Чему равно двоичное число 101 в десятичной системе счисления?", options: ["4", "5", "6", "7"], answer: 1, minGrade: 8 },
        { q: "Что такое IP-адрес?", options: ["Домашний адрес", "Уникальный сетевой адрес компьютера", "Пароль от почты", "Расширение файла"], answer: 1, minGrade: 8 },
        { q: "Для чего предназначена программа Microsoft Excel?", options: ["Просмотр видео", "Работа с электронными таблицами", "Рисование", "Прослушивание музыки"], answer: 1, minGrade: 6 },
        { q: "Какой формат файла представляет собой PDF?", options: ["Аудиофайл", "Формат электронных документов", "Видеофайл", "Архив"], answer: 1, minGrade: 6 },
        { q: "Как называется программа для защиты от компьютерных вирусов?", options: ["Архиватор", "Антивирус", "Драйвер", "Компилятор"], answer: 1, minGrade: 5 },
        { q: "Какую функцию выполняет комбинация Ctrl + S?", options: ["Поиск", "Сохранить документ (Save)", "Закрыть", "Копировать"], answer: 1, minGrade: 5 },
        { q: "Как на английском пишется аббревиатура искусственного интеллекта?", options: ["IT", "AI", "VR", "OS"], answer: 1, minGrade: 7 }
    ]
};

const OPPONENTS_POOL = [
    { name: "Azizbek (Toshkent)", avatar: "🧑‍🎓" },
    { name: "Madina (Samarqand)", avatar: "👩‍🎓" },
    { name: "Sardor (Namangan)", avatar: "🧑" },
    { name: "Nilufar (Buxoro)", avatar: "👩" },
    { name: "Bekzod (Farg'ona)", avatar: "👦" },
    { name: "Zarina (Xorazm)", avatar: "👧" },
    { name: "Jahongir (Qashqadaryo)", avatar: "🧔" },
    { name: "Sevara (Andijon)", avatar: "👩‍💻" },
    { name: "Ulug'bek (Navoiy)", avatar: "🧑‍💻" },
    { name: "Malika (Jizzax)", avatar: "👩‍🏫" }
];

/* ==========================================================================
   2. HOLAT (STATE) VA XOTIRA BOSHQARUVI (30 TA SAVOL, 30 SONIYA)
   ========================================================================== */
const STORAGE_KEY_USED = "bilimdon_arena_used_questions_v4";
const QUESTION_TIME_LIMIT = 30;

let state = {
    lang: "uz",
    playerName: "Bilimdon",
    selectedGrade: 7,
    selectedCategory: "all",
    oppName: "Raqib",
    oppAvatar: "🤖",
    lastOpponentName: "",
    questions: [],
    currentIdx: 0,
    myScore: 0,
    oppScore: 0,
    myCorrectCount: 0,
    oppCorrectCount: 0,
    timeLeft: QUESTION_TIME_LIMIT,
    timerId: null,
    botTimeoutId: null,
    answered: false
};

const screens = {
    start: document.getElementById('start-screen'),
    matchmaking: document.getElementById('matchmaking-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen')
};

/* ==========================================================================
   3. YORDAMCHI VA XOTIRA FUNKSIYALARI
   ========================================================================== */

function getUsedQuestionsSet() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_USED);
        return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
        return new Set();
    }
}

function saveUsedQuestionsSet(usedSet) {
    try {
        localStorage.setItem(STORAGE_KEY_USED, JSON.stringify(Array.from(usedSet)));
    } catch (e) {
        console.warn("Xotiraga saqlashda xatolik:", e);
    }
}

function resetUsedQuestionsHistory(poolQuestions) {
    const usedSet = getUsedQuestionsSet();
    poolQuestions.forEach(item => usedSet.delete(item.q));
    saveUsedQuestionsSet(usedSet);
    return usedSet;
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function switchScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

function clearAllTimers() {
    if (state.timerId) {
        clearInterval(state.timerId);
        state.timerId = null;
    }
    if (state.botTimeoutId) {
        clearTimeout(state.botTimeoutId);
        state.botTimeoutId = null;
    }
}

/* ==========================================================================
   4. INTERFEYS VA TIL FUNKSIYALARI
   ========================================================================== */

function getValidatedGradeInput() {
    const gradeInput = document.getElementById('grade-input');
    if (!gradeInput) return 7;

    let val = parseInt(gradeInput.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 11) val = 11;

    gradeInput.value = val;
    return val;
}

function enforceGradeInputBounds() {
    const gradeInput = document.getElementById('grade-input');
    if (!gradeInput || gradeInput.value === '') return;

    let val = parseInt(gradeInput.value, 10);
    if (val < 1) gradeInput.value = 1;
    if (val > 11) gradeInput.value = 11;
}

function updateCategoryDropdownTexts() {
    const catSel = document.getElementById('category-select');
    if (!catSel) return;

    const labels = state.lang === 'ru' ? [
        "🌐 Все предметы (смешанные)",
        "📐 Математика",
        "📖 Родной язык и литература",
        "🏛️ История",
        "🌍 География",
        "🧬 Биология",
        "⚛️ Физика",
        "🧪 Химия",
        "🇬🇧 Английский язык",
        "💻 Информатика"
    ] : [
        "🌐 Barchasi aralash / Все предметы",
        "📐 Matematika / Математика",
        "📖 Ona tili va Adabiyot / Язык и литература",
        "🏛️ Tarix / История",
        "🌍 Geografiya / География",
        "🧬 Biologiya / Биология",
        "⚛️ Fizika / Физика",
        "🧪 Kimyo / Химия",
        "🇬🇧 Ingliz tili / Английский язык",
        "💻 Informatika / Информатика"
    ];

    for (let i = 0; i < labels.length && i < catSel.options.length; i++) {
        catSel.options[i].text = labels[i];
    }
}

function applyLanguageToUI() {
    const isRu = state.lang === 'ru';
    document.getElementById('ui-title').innerText = isRu ? "Билимдон Арена" : "Bilimdon Arena";
    document.getElementById('ui-subtitle').innerText = isRu 
        ? "По 30 уникальных вопросов в каждом предмете, профессиональный бот и 30 секунд на ответ!" 
        : "Har bir fanda 30 ta takrorlanmas savol, professional bot va 30 soniya vaqt!";
    document.getElementById('lbl-lang').innerText = isRu ? "Выберите язык / Tilni tanlang:" : "Tilni tanlang / Выберите язык:";
    document.getElementById('lbl-name').innerText = isRu ? "Ваше имя / Ismingizni kiriting:" : "Ismingizni kiriting / Ваше имя:";
    document.getElementById('lbl-grade').innerText = isRu ? "Введите класс (1–11):" : "Sinfni kiriting (1–11):";
    document.getElementById('grade-input').placeholder = isRu ? "От 1 до 11" : "1 dan 11 gacha";
    document.getElementById('lbl-cat').innerText = isRu ? "Выберите предмет / Fanlarni tanlang:" : "Fanlarni tanlang / Выберите предмет:";
    document.getElementById('find-match-btn').innerText = isRu ? "⚔️ Найти соперника и начать" : "⚔️ Raqib Qidirish va Boshlash";
    document.getElementById('ui-searching').innerText = isRu ? "Поиск соперника..." : "Raqib qidirilmoqda...";
    document.getElementById('play-again-btn').innerText = isRu ? "🔄 Играть снова (Новые вопросы)" : "🔄 Boshqattan Boshlash (Yangi Savollar)";

    updateCategoryDropdownTexts();
}

function getFormattedCategoryLabel(catKey) {
    const mapUZ = {
        math: "📐 Matematika",
        uzbek: "📖 Ona tili & Adabiyot",
        history: "🏛️ Tarix",
        geography: "🌍 Geografiya",
        biology: "🧬 Biologiya",
        physics: "⚛️ Fizika",
        chemistry: "🧪 Kimyo",
        english: "🇬🇧 Ingliz tili",
        informatics: "💻 Informatika"
    };
    const mapRU = {
        math: "📐 Математика",
        uzbek: "📖 Родной язык и лит.",
        history: "🏛️ История",
        geography: "🌍 География",
        biology: "🧬 Биология",
        physics: "⚛️ Физика",
        chemistry: "🧪 Химия",
        english: "🇬🇧 Английский язык",
        informatics: "💻 Информатика"
    };
    const activeMap = state.lang === 'ru' ? mapRU : mapUZ;
    const gradeSuffix = state.lang === 'ru' ? `${state.selectedGrade}-класс` : `${state.selectedGrade}-sinf`;
    return `${activeMap[catKey] || "Fan"} (${gradeSuffix})`;
}

/* ==========================================================================
   5. TAKRORLANMAS 30 TA SAVOLNI TANLASH
   ========================================================================== */

function buildQuestionPool(selectedCat, targetGrade) {
    const activeDB = state.lang === 'ru' ? DB_RU : DB_UZ;
    let pool = [];

    if (selectedCat === 'all') {
        Object.keys(activeDB).forEach(catKey => {
            activeDB[catKey].forEach(qObj => {
                if (!qObj.minGrade || qObj.minGrade <= targetGrade + 1) {
                    pool.push({ ...qObj, category: catKey });
                }
            });
        });
        if (pool.length < 30) {
            pool = [];
            Object.keys(activeDB).forEach(catKey => {
                activeDB[catKey].forEach(qObj => pool.push({ ...qObj, category: catKey }));
            });
        }
    } else if (activeDB[selectedCat]) {
        // Har bir fanda 30 tadan savol bo'lganligi uchun barcha 30 ta savol bazasini qo'shamiz
        pool = activeDB[selectedCat].map(qObj => ({ ...qObj, category: selectedCat }));
    }

    if (pool.length === 0) {
        Object.keys(activeDB).forEach(catKey => {
            activeDB[catKey].forEach(qObj => pool.push({ ...qObj, category: catKey }));
        });
    }

    return pool;
}

function shuffleQuestionOptions(qObj) {
    const correctText = qObj.options[qObj.answer];
    const shuffledOptions = shuffleArray(qObj.options);
    const newAnswerIndex = shuffledOptions.indexOf(correctText);
    return {
        ...qObj,
        options: shuffledOptions,
        answer: newAnswerIndex
    };
}

function getUniqueNonRepeatingQuestions(selectedCat, targetGrade, maxCount = 30) {
    const fullPool = buildQuestionPool(selectedCat, targetGrade);
    let usedSet = getUsedQuestionsSet();

    let unusedQuestions = fullPool.filter(q => !usedSet.has(q.q));

    if (unusedQuestions.length < maxCount) {
        usedSet = resetUsedQuestionsHistory(fullPool);
        unusedQuestions = [...fullPool];
    }

    const chosen = shuffleArray(unusedQuestions).slice(0, maxCount);

    chosen.forEach(item => usedSet.add(item.q));
    saveUsedQuestionsSet(usedSet);

    return chosen.map(shuffleQuestionOptions);
}

/* ==========================================================================
   6. PROFESSIONAL BOT VA O'YIN JARAYONI
   ========================================================================== */

function selectRandomOpponent() {
    const candidates = OPPONENTS_POOL.filter(o => o.name !== state.lastOpponentName);
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    state.lastOpponentName = chosen.name;
    return chosen;
}

function initializeMatchSession() {
    const nameInput = document.getElementById('player-name').value.trim();
    state.playerName = nameInput || (state.lang === 'ru' ? "Знаток" : "Bilimdon");
    state.selectedGrade = getValidatedGradeInput();
    state.selectedCategory = document.getElementById('category-select').value;

    const opponent = selectRandomOpponent();
    state.oppName = opponent.name;
    state.oppAvatar = opponent.avatar;

    state.questions = getUniqueNonRepeatingQuestions(state.selectedCategory, state.selectedGrade, 30);

    const statusMsg = state.lang === 'ru'
        ? `Соперник: ${state.oppName}! Подготовлено 30 уникальных вопросов...`
        : `Raqib: ${state.oppName}! 30 ta yangi savol tayyorlandi...`;

    document.getElementById('matchmaking-status').innerText = statusMsg;
    switchScreen('matchmaking');

    setTimeout(launchBattleArena, 1500);
}

function launchBattleArena() {
    state.currentIdx = 0;
    state.myScore = 0;
    state.oppScore = 0;
    state.myCorrectCount = 0;
    state.oppCorrectCount = 0;

    document.getElementById('my-display-name').innerText = state.playerName;
    document.getElementById('opp-display-name').innerText = state.oppName;
    document.getElementById('opp-avatar').innerText = state.oppAvatar;
    document.getElementById('my-score').innerText = "0";
    document.getElementById('opp-score').innerText = "0";

    switchScreen('game');
    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    state.answered = false;
    state.timeLeft = QUESTION_TIME_LIMIT;
    clearAllTimers();

    const total = state.questions.length;
    const qObj = state.questions[state.currentIdx];

    document.getElementById('round-indicator').innerText = `${state.currentIdx + 1} / ${total}`;
    document.getElementById('progress-fill').style.width = `${((state.currentIdx + 1) / total) * 100}%`;
    document.getElementById('q-category').innerText = getFormattedCategoryLabel(qObj.category);
    document.getElementById('question-text').innerText = qObj.q;
    document.getElementById('feedback-banner').classList.add('hidden');

    renderOptionButtons(qObj.options);
    startQuestionCountdown();
    scheduleProfessionalBotBehavior();
}

function renderOptionButtons(options) {
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = optText;
        btn.onclick = () => evaluatePlayerChoice(idx, btn);
        grid.appendChild(btn);
    });
}

function startQuestionCountdown() {
    const timerEl = document.getElementById('timer');
    timerEl.innerText = state.timeLeft;
    timerEl.classList.remove('warning');

    state.timerId = setInterval(() => {
        state.timeLeft--;
        timerEl.innerText = state.timeLeft;
        if (state.timeLeft <= 10) {
            timerEl.classList.add('warning');
        }

        if (state.timeLeft <= 0) {
            clearInterval(state.timerId);
            handleQuestionTimeout();
        }
    }, 1000);
}

function scheduleProfessionalBotBehavior() {
    const botDelay = (Math.floor(Math.random() * 8) + 4) * 1000;
    
    let isBotCorrect = false;
    if (state.currentIdx < 5) {
        isBotCorrect = true;
    } else {
        isBotCorrect = Math.random() < 0.82;
    }

    state.botTimeoutId = setTimeout(() => {
        if (screens.game.classList.contains('active') && isBotCorrect) {
            const botBonus = Math.floor(Math.random() * 25) + 10;
            state.oppScore += (100 + botBonus);
            state.oppCorrectCount++;
            document.getElementById('opp-score').innerText = state.oppScore;
        }
    }, botDelay);
}

function evaluatePlayerChoice(selectedIdx, clickedBtn) {
    if (state.answered) return;
    state.answered = true;
    clearInterval(state.timerId);

    const qObj = state.questions[state.currentIdx];
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    const banner = document.getElementById('feedback-banner');
    banner.classList.remove('hidden');

    if (selectedIdx === qObj.answer) {
        clickedBtn.classList.add('correct');
        const speedBonus = state.timeLeft * 2;
        const earnedPoints = 100 + speedBonus;
        state.myScore += earnedPoints;
        state.myCorrectCount++;
        document.getElementById('my-score').innerText = state.myScore;

        banner.innerText = state.lang === 'ru'
            ? `✅ Верно! +${earnedPoints} очков (Бонус скорости: +${speedBonus})`
            : `✅ To'g'ri! +${earnedPoints} ball (Tezkorlik bonusi: +${speedBonus})`;
        banner.style.color = "#34d399";
    } else {
        clickedBtn.classList.add('wrong');
        allBtns[qObj.answer].classList.add('correct');

        banner.innerText = state.lang === 'ru'
            ? `❌ Неверно! Правильный ответ выделен зеленым.`
            : `❌ Noto'g'ri! To'g'ri javob yashil rangda ko'rsatildi.`;
        banner.style.color = "#f87171";
    }

    setTimeout(advanceToNextQuestion, 1600);
}

function handleQuestionTimeout() {
    if (state.answered) return;
    state.answered = true;

    const qObj = state.questions[state.currentIdx];
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    allBtns[qObj.answer].classList.add('correct');

    const banner = document.getElementById('feedback-banner');
    banner.classList.remove('hidden');
    banner.innerText = state.lang === 'ru' ? "⏰ Время вышло!" : "⏰ Vaqt tugadi!";
    banner.style.color = "#fbbf24";

    setTimeout(advanceToNextQuestion, 1600);
}

function advanceToNextQuestion() {
    state.currentIdx++;
    if (state.currentIdx < state.questions.length) {
        renderCurrentQuestion();
    } else {
        displayFinalMatchResults();
    }
}

function displayFinalMatchResults() {
    clearAllTimers();
    switchScreen('result');

    const totalQ = state.questions.length;
    document.getElementById('final-my-name').innerText = state.playerName;
    document.getElementById('final-opp-name').innerText = state.oppName;
    document.getElementById('final-my-score').innerText = state.myScore;
    document.getElementById('final-opp-score').innerText = state.oppScore;

    const correctLabel = state.lang === 'ru' ? `верно из ${totalQ}` : `${totalQ} tadan to'g'ri`;
    document.getElementById('final-my-correct').innerText = `${state.myCorrectCount} / ${totalQ} ${correctLabel}`;
    document.getElementById('final-opp-correct').innerText = `${state.oppCorrectCount} / ${totalQ} ${correctLabel}`;

    updateOutcomeVerdict();
}

function updateOutcomeVerdict() {
    const title = document.getElementById('result-title');
    const sub = document.getElementById('result-subtitle');
    const trophy = document.getElementById('result-trophy');
    const ratingEl = document.getElementById('rating-change');
    const isRu = state.lang === 'ru';

    if (state.myScore > state.oppScore) {
        trophy.innerText = "🏆";
        title.innerText = isRu ? "Победа!" : "G'alaba!";
        sub.innerText = isRu
            ? `Вы победили в грандиозной битве из 30 вопросов!`
            : `30 ta savollik bellashuvda g'alaba qozonganingiz bilan!`;
        ratingEl.innerText = isRu ? "+50 очков рейтинга" : "+50 Reyting ochkosi";
        ratingEl.style.color = "#10b981";
    } else if (state.myScore < state.oppScore) {
        trophy.innerText = "🥈";
        title.innerText = isRu ? "Поражение" : "Mag'lubiyat";
        sub.innerText = isRu
            ? "Соперник сыграл профессионально. Попробуйте снова!"
            : "Professional raqibni yengish uchun yana bir bor urinib ko'ring!";
        ratingEl.innerText = isRu ? "-15 очков рейтинга" : "-15 Reyting ochkosi";
        ratingEl.style.color = "#f87171";
    } else {
        trophy.innerText = "🤝";
        title.innerText = isRu ? "Ничья!" : "Durang!";
        sub.innerText = isRu ? "Равный уровень знаний с ботом!" : "Professional bot bilan teng natija!";
        ratingEl.innerText = isRu ? "+20 очков рейтинга" : "+20 Reyting ochkosi";
        ratingEl.style.color = "#38bdf8";
    }
}

/* ==========================================================================
   7. HODISALARNI UZLASH (EVENT LISTENERS)
   ========================================================================== */
function registerEventListeners() {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            state.lang = e.target.value;
            applyLanguageToUI();
        });
    }

    const gradeInput = document.getElementById('grade-input');
    if (gradeInput) {
        gradeInput.addEventListener('input', enforceGradeInputBounds);
        gradeInput.addEventListener('blur', getValidatedGradeInput);
    }

    const findMatchBtn = document.getElementById('find-match-btn');
    if (findMatchBtn) {
        findMatchBtn.addEventListener('click', initializeMatchSession);
    }

    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => switchScreen('start'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    registerEventListeners();
});