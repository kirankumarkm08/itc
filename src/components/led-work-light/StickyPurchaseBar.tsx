"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function StickyPurchaseBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic: Show after scrolling past ~800px (roughly past the ProductOverview)
      // Hide when near the bottom of the page (within 500px of bottom)
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      
      // Check if we are past the hero and overview section roughly
      const pastTopThreshold = scrollY > 1200; 
      
      // Check if we are near the footer
      const nearBottomThreshold = scrollY + windowHeight >= documentHeight - 600;
      
      setIsVisible(pastTopThreshold && !nearBottomThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transform transition-all duration-500 ease-in-out pointer-events-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="bg-black/90 backdrop-blur-md border-t border-white/10 pointer-events-auto shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="section-container h-20 md:h-24 flex items-center justify-between gap-4">
          
          {/* Left: Product Info (Hidden on very small screens) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block relative w-12 h-12 md:w-16 md:h-16 rounded-md bg-white overflow-hidden border border-border">
              <Image
                src="/product/led-work-light/assembled-studio.jpg"
                alt="ITC Quick Attach LED Work Light"
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </div>
            <div>
              <h4 className="text-foreground font-bold text-sm md:text-base uppercase tracking-wide">
                ITC Quick Attach LED Work Light (ITC-WL-001)
              </h4>
              <p className="hidden md:block text-muted-foreground text-xs font-semibold tracking-wider uppercase mt-1">
                Complete System
              </p>
            </div>
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right hidden sm:block">
              <p className="text-foreground font-bold text-lg md:text-xl leading-none">$129.99</p>
              <p className="hidden md:block text-primary text-[10px] uppercase font-bold tracking-widest mt-1">
                In Stock
              </p>
            </div>
            
            <div className="hidden md:flex flex-col gap-1 items-start justify-center">
               <label htmlFor="mount-select-sticky" className="sr-only">Select mount</label>
               <select id="mount-select-sticky" className="bg-background border border-border rounded-sm text-xs px-2 py-1.5 text-foreground outline-none focus:border-primary">
                 <option>Standard ROPS U-Bolt</option>
                 <option>Flat Surface Bracket</option>
               </select>
            </div>
            
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 h-12 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap">
              Add to Cart
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
