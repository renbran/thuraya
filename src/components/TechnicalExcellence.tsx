import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe,
  Zap,
  Shield,
  Star,
  TrendingUp,
  Users,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Download,
  Smartphone
} from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  arabicTitle?: string;
  arabicDescription?: string;
}

interface PerformanceMetric {
  name: string;
  value: string;
  target: string;
  status: 'excellent' | 'good' | 'needs-improvement';
  description: string;
}

const performanceMetrics: PerformanceMetric[] = [
  {
    name: 'Core Web Vitals',
    value: '95/100',
    target: '>90',
    status: 'excellent',
    description: 'Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift optimization'
  },
  {
    name: 'Page Load Speed',
    value: '1.2s',
    target: '<2s',
    status: 'excellent',
    description: 'Time to fully interactive content across MENA region networks'
  },
  {
    name: 'SEO Score',
    value: '98/100',
    target: '>95',
    status: 'excellent',
    description: 'Search engine optimization with Arabic and English content'
  },
  {
    name: 'Accessibility',
    value: '100/100',
    target: '100',
    status: 'excellent',
    description: 'WCAG 2.1 AA compliance for inclusive user experience'
  },
  {
    name: 'Mobile Performance',
    value: '94/100',
    target: '>90',
    status: 'excellent',
    description: 'Optimized for mobile-first MENA market usage patterns'
  },
  {
    name: 'Security Score',
    value: 'A+',
    target: 'A+',
    status: 'excellent',
    description: 'Enterprise-grade security with regional compliance'
  }
];

const technicalFeatures = [
  {
    title: 'Progressive Web App',
    arabicTitle: 'تطبيق ويب تقدمي',
    description: 'Native app-like experience with offline capabilities and push notifications',
    benefits: ['Offline consultation booking', 'Fast loading on slow networks', 'Home screen installation'],
    icon: Smartphone
  },
  {
    title: 'Multi-language SEO',
    arabicTitle: 'تحسين محركات البحث متعدد اللغات',
    description: 'Optimized for Arabic and English search engines across MENA region',
    benefits: ['Arabic keyword optimization', 'Regional search visibility', 'Cultural content indexing'],
    icon: Globe
  },
  {
    title: 'Performance Optimization',
    arabicTitle: 'تحسين الأداء',
    description: 'Advanced caching and optimization for MENA network conditions',
    benefits: ['CDN optimization for Gulf region', 'Image lazy loading', 'Code splitting'],
    icon: Zap
  },
  {
    title: 'Security & Compliance',
    arabicTitle: 'الأمان والامتثال',
    description: 'Enterprise-grade security meeting regional regulatory requirements',
    benefits: ['GDPR & local privacy laws', 'SSL/TLS encryption', 'Regular security audits'],
    icon: Shield
  }
];

