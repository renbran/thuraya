import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Star, Compass, Navigation, Target } from "lucide-react";
import { premiumCopy } from "../content/premiumCopy";

interface PremiumHeroProps {
  onGetStarted: () => void;
  onConsultation: () => void;
}

export const PremiumHero = ({ onGetStarted, onConsultation }: PremiumHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const compassScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const compassOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-premium"
    >
      {/* Animated background layers */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-constellation-map opacity-30"
      />
      
      {/* Cultural pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-cultural mix-blend-overlay" />
      </div>

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-thuraya-midnight/90 via-transparent to-thuraya-navy/80" />

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-thuraya-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <motion.div 
          style={{ y: textY }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-thuraya-gold/20 backdrop-blur-sm border border-thuraya-gold/30 rounded-full text-thuraya-gold text-sm font-medium"
          >
            <Star className="w-4 h-4" />
            {t("hero.badge")}
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-hero font-satoshi font-black leading-none tracking-tight">
              <span className="block heading-primary">{(t("hero.headline") || "Navigate Your").split(" ").slice(0, 2).join(" ")}</span>
              <span 
                className="block heading-accent animate-shimmer"
                style={{
                  backgroundSize: '200% 100%',
                  backgroundImage: 'linear-gradient(90deg, #FFD700 0%, #00BFFF 25%, #8A2BE2 50%, #FFD700 75%, #00BFFF 100%)'
                }}
              >
                {(t("hero.headline") || "Digital Destiny").split(" ").slice(2).join(" ")}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl paragraph-readable font-inter max-w-2xl"
          >
            {t("hero.subheadline")}
          </motion.p>

          {/* Value propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6 justify-center lg:justify-start"
          >
            {[
              { icon: Navigation, text: t("hero.value_props.cultural_intelligence") },
              { icon: Target, text: t("hero.value_props.precision_automation") },
              { icon: Compass, text: t("hero.value_props.strategic_pathfinding") }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-readable-secondary">
                <div className="w-8 h-8 rounded-full bg-thuraya-purple/20 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-thuraya-purple-light" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={onGetStarted}
              className="group relative btn-brand-primary px-8 py-4 rounded-premium text-lg transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("hero.cta_primary")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <button
              onClick={onConsultation}
              className="btn-brand-secondary px-8 py-4 rounded-premium text-lg transition-all duration-300 hover:scale-105"
            >
              {t("hero.cta_secondary")}
            </button>
          </motion.div>

          {/* Social proof snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center lg:text-left"
          >
            <p className="paragraph-muted text-sm mb-2">{t("hero.social_proof")}</p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-thuraya-gold-light fill-current" />
              ))}
              <span className="text-readable-secondary text-sm ml-2">5.0 • 50+ transformations</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - 3D Compass */}
        <motion.div
          style={{ scale: compassScale, opacity: compassOpacity }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-thuraya-constellation/20 rounded-full blur-3xl animate-premium-glow" />
            
            {/* CSS-only Compass - No 3D to avoid Three.js errors */}
            <div className="relative z-10 w-[500px] h-[500px]">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-thuraya-midnight/40 to-thuraya-navy/40 rounded-full border border-thuraya-gold/30 relative overflow-hidden">
                {/* Background constellation effect */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-thuraya-constellation rounded-full animate-pulse"
                    />
                  ))}
                </div>
                
                {/* Central compass */}
                <div className="text-center text-thuraya-gold relative z-10">
                  <Compass className="w-24 h-24 mx-auto mb-4 animate-spin [animation-duration:8s]" />
                  <p className="text-sm font-light">Thuraya Navigation</p>
                  <div className="mt-2 text-xs text-thuraya-gold/70">
                    <span>N</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating labels */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center"
            >
              <div className="px-3 py-1 bg-thuraya-navy/80 backdrop-blur-sm rounded-full border border-thuraya-gold/30">
                <span className="text-thuraya-gold text-xs font-medium">Your Navigation Begins Here</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-thuraya-gold/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-thuraya-gold rounded-full mt-2"
          />
        </motion.div>
        <p className="text-thuraya-pearl/60 text-sm mt-2">Discover Your Path</p>
      </motion.div>
    </section>
  );
};

export default PremiumHero;
