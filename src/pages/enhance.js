// ── Enhance Page (Core Feature) ──
export function renderEnhance() {
  return `
    <section style="margin-top:8px;">
      <div style="text-align:center;margin-bottom:40px;">
        <h1 class="headline-lg animate-fade-in-up" style="background: linear-gradient(to right, var(--primary), var(--inverse-primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">Enhance Your Prompt</h1>
        <p class="body-lg animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);max-width:520px;margin:12px auto 0;">
          Paste your rough idea below. We'll transform it into a professional, AI-optimized prompt.
        </p>
      </div>

      <!-- Premium Controls Bar -->
      <div class="card animate-fade-in-up stagger-2" style="margin-bottom:32px; padding:24px;">
        <div style="display:grid; grid-template-columns:1fr; gap:20px;" id="controls-grid">
          <!-- Mode Select Wrapper -->
          <div style="display:flex; flex-direction:column; gap:8px;">
            <span class="label-sm" style="color:var(--on-surface-variant); font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Optimization Mode</span>
            <div class="dropdown-select-wrapper">
              <span class="material-symbols-outlined dropdown-select-icon" id="mode-icon">tune</span>
              <select id="mode-select" class="dropdown-select">
                <option value="general" selected>General (Balanced & Professional)</option>
                <option value="developer">Developer (Code, Architecture, Tech Stack)</option>
                <option value="creative">Creative (Storytelling, Descriptive, Vivid)</option>
                <option value="technical">Technical (Precise, Systems & Logic)</option>
              </select>
              <span class="material-symbols-outlined dropdown-select-chevron">keyboard_arrow_down</span>
            </div>
          </div>

          <!-- AI Model Select Wrapper -->
          <div style="display:flex; flex-direction:column; gap:8px;">
            <span class="label-sm" style="color:var(--on-surface-variant); font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Target AI Model</span>
            <div class="dropdown-select-wrapper">
              <span class="material-symbols-outlined dropdown-select-icon" id="model-icon">smart_toy</span>
              <select id="model-select" class="dropdown-select">
                <option value="chatgpt" selected>ChatGPT (GPT-4o / GPT-4)</option>
                <option value="claude">Claude (3.5 Sonnet / Opus)</option>
                <option value="gemini">Gemini (1.5 Pro / Flash)</option>
                <option value="cursor">Cursor (Developer Assistant)</option>
                <option value="lovable">Lovable (Full-stack builder)</option>
                <option value="bolt">Bolt.new (Web container sandbox)</option>
              </select>
              <span class="material-symbols-outlined dropdown-select-chevron">keyboard_arrow_down</span>
            </div>
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
          <div id="enhanced-output" class="enhanced-output-container">
            <div id="enhanced-placeholder" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:var(--on-surface-variant);max-width:320px;padding:20px;text-align:center;">
              <div style="width:60px;height:60px;border-radius:50%;background:rgba(119,90,25,0.06);display:flex;align-items:center;justify-content:center;margin-bottom:4px;border:1px solid rgba(119,90,25,0.15);box-shadow:0 8px 24px rgba(119,90,25,0.05);animation:float 3s ease-in-out infinite;">
                <span class="material-symbols-outlined" style="font-size:28px;color:var(--primary);">auto_awesome</span>
              </div>
              <p style="font-size:var(--fs-body-lg);font-weight:700;margin:0;color:var(--on-surface);letter-spacing:-0.01em;">Your enhanced prompt will appear here...</p>
              <p style="font-size:var(--fs-label-sm);opacity:0.75;margin:0;line-height:1.5;">Select a mode and AI model, paste your rough idea in the editor, and click <strong>Enhance Prompt</strong> to transform it.</p>
            </div>
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
        #controls-grid { grid-template-columns:1fr 1fr !important; }
      }
      #enhance-btn:disabled { opacity:.6; cursor:not-allowed; }
      .typing-cursor { display:inline-block; width:2px; height:1em; background:var(--primary); animation:blink 1s infinite; margin-left:2px; vertical-align:text-bottom; }

      .dropdown-select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        background: var(--surface-container-low);
        border: 1.5px solid var(--outline-variant);
        border-radius: var(--radius);
        height: 52px;
        padding: 0 16px 0 48px;
        transition: all 300ms var(--ease-out);
        cursor: pointer;
      }
      .dropdown-select-wrapper:hover {
        background: var(--surface-container-high);
        border-color: var(--outline);
        box-shadow: 0 2px 12px rgba(119, 90, 25, 0.05);
      }
      .dropdown-select-wrapper:focus-within {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(119, 90, 25, 0.15);
      }
      .dropdown-select-icon {
        position: absolute;
        left: 16px;
        color: var(--primary);
        font-size: 20px;
        pointer-events: none;
        transition: transform 0.3s var(--ease-out);
      }
      .dropdown-select-chevron {
        position: absolute;
        right: 16px;
        color: var(--on-surface-variant);
        font-size: 20px;
        pointer-events: none;
      }
      .dropdown-select {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        font-family: var(--font-sans);
        font-size: var(--fs-body-md);
        font-weight: 500;
        color: var(--on-surface);
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        padding-right: 24px;
      }
      .enhanced-output-container {
        flex: 1;
        min-height: 320px;
        padding: 24px;
        border-radius: var(--radius);
        background: var(--surface-container-lowest);
        border: 1px solid var(--outline-variant);
        font-family: var(--font-sans);
        font-size: var(--fs-body-md);
        line-height: 1.7;
        color: var(--on-surface);
        white-space: pre-wrap;
        box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 300ms var(--ease-out);
      }
      .enhanced-output-container.has-content {
        display: block;
        text-align: left;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
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
