import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { premiumCopy } from '../content/premiumCopy';
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  Globe,
  Users,
  Clock,
  Shield,
  Phone,
  ChevronRight,
  Sparkles,
  LucideIcon
} from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  price: string;
  period: string;
  priceNote: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  culturalBenefits: string[];
  recommended: boolean;
  enterprise: boolean;
  cta: string;
  deliveryTime: string;
}

// Transform premium copy pricing into component format
const pricingTiers: PricingTier[] = premiumCopy.pricing.packages.map((pkg, index) => ({
  id: pkg.name.toLowerCase().replace(' ', '-'),
  name: pkg.name,
  arabicName: pkg.name === 'Navigation Assessment' ? 'تقييم الملاحة' : 
               pkg.name === 'Guided Transformation' ? 'التحول المُوجَّه' : 'الشراكة المستمرة',
  description: pkg.description,
  price: pkg.price,
  period: pkg.duration,
  priceNote: pkg.ideal.replace('Perfect for: ', ''),
  icon: index === 0 ? Globe : index === 1 ? Star : Crown,
  gradient: index === 0 ? 'from-thuraya-navy to-thuraya-purple' :
            index === 1 ? 'from-thuraya-purple to-thuraya-gold' : 'from-thuraya-gold to-thuraya-navy',
  features: pkg.features,
  culturalBenefits: [
    'MENA Business Culture Analysis',
    'Relationship-Preserving Automation', 
    'Cultural Sensitivity Integration',
    'Regional Compliance Review'
  ],
  recommended: pkg.recommended || false,
  enterprise: index === 2,
  cta: index === 0 ? 'Begin Assessment' : index === 1 ? 'Start Transformation' : 'Enterprise Consultation',
  deliveryTime: pkg.duration
}));

const additionalServices = [
  {
    title: 'Strategic Assessment',
    description: 'Comprehensive cultural and technical readiness evaluation',
    price: '$5,000',
    duration: '2 weeks'
  },
  {
    title: 'Cultural Intelligence Training',
    description: 'Executive and team training on automation with cultural sensitivity',
    price: '$3,000',
    duration: '1 week'
  },
  {
    title: 'Ongoing Consultation',
    description: 'Monthly strategic guidance and optimization sessions',
    price: '$2,500/month',
    duration: 'Ongoing'
  }
];

export default function PremiumPricing() {
  const [billingCycle, setBillingCycle] = useState<'project' | 'monthly'>('project');
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-thuraya-navy via-transparent to-thuraya-purple animate-pulse" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="constellation" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.3" />
              <circle cx="2" cy="2" r="0.3" fill="currentColor" opacity="0.2" />
              <circle cx="8" cy="3" r="0.4" fill="currentColor" opacity="0.25" />
              <circle cx="3" cy="8" r="0.3" fill="currentColor" opacity="0.2" />
              <circle cx="7" cy="7" r="0.35" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#constellation)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-thuraya-gold text-thuraya-gold bg-thuraya-gold/5">
            <Sparkles className="w-4 h-4 mr-2" />
            Premium Transformation Packages
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-thuraya-navy via-thuraya-purple to-thuraya-navy bg-clip-text text-transparent mb-6">
            Investment in Excellence
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose your transformation journey. Each package combines cutting-edge automation 
            with deep cultural intelligence for sustainable business success in the MENA region.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`relative ${tier.recommended ? 'lg:scale-105 lg:-translate-y-4' : ''}`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-thuraya-gold to-thuraya-purple text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                  tier.recommended 
                    ? 'border-2 border-thuraya-gold shadow-2xl shadow-thuraya-gold/20' 
                    : 'border-slate-200 hover:border-thuraya-purple/50 hover:shadow-xl hover:shadow-thuraya-purple/10'
                } ${hoveredTier === tier.id ? 'scale-105' : ''}`}>
                  
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-5`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      {tier.enterprise && (
                        <Badge variant="outline" className="border-thuraya-navy text-thuraya-navy bg-thuraya-navy/5">
                          Enterprise
                        </Badge>
                      )}
                    </div>
                    
                    <CardTitle className="text-2xl text-slate-900 mb-2">{tier.name}</CardTitle>
                    <p className="text-thuraya-gold font-medium mb-2 text-lg">{tier.arabicName}</p>
                    <p className="text-slate-600 leading-relaxed">{tier.description}</p>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                        {tier.period !== 'quote' && (
                          <span className="text-slate-600 ml-2">/{tier.period}</span>
                        )}
                      </div>
                      <p className="text-sm text-thuraya-purple font-medium">{tier.priceNote}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="relative flex-1 flex flex-col">
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3">Core Features</h4>
                      <ul className="space-y-2">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cultural Benefits */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-thuraya-gold" />
                        Cultural Intelligence
                      </h4>
                      <ul className="space-y-2">
                        {tier.culturalBenefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <Star className="w-4 h-4 text-thuraya-gold mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Delivery Info */}
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-thuraya-purple" />
                        Delivery: {tier.deliveryTime}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Button 
                        size="lg" 
                        className={`w-full ${
                          tier.recommended
                            ? 'bg-gradient-to-r from-thuraya-gold to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-gold'
                            : 'bg-gradient-to-r from-thuraya-navy to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-navy'
                        } text-white shadow-lg group`}
                      >
                        {tier.cta}
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Additional Services</h3>
            <p className="text-lg text-slate-600">Enhance your transformation with specialized services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-thuraya-purple/20 hover:border-thuraya-purple/50 transition-colors h-full">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h4>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xl font-bold text-thuraya-navy">{service.price}</div>
                        <div className="text-sm text-slate-500">{service.duration}</div>
                      </div>
                      <Button variant="outline" size="sm" className="border-thuraya-purple text-thuraya-purple hover:bg-thuraya-purple hover:text-white">
                        Add Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-2 border-thuraya-gold/20 bg-gradient-to-br from-thuraya-navy/5 via-white to-thuraya-purple/5">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-thuraya-gold to-thuraya-purple flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Transform Your Business?</h3>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Schedule a strategic consultation to discover how our cultural intelligence and automation expertise 
                can accelerate your business transformation in the MENA market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-thuraya-navy to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-navy text-white shadow-lg">
                  Schedule Free Consultation
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-thuraya-gold text-thuraya-navy hover:bg-thuraya-gold hover:text-white">
                  Download Strategic Assessment
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-4">
                No commitment required • 30-minute strategic session • Cultural readiness evaluation included
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
