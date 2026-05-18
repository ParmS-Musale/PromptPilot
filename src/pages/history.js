// ── History Page ──
export function renderHistory() {
  const history = JSON.parse(localStorage.getItem('pp_history') || '[]');

  if (history.length === 0) {
    return `
      <section style="margin-top:8px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 class="headline-lg animate-fade-in-up">Prompt History</h1>
          <p class="body-lg animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);">Your saved and enhanced prompts appear here.</p>
        </div>
        <div class="empty-state animate-fade-in-up stagger-2">
          <span class="material-symbols-outlined">history</span>
          <h3>No prompts yet</h3>
          <p>Start by enhancing your first prompt. Your history will be saved automatically.</p>
          <a href="#/enhance" class="btn btn-gold" style="margin-top:12px;">Enhance a Prompt</a>
        </div>
      </section>
    `;
  }

  return `
    <section style="margin-top:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:32px;">
        <div>
          <h1 class="headline-lg animate-fade-in-up">Prompt History</h1>
          <p class="body-md animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);">${history.length} saved prompt${history.length > 1 ? 's' : ''}</p>
        </div>
        <button class="btn btn-outline btn-sm animate-fade-in-up stagger-1" id="clear-history">
          <span class="material-symbols-outlined" style="font-size:16px;">delete_sweep</span>
          Clear All
        </button>
      </div>

      <div style="display:flex;flex-direction:column;gap:16px;" class="animate-fade-in-up stagger-2">
        ${history.map(item => {
          const d = new Date(item.date);
          const dateStr = d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
          const timeStr = d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
          return `
            <div class="card" style="cursor:default;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <span class="badge badge-info">${item.mode || 'general'}</span>
                  <span class="badge badge-success">${item.model || 'chatgpt'}</span>
                </div>
                <span class="label-sm" style="color:var(--outline);">${dateStr} · ${timeStr}</span>
              </div>
              <div style="display:grid;grid-template-columns:1fr;gap:12px;" class="history-grid">
                <div style="padding:12px;border-radius:var(--radius-sm);background:var(--surface-container-low);border:1px solid rgba(209,197,180,.1);">
                  <span class="label-sm" style="color:var(--on-surface-variant);text-transform:uppercase;display:block;margin-bottom:6px;">Original</span>
                  <p class="body-md" style="color:var(--on-surface-variant);font-style:italic;">${escapeHtml(item.original.substring(0, 150))}${item.original.length > 150 ? '...' : ''}</p>
                </div>
                <div style="padding:12px;border-radius:var(--radius-sm);background:var(--surface-container-lowest);border:1px solid rgba(255,255,255,.6);">
                  <span class="label-sm" style="color:var(--primary);text-transform:uppercase;display:block;margin-bottom:6px;">Enhanced</span>
                  <p class="body-md" style="white-space:pre-wrap;">${escapeHtml(item.enhanced.substring(0, 200))}${item.enhanced.length > 200 ? '...' : ''}</p>
                </div>
              </div>
              <div style="margin-top:12px;display:flex;gap:8px;">
                <a href="#/enhance" class="btn btn-outline btn-sm">Re-enhance</a>
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(\`${escapeForAttr(item.enhanced)}\`)">
                  <span class="material-symbols-outlined" style="font-size:14px;">content_copy</span>
                  Copy
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </section>

    <style>
      @media(min-width:768px){ .history-grid { grid-template-columns:1fr 1fr !important; } }
    </style>
  `;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escapeForAttr(str) {
  return str.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
}
