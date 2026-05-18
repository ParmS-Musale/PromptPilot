// ── Templates Page ──

export const templates = [
  {
    id: 'saas-mvp',
    title: 'SaaS MVP Builder',
    desc: 'Full-stack SaaS app with auth, billing, dashboard, and user management.',
    category: 'SaaS',
    icon: 'rocket_launch',
    raw: 'Build a scalable SaaS boilerplate using Next.js App Router for the frontend and Express for the backend. Must include secure JWT token authentication with HttpOnly cookies, Stripe monthly subscription billing, a responsive client dashboard with custom metrics, and a SQLite/PostgreSQL Prisma schema with user/team model associations.',
    systemPrompt: 'Act as a principal SaaS Architect and Senior Full-Stack Engineer. Provide production-ready, clean-code boilerplate advice and architecture designs.',
    context: 'Pre-seed tech startup building a modern web service that requires rapid deployment and strict security defaults.',
    parameters: 'Model: Claude 3.5 Sonnet | Temp: 0.2 | Structure: Markdown + Code blocks',
    enhanced: `Act as a senior full-stack software engineer with 10+ years of experience.

**Task:** Build a scalable SaaS boilerplate using Next.js App Router for the frontend and Express for the backend. Must include secure JWT token authentication with HttpOnly cookies, Stripe monthly subscription billing, a responsive client dashboard with custom metrics, and a SQLite/PostgreSQL Prisma schema with user/team model associations.

**System Architecture & Strategy:**
1. **Directory Structure & Layout**
   - Separate frontend (\`/client\`) and backend (\`/server\`) directories.
   - Use Next.js App Router for server-rendered page loading efficiency.
2. **Security & Authentication**
   - JWT tokens containing user ID and roles. Keep tokens in \`HttpOnly\`, secure cookies.
   - Implement active middleware on both Next.js edge router and Express API routes.
3. **Stripe Integration Workflow**
   - Deploy Stripe Customer Portal for quick customer plan management.
   - Handle checkout sessions, subscription updates, and deletion events inside custom webhooks.`
  },
  {
    id: 'ai-chat',
    title: 'AI Chat Application',
    desc: 'Real-time AI chatbot with streaming responses, history, and model switching.',
    category: 'AI App',
    icon: 'smart_toy',
    raw: 'Design a real-time AI Chat chatbot interface with streaming replies. Use React/Next.js for the UI, custom WebSockets/SSE for text streaming, support chat histories persisted to localStorage, and allow users to select from a dropdown of different models (GPT-4, Claude 3.5, Gemini 1.5).',
    systemPrompt: 'Act as a senior frontend and AI integration specialist. Focus heavily on clean UX, real-time message stream handling, and robust caching/persistence.',
    context: 'Enterprise SaaS looking to add an intuitive chat interface to their product line.',
    parameters: 'Model: GPT-4o | Temp: 0.4 | Focus: Stream performance & UX',
    enhanced: `Act as a senior AI Frontend Engineer.

**Task:** Design a real-time AI Chat chatbot interface with streaming replies.

**Technical Specifications:**
1. **Streaming Protocol (Server-Sent Events)**
   - Use SSE over standard HTTP instead of raw WebSockets for simplex text streams.
   - Parse chunked data using \`@microsoft/fetch-event-source\` for resilience.
2. **State Management & Persistence**
   - Store conversations indexed by UUID in localStorage.
   - Render lists with virtualized viewports for extreme performance.
3. **Model Selection UI**
   - Clean popover selector highlighting latency and context window length differences.`
  },
  {
    id: 'ecommerce-store',
    title: 'E-Commerce Store',
    desc: 'Product catalog, cart, checkout, payment integration, and order tracking.',
    category: 'E-Commerce',
    icon: 'shopping_cart',
    raw: 'Develop a multi-page E-Commerce platform using Next.js. Implement product collections, filter and search widgets, a global context-based Shopping Cart, a Stripe checkout flow, and a post-purchase success page.',
    systemPrompt: 'Act as an expert E-Commerce Architect. Guide the developer in performance, SEO (metadata, semantic tags), and secure checkout integrations.',
    context: 'Modern direct-to-consumer brand replacing a slow legacy Shopify store with a headless custom storefront.',
    parameters: 'Model: Gemini 1.5 Pro | Temp: 0.3 | Focus: Core Web Vitals & Webhooks',
    enhanced: `Act as a Lead E-Commerce Architect.

**Task:** Develop a multi-page E-Commerce platform using Next.js with complete product collections, filters, a shopping cart, and a Stripe checkout.

**Key Architectures:**
1. **Core Web Vitals Optimization**
   - Pre-render all product list and description pages using static regeneration (ISR).
   - Leverage edge caching for search query filters.
2. **Shopping Cart Redux/Context Provider**
   - Synchronize items client-side with session-backed persistent hooks.
   - Prevent out-of-stock items from checkout through atomic inventory pre-checks.
3. **Stripe Checkout Webhooks**
   - Handle transactional states: verify metadata matching, write order IDs to database, and trigger shipping emails.`
  },
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    desc: 'Analytics dashboard with charts, tables, user management, and role-based access.',
    category: 'Dashboard',
    icon: 'dashboard',
    raw: 'Create a full-featured admin dashboard layout. Use React and Chart.js to render daily registration line charts and geo-location distribution maps. Provide search filters, paginated tables for active user sessions, and mock actions to suspend or edit user details.',
    systemPrompt: 'Act as a Senior UX Architect and Full-Stack Developer with strict data-viz best practices.',
    context: 'Internal operations tool for a B2B SaaS platform requiring high density info views.',
    parameters: 'Model: Claude 3.5 Sonnet | Temp: 0.1 | Style: Clean, Professional',
    enhanced: `Act as a UX Architect & Data Visualization Specialist.

**Task:** Create a high-density, interactive Admin Dashboard with charts, paginated tables, and user actions.

**Implementation Guide:**
1. **Layout & Grid Strategy**
   - Implement a CSS Grid layout with responsive column grids (1col on mobile, 4col on desktop).
   - Sticky left sidebar navigation and glassmorphic quick-action headers.
2. **Chart.js Best Practices**
   - Define custom color palettes (e.g. HSL tailored scales) to match your light/dark system.
   - Clean up gridline ticks, enable tooltips with absolute floating coordinates.
3. **Paginated Table & Batch CRUD**
   - Build virtualized rows with quick action overlays (suspend, promote, view logs).`
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    desc: 'High-converting landing page with hero, features, testimonials, pricing, and CTA.',
    category: 'Landing Page',
    icon: 'web',
    raw: 'Write modern HTML/CSS landing page code with dark glassmorphic panels, gradient badges, gold accent highlights, an interactive tier pricing slider, customer review carousels, and an input form for capturing signups.',
    systemPrompt: 'Act as an expert Copywriter and Creative Frontend Developer specializing in conversion rates.',
    context: 'Product launch page for an exclusive developer tool seeking waitlist signups.',
    parameters: 'Model: Claude 3.5 | Temp: 0.6 | Tone: Compelling, Tech-forward',
    enhanced: `Act as a Conversions Copywriter and Elite Frontend UI Developer.

**Task:** Create a premium glassmorphic landing page with smooth scrolls, dynamic copy, and responsive CTAs.

**UX & Development Pillars:**
1. **Hero Header Copy Structure**
   - Catchy, high-impact Title focusing on value over features.
   - Sub-headlines mapping pain points directly to solutions.
2. **Glassmorphism Visual Token Specs**
   - Use semi-transparent container cards: \`background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1);\`
3. **Interactive Conversion Triggers**
   - Live sliding pricing widget simulating ROI savings based on team size.`
  },
  {
    id: 'rest-api',
    title: 'REST API Backend',
    desc: 'Scalable REST API with auth, CRUD, validation, error handling, and docs.',
    category: 'API',
    icon: 'api',
    raw: 'Set up an Express REST API backend written in TypeScript. Structure the application with distinct controller, service, database-access, and route layers. Implement AJV validator middleware for incoming query bodies, strict token extraction, and standardized global JSON error payloads.',
    systemPrompt: 'Act as a Principal API Architect and TypeScript Expert. Standardize patterns for enterprise scale.',
    context: 'Corporate backend service supporting both internal mobile applications and public integrations.',
    parameters: 'Model: GPT-4o | Temp: 0.1 | Standard: RESTful REST API patterns',
    enhanced: `Act as a Principal Backend Architect and TypeScript Expert.

**Task:** Design a robust, highly structured Express/TypeScript REST API.

**Architecture Standards:**
1. **TypeScript Folder Structure**
   - \`src/controllers/\` for route handlers, HTTP inputs, and outputs.
   - \`src/services/\` for business logic, integrations, database transactions.
   - \`src/models/\` / \`src/repositories/\` for database queries and migrations.
2. **Validation & Middlewares**
   - Implement AJV schema validators checking payloads prior to controller execution.
   - Catch-all exception handling catching asynchronous errors and outputting unified JSON schemas.
3. **API Documentation Standards**
   - Autogenerate Swagger OpenAPI 3.0 specification schemas directly from TypeScript decorators.`
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    desc: 'Developer portfolio with projects, blog, contact form, and animations.',
    category: 'Portfolio',
    icon: 'person',
    raw: 'Create a developer portfolio website using vanilla HTML, CSS, and modern JS. Include a sleek terminal emulator interface component showing interactive commands, project showcase grid with animated filters, a dark/light mode toggle, and a contact form with live input validation indicators.',
    systemPrompt: 'Act as a Creative Front-End Specialist with a passion for micro-interactions and terminal aesthetics.',
    context: 'Personal brand site for a senior system programmer seeking freelance contracts.',
    parameters: 'Model: Claude 3.5 Sonnet | Temp: 0.5 | Style: Minimalist & Terminal-themed',
    enhanced: `Act as an Elite Creative Frontend Developer.

**Task:** Create an interactive, premium developer portfolio with a terminal emulator widget and micro-animations.

**Key Layout Areas:**
1. **Terminal Emulator Widget**
   - Design an interactive box executing custom command prompts (\`help\`, \`projects\`, \`contact\`).
   - Typing effect animations simulating asynchronous system boot cycles.
2. **Project Card Showcases**
   - Rich hover transitions sliding descriptive categories from below, using smooth CSS clips.
3. **Theme Engine**
   - Smooth HSL-based transition toggling dark and light states without reflow flicker.`
  },
  {
    id: 'mobile-app',
    title: 'Mobile App (Flutter)',
    desc: 'Cross-platform mobile app with navigation, state management, and API integration.',
    category: 'Mobile',
    icon: 'phone_iphone',
    raw: 'Write clean, modular Dart code for a Flutter dashboard page. Set up a Riverpod state provider pulling asynchronous statistics from an API. Render custom cards, a drawer menu with user details, loading skeleton layouts, and local pagination filters.',
    systemPrompt: 'Act as a Senior Flutter / Dart Architect following the official framework design rules.',
    context: 'Fintech mobile client requiring rapid state syncing and flawless offline states.',
    parameters: 'Model: Gemini 1.5 Pro | Temp: 0.2 | Pattern: Clean Flutter Architecture',
    enhanced: `Act as a Senior Flutter Engineer.

**Task:** Build a modular Flutter dashboard page with Riverpod state management.

**Flutter Blueprints:**
1. **Riverpod State Modeling**
   - Use \`AsyncNotifierProvider\` to model async states: loading, data, and error.
   - Cache API responses and implement pull-to-refresh widgets.
2. **Modular Widget Architecture**
   - Separate reusable components into \`presentation/widgets/\` and logic into \`application/providers/\`.
   - Prevent UI rebuilds by keeping widgets highly specific and using \`const\` constructors.`
  },
  {
    id: 'ai-agent',
    title: 'AI Agent System',
    desc: 'Multi-agent AI pipeline with task decomposition, memory, and tool usage.',
    category: 'AI App',
    icon: 'psychology',
    raw: 'Build an autonomous multi-agent pipeline using LangChain or AutoGen in Python. Include a Router Agent that decomposes a prompt, a Researcher Agent using search tools, a Writer Agent synthesizing research reports, and a central memory class capturing session history.',
    systemPrompt: 'Act as an AI Research Scientist and Principal Python System Architect.',
    context: 'Automated competitive intelligence system run nightly in background cron processes.',
    parameters: 'Model: GPT-4o | Temp: 0.2 | Framework: LangChain / Python',
    enhanced: `Act as a Senior AI Architect and Python Engineer.

**Task:** Build a multi-agent AI pipeline with dynamic task routing and custom memory.

**Agent Schema Design:**
1. **Task Orchestrator & Router**
   - Implement an LLM router returning structured JSON indicating target workers and sub-task lists.
2. **Agent Node Specifications**
   - Write custom LangChain base classes with strict prompt boundaries.
   - Implement tool bindings allowing access to APIs (e.g. search, document readers) safely.
3. **Central memory**
   - Thread-safe storage with short-term semantic vector embedding lookups.`
  },
  {
    id: 'subscription-platform',
    title: 'Subscription Platform',
    desc: 'Stripe-integrated subscription platform with plans, trials, and webhooks.',
    category: 'SaaS',
    icon: 'payments',
    raw: 'Set up Stripe billing subscription flows in Express. Create database schemas tracking active subscriptions, trial structures, product plans, and customer IDs. Add secure webhook hooks checking Stripe event signatures and resolving paid status.',
    systemPrompt: 'Act as a Senior Fintech Infrastructure Architect with strict PCI compliance awareness.',
    context: 'Membership portal requiring high reliability transactional processing.',
    parameters: 'Model: Claude 3.5 Sonnet | Temp: 0.1 | Safety: Verification mandatory',
    enhanced: `Act as a Fintech Infrastructure Architect.

**Task:** Set up a Stripe billing subscription database schema and event webhook handlers.

**Technical Strategy:**
1. **Database Schema Setup**
   - Store user subscriptions with Stripe Customer ID, Subscription ID, status (trial, active, past_due, canceled), and plan identifier.
2. **Stripe Webhook Signature Verification**
   - Extract header hashes, match webhook secrets, and process events asynchronously via a task queue to prevent HTTP timeouts.
3. **Grace Periods & Downgrades**
   - Implement logic processing card failures, grace intervals, and automatic plan tier downgrades.`
  },
  {
    id: 'realtime-dashboard',
    title: 'Real-time Dashboard',
    desc: 'WebSocket-powered dashboard with live charts, notifications, and alerts.',
    category: 'Dashboard',
    icon: 'monitoring',
    raw: 'Create a WebSocket-enabled dashboard using Node.js (ws package) and Chart.js. Render a real-time system resource graph (CPU, Memory) receiving metrics every 500ms. Display a scrolling notification log panel showing active system warnings.',
    systemPrompt: 'Act as a Senior Systems Developer. Build lag-free, non-blocking real-time streams.',
    context: 'Data-center monitoring interface demanding near-zero frame delay.',
    parameters: 'Model: Claude 3.5 Sonnet | Temp: 0.3 | Speed: High-frequency refresh',
    enhanced: `Act as a Systems UX & WebSocket Engineer.

**Task:** Build a real-time server stats dashboard using HTML5 WebSockets and Chart.js.

**Design Blueprint:**
1. **WebSocket Connection Protocol**
   - Implement automatic reconnection backoff retries when connection drops.
   - Throttle client updates to 30fps to avoid rendering bottlenecks.
2. **High-Frequency Chart Optimization**
   - Initialize fixed-size data arrays, avoiding constant array garbage collection.
   - Use lightweight canvas renderings, disabling unnecessary chart animations.`
  },
  {
    id: 'chrome-extension',
    title: 'Chrome Extension',
    desc: 'Browser extension with popup UI, content scripts, background service, and storage.',
    category: 'API',
    icon: 'extension',
    raw: 'Develop a Chrome Extension manifest V3 tool. Implement a popup dashboard enabling input notes, content scripts listening to page DOM elements, background service workers acting as API bridges, and synced local storage.',
    systemPrompt: 'Act as an Expert Browser Extension architect with heavy focus on security scopes and speed.',
    context: 'Security-conscious productivity tool enabling text extraction and fast note syncing.',
    parameters: 'Model: GPT-4o | Temp: 0.3 | Standard: Manifest V3 rules',
    enhanced: `Act as an Expert Browser Extension Developer.

**Task:** Build a robust Manifest V3 Chrome Extension with active popup, content, and background states.

**Pillars of Extension Architecture:**
1. **Manifest V3 Specification**
   - Clean permission declarations specifying activeTab, storage, and host permissions.
   - Background service workers utilizing non-blocking async event handlers.
2. **Safe DOM Extraction Content Scripts**
   - Inject scripts securely avoiding content injection vulnerabilities.
   - Implement message-passing protocols syncing states between frames.`
  }
];

