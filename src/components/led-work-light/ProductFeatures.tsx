"use client";

import { motion, Variants } from "framer-motion";
import { productFeatures } from "@/data/led-work-light";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Wrench, Maximize, CheckCircle2, Shield, Thermometer, Settings } from "lucide-react";

const iconMap = [Wrench, Maximize, CheckCircle2, Shield, Thermometer, Settings];

const getIcon = (index: number) => {
  const Icon = iconMap[index % iconMap.length];
  return <Icon className="text-primary mb-4" size={32} strokeWidth={1.5} />;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ProductFeatures() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-black section-padding border-t border-white/5 relative z-10">
      <div className="section-container">
        <motion.div
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {productFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={reducedMotion ? {} : itemVariants}
              className="bg-card border border-border p-8 rounded-xl flex flex-col h-full group"
            >
              {getIcon(index)}
              <h3 className="text-lg font-bold text-foreground uppercase tracking-wider mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-auto">
                {feature.text}
              </p>
              
              {/* Decorative line that draws on hover */}
              <div className="h-[2px] w-0 bg-primary mt-6 transition-all duration-500 ease-out group-hover:w-12" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
