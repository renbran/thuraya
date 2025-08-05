import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// import { CulturalBridge3D } from "./CulturalBridge3D";
import { premiumCopy } from "@/content/premiumCopy";
import { Star, Award, Users, Globe, ArrowRight, Heart } from "lucide-react";

const ValueCard = ({ value, index }: { value: typeof premiumCopy.about.values[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="p-6 rounded-premium bg-thuraya-midnight/50 backdrop-blur-sm border border-thuraya-gold/20 hover:border-thuraya-gold/40 transition-all duration-500 hover:scale-105">
        {/* Cultural pattern background */}
        <div className="absolute inset-0 rounded-premium opacity-5">
          <div className="w-full h-full bg-gradient-cultural" />
        </div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-thuraya flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-6 h-6 text-readable" />
          </div>
          
          <h3 className="text-xl font-satoshi font-bold text-readable mb-3">
            {value.title}
          </h3>
          
          <p className="paragraph-readable">
            {value.description}
          </p>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-premium bg-gradient-to-br from-thuraya-gold/5 via-transparent to-thuraya-constellation/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

const FounderStory = () => {
  return (
    <div className="relative">
      {/* Story content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        {premiumCopy.about.story.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-lg text-thuraya-pearl/80 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </motion.div>

      {/* Credentials showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 p-6 rounded-premium bg-gradient-thuraya/10 backdrop-blur-sm border border-thuraya-gold/20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Award, value: "15+", label: "Years Experience" },
            { icon: Globe, value: "$2B+", label: "Transformations Led" },
            { icon: Users, value: "50+", label: "Businesses Transformed" },
            { icon: Star, value: "5.0", label: "Client Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-thuraya-gold/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-thuraya-gold" />
              </div>
              <div className="text-2xl font-satoshi font-bold text-thuraya-gold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-thuraya-pearl/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ThurayaStarLegend = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative p-8 rounded-premium bg-gradient-to-br from-thuraya-navy/50 to-thuraya-midnight/50 backdrop-blur-sm border border-thuraya-constellation/30"
    >
      {/* Star constellation background */}
      <div className="absolute inset-0 rounded-premium">
        <div className="w-full h-full bg-constellation-map opacity-30" />
      </div>

      <div className="relative z-10">
        {/* Thuraya star icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-thuraya flex items-center justify-center animate-premium-glow">
          <Star className="w-8 h-8 text-white fill-current" />
        </div>

        <h3 className="text-2xl font-satoshi font-bold text-center text-thuraya-gold mb-4">
          The Thuraya Star Legacy
        </h3>

        <div className="space-y-4 text-thuraya-pearl/80">
          <p className="text-center leading-relaxed">
            <span className="text-thuraya-constellation font-semibold">Thuraya</span>, the brightest star in Taurus, 
            has guided Middle Eastern navigators across vast deserts for over <span className="text-thuraya-gold font-semibold">2,000 years</span>.
          </p>
          
          <p className="text-center leading-relaxed">
            Just as this celestial beacon helped traders traverse unknown territories while respecting the land and its people, 
            <span className="text-thuraya-gold font-semibold"> Thuraya Path Consultancy</span> guides businesses through 
            the digital landscape while <span className="text-thuraya-constellation font-semibold">honoring their cultural heritage</span>.
          </p>
        </div>

        {/* Cultural wisdom points */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {[
            { icon: "🧭", text: "Ancient Navigation" },
            { icon: "🏛️", text: "Cultural Respect" },
            { icon: "🚀", text: "Modern Innovation" }
          ].map((item, index) => (
            <div key={index} className="p-3 rounded-cultural bg-thuraya-gold/10">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm text-thuraya-pearl/70 font-medium">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const PremiumAbout = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref} 
      data-section="2"
      className="relative py-24 bg-gradient-to-b from-thuraya-midnight to-thuraya-navy overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-cultural/5" />
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '8px',
              height: '8px',
              background: `linear-gradient(45deg, ${
                i % 4 === 0 ? '#FFD700' : 
                i % 4 === 1 ? '#00BFFF' : 
                i % 4 === 2 ? '#8A2BE2' : 
                '#40E0D0'
              }, transparent)`,
              borderRadius: '50%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-thuraya-constellation/20 backdrop-blur-sm border border-thuraya-constellation/30 rounded-full text-thuraya-constellation text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Heritage • Innovation • Excellence
          </div>

          <h2 className="text-headline font-satoshi font-black heading-primary mb-6">
            {premiumCopy.about.headline}
          </h2>
          
          <p className="text-xl paragraph-readable max-w-3xl mx-auto">
            {premiumCopy.about.subheadline}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Cultural Bridge Fallback */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Fallback cultural visualization instead of 3D component */}
            <div className="w-full h-96 bg-gradient-to-br from-thuraya-midnight/30 to-thuraya-navy/30 rounded-lg border border-thuraya-gold/20 flex items-center justify-center">
              <div className="text-center text-thuraya-gold">
                <Globe className="w-20 h-20 mx-auto mb-4 animate-slow-spin" />
                <p className="text-lg font-light">Cultural Bridge</p>
                <p className="text-sm opacity-70">Ancient Wisdom Meets Modern Innovation</p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Story content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <FounderStory />
          </motion.div>
        </div>

        {/* Thuraya Star Legend */}
        <div className="mb-16">
          <ThurayaStarLegend />
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {premiumCopy.about.values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto p-8 rounded-premium bg-gradient-to-br from-thuraya-gold/10 via-transparent to-thuraya-constellation/10 backdrop-blur-sm border border-thuraya-gold/20">
            <h3 className="text-2xl font-satoshi font-bold text-white mb-4">
              Experience the Thuraya Difference
            </h3>
            <p className="text-thuraya-pearl/80 mb-6">
              Join the growing community of MENA business leaders who've successfully navigated their digital transformation 
              while preserving their cultural identity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-brand-primary px-8 py-4 rounded-premium text-lg transition-all duration-300 hover:scale-105"
              onClick={() => {
                const servicesSection = document.querySelector('[data-section="1"]');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center gap-2">
                Explore Our Methodology
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumAbout;
