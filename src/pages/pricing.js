// ── Pricing Page ──
import { supabase } from '../lib/supabase.js';

export function renderPricing() {
  const currentTier = localStorage.getItem('pp_user_tier') || 'Free';
  const isPro = currentTier === 'Pro';
  const isEnterprise = currentTier === 'Enterprise';

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
          <a href="#/enhance" class="btn btn-outline" style="width:100%;margin-top:auto;">
            ${currentTier === 'Free' ? 'Current Plan' : 'Get Started'}
          </a>
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
          <button id="upgrade-pro-btn" class="btn" style="width:100%;margin-top:auto;background:var(--inverse-primary);color:var(--on-primary-fixed);">
            ${isPro ? 'Current Plan' : 'Start Pro Trial'}
          </button>
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
          <button id="upgrade-enterprise-btn" class="btn btn-outline" style="width:100%;margin-top:auto;">
            ${isEnterprise ? 'Current Plan' : 'Upgrade Enterprise'}
          </button>
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

export function initPricing() {
  const proBtn = document.getElementById('upgrade-pro-btn');
  const entBtn = document.getElementById('upgrade-enterprise-btn');

  if (proBtn) {
    proBtn.addEventListener('click', () => {
      handleUpgrade('pro');
    });
  }

  if (entBtn) {
    entBtn.addEventListener('click', () => {
      handleUpgrade('enterprise');
    });
  }
}

async function handleUpgrade(plan) {
  const user = JSON.parse(localStorage.getItem('pp_user'));

  // If user is guest, launch auth modal
  if (!user) {
    const { openAuthModal } = await import('../components/auth-modal.js');
    openAuthModal(() => {
      // Trigger upgrade after successful login
      setTimeout(() => {
        handleUpgrade(plan);
      }, 500);
    });
    return;
  }

  // Get active period
  const activeToggle = document.querySelector('.pricing-toggle button.active');
  const period = activeToggle ? activeToggle.dataset.period : 'monthly';

  // Calculate pricing amount
  let amount = 0;
  let planName = '';

  if (plan === 'pro') {
    planName = 'Pro Plan';
    amount = period === 'yearly' ? 799 * 12 * 100 : 999 * 100; // in paise
  } else {
    planName = 'Enterprise Plan';
    amount = 49999 * 100; // custom pricing in paise
  }

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!keyId) {
    alert("Razorpay Key ID is not configured in .env. Please configure VITE_RAZORPAY_KEY_ID to use live payments.");
    return;
  }

  const options = {
    key: keyId,
    amount: amount,
    currency: "INR",
    name: "PromptPilot",
    description: `${planName} (${period === 'yearly' ? 'Yearly' : 'Monthly'})`,
    image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✈️</text></svg>",
    handler: function (response) {
      processSuccess(response.razorpay_payment_id, plan, amount);
    },
    prefill: {
      name: user.name || "",
      email: user.email || "",
      contact: "8010671447"
    },
    theme: {
      color: "#775A19" // brand gold
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Razorpay SDK Failed to load:", err);
    alert("Failed to initialize payment gateway. Please check your network connection.");
  }
}

async function processSuccess(paymentId, plan, amount) {
  const user = JSON.parse(localStorage.getItem('pp_user'));
  const tier = plan === 'pro' ? 'Pro' : 'Enterprise';

  // Save payment details locally
  localStorage.setItem('pp_user_tier', tier);

  // Sync Supabase payments database table
  if (user) {
    try {
      const { error } = await supabase.from('payments').insert({
        payment_id: paymentId,
        amount: amount / 100,
        plan: tier,
        user_id: user.id,
        email: user.email,
        created_at: new Date().toISOString()
      });
      if (error) {
        console.warn("Table 'payments' might not exist in Supabase database schema, skipping record sync:", error);
      }
    } catch (e) {
      console.warn("DB payment insertion failed, skipping sync:", e);
    }
  }

  // Display payment success feedback overlay modal
  showSuccessModal(paymentId, tier, amount);
}

function showSuccessModal(paymentId, tierName, amount) {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop fade-in';
  modal.style.zIndex = '9999';
  modal.innerHTML = `
    <div class="modal-container glass-panel animate-scale-in" style="max-width: 440px; text-align: center; padding: 32px;">
      <div class="checkmark-circle" style="margin: 0 auto 20px; width: 80px; height: 80px; border-radius: 50%; background: rgba(223, 186, 107, 0.1); border: 2px solid var(--primary); display: flex; align-items: center; justify-content: center;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--primary);">check</span>
      </div>
      <h3 class="headline-sm" style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Payment Successful!</h3>
      <p class="body-md" style="color: var(--on-surface-variant); margin-bottom: 24px;">
        Welcome to <strong>PromptPilot ${tierName}</strong>. Your account has been upgraded.
      </p>
      <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--outline-variant); border-radius: var(--radius-sm); padding: 16px; text-align: left; font-size: 13px; line-height: 1.6; margin-bottom: 24px; color: var(--on-surface-variant);">
        <div><strong>Transaction ID:</strong> ${paymentId}</div>
        <div><strong>Amount Paid:</strong> ₹${(amount / 100).toLocaleString('en-IN')}</div>
        <div><strong>Status:</strong> Active</div>
      </div>
      <button id="success-done-btn" class="btn btn-gold" style="width: 100%;">Go to Workspace</button>
      
      <!-- CONFETTI PARTICLES -->
      <div class="confetti-container" style="position: absolute; inset: 0; pointer-events: none; overflow: hidden; border-radius: inherit;"></div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Confetti effect
  const confettiContainer = modal.querySelector('.confetti-container');
  const colors = ['#DFBA6B', '#C29A38', '#FFFFFF', '#775A19', '#E6C687'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = Math.random() * 8 + 4 + 'px';
    p.style.height = Math.random() * 8 + 4 + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.borderRadius = '50%';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = '-10px';
    p.style.opacity = Math.random() * 0.7 + 0.3;
    p.style.animation = `fall ${Math.random() * 2 + 1.5}s linear infinite`;
    confettiContainer.appendChild(p);
  }

  // Inject animation keyframes if not present
  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
      @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(350px) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  const closeSuccess = () => {
    modal.remove();
    document.body.style.overflow = '';
    // Refresh page / navbar elements by reloading page route hash
    window.location.hash = '#/enhance';
  };

  modal.querySelector('#success-done-btn').addEventListener('click', closeSuccess);
}
