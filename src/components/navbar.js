// ── Shared Navbar Component ──
import { supabase } from '../lib/supabase.js';

if (typeof document !== 'undefined') {
  document.addEventListener('click', () => {
    const openDropdowns = document.querySelectorAll('.profile-dropdown.open');
    openDropdowns.forEach(d => d.classList.remove('open'));
  });
}

export function renderNavbar(activeRoute = '') {
  const nav = document.createElement('header');
  nav.className = 'navbar';
  
  const user = JSON.parse(localStorage.getItem('pp_user'));
  const links = [
    { href: '#/', label: 'Home', route: '' },
    { href: '#/enhance', label: 'Enhance', route: 'enhance' },
    { href: '#/templates', label: 'Templates', route: 'templates' },
    { href: '#/pricing', label: 'Pricing', route: 'pricing' },
    { href: '#/docs', label: 'Docs', route: 'docs' },
  ];

  let desktopActions = '';
  let mobileActions = '';

  if (user) {
    const initials = user.name ? user.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 'PP';
    desktopActions = `
      <div class="user-profile-menu">
        <button class="avatar-btn">${initials}</button>
        <div class="profile-dropdown">
          <div class="dropdown-header">
            <div class="user-name">${user.name}</div>
            <div class="user-email">${user.email}</div>
          </div>
          <a href="#/history"><span class="material-symbols-outlined">history</span> History</a>
          <button class="btn-logout"><span class="material-symbols-outlined">logout</span> Sign Out</button>
        </div>
      </div>
    `;
    mobileActions = `
      <div class="mobile-profile-info" style="display:flex;align-items:center;gap:12px;margin-bottom:16px;padding:12px;background:rgba(0,0,0,0.02);border-radius:var(--radius-sm);border:1px solid var(--outline-variant);">
        <div class="avatar-btn" style="width:38px;height:38px;border-radius:50%;background:var(--primary-container);color:var(--on-primary-container);border:1.5px solid var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;">${initials}</div>
        <div style="min-width:0; text-align: left;">
          <div class="user-name" style="font-weight:600;font-size:14px;color:var(--on-surface);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${user.name}</div>
          <div class="user-email" style="font-size:12px;color:var(--on-surface-variant);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${user.email}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-logout" style="width:100%">
        <span class="material-symbols-outlined">logout</span>
        Sign Out
      </button>
    `;
  } else {
    desktopActions = `
      <button class="btn-signin">Sign In</button>
      <a href="#/enhance" class="btn btn-gold btn-sm">Get Started</a>
    `;
    mobileActions = `
      <button class="btn btn-outline btn-signin-mobile" style="width:100%">Sign In</button>
      <a href="#/enhance" class="btn btn-gold" style="width:100%">Get Started Free</a>
    `;
  }

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const themeIcon = currentTheme === 'dark' ? 'light_mode' : 'dark_mode';
  const themeToggleHtml = `
    <button class="theme-toggle-btn" aria-label="Toggle Theme">
      <span class="material-symbols-outlined">${themeIcon}</span>
    </button>
  `;

  nav.innerHTML = `
    <div class="navbar-inner">
      <a href="#/" class="navbar-logo">
        <span class="material-symbols-outlined">flight_takeoff</span>
        <span>PromptPilot</span>
      </a>
      <nav class="navbar-links">
        ${links.map(l => `<a href="${l.href}" class="${activeRoute === l.route ? 'active' : ''}">${l.label}</a>`).join('')}
      </nav>
      <div class="navbar-actions">
        ${themeToggleHtml}
        ${desktopActions}
        <button class="mobile-menu-btn" aria-label="Menu">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
    <div class="mobile-menu">
      ${links.map(l => `<a href="${l.href}" class="${activeRoute === l.route ? 'active' : ''}">
        <span class="material-symbols-outlined">${getMobileIcon(l.route)}</span>
        ${l.label}
      </a>`).join('')}
      <a href="#/history" class="${activeRoute === 'history' ? 'active' : ''}">
        <span class="material-symbols-outlined">history</span>
        History
      </a>
      <a href="#/about" class="${activeRoute === 'about' ? 'active' : ''}">
        <span class="material-symbols-outlined">info</span>
        About
      </a>
      <div class="mobile-menu-actions">
        ${mobileActions}
      </div>
    </div>
  `;

  // Attach event handlers inside returned DOM to ensure full self-contained functionality
  const themeToggleBtn = nav.querySelector('.theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const htmlEl = document.documentElement;
      const currentActiveTheme = htmlEl.getAttribute('data-theme') || 'light';
      const newTheme = currentActiveTheme === 'dark' ? 'light' : 'dark';
      
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('pp_theme', newTheme);
      
      const icon = themeToggleBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        themeToggleBtn.classList.add('rotating');
        setTimeout(() => {
          icon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
          themeToggleBtn.classList.remove('rotating');
        }, 150);
      }
    });
  }

  const openSignIn = () => {
    import('./auth-modal.js').then(m => {
      m.openAuthModal(() => {
        const currentActive = window.location.hash.replace('#/', '').replace('#', '') || '';
        const newNavbar = renderNavbar(currentActive);
        const currentNavbar = document.querySelector('.navbar');
        if (currentNavbar) {
          currentNavbar.replaceWith(newNavbar);
        }
      });
    });
  };

  const signInBtns = nav.querySelectorAll('.btn-signin, .btn-signin-mobile');
  signInBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openSignIn();
  }));

  const avatarBtn = nav.querySelector('.avatar-btn');
  const dropdown = nav.querySelector('.profile-dropdown');
  if (avatarBtn && dropdown) {
    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  const logoutBtns = nav.querySelectorAll('.btn-logout');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await supabase.auth.signOut();
    });
  });

  // Mobile menu button binding
  const menuBtn = nav.querySelector('.mobile-menu-btn');
  const mobileMenu = nav.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = menuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileMenu.classList.contains('open') ? 'close' : 'menu';
      }
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = menuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  return nav;
}

function getMobileIcon(route) {
  const icons = { '': 'home', enhance: 'auto_awesome', templates: 'dashboard', pricing: 'payments', docs: 'menu_book' };
  return icons[route] || 'circle';
}
