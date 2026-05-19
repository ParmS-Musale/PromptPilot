// ── History Page ──
import { supabase } from '../lib/supabase.js';

export function renderHistory() {
  return `
    <section style="margin-top:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:32px;">
        <div>
          <h1 class="headline-lg animate-fade-in-up">Prompt History</h1>
          <p class="body-md animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);" id="history-count">Loading history...</p>
        </div>
        <button class="btn btn-outline btn-sm animate-fade-in-up stagger-1" id="clear-history" style="display: none;">
          <span class="material-symbols-outlined" style="font-size:16px;">delete_sweep</span>
          Clear All
        </button>
      </div>

      <div id="history-container" class="animate-fade-in-up stagger-2">
        <div style="text-align:center;padding:48px 0;">
          <span class="material-symbols-outlined" style="font-size:48px;animation:spin 1s infinite linear;display:inline-block;">sync</span>
          <p style="margin-top:12px;color:var(--on-surface-variant);">Loading history...</p>
        </div>
      </div>
    </section>

    <style>
      @media(min-width:768px){ .history-grid { grid-template-columns:1fr 1fr !important; } }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  `;
}

export async function initHistory() {
  const container = document.getElementById('history-container');
  const countEl = document.getElementById('history-count');
  const clearBtn = document.getElementById('clear-history');
  if (!container) return;

  const user = JSON.parse(localStorage.getItem('pp_user'));
  let history = [];

  if (user) {
    try {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        throw error;
      }
      history = (data || []).map(item => ({
        id: item.id,
        original: item.original,
        enhanced: item.enhanced,
        mode: item.mode,
        model: item.model,
        date: item.created_at || new Date().toISOString()
      }));
    } catch (err) {
      console.error('Error fetching from Supabase history:', err);
      // Fallback to local storage
      history = JSON.parse(localStorage.getItem('pp_history') || '[]');
    }
  } else {
    // Guest: load from local storage
    history = JSON.parse(localStorage.getItem('pp_history') || '[]');
  }

  // Update clear button handler
  if (clearBtn) {
    if (history.length > 0) {
      clearBtn.style.display = 'flex';
      clearBtn.onclick = async () => {
        if (confirm('Are you sure you want to clear your entire history?')) {
          clearBtn.disabled = true;
          clearBtn.textContent = 'Clearing...';
          
          if (user) {
            try {
              const { error } = await supabase
                .from('history')
                .delete()
                .eq('user_id', user.id);
              if (error) throw error;
            } catch (err) {
              console.error('Failed to delete Supabase history:', err);
            }
          }
          // Also clear local cache
          localStorage.removeItem('pp_history');
          
          // Re-initialize/refresh
          initHistory();
        }
      };
    } else {
      clearBtn.style.display = 'none';
    }
  }

  // Render items
  if (countEl) {
    countEl.textContent = history.length === 0 
      ? 'Your saved and enhanced prompts appear here.' 
      : `${history.length} saved prompt${history.length > 1 ? 's' : ''}`;
  }

  if (history.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined">history</span>
        <h3>No prompts yet</h3>
        <p>Start by enhancing your first prompt. Your history will be saved automatically.</p>
        <a href="#/enhance" class="btn btn-gold" style="margin-top:12px;">Enhance a Prompt</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:16px;">
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
              <a href="#/enhance" class="btn btn-outline btn-sm btn-re-enhance" data-prompt="${escapeForAttr(item.original)}">Re-enhance</a>
              <button class="btn btn-outline btn-sm btn-copy" data-enhanced="${escapeForAttr(item.enhanced)}">
                <span class="material-symbols-outlined" style="font-size:14px;">content_copy</span>
                Copy
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach copy and re-enhance event listeners dynamically
  container.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-enhanced');
      navigator.clipboard.writeText(text).then(() => {
        const icon = btn.querySelector('.material-symbols-outlined');
        btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;">check</span> Copied';
        setTimeout(() => {
          btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:14px;">content_copy</span> Copy';
        }, 2000);
      });
    });
  });

  container.querySelectorAll('.btn-re-enhance').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      localStorage.setItem('pp_prefilled_prompt', prompt);
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escapeForAttr(str) {
  return str.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
}
