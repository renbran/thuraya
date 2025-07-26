import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ParticleField } from "@/components/ParticleField";
import { CountUpCard } from "@/components/CountUpCard";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { CTAButton } from "@/components/CTAButton";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, glitchVariant } from "@/lib/variants";
import cityscapeSkyline from "@/assets/cityscape-skyline.jpg";
import neuralLattice from "@/assets/neural-lattice.jpg";
import legacyDashboard from "@/assets/legacy-dashboard.jpg";
import modernDashboard from "@/assets/modern-dashboard.jpg";
import { Play, ArrowRight, Zap, Eye, Gauge, Shield, Bell } from "lucide-react";

const Index = () => {
  const { scrollYProgress } = useScroll();
  const [isGlitching, setIsGlitching] = useState(false);

  // Hero Section
  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-section="0">
      <Navigation />
      <ParticleField />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-midnight" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent leading-tight mb-8">
            EAGER MARVEL
          </h1>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-frost/90 font-inter font-light leading-relaxed mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          When systems stall, potential hides. Let's wake it.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CTAButton 
            size="lg"
            onClick={() => {
              const nextSection = document.querySelector('[data-section="1"]');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Enter the Core
          </CTAButton>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );

  // Story Chapter 1 - The Rift
  const ChapterOne = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="min-h-screen flex items-center" data-section="1">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Sticky cityscape */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={cityscapeSkyline}
                alt="Fractured cityscape representing broken systems"
                className="w-full h-96 object-cover rounded-2xl"
                variants={glitchVariant}
                animate={isGlitching ? "animate" : "initial"}
                onMouseEnter={() => setIsGlitching(true)}
                onMouseLeave={() => setIsGlitching(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-photon/20 to-aurora-start/20 rounded-2xl" />
            </motion.div>
            
            {/* Right side - Text content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-4xl md:text-5xl font-satoshi font-black text-foreground mb-6">
                  The Rift
                </h2>
                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  Every enterprise has them—those maddening gaps where data disappears, 
                  processes stall, and potential withers in digital shadows. The symptoms 
                  are everywhere: departments that can't speak to each other, insights 
                  buried in silos, decisions made on instinct instead of intelligence.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  Traditional solutions patch symptoms. They add more tools, more complexity, 
                  more noise. But the rift remains—that chasm between what your business 
                  could achieve and what it actually does.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  What if we told you the solution isn't another tool? What if it's about 
                  awakening the intelligence already sleeping in your systems?
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Story Chapter 2 - The Spark
  const ChapterTwo = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    const neuralNodes = [
      { id: 1, name: "Predict", description: "Anticipate disruptions before they happen", x: 20, y: 30 },
      { id: 2, name: "Connect", description: "Bridge isolated systems seamlessly", x: 80, y: 20 },
      { id: 3, name: "Boost", description: "Amplify operational efficiency", x: 50, y: 50 },
      { id: 4, name: "Clarify", description: "Transform complexity into clarity", x: 30, y: 80 },
      { id: 5, name: "Alert", description: "Intelligent notifications that matter", x: 70, y: 75 }
    ];
    
    return (
      <section ref={ref} className="min-h-screen py-20" data-section="2">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-satoshi font-black text-foreground mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Spark
          </motion.h2>
          
          {/* Neural Network Visualization */}
          <div className="relative max-w-4xl mx-auto mb-20">
            <motion.img
              src={neuralLattice}
              alt="Neural network representing AI intelligence"
              className="w-full h-96 object-cover rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
            />
            
            {/* Interactive nodes */}
            {neuralNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="absolute group cursor-pointer"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-4 h-4 bg-aurora-start rounded-full animate-pulse" />
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  <div className="font-satoshi font-bold text-foreground">{node.name}</div>
                  <div className="text-sm text-muted-foreground">{node.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* KPI Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <CountUpCard
              title="Efficiency Boost"
              value={73}
              suffix="%"
              description="Average improvement in operational efficiency"
            />
            <CountUpCard
              title="Decision Speed"
              value={5}
              suffix="x"
              description="Faster insights and decision-making"
            />
            <CountUpCard
              title="Cost Reduction"
              value={42}
              suffix="%"
              description="Reduction in operational overhead"
            />
          </div>
        </div>
      </section>
    );
  };

  // Story Chapter 3 - The Leap
  const ChapterThree = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="min-h-screen py-20" data-section="3">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-satoshi font-black text-center text-foreground mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Leap
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Before - Legacy Dashboard */}
            <motion.div
              variants={slideInLeft}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="text-center"
            >
              <h3 className="text-2xl font-satoshi font-bold text-muted-foreground mb-6">Before: Chaos</h3>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={legacyDashboard}
                  alt="Legacy dashboard interface"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-red-500/20" />
              </div>
              <p className="text-muted-foreground mt-4">
                Scattered data, manual processes, delayed insights
              </p>
            </motion.div>
            
            {/* After - Modern Dashboard */}
            <motion.div
              variants={slideInRight}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="text-center"
            >
              <h3 className="text-2xl font-satoshi font-bold text-aurora-start mb-6">After: Clarity</h3>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={modernDashboard}
                  alt="Modern AI-powered dashboard"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-aurora/20" />
                <motion.div
                  className="absolute top-4 right-4 bg-aurora-start text-midnight px-3 py-1 rounded-full text-sm font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LIVE
                </motion.div>
              </div>
              <p className="text-foreground mt-4">
                Real-time intelligence, automated insights, predictive clarity
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Proof Section
  const ProofSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    const caseStudies = [
      {
        title: "Manufacturing Giant",
        stat: "+37% throughput in 6 weeks",
        industry: "Manufacturing",
        video: "https://cdn.pixabay.com/vimeo/459133709/factory-42371.mp4"
      },
      {
        title: "Financial Services",
        stat: "50% faster compliance reporting",
        industry: "Finance",
        video: "https://cdn.pixabay.com/vimeo/520509003/trading-65131.mp4"
      },
      {
        title: "Healthcare Network",
        stat: "28% reduction in patient wait times",
        industry: "Healthcare",
        video: "https://cdn.pixabay.com/vimeo/518983831/hospital-64567.mp4"
      }
    ];
    
    return (
      <section ref={ref} className="py-20" data-section="4">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-satoshi font-black text-center text-foreground mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            New Normal
          </motion.h2>
          
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="min-w-80 bg-card border border-border rounded-2xl overflow-hidden snap-start group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-48 bg-gradient-midnight relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-aurora/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-aurora-start opacity-80" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-satoshi font-bold text-foreground mb-2">
                    {study.title}
                  </h3>
                  <div className="text-2xl font-satoshi font-black text-aurora-start mb-2">
                    {study.stat}
                  </div>
                  <p className="text-muted-foreground">{study.industry}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Conversion Section
  const ConversionSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
      <section ref={ref} className="py-20" data-section="5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="bg-gradient-aurora rounded-3xl p-16 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-midnight mb-8">
              Ready to see your operational Marvel?
            </h2>
            <p className="text-xl text-midnight/80 font-inter mb-12 max-w-2xl mx-auto">
              Book a 15-minute Marvel Scan and discover the hidden potential in your systems.
            </p>
            
            <CTAButton variant="secondary" size="lg">
              Book Marvel Scan
              <ArrowRight className="w-5 h-5 ml-2" />
            </CTAButton>
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-8 left-8 text-midnight/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-8 text-midnight/30"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Eye className="w-8 h-8" />
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
          <div>
            <h3 className="font-satoshi font-bold text-foreground mb-4">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-satoshi font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-satoshi font-bold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-satoshi font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm font-inter">
            © 2025 EAGER MARVEL. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <ChapterOne />
      <ChapterTwo />
      <ChapterThree />
      <ProofSection />
      <ConversionSection />
      <Footer />
    </div>
  );
};

export default Index;