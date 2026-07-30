import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      y={25}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6B6B]">
          {label}
        </p>
      )}
      <h2
        className="font-medium tracking-tight text-[#1A1A1A]"
        style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.5rem)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm text-[#6B6B6B] max-w-md mx-auto">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
