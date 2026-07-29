"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { installationSteps } from "@/data/led-work-light";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 50;

const STEP_FRAME_RANGES = [
  { start: 0, end: 10 },
  { start: 10, end: 20 },
  { start: 20, end: 30 },
  { start: 30, end: 40 },
  { start: 40, end: 49 },
];

function getFrameSrc(index: number) {
  return `/ezgif-7269cdb347b73c4d-png-split/ezgif-frame-${String(index + 1).padStart(3, "0")}.png`;
}

export function InstallationStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  const stepCount = installationSteps.length;

  const activeStep = useMemo(() => {
    const sectionProgress = Math.min(progress, 0.999);
    const stepFloat = sectionProgress * stepCount;
    return Math.min(Math.floor(stepFloat), stepCount - 1);
  }, [progress, stepCount]);

  const { framesRef, isPreloadingDone } = useImageSequence({
    frameCount: FRAME_COUNT,
    getFrameSrc,
  });

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameToRender = framesRef.current[frameIndex];
    if (!frameToRender) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, rect.width, rect.height);

    const imgRatio = frameToRender.width / frameToRender.height;
    const canvasRatio = rect.width / rect.height;
    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(frameToRender, offsetX, offsetY, drawWidth, drawHeight);
  }, [framesRef]);

  const getFrameForStep = useCallback((step: number, stepProgress: number) => {
    const range = STEP_FRAME_RANGES[Math.min(step, STEP_FRAME_RANGES.length - 1)];
    const frameIndex = Math.round(range.start + stepProgress * (range.end - range.start));
    return Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1));
  }, []);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const section = containerRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !isPreloadingDone) return;

    const sectionProgress = Math.min(progress, 0.999);
    const stepFloat = sectionProgress * stepCount;
    const stepIndex = Math.min(Math.floor(stepFloat), stepCount - 1);
    const stepProgress = stepFloat - stepIndex;

    const frameIndex = getFrameForStep(stepIndex, stepProgress);
    renderFrame(frameIndex);
  }, [progress, isPreloadingDone, reducedMotion, stepCount, getFrameForStep, renderFrame]);

  if (reducedMotion) {
    return (
      <section id="installation" className="bg-secondary section-padding relative z-10">
        <div className="section-container text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Installs where the work happens
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            A practical mounting process designed for real-world equipment and standard tools.
          </p>
          <ol className="text-left space-y-6 max-w-xl mx-auto">
            {installationSteps.map((step, i) => (
              <li key={step.id} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                <div>
                  <h3 className="text-white font-bold uppercase tracking-wide">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="installation" ref={containerRef} className="bg-secondary section-padding relative z-10">
      <div className="section-container">
        
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Installs where the work happens
          </h2>
          <p className="text-lg text-muted-foreground">
            A practical mounting process designed for real-world equipment and standard tools.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
          
          {/* Left Column: Sticky Frame Canvas */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-[40vh] min-h-[300px] lg:h-[50vh] rounded-xl overflow-hidden bg-card border border-border">
            <div className="relative w-full h-full bg-black">
              {!isPreloadingDone && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black text-muted-foreground">
                  <div className="w-32 h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: "60%" }} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest mt-4 font-bold">Loading</span>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className={cn(
                  "w-full h-full outline-none",
                  !isPreloadingDone && "opacity-0"
                )}
              />

              {/* Step indicator overlay */}
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full z-10">
                <span className="text-primary font-bold text-sm tracking-widest uppercase">
                  Step 0{activeStep + 1} / 0{installationSteps.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Steps */}
          <div className="w-full lg:w-1/2 flex flex-col gap-12 lg:py-[10vh]">
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
                      "w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-bold text-base md:text-lg transition-colors duration-500",
                      isActive 
                        ? "border-primary bg-primary text-white" 
                        : "border-border bg-transparent text-muted-foreground"
                    )}>
                      {index + 1}
                    </div>
                    {index < installationSteps.length - 1 && (
                      <div className="w-px h-full min-h-[60px] bg-border mt-3" />
                    )}
                  </div>
                  
                  <div className="pt-1 pb-6">
                    <h3 className={cn(
                      "text-xl md:text-2xl font-bold uppercase tracking-wide mb-2 transition-colors duration-500",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
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
