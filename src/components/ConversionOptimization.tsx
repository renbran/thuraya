import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Download, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Globe,
  Zap,
  BookOpen,
  Award,
  Target,
  Lightbulb,
  LucideIcon
} from 'lucide-react';

interface LeadMagnet {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  benefits: string[];
  downloadText: string;
  icon: LucideIcon;
  gradient: string;
  featured: boolean;
  estimatedTime: string;
}

const leadMagnets: LeadMagnet[] = [
  {
    id: 'strategic-assessment',
    title: 'Strategic Automation Assessment',
    arabicTitle: 'تقييم الأتمتة الاستراتيجية',
    description: 'Comprehensive evaluation framework to identify automation opportunities while preserving your cultural values and business relationships.',
    benefits: [
      'Cultural Readiness Score for automation adoption',
      'Process optimization priorities for MENA businesses',
      'ROI projections with cultural impact considerations',
      'Implementation roadmap respecting traditional practices',
      '30-minute strategy consultation included'
    ],
    downloadText: 'Get Your Free Assessment',
    icon: Target,
    gradient: 'from-thuraya-navy to-thuraya-purple',
    featured: true,
    estimatedTime: '15 minutes'
  },
  {
    id: 'cultural-intelligence-guide',
    title: 'Cultural Intelligence Playbook',
    arabicTitle: 'دليل الذكاء الثقافي',
    description: 'Essential guide for implementing technology solutions that honor MENA business culture while driving exceptional results.',
    benefits: [
      'Understanding relationship-based business practices',
      'Technology adoption strategies for traditional organizations',
      'Case studies from successful MENA transformations',
      'Cultural sensitivity checklist for automation projects',
      'Arabic business terminology and best practices'
    ],
    downloadText: 'Download Playbook',
    icon: Globe,
    gradient: 'from-thuraya-gold to-thuraya-purple',
    featured: false,
    estimatedTime: '20 minutes'
  },
  {
    id: 'roi-calculator',
    title: 'Automation ROI Calculator',
    arabicTitle: 'حاسبة عائد الاستثمار',
    description: 'Interactive tool to calculate potential returns from automation investments with cultural impact analysis for MENA organizations.',
    benefits: [
      'Customized ROI projections for your industry',
      'Cultural change management cost factors',
      'Risk assessment for traditional business models',
      'Implementation timeline with cultural considerations',
      'Benchmarking against regional success stories'
    ],
    downloadText: 'Calculate Your ROI',
    icon: TrendingUp,
    gradient: 'from-thuraya-purple to-thuraya-navy',
    featured: false,
    estimatedTime: '10 minutes'
  }
];

const quizQuestions = [
  {
    question: 'How would you describe your organization\'s approach to technology adoption?',
    options: [
      'Cautious and relationship-focused',
      'Progressive but values-conscious',
      'Innovative with cultural sensitivity',
      'Traditional with selective modernization'
    ]
  },
  {
    question: 'What is your primary concern about business automation?',
    options: [
      'Preserving personal business relationships',
      'Maintaining cultural values and practices',
      'Ensuring staff adaptation and acceptance',
      'Balancing efficiency with quality service'
    ]
  },
  {
    question: 'Which best describes your current business processes?',
    options: [
      'Highly manual with strong personal touch',
      'Semi-automated with relationship elements',
      'Modern systems with cultural adaptations',
      'Traditional methods with digital supplements'
    ]
  }
];

