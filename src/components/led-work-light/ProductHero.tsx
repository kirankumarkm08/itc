"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroHotspots } from "./HeroHotspots";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !imageRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline();
      
      tl.fromTo(
        imageRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 2, ease: "power3.out" }
      )
      .fromTo(
        ".hero-headline-line",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" },
        "-=1.5"
      )
      .fromTo(
        ".hero-description",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.6"
      )
      .fromTo(
        ".hero-scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.2"
      );

      // Scroll Parallax
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Pointer Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !imageRef.current) return;
    
    // Only apply on non-touch devices (this is a rough heuristic, CSS media query is better but we use React state here)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const yPos = (clientY / innerHeight - 0.5) * 2; // -1 to 1

    gsap.to(imageRef.current, {
      x: xPos * -10, // max 10px movement
      y: yPos * -10,
      rotationY: xPos * 1.5, // max 1.5 degrees
      rotationX: yPos * -1.5,
      ease: "power2.out",
      duration: 1
    });
  };

  const handleMouseLeave = () => {
    if (reducedMotion || !imageRef.current) return;
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 1.5
    });
  };

  return (
    <section 
      id="overview"
      ref={containerRef} 
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-background flex items-center perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          ref={imageRef}
          src="/product/led-work-light/installed-tractor.jpg"
          alt="ITC Quick Attach LED Work Light installed on tractor"
          fill
          priority
          className="object-cover object-center transform-gpu origin-center"
          sizes="100vw"
        />
        {/* Dark overlay for text readability, mostly on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:w-2/3 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none sm:hidden" />
      </div>

      <HeroHotspots />

      {/* Content */}
      <div ref={contentRef} className="container relative z-20 mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-xl text-white">
          <p className="hero-description text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4">
            ITC Lights & Light Mounts
          </p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.9] mb-6 overflow-hidden">
            <div className="overflow-hidden pb-2"><div className="hero-headline-line">Light the work.</div></div>
            <div className="overflow-hidden pb-2"><div className="hero-headline-line text-muted-foreground">Not just the way.</div></div>
          </h1>
          
          <p className="hero-description text-lg md:text-xl text-muted-foreground mb-8 max-w-md leading-relaxed">
            A rugged LED work-light and mounting system designed for tractor ROPS installations, low-light jobs, and demanding outdoor conditions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="hero-cta bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center">
              Add to Cart
            </button>
            <button className="hero-cta bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center">
              Explore the Product
            </button>
          </div>

          <ul className="hero-description flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground uppercase tracking-wider font-semibold">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              Rugged mounting
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              Adjustable angle
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              High-output LED
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary rounded-full" />
              Tractor-ready installation
            </li>
          </ul>
        </div>
      </div>

      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-muted-foreground">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to inspect</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