export function renderTemplates() {
  const categories = ['All', 'SaaS', 'Landing Page', 'AI App', 'Dashboard', 'E-Commerce', 'Mobile', 'API', 'Portfolio'];

  return `
    <section style="margin-top:8px;">
      <div style="text-align:center;margin-bottom:32px;">
        <h1 class="headline-lg animate-fade-in-up">Prompt Templates</h1>
        <p class="body-lg animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);max-width:480px;margin:8px auto 0;">
          Ready-to-use templates optimized for real-world projects. Customize and enhance instantly.
        </p>
      </div>

      <!-- Search -->
      <div class="animate-fade-in-up stagger-2" style="max-width:480px;margin:0 auto 24px;position:relative;">
        <span class="material-symbols-outlined" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--outline);font-size:20px;">search</span>
        <input type="text" class="input" placeholder="Search templates..." style="padding-left:44px;" id="template-search" />
      </div>

      <!-- Filter Chips -->
      <div class="animate-fade-in-up stagger-3 template-chips" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:32px;">
        ${categories.map((c, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-category="${c === 'All' ? 'all' : c}">${c}</button>`).join('')}
      </div>

      <!-- Template Grid -->
      <div style="display:grid;grid-template-columns:1fr;gap:16px;" class="template-grid animate-fade-in-up stagger-4">
        ${templates.map(t => `
          <div class="card template-card" data-category="${t.category}" data-id="${t.id}" style="cursor:pointer;">
            <div style="display:flex;align-items:flex-start;gap:16px;height:100%;">
              <div class="card-icon" style="margin-bottom:0;flex-shrink:0;">
                <span class="material-symbols-outlined">${t.icon}</span>
              </div>
              <div style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;">
                    <h4 class="headline-sm" style="font-size:17px;font-weight:700;">${t.title}</h4>
                    <span class="badge badge-info">${t.category}</span>
                  </div>
                  <p class="body-md" style="color:var(--on-surface-variant);margin-top:6px;line-height:1.5;">${t.desc}</p>
                </div>
                <div style="margin-top:16px;display:flex;gap:8px;">
                  <button class="btn btn-gold btn-sm">Use Template</button>
                  <button class="btn btn-outline btn-sm">Preview</button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <style>
      @media(min-width:640px){ .template-grid { grid-template-columns:repeat(2,1fr) !important; } }
      @media(min-width:1024px){ .template-grid { grid-template-columns:repeat(3,1fr) !important; } }
    </style>
  `;
}

export function initTemplates() {
  const searchInput = document.getElementById('template-search');
  const activeFilterChip = document.querySelector('.template-chips .chip.active');

  const filterTemplates = () => {
    const q = searchInput ? searchInput.value.toLowerCase() : '';
    const activeChip = document.querySelector('.template-chips .chip.active');
    const cat = activeChip ? activeChip.dataset.category : 'all';

    document.querySelectorAll('.template-card').forEach(card => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      const matchesSearch = title.includes(q) || desc.includes(q);
      const matchesCategory = cat === 'all' || card.dataset.category === cat;

      card.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
    });
  };

  // Bind Search input
  if (searchInput) {
    searchInput.addEventListener('input', filterTemplates);
  }

  // Override click chips to support search together
  document.querySelectorAll('.template-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.template-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterTemplates();
    });
  });

  // Click handler delegation for cards
  const grid = document.querySelector('.template-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.template-card');
      if (!card) return;
      
      const templateId = card.dataset.id;
      const template = templates.find(t => t.id === templateId);
      if (!template) return;

      // Clicked Use Template Button
      if (e.target.closest('.btn-gold')) {
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem('pp_prefilled_prompt', template.raw);
        window.location.hash = '#/enhance';
        return;
      }

      // Clicked Preview Button or the Card area
      if (e.target.closest('.btn-outline') || card) {
        e.preventDefault();
        e.stopPropagation();
        openPreviewModal(template);
      }
    });
  }
}

