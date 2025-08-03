interface OdooConfig {
  url: string;
  database: string;
  username: string;
  apiKey: string;
}

interface LeadData {
  name: string;
  email_from?: string;
  phone?: string;
  contact_name?: string;
  description?: string;
  source_id?: number;
  medium_id?: number;
  campaign_id?: number;
  website?: string;
  company_name?: string;
  job_title?: string;
  street?: string;
  city?: string;
  country_id?: number;
  tag_ids?: number[];
}

class OdooApiService {
  private config: OdooConfig;
  private sessionId: string | null = null;

  constructor() {
    this.config = {
      url: 'https://tachimao.com',
      database: '7f1b2e28-488e-11f0-bb6d-02420a050008', // Using UUID for precise database identification
      username: 'ceo@tachimao.com',
      apiKey: '94b2d780a6f14edf16a16cc9fa835b6752ae3eca'
    };
  }

  // Authenticate with Odoo using API key
  private async authenticate(): Promise<boolean> {
    try {
      console.log('Attempting Odoo authentication with API key...');
      
      const response = await fetch(`${this.config.url}/web/session/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            db: this.config.database,
            login: this.config.username,
            password: this.config.apiKey, // Use API key as password
          },
          id: Math.random(),
        }),
      });

      const data = await response.json();
      
      if (data.result && data.result.uid) {
        this.sessionId = data.result.session_id;
        console.log('Odoo authentication successful. User ID:', data.result.uid);
        return true;
      }
      
      console.error('Odoo authentication failed:', data);
      console.error('Using database UUID:', this.config.database);
      console.error('Using API key:', this.config.apiKey.substring(0, 8) + '...');
      return false;
    } catch (error) {
      console.error('Odoo authentication error:', error);
      console.error('Check if Odoo instance is accessible at:', this.config.url);
      return false;
    }
  }

  // Create a lead in Odoo CRM
  async createLead(leadData: LeadData): Promise<{ success: boolean; leadId?: number; error?: string }> {
    try {
      // Authenticate first
      const authenticated = await this.authenticate();
      if (!authenticated) {
        return { success: false, error: 'Authentication failed' };
      }

      // Prepare lead data with defaults
      const lead = {
        name: leadData.name,
        email_from: leadData.email_from,
        phone: leadData.phone,
        contact_name: leadData.contact_name || leadData.name,
        description: leadData.description,
        source_id: leadData.source_id || 1, // Website source
        medium_id: leadData.medium_id || 1, // Digital medium
        website: leadData.website || 'https://renbran.github.io/thuraya/',
        company_name: leadData.company_name,
        function: leadData.job_title,
        street: leadData.street,
        city: leadData.city,
        country_id: leadData.country_id || 1, // Default country
        tag_ids: leadData.tag_ids || [],
        // Add timestamp and source tracking
        date_open: new Date().toISOString(),
        referred: 'Website Contact Form',
      };

      const response = await fetch(`${this.config.url}/web/dataset/call_kw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Cookie': `session_id=${this.sessionId}`,
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model: 'crm.lead',
            method: 'create',
            args: [lead],
            kwargs: {},
          },
          id: Math.random(),
        }),
      });

      const data = await response.json();

      if (data.result) {
        console.log('Lead created successfully with ID:', data.result);
        return { success: true, leadId: data.result };
      } else {
        console.error('Failed to create lead:', data);
        return { success: false, error: data.error?.message || 'Unknown error' };
      }
    } catch (error) {
      console.error('Error creating lead:', error);
      return { success: false, error: 'Network or server error' };
    }
  }

  // Create a newsletter subscription lead
  async createNewsletterLead(email: string): Promise<{ success: boolean; leadId?: number; error?: string }> {
    return this.createLead({
      name: `Newsletter Subscription - ${email}`,
      email_from: email,
      contact_name: email.split('@')[0],
      description: 'Newsletter subscription request from website',
      source_id: 1, // Website
      tag_ids: [1], // Newsletter tag (you may need to create this tag in Odoo)
    });
  }

  // Get available sources, mediums, and campaigns for form dropdowns
  async getFormOptions(): Promise<{
    sources: Array<{ id: number; name: string }>;
    mediums: Array<{ id: number; name: string }>;
    campaigns: Array<{ id: number; name: string }>;
  }> {
    try {
      const authenticated = await this.authenticate();
      if (!authenticated) {
        return { sources: [], mediums: [], campaigns: [] };
      }

      // Get sources
      const sourcesResponse = await this.fetchOdooData('utm.source', ['id', 'name']);
      const mediumsResponse = await this.fetchOdooData('utm.medium', ['id', 'name']);
      const campaignsResponse = await this.fetchOdooData('utm.campaign', ['id', 'name']);

      return {
        sources: sourcesResponse || [],
        mediums: mediumsResponse || [],
        campaigns: campaignsResponse || [],
      };
    } catch (error) {
      console.error('Error fetching form options:', error);
      return { sources: [], mediums: [], campaigns: [] };
    }
  }

  private async fetchOdooData(model: string, fields: string[]): Promise<any[]> {
    try {
      const response = await fetch(`${this.config.url}/web/dataset/call_kw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Cookie': `session_id=${this.sessionId}`,
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model,
            method: 'search_read',
            args: [[], fields],
            kwargs: {},
          },
          id: Math.random(),
        }),
      });

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error(`Error fetching ${model} data:`, error);
      return [];
    }
  }

  // Test connection to Odoo instance
  async testConnection(): Promise<{ success: boolean; message: string; userInfo?: any }> {
    try {
      const authenticated = await this.authenticate();
      
      if (authenticated) {
        // Try to get user information
        const response = await fetch(`${this.config.url}/web/dataset/call_kw`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Cookie': `session_id=${this.sessionId}`,
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'call',
            params: {
              model: 'res.users',
              method: 'read',
              args: [[1], ['name', 'email', 'company_id']],
              kwargs: {},
            },
            id: Math.random(),
          }),
        });

        const data = await response.json();
        
        if (data.result && data.result.length > 0) {
          return {
            success: true,
            message: 'Successfully connected to Odoo CRM',
            userInfo: data.result[0],
          };
        } else {
          return {
            success: false,
            message: 'Connected but unable to fetch user information',
          };
        }
      } else {
        return {
          success: false,
          message: 'Authentication failed. Please check credentials and database UUID.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }
}

export const odooApi = new OdooApiService();
export type { LeadData };
