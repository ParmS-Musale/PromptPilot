# ✈️ PromptPilot — AI Prompt Enhancement Platform

**PromptPilot** is a premium, full-stack AI prompt engineering platform that transforms casual, unstructured inputs into high-quality, structured, model-specific prompts — maximizing the quality of every LLM interaction.

It ships as a **Web Application** and a **Chrome Extension**, so you can enhance prompts from your workspace or directly inside ChatGPT, Claude, and Gemini.

---

## 🌟 Features at a Glance

| Feature | Description |
|---|---|
| 🎛️ **Multi-Mode Optimizer** | General, Developer, Creative, and Technical optimization modes |
| 🤖 **Model-Specific Tuning** | Output tailored for ChatGPT, Claude, Gemini, Cursor, Lovable, or Bolt |
| 📊 **Real-Time Quality Scoring** | SVG gauge dashboard scoring Clarity, Detail, AI Compatibility, and Structure |
| 📚 **Template Library** | 50+ curated, searchable prompt templates across multiple domains |
| 📜 **Prompt History** | Full history with bookmarks, timestamps, and mode/model metadata |
| 🔒 **Auth & Cloud Sync** | Email/Password, Google, and GitHub login via Supabase |
| 💳 **Razorpay Payments** | INR checkout flow with Pro and Enterprise tiers |
| 🔌 **Chrome Extension** | One-click prompt enhancement inside ChatGPT, Claude, and Gemini |
| ✈️ **Animated Plane Loader** | Custom flying-plane loading animation throughout the platform |
| 🌗 **Dark / Light Themes** | Full theme system with glassmorphic design tokens |

---

## 🖥️ Web Application

### Interactive Prompt Optimizer
* **Four Optimization Modes** — General (balanced), Developer (code & architecture), Creative (vivid storytelling), and Technical (systems & logic).
* **Target AI Model Selection** — Optimizes output style and constraints specifically for your chosen model.
* **Typing Simulation** — Character-by-character animated text reveal mimics real-time AI generation.
* **One-Click Actions** — Copy to clipboard, save as bookmark, or view in history.
* **Flying Plane Loading Animation** — A custom CSS animated plane with gold exhaust trail and pulsing status dots during generation.

### Dynamic Prompt Quality Analysis
* **Real-Time SVG Gauges** evaluate prompts across four criteria:
  * **Clarity** — Checks prompt length and descriptiveness.
  * **Detail** — Measures content richness and domain-specific keyword density.
  * **AI Compatibility** — Detects prompt engineering patterns (persona assignment, constraints, output formatting).
  * **Structure** — Analyzes markdown formatting, bullet points, and hierarchical organization.
* All scoring runs instantaneously on the client side with a custom heuristic engine.

### Curated Template Library
* Search-and-filter-ready library of pre-engineered prompts across development, creative writing, productivity, and more.
* Interactive preview modals to copy or apply templates directly into the optimizer workspace.

### Prompt History & Bookmarks
* Full chronological history of all enhanced prompts with original → enhanced diffs.
* Bookmark important prompts for quick access.
* Works in Guest Mode (localStorage, capped at 50) and Authenticated Mode (Supabase cloud sync).

### Authentication & Social Logins
* **Email/Password** registration and login with validation.
* **Google OAuth** and **GitHub OAuth** social login buttons.
* Seamless session management powered by Supabase Auth.

### Razorpay Payment Integration
* **INR-native checkout** with Monthly and Yearly billing toggles.
* Test Mode enabled for safe development and demo flows.
* Premium success modal with confetti animation and transaction details.
* Pro / Enterprise tier badges displayed in the navbar profile dropdown.

---

## 🔌 Chrome Extension (Manifest V3)

The PromptPilot Chrome Extension injects a gold **Enhance** button directly into the chat input bars of **ChatGPT**, **Claude**, and **Gemini** — letting you optimize prompts without leaving your conversation.

### Extension Features
* **One-Click Enhancement** — Type a raw prompt, click the gold plane button, and watch it get replaced with a structured, optimized version.
* **Animated Plane Loading** — A custom looping takeoff animation plays while the prompt is being enhanced (the plane flies out and loops back).
* **Site-Specific Positioning** — Button auto-positions to avoid overlapping native send, mic, and attachment icons on each platform.
* **Glassmorphic Popup Dashboard** — Click the toolbar icon to configure:
  * Optimization Mode (General / Developer / Creative / Technical)
  * Target AI Model (ChatGPT / Claude / Gemini / Cursor / Lovable / Bolt)
  * Custom Gemini API Key (or use the pre-loaded default)
* **Pre-Loaded API Key** — Works out of the box with zero configuration required.
* **Clean Output** — All markdown formatting symbols (`#`, `*`) are stripped from the enhanced result before insertion.
* **Framework-Safe Insertion** — Uses `document.execCommand('insertText')` with native event dispatching to ensure React/Vue/Angular state updates correctly.

