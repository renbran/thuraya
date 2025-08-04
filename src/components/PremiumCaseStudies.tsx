import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { premiumCopy } from '../content/premiumCopy';
import { 
  ChevronRight, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Users, 
  Zap,
  Target,
  Award,
  BarChart3,
  Clock,
  DollarSign
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  flag: string;
  duration: string;
  teamSize: string;
  challenge: string;
  solution: string;
  results: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  metrics: {
    roi: string;
    efficiency: string;
    satisfaction: string;
  };
  technologies: string[];
  culturalElements: string[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
  featured: boolean;
}

// Transform premium copy case studies into the component format
const caseStudies: CaseStudy[] = premiumCopy.caseStudies.studies.map((study, index) => ({
  id: (index + 1).toString(),
  title: study.title,
  client: study.title.split(' ')[0] + ' Enterprise', // Generate client name from title
  industry: study.industry,
  location: study.location,
  flag: study.location.includes('Dubai') ? '🇦🇪' : study.location.includes('Saudi') ? '🇸🇦' : '��',
  duration: '6 months',
  teamSize: '10 specialists',
  challenge: study.challenge,
  solution: study.solution,
  results: {
    primary: study.results.efficiency,
    secondary: study.results.revenue,
    tertiary: study.results.satisfaction
  },
  metrics: {
    roi: study.results.efficiency.split('%')[0] + '%',
    efficiency: study.results.efficiency,
    satisfaction: study.results.satisfaction
  },
  technologies: ['AI-Powered Automation', 'Cultural Intelligence Platform', 'Process Optimization', 'Change Management'],
  culturalElements: ['Cultural Preservation', 'MENA Business Values', 'Traditional Practice Integration', 'Regional Compliance'],
  testimonial: {
    quote: study.results.relationships || "Exceptional transformation with cultural sensitivity.",
    author: 'Regional Business Leader',
    title: 'Chief Executive'
  },
  featured: index === 0
}));

export default function PremiumCaseStudies() {
  const [selectedCase, setSelectedCase] = useState<string>(caseStudies[0].id);
  const [activeSection, setActiveSection] = useState<'challenge' | 'solution' | 'results'>('challenge');

  const currentCase = caseStudies.find(c => c.id === selectedCase) || caseStudies[0];

  const sectionContent = {
    challenge: {
      title: 'The Challenge',
      content: currentCase.challenge,
      icon: Target,
      color: 'thuraya-navy'
    },
    solution: {
      title: 'Our Solution',
      content: currentCase.solution,
      icon: Zap,
      color: 'thuraya-purple'
    },
    results: {
      title: 'The Results',
      content: currentCase.results.primary + '. ' + currentCase.results.secondary + '. ' + currentCase.results.tertiary + '.',
      icon: Award,
      color: 'thuraya-gold'
    }
  };

  const currentSection = sectionContent[activeSection];
  const IconComponent = currentSection.icon;

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-thuraya-navy to-thuraya-purple rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-thuraya-gold to-thuraya-purple rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-thuraya-purple text-thuraya-purple bg-thuraya-purple/5">
            <BarChart3 className="w-4 h-4 mr-2" />
            Proven Transformation Success
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-thuraya-navy via-thuraya-purple to-thuraya-navy bg-clip-text text-transparent mb-6">
            Case Studies
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore real transformation journeys where cultural intelligence meets automation excellence, 
            delivering extraordinary results across the MENA business landscape.
          </p>
        </motion.div>

        {/* Case Study Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCase === caseStudy.id
                    ? 'ring-2 ring-thuraya-gold border-thuraya-gold/50 shadow-lg'
                    : 'border-slate-200 hover:border-thuraya-purple/50'
                }`}
                onClick={() => setSelectedCase(caseStudy.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-2xl">{caseStudy.flag}</div>
                    {caseStudy.featured && (
                      <Badge variant="secondary" className="bg-thuraya-gold text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-slate-900 leading-tight">{caseStudy.title}</CardTitle>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {caseStudy.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {caseStudy.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Badge variant="outline" className="text-xs">
                    {caseStudy.industry}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Case Study Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-thuraya-gold/20 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-thuraya-navy/5 via-transparent to-thuraya-purple/5" />
              
              {/* Header */}
              <CardHeader className="relative bg-gradient-to-r from-thuraya-navy to-thuraya-purple text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl lg:text-3xl mb-2">{currentCase.title}</CardTitle>
                    <p className="text-thuraya-gold text-lg">{currentCase.client}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <MapPin className="w-4 h-4 mr-1" />
                      {currentCase.location}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentCase.duration}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <Users className="w-4 h-4 mr-1" />
                      {currentCase.teamSize}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative p-8">
                {/* Section Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {Object.entries(sectionContent).map(([key, section]) => {
                    const SectionIcon = section.icon;
                    return (
                      <Button
                        key={key}
                        variant={activeSection === key ? "default" : "outline"}
                        onClick={() => setActiveSection(key as 'challenge' | 'solution' | 'results')}
                        className={`${
                          activeSection === key
                            ? `bg-gradient-to-r from-${section.color} to-${section.color}/80 text-white`
                            : `border-${section.color} text-${section.color} hover:bg-${section.color}/10`
                        }`}
                      >
                        <SectionIcon className="w-4 h-4 mr-2" />
                        {section.title}
                      </Button>
                    );
                  })}
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${currentSection.color} to-${currentSection.color}/80 flex items-center justify-center mr-4`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900">{currentSection.title}</h3>
                        </div>
                        <p className="text-lg text-slate-700 leading-relaxed">{currentSection.content}</p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Technologies & Cultural Elements */}
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentCase.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="border-thuraya-purple text-thuraya-purple bg-thuraya-purple/5">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-3">Cultural Elements</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentCase.culturalElements.map((element, index) => (
                            <Badge key={index} variant="outline" className="border-thuraya-gold text-thuraya-gold bg-thuraya-gold/5">
                              {element}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Sidebar */}
                  <div className="space-y-6">
                    <Card className="border-thuraya-navy/20 bg-gradient-to-br from-thuraya-navy/5 to-thuraya-purple/5">
                      <CardHeader>
                        <CardTitle className="text-lg text-slate-900 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-thuraya-navy" />
                          Key Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-thuraya-navy">{currentCase.metrics.roi}</div>
                          <div className="text-sm text-slate-600">Return on Investment</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-thuraya-purple">{currentCase.metrics.efficiency}</div>
                          <div className="text-sm text-slate-600">Efficiency Improvement</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-thuraya-gold">{currentCase.metrics.satisfaction}</div>
                          <div className="text-sm text-slate-600">Client Satisfaction</div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Testimonial */}
                    <Card className="border-thuraya-gold/20 bg-gradient-to-br from-thuraya-gold/5 to-thuraya-purple/5">
                      <CardContent className="p-6">
                        <blockquote className="text-sm text-slate-700 italic mb-4">
                          "{currentCase.testimonial.quote}"
                        </blockquote>
                        <div className="text-sm">
                          <div className="font-semibold text-slate-900">{currentCase.testimonial.author}</div>
                          <div className="text-slate-600">{currentCase.testimonial.title}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="border-2 border-thuraya-gold/20 bg-gradient-to-br from-thuraya-navy/5 via-white to-thuraya-purple/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Create Your Success Story?</h3>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Join these industry leaders in transforming your business with culturally-intelligent automation solutions.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-thuraya-navy to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-navy text-white shadow-lg">
                Start Your Transformation
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