function openPreviewModal(template) {
  const existing = document.getElementById('template-preview-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'template-preview-modal';
  modal.className = 'modal-backdrop';
  modal.innerHTML = `
    <div class="modal-container glass-panel animate-scale-in">
      <div class="modal-header">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="card-icon" style="margin-bottom:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined">${template.icon}</span>
          </div>
          <div>
            <h3 class="headline-sm" style="font-size:18px;margin:0;font-weight:700;">${template.title}</h3>
            <span class="badge badge-info" style="margin-top:4px;display:inline-block;">${template.category}</span>
          </div>
        </div>
        <button class="modal-close-btn" aria-label="Close">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="modal-tabs">
        <button class="modal-tab-btn active" data-tab="details">Details & Structure</button>
        <button class="modal-tab-btn" data-tab="preview">Enhanced Preview</button>
      </div>

      <div class="modal-body">
        <!-- Details Tab -->
        <div class="modal-tab-content active" id="tab-details">
          <div class="meta-section">
            <h5 class="label-md">System Prompt Instructions</h5>
            <div class="code-block-wrapper">
              <pre><code>${template.systemPrompt}</code></pre>
            </div>
          </div>
          
          <div class="meta-section" style="margin-top:16px;">
            <h5 class="label-md">Target Context</h5>
            <p class="body-md" style="color:var(--on-surface-variant);background:rgba(0,0,0,0.03);padding:12px;border-radius:var(--radius-sm);border:1px solid var(--outline-variant);line-height:1.5;">${template.context}</p>
          </div>

          <div class="meta-section" style="margin-top:16px;">
            <h5 class="label-md">Parameters</h5>
            <p class="body-md" style="color:var(--on-surface-variant);font-family:monospace;font-size:13px;background:rgba(0,0,0,0.03);padding:8px 12px;border-radius:var(--radius-sm);border:1px solid var(--outline-variant);">${template.parameters}</p>
          </div>

          <div class="meta-section" style="margin-top:16px;">
            <h5 class="label-md">Raw Base Prompt</h5>
            <div class="code-block-wrapper">
              <pre><code>${template.raw}</code></pre>
            </div>
          </div>
        </div>

        <!-- Preview Tab -->
        <div class="modal-tab-content" id="tab-preview">
          <div class="meta-section">
            <h5 class="label-md">Enhanced Prompt Output</h5>
            <div class="code-block-wrapper enhanced-output-box" style="white-space:pre-wrap;max-height:350px;overflow-y:auto;font-family:var(--font-sans);line-height:1.6;font-size:14px;background:var(--surface);padding:16px;border:1px dashed var(--primary);border-radius:var(--radius-sm);">
              ${template.enhanced}
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-outline" id="modal-copy-raw-btn">
          <span class="material-symbols-outlined" style="font-size:18px;">content_copy</span>
          Copy Raw Prompt
        </button>
        <button class="btn btn-gold" id="modal-use-template-btn">
          <span class="material-symbols-outlined" style="font-size:18px;">auto_awesome</span>
          Use Template
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('.modal-close-btn');
  closeBtn.addEventListener('click', () => {
    modal.classList.add('fade-out');
    modal.querySelector('.modal-container').classList.add('scale-out');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 200);
  });

  // Background dismiss click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  // Tab switching inside modal
  const tabBtns = modal.querySelectorAll('.modal-tab-btn');
  const tabContents = modal.querySelectorAll('.modal-tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `tab-${btn.dataset.tab}`;
      modal.querySelector(`#${targetId}`).classList.add('active');
    });
  });

  // Action: Copy Raw Prompt
  const copyRawBtn = modal.querySelector('#modal-copy-raw-btn');
  copyRawBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(template.raw).then(() => {
      copyRawBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">check</span> Copied!';
      setTimeout(() => {
        copyRawBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">content_copy</span> Copy Raw Prompt';
      }, 2000);
    });
  });

  // Action: Redirect Use Template
  const useTemplateBtn = modal.querySelector('#modal-use-template-btn');
  useTemplateBtn.addEventListener('click', () => {
    localStorage.setItem('pp_prefilled_prompt', template.raw);
    closeBtn.click();
    window.location.hash = '#/enhance';
  });
}
