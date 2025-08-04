import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";
import { fadeInUp, staggerContainer } from "@/lib/variants";
import { Brain, Network, Activity, Users, Calculator, ArrowRight, CheckCircle, Star } from "lucide-react";

const Services = () => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState<"monthly" | "annual">("monthly");
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    currentEfficiency: 70,
    hourlyRate: 184 // 50 USD = 184 AED
  });

  const services = [
    {
      id: "analytics",
      title: t('services.analytics.title'),
      icon: <Brain className="w-12 h-12" />,
      description: t('services.analytics.description'),
      process: [
        t('services.analytics.process.0'),
        t('services.analytics.process.1'),
        t('services.analytics.process.2')
      ],
      benefits: [
        t('services.analytics.benefits.0'),
        t('services.analytics.benefits.1'),
        t('services.analytics.benefits.2'),
        t('services.analytics.benefits.3')
      ]
    },
    {
      id: "integration",
      title: t('services.integration.title'),
      icon: <Network className="w-12 h-12" />,
      description: t('services.integration.description'),
      process: [
        t('services.integration.process.0'),
        t('services.integration.process.1'),
        t('services.integration.process.2')
      ],
      benefits: [
        t('services.integration.benefits.0'),
        t('services.integration.benefits.1'),
        t('services.integration.benefits.2'),
        t('services.integration.benefits.3')
      ]
    },
    {
      id: "monitoring",
      title: t('services.monitoring.title'),
      icon: <Activity className="w-12 h-12" />,
      description: t('services.monitoring.description'),
      process: [
        t('services.monitoring.process.0'),
        t('services.monitoring.process.1'),
        t('services.monitoring.process.2')
      ],
      benefits: [
        t('services.monitoring.benefits.0'),
        t('services.monitoring.benefits.1'),
        t('services.monitoring.benefits.2'),
        t('services.monitoring.benefits.3')
      ]
    },
    {
      id: "consulting",
      title: t('services.consulting.title'),
      icon: <Users className="w-12 h-12" />,
      description: t('services.consulting.description'),
      process: [
        t('services.consulting.process.0'),
        t('services.consulting.process.1'),
        t('services.consulting.process.2')
      ],
      benefits: [
        t('services.consulting.benefits.0'),
        t('services.consulting.benefits.1'),
        t('services.consulting.benefits.2'),
        t('services.consulting.benefits.3')
      ]
    }
  ];

  const pricingTiers = [
    {
      name: t('services.pricing.starter.name'),
      description: t('services.pricing.starter.description'),
      monthlyPrice: 8999, // AED 8,999
      annualPrice: 89990, // AED 89,990 (10 months price)
      userLimit: t('services.pricing.starter.userLimit'),
      features: [
        t('services.pricing.starter.features.0'),
        t('services.pricing.starter.features.1'),
        t('services.pricing.starter.features.2'),
        t('services.pricing.starter.features.3'),
        t('services.pricing.starter.features.4'),
        t('services.pricing.starter.features.5')
      ],
      popular: false
    },
    {
      name: t('services.pricing.silver.name'),
      description: t('services.pricing.silver.description'),
      monthlyPrice: 26999, // AED 26,999 per month
      annualPrice: null, // Monthly only
      userLimit: t('services.pricing.silver.userLimit'),
      features: [
        t('services.pricing.silver.features.0'),
        t('services.pricing.silver.features.1'),
        t('services.pricing.silver.features.2'),
        t('services.pricing.silver.features.3'),
        t('services.pricing.silver.features.4'),
        t('services.pricing.silver.features.5'),
        t('services.pricing.silver.features.6'),
        t('services.pricing.silver.features.7')
      ],
      popular: true
    },
    {
      name: t('services.pricing.enterprise.name'),
      description: t('services.pricing.enterprise.description'),
      monthlyPrice: 49999, // AED 49,999 per month
      annualPrice: null, // Monthly only
      userLimit: t('services.pricing.enterprise.userLimit'),
      features: [
        t('services.pricing.enterprise.features.0'),
        t('services.pricing.enterprise.features.1'),
        t('services.pricing.enterprise.features.2'),
        t('services.pricing.enterprise.features.3'),
        t('services.pricing.enterprise.features.4'),
        t('services.pricing.enterprise.features.5'),
        t('services.pricing.enterprise.features.6'),
        t('services.pricing.enterprise.features.7')
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
            {t('services.hero.title')}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-frost/90 font-inter font-light leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('services.hero.subtitle')}
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
                      {t('services.sections.process')}
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
                      {t('services.sections.benefits')}
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
                        {t('services.roiCalculator.title')}
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-inter text-muted-foreground mb-2">
                            {t('services.roiCalculator.employees')}
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
                            {t('services.roiCalculator.efficiency')}
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
                            {t('services.roiCalculator.hourlyRate')}
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
                            {t('services.roiCalculator.savings')}
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
              {t('services.pricing.title')}
            </h2>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`font-inter ${selectedPricing === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                {t('services.pricing.monthly')}
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
                {t('services.pricing.annual')}
                <span className="text-aurora-start ml-1">({t('services.pricing.save')})</span>
              </span>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mb-8">
              {t('services.pricing.note')}
            </p>
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
                      {t('services.pricing.popular')}
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
                    AED {(
                      selectedPricing === 'monthly' || !tier.annualPrice 
                        ? tier.monthlyPrice 
                        : Math.round(tier.annualPrice / 12)
                    ).toLocaleString()}
                    <span className="text-lg text-muted-foreground font-normal">/{t('services.pricing.month')}</span>
                  </div>
                  {selectedPricing === 'annual' && tier.annualPrice && (
                    <p className="text-sm text-aurora-start font-inter mt-2">
                      {t('services.pricing.billedAnnually')}
                    </p>
                  )}
                  {!tier.annualPrice && (
                    <p className="text-sm text-muted-foreground font-inter mt-2">
                      {t('services.pricing.monthlyOnly')}
                    </p>
                  )}
                  
                  {tier.userLimit && (
                    <div className="mt-3 text-sm font-satoshi font-bold text-aurora-start">
                      {tier.userLimit}
                    </div>
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
                  {t('services.pricing.getStarted')}
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
              <div className="text-sm font-inter text-muted-foreground">{t('services.trustBadges.soc2')}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-inter text-muted-foreground">{t('services.trustBadges.gdpr')}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-inter text-muted-foreground">{t('services.trustBadges.sla')}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-inter text-muted-foreground">{t('services.trustBadges.support')}</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;