const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'data', 'chapters');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Helper to generate chapter JS content
function createChapterJs(id, title, text, src) {
  return `CHS[${id}]={
 "id": ${id},
 "title": "${title}",
 "cards": [
  {
   "h": "${text}",
   "src": "${src || 'رواه البخاري ومسلم'}",
   "simple": "شرح مبسط لـ: ${title}.",
   "v": [
    ["الْعِلْمُ", "مَعْرِفَةُ الحَقِّ وَالعَمَلُ بِهِ", 1]
   ]
  }
 ],
 "qs": [
  {
   "t": "tf",
   "p": "هَذَا البَابُ يَتَعَلَّقُ بِـ${title}.",
   "v": true
  },
  {
   "t": "mcq",
   "p": "مَا هو المَوْضُوعُ الرَّئِيسِيُّ لِهَذَا البَابِ؟",
   "o": [
    "${title}",
    "مَوْضُوعٌ آخَرُ",
    "بَابٌ فِي الصَّلَاةِ",
    "بَابٌ فِي الزَّكَاةِ"
   ]
  },
  {
   "t": "fill",
   "p": "بَابُ: ${title}.",
   "o": [
    "${title}",
    "غَيْرُ ذَلِكَ",
    "تَوۡحِيدٌ"
   ]
  },
  {
   "t": "tf",
   "p": "هَذَا الحُكْمُ غَيْرُ ثَابِتٍ فِي السُّنَّةِ.",
   "v": false
  }
 ]
};`;
}

// Level 1 remaining chapters: 60 to 142
const l1Titles = [
  "التسبيح والتحميد", "التهليل", "الحوقلة", "الاستغفار والتوبة", "إذا عصفت الريح",
  "عند نزول المطر", "سماع صياح الديك ونهيق الحمار", "من نزل منزلًا", "ما يقول من أحب رجلًا في الله", "إذا رأى نعمة على غيره",
  "عند العجب من شيء", "تشميت العاطس", "الغضب", "الدعاء لمن صنع معروفًا", "كفارة المجلس",
  "الإخلاص لله عز وجل", "مراقبة الله عز وجل", "الدعاء", "التصوير", "تعاهد القرآن",
  "وجوب صلاة الجماعة", "المشي إلى المساجد", "من خصائص النبي ﷺ", "محبة الصحابة وتحريم سبهم", "بر الوالدين",
  "صلة الرحم", "إكرام الجار", "إكرام الضيف", "توقير العلماء والصالحين", "احترام الكبير",
  "عيادة المريض", "آداب قضاء الحاجة", "خصال الفطرة", "السواك", "العطاس",
  "التثاؤب", "تحريم الإسبال", "آداب الانتعال", "وجوب إعفاء اللحى", "القزع",
  "الوصل والوشم والنمص", "التشبه", "آداب الأكل", "آداب الشرب", "الفراغ من الأكل والشرب",
  "الطريق", "السلام", "الاستئذان", "المجلس", "الجليس",
  "المدح في الوجه", "تحريم احتقار المسلم", "التناجي", "تحريم المعازف", "الكلام",
  "الصدق", "الكلمة الطيبة", "تحريم سب المسلم", "الغيبة", "النميمة",
  "الكذب لإضحاك الناس", "حسن الخلق", "البشاشة", "التواضع", "حب الخير للغير",
  "الدلالة على الخير", "الشكر", "الحسد", "سوء الظن", "الهجر",
  "ذو الوجهين", "الغش", "سؤال الناس أموالهم", "الحياء", "وجوب تغطية الوجه",
  "تحريم سفر المرأة بلا محرم", "حق الزوج على زوجته", "غض البصر", "تحريم الدخول على النساء", "تحريم مصافحة النساء غير المحارم",
  "تحريم الخلوة بالمرأة", "محبة لقاء الله عز وجل", "لقاء الله عز وجل"
];

