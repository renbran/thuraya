import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ParticleField } from "@/components/ParticleField";
import { NetworkBackground } from "@/components/NetworkBackground";
import { CountUpCard } from "@/components/CountUpCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { CTAButton } from "@/components/CTAButton";
import { PremiumHero } from "@/components/PremiumHero";
import { PremiumServices } from "@/components/PremiumServices";
import { PremiumAbout } from "@/components/PremiumAbout";
import PremiumTestimonials from "@/components/PremiumTestimonials";
import PremiumCaseStudies from "@/components/PremiumCaseStudies";
import PremiumPricing from "@/components/PremiumPricing";
import ConversionOptimization from "@/components/ConversionOptimization";
import PremiumBooking from "@/components/PremiumBooking";
import TechnicalExcellence from "@/components/TechnicalExcellence";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/variants";
import thurayaLogo from "@/assets/thuraya-logo-new.png";
import { Calendar, Users, Heart, Star, ArrowRight, Compass, Eye, Lightbulb, Navigation2, Target, Settings } from "lucide-react";
import { odooApi, type LeadData } from "../services/odooApi";
import { premiumCopy } from "@/content/premiumCopy";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Premium Hero Section
  const PremiumHeroSection = () => (
    <PremiumHero
      onGetStarted={() => {
        const nextSection = document.querySelector('[data-section="1"]');
        nextSection?.scrollIntoView({ behavior: 'smooth' });
      }}
      onConsultation={() => {
        const contactSection = document.querySelector('[data-section="5"]');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );

  // About Section
  const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="min-h-screen flex items-center py-20 bg-gradient-connectivity/30 relative overflow-hidden" data-section="1">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-5xl md:text-6xl font-satoshi font-black text-foreground mb-6">
                  Your Guide to
                  <span className="bg-gradient-aurora bg-clip-text text-transparent"> Strategic Excellence</span>
                </h2>
                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  In a world of endless choices and distractions, finding your true path can feel overwhelming. 
                  Thuraya Path Consultant combines time-tested wisdom with personalized guidance to help you 
                  navigate life's most important decisions.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  Whether you're facing a career transition, seeking deeper purpose, or looking to align 
                  your actions with your values, our holistic approach illuminates the path forward 
                  with clarity and confidence.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-golden" />
                  <span className="text-foreground font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-golden" />
                  <span className="text-foreground font-medium">500+ Lives Transformed</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right side - Mystical Visual */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full h-96 rounded-3xl bg-gradient-aurora/20 backdrop-blur-sm border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-golden/20 via-aurora-start/20 to-aurora-end/20" />
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img 
                    src={thurayaLogo} 
                    alt="Thuraya Path Symbol" 
                    className="w-48 h-48 opacity-80"
                  />
                </motion.div>
                {/* Floating orbs */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-golden rounded-full"
                    style={{
                      left: `${20 + (i * 15)}%`,
                      top: `${30 + (i % 2 * 40)}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Stats Section for social proof metrics
  const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="py-20 bg-gradient-premium/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-constellation-map opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <CountUpCard
              title="Businesses Transformed"
              value={2500}
              suffix="+"
              description="MENA organizations digitally transformed"
            />
            <CountUpCard
              title="Cultural Adoption Rate"
              value={89}
              suffix="%"
              description="Successful cultural integration"
            />
            <CountUpCard
              title="Countries Served"
              value={15}
              suffix="+"
              description="Across the MENA region"
            />
            <CountUpCard
              title="Client Satisfaction"
              value={98}
              suffix="%"
              description="Exceptional service rating"
            />
          </div>
        </div>
      </section>
    );
  };

  // Contact Section with premium styling
  const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="py-20 bg-gradient-cultural relative overflow-hidden">
        <div className="absolute inset-0 bg-constellation-map opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="bg-gradient-thuraya rounded-premium p-16 relative overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-white mb-8">
              Begin Your Digital Transformation
            </h2>
            <p className="text-xl text-thuraya-pearl/90 font-inter mb-12 max-w-2xl mx-auto">
              Start your journey with our complimentary Strategic Navigation Session. 
              Discover how ancient wisdom meets cutting-edge automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton 
                variant="secondary" 
                size="lg"
                onClick={() => {
                  const nextSection = document.querySelector('[data-section="1"]');
                  nextSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Strategic Session
              </CTAButton>
              <CTAButton 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const contactSection = document.querySelector('[data-section="5"]');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                Premium Consultation
              </CTAButton>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-8 left-8 text-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="w-8 h-8" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-8 text-white/20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Star className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Premium Footer with Thuraya branding
  const Footer = () => (
    <footer className="py-16 border-t border-thuraya-gold/20 bg-thuraya-midnight">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={thurayaLogo} 
                alt="Thuraya Path Logo" 
                className="w-10 h-10 mr-3"
              />
              <h3 className="font-satoshi font-bold text-thuraya-pearl text-xl">Thuraya Path Consultancy</h3>
            </div>
            <p className="text-thuraya-pearl/70 mb-4 max-w-md">
              Navigate your business transformation with cultural intelligence and cutting-edge automation across the MENA region.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-thuraya-pearl/60 hover:text-thuraya-gold transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-thuraya-pearl/60 hover:text-thuraya-gold transition-colors">
                Twitter
              </a>
              <a href="#" className="text-thuraya-pearl/60 hover:text-thuraya-gold transition-colors">
                YouTube
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-satoshi font-bold text-thuraya-pearl mb-4">Services</h3>
            <ul className="space-y-2 text-thuraya-pearl/70">
              <li><a href="#" className="hover:text-thuraya-gold transition-colors">Cultural Intelligence Assessment</a></li>
              <li><a href="#" className="hover:text-thuraya-gold transition-colors">Automation Architecture</a></li>
              <li><a href="#" className="hover:text-thuraya-gold transition-colors">Strategic Implementation</a></li>
              <li><a href="#" className="hover:text-thuraya-gold transition-colors">Continuous Navigation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-satoshi font-bold text-thuraya-pearl mb-4">Contact</h3>
            <ul className="space-y-2 text-thuraya-pearl/70">
              <li>
                <a 
                  href="mailto:info@tachimao.com" 
                  className="hover:text-thuraya-gold transition-colors"
                >
                  info@tachimao.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+971563905772" 
                  className="hover:text-thuraya-gold transition-colors"
                >
                  +971 56 390 5772
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/971563905772" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-thuraya-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-thuraya-gold/20 pt-8 text-center">
          <p className="text-thuraya-pearl/60">
            © 2024 Thuraya Path Consultancy. All rights reserved. • Bridging ancient wisdom with modern automation.
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-thuraya-midnight text-white">
      <Navigation />
      <PremiumHeroSection />
      <PremiumServices />
      <PremiumAbout />
      <PremiumTestimonials />
      <PremiumCaseStudies />
      <ConversionOptimization />
      <PremiumPricing />
      <PremiumBooking />
      <TechnicalExcellence />
      <StatsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;