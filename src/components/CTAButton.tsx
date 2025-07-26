import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  className?: string;
}

export function CTAButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "default",
  className 
}: CTAButtonProps) {
  const baseClasses = "font-satoshi font-bold rounded-full transition-all duration-300 relative overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-photon text-white hover:shadow-photon",
    secondary: "bg-gradient-aurora text-midnight hover:shadow-glow"
  };
  
  const sizeClasses = {
    default: "px-8 py-4 text-lg",
    lg: "px-12 py-6 text-xl"
  };

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-aurora-start to-aurora-end opacity-0 group-hover:opacity-20"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}