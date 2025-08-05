import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
// import { PathfindingVisualization3D } from "./PathfindingVisualization3D";
import { premiumCopy } from "@/content/premiumCopy";
import { Compass, Settings, Navigation2, Target, ArrowRight, Star, CheckCircle, Clock, TrendingUp } from "lucide-react";

const iconMap = {
  compass: Compass,
  gear: Settings,
  navigation: Navigation2,
  target: Target,
};

interface ServiceCardProps {
  service: typeof premiumCopy.services.offerings[0];
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

const ServiceCard = ({ service, index, isActive, onHover }: ServiceCardProps) => {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Compass;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={`relative group cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-105 z-10' : 'scale-100'
      }`}
    >
      {/* Card Background with Cultural Pattern */}
      <div className={`relative p-8 rounded-premium backdrop-blur-sm border transition-all duration-500 ${
        isActive 
          ? 'bg-gradient-thuraya border-thuraya-gold shadow-constellation' 
          : 'bg-thuraya-midnight/50 border-thuraya-gold/20 hover:border-thuraya-gold/40'
      }`}>
        
        {/* Cultural Pattern Overlay */}
        <div className="absolute inset-0 rounded-premium opacity-10">
          <div className="w-full h-full bg-gradient-cultural mix-blend-overlay" />
        </div>

        {/* Icon with Glow Effect */}
        <div className={`relative mb-6 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
          isActive ? 'bg-thuraya-gold/20 animate-premium-glow' : 'bg-thuraya-purple/20'
        }`}>
          <IconComponent className={`w-8 h-8 transition-colors duration-500 ${
            isActive ? 'text-thuraya-gold' : `text-${service.color}`
          }`} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className={`text-2xl font-satoshi font-bold mb-2 transition-colors duration-500 ${
            isActive ? 'heading-primary' : 'text-readable-secondary'
          }`}>
            {service.title}
          </h3>
          
          <p className={`text-lg font-medium mb-4 transition-colors duration-500 ${
            isActive ? 'text-brand-gold' : 'text-brand-accent'
          }`}>
            {service.subtitle}
          </p>
          
          <p className={`text-base leading-relaxed mb-6 transition-colors duration-500 ${
            isActive ? 'paragraph-readable' : 'paragraph-muted'
          }`}>
            {service.description}
          </p>

          {/* Features List */}
          <ul className="space-y-3 mb-6">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 transition-colors duration-500 ${
                  isActive ? 'text-thuraya-gold-light' : 'text-thuraya-constellation-light'
                }`} />
                <span className={`text-sm transition-colors duration-500 ${
                  isActive ? 'text-readable' : 'text-readable-secondary'
                }`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-6 rounded-cultural font-satoshi font-semibold transition-all duration-500 ${
              isActive 
                ? 'btn-brand-primary hover:scale-105' 
                : 'btn-brand-secondary hover:scale-105'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              Explore This Path
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 rounded-premium transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-full h-full bg-gradient-to-br from-thuraya-gold/10 via-transparent to-thuraya-constellation/10 rounded-premium" />
        </div>
      </div>
    </motion.div>
  );
};

const MethodologyStats = () => {
  const stats = [
    { value: "95%", label: "Cultural Alignment Success", icon: Star },
    { value: "340%", label: "Average Efficiency Gain", icon: TrendingUp },
    { value: "18mo", label: "Typical ROI Achievement", icon: Clock },
    { value: "100%", label: "Client Satisfaction Rate", icon: CheckCircle },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center group"
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-thuraya flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <stat.icon className="w-6 h-6 text-readable" />
          </div>
          <div className="text-3xl font-satoshi font-black text-brand-gold mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-readable-secondary font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const PremiumServices = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section 
      ref={ref} 
      data-section="1"
      className="relative py-24 bg-gradient-premium overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-constellation-map opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-thuraya-navy/30 to-transparent" />

      {/* Floating Cultural Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#00BFFF' : '#8A2BE2',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-thuraya-gold/20 backdrop-blur-sm border border-thuraya-gold/30 rounded-full text-brand-gold text-sm font-medium mb-6">
            <Compass className="w-4 h-4" />
            Proven Methodology • Cultural Intelligence
          </div>

          <h2 className="text-headline font-satoshi font-black heading-primary mb-6">
            {premiumCopy.services.headline}
          </h2>
          
          <p className="text-xl paragraph-readable max-w-3xl mx-auto">
            {premiumCopy.services.subheadline}
          </p>
        </motion.div>

        {/* 3D Pathfinding Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-20"
        >
          {/* Fallback visualization instead of 3D component */}
          <div className="w-full h-64 bg-gradient-to-br from-thuraya-midnight/30 to-thuraya-navy/30 rounded-lg border border-thuraya-gold/20 flex items-center justify-center">
            <div className="text-center text-thuraya-gold">
              <Navigation2 className="w-16 h-16 mx-auto mb-4 animate-pulse" />
              <p className="text-lg font-light">Pathfinding Methodology</p>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {premiumCopy.services.offerings.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isActive={activeService === index}
              onHover={setActiveService}
            />
          ))}
        </div>

        {/* Methodology Stats */}
        <MethodologyStats />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto p-8 rounded-premium bg-gradient-cultural/10 backdrop-blur-sm border border-thuraya-gold/20">
            <h3 className="text-2xl font-satoshi font-bold text-white mb-4">
              Ready to Navigate Your Transformation?
            </h3>
            <p className="text-thuraya-pearl/80 mb-6">
              Discover how the Thuraya Pathfinding Methodology can transform your business while preserving your cultural essence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-thuraya rounded-premium text-white font-satoshi font-bold text-lg transition-all duration-300 hover:shadow-constellation"
              onClick={() => {
                const contactSection = document.querySelector('[data-section="5"]');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center gap-2">
                Begin Strategic Assessment
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumServices;
