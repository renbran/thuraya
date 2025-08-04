import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ChevronLeft, ChevronRight, Globe, TrendingUp, Users, Award } from 'lucide-react';
import { premiumCopy } from '../content/premiumCopy';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  country: string;
  flag: string;
  image: string;
  quote: string;
  achievement: string;
  metrics: {
    efficiency: string;
    revenue: string;
    timeframe: string;
  };
  industry: string;
  arabic_name?: string;
}

// Enhanced testimonials using premium copy as base with additional details for premium presentation
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Al-Rashid',
    arabic_name: 'أحمد الراشد',
    title: 'CEO',
    company: 'Heritage Holdings',
    country: 'UAE',
    flag: '🇦🇪',
    image: '/src/assets/thuraya-logo-symbol.png', // Using company logo as placeholder
    quote: premiumCopy.testimonials[0].quote,
    achievement: 'Digital Transformation Excellence',
    metrics: {
      efficiency: '78% operational improvement',
      revenue: '$2.3M annual savings',
      timeframe: '6 months'
    },
    industry: premiumCopy.testimonials[0].industry
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    arabic_name: 'فاطمة الزهراء',
    title: premiumCopy.testimonials[1].title,
    company: 'Qatar Financial Excellence',
    country: 'Qatar',
    flag: '🇶🇦',
    image: '/src/assets/thuraya-logo-symbol.png',
    quote: premiumCopy.testimonials[1].quote,
    achievement: 'Innovation Leadership Award 2023',
    metrics: {
      efficiency: '85% process optimization',
      revenue: '340% ROI increase',
      timeframe: '4 months'
    },
    industry: premiumCopy.testimonials[1].industry
  },
  {
    id: '3',
    name: 'Khalid Ibn Rashid',
    arabic_name: 'خالد بن راشد',
    title: premiumCopy.testimonials[2].title,
    company: 'Heritage Commerce Group',
    country: 'Saudi Arabia',
    flag: '��',
    image: '/src/assets/thuraya-logo-symbol.png',
    quote: premiumCopy.testimonials[2].quote,
    achievement: 'Regional Business Excellence',
    metrics: {
      efficiency: '92% accuracy improvement',
      revenue: '$1.8M growth',
      timeframe: '5 months'
    },
    industry: premiumCopy.testimonials[2].industry
  }
];

const culturalCompetencies = [
  {
    icon: Globe,
    title: 'Multi-Cultural Fluency',
    description: 'Native understanding of MENA business culture and Western operational excellence',
    achievement: '15+ countries served'
  },
  {
    icon: Users,
    title: 'Relationship-First Approach',
    description: 'Building trust through personal connections and cultural respect',
    achievement: '98% client retention'
  },
  {
    icon: TrendingUp,
    title: 'Value-Aligned Solutions',
    description: 'Technology implementations that honor cultural values and traditions',
    achievement: '89% cultural adoption rate'
  },
  {
    icon: Award,
    title: 'Regional Expertise',
    description: 'Deep knowledge of MENA regulatory environments and business practices',
    achievement: '100% compliance rate'
  }
];

export default function PremiumTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [hoveredCompetency, setHoveredCompetency] = useState<number | null>(null);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-thuraya-navy via-transparent to-thuraya-purple animate-pulse" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="arabicPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arabicPattern)" />
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
            <Star className="w-4 h-4 mr-2" />
            Trusted by MENA Business Leaders
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-thuraya-navy via-thuraya-purple to-thuraya-navy bg-clip-text text-transparent mb-6">
            Voices of Transformation
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover how regional leaders leverage our cultural intelligence and automation expertise 
            to achieve extraordinary business transformation results across the MENA region.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="mb-20">
          <Card className="relative overflow-hidden border-2 border-thuraya-gold/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-thuraya-navy/5 via-transparent to-thuraya-purple/5" />
            <CardContent className="p-8 lg:p-12 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid lg:grid-cols-3 gap-8 items-center"
                >
                  {/* Quote Section */}
                  <div className="lg:col-span-2">
                    <Quote className="w-12 h-12 text-thuraya-gold mb-6" />
                    <blockquote className="text-2xl lg:text-3xl font-medium text-slate-800 leading-relaxed mb-8">
                      "{current.quote}"
                    </blockquote>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gradient-to-br from-thuraya-navy/10 to-thuraya-purple/10 rounded-lg">
                        <div className="text-2xl font-bold text-thuraya-navy">{current.metrics.efficiency}</div>
                        <div className="text-sm text-slate-600">Efficiency Gain</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-thuraya-gold/10 to-thuraya-purple/10 rounded-lg">
                        <div className="text-2xl font-bold text-thuraya-navy">{current.metrics.revenue}</div>
                        <div className="text-sm text-slate-600">Value Created</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-thuraya-purple/10 to-thuraya-navy/10 rounded-lg">
                        <div className="text-2xl font-bold text-thuraya-navy">{current.metrics.timeframe}</div>
                        <div className="text-sm text-slate-600">Timeline</div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Section */}
                  <div className="text-center lg:text-left">
                    <div className="inline-block relative mb-6">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-thuraya-navy to-thuraya-purple rounded-full p-1">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl font-bold text-thuraya-navy">
                          {current.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 text-2xl">{current.flag}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{current.name}</h3>
                    {current.arabic_name && (
                      <p className="text-lg text-thuraya-gold mb-2 font-arabic">{current.arabic_name}</p>
                    )}
                    <p className="text-slate-600 mb-1">{current.title}</p>
                    <p className="font-semibold text-thuraya-navy mb-2">{current.company}</p>
                    <Badge variant="secondary" className="mb-4">
                      {current.industry}
                    </Badge>
                    <div className="text-sm text-thuraya-purple font-medium">
                      🏆 {current.achievement}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-8 border-t border-slate-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="border-thuraya-gold text-thuraya-navy hover:bg-thuraya-gold hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      title={`View testimonial ${index + 1}`}
                      aria-label={`View testimonial from ${testimonials[index].name}`}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial
                          ? 'bg-thuraya-gold'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="border-thuraya-gold text-thuraya-navy hover:bg-thuraya-gold hover:text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cultural Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Cultural Intelligence Advantage</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our deep understanding of MENA business culture creates lasting transformation success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturalCompetencies.map((competency, index) => {
            const IconComponent = competency.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCompetency(index)}
                onMouseLeave={() => setHoveredCompetency(null)}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-thuraya-purple/20 border-2 hover:border-thuraya-gold/50">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-thuraya-navy to-thuraya-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      {hoveredCompetency === index && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 bg-thuraya-gold/20 rounded-full animate-ping"
                        />
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{competency.title}</h4>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{competency.description}</p>
                    <Badge variant="outline" className="border-thuraya-purple text-thuraya-purple bg-thuraya-purple/5">
                      {competency.achievement}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
