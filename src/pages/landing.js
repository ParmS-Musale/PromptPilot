// ── Landing Page ──
export function renderLanding() {
  return `
    <!-- Hero -->
    <section style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:var(--stack-lg);margin-top:16px;">
      <div class="glass-panel animate-fade-in-up" style="padding:8px 20px;border-radius:var(--radius-full);display:inline-flex;align-items:center;gap:8px;">
        <span style="width:8px;height:8px;border-radius:50%;background:var(--primary-container);"></span>
        <span class="label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:.1em;">Introducing PromptPilot 2.0</span>
      </div>

      <h1 class="headline-xl animate-fade-in-up stagger-1" style="max-width:720px;">
        Master the Art of<br>
        <span style="color:var(--primary);position:relative;display:inline-block;">
          AI Conversation
          <svg style="position:absolute;width:100%;height:12px;bottom:-4px;left:0;opacity:.5;" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2 7.15C51.5 2.15 125-.85 198 7.15" stroke="var(--primary-container)" stroke-linecap="round" stroke-width="3"/></svg>
        </span>
      </h1>

      <p class="body-lg animate-fade-in-up stagger-2" style="color:var(--on-surface-variant);max-width:580px;">
        Design, test, and optimize your prompts with unprecedented clarity. The elegant workspace for professional prompt engineering.
      </p>

      <div class="animate-fade-in-up stagger-3" style="display:flex;flex-wrap:wrap;gap:var(--stack-md);justify-content:center;margin-top:8px;width:100%;">
        <a href="#/enhance" class="btn btn-primary btn-lg" style="flex:1 1 auto;max-width:260px;">
          Start Building Free
          <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
        </a>
        <button class="btn btn-glass btn-lg" onclick="alert('Demo video coming soon!')" style="flex:1 1 auto;max-width:220px;">
          <span class="material-symbols-outlined" style="font-size:18px;">play_circle</span>
          Watch Demo
        </button>
      </div>
    </section>

    <!-- Trusted By -->
    <section class="animate-fade-in-up stagger-4" style="text-align:center;margin-top:48px;">
      <p class="label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:.15em;margin-bottom:20px;">Optimized for leading AI platforms</p>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:24px;opacity:.45;">
        ${['ChatGPT','Claude','Gemini','Cursor','Copilot','Bolt.new'].map(name => `
          <div style="display:flex;align-items:center;gap:6px;font-family:var(--font-serif);font-size:15px;font-weight:600;letter-spacing:-.01em;">${name}</div>
        `).join('')}
      </div>
    </section>

    <!-- Before/After -->
    <section style="margin-top:64px;">
      <div class="glass-panel" style="border-radius:2.5rem;padding:32px;overflow:hidden;position:relative;box-shadow:var(--shadow-lg);">
        <div style="position:absolute;top:0;right:0;width:250px;height:250px;background:var(--primary-fixed-dim);border-radius:50%;mix-blend-mode:multiply;filter:blur(80px);opacity:.15;transform:translate(50%,-50%);"></div>
        <div style="position:absolute;bottom:0;left:0;width:250px;height:250px;background:var(--secondary-fixed-dim);border-radius:50%;mix-blend-mode:multiply;filter:blur(80px);opacity:.15;transform:translate(-50%,50%);"></div>

        <div style="text-align:center;margin-bottom:32px;position:relative;z-index:1;">
          <h2 class="headline-md" style="font-weight:700;">The Difference is Clarity</h2>
          <p class="body-md" style="color:var(--on-surface-variant);margin-top:8px;">Transform raw ideas into precise, structured instructions.</p>
        </div>

        <div style="display:grid;grid-template-columns:1fr;gap:20px;position:relative;z-index:1;" class="comparison-grid">
          <!-- Before -->
          <div class="card" style="padding:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--outline-variant);padding-bottom:12px;margin-bottom:16px;">
              <span class="label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;letter-spacing:.1em;">Before</span>
              <span class="badge badge-error">Unstructured</span>
            </div>
            <p class="body-md" style="color:var(--on-surface-variant);font-style:italic;">"Build me a food delivery app with login and payment"</p>
            <div style="margin-top:auto;padding-top:16px;display:flex;align-items:center;gap:6px;color:var(--on-surface-variant);" class="label-sm">
              <span class="material-symbols-outlined" style="font-size:16px;">warning</span>
              Low predictability
            </div>
          </div>

          <!-- Arrow (mobile: vertical, desktop: horizontal) -->
          <div style="display:flex;align-items:center;justify-content:center;">
            <div style="width:40px;height:40px;border-radius:50%;background:var(--surface);box-shadow:0 2px 8px rgba(0,0,0,.06);display:flex;align-items:center;justify-content:center;color:var(--primary);">
              <span class="material-symbols-outlined arrow-icon">arrow_downward</span>
            </div>
          </div>

          <!-- After -->
          <div class="card glass-panel" style="padding:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--outline-variant);padding-bottom:12px;margin-bottom:16px;">
              <div style="display:flex;align-items:center;gap:6px;">
                <span class="material-symbols-outlined" style="font-size:16px;color:var(--primary);">auto_awesome</span>
                <span class="label-sm" style="color:var(--primary);font-weight:700;text-transform:uppercase;letter-spacing:.1em;">PromptPilot Enhanced</span>
              </div>
              <span class="badge badge-success">Structured</span>
            </div>
            <div class="body-md">
              <span style="color:var(--primary);font-weight:600;">Role:</span> Senior Full-Stack Engineer<br>
              <span style="color:var(--primary);font-weight:600;">Task:</span> Build a modern food delivery web app using React, Node.js, Express & MongoDB<br>
              <span style="color:var(--primary);font-weight:600;">Features:</span> Auth, restaurant listings, cart, Razorpay, order tracking, admin dashboard<br>
              <span style="color:var(--primary);font-weight:600;">UI:</span> Responsive, mobile-first with modern design system
            </div>
            <div style="margin-top:auto;padding-top:16px;display:flex;align-items:center;gap:6px;color:var(--primary);" class="label-sm">
              <span class="material-symbols-outlined filled" style="font-size:16px;">check_circle</span>
              High predictability & reproducibility
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Bento -->
    <section style="margin-top:72px;">
      <h3 class="headline-lg" style="text-align:center;margin-bottom:48px;">Advanced Prompt Engineering Tools</h3>
      <div style="display:grid;grid-template-columns:1fr;gap:20px;" class="features-grid">
        ${featureCard('account_tree','Visual Prompt Chaining','Connect outputs to inputs with our intuitive drag-and-drop canvas. Build complex reasoning architectures without writing code.', true)}
        ${featureCard('tune','A/B Testing','Systematically evaluate prompt variations to find the optimal phrasing for your specific LLM model.')}
        ${featureCard('api','One-Click Deploy','Deploy your refined prompts instantly as API endpoints. We handle versioning and management.')}
        ${featureCard('analytics','Cost & Performance Analytics','Track token usage, latency, and success rates across all your deployed prompts in a unified dashboard.', true)}
        ${featureCard('extension','Browser Extension','Enhance prompts directly inside ChatGPT, Claude, Gemini, and any AI chat interface with one click.')}
        ${featureCard('psychology','AI-Specific Modes','Specialized enhancement for ChatGPT, Claude, Gemini, Cursor, Lovable, Bolt.new, and more.', true)}
      </div>
    </section>

    <!-- CTA -->
    <section style="margin-top:72px;text-align:center;">
      <div class="glass-panel" style="border-radius:2.5rem;padding:48px 32px;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(233,193,118,.06),transparent 60%);pointer-events:none;"></div>
        <h2 class="headline-lg" style="position:relative;z-index:1;">Ready to Elevate Your AI Workflow?</h2>
        <p class="body-lg" style="color:var(--on-surface-variant);margin-top:12px;max-width:480px;margin-left:auto;margin-right:auto;position:relative;z-index:1;">
          Join thousands of developers, founders, and creators who craft better prompts with PromptPilot.
        </p>
        <div style="margin-top:24px;display:flex;flex-wrap:wrap;gap:var(--stack-md);justify-content:center;position:relative;z-index:1;">
          <a href="#/enhance" class="btn btn-gold btn-lg">
            Start for Free
            <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>

    <style>
      @media(min-width:768px){
        .comparison-grid { grid-template-columns:1fr auto 1fr !important; }
        .comparison-grid .arrow-icon { font-size:24px; }
        .arrow-icon::before { content:'arrow_forward' !important; }
        .features-grid { grid-template-columns:repeat(3,1fr) !important; }
        .features-grid .feature-wide { grid-column:span 2; }
      }
      .arrow-icon::before { content:'arrow_downward'; }
    </style>
  `;
}

function featureCard(icon, title, desc, wide = false) {
  return `
    <div class="card ${wide ? 'feature-wide' : ''}" style="display:flex;flex-direction:column;gap:0;">
      <div class="card-icon"><span class="material-symbols-outlined">${icon}</span></div>
      <h4 class="headline-sm" style="margin-bottom:8px;">${title}</h4>
      <p class="body-md" style="color:var(--on-surface-variant);max-width:440px;">${desc}</p>
    </div>
  `;
}
