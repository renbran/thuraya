import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CHATBOT_CONFIG, shouldEnableChatbot, initializeChatbot } from '../config/chatbotConfig';
import { initializeChatbotTracking } from '../services/chatbotLeadIntegration';

interface JotFormChatbotProps {
  enabled?: boolean;
  skipWelcome?: boolean;
  maximizable?: boolean;
  showDelay?: number;
  trackLeads?: boolean;
}

const JotFormChatbot: React.FC<JotFormChatbotProps> = ({ 
  enabled = true, 
  skipWelcome = true, 
  maximizable = true,
  showDelay = CHATBOT_CONFIG.DISPLAY_CONFIG.showDelay,
  trackLeads = CHATBOT_CONFIG.LEAD_INTEGRATION.trackInOdoo
}) => {
  const location = useLocation();

  useEffect(() => {
    // Check if chatbot should be enabled on current page
    const shouldEnable = enabled && shouldEnableChatbot(location.pathname);
    
    if (!shouldEnable) return;

    // Delay the chatbot initialization
    const timer = setTimeout(() => {
      initializeChatbot({
        skipWelcome,
        maximizable,
        enabled: shouldEnable,
      });
      
      // Initialize lead tracking if enabled
      if (trackLeads) {
        initializeChatbotTracking();
      }
    }, showDelay);

    // Cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [enabled, skipWelcome, maximizable, showDelay, trackLeads, location.pathname]);

  // This component doesn't render anything visible
  return null;
};

export default JotFormChatbot;
