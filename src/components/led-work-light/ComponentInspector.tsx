"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { explodedComponents } from "@/data/led-work-light";
import { X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Rough positioning for the hotspots over the technical exploded image
const componentZones = {
  "cable": { x: 15, y: 55, width: 20, height: 30 },
  "mounting-hardware": { x: 30, y: 50, width: 15, height: 25 },
  "adjustable-joint": { x: 45, y: 45, width: 10, height: 30 },
  "rear-housing": { x: 55, y: 40, width: 15, height: 40 },
  "led-array": { x: 73, y: 45, width: 10, height: 30 },
  "front-lens": { x: 88, y: 45, width: 8, height: 35 },
};

export function ComponentInspector() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeId) setActiveId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId]);

  const activeComponent = explodedComponents.find(c => c.id === activeId);

  return (
    <section className="bg-black section-padding relative overflow-hidden">
      <div className="section-container mb-16 relative z-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
          Engineered from the inside out
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          Select a component to understand its role in the complete work-light system.
        </p>
      </div>

      <div className="w-full max-w-[1600px] mx-auto relative px-4 md:px-12" ref={containerRef}>
        <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] min-h-[400px]">
          
          {/* Main Image */}
          <motion.div 
            className="absolute inset-0 z-0"
            animate={{ scale: activeId && !isMobile ? 0.98 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/product/led-work-light/technical-exploded.jpg"
              alt="Exploded view of ITC LED Work Light components"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </motion.div>

          {/* Desktop Interactive Zones */}
          {!isMobile && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {explodedComponents.map((component) => {
                const zone = componentZones[component.id as keyof typeof componentZones];
                if (!zone) return null;
                
                const isActive = activeId === component.id;
                const isDimmed = activeId !== null && !isActive;

                return (
                  <div
                    key={component.id}
                    className="absolute pointer-events-auto cursor-pointer group"
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setActiveId(isActive ? null : component.id)}
                    onMouseEnter={() => !activeId && setActiveId(component.id)}
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-lg transition-all duration-300",
                      isActive ? "border-2 border-primary/50 bg-primary/10" : "group-hover:border border-white/20 group-hover:bg-white/5",
                      isDimmed && "opacity-0"
                    )} />
                    
                    {/* Tiny target dot for visual anchor */}
                    <div className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300",
                      isActive ? "bg-primary shadow-[0_0_10px_rgba(204,0,0,0.8)] scale-150" : "bg-white/30 group-hover:bg-white/70 scale-100",
                      isDimmed && "opacity-0"
                    )} />
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Global dimming layer when something is active */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-300 z-[5]",
              activeId ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Mobile Horizontal Scrolling List */}
        {isMobile && (
          <div className="mt-8 -mx-4 px-4 overflow-x-auto pb-4 hide-scrollbar flex gap-3 snap-x">
            {explodedComponents.map((component) => (
              <button
                key={component.id}
                onClick={() => setActiveId(component.id)}
                className={cn(
                  "snap-center shrink-0 flex items-center gap-2 px-4 py-3 border rounded-sm whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-colors",
                  activeId === component.id 
                    ? "border-primary bg-primary/10 text-white" 
                    : "border-border bg-card text-muted-foreground hover:text-white"
                )}
              >
                <Info size={14} className={activeId === component.id ? "text-primary" : "text-muted-foreground"} />
                {component.name}
              </button>
            ))}
          </div>
        )}

        {/* Desktop Detail Panel */}
        <AnimatePresence>
          {!isMobile && activeComponent && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-80 bg-card border border-border p-6 rounded-lg shadow-2xl z-30"
            >
              <button 
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-white"
              >
                <X size={16} />
              </button>
              <p className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Component Detail</p>
              <h3 className="text-white font-bold text-xl uppercase tracking-wide mb-3">{activeComponent.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {activeComponent.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {isMobile && activeComponent && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border rounded-t-xl p-6 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-6" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Component Detail</p>
                <h3 className="text-white font-bold text-lg uppercase tracking-wide">{activeComponent.name}</h3>
              </div>
              <button 
                onClick={() => setActiveId(null)}
                className="p-2 bg-white/5 rounded-full text-muted-foreground hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {activeComponent.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobile && activeComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
