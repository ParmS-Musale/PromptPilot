// ── About Page ──
export function renderAbout() {
  return `
    <!-- Hero -->
    <section style="text-align:center;margin-top:8px;">
      <h1 class="headline-xl animate-fade-in-up" style="max-width:640px;margin:0 auto;">The Future of AI Communication</h1>
      <p class="body-lg animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);max-width:540px;margin:12px auto 0;">
        We're building the bridge between human thinking and AI understanding — making AI accessible, productive, and effortless for everyone.
      </p>
    </section>

    <!-- Problem / Solution -->
    <section style="margin-top:56px;">
      <div style="display:grid;grid-template-columns:1fr;gap:20px;" class="about-grid">
        <div class="card animate-fade-in-up stagger-2" style="border-left:3px solid var(--error);">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            <span class="material-symbols-outlined" style="color:var(--error);">report_problem</span>
            <h3 class="headline-sm" style="font-weight:700;">The Problem</h3>
          </div>
          <ul style="display:flex;flex-direction:column;gap:10px;color:var(--on-surface-variant);">
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span style="color:var(--error);font-size:18px;">×</span> Most users struggle to write clear, effective prompts</li>
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span style="color:var(--error);font-size:18px;">×</span> AI gives weak or incomplete responses from vague inputs</li>
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span style="color:var(--error);font-size:18px;">×</span> Developers waste hours rewriting and debugging prompts</li>
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span style="color:var(--error);font-size:18px;">×</span> Beginners feel overwhelmed by prompt engineering</li>
          </ul>
        </div>

        <div class="card animate-fade-in-up stagger-3" style="border-left:3px solid var(--primary-container);">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
            <span class="material-symbols-outlined filled" style="color:var(--primary);">lightbulb</span>
            <h3 class="headline-sm" style="font-weight:700;">Our Solution</h3>
          </div>
          <ul style="display:flex;flex-direction:column;gap:10px;color:var(--on-surface-variant);">
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span class="material-symbols-outlined filled" style="color:var(--primary-container);font-size:18px;">check_circle</span> AI-powered prompt enhancement in seconds</li>
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span class="material-symbols-outlined filled" style="color:var(--primary-container);font-size:18px;">check_circle</span> Specialized modes for developers, creators & teams</li>
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span class="material-symbols-outlined filled" style="color:var(--primary-container);font-size:18px;">check_circle</span> Multi-AI optimization for ChatGPT, Claude, Gemini & more</li>
            <li class="body-md" style="display:flex;align-items:flex-start;gap:8px;"><span class="material-symbols-outlined filled" style="color:var(--primary-container);font-size:18px;">check_circle</span> Browser extension for seamless in-context enhancement</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Who It's For -->
    <section style="margin-top:56px;">
      <h2 class="headline-md animate-fade-in-up" style="text-align:center;font-weight:700;margin-bottom:32px;">Built for Builders</h2>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;" class="audience-grid animate-fade-in-up stagger-3">
        ${audienceCard('code','Developers','Full-stack, frontend, backend, mobile — optimize coding prompts for any stack.')}
        ${audienceCard('rocket_launch','Startup Founders','Go from idea to MVP faster with structured, implementation-ready prompts.')}
        ${audienceCard('brush','Designers','Create detailed design briefs, UI specs, and creative direction prompts.')}
        ${audienceCard('school','Students','Learn prompt engineering while building real projects.')}
        ${audienceCard('campaign','Marketers','Craft content, copy, and campaign prompts that convert.')}
        ${audienceCard('groups','Teams','Collaborate on prompt libraries and share templates across projects.')}
      </div>
    </section>

    <!-- Vision -->
    <section style="margin-top:56px;">
      <div class="glass-panel animate-fade-in-up stagger-4" style="border-radius:2.5rem;padding:40px 32px;text-align:center;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(233,193,118,.06),transparent 60%);pointer-events:none;"></div>
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--primary-container);margin-bottom:16px;display:block;position:relative;z-index:1;">auto_awesome</span>
        <h2 class="headline-md" style="font-weight:700;position:relative;z-index:1;">Our Vision</h2>
        <p class="body-lg" style="color:var(--on-surface-variant);max-width:560px;margin:12px auto 0;position:relative;z-index:1;">
          Become the <strong>"Grammarly for AI Communication"</strong> — an essential tool that makes every AI interaction more effective, more productive, and more human.
        </p>
      </div>
    </section>

    <!-- Roadmap -->
    <section style="margin-top:56px;">
      <h2 class="headline-md animate-fade-in-up" style="text-align:center;font-weight:700;margin-bottom:32px;">Roadmap</h2>
      <div style="display:flex;flex-direction:column;gap:0;max-width:600px;margin:0 auto;" class="animate-fade-in-up stagger-5">
        ${roadmapItem('check_circle','Web Platform','Live — enhance prompts at promptpilot.dev', true)}
        ${roadmapItem('check_circle','Template Library','Live — 50+ ready-to-use templates', true)}
        ${roadmapItem('pending','Browser Extension','In progress — Chrome & Firefox support')}
        ${roadmapItem('schedule','VS Code Integration','Planned — enhance prompts inside your editor')}
        ${roadmapItem('schedule','Team Collaboration','Planned — shared workspaces & prompt libraries')}
        ${roadmapItem('schedule','API Platform','Planned — integrate enhancement into your apps')}
      </div>
    </section>

    <!-- Contact CTA -->
    <section style="margin-top:56px;text-align:center;">
      <h2 class="headline-md animate-fade-in-up" style="font-weight:700;">Get in Touch</h2>
      <p class="body-lg animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);margin:8px auto 24px;max-width:420px;">
        Have questions, feedback, or partnership ideas? We'd love to hear from you.
      </p>
      <a href="mailto:hello@promptpilot.dev" class="btn btn-gold btn-lg animate-fade-in-up stagger-2">
        <span class="material-symbols-outlined" style="font-size:18px;">mail</span>
        Contact Us
      </a>
    </section>

    <style>
      @media(min-width:768px){
        .about-grid { grid-template-columns:1fr 1fr !important; }
        .audience-grid { grid-template-columns:repeat(3,1fr) !important; }
      }
    </style>
  `;
}

function audienceCard(icon, title, desc) {
  return `<div class="card" style="text-align:center;padding:24px;">
    <span class="material-symbols-outlined" style="font-size:32px;color:var(--primary-container);margin-bottom:12px;display:block;">${icon}</span>
    <h4 class="label-md" style="font-weight:700;margin-bottom:6px;">${title}</h4>
    <p style="font-size:13px;color:var(--on-surface-variant);line-height:1.5;">${desc}</p>
  </div>`;
}

function roadmapItem(icon, title, desc, done = false) {
  return `<div style="display:flex;gap:16px;padding:16px 0;border-left:2px solid ${done ? 'var(--primary-container)' : 'var(--outline-variant)'};margin-left:12px;padding-left:24px;position:relative;">
    <span class="material-symbols-outlined ${done ? 'filled' : ''}" style="position:absolute;left:-12px;top:16px;font-size:22px;background:var(--background);color:${done ? 'var(--primary)' : 'var(--outline-variant)'};">${icon}</span>
    <div>
      <h4 class="label-md" style="font-weight:700;">${title}</h4>
      <p style="font-size:13px;color:var(--on-surface-variant);margin-top:2px;">${desc}</p>
    </div>
  </div>`;
}
