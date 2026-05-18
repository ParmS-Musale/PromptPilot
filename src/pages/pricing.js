// ── Pricing Page ──
export function renderPricing() {
  return `
    <section style="margin-top:8px;text-align:center;">
      <h1 class="headline-lg animate-fade-in-up">Simple, Transparent Pricing</h1>
      <p class="body-lg animate-fade-in-up stagger-1" style="color:var(--on-surface-variant);max-width:480px;margin:8px auto 0;">
        Start free. Upgrade when you're ready. No hidden fees.
      </p>

      <!-- Toggle -->
      <div class="toggle-group pricing-toggle animate-fade-in-up stagger-2" style="margin:28px auto;">
        <button class="active" data-period="monthly">Monthly</button>
        <button data-period="yearly">Yearly <span style="font-size:11px;color:var(--primary);font-weight:600;margin-left:4px;">-20%</span></button>
      </div>

      <!-- Pricing Cards -->
      <div style="display:grid;grid-template-columns:1fr;gap:20px;max-width:960px;margin:0 auto;text-align:left;" class="pricing-grid animate-fade-in-up stagger-3">
        <!-- Free -->
        <div class="pricing-card">
          <span class="label-sm" style="text-transform:uppercase;letter-spacing:.1em;color:var(--on-surface-variant);">Free</span>
          <div style="margin:16px 0;">
            <span class="price" data-monthly="₹0" data-yearly="₹0">₹0</span>
            <span class="price-period">/month</span>
          </div>
          <p class="body-md" style="color:var(--on-surface-variant);">Perfect for trying out PromptPilot.</p>
          <ul class="feature-list">
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> 10 enhancements/day</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> General mode only</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> Basic templates</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> Prompt history (7 days)</li>
          </ul>
          <a href="#/enhance" class="btn btn-outline" style="width:100%;margin-top:auto;">Get Started</a>
        </div>

        <!-- Pro -->
        <div class="pricing-card featured">
          <div style="position:absolute;top:-1px;left:50%;transform:translateX(-50%);">
            <span style="background:var(--inverse-primary);color:var(--on-primary-fixed);padding:4px 16px;border-radius:0 0 var(--radius-sm) var(--radius-sm);font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;">Most Popular</span>
          </div>
          <span class="label-sm" style="text-transform:uppercase;letter-spacing:.1em;color:var(--inverse-on-surface);opacity:.7;">Pro</span>
          <div style="margin:16px 0;">
            <span class="price" data-monthly="₹999" data-yearly="₹799">₹999</span>
            <span class="price-period">/month</span>
          </div>
          <p class="body-md" style="opacity:.8;">For developers and power users.</p>
          <ul class="feature-list">
            <li><span class="material-symbols-outlined filled">check_circle</span> Unlimited enhancements</li>
            <li><span class="material-symbols-outlined filled">check_circle</span> All modes (Developer, Creative, Technical)</li>
            <li><span class="material-symbols-outlined filled">check_circle</span> All templates + custom</li>
            <li><span class="material-symbols-outlined filled">check_circle</span> AI model selection</li>
            <li><span class="material-symbols-outlined filled">check_circle</span> Prompt quality analysis</li>
            <li><span class="material-symbols-outlined filled">check_circle</span> Unlimited history</li>
            <li><span class="material-symbols-outlined filled">check_circle</span> Browser extension</li>
          </ul>
          <a href="#/enhance" class="btn" style="width:100%;margin-top:auto;background:var(--inverse-primary);color:var(--on-primary-fixed);">Start Pro Trial</a>
        </div>

        <!-- Enterprise -->
        <div class="pricing-card">
          <span class="label-sm" style="text-transform:uppercase;letter-spacing:.1em;color:var(--on-surface-variant);">Enterprise</span>
          <div style="margin:16px 0;">
            <span class="price">Custom</span>
          </div>
          <p class="body-md" style="color:var(--on-surface-variant);">For teams and organizations.</p>
          <ul class="feature-list">
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> Everything in Pro</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> Team workspace</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> API access</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> SSO / SAML</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> Priority support</li>
            <li><span class="material-symbols-outlined filled" style="color:var(--primary-container);">check_circle</span> Custom integrations</li>
          </ul>
          <button class="btn btn-outline" style="width:100%;margin-top:auto;">Contact Sales</button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section style="margin-top:72px;max-width:720px;margin-left:auto;margin-right:auto;">
      <h2 class="headline-md" style="text-align:center;margin-bottom:32px;font-weight:700;">Frequently Asked Questions</h2>
      <div class="animate-fade-in-up stagger-4">
        ${faq('What AI models does PromptPilot support?','PromptPilot optimizes prompts for ChatGPT, Claude, Gemini, Cursor, Copilot, Lovable, Bolt.new, Replit AI, and Windsurf. Each model gets specialized enhancement tuned to its strengths.')}
        ${faq('Is my data private?','Yes. We don\'t store your prompts on our servers. All enhancement happens in real-time, and your history is stored locally in your browser.')}
        ${faq('Can I use PromptPilot for coding?','Absolutely! Our Developer mode is specifically designed for coding prompts — it adds tech stack details, architecture patterns, error handling, and best practices automatically.')}
        ${faq('Do you offer a browser extension?','Yes! Pro users get access to our browser extension that works directly inside ChatGPT, Claude, Gemini, and other AI interfaces. One-click enhancement without leaving your workflow.')}
        ${faq('Can I cancel anytime?','Yes, you can cancel your subscription at any time. No questions asked, no hidden fees.')}
      </div>
    </section>

    <style>
      @media(min-width:768px){ .pricing-grid { grid-template-columns:repeat(3,1fr) !important; } }
    </style>
  `;
}

function faq(q, a) {
  return `
    <div class="accordion-item">
      <button class="accordion-header">
        <span>${q}</span>
        <span class="material-symbols-outlined">expand_more</span>
      </button>
      <div class="accordion-body">
        <div class="accordion-body-inner">${a}</div>
      </div>
    </div>
  `;
}
