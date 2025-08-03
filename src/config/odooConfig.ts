// Odoo Configuration
export const ODOO_CONFIG = {
  // Your Odoo instance URL
  URL: 'https://tachimao.com',
  
  // Database UUID for precise identification
  DATABASE: '7f1b2e28-488e-11f0-bb6d-02420a050008',
  
  // API credentials (in production, use environment variables)
  USERNAME: 'ceo@tachimao.com',
  PASSWORD: '8586583',
  
  // Default lead settings
  DEFAULT_SOURCE_ID: 1, // Website
  DEFAULT_MEDIUM_ID: 1, // Digital
  DEFAULT_COUNTRY_ID: 1, // You may need to find the correct ID for UAE
  
  // Lead tags (you may need to create these in Odoo first)
  TAGS: {
    WEBSITE_INQUIRY: 1,
    NEWSLETTER: 2,
    CONSULTATION: 3,
    DEMO_REQUEST: 4,
  },
  
  // Website URL for lead source tracking
  WEBSITE_URL: 'https://renbran.github.io/thuraya/',
};

// Lead mapping functions
export const createContactLead = (formData: any) => ({
  name: `${formData.name}${formData.company ? ' - ' + formData.company : ''}`,
  email_from: formData.email,
  contact_name: formData.name,
  company_name: formData.company,
  description: `Budget: ${formData.budget}\n\nMessage:\n${formData.message}`,
  source_id: ODOO_CONFIG.DEFAULT_SOURCE_ID,
  medium_id: ODOO_CONFIG.DEFAULT_MEDIUM_ID,
  website: ODOO_CONFIG.WEBSITE_URL,
  tag_ids: [ODOO_CONFIG.TAGS.WEBSITE_INQUIRY],
});

export const createNewsletterLead = (email: string) => ({
  name: `Newsletter Subscription - ${email}`,
  email_from: email,
  contact_name: email.split('@')[0],
  description: 'Newsletter subscription request from website',
  source_id: ODOO_CONFIG.DEFAULT_SOURCE_ID,
  medium_id: ODOO_CONFIG.DEFAULT_MEDIUM_ID,
  website: ODOO_CONFIG.WEBSITE_URL,
  tag_ids: [ODOO_CONFIG.TAGS.NEWSLETTER],
});

export const createConsultationLead = (data: any) => ({
  name: `Consultation Request - ${data.name || data.email}`,
  email_from: data.email,
  contact_name: data.name,
  phone: data.phone,
  company_name: data.company,
  description: `Service Interest: ${data.service || 'General Consultation'}\n\nAdditional Information:\n${data.message || 'No additional information provided'}`,
  source_id: ODOO_CONFIG.DEFAULT_SOURCE_ID,
  medium_id: ODOO_CONFIG.DEFAULT_MEDIUM_ID,
  website: ODOO_CONFIG.WEBSITE_URL,
  tag_ids: [ODOO_CONFIG.TAGS.CONSULTATION],
});
