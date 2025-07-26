import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CTAButton } from "@/components/CTAButton";

const Careers = () => {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Join the Mission
          </motion.h1>
          <motion.p
            className="text-xl text-frost/90 font-inter mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Help us build the future of AI-powered business operations
          </motion.p>
          <CTAButton variant="primary" size="lg">
            View Open Positions
          </CTAButton>
        </div>
      </section>
    </div>
  );
};

export default Careers;