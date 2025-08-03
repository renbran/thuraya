import { odooApi } from '../services/odooApi';
import { CHATBOT_CONFIG } from '../config/chatbotConfig';

interface ChatbotInteraction {
  userMessage?: string;
  botResponse?: string;
  userEmail?: string;
  userName?: string;
  timestamp: Date;
  sessionId?: string;
}

export class ChatbotLeadIntegration {
  private interactions: ChatbotInteraction[] = [];
  
  // Track chatbot interactions
  trackInteraction(interaction: ChatbotInteraction) {
    this.interactions.push({
      ...interaction,
      timestamp: new Date(),
    });
    
    // Auto-create lead if we have enough information
    if (interaction.userEmail || (this.interactions.length >= 3)) {
      this.createChatbotLead();
    }
  }
  
  // Create a lead in Odoo from chatbot conversations
  async createChatbotLead() {
    if (!CHATBOT_CONFIG.LEAD_INTEGRATION.trackInOdoo) return;
    
    try {
      const latestInteraction = this.interactions[this.interactions.length - 1];
      const userEmail = this.interactions.find(i => i.userEmail)?.userEmail;
      const userName = this.interactions.find(i => i.userName)?.userName;
      
      // Build conversation summary
      const conversationSummary = this.interactions
        .map(i => `${i.userMessage ? `User: ${i.userMessage}` : ''}${i.botResponse ? `\nBot: ${i.botResponse}` : ''}`)
        .join('\n\n');
      
      const leadData = {
        name: userName 
          ? `Chatbot Conversation - ${userName}` 
          : `Chatbot Lead - ${new Date().toLocaleDateString()}`,
        email_from: userEmail || 'chatbot-lead@tachimao.com',
        contact_name: userName || 'Chatbot Visitor',
        description: `Chatbot Conversation Summary:\n\n${conversationSummary}\n\n--- Chatbot Interaction Details ---\nTotal Messages: ${this.interactions.length}\nSession Started: ${this.interactions[0]?.timestamp}\nLast Activity: ${latestInteraction?.timestamp}`,
        source_id: 1, // Website source
        medium_id: 1, // Digital medium
        website: 'https://renbran.github.io/thuraya/',
        tag_ids: [1, 2], // Website inquiry + Chatbot tags
      };
      
      const result = await odooApi.createLead(leadData);
      
      if (result.success) {
        console.log('Chatbot lead created in Odoo with ID:', result.leadId);
        // Clear interactions after successful lead creation
        this.interactions = [];
        return result.leadId;
      } else {
        console.error('Failed to create chatbot lead:', result.error);
      }
    } catch (error) {
      console.error('Error creating chatbot lead:', error);
    }
    
    return null;
  }
  
  // Get conversation summary for display
  getConversationSummary(): string {
    return this.interactions
      .map(i => `${i.timestamp.toLocaleTimeString()}: ${i.userMessage || i.botResponse}`)
      .join('\n');
  }
  
  // Clear conversation history
  clearConversation() {
    this.interactions = [];
  }
}

// Global instance for chatbot lead tracking
export const chatbotLeadTracker = new ChatbotLeadIntegration();

// Utility function to initialize chatbot event listeners
export const initializeChatbotTracking = () => {
  // Listen for JotForm chatbot events (if available)
  if (typeof window !== 'undefined') {
    // Check for JotForm chatbot API periodically
    const checkInterval = setInterval(() => {
      // @ts-ignore - JotForm API might not have types
      if (window.JotFormAgent) {
        console.log('JotForm chatbot API detected, setting up tracking...');
        
        // Set up event listeners for chatbot interactions
        try {
          // @ts-ignore
          window.JotFormAgent.on('message', (data: any) => {
            chatbotLeadTracker.trackInteraction({
              userMessage: data.message,
              userEmail: data.email,
              userName: data.name,
              timestamp: new Date(),
              sessionId: data.sessionId,
            });
          });
          
          // @ts-ignore
          window.JotFormAgent.on('email_captured', (data: any) => {
            chatbotLeadTracker.trackInteraction({
              userEmail: data.email,
              userName: data.name,
              timestamp: new Date(),
              sessionId: data.sessionId,
            });
          });
          
          clearInterval(checkInterval);
        } catch (error) {
          console.log('JotForm API event binding failed, but chatbot should still work');
          clearInterval(checkInterval);
        }
      }
    }, 1000);
    
    // Stop checking after 30 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 30000);
  }
};
