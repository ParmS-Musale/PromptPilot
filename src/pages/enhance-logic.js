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
- Optimize for ${model} — use its strengths in reasoning and code generation

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

  if (!input || !enhanceBtn) return;

  let currentMode = 'general';
  let currentModel = 'chatgpt';

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

  // Mode chips
  document.querySelectorAll('.mode-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.mode-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentMode = chip.dataset.mode;
    });
  });

  // Model chips
  document.querySelectorAll('.model-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.model-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentModel = chip.dataset.model;
    });
  });

  // Enhance
  enhanceBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) { input.focus(); return; }

    enhanceBtn.disabled = true;
    enhanceBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;animation:blink 1s infinite;">auto_awesome</span> Enhancing...';
    output.innerHTML = '<span class="typing-cursor"></span>';

    const enhanced = generateEnhanced(text, currentMode, currentModel);

    // Simulate typing
    await typeText(output, enhanced, 8);

    enhanceBtn.disabled = false;
    enhanceBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">auto_awesome</span> Enhance Prompt';

    // Show scores
    scoreSection.hidden = false;
    animateScores();

    // Save to history
    saveToHistory(text, enhanced, currentMode, currentModel);
  });

  // Copy
  copyBtn.addEventListener('click', () => {
    const text = output.textContent;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">check</span>';
      setTimeout(() => {
        copyBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">content_copy</span>';
      }, 2000);
    });
  });

  // Save
  saveBtn.addEventListener('click', () => {
    saveBtn.innerHTML = '<span class="material-symbols-outlined filled" style="font-size:16px;">bookmark</span>';
    setTimeout(() => {
      saveBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">bookmark_border</span>';
    }, 2000);
  });
}

async function typeText(el, text, speed = 10) {
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
