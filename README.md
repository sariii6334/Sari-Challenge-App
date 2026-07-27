# 🎮 Sari Challenge - Mini Games

**Sari Challenge** is a fast, responsive, 100% offline-compatible mini-games platform. Built with React 19, TypeScript, and Tailwind CSS v4, it features **15 competitive mini-games** optimized for mobile devices, touch screens, and desktop play.

---

## 🌟 Features & Mini-Games

### 🎮 The 15 Mini-Games
1. ⏱️ **Perfect Hold** (*الإحساس الزمني*) — Precision millisecond estimation and time perception.
2. 🎲 **21 Game** (*عد تكتيكي*) — Turn-based mathematical counting strategy against AI or friends.
3. 📏 **Perfect Line** (*دقة الخط*) — Spatial estimation and visual line drawing precision.
4. ⭕ **Perfect Circle** (*دائرة مثالية*) — Roundness and geometric circle accuracy evaluation.
5. 🧠 **Memory Order** (*ذاكرة بصرية*) — Sequential pattern memory retention test.
6. 🎨 **Color Trap** (*فخ الألوان*) — Stroop-effect cognitive reflex challenge.
7. 🔐 **Code Break** (*كسر الرمز*) — Deductive numerical code breaker with hint feedback.
8. ✍️ **Copy Move** (*رسم الأسهم*) — Fast gesture arrow drawing sequence test.
9. 🧩 **Missing Piece** (*القطعة المفقودة*) — Visual memory recall for missing objects.
10. ❌ **Wrong Answer** (*الإجابة الخاطئة*) — Reverse-logic rapid trivia quiz.
11. 🔢 **Number Rush** (*اندفاع الأرقام*) — Speed tapping Schulte grid challenge.
12. ⚔️ **Tic Tac Toe** (*لعبة إكس أوه*) — Dual-difficulty strategic board game.
13. 🗣️ **Same Word** (*كلمة واحدة*) — Co-op word association mind-syncing game.
14. 🔴🟡 **Connect Four** (*أربعة في صف*) — Classic grid drop game with intelligent AI.
15. 🐝 **Bee Hive Defense** (*دفاع خلية النحل*) — Real-time arcade canvas tap defense.

### 🌍 Multilingual Localization (8 Languages)
- Native support for **Arabic** (العربية), **English**, **Turkish** (Türkçe), **German** (Deutsch), **French** (Français), **Korean** (한국어), **Dutch** (Nederlands), and **Spanish** (Español).
- Full **RTL (Right-to-Left)** layout adaptation for Arabic and **LTR** for all other languages.

### 🔊 Offline Web Audio Synthesizer & Vibration
- Zero sound asset loading latency using Web Audio API synthesis.
- Custom sound effects for clicks, ticks, success, errors, win/lose chimes, and background music loops.
- Native mobile haptic vibration feedback integration.

### 📱 Mobile-First & APK Wrapper Ready
- Designed for touch devices with 44px+ touch targets and fluid layout containers.
- Zero server-side API dependencies — 100% runnable offline in web browsers, WebView wrappers, or PWAs.

---

## 🛠️ Project Structure

```
src/
├── assets/images/     # Game thumbnails and custom artwork
├── components/        # React UI components & modals
│   ├── games/         # 15 individual game implementations
│   ├── Navbar.tsx
│   ├── MainMenu.tsx
│   ├── SettingsModal.tsx
│   ├── GameResultModal.tsx
│   └── ...
├── data/              # Games registry and metadata
├── i18n/              # Translations for 8 languages
├── utils/             # Sound synthesizer, storage, and thumbnail helpers
├── types.ts           # App-wide TypeScript definitions
├── App.tsx            # Main app router & session management
└── main.tsx           # Entry point
```

---

## 🚀 Development & Build

### Prerequisites
- Node.js 18+
- npm

### Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Lint & Typecheck
npm run lint

# Build for production
npm run build
```

---

## 📱 License & Credits
Created with ❤️ by **Sari**.
