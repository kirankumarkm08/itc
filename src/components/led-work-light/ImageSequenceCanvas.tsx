"use client";

import { useRef, useEffect, useState } from "react";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ImageSequenceCanvasProps {
  frameCount: number;
  getFrameSrc: (index: number) => string;
  mobileGetFrameSrc?: (index: number) => string;
  progress: number; // 0 to 1
  fallbackSrc: string;
}

export function ImageSequenceCanvas({
  frameCount,
  getFrameSrc,
  mobileGetFrameSrc,
  progress,
  fallbackSrc
}: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  
  // Choose the right frame source based on device width (run once on mount)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeGetFrameSrc = isMobile && mobileGetFrameSrc ? mobileGetFrameSrc : getFrameSrc;
  
  const { framesRef, isPreloadingDone, progress: loadProgress } = useImageSequence({
    frameCount,
    getFrameSrc: activeGetFrameSrc,
  });

  // Render the current frame to canvas
  useEffect(() => {
    if (reducedMotion || !canvasRef.current || framesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let targetFrameIndex = Math.floor(progress * (frameCount - 1));
    targetFrameIndex = Math.max(0, Math.min(targetFrameIndex, frameCount - 1));

    // Find the nearest loaded frame if the exact target isn't loaded yet
    let frameToRender = framesRef.current[targetFrameIndex];
    if (!frameToRender) {
      // Look backwards for a loaded frame
      for (let i = targetFrameIndex - 1; i >= 0; i--) {
        if (framesRef.current[i]) {
          frameToRender = framesRef.current[i];
          break;
        }
      }
      // If still none, look forwards
      if (!frameToRender) {
        for (let i = targetFrameIndex + 1; i < frameCount; i++) {
          if (framesRef.current[i]) {
            frameToRender = framesRef.current[i];
            break;
          }
        }
      }
    }

    if (frameToRender) {
      let animationFrameId: number;
      
      const render = () => {
        // Handle DPI scaling
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        
        // Match canvas logical size to physical display size
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.scale(dpr, dpr);
        }

        // Object-contain drawing logic
        ctx.clearRect(0, 0, rect.width, rect.height);
        
        const imgRatio = frameToRender.width / frameToRender.height;
        const canvasRatio = rect.width / rect.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

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
      };

      animationFrameId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [progress, frameCount, framesRef, reducedMotion]);

  // Handle resizing with ResizeObserver
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    
    const observer = new ResizeObserver(() => {
      // Trigger a re-render by slightly mutating state or directly calling render
      // But we rely on the next animation frame in the effect above
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <img 
          src={fallbackSrc} 
          alt="Exploded view fallback" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative bg-black">
      {!isPreloadingDone && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black text-muted-foreground">
          <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest mt-4 font-bold">Loading sequence</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={cn(
          "w-full h-full outline-none",
          !isPreloadingDone && "opacity-0"
        )}
      />
    </div>
  );
}
