"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroHotspots } from "@/data/led-work-light";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroHotspots() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeHotspot) {
        setActiveHotspot(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeHotspot]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setActiveHotspot(null);
      }
    };
    if (activeHotspot) {
      // Small delay to prevent immediate close on the same click that opened it
      setTimeout(() => document.addEventListener("mousedown", handleClickOutside), 10);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeHotspot]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {heroHotspots.map((hotspot, index) => {
        const isActive = activeHotspot === hotspot.id;
        const isDimmed = activeHotspot !== null && !isActive;

        return (
          <div
            key={hotspot.id}
            className="absolute z-10 pointer-events-auto"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: isDimmed ? 0.3 : 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5, type: "spring" }}
              onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black transition-all group",
                isActive ? "z-50" : "z-10 hover:z-40"
              )}
              aria-label={hotspot.title}
              aria-expanded={isActive}
            >
              {/* Outer pulsing ring - only pulse initially or on hover */}
              <div className="absolute inset-[-4px] rounded-full border border-white/30 bg-black/10 backdrop-blur-[2px] transition-transform duration-300 group-hover:scale-125" />
              
              {/* Inner dot */}
              <div className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                isActive ? "bg-primary" : "bg-white group-hover:bg-primary"
              )} />
            </motion.button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-64 md:w-72 bg-card/95 backdrop-blur-md border border-border rounded-lg p-5 shadow-2xl z-50 pointer-events-auto"
                  role="dialog"
                  aria-labelledby={`hotspot-title-${hotspot.id}`}
                >
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-white"
                    aria-label="Close details"
                  >
                    <X size={16} />
                  </button>
                  <h3 id={`hotspot-title-${hotspot.id}`} className="text-white font-bold uppercase tracking-wide text-sm mb-2 pr-6">
                    {hotspot.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {hotspot.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
