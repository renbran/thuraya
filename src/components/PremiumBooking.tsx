import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  Video,
  MapPin,
  Shield,
  Award,
  Zap,
  LucideIcon
} from 'lucide-react';

interface ConsultationType {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  recommended: boolean;
}

const consultationTypes: ConsultationType[] = [
  {
    id: 'strategic-assessment',
    title: 'Strategic Assessment',
    arabicTitle: 'التقييم الاستراتيجي',
    description: 'Comprehensive evaluation of your automation readiness with cultural intelligence analysis',
    duration: '60 minutes',
    price: 'Free',
    features: [
      'Cultural readiness assessment',
      'Process optimization opportunities',
      'Technology stack evaluation',
      'Implementation roadmap outline',
      'ROI projections',
      'Follow-up strategic report'
    ],
    icon: Shield,
    gradient: 'from-thuraya-navy to-thuraya-purple',
    recommended: true
  },
  {
    id: 'deep-dive-consultation',
    title: 'Deep-Dive Consultation',
    arabicTitle: 'الاستشارة المتخصصة',
    description: 'Intensive session for organizations ready to begin their transformation journey',
    duration: '90 minutes',
    price: '$500',
    features: [
      'Detailed process mapping',
      'Cultural change management strategy',
      'Technology architecture planning',
      'Team readiness assessment',
      'Detailed implementation timeline',
      'Risk mitigation strategies',
      '30-day email support'
    ],
    icon: Zap,
    gradient: 'from-thuraya-purple to-thuraya-gold',
    recommended: false
  },
  {
    id: 'executive-advisory',
    title: 'Executive Advisory Session',
    arabicTitle: 'الجلسة الاستشارية التنفيذية',
    description: 'High-level strategic guidance for C-suite executives and business owners',
    duration: '120 minutes',
    price: '$1,200',
    features: [
      'Board-ready transformation strategy',
      'Cultural leadership framework',
      'Investment and resource planning',
      'Stakeholder alignment strategy',
      'Change management blueprint',
      'Regional market insights',
      '90-day implementation support'
    ],
    icon: Award,
    gradient: 'from-thuraya-gold to-thuraya-navy',
    recommended: false
  }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
];

const availableDates = [
  { date: '2024-01-15', available: true },
  { date: '2024-01-16', available: true },
  { date: '2024-01-17', available: false },
  { date: '2024-01-18', available: true },
  { date: '2024-01-19', available: true },
  { date: '2024-01-22', available: true },
  { date: '2024-01-23', available: true },
];

