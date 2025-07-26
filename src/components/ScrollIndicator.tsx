import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center cursor-pointer"
        onClick={() => {
          const nextSection = document.querySelector('[data-section="1"]');
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-frost/60 text-sm font-inter mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-frost/30 rounded-full relative">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-aurora-start rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
          />
        </div>
        <ChevronDown className="w-5 h-5 text-frost/60 mt-2" />
      </motion.div>
    </div>
  );
}