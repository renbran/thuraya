import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

export function CountUpCard({ title, value, suffix = "", prefix = "", description }: CountUpCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1200;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="bg-card border border-border rounded-2xl p-8 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-4xl font-satoshi font-black bg-gradient-aurora bg-clip-text text-transparent mb-2">
        {prefix}{count}{suffix}
      </div>
      <h3 className="text-xl font-satoshi font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground font-inter">{description}</p>
    </motion.div>
  );
}