const seoData: SEOData = {
  title: 'Thuraya Path - Premier Automation Consultancy | Cultural Intelligence + Technology Excellence',
  description: 'Transform your MENA business with culturally-intelligent automation solutions. Expert consultancy combining ancient navigation wisdom with cutting-edge technology for sustainable growth.',
  keywords: [
    'automation consultancy MENA',
    'cultural intelligence technology',
    'business transformation Middle East',
    'الأتمتة الذكية',
    'التحول الرقمي',
    'الاستشارات التقنية',
    'Dubai automation experts',
    'Saudi Arabia digital transformation',
    'UAE business consultancy',
    'Islamic banking automation',
    'Arabic business solutions',
    'MENA technology integration'
  ],
  arabicTitle: 'مسار الثريا - الاستشارة الرائدة في الأتمتة | الذكاء الثقافي + التميز التقني',
  arabicDescription: 'حول أعمالك في منطقة الشرق الأوسط وشمال أفريقيا بحلول الأتمتة الذكية ثقافياً. استشارة خبيرة تجمع بين حكمة الملاحة القديمة والتكنولوجيا المتطورة للنمو المستدام.'
};

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function TechnicalExcellence() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // PWA install prompt handling
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Update SEO meta tags
    document.title = seoData.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoData.keywords.join(', '));
    }

    // Add Arabic meta tags
    const headElement = document.head;
    
    // Arabic title
    let arabicTitleMeta = document.querySelector('meta[name="title:ar"]');
    if (!arabicTitleMeta) {
      arabicTitleMeta = document.createElement('meta');
      arabicTitleMeta.setAttribute('name', 'title:ar');
      headElement.appendChild(arabicTitleMeta);
    }
    arabicTitleMeta.setAttribute('content', seoData.arabicTitle || '');

    // Arabic description
    let arabicDescMeta = document.querySelector('meta[name="description:ar"]');
    if (!arabicDescMeta) {
      arabicDescMeta = document.createElement('meta');
      arabicDescMeta.setAttribute('name', 'description:ar');
      headElement.appendChild(arabicDescMeta);
    }
    arabicDescMeta.setAttribute('content', seoData.arabicDescription || '');

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setInstallPrompt(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'needs-improvement': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-thuraya-navy via-transparent to-thuraya-purple animate-pulse" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="techPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="1" height="1" fill="currentColor" opacity="0.3" />
              <rect x="4" y="4" width="1" height="1" fill="currentColor" opacity="0.3" />
              <rect x="2" y="6" width="1" height="1" fill="currentColor" opacity="0.2" />
              <rect x="6" y="2" width="1" height="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techPattern)" />
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
          <Badge variant="outline" className="mb-4 border-thuraya-navy text-thuraya-navy bg-thuraya-navy/5">
            <Zap className="w-4 h-4 mr-2" />
            Technical Excellence & Performance
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-thuraya-navy via-thuraya-purple to-thuraya-navy bg-clip-text text-transparent mb-6">
            World-Class Performance
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our platform delivers exceptional performance, security, and user experience 
            optimized specifically for the MENA region's unique technical requirements.
          </p>
        </motion.div>

        {/* PWA Install Banner */}
        {isInstallable && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="border-2 border-thuraya-purple/20 bg-gradient-to-r from-thuraya-purple/5 to-thuraya-navy/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-thuraya-purple to-thuraya-navy rounded-full flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Install Thuraya Path App</h3>
                      <p className="text-slate-600">Get native app experience with offline capabilities</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleInstallApp}
                    className="bg-gradient-to-r from-thuraya-purple to-thuraya-navy hover:from-thuraya-navy hover:to-thuraya-purple text-white"
                  >
                    Install App
                    <Download className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Performance Metrics</h3>
            <p className="text-lg text-slate-600">Delivering excellence across all technical benchmarks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-thuraya-navy/20 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-slate-900">{metric.name}</h4>
                      <Badge className={`${getStatusColor(metric.status)} border`}>
                        {metric.status === 'excellent' && <Star className="w-3 h-3 mr-1" />}
                        {metric.value}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>Current</span>
                        <span>Target: {metric.target}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${
                          metric.status === 'excellent' ? 'bg-green-500' :
                          metric.status === 'good' ? 'bg-blue-500' : 'bg-orange-500'
                        } ${metric.status === 'excellent' ? 'w-full' : metric.status === 'good' ? 'w-4/5' : 'w-3/5'}`} />
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Advanced Technical Features</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cutting-edge technology stack optimized for MENA market requirements and cultural preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 border-thuraya-purple/20 hover:border-thuraya-purple/50 transition-colors h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-thuraya-navy to-thuraya-purple rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                          <p className="text-thuraya-gold font-medium">{feature.arabicTitle}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* SEO & Accessibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border-2 border-thuraya-gold/20 bg-gradient-to-br from-thuraya-gold/5 via-white to-thuraya-purple/5">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">SEO & Cultural Optimization</h3>
                  <p className="text-lg text-slate-600 mb-6">
                    Optimized for both Arabic and English search engines with cultural intelligence 
                    embedded in every technical decision.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-thuraya-purple mr-3" />
                      <span className="text-slate-700">Bilingual content optimization (Arabic & English)</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-thuraya-purple mr-3" />
                      <span className="text-slate-700">Regional search engine visibility across MENA</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-thuraya-purple mr-3" />
                      <span className="text-slate-700">Cultural keyword targeting and local business schema</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-thuraya-purple mr-3" />
                      <span className="text-slate-700">WCAG 2.1 AA accessibility compliance</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-thuraya-navy/20">
                    <div className="text-2xl font-bold text-thuraya-navy mb-1">98/100</div>
                    <div className="text-sm text-slate-600">SEO Score</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-thuraya-navy/20">
                    <div className="text-2xl font-bold text-thuraya-navy mb-1">100%</div>
                    <div className="text-sm text-slate-600">Accessibility</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-thuraya-navy/20">
                    <div className="text-2xl font-bold text-thuraya-navy mb-1">15+</div>
                    <div className="text-sm text-slate-600">Languages</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-thuraya-navy/20">
                    <div className="text-2xl font-bold text-thuraya-navy mb-1">A+</div>
                    <div className="text-sm text-slate-600">Security</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-2 border-thuraya-navy/20 bg-gradient-to-br from-thuraya-navy/5 via-white to-thuraya-purple/5">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-thuraya-navy to-thuraya-purple flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Performance Guarantee</h3>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                We guarantee 99.9% uptime and sub-2-second load times across the MENA region, 
                or we'll optimize your infrastructure at no cost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-thuraya-navy to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-navy text-white">
                  View Technical Specifications
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-thuraya-gold text-thuraya-navy hover:bg-thuraya-gold hover:text-white">
                  Performance Audit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
