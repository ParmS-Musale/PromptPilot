// ── Enhance Page Logic (mock AI) ──
import { supabase } from '../lib/supabase.js';
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

function calculateLocalScoresAndSuggestions(text, mode, model) {
  const cleaned = text.trim();
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  
  let clarity = 50;
  let detail = 40;
  let compat = 50;
  let structure = 40;
  const suggestions = [];

  // Clarity assessment
  if (wordCount < 5) {
    clarity = 30;
    suggestions.push("Your prompt is very short. Describe the task in more detail to improve clarity.");
  } else if (wordCount < 15) {
    clarity = 60;
    suggestions.push("Add a specific role or context to help the AI understand your perspective.");
  } else {
    clarity = 80 + Math.min(15, Math.floor(wordCount / 5));
  }

  // Detail assessment
  if (wordCount < 10) {
    detail = Math.max(20, wordCount * 4);
    suggestions.push("Describe the technologies, formats, or criteria you want the AI to use.");
  } else {
    detail = Math.min(95, 45 + Math.floor(wordCount * 1.5));
  }

  // Technical stack details suggestion
  const techKeywords = ['react', 'vue', 'next', 'angular', 'python', 'node', 'express', 'database', 'sql', 'api', 'css', 'html', 'git', 'auth', 'stripe', 'payment'];
  const hasTech = techKeywords.some(kw => cleaned.toLowerCase().includes(kw));
  if (!hasTech && (mode === 'developer' || mode === 'technical')) {
    detail = Math.max(30, detail - 15);
    suggestions.push("Specify the programming languages, frameworks, or libraries (e.g., React, Node) you want to use.");
  }

  // AI Compatibility assessment
  const aiKeywords = ['act as', 'persona', 'role', 'format', 'output', 'constraint', 'limit', 'rule', 'do not', 'should'];
  const matchedAiKeywords = aiKeywords.filter(kw => cleaned.toLowerCase().includes(kw)).length;
  compat = Math.min(98, 50 + (matchedAiKeywords * 12));
  
  if (matchedAiKeywords === 0) {
    suggestions.push("Use prompt engineering patterns like role assignment ('Act as...') and negative constraints ('Do not...').");
  }

  // Structure assessment
  const hasNewlines = cleaned.includes('\n');
  const hasBullets = cleaned.includes('- ') || cleaned.includes('* ') || /^\d+\./m.test(cleaned);
  
  if (hasBullets) {
    structure = 90;
  } else if (hasNewlines) {
    structure = 70;
    suggestions.push("Use bullet points or numbered lists to structure your requirements clearly.");
  } else {
    structure = 45;
    suggestions.push("Organize your prompt into distinct sections (e.g., Task, Requirements, Output Format) using line breaks.");
  }

  // Ensure reasonable bounds
  clarity = Math.max(10, Math.min(98, clarity));
  detail = Math.max(10, Math.min(98, detail));
  compat = Math.max(10, Math.min(98, compat));
  structure = Math.max(10, Math.min(98, structure));

  if (suggestions.length === 0) {
    suggestions.push("Your prompt is well-optimized! Try applying it to different models to compare outputs.");
  }

  return {
    scores: { clarity, detail, compat, structure },
    suggestions
  };
}

