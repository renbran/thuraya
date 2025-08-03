// JotForm Chatbot Configuration
export const CHATBOT_CONFIG = {
  // JotForm Agent ID
  AGENT_ID: '0198703ffa427218a332abfed80d7948f032',
  
  // Base URL for JotForm chatbot
  BASE_URL: 'https://cdn.jotfor.ms/agent/embedjs',
  
  // Default settings
  DEFAULT_SETTINGS: {
    skipWelcome: true,
    maximizable: true,
    enabled: true,
  },
  
  // Build the complete script URL
  getScriptUrl: (settings = CHATBOT_CONFIG.DEFAULT_SETTINGS) => {
    const params = new URLSearchParams({
      skipWelcome: settings.skipWelcome ? '1' : '0',
      maximizable: settings.maximizable ? '1' : '0',
    });
    
    return `${CHATBOT_CONFIG.BASE_URL}/${CHATBOT_CONFIG.AGENT_ID}/embed.js?${params.toString()}`;
  },
  
  // Chatbot display preferences
  DISPLAY_CONFIG: {
    // Show on all pages
    enabledOnAllPages: true,
    
    // Specific pages where chatbot should be disabled (if needed)
    disabledOnPages: [],
    
    // Delay before showing chatbot (in milliseconds)
    showDelay: 2000,
    
    // Position and styling options
    position: 'bottom-right',
    
    // Custom styling options
    customCSS: {
      // You can add custom CSS here if needed
      zIndex: 9999,
    }
  },
  
  // Lead integration settings
  LEAD_INTEGRATION: {
    // Track chatbot interactions in Odoo CRM
    trackInOdoo: true,
    
    // Default lead source for chatbot conversations
    leadSource: 'Website Chatbot',
    
    // Lead tags for chatbot conversations
    leadTags: ['Chatbot', 'Website Inquiry'],
  }
};

// Utility function to check if chatbot should be enabled on current page
export const shouldEnableChatbot = (pathname: string): boolean => {
  const { enabledOnAllPages, disabledOnPages } = CHATBOT_CONFIG.DISPLAY_CONFIG;
  
  if (!enabledOnAllPages) return false;
  
  return !disabledOnPages.some(page => pathname.includes(page));
};

// Utility function to initialize chatbot with custom settings
export const initializeChatbot = (customSettings?: Partial<typeof CHATBOT_CONFIG.DEFAULT_SETTINGS>) => {
  const settings = { ...CHATBOT_CONFIG.DEFAULT_SETTINGS, ...customSettings };
  const scriptUrl = CHATBOT_CONFIG.getScriptUrl(settings);
  
  // Check if script already exists
  const existingScript = document.querySelector(`script[src*="${CHATBOT_CONFIG.AGENT_ID}"]`);
  if (existingScript) return;
  
  // Create and append script
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  
  // Add error handling
  script.onerror = () => {
    console.error('Failed to load JotForm chatbot script');
  };
  
  script.onload = () => {
    console.log('JotForm chatbot loaded successfully');
  };
  
  document.head.appendChild(script);
};
