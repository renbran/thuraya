export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
};

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

export const glitchVariant = {
  initial: { filter: "hue-rotate(0deg)" },
  animate: { 
    filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(270deg)", "hue-rotate(360deg)"],
    transition: { duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] }
  }
};

export const countUpVariant = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 1.2, ease: "easeOut" }
};

export const floatVariant = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pulseVariant = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};