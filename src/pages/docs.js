// ── Docs Page ──
export function renderDocs() {
  return `
    <section style="margin-top:8px;">
      <div style="display:grid;grid-template-columns:1fr;gap:32px;" class="docs-layout">
        <!-- Sidebar -->
        <nav class="docs-sidebar glass-panel animate-fade-in-up" style="border-radius:var(--radius-lg);padding:24px;position:sticky;top:calc(var(--nav-height) + 16px);align-self:start;">
          <h3 class="label-sm" style="text-transform:uppercase;letter-spacing:.1em;color:var(--on-surface-variant);margin-bottom:16px;">Documentation</h3>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <a href="#/docs" class="docs-link active" data-section="getting-started">
              <span class="material-symbols-outlined" style="font-size:18px;">rocket_launch</span>
              Getting Started
            </a>
            <a href="#/docs" class="docs-link" data-section="enhancement">
              <span class="material-symbols-outlined" style="font-size:18px;">auto_awesome</span>
              Enhancement Modes
            </a>
            <a href="#/docs" class="docs-link" data-section="models">
              <span class="material-symbols-outlined" style="font-size:18px;">smart_toy</span>
              AI Models
            </a>
            <a href="#/docs" class="docs-link" data-section="api">
              <span class="material-symbols-outlined" style="font-size:18px;">api</span>
              API Reference
            </a>
            <a href="#/docs" class="docs-link" data-section="best-practices">
              <span class="material-symbols-outlined" style="font-size:18px;">lightbulb</span>
              Best Practices
            </a>
          </div>
        </nav>

        <!-- Content -->
        <div class="animate-fade-in-up stagger-1" id="docs-content-area">
          
          <!-- Getting Started -->
          <div id="section-getting-started" class="docs-section">
            <div style="margin-bottom:48px;">
              <h1 class="headline-lg" style="margin-bottom:8px;">Getting Started</h1>
              <p class="body-lg" style="color:var(--on-surface-variant);">Learn how to use PromptPilot to transform your AI workflows.</p>
            </div>
            <div class="card" style="margin-bottom:20px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:var(--on-primary);display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-weight:700;font-size:14px;">1</div>
                <h3 class="headline-sm">Write Your Idea</h3>
              </div>
              <p class="body-md" style="color:var(--on-surface-variant);margin-bottom:16px;">Start by typing your rough idea or requirement in the input area. Don't worry about structure or formatting — just express what you need.</p>
              <div style="padding:16px;border-radius:var(--radius-sm);background:var(--surface-container-low);font-family:monospace;font-size:14px;color:var(--on-surface-variant);border:1px solid rgba(209,197,180,.1);">
                "Build me a todo app with React"
              </div>
            </div>
            <div class="card" style="margin-bottom:20px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:var(--on-primary);display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-weight:700;font-size:14px;">2</div>
                <h3 class="headline-sm">Choose Your Mode</h3>
              </div>
              <p class="body-md" style="color:var(--on-surface-variant);margin-bottom:16px;">Select the enhancement mode that matches your use case:</p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                ${modeCard('General','Balanced enhancement for any prompt')}
                ${modeCard('Developer','Technical prompts with stack details & architecture')}
                ${modeCard('Creative','Vivid, imaginative, emotionally engaging prompts')}
                ${modeCard('Technical','System design with scalability & patterns')}
              </div>
            </div>
            <div class="card" style="margin-bottom:20px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:var(--on-primary);display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-weight:700;font-size:14px;">3</div>
                <h3 class="headline-sm">Select AI Target</h3>
              </div>
              <p class="body-md" style="color:var(--on-surface-variant);">Choose which AI model you're targeting. PromptPilot tailors the output format and style to get the best results from each specific model.</p>
            </div>
            <div class="card" style="margin-bottom:20px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:var(--on-primary);display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-weight:700;font-size:14px;">4</div>
                <h3 class="headline-sm">Enhance & Use</h3>
              </div>
              <p class="body-md" style="color:var(--on-surface-variant);">Click "Enhance Prompt" and watch PromptPilot transform your idea into a structured, professional prompt. Copy it, save it, or share it instantly.</p>
            </div>
          </div>

          <!-- Enhancement Modes -->
          <div id="section-enhancement" class="docs-section" style="display:none;">
            <div style="margin-bottom:48px;">
              <h1 class="headline-lg" style="margin-bottom:8px;">Enhancement Modes</h1>
              <p class="body-lg" style="color:var(--on-surface-variant);">PromptPilot offers specialized modes to tailor outputs to your specific use cases.</p>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;">
              ${tipCard('General','Ideal for general inquiries, drafting emails, and everyday tasks. Applies a balanced structure without being overly technical.')}
              ${tipCard('Developer','Automatically injects best practices, specifies tech stacks, adds error handling requirements, and asks for modular code.')}
              ${tipCard('Creative','Enhances storytelling, marketing copy, and design ideas. Encourages vivid imagery and emotional resonance.')}
              ${tipCard('Technical','Focuses on system architecture, database schema design, algorithms, and infrastructure planning.')}
            </div>
          </div>

          <!-- AI Models -->
          <div id="section-models" class="docs-section" style="display:none;">
            <div style="margin-bottom:48px;">
              <h1 class="headline-lg" style="margin-bottom:8px;">AI Models</h1>
              <p class="body-lg" style="color:var(--on-surface-variant);">Optimize your prompts for the exact AI you're using.</p>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;">
              ${tipCard('ChatGPT / OpenAI','Structures prompts to leverage GPT\'s strong reasoning and step-by-step logic.')}
              ${tipCard('Claude / Anthropic','Optimizes for Claude\'s nuanced understanding and large context window, using XML tags for structure.')}
              ${tipCard('Gemini / Google','Formats instructions to maximize Gemini\'s multimodal capabilities and fast retrieval.')}
              ${tipCard('Cursor / AI IDEs','Generates prompts tailored for IDE context, focusing on diffs and inline code generation.')}
            </div>
          </div>

          <!-- API Reference -->
          <div id="section-api" class="docs-section" style="display:none;">
            <div style="margin-bottom:48px;">
              <h1 class="headline-lg" style="margin-bottom:8px;">API Reference</h1>
              <p class="body-lg" style="color:var(--on-surface-variant);">Integrate PromptPilot's enhancement engine directly into your own applications.</p>
            </div>
            <div class="card" style="margin-bottom:20px;">
              <h3 class="headline-sm" style="margin-bottom:12px;">Authentication</h3>
              <p class="body-md" style="color:var(--on-surface-variant);margin-bottom:16px;">Include your API key in the headers of your requests.</p>
              <div style="padding:16px;border-radius:var(--radius-sm);background:var(--surface-container-low);font-family:monospace;font-size:14px;color:var(--on-surface-variant);border:1px solid rgba(209,197,180,.1);">
                Authorization: Bearer YOUR_API_KEY
              </div>
            </div>
            <div class="card" style="margin-bottom:20px;">
              <h3 class="headline-sm" style="margin-bottom:12px;">POST /v1/enhance</h3>
              <p class="body-md" style="color:var(--on-surface-variant);margin-bottom:16px;">Enhance a raw prompt using a specific mode and target model.</p>
              <div style="padding:16px;border-radius:var(--radius-sm);background:var(--surface-container-low);font-family:monospace;font-size:14px;color:var(--on-surface-variant);border:1px solid rgba(209,197,180,.1);">
                {<br>
                &nbsp;&nbsp;"raw_prompt": "Build a React app",<br>
                &nbsp;&nbsp;"mode": "developer",<br>
                &nbsp;&nbsp;"target_model": "claude"<br>
                }
              </div>
            </div>
          </div>

          <!-- Best Practices -->
          <div id="section-best-practices" class="docs-section" style="display:none;">
            <div style="margin-bottom:48px;">
              <h1 class="headline-lg" style="margin-bottom:8px;">Best Practices</h1>
              <p class="body-lg" style="color:var(--on-surface-variant);">Tips to get the most out of your prompts before and after enhancement.</p>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;">
              ${tipCard('Be specific about your goals','Instead of "build an app", say "build a food delivery app with user auth and payment".')}
              ${tipCard('Mention your tech stack','If you have preferences, include them: "using React, Node.js, and PostgreSQL".')}
              ${tipCard('Describe the audience','Tell us who will use it: "for small business owners" or "for college students".')}
              ${tipCard('Include constraints','Mention limits: "must be mobile-responsive" or "budget-friendly hosting".')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <style>
      @media(min-width:768px){
        .docs-layout { grid-template-columns:240px 1fr !important; }
      }
      .docs-link {
        display:flex; align-items:center; gap:10px; padding:10px 12px;
        border-radius:var(--radius-sm); color:var(--on-surface-variant);
        font-size:var(--fs-label-md); font-weight:500; transition:all 200ms;
      }
      .docs-link:hover { background:var(--surface-container-low); }
      .docs-link.active { background:var(--primary-fixed); color:var(--on-primary-fixed); font-weight:600; }
    </style>
  `;
}

function modeCard(title, desc) {
  return `<div style="padding:12px;border-radius:var(--radius-sm);background:var(--surface-container-low);border:1px solid rgba(209,197,180,.08);">
    <span class="label-md" style="font-weight:600;">${title}</span>
    <p style="font-size:13px;color:var(--on-surface-variant);margin-top:4px;">${desc}</p>
  </div>`;
}

function tipCard(title, desc) {
  return `<div class="card" style="border-left:3px solid var(--primary-container);">
    <h4 class="label-md" style="font-weight:600;margin-bottom:4px;">${title}</h4>
    <p class="body-md" style="color:var(--on-surface-variant);">${desc}</p>
  </div>`;
}
