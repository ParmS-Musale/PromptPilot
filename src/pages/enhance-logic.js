// ── Enhance Page Logic (mock AI) ──
const enhancementMap = {
  general: {
    prefix: 'Act as an expert assistant.',
    style: 'clear, professional, and comprehensive',
  },
  developer: {
    prefix: 'Act as a senior full-stack software engineer with 10+ years of experience.',
    style: 'technical, implementation-ready, with best practices',
  },
  creative: {
    prefix: 'Act as a world-class creative director and storyteller.',
    style: 'imaginative, vivid, and emotionally engaging',
  },
  technical: {
    prefix: 'Act as a technical architect and systems designer.',
    style: 'precise, detailed, with architecture patterns and scalability considerations',
  },
};

function generateEnhanced(input, mode, model) {
  const cfg = enhancementMap[mode] || enhancementMap.general;
  const cleaned = input.trim();
  if (!cleaned) return '';

  return `${cfg.prefix}

**Task:** ${cleaned}

**Requirements:**
- Provide a ${cfg.style} response
- Include specific implementation details and examples
- Structure the output with clear sections and formatting
- Consider edge cases, error handling, and best practices
- Optimize for ${model.toUpperCase()} — use its strengths in reasoning and code generation

**Output Format:**
- Use markdown with headers, bullet points, and code blocks where appropriate
- Include a brief summary, detailed breakdown, and actionable next steps
- Keep the response focused, avoiding unnecessary filler

**Constraints:**
- Follow current industry standards and conventions
- Prioritize maintainability, scalability, and clean architecture
- Include relevant tech stack recommendations if applicable`;
}

export function initEnhance() {
  const input = document.getElementById('prompt-input');
  const output = document.getElementById('enhanced-output');
  const enhanceBtn = document.getElementById('enhance-btn');
  const copyBtn = document.getElementById('copy-btn');
  const saveBtn = document.getElementById('save-btn');
  const charCount = document.getElementById('char-count');
  const scoreSection = document.getElementById('score-section');

  const modeSelect = document.getElementById('mode-select');
  const modeIcon = document.getElementById('mode-icon');
  const modelSelect = document.getElementById('model-select');
  const modelIcon = document.getElementById('model-icon');

  if (!input || !enhanceBtn) return;

  let currentMode = modeSelect ? modeSelect.value : 'general';
  let currentModel = modelSelect ? modelSelect.value : 'chatgpt';

  // Prefill prompt if dynamic redirect from templates
  const prefilled = localStorage.getItem('pp_prefilled_prompt');
  if (prefilled) {
    input.value = prefilled;
    if (charCount) {
      charCount.textContent = `${prefilled.length} chars`;
    }
    localStorage.removeItem('pp_prefilled_prompt');
  }

  // Char counter
  input.addEventListener('input', () => {
    charCount.textContent = `${input.value.length} chars`;
  });

  // Dropdown Icon Maps
  const modeIcons = {
    general: 'tune',
    developer: 'code',
    creative: 'palette',
    technical: 'schema'
  };

  const modelIcons = {
    chatgpt: 'smart_toy',
    claude: 'psychology',
    gemini: 'auto_awesome',
    cursor: 'terminal',
    lovable: 'favorite',
    bolt: 'bolt'
  };

  // Optimization Mode Dropdown change listener
  if (modeSelect) {
    modeSelect.addEventListener('change', () => {
      currentMode = modeSelect.value;
      if (modeIcon && modeIcons[currentMode]) {
        modeIcon.textContent = modeIcons[currentMode];
      }
    });
  }

  // AI Model Dropdown change listener
  if (modelSelect) {
    modelSelect.addEventListener('change', () => {
      currentModel = modelSelect.value;
      if (modelIcon && modelIcons[currentModel]) {
        modelIcon.textContent = modelIcons[currentModel];
      }
    });
  }

  // Enhance Button click listener
  enhanceBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) { input.focus(); return; }

    enhanceBtn.disabled = true;
    enhanceBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;animation:blink 1s infinite;">auto_awesome</span> Enhancing...';
    
    // Switch styling of output container to has-content (left aligned layout)
    if (output) {
      output.classList.add('has-content');
      output.innerHTML = '<span class="typing-cursor"></span>';
    }

    const enhanced = generateEnhanced(text, currentMode, currentModel);

    // Simulate typing
    await typeText(output, enhanced, 8);

    enhanceBtn.disabled = false;
    enhanceBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">auto_awesome</span> Enhance Prompt';

    // Show scores
    if (scoreSection) {
      scoreSection.hidden = false;
      animateScores();
    }

    // Save to history
    saveToHistory(text, enhanced, currentMode, currentModel);
  });

  // Copy Clipboard listener
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = output ? output.textContent : '';
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">check</span>';
        setTimeout(() => {
          copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">content_copy</span>';
        }, 2000);
      });
    });
  }

  // Save Bookmark listener
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveBtn.innerHTML = '<span class="material-symbols-outlined filled" style="font-size:16px;">bookmark</span>';
      setTimeout(() => {
        saveBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">bookmark_border</span>';
      }, 2000);
    });
  }
}

async function typeText(el, text, speed = 10) {
  if (!el) return;
  el.textContent = '';
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    if (i % 3 === 0) await sleep(speed);
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function animateScores() {
  const scores = { clarity: 92, detail: 88, compat: 95, structure: 90 };
  Object.entries(scores).forEach(([key, val]) => {
    const circle = document.getElementById(`score-${key}`);
    const valEl = document.getElementById(`score-val-${key}`);
    if (!circle || !valEl) return;
    const offset = 264 - (264 * val / 100);
    circle.style.strokeDashoffset = offset;
    // Animate number
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= val) { current = val; clearInterval(interval); }
      valEl.textContent = current;
    }, 20);
  });
}

function saveToHistory(original, enhanced, mode, model) {
  const history = JSON.parse(localStorage.getItem('pp_history') || '[]');
  history.unshift({
    id: Date.now(),
    original,
    enhanced,
    mode,
    model,
    date: new Date().toISOString(),
  });
  if (history.length > 50) history.pop();
  localStorage.setItem('pp_history', JSON.stringify(history));
}
