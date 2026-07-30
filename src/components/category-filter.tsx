"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface CategoryFilterProps {
  categories: { label: string; value: string }[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <ScrollReveal y={15} stagger={0.04} className={cn("w-full", className)}>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={cn(
              "shrink-0 px-4 py-2 rounded text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-150 border",
              active === cat.value
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </ScrollReveal>
  );
}
