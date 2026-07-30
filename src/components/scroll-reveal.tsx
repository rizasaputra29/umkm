"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ScrollRevealProps {
  children: ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function ScrollReveal({
  children,
  y = 30,
  duration = 0.7,
  delay = 0,
  stagger = 0,
  start = "top 85%",
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const targets = stagger > 0 ? ref.current.children : ref.current;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : 0,
          scrollTrigger: {
            trigger: ref.current,
            start,
          },
        }
      );
    },
    { scope: ref }
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
