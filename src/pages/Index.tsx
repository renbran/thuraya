import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ParticleField } from "@/components/ParticleField";
import { NetworkBackground } from "@/components/NetworkBackground";
import { CountUpCard } from "@/components/CountUpCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { CTAButton } from "@/components/CTAButton";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from "@/lib/variants";
import thurayaLogo from "@/assets/thuraya-logo-symbol.png";
import { Calendar, Users, Heart, Star, ArrowRight, Compass, Eye, Lightbulb } from "lucide-react";
import { odooApi, type LeadData } from "../services/odooApi";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Hero Section
  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-section="0">
      <Navigation />
      <NetworkBackground />
      <ParticleField />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-connectivity" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <img 
            src={thurayaLogo} 
            alt="Thuraya Path Logo" 
            className="w-32 h-32 mx-auto mb-8 animate-float"
          />
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-satoshi font-black leading-tight mb-6" 
              style={{
                background: 'linear-gradient(to right, #ffb347, #ffcc33, #00cfff, #7a4ef3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            THURAYA PATH
          </h1>
          <p className="text-2xl md:text-3xl font-satoshi font-bold tracking-wider"
             style={{
               background: 'linear-gradient(to right, #ffb347, #ffcc33, #00cfff, #7a4ef3)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               backgroundClip: 'text'
             }}>
            CONSULTANT
          </p>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-frost/90 font-inter font-light leading-relaxed mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your Trusted Partner in Strategic Consulting. Whether you're expanding into new markets, restructuring operations, or scaling with purpose — our bespoke strategies ensure your journey is refined and results-driven.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <CTAButton 
            size="lg"
            onClick={() => {
              const nextSection = document.querySelector('[data-section="1"]');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Begin Your Journey
            <Compass className="w-5 h-5 ml-2" />
          </CTAButton>
          <CTAButton 
            variant="outline" 
            size="lg"
            onClick={() => {
              const contactSection = document.querySelector('[data-section="5"]');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Free Consultation
          </CTAButton>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
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

  // Services Section
  const ServicesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    const services = [
      {
        icon: Compass,
        title: "Life Path Consultation",
        description: "Discover your authentic direction through personalized guidance and ancient wisdom practices.",
        features: ["Personal Mission Discovery", "Values Alignment", "Decision Making Framework"]
      },
      {
        icon: Eye,
        title: "Career Transition Guidance",
        description: "Navigate professional changes with confidence and clarity about your next chapter.",
        features: ["Career Assessment", "Transition Planning", "Purpose-Driven Career Design"]
      },
      {
        icon: Lightbulb,
        title: "Spiritual Growth Mentoring",
        description: "Deepen your spiritual practice and connection to your higher purpose.",
        features: ["Meditation Guidance", "Spiritual Practices", "Inner Wisdom Development"]
      }
    ];
    
    return (
      <section ref={ref} className="py-20 bg-gradient-golden/10 relative overflow-hidden" data-section="2">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-golden/5 via-transparent to-aurora-start/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-foreground mb-6">
              Guidance for Every
              <span className="bg-gradient-golden bg-clip-text text-transparent"> Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive consulting services designed to illuminate your path and empower your transformation
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 group hover:shadow-mystical transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-6">
                  <service.icon className="w-12 h-12 text-golden mb-4" />
                  <h3 className="text-2xl font-satoshi font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-golden mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="mt-6 text-golden font-medium hover:text-golden/80 transition-colors flex items-center group">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Testimonials Section
  const TestimonialsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    const testimonials = [
      {
        name: "Sarah Mitchell",
        role: "Executive Coach",
        content: "Working with Thuraya Path transformed not just my career, but my entire relationship with purpose. The guidance was profound and practical.",
        rating: 5
      },
      {
        name: "David Chen",
        role: "Entrepreneur",
        content: "The clarity I gained about my life direction was incredible. I finally understood how to align my business with my deepest values.",
        rating: 5
      },
      {
        name: "Maria Rodriguez",
        role: "Artist & Writer",
        content: "The spiritual mentoring helped me tap into a wellspring of creativity I didn't know existed. My art has never been more authentic.",
        rating: 5
      }
    ];
    
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
    
    return (
      <section ref={ref} className="py-20 bg-gradient-to-b from-background to-card/50" data-section="3">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-foreground mb-6">
              Transformation
              <span className="bg-gradient-golden bg-clip-text text-transparent"> Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real journeys of discovery, growth, and purposeful living
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-card border border-border rounded-3xl p-12 text-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-6 right-6 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-golden text-golden" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-inter font-light text-foreground mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              
              <div className="space-y-2">
                <h4 className="text-xl font-satoshi font-bold text-foreground">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-muted-foreground">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeTestimonial ? 'bg-golden' : 'bg-muted'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Stats Section
  const StatsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="py-20 bg-gradient-aurora/10 relative overflow-hidden" data-section="4">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-aurora-start/5 via-transparent to-aurora-end/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <CountUpCard
              title="Lives Transformed"
              value={500}
              suffix="+"
              description="Individuals who found their true path"
            />
            <CountUpCard
              title="Years of Wisdom"
              value={15}
              suffix="+"
              description="Deep experience in spiritual guidance"
            />
            <CountUpCard
              title="Success Rate"
              value={95}
              suffix="%"
              description="Clients who achieve lasting transformation"
            />
          </div>
        </div>
      </section>
    );
  };

  // Contact Section
  const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="py-20 bg-gradient-midnight relative overflow-hidden" data-section="5">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="bg-gradient-golden rounded-3xl p-16 relative overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-midnight mb-8">
              Ready to Discover Your Path?
            </h2>
            <p className="text-xl text-midnight/80 font-inter mb-12 max-w-2xl mx-auto">
              Begin your journey of transformation with a complimentary consultation. 
              Let's explore how we can illuminate your path together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton 
                variant="secondary" 
                size="lg"
                onClick={() => window.open('https://wa.me/971563905772?text=Hello, I would like to book a free consultation.', '_blank')}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
              </CTAButton>
              <CTAButton 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = 'mailto:info@tachimao.com?subject=Inquiry about your services'}
              >
                <Users className="w-5 h-5 mr-2" />
                Email Us
              </CTAButton>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-8 left-8 text-midnight/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="w-8 h-8" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-8 text-midnight/30"
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

  // Footer
  const Footer = () => (
    <footer className="py-16 border-t border-border" data-section="6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={thurayaLogo} 
                alt="Thuraya Path Logo" 
                className="w-10 h-10 mr-3"
              />
              <h3 className="font-satoshi font-bold text-foreground text-xl">Thuraya Path Consultant</h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Navigate your path to clarity, purpose, and transformation through ancient wisdom and modern insight.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-golden transition-colors">
                Instagram
              </a>
              <a href="#" className="text-muted-foreground hover:text-golden transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-golden transition-colors">
                YouTube
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-satoshi font-bold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-golden transition-colors">Life Path Consultation</a></li>
              <li><a href="#" className="hover:text-golden transition-colors">Career Guidance</a></li>
              <li><a href="#" className="hover:text-golden transition-colors">Spiritual Mentoring</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-satoshi font-bold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a 
                  href="mailto:info@tachimao.com" 
                  className="hover:text-golden transition-colors"
                >
                  info@tachimao.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+971563905772" 
                  className="hover:text-golden transition-colors"
                >
                  +971 56 390 5772
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/971563905772" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-golden transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/+971563905772" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-golden transition-colors"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Thuraya Path Consultant. All rights reserved. • Illuminating paths to purposeful living.
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;