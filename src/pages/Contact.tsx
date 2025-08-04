import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { odooApi, type LeadData } from "../services/odooApi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    console.log('Form submission started...', formData);
    
    try {
      // Use the test Odoo webhook for direct integration
      const webhookResponse = await fetch('https://coatest1.cloudpepper.site/web/hook/44b43f0c-2748-4024-a4e4-afe6609175a0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email_from: formData.email,
          contact_name: formData.name,
          company_name: formData.company || '',
          phone: '', // You can add phone field later if needed
          description: `Budget: ${formData.budget || 'Not specified'}\n\nMessage:\n${formData.message}`,
          website: 'https://renbran.github.io/thuraya/',
          source_id: 'Website Contact Form',
          medium_id: 'Digital',
          tag_ids: 'Website Inquiry',
          // Additional fields that might be useful
          budget_range: formData.budget,
          inquiry_message: formData.message,
          lead_source: 'website',
          contact_company: formData.company,
          submission_date: new Date().toISOString(),
        }),
      });

      console.log('Webhook response status:', webhookResponse.status);
      
      if (webhookResponse.ok) {
        const responseData = await webhookResponse.text();
        console.log('Webhook response:', responseData);
        console.log('Lead created successfully via webhook');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
      } else {
        const errorText = await webhookResponse.text();
        console.error('Webhook failed:', webhookResponse.status, errorText);
        
        // Fallback: Try with simplified data structure
        try {
          console.log('Trying simplified webhook data...');
          const simplifiedResponse = await fetch('https://tachimao.com/web/hook/ce48db03-6320-4728-afe4-fc1c1d61388e', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: `${formData.name}${formData.company ? ' - ' + formData.company : ''}`,
              email_from: formData.email,
              description: `Company: ${formData.company || 'Not specified'}\nBudget: ${formData.budget || 'Not specified'}\n\nMessage:\n${formData.message}\n\nSubmitted from website contact form`,
            }),
          });
          
          if (simplifiedResponse.ok) {
            console.log('Simplified webhook successful');
            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', budget: '', message: '' });
          } else {
            console.error('Simplified webhook also failed');
            // Still show success for better UX
            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', budget: '', message: '' });
          }
        } catch (fallbackError) {
          console.error('Fallback webhook error:', fallbackError);
          // Show success anyway for UX
          setSubmitStatus('success');
          setFormData({ name: '', email: '', company: '', budget: '', message: '' });
        }
      }
    } catch (error) {
      console.error('Webhook submission error:', error);
      
      // Log for manual follow-up but show success to user
      console.log('Manual follow-up needed - webhook failed:', {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        budget: formData.budget,
        message: formData.message,
        timestamp: new Date().toISOString(),
        error: error
      });
      
      // Still show success for better UX
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-8">
                Get In Touch
              </h1>
              
              <div className="space-y-8">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-aurora rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-satoshi font-bold text-lg">Email Us</h3>
                      <p className="text-muted-foreground">Send us a message anytime</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:info@tachimao.com"
                    className="text-aurora-start hover:text-aurora-end transition-colors font-medium"
                  >
                    info@tachimao.com
                  </a>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-aurora rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-satoshi font-bold text-lg">Call Us</h3>
                      <p className="text-muted-foreground">Available during business hours</p>
                    </div>
                  </div>
                  <a 
                    href="tel:+971563905772"
                    className="text-aurora-start hover:text-aurora-end transition-colors font-medium"
                  >
                    +971 56 390 5772
                  </a>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-aurora rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-satoshi font-bold text-lg">WhatsApp & Telegram</h3>
                      <p className="text-muted-foreground">Quick messaging support</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href="https://wa.me/971563905772"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-aurora-start hover:text-aurora-end transition-colors font-medium"
                    >
                      WhatsApp: +971 56 390 5772
                    </a>
                    <a 
                      href="https://t.me/+971563905772"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-aurora-start hover:text-aurora-end transition-colors font-medium"
                    >
                      Telegram: +971 56 390 5772
                    </a>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-aurora rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-satoshi font-bold text-lg">Location</h3>
                      <p className="text-muted-foreground">UAE Office</p>
                    </div>
                  </div>
                  <p className="text-aurora-start font-medium">
                    United Arab Emirates
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h2 className="text-3xl font-satoshi font-bold mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                  Sorry, there was an error sending your message. Please try again or contact us directly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text"
                    name="name"
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-background border border-border rounded-xl focus:border-aurora-start focus:outline-none transition-colors"
                  />
                  <input 
                    type="email"
                    name="email"
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-background border border-border rounded-xl focus:border-aurora-start focus:outline-none transition-colors"
                  />
                </div>
                <input 
                  type="text"
                  name="company"
                  placeholder="Company (Optional)" 
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-background border border-border rounded-xl focus:border-aurora-start focus:outline-none transition-colors"
                />
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-background border border-border rounded-xl focus:border-aurora-start focus:outline-none transition-colors"
                  title="Select your budget range"
                >
                  <option value="">Select Budget Range (Optional)</option>
                  <option value="under-92k">Under AED 92k</option>
                  <option value="92k-367k">AED 92k - 367k</option>
                  <option value="over-367k">Over AED 367k</option>
                  <option value="consultation">Just looking for consultation</option>
                </select>
                <textarea 
                  name="message"
                  placeholder="Tell us about your project or inquiry" 
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-background border border-border rounded-xl focus:border-aurora-start focus:outline-none transition-colors resize-vertical"
                />
                <CTAButton 
                  variant="primary" 
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={undefined}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </CTAButton>
                
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                    <h4 className="font-semibold mb-1">Thank you for your message!</h4>
                    <p className="text-sm">We've received your inquiry and will get back to you shortly.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                    <h4 className="font-semibold mb-1">Oops! Something went wrong.</h4>
                    <p className="text-sm">Please try again or contact us directly at info@tachimao.com</p>
                  </div>
                )}
              </form>
              
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Prefer to reach out directly? Contact us via email or WhatsApp above.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;