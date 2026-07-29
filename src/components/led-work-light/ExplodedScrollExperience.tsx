"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageSequenceCanvas } from "./ImageSequenceCanvas";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGES = [
  {
    heading: "ASSEMBLED FOR THE JOB",
    text: "The light, bracket, and mounting hardware operate as one complete system.",
  },
  {
    heading: "BUILT AROUND THE LIGHT",
    text: "The adjustable joint positions the LED unit independently from the tractor mounting point.",
  },
  {
    heading: "ENGINEERED COMPONENT BY COMPONENT",
    text: "The housing, electronics, mounting hardware, and cable separate into an organised technical view.",
  },
  {
    heading: "READY TO INSTALL",
    text: "Every component returns to its functional installation position.",
  }
];

export function ExplodedScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Update the 3D Canvas progress based on the entire section's scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom", 
        scrub: 0.1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      // 2. Animate the text blocks fading in and out as they scroll past
      textBlocksRef.current.forEach((block) => {
        if (!block) return;
        
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: block,
              start: "top 60%",     // Starts fading in when top of block hits 60% of viewport
              end: "top 40%",       // Fully visible by 40%
              scrub: true,
            },
          }
        );

        gsap.to(block, {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: block,
            start: "bottom 50%",    // Starts fading out when bottom hits center
            end: "bottom 30%",      // Fully hidden by 30%
            scrub: true,
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="components" ref={containerRef} className="relative w-full bg-black">
      
      {/* 
        Make the total scrolling area tall enough for all stages.
        4 stages * 100vh = 400vh.
      */}
      <div className="relative w-full" style={{ height: `${STAGES.length * 100}vh` }}>
        
        {/* Sticky Background - Pinned Canvas Layer */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
          <ImageSequenceCanvas
            frameCount={50}
            getFrameSrc={(index) => `/ezgif-7269cdb347b73c4d-png-split/ezgif-frame-${String(index + 1).padStart(3, "0")}.png`}
            progress={progress}
            fallbackSrc="/product/led-work-light/technical-exploded.jpg"
          />
          {/* Dark gradient overlay for text readability on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none md:w-3/5" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none md:hidden" />
        </div>

        {/* Scrolling Text Content Layer */}
        {/* Negative top margin pulls it up to overlap the sticky canvas from the beginning */}
        <div className="relative z-10 w-full" style={{ marginTop: "-100vh" }}>
          {STAGES.map((stage, index) => (
            <div 
              key={index} 
              className="h-screen w-full flex items-center pointer-events-none"
            >
              <div className="container mx-auto px-4 md:px-6">
                <div 
                  ref={(el) => { textBlocksRef.current[index] = el; }}
                  className="max-w-md w-full pointer-events-auto"
                >
                  <p className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3">
                    Stage 0{index + 1}
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4 leading-[1.1]">
                    {stage.heading}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {stage.text}
                  </p>

                  {/* Add a button on the last stage */}
                  {index === STAGES.length - 1 && (
                    <div className="mt-8">
                      <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors">
                        Explore Components
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
