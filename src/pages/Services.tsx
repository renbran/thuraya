import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";
import { fadeInUp, staggerContainer } from "@/lib/variants";
import { Brain, Network, Activity, Users, Calculator, ArrowRight, CheckCircle, Star } from "lucide-react";

const Services = () => {
  const [selectedPricing, setSelectedPricing] = useState<"monthly" | "annual">("monthly");
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    currentEfficiency: 70,
    hourlyRate: 184 // 50 USD = 184 AED
  });

  const services = [
    {
      id: "analytics",
      title: "AI-Powered Analytics",
      icon: <Brain className="w-12 h-12" />,
      description: "Transform raw data into predictive intelligence",
      process: [
        "Data Discovery & Mapping",
        "AI Model Development",
        "Insight Generation & Automation"
      ],
      benefits: [
        "37% faster decision-making",
        "Predictive accuracy up to 94%",
        "Automated insight generation",
        "Real-time anomaly detection"
      ]
    },
    {
      id: "integration",
      title: "Digital System Integration",
      icon: <Network className="w-12 h-12" />,
      description: "Connect isolated systems into unified intelligence",
      process: [
        "System Architecture Analysis",
        "API Gateway Development",
        "Seamless Data Flow Implementation"
      ],
      benefits: [
        "Eliminate data silos",
        "50% reduction in manual processes",
        "Universal data accessibility",
        "Scalable integration framework"
      ]
    },
    {
      id: "monitoring",
      title: "Operational Health Monitoring",
      icon: <Activity className="w-12 h-12" />,
      description: "Continuous system optimization and alerting",
      process: [
        "Health Metrics Definition",
        "Monitoring Dashboard Setup",
        "Intelligent Alert Configuration"
      ],
      benefits: [
        "99.9% system uptime",
        "Proactive issue resolution",
        "Performance optimization",
        "Cost reduction up to 42%"
      ]
    },
    {
      id: "consulting",
      title: "Strategic Consulting",
      icon: <Users className="w-12 h-12" />,
      description: "Guide your digital transformation journey",
      process: [
        "Digital Maturity Assessment",
        "Transformation Roadmap Creation",
        "Implementation Support"
      ],
      benefits: [
        "Clear transformation roadmap",
        "Risk mitigation strategies",
        "Change management support",
        "Measurable ROI tracking"
      ]
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      description: "Perfect for growing businesses",
      monthlyPrice: 9175, // 2500 USD = 9,175 AED
      annualPrice: 91750, // 25000 USD = 91,750 AED
      features: [
        "Basic AI analytics",
        "Up to 5 system integrations",
        "Standard monitoring",
        "Email support",
        "Monthly reports"
      ],
      popular: false
    },
    {
      name: "Growth",
      description: "Most popular for mid-size companies",
      monthlyPrice: 27525, // 7500 USD = 27,525 AED
      annualPrice: 275250, // 75000 USD = 275,250 AED
      features: [
        "Advanced AI analytics",
        "Unlimited integrations",
        "Real-time monitoring",
        "24/7 priority support",
        "Custom dashboards",
        "Predictive alerts",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      description: "Full-scale transformation",
      monthlyPrice: 55050, // 15000 USD = 55,050 AED
      annualPrice: 550500, // 150000 USD = 550,500 AED
      features: [
        "Enterprise AI suite",
        "Custom model development",
        "Dedicated infrastructure",
        "White-glove support",
        "Advanced security",
        "SLA guarantees",
        "On-site training"
      ],
      popular: false
    }
  ];

  const calculateROI = () => {
    const currentHoursLost = (roiInputs.employees * 40 * (100 - roiInputs.currentEfficiency)) / 100;
    const improvedEfficiency = Math.min(roiInputs.currentEfficiency + 25, 95);
    const hoursGained = (roiInputs.employees * 40 * (improvedEfficiency - roiInputs.currentEfficiency)) / 100;
    const monthlySavings = hoursGained * 4 * roiInputs.hourlyRate;
    return Math.round(monthlySavings);
  };

  return (
    <div className="bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What We Actually Do
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-frost/90 font-inter font-light leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transform operational chaos into intelligent clarity with our four core pillars
          </motion.p>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
        
        return (
          <section
            key={service.id}
            ref={ref}
            className="py-20 border-b border-border"
            id={service.id}
          >
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left side - Process diagram */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="text-aurora-start">{service.icon}</div>
                    <h2 className="text-4xl font-satoshi font-black text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-xl text-muted-foreground font-inter">
                    {service.description}
                  </p>
                  
                  {/* Process Steps */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-satoshi font-bold text-foreground">
                      Our Process
                    </h3>
                    {service.process.map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: stepIndex * 0.2 }}
                      >
                        <div className="w-8 h-8 bg-aurora-start rounded-full flex items-center justify-center text-midnight font-bold">
                          {stepIndex + 1}
                        </div>
                        <span className="text-foreground font-inter">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Right side - Benefits & ROI Calculator */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h3 className="text-2xl font-satoshi font-bold text-foreground mb-6">
                      Key Benefits
                    </h3>
                    <div className="space-y-4">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-aurora-start flex-shrink-0" />
                          <span className="text-muted-foreground font-inter">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* ROI Calculator (only on first service) */}
                  {index === 0 && (
                    <div className="bg-card border border-border rounded-2xl p-8">
                      <h3 className="text-2xl font-satoshi font-bold text-foreground mb-6 flex items-center">
                        <Calculator className="w-6 h-6 mr-2 text-aurora-start" />
                        ROI Calculator
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-inter text-muted-foreground mb-2">
                            Number of Employees
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="1000"
                            value={roiInputs.employees}
                            onChange={(e) => setRoiInputs({...roiInputs, employees: parseInt(e.target.value)})}
                            className="w-full"
                          />
                          <span className="text-foreground font-bold">{roiInputs.employees}</span>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-inter text-muted-foreground mb-2">
                            Current Efficiency (%)
                          </label>
                          <input
                            type="range"
                            min="30"
                            max="90"
                            value={roiInputs.currentEfficiency}
                            onChange={(e) => setRoiInputs({...roiInputs, currentEfficiency: parseInt(e.target.value)})}
                            className="w-full"
                          />
                          <span className="text-foreground font-bold">{roiInputs.currentEfficiency}%</span>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-inter text-muted-foreground mb-2">
                            Average Hourly Rate (AED)
                          </label>
                          <input
                            type="range"
                            min="92"
                            max="550"
                            value={roiInputs.hourlyRate}
                            onChange={(e) => setRoiInputs({...roiInputs, hourlyRate: parseInt(e.target.value)})}
                            className="w-full"
                          />
                          <span className="text-foreground font-bold">AED {roiInputs.hourlyRate}</span>
                        </div>
                        
                        <div className="bg-gradient-aurora rounded-xl p-6 text-center">
                          <div className="text-3xl font-satoshi font-black text-midnight mb-2">
                            AED {calculateROI().toLocaleString()}
                          </div>
                          <div className="text-midnight/80 font-inter">
                            Estimated Monthly Savings
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-black text-foreground mb-8">
              Investment Plans
            </h2>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`font-inter ${selectedPricing === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setSelectedPricing(selectedPricing === 'monthly' ? 'annual' : 'monthly')}
                className="relative w-14 h-7 bg-muted rounded-full p-1 transition-colors duration-300"
              >
                <div
                  className={`w-5 h-5 bg-aurora-start rounded-full transition-transform duration-300 ${
                    selectedPricing === 'annual' ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`font-inter ${selectedPricing === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
                <span className="text-aurora-start ml-1">(Save 17%)</span>
              </span>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`bg-card border rounded-2xl p-8 relative ${
                  tier.popular ? 'border-aurora-start scale-105' : 'border-border'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-aurora-start text-midnight px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-satoshi font-bold text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground font-inter mb-6">
                    {tier.description}
                  </p>
                  
                  <div className="text-4xl font-satoshi font-black text-foreground">
                    AED {(selectedPricing === 'monthly' ? tier.monthlyPrice : tier.annualPrice / 12).toLocaleString()}
                    <span className="text-lg text-muted-foreground font-normal">/month</span>
                  </div>
                  {selectedPricing === 'annual' && (
                    <p className="text-sm text-aurora-start font-inter mt-2">
                      Billed annually
                    </p>
                  )}
                </div>
                
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-aurora-start flex-shrink-0" />
                      <span className="text-muted-foreground font-inter">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <CTAButton 
                  variant={tier.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </CTAButton>
              </motion.div>
            ))}
          </div>
          
          {/* Trust Badges */}
          <motion.div
            className="flex justify-center items-center space-x-8 mt-16 opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-sm font-inter text-muted-foreground">SOC 2 Certified</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-inter text-muted-foreground">GDPR Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-inter text-muted-foreground">99.9% SLA</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-inter text-muted-foreground">24/7 Support</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;