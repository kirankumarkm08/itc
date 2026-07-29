"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Check, ShieldCheck, Truck } from "lucide-react";

export function ProductOverview() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotate: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !imageContainerRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to -1 to 1
    const xPos = (x / rect.width - 0.5) * 2;
    const yPos = (y / rect.height - 0.5) * 2;

    setTransform({
      x: xPos * 8, // max 8px translation
      y: yPos * 8,
      rotate: xPos * 2, // max 2 degrees rotation
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, rotate: 0 });
  };

  return (
    <section className="bg-secondary section-padding relative z-10">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Product Visual */}
          <div 
            ref={imageContainerRef}
            className="relative aspect-square w-full max-w-2xl mx-auto rounded-xl bg-card border border-border overflow-hidden flex items-center justify-center group perspective-[1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            
            <div 
              className="relative w-4/5 h-4/5 transition-transform duration-200 ease-out"
              style={{
                transform: reducedMotion 
                  ? "none" 
                  : `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${transform.rotate}deg)`
              }}
            >
              <Image
                src="/product/led-work-light/assembled-studio.jpg"
                alt="ITC LED Work Light - Assembled"
                fill
                className="object-contain drop-shadow-2xl z-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Fake separated shadow that moves in opposite direction */}
              <div 
                className="absolute bottom-[-10%] left-1/2 w-3/4 h-8 bg-black/50 blur-xl rounded-full transition-transform duration-200 ease-out z-0"
                style={{
                  transform: reducedMotion
                    ? "translateX(-50%)"
                    : `translateX(calc(-50% - ${transform.x * 0.5}px)) translateY(${-transform.y * 0.2}px)`
                }}
              />
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Includes the light.<br/>
              <span className="text-muted-foreground">And the mounting hardware.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Includes the light, standard mounting bracket and mounting hardware. Wiring harness sold separately.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {['Adjustable', 'ROPS mount', 'Replaceable hardware', 'Outdoor use'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full border border-border bg-card/50 text-xs font-bold uppercase tracking-wider text-white">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="bg-card border border-border p-6 rounded-lg mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">ITC Quick Attach LED Work Light</h3>
                  <p className="text-sm text-muted-foreground">SKU: ITC-WL-001</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">$129.99</p>
                  <p className="text-xs text-primary uppercase font-bold tracking-widest mt-1">In Stock</p>
                </div>
              </div>
              
              <div className="mb-6 pb-6 border-b border-border/50">
                <h4 className="text-foreground font-bold uppercase tracking-wide text-sm mb-3">What&apos;s Included</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> <span className="text-foreground font-medium">Included:</span> LED work light, standard mounting bracket, mounting hardware</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-border" /> <span className="text-muted-foreground">Sold separately:</span> Wiring harness, switch, relay, fuse</li>
                </ul>
              </div>

              <div className="mb-6 pb-6 border-b border-border/50">
                <h4 className="text-foreground font-bold uppercase tracking-wide text-sm mb-3">Compatibility</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><strong>Voltage:</strong> 10–30V DC</li>
                  <li><strong>Mounting:</strong> U-Bolt fits standard rectangular ROPS (2.5×5 cm to 5×7.5 cm)</li>
                </ul>
              </div>
              
              <div className="flex gap-4 mb-6">
                <div className="w-24 border border-border rounded-sm flex items-center justify-between px-3 py-2 bg-background">
                  <button className="text-muted-foreground hover:text-foreground">-</button>
                  <span className="text-foreground font-bold">1</span>
                  <button className="text-muted-foreground hover:text-foreground">+</button>
                </div>
                <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center">
                  Add to Cart
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck size={16} className="text-white" />
                  <span>Free shipping on orders over $150</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck size={16} className="text-white" />
                  <span>2-year rugged use warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check size={16} className="text-white" />
                  <span>Compatible with standard ROPS <a href="#specifications" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors">See specs</a></span>
                </div>
              </div>
            </div>
            
            <a href="#installation" className="text-sm text-white font-bold uppercase tracking-wider flex items-center gap-2 group w-fit">
              View Installation Guide
              <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
