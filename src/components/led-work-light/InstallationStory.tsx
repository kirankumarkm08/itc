"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { installationSteps } from "@/data/led-work-light";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function InstallationStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !leftColRef.current || !rightColRef.current) return;

    // We want the left column to be sticky while the right column scrolls.
    // CSS `position: sticky` is actually perfect for this, but we'll use GSAP
    // to detect which step is currently in the center of the viewport to update state.
    
    const steps = gsap.utils.toArray<HTMLElement>(".install-step");
    
    const ctx = gsap.context(() => {
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveStep(i);
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="installation" ref={containerRef} className="bg-secondary py-24 md:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-6">
            Installs where the work happens
          </h2>
          <p className="text-lg text-muted-foreground">
            A practical mounting process designed for real-world equipment and standard tools.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          
          {/* Left Column: Sticky Image */}
          <div 
            ref={leftColRef}
            className="w-full lg:w-1/2 lg:sticky lg:top-32 h-[50vh] min-h-[400px] lg:h-[70vh] rounded-xl overflow-hidden bg-card border border-border"
          >
            <div className="relative w-full h-full">
              {/* Exploded Image (Steps 0-3) */}
              <div 
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  activeStep < 4 ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src="/product/led-work-light/exploded-tractor.jpg"
                  alt="Exploded installation view"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Assembled Image (Step 4+) */}
              <div 
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  activeStep >= 4 ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src="/product/led-work-light/installed-tractor.jpg"
                  alt="Installed work light view"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Step indicator overlay */}
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full z-10">
                <span className="text-primary font-bold text-sm tracking-widest uppercase">
                  Step 0{activeStep + 1}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Steps */}
          <div ref={rightColRef} className="w-full lg:w-1/2 flex flex-col gap-24 lg:py-[20vh]">
            {installationSteps.map((step, index) => {
              const isActive = index === activeStep;
              
              return (
                <div 
                  key={step.id} 
                  className={cn(
                    "install-step flex gap-6 md:gap-8 transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-30"
                  )}
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-colors duration-500",
                      isActive 
                        ? "border-primary bg-primary text-white" 
                        : "border-border bg-transparent text-muted-foreground"
                    )}>
                      {index + 1}
                    </div>
                    {index < installationSteps.length - 1 && (
                      <div className="w-px h-full min-h-[120px] bg-border mt-4" />
                    )}
                  </div>
                  
                  <div className="pt-2 pb-12">
                    <h3 className={cn(
                      "text-2xl md:text-3xl font-bold uppercase tracking-wide mb-4 transition-colors duration-500",
                      isActive ? "text-white" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
