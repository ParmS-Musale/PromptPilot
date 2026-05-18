// ── Enhance Page (Core Feature) ──
export function renderEnhance() {
  const models = [
    { id: 'chatgpt', name: 'ChatGPT', icon: 'smart_toy' },
    { id: 'claude', name: 'Claude', icon: 'psychology' },
    { id: 'gemini', name: 'Gemini', icon: 'auto_awesome' },
    { id: 'cursor', name: 'Cursor', icon: 'code' },
    { id: 'lovable', name: 'Lovable', icon: 'favorite' },
    { id: 'bolt', name: 'Bolt.new', icon: 'bolt' },
  ];
  const modes = [
    { id: 'general', label: 'General' },
    { id: 'developer', label: 'Developer' },
    { id: 'creative', label: 'Creative' },
    { id: 'technical', label: 'Technical' },
  ];

  return `
    <section style="margin-top:8px;">
      <div style="text-align:center;margin-bottom:40px;">
        <h1 class="headline-lg animate-fade-in-up" style="background: linear-gradient(to right, var(--primary), var(--inverse-primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">Enhance Your Prompt</h1>
        <p class="body-lg animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);max-width:520px;margin:12px auto 0;">
          Paste your rough idea below. We'll transform it into a professional, AI-optimized prompt.
        </p>
      </div>

      <!-- Controls Bar -->
      <div class="card animate-fade-in-up stagger-2" style="display:flex;flex-direction:column;gap:20px;margin-bottom:32px;padding:24px;">
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <span class="label-sm" style="color:var(--on-surface-variant);font-weight:600;min-width:70px;text-transform:uppercase;letter-spacing:0.05em;">Mode</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${modes.map((m, i) => `<button class="chip mode-chip ${i === 0 ? 'active' : ''}" data-mode="${m.id}">${m.label}</button>`).join('')}
          </div>
        </div>
        <div style="height:1px;background:var(--outline-variant);opacity:0.3;margin:4px 0;"></div>
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <span class="label-sm" style="color:var(--on-surface-variant);font-weight:600;min-width:70px;text-transform:uppercase;letter-spacing:0.05em;">AI Model</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;" id="model-selector">
            ${models.map((m, i) => `
              <button class="chip model-chip ${i === 0 ? 'active' : ''}" data-model="${m.id}" style="gap:6px;">
                <span class="material-symbols-outlined" style="font-size:16px;">${m.icon}</span>
                ${m.name}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Main Editor -->
      <div class="animate-fade-in-up stagger-3" style="display:grid;grid-template-columns:1fr;gap:24px;" id="editor-grid">
        <!-- Input -->
        <div class="card" style="display:flex;flex-direction:column;gap:16px;padding:24px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary);">edit_note</span>
              <span class="label-sm" style="color:var(--on-surface);text-transform:uppercase;letter-spacing:.1em;font-weight:600;">Your Prompt</span>
            </div>
            <span class="label-sm" style="color:var(--on-surface-variant);background:var(--surface-container);padding:4px 10px;border-radius:var(--radius-full);" id="char-count">0 chars</span>
          </div>
          <textarea id="prompt-input" class="textarea" placeholder="e.g. Build me a food delivery app with login and payment..." style="min-height:220px;border-radius:var(--radius);flex:1;color:var(--on-surface);border:1px solid var(--outline-variant);background:var(--surface-container-lowest);padding:16px;box-shadow:inset 0 2px 8px rgba(0,0,0,0.02);"></textarea>
          <button class="btn btn-gold btn-lg" id="enhance-btn" style="width:100%;margin-top:8px;">
            <span class="material-symbols-outlined" style="font-size:20px;">auto_awesome</span>
            Enhance Prompt
          </button>
        </div>

        <!-- Output -->
        <div class="card" style="display:flex;flex-direction:column;gap:16px;padding:24px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary);">auto_awesome</span>
              <span class="label-sm" style="color:var(--primary);font-weight:700;text-transform:uppercase;letter-spacing:.1em;">Enhanced Output</span>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-outline btn-sm" id="copy-btn" title="Copy" style="padding:8px;border-radius:var(--radius-sm);">
                <span class="material-symbols-outlined" style="font-size:18px;">content_copy</span>
              </button>
              <button class="btn btn-outline btn-sm" id="save-btn" title="Save" style="padding:8px;border-radius:var(--radius-sm);">
                <span class="material-symbols-outlined" style="font-size:18px;">bookmark_border</span>
              </button>
            </div>
          </div>
          <div id="enhanced-output" style="flex:1;min-height:220px;padding:20px;border-radius:var(--radius);background:var(--surface-container-lowest);border:1px solid var(--outline-variant);font-family:var(--font-sans);font-size:var(--fs-body-md);line-height:1.7;color:var(--on-surface);white-space:pre-wrap;box-shadow:inset 0 2px 8px rgba(0,0,0,0.02);margin-top:8px;">
            <span style="color:var(--on-surface-variant);font-style:italic;">Your enhanced prompt will appear here...</span>
          </div>
        </div>
      </div>

      <!-- Quality Score -->
      <div class="animate-fade-in-up stagger-4" style="margin-top:24px;" id="score-section" hidden>
        <div class="card">
          <h3 class="label-sm" style="text-transform:uppercase;letter-spacing:.1em;color:var(--on-surface-variant);margin-bottom:20px;">Prompt Quality Analysis</h3>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;" class="score-grid">
            ${scoreItem('Clarity', 0, 'clarity')}
            ${scoreItem('Detail', 0, 'detail')}
            ${scoreItem('AI Compatibility', 0, 'compat')}
            ${scoreItem('Structure', 0, 'structure')}
          </div>
        </div>
      </div>
    </section>

    <style>
      @media(min-width:768px){
        #editor-grid { grid-template-columns:1fr 1fr !important; }
        .score-grid { grid-template-columns:repeat(4,1fr) !important; }
      }
      .model-chip.active { background:var(--primary) !important; color:var(--on-primary) !important; }
      .mode-chip.active { background:var(--primary) !important; color:var(--on-primary) !important; }
      #enhance-btn:disabled { opacity:.6; cursor:not-allowed; }
      .typing-cursor { display:inline-block; width:2px; height:1em; background:var(--primary); animation:blink 1s infinite; margin-left:2px; vertical-align:text-bottom; }
    </style>
  `;
}

function scoreItem(label, value, id) {
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;">
      <div class="score-ring">
        <svg viewBox="0 0 100 100" width="72" height="72">
          <circle class="bg" cx="50" cy="50" r="42"/>
          <circle class="fill" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="264" id="score-${id}"/>
        </svg>
        <div class="value" id="score-val-${id}">0</div>
      </div>
      <span class="label-sm" style="color:var(--on-surface-variant);">${label}</span>
    </div>
  `;
}