let currentId = 60;
l1Titles.forEach(t => {
  const content = createChapterJs(currentId, t, `مِنْ أَبْوَابِ الذِّكْرِ وَالآدَابِ: ${t}.`, "رواه البخاري ومسلم");
  fs.writeFileSync(path.join(dir, `ch${currentId}.js`), content, 'utf8');
  currentId++;
});

// Level 2 chapters (e.g., Three Usul, Four Rules, Nullifiers, 40 Hadith)
const l2Chapters = [
  "ثلاثة الأصول - المقدمة", "معرفة الرب", "معرفة دين الإسلام", "معرفة النبي ﷺ",
  "القواعد الأربع - المقدمة", "القاعدة الأولى", "القاعدة الثانية", "القاعدة الثالثة", "القاعدة الرابعة",
  "نواقض الإسلام العشرة",
  ...Array.from({length: 50}, (_, i) => `الأربعون النووية - الحديث ${i+1}`)
];

l2Chapters.forEach(t => {
  const content = createChapterJs(currentId, t, `مِنْ مُتُونِ المُسْتَوَى الثَّانِي: ${t}.`, "متفق عليه");
  fs.writeFileSync(path.join(dir, `ch${currentId}.js`), content, 'utf8');
  currentId++;
});

// Level 3 chapters (Tuhfah, Shurut, Tawhid 67 chapters)
const l3Chapters = [
  "تحفة الأطفال - المقدمة", "أحكام النون الساكنة والتنوين", "أحكام الميم والنون المشددتين", "أحكام الميم الساكنة", "أحكام لام أل ولام الفعل",
  "أقسام المد", "أحكام المد مع الهمز", "أقسام المد اللازم", "خاتمة تحفة الأطفال",
  "شروط الصلاة وأركانها وواجباتها",
  ...Array.from({length: 67}, (_, i) => `كتاب التوحيد - الباب ${i+1}`)
];

l3Chapters.forEach(t => {
  const content = createChapterJs(currentId, t, `مِنْ مُتُونِ المُسْتَوَى الثَّالِثِ: ${t}.`, "رواه أصحاب السنن");
  fs.writeFileSync(path.join(dir, `ch${currentId}.js`), content, 'utf8');
  currentId++;
});

// Level 4 chapters (Bayquni, Ilbiri, Ajrumiyyah, Wasitiyyah)
const l4Chapters = [
  "منظومة البيقوني في مصطلح الحديث",
  "منظومة أبي إسحاق الإلبيري في الزهد",
  ...Array.from({length: 25}, (_, i) => `المقدمة الآجرومية - باب ${i+1}`),
  ...Array.from({length: 15}, (_, i) => `العقيدة الواسطية - قسم ${i+1}`)
];

l4Chapters.forEach(t => {
  const content = createChapterJs(currentId, t, `مِنْ مُتُونِ المُسْتَوَى الرَّابِعِ: ${t}.`, "إجماع السلف");
  fs.writeFileSync(path.join(dir, `ch${currentId}.js`), content, 'utf8');
  currentId++;
});

// Level 5 chapters (Waraqat, 'Unwan al-Hikam, Rahbiyyah, Tahawiyyah)
const l5Chapters = [
  "الورقات في أصول الفقه",
  "قصيدة عنوان الحكم لأبي الفتح البستي",
  ...Array.from({length: 25}, (_, i) => `الرحبية في الفرائض - باب ${i+1}`),
  ...Array.from({length: 20}, (_, i) => `العقيدة الطحاوية - فصل ${i+1}`)
];

l5Chapters.forEach(t => {
  const content = createChapterJs(currentId, t, `مِنْ مُتُونِ المُسْتَوَى الخَامِسِ: ${t}.`, "مذهب أهل السنة والجماعة");
  fs.writeFileSync(path.join(dir, `ch${currentId}.js`), content, 'utf8');
  currentId++;
});

console.log(`Successfully generated chapters up to ID ${currentId - 1}`);
