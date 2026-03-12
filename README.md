<div align="center">

# 📖 AL-Quran AL-Kareem
### تطبيق القرآن الكريم الشامل
**A full-featured Islamic web application — React + Vite + PWA**

[![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.2-646cff?logo=vite)](https://vitejs.dev)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5BB974)](https://web.dev/progressive-web-apps/)
[![Version](https://img.shields.io/badge/Version-10.5-gold)](.)
[![Arabic](https://img.shields.io/badge/Language-Arabic%20RTL-green)](.)

**Developed by [Mostafa Helal](https://github.com/MostafaHelal-CS)**

[Facebook](https://www.facebook.com/mostafa.helal.5817300) · [WhatsApp](https://wa.me/+201097500559) · [LinkedIn](https://www.linkedin.com/in/mostafa-helal-b5a8631b8) · [GitHub](https://github.com/MostafaHelal-CS) · [Email](mailto:mostafahelal435@gmail.com)

</div>

---

## ✨ Features (v10.5)

### 📖 Quran Reading
| Feature | Description |
|---|---|
| **أجزاء** | 30 Juz with unified nav+toolbar, tajweed coloring, page background |
| **سور** | 114 surahs — lazy loading (loads per surah on demand, ~15KB initial) |
| **صفحات** | 604 pages with surah separators |
| **تجويد** | Color-coded tajweed rules |
| **وضع التركيز** | Distraction-free reading with auto-bookmarking |
| **الحفظ** | Memorization mode with word reveal |
| **ترجمة** | English translation toggle |

### 🎙️ Audio & Live
| Feature | Description |
|---|---|
| **الاستماع** | Surah audio player with 10+ reciters |
| **القراء** | Reciters page via mp3quran.net API |
| **الإذاعة** | Radio streaming with favorites |
| **بث مباشر v2** | Full Quran player — 8 reciters × 114 surahs from cdn.islamic.network |

### 🕌 Islamic Tools
| Feature | Description |
|---|---|
| **مواقيت الصلاة** | Prayer times with location detection |
| **القبلة** | Compass-based Qibla direction |
| **الأذان** | Auto Adhan with notification |
| **التقويم الإسلامي** | Hijri calendar |
| **رمضان** | Ramadan schedule with countdown |

### 📚 Knowledge
| Feature | Description |
|---|---|
| **التفسير v2** | Tafsir popup per ayah with word-by-word |
| **تفسير الطبري** | Audio tafsir — searchable grid of 114 surahs |
| **مقارنة تفاسير** | Side-by-side tafsir comparison |
| **الحديث** | Hadith browser + search (Bukhari, Muslim) |
| **أذكار** | Azkar with counter |
| **أدعية** | Duas collection |
| **أسماء الله** | 99 Names of Allah |
| **المتشابهات** | Similar verses finder |

### 🎯 Productivity
| Feature | Description |
|---|---|
| **متابعة القراءة v2** | Redesigned — ring progress, undo, goal stepper, streak |
| **أهداف القراءة** | Reading goals with analytics |
| **إحصائيات** | Detailed analytics dashboard |
| **ختم القرآن** | Khatm tracker |
| **عداد الآيات** | Daily verse counter with SVG ring |
| **التسبيح** | Digital tasbih with SVG ring, laps, vibration |

### 🎨 Personalization
| Feature | Description |
|---|---|
| **8 ثيمات** | Blue, Green, Teal, Purple, Gold, Rose, Slate + Custom |
| **الوضع الليلي** | Dark/Night mode |
| **ثيم مخصص** | Custom accent color creator with live preview |
| **theme-color ديناميكي** | Status bar matches selected theme |
| **خط القرآن** | Amiri / Scheherazade / Uthmanic font choice |
| **حجم الخط** | Per-reader font size control |

### 🛠️ UX & Design
| Feature | Description |
|---|---|
| **شريط موحد v4** | Single ReadingToolbar: Back + Prev/Next + Label + FontSize + expandable controls |
| **سحب للتنقل** | Swipe left/right between surahs/juz |
| **PWA** | Installable, offline-capable |
| **favicon جديد** | Arabic القرآن الكريم SVG favicon |
| **حفظ بدون نت** | Offline cache — shows actual app data size |

---

## 🚀 Getting Started

```bash
git clone https://github.com/MostafaHelal-CS/quran-app
cd quran-app
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

---

## 📡 APIs Used

| API | Purpose |
|---|---|
| `api.alquran.cloud` | Quran text, ayahs, pages, juz |
| `cdn.islamic.network` | Audio MP3 per surah per reciter |
| `mp3quran.net` | Reciters list, tafsir audio |
| `aladhan.com` | Prayer times, Hijri calendar |
| `fawazahmed0/hadith-api` | Hadith collections |

---

## 📋 Changelog

### v10.5 (Latest)
- 🔧 **Hooks fix**: All React hooks properly ordered before early returns in `Surahs`
- 🎙️ **Live v2**: Full surah player using `cdn.islamic.network` — no streaming auth issues
- 🎨 **Tafasir UX v2**: Searchable grid of cards replacing sidebar list; "Now Playing" hero
- 📖 **ReadingTracker v2**: SVG ring progress, undo button, goal stepper (+/−), unified layout
- 💾 **Storage fix**: OfflineCache now shows actual app localStorage size (not total browser)
- 🌐 **theme-color dynamic**: Status bar color updates when theme changes
- ✨ **Favicon v2**: New "القرآن الكريم" Arabic SVG favicon with decorative ornaments

### v10.4
- ⚡ Surahs lazy loading — loads surah list (15KB) then ayahs per-surah on demand
- 🎛️ ReadingToolbar v4 — single unified bar with nav + label + expandable controls
- 📡 Live streaming fixed — replaced broken streaming URLs

### v10.3
- Surahs page redesigned (hooks fix, on-demand loading)
- Live streams fixed to qurango.net
- Navbar merged into ReadingToolbar

### v10.2
- ReadingToolbar v3 floating pill
- VerseCounter daily tracker
- WordByWord panel

### v10.1
- Full Page Reader no-scroll mode
- Reciters API with fallbacks
- Live page enhanced

### v10.0
- Home tab redesign
- Reciters v3 (mp3quran.net)
- 36 tabs total

---

<div align="center">
Made with ❤️ for the Muslim Ummah
</div>
