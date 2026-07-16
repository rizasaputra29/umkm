"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

interface ScrollAnimationOptions {
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  batch?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  y = 30,
  stagger = 0.08,
  duration = 0.7,
  delay = 0,
  start = "top 85%",
  batch = false,
}: ScrollAnimationOptions = {}) {
  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      if (batch) {
        ScrollTrigger.batch(containerRef.current, {
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { opacity: 0, y },
              { opacity: 1, y: 0, stagger, duration, delay }
            );
          },
          start,
        });
      } else {
        const children = containerRef.current.children;
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              stagger,
              duration,
              delay,
              scrollTrigger: {
                trigger: containerRef.current,
                start,
              },
            }
          );
        }
      }
    },
    { scope: containerRef }
  );

  return containerRef;
}