async function callGeminiAPI(text, mode, model) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_COPIED_GEMINI_KEY_HERE') {
    throw new Error('API key is not configured');
  }

  const modeInstructions = {
    general: 'clear, professional, and comprehensive',
    developer: 'senior full-stack engineer, technical, implementation-ready with industry best practices',
    creative: 'world-class creative director and storyteller, imaginative, vivid, and emotionally engaging',
    technical: 'technical architect, precise, detailed, architecture patterns, and scalability considerations',
  };

  const selectedStyle = modeInstructions[mode] || modeInstructions.general;

  const systemInstruction = `You are PromptPilot, an expert AI prompt engineer.
Your task is to take a raw, poorly structured user prompt and transform it into a premium, optimized prompt.
The enhanced prompt must be tailor-made for the target AI model: "${model.toUpperCase()}".
The optimization mode is: "${mode.toUpperCase()}".

Guidelines for enhancement:
1. Act as a professional prompt engineer.
2. Structure the enhanced prompt clearly using clean markdown (use headers, bullet points, numbered lists, and code blocks as appropriate).
3. The prompt should adopt a persona/role suitable for the task, list clear step-by-step requirements, specify the expected output format, list constraints, and include considerations for edge cases.
4. Adhere strictly to the requested mode style: "${selectedStyle}".

You must respond with a JSON object in this exact format:
{
  "enhanced": "The fully enhanced prompt content here, formatted in markdown.",
  "scores": {
    "clarity": <integer between 0 and 100>,
    "detail": <integer between 0 and 100>,
    "compat": <integer between 0 and 100>,
    "structure": <integer between 0 and 100>
  },
  "suggestions": [
    "<string explaining what was missing or how to improve the original prompt>",
    "<another feedback point>"
  ]
}

Ensure your response is valid JSON and contains no other text outside the JSON block.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemInstruction}\n\nRaw prompt to enhance:\n"${text}"`
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `HTTP error ${response.status}`);
  }

  const data = await response.json();
  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) {
    throw new Error('Invalid response structure from Gemini API');
  }

  try {
    return JSON.parse(textResponse.trim());
  } catch (parseError) {
    console.warn("Gemini returned invalid JSON, attempting raw parsing fallback:", parseError);
    const fallbackAnalysis = calculateLocalScoresAndSuggestions(text, mode, model);
    return {
      enhanced: textResponse,
      scores: fallbackAnalysis.scores,
      suggestions: fallbackAnalysis.suggestions
    };
  }
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

    let enhancedText = '';
    let scoresObj = null;
    let suggestionsArr = [];

    try {
      const result = await callGeminiAPI(text, currentMode, currentModel);
      enhancedText = result.enhanced;
      scoresObj = result.scores;
      suggestionsArr = result.suggestions;
    } catch (error) {
      console.warn('Gemini API call failed, falling back to local template engine:', error);
      enhancedText = generateEnhanced(text, currentMode, currentModel);
      const localAnalysis = calculateLocalScoresAndSuggestions(text, currentMode, currentModel);
      scoresObj = localAnalysis.scores;
      suggestionsArr = localAnalysis.suggestions;
    }

    // Simulate typing
    await typeText(output, enhancedText, 8);

    enhanceBtn.disabled = false;
    enhanceBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">auto_awesome</span> Enhance Prompt';

    // Show scores
    if (scoreSection) {
      scoreSection.hidden = false;
      animateScores(scoresObj);
    }

    // Show suggestions
    displaySuggestions(suggestionsArr);

    // Save to history
    saveToHistory(text, enhancedText, currentMode, currentModel);
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

function animateScores(scores) {
  if (!scores) {
    scores = { clarity: 0, detail: 0, compat: 0, structure: 0 };
  }
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

function displaySuggestions(suggestions) {
  const listEl = document.getElementById('suggestions-list');
  const containerEl = document.getElementById('suggestions-container');
  if (!listEl) return;

  listEl.innerHTML = '';
  if (suggestions && suggestions.length > 0) {
    if (containerEl) containerEl.style.display = 'block';
    suggestions.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      listEl.appendChild(li);
    });
  } else {
    if (containerEl) containerEl.style.display = 'none';
  }
}

async function saveToHistory(original, enhanced, mode, model) {
  const user = JSON.parse(localStorage.getItem('pp_user'));
  
  if (user) {
    try {
      const { error } = await supabase.from('history').insert({
        original,
        enhanced,
        mode,
        model,
        user_id: user.id
      });
      if (error) {
        console.error('Failed to save to Supabase history:', error);
      }
    } catch (err) {
      console.error('Error saving history to Supabase:', err);
    }
  } else {
    // Guest user: save to localStorage
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
}