export default function ConversionOptimization() {
  const [selectedMagnet, setSelectedMagnet] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    message: ''
  });
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progressPercentage = ((quizStep + 1) / quizQuestions.length) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSelectedMagnet(null);
    setFormData({ name: '', email: '', company: '', industry: '', message: '' });
    
    // Show success message
    alert('Thank you! Your strategic assessment will be sent to your email within 24 hours.');
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Quiz completed - show results
      setShowQuiz(false);
      setSelectedMagnet('strategic-assessment');
    }
  };

  const currentMagnet = leadMagnets.find(m => m.id === selectedMagnet);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-thuraya-navy via-transparent to-thuraya-purple animate-pulse" />
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
            <Download className="w-4 h-4 mr-2" />
            Free Strategic Resources
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-thuraya-navy via-thuraya-purple to-thuraya-navy bg-clip-text text-transparent mb-6">
            Start Your Transformation Journey
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Access our premium strategic resources designed specifically for MENA business leaders 
            ready to embrace automation while honoring their cultural values.
          </p>
        </motion.div>

        {/* Cultural Intelligence Quiz CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Card className="border-2 border-thuraya-purple/20 bg-gradient-to-br from-thuraya-purple/5 via-white to-thuraya-navy/5 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-thuraya-purple to-thuraya-navy flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Discover Your Cultural Automation Readiness
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Take our 3-minute cultural intelligence assessment to receive a personalized automation strategy for your organization.
              </p>
              <Button 
                size="lg" 
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-thuraya-purple to-thuraya-navy hover:from-thuraya-navy hover:to-thuraya-purple text-white shadow-lg"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lead Magnets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {leadMagnets.map((magnet, index) => {
            const IconComponent = magnet.icon;
            return (
              <motion.div
                key={magnet.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group ${magnet.featured ? 'md:scale-105' : ''}`}
              >
                {magnet.featured && (
                  <div className="text-center mb-4">
                    <Badge className="bg-gradient-to-r from-thuraya-gold to-thuraya-purple text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-thuraya-purple/20 ${
                  magnet.featured 
                    ? 'border-2 border-thuraya-gold shadow-lg' 
                    : 'border-slate-200 hover:border-thuraya-purple/50'
                }`}
                onClick={() => setSelectedMagnet(magnet.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${magnet.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {magnet.estimatedTime}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl text-slate-900 mb-2">{magnet.title}</CardTitle>
                    <p className="text-thuraya-gold font-medium mb-4">{magnet.arabicTitle}</p>
                    <p className="text-slate-600 leading-relaxed">{magnet.description}</p>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-2 mb-6 flex-1">
                      {magnet.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full bg-gradient-to-r ${magnet.gradient} hover:shadow-lg text-white group`}
                      onClick={() => setSelectedMagnet(magnet.id)}
                    >
                      {magnet.downloadText}
                      <Download className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: '2,500+', label: 'Downloads', icon: Download },
            { number: '89%', label: 'Implementation Success', icon: TrendingUp },
            { number: '15', label: 'Countries Served', icon: Globe },
            { number: '4.9/5', label: 'User Rating', icon: Star }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center border-thuraya-navy/20 bg-gradient-to-br from-thuraya-navy/5 to-thuraya-purple/5">
                <CardContent className="p-6">
                  <IconComponent className="w-8 h-8 text-thuraya-navy mx-auto mb-3" />
                  <div className="text-2xl font-bold text-thuraya-navy">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuiz(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Cultural Automation Assessment
                </h3>
                <p className="text-slate-600">
                  Question {quizStep + 1} of {quizQuestions.length}
                </p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-4 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r from-thuraya-purple to-thuraya-navy h-2 rounded-full transition-all duration-300 ${
                      quizStep === 0 ? 'w-1/3' : 
                      quizStep === 1 ? 'w-2/3' : 
                      'w-full'
                    }`}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-slate-900 mb-6">
                  {quizQuestions[quizStep].question}
                </h4>
                <div className="space-y-3">
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left p-4 h-auto border-slate-200 hover:border-thuraya-purple hover:bg-thuraya-purple/5"
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setShowQuiz(false)}>
                  Cancel
                </Button>
                {quizStep > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setQuizStep(quizStep - 1)}
                  >
                    Previous
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Form Modal */}
      <AnimatePresence>
        {selectedMagnet && currentMagnet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMagnet(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentMagnet.gradient} flex items-center justify-center mx-auto mb-4`}>
                  <currentMagnet.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {currentMagnet.title}
                </h3>
                <p className="text-thuraya-gold font-medium">
                  {currentMagnet.arabicTitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-thuraya-purple"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Business Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-thuraya-purple"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="company"
                      placeholder="Company Name *"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-thuraya-purple"
                    />
                  </div>
                  <div>
                    <Input
                      name="industry"
                      placeholder="Industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="border-slate-300 focus:border-thuraya-purple"
                    />
                  </div>
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your automation goals (optional)"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-slate-300 focus:border-thuraya-purple"
                    rows={3}
                  />
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                  <Button type="button" variant="outline" onClick={() => setSelectedMagnet(null)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-thuraya-navy to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-navy text-white"
                  >
                    {isSubmitting ? 'Sending...' : currentMagnet.downloadText}
                    {!isSubmitting && <Download className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
