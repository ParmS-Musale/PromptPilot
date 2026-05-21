// ── Router & App Entry Point ──
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderLanding } from './pages/landing.js';
import { renderEnhance } from './pages/enhance.js';
import { renderTemplates, initTemplates } from './pages/templates.js';
import { renderHistory, initHistory } from './pages/history.js';
import { renderPricing, initPricing } from './pages/pricing.js';
import { renderDocs } from './pages/docs.js';
import { renderAbout } from './pages/about.js';
import { supabase } from './lib/supabase.js';

const routes = {
  '': renderLanding,
  'enhance': renderEnhance,
  'templates': renderTemplates,
  'history': renderHistory,
  'pricing': renderPricing,
  'docs': renderDocs,
  'about': renderAbout,
};

function getRoute() {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  return hash || '';
}

function render() {
  const route = getRoute();
  const app = document.getElementById('app');
  const pageRenderer = routes[route] || routes[''];

  const performSwap = () => {
    const existingNavbar = document.querySelector('.navbar');
    if (existingNavbar) {
      existingNavbar.replaceWith(renderNavbar(route));
    } else {
      app.innerHTML = '';
      app.appendChild(renderNavbar(route));
    }

    let main = document.querySelector('main.page-content');
    if (!main) {
      main = document.createElement('main');
      main.className = 'page-content';
      app.appendChild(main);
    }

    main.innerHTML = pageRenderer();
    main.className = 'page-content page-enter';

    const existingFooter = document.querySelector('.footer');
    if (!existingFooter) {
      app.appendChild(renderFooter());
    } else {
      // Keep footer at bottom
      app.appendChild(existingFooter);
    }

    requestAnimationFrame(() => {
      initPageScripts(route);
      window.scrollTo({ top: 0 });
    });
  };

  const currentMain = document.querySelector('main.page-content');
  if (currentMain) {
    currentMain.classList.remove('page-enter');
    currentMain.classList.add('page-exit');
    setTimeout(performSwap, 200);
  } else {
    performSwap();
  }
}

function initPageScripts(route) {
  // Accordion toggle
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.accordion-item').classList.toggle('open');
    });
  });

  // Mobile menu
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      icon.textContent = mobileMenu.classList.contains('open') ? 'close' : 'menu';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = menuBtn.querySelector('.material-symbols-outlined');
        icon.textContent = 'menu';
      });
    });
  }

  // Pricing toggle
  const toggleBtns = document.querySelectorAll('.pricing-toggle button');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const period = btn.dataset.period;
      document.querySelectorAll('[data-monthly]').forEach(el => {
        el.textContent = period === 'yearly' ? el.dataset.yearly : el.dataset.monthly;
      });
    });
  });

  // Template filter chips
  document.querySelectorAll('.template-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.template-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.category;
      document.querySelectorAll('.template-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  // Page-specific initializers
  if (route === 'enhance') {
    import('./pages/enhance-logic.js').then(m => m.initEnhance());
  } else if (route === 'templates') {
    initTemplates();
  } else if (route === 'history') {
    initHistory();
  } else if (route === 'pricing') {
    initPricing();
  } else if (route === 'docs') {
    // Docs sidebar logic
    const docsLinks = document.querySelectorAll('.docs-link');
    docsLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        docsLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.querySelectorAll('.docs-section').forEach(sec => sec.style.display = 'none');
        const sectionId = link.dataset.section;
        const targetSection = document.getElementById(`section-${sectionId}`);
        if (targetSection) targetSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Sync Supabase Auth state with local storage and trigger UI updates
supabase.auth.onAuthStateChange((event, session) => {
  const currentUser = JSON.parse(localStorage.getItem('pp_user'));
  
  if (session && session.user) {
    const name = session.user.user_metadata?.name || 
                 session.user.user_metadata?.full_name || 
                 session.user.email.split('@')[0];
    const user = {
      id: session.user.id,
      email: session.user.email,
      name: name
    };
    
    if (!currentUser || currentUser.email !== user.email || currentUser.id !== user.id) {
      localStorage.setItem('pp_user', JSON.stringify(user));
      render();
    }
  } else if (event === 'SIGNED_OUT') {
    if (currentUser) {
      localStorage.removeItem('pp_user');
      localStorage.removeItem('pp_user_tier');
      render();
    }
  }
});

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
