"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], threshold = 0.5) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    
    // We keep track of visibility ratios to know which one is most visible
    const visibilityRatios = new Map<string, number>();

    const updateActive = () => {
      let maxRatio = 0;
      let maxId = "";
      visibilityRatios.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxId = id;
        }
      });
      if (maxId) {
        setActiveSection(maxId);
      }
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              visibilityRatios.set(id, entry.intersectionRatio);
            });
            updateActive();
          },
          { threshold: Array.from({ length: 11 }, (_, i) => i / 10) } // Check every 10%
        );
        observer.observe(element);
        observers.set(id, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, threshold]);

  return activeSection;
}
