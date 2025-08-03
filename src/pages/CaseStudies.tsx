import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";
import { fadeInUp } from "@/lib/variants";
import { Filter, X, Download, Play, Building, DollarSign, Users, Zap, TrendingUp, Clock } from "lucide-react";

const CaseStudies = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  
  const filters = {
    industry: ["Manufacturing", "Finance", "Healthcare", "Retail", "Technology"],
    tech: ["AI Analytics", "System Integration", "Cloud Migration", "Automation"]
  };
  
  const caseStudies = [
    {
      id: 1,
      title: "Global Manufacturing Giant",
      company: "TechCorp Industries",
      industry: "Manufacturing",
      tech: ["AI Analytics", "System Integration"],
      stat: "+37% throughput in 6 weeks",
      description: "Transformed production line efficiency through AI-powered predictive maintenance",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
      challenge: "Frequent equipment downtime was costing millions in lost production",
      solution: "Implemented predictive maintenance with real-time monitoring and AI alerts",
      results: [
        { metric: "Production Throughput", improvement: "+37%" },
        { metric: "Equipment Downtime", improvement: "-64%" },
        { metric: "Maintenance Costs", improvement: "-28%" },
        { metric: "ROI Timeline", improvement: "6 weeks" }
      ],
      testimonial: {
        quote: "EAGER MARVEL didn't just solve our problems—they fundamentally changed how we think about operations.",
        author: "Sarah Johnson",
        role: "VP of Operations"
      },
      video: "https://cdn.pixabay.com/vimeo/459133709/factory-42371.mp4"
    },
    {
      id: 2,
      title: "Premier Financial Services",
      company: "Global Finance Corp",
      industry: "Finance",
      tech: ["AI Analytics", "Automation"],
      stat: "50% faster compliance reporting",
      description: "Automated regulatory compliance with intelligent document processing",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=100&fit=crop",
      challenge: "Manual compliance processes taking weeks and prone to errors",
      solution: "AI-powered document analysis and automated reporting workflows",
      results: [
        { metric: "Reporting Speed", improvement: "50% faster" },
        { metric: "Accuracy Rate", improvement: "99.7%" },
        { metric: "Manual Effort", improvement: "-75%" },
        { metric: "Compliance Costs", improvement: "-45%" }
      ],
      testimonial: {
        quote: "The accuracy and speed improvements have been game-changing for our compliance team.",
        author: "Michael Chen",
        role: "Chief Compliance Officer"
      }
    },
    {
      id: 3,
      title: "Regional Healthcare Network",
      company: "MedCare Systems",
      industry: "Healthcare",
      tech: ["System Integration", "AI Analytics"],
      stat: "28% reduction in patient wait times",
      description: "Optimized patient flow through intelligent scheduling and resource allocation",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=100&fit=crop",
      challenge: "Inefficient patient scheduling leading to long wait times and resource waste",
      solution: "Intelligent scheduling system with predictive patient flow optimization",
      results: [
        { metric: "Patient Wait Times", improvement: "-28%" },
        { metric: "Resource Utilization", improvement: "+42%" },
        { metric: "Patient Satisfaction", improvement: "+35%" },
        { metric: "Staff Efficiency", improvement: "+31%" }
      ],
      testimonial: {
        quote: "Our patients are happier, our staff is more efficient, and our operations run like clockwork.",
        author: "Dr. Lisa Rodriguez",
        role: "Chief Medical Officer"
      }
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      company: "RetailMax",
      industry: "Retail",
      tech: ["AI Analytics", "Cloud Migration"],
      stat: "3x increase in conversion rates",
      description: "Personalized shopping experience through AI-driven recommendations",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop",
      challenge: "Low conversion rates and generic customer experience",
      solution: "AI-powered personalization engine with real-time behavioral analysis",
      results: [
        { metric: "Conversion Rate", improvement: "+300%" },
        { metric: "Average Order Value", improvement: "+58%" },
        { metric: "Customer Retention", improvement: "+67%" },
        { metric: "Revenue Growth", improvement: "+145%" }
      ],
      testimonial: {
        quote: "The personalization has transformed our customer experience and our bottom line.",
        author: "Emma Thompson",
        role: "Head of Digital Commerce"
      }
    },
    {
      id: 5,
      title: "SaaS Technology Company",
      company: "CloudTech Solutions",
      industry: "Technology",
      tech: ["System Integration", "Automation"],
      stat: "40% reduction in customer churn",
      description: "Proactive customer success through predictive analytics and automated interventions",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=100&fit=crop",
      challenge: "High customer churn rate and reactive support model",
      solution: "Predictive churn model with automated customer success workflows",
      results: [
        { metric: "Customer Churn", improvement: "-40%" },
        { metric: "Support Tickets", improvement: "-52%" },
        { metric: "Customer LTV", improvement: "+89%" },
        { metric: "NPS Score", improvement: "+34 points" }
      ],
      testimonial: {
        quote: "We now prevent problems before they happen. Our customers love the proactive approach.",
        author: "Alex Kumar",
        role: "VP of Customer Success"
      }
    }
  ];

  const filteredCases = caseStudies.filter(caseStudy => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.every(filter => 
      caseStudy.industry === filter || caseStudy.tech.includes(filter)
    );
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
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
            Proof We Deliver
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-frost/90 font-inter font-light leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Real transformations, measurable results, lasting impact
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-card border border-border rounded-2xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-satoshi font-bold text-foreground">Filter by:</span>
              
              {Object.entries(filters).map(([category, items]) => (
                <div key={category} className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground capitalize">{category}:</span>
                  {items.map(item => (
                    <button
                      key={item}
                      onClick={() => toggleFilter(item)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedFilters.includes(item)
                          ? 'bg-aurora-start text-midnight'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}
              
              {selectedFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-photon hover:text-photon/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm">Clear all</span>
                </button>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              Showing {filteredCases.length} of {caseStudies.length} case studies
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer hover:border-aurora-start transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCase(caseStudy)}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 bg-gradient-midnight overflow-hidden">
                  <img
                    src={caseStudy.logo}
                    alt={caseStudy.company}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-aurora/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-12 h-12 text-aurora-start opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-midnight/80 text-aurora-start px-3 py-1 rounded-full text-sm font-bold">
                      {caseStudy.industry}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-satoshi font-bold text-foreground mb-2">
                    {caseStudy.title}
                  </h3>
                  <p className="text-muted-foreground font-inter text-sm mb-4">
                    {caseStudy.description}
                  </p>
                  <div className="text-2xl font-satoshi font-black text-aurora-start mb-3">
                    {caseStudy.stat}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCase && (
        <motion.div
          className="fixed inset-0 bg-midnight/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            className="bg-card border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64 bg-gradient-midnight overflow-hidden">
              {selectedCase.video && (
                <video
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                  poster={selectedCase.logo}
                >
                  <source src={selectedCase.video} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-aurora/20" />
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 bg-midnight/80 text-foreground p-2 rounded-full hover:bg-midnight transition-colors"
                aria-label="Close case study details"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Challenge */}
                <div>
                  <h3 className="text-xl font-satoshi font-bold text-foreground mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-photon" />
                    Challenge
                  </h3>
                  <p className="text-muted-foreground font-inter">
                    {selectedCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="text-xl font-satoshi font-bold text-foreground mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-aurora-start" />
                    Solution
                  </h3>
                  <p className="text-muted-foreground font-inter">
                    {selectedCase.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-satoshi font-bold text-foreground mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-aurora-end" />
                    Results
                  </h3>
                  <div className="space-y-3">
                    {selectedCase.results.map((result: any, index: number) => (
                      <div key={index}>
                        <div className="text-sm text-muted-foreground">{result.metric}</div>
                        <div className="text-lg font-satoshi font-bold text-aurora-start">
                          {result.improvement}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-aurora rounded-2xl p-8 mt-8">
                <blockquote className="text-xl font-inter text-midnight italic mb-4">
                  "{selectedCase.testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <div className="font-satoshi font-bold text-midnight">
                      {selectedCase.testimonial.author}
                    </div>
                    <div className="text-midnight/80 font-inter">
                      {selectedCase.testimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-8">
                <CTAButton variant="primary" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Case Study
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CaseStudies;