"use client";

import { useEffect, useState, useRef } from "react";

export function useImageSequence({
  frameCount,
  getFrameSrc,
}: {
  frameCount: number;
  getFrameSrc: (index: number) => string;
}) {
  const [loadedFrames, setLoadedFrames] = useState(0);
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const [isPreloadingDone, setIsPreloadingDone] = useState(false);

  useEffect(() => {
    let active = true;

    const loadImages = async () => {
      // Preload first 10 frames
      const preloadCount = Math.min(10, frameCount);
      let loaded = 0;

      for (let i = 0; i < preloadCount; i++) {
        if (!active) return;
        const img = new Image();
        img.src = getFrameSrc(i);
        await new Promise((resolve) => {
          img.onload = () => {
            framesRef.current[i] = img;
            loaded++;
            setLoadedFrames(loaded);
            resolve(null);
          };
          img.onerror = () => {
            // Treat error as loaded to not block everything, but don't save to ref
            loaded++;
            setLoadedFrames(loaded);
            resolve(null);
          };
        });
      }
      setIsPreloadingDone(true);

      // Lazily load the rest
      for (let i = preloadCount; i < frameCount; i++) {
        if (!active) return;
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          if (!active) return;
          framesRef.current[i] = img;
          setLoadedFrames((prev) => prev + 1);
        };
      }
    };

    loadImages();

    return () => {
      active = false;
    };
  }, [frameCount, getFrameSrc]);

  return {
    framesRef,
    loadedFrames,
    isPreloadingDone,
    progress: Math.min(100, Math.round((loadedFrames / frameCount) * 100)),
  };
}
