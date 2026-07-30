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
              "shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border",
              active === cat.value
                ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                : "bg-white text-[#6B6B6B] border-[#E5E2DD] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </ScrollReveal>
  );
}