### Installing the Extension
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select the `extension/` folder from this project.
4. Pin **PromptPilot** to your Chrome toolbar.
5. Open [ChatGPT](https://chatgpt.com), [Claude](https://claude.ai), or [Gemini](https://gemini.google.com) and start enhancing!

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Front-End** | Vanilla HTML5, CSS3, JavaScript ES6+ |
| **Build System** | Vite 6 |
| **AI Engine** | Google Gemini 2.5 Flash API |
| **Database & Auth** | Supabase (PostgreSQL + Auth + Row Level Security) |
| **Payments** | Razorpay Checkout SDK (INR) |
| **Chrome Extension** | Manifest V3, Service Workers, Content Scripts |
| **Typography** | Hanken Grotesk, Noto Serif, Material Symbols Outlined |
| **Design System** | Custom CSS design tokens, glassmorphism, dark/light themes |

---

## 📂 Project Architecture

```
PromptPilot/
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite dev/build configuration
├── .env                             # Environment variables (API keys)
│
├── src/                             # ─── Web Application ───
│   ├── main.js                      # SPA router & theme controller
│   ├── components/
│   │   ├── navbar.js                # Header, theme toggle, auth & tier badges
│   │   ├── footer.js                # Footer metadata
│   │   └── auth-modal.js            # Email/Password + Google/GitHub OAuth modal
│   ├── lib/
│   │   └── supabase.js              # Supabase client initialization
│   ├── pages/
│   │   ├── landing.js               # Hero landing page
│   │   ├── enhance.js               # Prompt optimizer UI & flying plane loader
│   │   ├── enhance-logic.js         # Gemini API calls, heuristic scoring engine
│   │   ├── templates.js             # Template library with search & filters
│   │   ├── history.js               # Prompt history & bookmarks
│   │   ├── pricing.js               # Pricing plans & Razorpay checkout
│   │   ├── about.js                 # Platform information
│   │   └── docs.js                  # Technical documentation & guides
│   └── styles/
│       ├── design-tokens.css        # Color palettes, CSS variables, spacing
│       ├── global.css               # Global resets & base typography
│       └── components.css           # Buttons, cards, modals, SVG gauges
│
├── extension/                       # ─── Chrome Extension (Manifest V3) ───
│   ├── manifest.json                # Extension permissions & configuration
│   ├── background.js                # Service worker: API calls & storage defaults
│   ├── content.js                   # DOM injection: button placement & text replacement
│   ├── content.css                  # Injected button styles & plane animations
│   ├── icons/                       # Extension icons (16, 32, 48, 128px)
│   └── popup/
│       ├── popup.html               # Settings popup layout
│       ├── popup.js                 # Popup state management & event handlers
│       └── popup.css                # Glassmorphic dark-theme popup styles
│
└── dist/                            # Production build output (via `npm run build`)
```

---

## 🚀 Installation & Local Development

### Prerequisites
* [Node.js](https://nodejs.org) v18+ installed
* A [Gemini API Key](https://aistudio.google.com/apikey) (free tier available)
* A [Supabase Project](https://supabase.com) (free tier available)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/PromptPilot.git
cd PromptPilot
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3. Run the Dev Server
```bash
npm run dev
```
Open the displayed URL (typically `http://localhost:5173`) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔐 Authentication Setup

### Email/Password
Works out of the box with Supabase. For instant sign-ups without email confirmation:
1. Go to **Supabase Dashboard** → **Authentication** → **Providers** → **Email**.
2. Toggle **Confirm email** to **OFF**.

### Google OAuth
1. Create OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Add your Supabase callback URL as an Authorized Redirect URI:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
3. In **Supabase Dashboard** → **Authentication** → **Providers** → **Google**, enter your Client ID and Client Secret.

### GitHub OAuth
1. Create an OAuth App in [GitHub Developer Settings](https://github.com/settings/developers).
2. Set the Authorization callback URL to your Supabase callback URL.
3. In **Supabase Dashboard** → **Authentication** → **Providers** → **GitHub**, enter your Client ID and Client Secret.

---

## ⚙️ Heuristic Scoring Engine

The prompt quality analysis runs entirely client-side in `enhance-logic.js`:

| Metric | How It Works |
|---|---|
| **Clarity** | Penalizes prompts under 5 or 15 words; rewards longer, descriptive inputs |
| **Detail** | Detects domain keywords (`react`, `python`, `api`, etc.) and scales score with word count |
| **AI Compatibility** | Identifies prompt engineering patterns: role/persona assignment (`Act as...`), constraints (`Do not...`, `Limit...`), and output format specifications |
| **Structure** | Analyzes markdown headers, numbered/bulleted lists (`-`, `*`, `1.`), and line break formatting |

---

## 💳 Payment Flow (Razorpay)

* Supports **Monthly** and **Yearly** billing with a 20% annual discount.
* INR-native checkout with test mode enabled by default.
* On successful payment:
  * User tier is upgraded to **Pro** or **Enterprise**.
  * Transaction record is synced to Supabase.
  * A premium success modal with confetti and a golden checkmark is displayed.
* Tier badges (metallic gradient **Pro** / **Enterprise** tags) appear in the navbar.

---

## 🎨 Design System

PromptPilot uses a custom design token system with:
* **Dark and Light theme** support via CSS custom properties
* **Glassmorphism** — frosted glass panels with backdrop blur
* **Gold accent palette** — `#E9C176` primary with gradient variations
* **Premium typography** — Hanken Grotesk for UI, Noto Serif for editorial content
* **Micro-animations** — fade-in-up stagger sequences, scale transitions, hover glows
* **Material Symbols Outlined** — consistent iconography throughout

---

## 📄 License

This project is proprietary. All rights reserved.

---

<p align="center">
  <strong>✈️ PromptPilot</strong> — Elevate every prompt.
</p>
