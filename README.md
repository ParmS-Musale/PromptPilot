# ✈️ PromptPilot — AI Prompt Enhancement Workspace

PromptPilot is an elegant, premium web workspace designed to elevate human-AI communication. CASUAL inputs are transformed into high-quality, professional, structured, and model-specific prompts that maximize the quality of LLM outputs.

---

## 🌟 Key Features

### 1. Interactive Prompt Optimizer
* **Multiple Optimization Modes**: Tailor your prompts for different audiences and goals:
  * **General**: Balanced & professional.
  * **Developer**: Technical, implementation-ready with industry best practices.
  * **Creative**: Story-driven, vivid, and emotionally engaging.
  * **Technical**: Precise architectural blueprints and scalability considerations.
* **Target AI Model Tuning**: Optimizes the style and constraints specifically for ChatGPT, Claude, Gemini, Cursor, Lovable, or Bolt.
* **Typing Simulation**: Interactive text loading mimics real-time generation.
* **One-Click Actions**: Quick copy-to-clipboard and save bookmark functionalities.

### 2. Dynamic Prompt Quality Analysis
* **Real-time Scoring Metrics**: Visual SVG gauges evaluate prompts across four criteria:
  * **Clarity**: Checks prompt lengths and descriptions.
  * **Detail**: Measures content richness and programmatic/technological keyword counts.
  * **AI Compatibility**: Looks for prompt engineering patterns like persona/role assignment (`Act as...`) and negative constraints (`Do not...`).
  * **Structure**: Checks layout formatting (markdown headers, newlines, lists).
* **Client-Side Heuristic Engine**: Dynamic calculations run instantaneously client-side to ensure realistic, unbiased scores.

### 3. Curated Template Library
* A search-and-filter-ready library of pre-engineered prompts across development, creative, writing, and productivity domains.
* Interactive preview modals allow copying or applying prompts directly into the optimizer workspace.

### 4. Dual-Track Data Persistence & Authentication
* **Guest Mode**: Automatically tracks prompt history and bookmarks locally in `localStorage` (capped at 50 items).
* **Authenticated Mode**: Fully integrates with a Supabase back-end database to secure history records and sync across devices.
* **Auth Modal**: Seamless Email/Password registration and login.

---

## 🛠️ Technology Stack

* **Front-End Core**: Vanilla HTML5, CSS3, and modern Javascript ES6.
* **Build System**: Vite (fast dev-server & production packaging).
* **API Integration**: Gemini 2.5 Flash API for prompt optimization.
* **Back-End Database & Auth**: Supabase.
* **Typography**: Hanken Grotesk, Noto Serif, and Material Symbols Outlined.

---

## 📂 Project Architecture

```
PromptPilot/
├── index.html                   # HTML entry point (Pre-loads themes)
├── package.json                 # Project dependencies & Vite scripts
├── vite.config.js               # Development and build settings
├── .env                         # Environment configurations (API Keys)
├── src/
│   ├── main.js                  # App routing and theme controller
│   ├── components/              # Global UI Elements
│   │   ├── navbar.js            # Top-level header, theme-toggle & auth indicators
│   │   ├── footer.js            # Footer metadata
│   │   └── auth-modal.js        # Supabase signup/signin modal
│   ├── lib/
│   │   └── supabase.js          # DB client initialization
│   ├── pages/                   # Views
│   │   ├── landing.js           # Visual landing page
│   │   ├── enhance.js           # Prompt optimizer layout template
│   │   ├── enhance-logic.js     # API connections, local fallbacks, and score logic
│   │   ├── templates.js         # Library layout & search engines
│   │   ├── pricing.js           # Pricing plans
│   │   ├── about.js             # Platform information
│   │   └── docs.js              # Technical guides
│   └── styles/                  # Styling files
│       ├── design-tokens.css    # Color pallets, variables, spaces
│       ├── global.css           # Global resets
│       └── components.css       # Custom buttons, cards, SVG indicators
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### 2. Setup Files
Clone or download the project and run:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure your credentials:
```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
VITE_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
```

### 4. Running the Dev Server
```bash
npm run dev
```
Navigate to the displayed address (e.g. `http://localhost:5173`) in your browser.

---

## ⚙️ How Heuristic Scoring Works

Scores are dynamically evaluated on the client side in [enhance-logic.js](file:///src/pages/enhance-logic.js):
* **Clarity**: Word counts under 5 or 15 are penalized; larger prompts receive high baseline clarity scores.
* **Detail**: Checks presence of technology keywords (e.g. `react`, `vue`, `python`) when using technical optimization modes, scaling up based on total word counts.
* **AI Compatibility**: Detects prompt engineering syntax like constraints (`do not`, `should`, `limit`) and role assignments (`act as`, `persona`, `role`).
* **Structure**: Analyzes list tokens (`-`, `*`, `1.`) and formatting linebreaks. Bullets automatically optimize the layout score to high percentiles.
