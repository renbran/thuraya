import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* World Map */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-8">
                Talk to Humans
              </h1>
              <div className="bg-card border border-border rounded-2xl p-8 h-96 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-midnight opacity-50" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-aurora-start rounded-full animate-pulse" />
                    <div>
                      <div className="font-satoshi font-bold">New York</div>
                      <div className="text-sm text-muted-foreground">Americas HQ</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-photon rounded-full animate-pulse" />
                    <div>
                      <div className="font-satoshi font-bold">London</div>
                      <div className="text-sm text-muted-foreground">EMEA HQ</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-aurora-end rounded-full animate-pulse" />
                    <div>
                      <div className="font-satoshi font-bold">Singapore</div>
                      <div className="text-sm text-muted-foreground">APAC HQ</div>
                    </div>
                  </div>
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
              <h2 className="text-3xl font-satoshi font-bold mb-6">Get In Touch</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    placeholder="Name" 
                    className="w-full p-4 bg-background border border-border rounded-xl"
                  />
                  <input 
                    placeholder="Email" 
                    className="w-full p-4 bg-background border border-border rounded-xl"
                  />
                </div>
                <input 
                  placeholder="Company" 
                  className="w-full p-4 bg-background border border-border rounded-xl"
                />
                <select className="w-full p-4 bg-background border border-border rounded-xl">
                  <option>Budget Range</option>
                  <option>Under $25k</option>
                  <option>$25k - $100k</option>
                  <option>Over $100k</option>
                </select>
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  className="w-full p-4 bg-background border border-border rounded-xl"
                />
                <CTAButton variant="primary" className="w-full">
                  Send Message
                </CTAButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;