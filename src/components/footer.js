// ── Shared Footer Component ──
export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-brand-logo">
            <span class="material-symbols-outlined">flight_takeoff</span>
            <span>PromptPilot</span>
          </div>
          <p>The elegant workspace for professional prompt engineering. Transform ideas into AI-ready instructions.</p>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <a href="#/enhance">Enhance</a>
          <a href="#/templates">Templates</a>
          <a href="#/pricing">Pricing</a>
          <a href="#/docs">Documentation</a>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <a href="#/docs">Getting Started</a>
          <a href="#/docs">API Reference</a>
          <a href="#/about">About Us</a>
          <a href="#/about">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} PromptPilot. All rights reserved. Built with ✨ for the AI generation.</p>
      </div>
    </div>
  `;
  return footer;
}