export default function PremiumBooking() {
  const [selectedType, setSelectedType] = useState<string>(consultationTypes[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'type' | 'schedule' | 'details' | 'confirmation'>('type');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    industry: '',
    teamSize: '',
    challenges: '',
    goals: '',
    timeline: '',
    budget: '',
    preferredLanguage: 'English'
  });

  const currentType = consultationTypes.find(t => t.id === selectedType) || consultationTypes[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (step === 'type') setStep('schedule');
    else if (step === 'schedule') setStep('details');
    else if (step === 'details') setStep('confirmation');
  };

  const prevStep = () => {
    if (step === 'confirmation') setStep('details');
    else if (step === 'details') setStep('schedule');
    else if (step === 'schedule') setStep('type');
  };

  const canProceed = () => {
    if (step === 'type') return selectedType;
    if (step === 'schedule') return selectedDate && selectedTime;
    if (step === 'details') return formData.name && formData.email && formData.company;
    return false;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-thuraya-navy via-transparent to-thuraya-purple animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-thuraya-gold text-thuraya-gold bg-thuraya-gold/5">
            <Calendar className="w-4 h-4 mr-2" />
            Premium Consultation Booking
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-thuraya-navy via-thuraya-purple to-thuraya-navy bg-clip-text text-transparent mb-6">
            Book Your Strategic Session
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Schedule a personalized consultation with our cultural intelligence and automation experts 
            to chart your transformation journey.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {['Type', 'Schedule', 'Details', 'Confirm'].map((stepName, index) => {
              const stepKeys = ['type', 'schedule', 'details', 'confirmation'];
              const currentStepIndex = stepKeys.indexOf(step);
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={stepName} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-thuraya-purple text-white' 
                      : isCompleted 
                        ? 'bg-thuraya-gold text-white' 
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive || isCompleted ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {stepName}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-thuraya-gold' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-2 border-thuraya-gold/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-thuraya-navy/5 via-transparent to-thuraya-purple/5" />
          
          <CardContent className="p-8 relative">
            <AnimatePresence mode="wait">
              {/* Step 1: Consultation Type */}
              {step === 'type' && (
                <motion.div
                  key="type"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Consultation Type</h3>
                    <p className="text-slate-600">Select the session that best fits your current needs and objectives</p>
                  </div>

                  <div className="grid gap-6">
                    {consultationTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div
                          key={type.id}
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedType === type.id ? 'ring-2 ring-thuraya-gold' : ''
                          }`}
                          onClick={() => setSelectedType(type.id)}
                        >
                          <Card className={`border-2 ${
                            selectedType === type.id 
                              ? 'border-thuraya-gold shadow-lg' 
                              : 'border-slate-200 hover:border-thuraya-purple/50'
                          }`}>
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-xl font-bold text-slate-900">{type.title}</h4>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-thuraya-navy">{type.price}</div>
                                      <div className="text-sm text-slate-500">{type.duration}</div>
                                    </div>
                                  </div>
                                  
                                  <p className="text-thuraya-gold font-medium mb-3">{type.arabicTitle}</p>
                                  <p className="text-slate-600 mb-4">{type.description}</p>
                                  
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {type.features.map((feature, index) => (
                                      <li key={index} className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-slate-700">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              {type.recommended && (
                                <div className="mt-4 pt-4 border-t border-slate-200">
                                  <Badge className="bg-thuraya-gold text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Recommended for First-Time Clients
                                  </Badge>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Schedule */}
              {step === 'schedule' && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Select Date & Time</h3>
                    <p className="text-slate-600">Choose your preferred consultation slot (times shown in Gulf Standard Time)</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Date Selection */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Available Dates</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {availableDates.map((dateOption) => (
                          <button
                            key={dateOption.date}
                            disabled={!dateOption.available}
                            onClick={() => setSelectedDate(dateOption.date)}
                            className={`p-3 text-left rounded-lg border-2 transition-all ${
                              selectedDate === dateOption.date
                                ? 'border-thuraya-gold bg-thuraya-gold/10 text-thuraya-navy'
                                : dateOption.available
                                  ? 'border-slate-200 hover:border-thuraya-purple/50 hover:bg-slate-50'
                                  : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            {formatDate(dateOption.date)}
                            {!dateOption.available && (
                              <span className="block text-xs text-slate-400">Fully booked</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Available Times</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            disabled={!selectedDate}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 text-center rounded-lg border-2 transition-all ${
                              selectedTime === time
                                ? 'border-thuraya-gold bg-thuraya-gold/10 text-thuraya-navy'
                                : selectedDate
                                  ? 'border-slate-200 hover:border-thuraya-purple/50 hover:bg-slate-50'
                                  : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {!selectedDate && (
                        <p className="text-sm text-slate-500 mt-2">Please select a date first</p>
                      )}
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="mt-6 p-4 bg-thuraya-gold/10 rounded-lg border border-thuraya-gold/20">
                      <h5 className="font-semibold text-slate-900 mb-2">Selected Appointment</h5>
                      <p className="text-slate-700">
                        <span className="font-medium">{currentType.title}</span> on{' '}
                        <span className="font-medium">{formatDate(selectedDate)}</span> at{' '}
                        <span className="font-medium">{selectedTime} GST</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Details */}
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Details</h3>
                    <p className="text-slate-600">Help us prepare for a more productive consultation</p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Business Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="company"
                        placeholder="Company Name *"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="title"
                        placeholder="Your Title/Position"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="industry"
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="teamSize"
                        placeholder="Team Size"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                      />
                      <select
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleInputChange}
                        title="Preferred Language"
                        aria-label="Select preferred language for consultation"
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-thuraya-purple focus:border-transparent"
                      >
                        <option value="English">English</option>
                        <option value="Arabic">العربية</option>
                        <option value="Both">Both English & Arabic</option>
                      </select>
                    </div>

                    <Textarea
                      name="challenges"
                      placeholder="What are your main business challenges or automation goals?"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      rows={3}
                    />

                    <Textarea
                      name="goals"
                      placeholder="What would you like to achieve from this consultation?"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={3}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="timeline"
                        placeholder="Expected Implementation Timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                      />
                      <Input
                        name="budget"
                        placeholder="Estimated Budget Range (Optional)"
                        value={formData.budget}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-thuraya-gold to-thuraya-purple rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Confirm Your Booking</h3>
                    <p className="text-slate-600">Review your consultation details before confirming</p>
                  </div>

                  <Card className="border-thuraya-gold/20 bg-gradient-to-br from-thuraya-gold/5 to-white">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-4">Consultation Summary</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Service:</span>
                          <span className="font-medium text-slate-900">{currentType.title}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Date:</span>
                          <span className="font-medium text-slate-900">{selectedDate && formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Time:</span>
                          <span className="font-medium text-slate-900">{selectedTime} GST</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Duration:</span>
                          <span className="font-medium text-slate-900">{currentType.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Investment:</span>
                          <span className="font-bold text-thuraya-navy text-lg">{currentType.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Language:</span>
                          <span className="font-medium text-slate-900">{formData.preferredLanguage}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-thuraya-purple/20 bg-gradient-to-br from-thuraya-purple/5 to-white">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-slate-900 mb-3">What to Expect</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Video className="w-4 h-4 text-thuraya-purple mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">Video conference link will be sent 24 hours before the session</span>
                        </li>
                        <li className="flex items-start">
                          <Mail className="w-4 h-4 text-thuraya-purple mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">Preparation materials and agenda will be shared in advance</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-thuraya-purple mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700 text-sm">Detailed follow-up report with recommendations within 48 hours</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-8 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 'type'}
                className="border-thuraya-purple text-thuraya-purple hover:bg-thuraya-purple hover:text-white"
              >
                Previous
              </Button>

              <div className="text-center">
                <p className="text-sm text-slate-500">
                  {step === 'type' && 'Select your consultation type'}
                  {step === 'schedule' && 'Choose your preferred time'}
                  {step === 'details' && 'Complete your information'}
                  {step === 'confirmation' && 'Ready to book your session'}
                </p>
              </div>

              {step === 'confirmation' ? (
                <Button
                  className="bg-gradient-to-r from-thuraya-gold to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-gold text-white shadow-lg"
                  onClick={() => alert('Booking confirmed! You will receive a confirmation email shortly.')}
                >
                  Confirm Booking
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-thuraya-navy to-thuraya-purple hover:from-thuraya-purple hover:to-thuraya-navy text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
