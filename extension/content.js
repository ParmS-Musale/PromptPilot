// ── PromptPilot Content Script ──

const SELECTORS = [
  'textarea#prompt-textarea',                               // ChatGPT
  'div[contenteditable="true"][aria-label*="prompt" i]',    // Gemini / general
  'div[contenteditable="true"][aria-label*="message" i]',   // Claude / general
  'div[contenteditable="true"][aria-label*="ask" i]',      // Gemini / general
  'div[contenteditable="true"][placeholder*="claude" i]',   // Claude alternative
  'div[contenteditable="true"][placeholder*="gemini" i]',   // Gemini alternative
  'div[contenteditable="true"].ProseMirror',                // Claude editor
  'div[contenteditable="true"].ql-editor',                  // Gemini editor
  'textarea[placeholder*="message" i]',                     // General textareas
  'textarea[placeholder*="prompt" i]',
  'textarea[placeholder*="ask" i]'
];

function showTooltipMessage(btn, message) {
  const tooltip = btn.querySelector('.promptpilot-tooltip');
  if (tooltip) {
    const originalText = tooltip.getAttribute('data-original-text') || "Enhance with PromptPilot";
    tooltip.textContent = message;
    tooltip.classList.add('promptpilot-tooltip-visible');
    
    setTimeout(() => {
      tooltip.textContent = originalText;
      tooltip.classList.remove('promptpilot-tooltip-visible');
    }, 3000);
  }
}

function triggerEnhance(inputEl, btn) {
  let text = '';
  if (inputEl.tagName === 'TEXTAREA') {
    text = inputEl.value.trim();
  } else {
    text = inputEl.innerText.trim();
  }

  if (!text) {
    showTooltipMessage(btn, "Type something first!");
    return;
  }

  // Set loading state
  btn.classList.add('promptpilot-loading');
  
  // Call background script
  chrome.runtime.sendMessage({ action: "enhance_prompt", text: text }, (response) => {
    btn.classList.remove('promptpilot-loading');
    
    if (response && response.success) {
      const enhancedText = response.text;
      
      // Focus element
      inputEl.focus();
      
      if (inputEl.tagName === 'TEXTAREA') {
        inputEl.value = enhancedText;
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        // Contenteditable selection replacement
        try {
          const range = document.createRange();
          range.selectNodeContents(inputEl);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          document.execCommand('delete', false, null);
          document.execCommand('insertText', false, enhancedText);
        } catch (e) {
          console.warn("execCommand insertText failed, falling back to innerText update:", e);
          inputEl.innerText = enhancedText;
        }
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
      
      showTooltipMessage(btn, "Enhanced!");
    } else {
      const errorMsg = (response && response.error) ? response.error : "Enhancement failed";
      showTooltipMessage(btn, "Error: " + errorMsg);
      console.error("PromptPilot error:", errorMsg);
    }
  });
}

function getInjectionParent(inputEl) {
  const host = window.location.hostname;
  let parent = inputEl.parentElement;
  
  // Site-specific parent overrides to ensure we inject into the actual input pill
  if (host.includes('gemini.google.com')) {
    // Gemini uses <rich-textarea> as the wrapper for the input area
    let richTextarea = inputEl.closest('rich-textarea');
    if (richTextarea) {
      return richTextarea;
    }
  }
  
  if (host.includes('claude.ai')) {
    // Claude uses a container that wraps the ProseMirror editor and buttons.
    // Let's find the closest ancestor that has composer/input classes or is fieldset
    let composer = inputEl.closest('[class*="composer"]') || inputEl.closest('[class*="input"]') || inputEl.closest('fieldset');
    if (composer) {
      return composer;
    }
  }
  
  if (host.includes('chatgpt.com')) {
    // ChatGPT's form is the perfect pill container
    let form = inputEl.closest('form');
    if (form) {
      return form;
    }
  }

  // Fallback heuristic traversal
  while (parent && parent !== document.body && parent.tagName !== 'MAIN' && parent.tagName !== 'ARTICLE') {
    if (
      parent.classList.contains('input-area') ||
      parent.classList.contains('input-container') ||
      parent.classList.contains('text-input-container') ||
      parent.classList.contains('prompt-textarea-wrapper') ||
      parent.querySelector('button') ||
      parent.querySelector('[role="button"]')
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return inputEl.parentElement;
}

function scanAndInject() {
  const inputs = document.querySelectorAll(SELECTORS.join(', '));
  inputs.forEach(inputEl => {
    // Filter out small elements (like headers, search bars, settings inputs)
    if (inputEl.offsetWidth < 150 || inputEl.offsetHeight < 30) {
      return;
    }
    
    // Check if already injected
    if (inputEl.getAttribute('data-promptpilot-injected') === 'true') {
      return;
    }
    
    // Mark as injected
    inputEl.setAttribute('data-promptpilot-injected', 'true');
    
    // Create button container
    const btn = document.createElement('button');
    btn.className = 'promptpilot-enhance-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Enhance with PromptPilot');
    
    // Site-specific class adjustments
    const host = window.location.hostname;
    let siteClass = '';
    if (host.includes('chatgpt.com')) siteClass = 'promptpilot-btn-chatgpt';
    else if (host.includes('claude.ai')) siteClass = 'promptpilot-btn-claude';
    else if (host.includes('gemini.google.com')) siteClass = 'promptpilot-btn-gemini';
    
    if (siteClass) {
      btn.classList.add(siteClass);
    }
    
    btn.innerHTML = `
      <div class="promptpilot-btn-content">
        <svg class="promptpilot-svg" viewBox="0 0 24 24" width="16" height="16">
          <path d="M21 3L3 10.5L9.75 13.5L18.75 6.75L12 14.25L13.5 21L21 3Z" fill="currentColor"></path>
        </svg>
      </div>
      <span class="promptpilot-tooltip" data-original-text="Enhance with PromptPilot">Enhance with PromptPilot</span>
    `;
    
    // Append button inside the parent container of the input element
    const parent = getInjectionParent(inputEl);
    if (parent) {
      // Avoid duplicate buttons in the same parent container
      const existingBtn = parent.querySelector('.promptpilot-enhance-btn');
      if (existingBtn) {
        existingBtn.remove();
      }
      
      parent.classList.add('promptpilot-parent-container');
      parent.appendChild(btn);
      
      // Handle button click
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        triggerEnhance(inputEl, btn);
      });
    }
  });
}

// Initial Scan
scanAndInject();

// Setup observer to continuously watch for DOM mutations (important for SPAs)
const observer = new MutationObserver((mutations) => {
  scanAndInject();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Periodic fallback polling just in case observer misses dynamic renders
setInterval(scanAndInject, 1500);
