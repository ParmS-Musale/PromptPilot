// ── PromptPilot Popup Logic ──

// IMPORTANT: Do NOT hardcode API keys here. Users must set their own key via the extension popup.
const DEFAULT_GEMINI_KEY = "";

// Selectors
const modeSelect = document.getElementById("mode-select");
const modelSelect = document.getElementById("model-select");
const modeIcon = document.getElementById("mode-icon");
const modelIcon = document.getElementById("model-icon");

const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");

const apiKeyInput = document.getElementById("api-key-input");
const apiKeySave = document.getElementById("api-key-save");
const apiKeyToggleVisibility = document.getElementById("api-key-toggle-visibility");
const visibilityIcon = document.getElementById("visibility-icon");

const apiStatus = document.getElementById("api-status");
const statusBadgeIcon = document.getElementById("status-badge-icon");
const statusBadgeText = document.getElementById("status-badge-text");

const toast = document.getElementById("toast");

// Dropdown Icon Maps (Matching main app)
const modeIcons = {
  general: "tune",
  developer: "code",
  creative: "palette",
  technical: "schema"
};

const modelIcons = {
  chatgpt: "smart_toy",
  claude: "psychology",
  gemini: "auto_awesome",
  cursor: "terminal",
  lovable: "favorite",
  bolt: "bolt"
};

// Toast notification trigger
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Load initial states from chrome storage
function loadSettings() {
  chrome.storage.local.get(["optimization_mode", "target_model", "gemini_api_key"], (settings) => {
    // Mode Select
    const activeMode = settings.optimization_mode || "general";
    modeSelect.value = activeMode;
    if (modeIcons[activeMode]) {
      modeIcon.textContent = modeIcons[activeMode];
    }

    // Model Select
    const activeModel = settings.target_model || "chatgpt";
    modelSelect.value = activeModel;
    if (modelIcons[activeModel]) {
      modelIcon.textContent = modelIcons[activeModel];
    }

    // API Key
    const key = settings.gemini_api_key;
    if (key && key !== DEFAULT_GEMINI_KEY) {
      apiKeyInput.value = key;
      updateStatusBadge(true);
    } else {
      apiKeyInput.value = "";
      updateStatusBadge(false);
    }
  });
}

// Update API Status Badge
function updateStatusBadge(isCustom) {
  if (isCustom) {
    apiStatus.className = "status-badge custom";
    statusBadgeIcon.textContent = "vpn_key";
    statusBadgeText.textContent = "Custom Key Active";
  } else {
    apiStatus.className = "status-badge preloaded";
    statusBadgeIcon.textContent = "warning";
    statusBadgeText.textContent = "No API Key — Please add your Gemini key";
  }
}

// Attach Event Listeners
modeSelect.addEventListener("change", () => {
  const selectedMode = modeSelect.value;
  if (modeIcons[selectedMode]) {
    modeIcon.textContent = modeIcons[selectedMode];
  }
  chrome.storage.local.set({ optimization_mode: selectedMode }, () => {
    showToast("Mode updated!");
  });
});

modelSelect.addEventListener("change", () => {
  const selectedModel = modelSelect.value;
  if (modelIcons[selectedModel]) {
    modelIcon.textContent = modelIcons[selectedModel];
  }
  chrome.storage.local.set({ target_model: selectedModel }, () => {
    showToast("Target model updated!");
  });
});

// Settings collapsible panel toggle
settingsToggle.addEventListener("click", () => {
  settingsPanel.classList.toggle("open");
  settingsToggle.classList.toggle("active");
});

// Toggle API Key text visibility
apiKeyToggleVisibility.addEventListener("click", () => {
  if (apiKeyInput.type === "password") {
    apiKeyInput.type = "text";
    visibilityIcon.textContent = "visibility_off";
  } else {
    apiKeyInput.type = "password";
    visibilityIcon.textContent = "visibility";
  }
});

// Save Custom API Key
apiKeySave.addEventListener("click", () => {
  const newKey = apiKeyInput.value.trim();
  
  if (newKey) {
    chrome.storage.local.set({ gemini_api_key: newKey }, () => {
      updateStatusBadge(true);
      showToast("Custom API Key Saved!");
    });
  } else {
    // Clear and restore pre-loaded key
    chrome.storage.local.set({ gemini_api_key: DEFAULT_GEMINI_KEY }, () => {
      updateStatusBadge(false);
      showToast("Restored pre-loaded key!");
    });
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", loadSettings);
