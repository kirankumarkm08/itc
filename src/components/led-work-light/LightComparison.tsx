"use client";

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Power, GripVertical } from "lucide-react";

export function LightComparison() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: ReactMouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: ReactTouchEvent) => handleMove(e.touches[0].clientX);

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchend", stopDragging);
    }
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition(p => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition(p => Math.min(100, p + 5));
    }
  };

  return (
    <section id="performance" className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-6">
          Visibility when the day runs out
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Bring focused working light to loading, maintenance, and low-light tractor tasks.
        </p>
        <div className="inline-flex items-center gap-4 bg-card border border-border p-2 rounded-full">
          <button 
            onClick={() => setIsOn(!isOn)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-colors",
              isOn ? "bg-primary text-white" : "bg-transparent text-muted-foreground hover:text-white"
            )}
          >
            <Power size={18} />
            {isOn ? "Turn Off" : "Turn On"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden select-none cursor-ew-resize border border-border bg-black"
          style={{ aspectRatio: '1024 / 571' }}
          onMouseDown={() => setIsOn(true) || setIsDragging(true)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsOn(true) || setIsDragging(true)}
          onTouchMove={handleTouchMove}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Light comparison slider. Use left and right arrow keys to adjust."
        >
          {/* Base Image (Darkened / OFF state) */}
          <div className="absolute inset-0">
            <Image
              src="/product/led-work-light/installed-tractor.jpg"
              alt="Tractor in low light (simulation)"
              fill
              className="object-cover object-center pointer-events-none brightness-50 contrast-125 saturate-50"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Top Image (Lit / ON state) - clipped by slider */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{ 
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              opacity: isOn ? 1 : 0 
            }}
          >
            {/* Keep the exact same dark background so the environment doesn't change */}
            <Image
              src="/product/led-work-light/installed-tractor.jpg"
              alt="Tractor illuminated by work light (simulation)"
              fill
              className="object-cover object-center pointer-events-none brightness-50 contrast-125 saturate-50"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            
            {/* Simulated Light Source (Glowing LEDs) */}
            <div className="absolute top-[44%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-[18%] h-[15%] bg-white rounded-md shadow-[0_0_50px_20px_rgba(255,255,200,0.8),0_0_120px_60px_rgba(255,255,255,0.5)] blur-[2px] opacity-95" />
            
            {/* Intense core flare */}
            <div className="absolute top-[44%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-[10%] h-[8%] bg-white rounded-full blur-[4px]" />
            
            {/* Light Beam projecting out (to the left/down) */}
            <div 
              className="absolute top-[44%] right-[36%] -translate-y-1/2 w-[80%] h-[140%] origin-right pointer-events-none mix-blend-screen"
              style={{
                background: 'radial-gradient(ellipse at right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
                transform: 'rotate(-5deg) translateY(10%) scaleY(1.5)',
              }}
            />
            
            {/* Local reflection on the tractor arm */}
            <div className="absolute top-[58%] left-[62%] -translate-x-1/2 w-[20%] h-[30%] bg-white/20 blur-2xl mix-blend-overlay rounded-full" />
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 transition-opacity duration-300"
            style={{ 
              left: `${sliderPosition}%`,
              opacity: isOn ? 1 : 0
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
              <GripVertical size={20} />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-6 left-6 z-10">
            <span className="bg-black/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg">
              Light On
            </span>
          </div>
          <div className="absolute bottom-6 right-6 z-10">
            <span className="bg-black/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground shadow-lg">
              Light Off
            </span>
          </div>
          
          <div className="absolute top-6 right-6 z-10">
            <span className="bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-muted-foreground shadow-lg flex items-center gap-2">
              <Info size={12} />
              Visual Demonstration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  );
}
