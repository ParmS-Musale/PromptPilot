// ── PromptPilot Background Service Worker ──

const DEFAULT_GEMINI_KEY = "AIzaSyAtUKnhPZlyVIe6fjnpItdyi_f-L-wbGbk";

// Initialize defaults on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["gemini_api_key", "optimization_mode", "target_model"], (data) => {
    const updates = {};
    if (!data.gemini_api_key) {
      updates.gemini_api_key = DEFAULT_GEMINI_KEY;
    }
    if (!data.optimization_mode) {
      updates.optimization_mode = "general";
    }
    if (!data.target_model) {
      updates.target_model = "chatgpt";
    }
    if (Object.keys(updates).length > 0) {
      chrome.storage.local.set(updates, () => {
        console.log("PromptPilot Extension initialized with default values:", updates);
      });
    }
  });
});

// cleanMarkdown strips hashes and asterisks from markdown text
function cleanMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/^#+\s*(.*)$/gm, "$1") // Remove markdown header hashes
    .replace(/\*{1,2}/g, "")        // Remove bold/italic asterisks
    .trim();
}

// Call Gemini API to enhance prompt
async function callGeminiAPI(text, mode, model, apiKey) {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please open the PromptPilot extension popup to configure it.");
  }

  const modeInstructions = {
    general: "clear, professional, and comprehensive",
    developer: "senior full-stack engineer, technical, implementation-ready with industry best practices",
    creative: "world-class creative director and storyteller, imaginative, vivid, and emotionally engaging",
    technical: "technical architect, precise, detailed, architecture patterns, and scalability considerations",
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
5. IMPORTANT: Your response must contain ONLY the final enhanced prompt itself. Do NOT include any conversational introduction, pleasantries, or explanations like "Here is your enhanced prompt:". The user must be able to copy the entire response and paste it directly as a ready-to-run prompt.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        ]
      })
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `HTTP error ${response.status}`);
  }

  const data = await response.json();
  const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!enhancedText) {
    throw new Error("Invalid response structure from Gemini API");
  }

  return cleanMarkdown(enhancedText.trim());
}

// Message Router
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "enhance_prompt") {
    // Retrieve configuration from local storage
    chrome.storage.local.get(["gemini_api_key", "optimization_mode", "target_model"], async (settings) => {
      const apiKey = settings.gemini_api_key || DEFAULT_GEMINI_KEY;
      const mode = settings.optimization_mode || "general";
      const model = settings.target_model || "chatgpt";
      
      try {
        const enhancedPrompt = await callGeminiAPI(message.text, mode, model, apiKey);
        sendResponse({ success: true, text: enhancedPrompt });
      } catch (error) {
        console.error("PromptPilot enhancement failed:", error);
        sendResponse({ success: false, error: error.message });
      }
    });
    
    // Return true to keep sendResponse open for async response
    return true;
  }
});
