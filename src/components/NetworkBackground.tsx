import { motion } from "framer-motion";

export function NetworkBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated network nodes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-golden/60"
          style={{
            left: `${15 + (i * 8)}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Connection lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-aurora-end/30 to-transparent"
          style={{
            left: `${10 + i * 10}%`,
            top: `${30 + i * 8}%`,
            width: `${20 + i * 5}%`,
            transform: `rotate(${i * 15}deg)`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-mystic/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            opacity: [0.2, 0.8, 0.3, 0.2],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Large background orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10 bg-gradient-to-br from-golden to-aurora-end blur-3xl"
        style={{ left: "10%", top: "20%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-48 h-48 rounded-full opacity-10 bg-gradient-to-br from-mystic to-aurora-start blur-3xl"
        style={{ right: "15%", bottom: "25%" }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}