"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  align?: "left" | "right";
}

export function SortDropdown({
  options,
  value,
  onChange,
  className,
  align = "right",
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 md:py-2.5 rounded-[12px] bg-white border border-border text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:border-foreground transition-colors duration-150 whitespace-nowrap"
      >
        {selectedOption?.label || "Urutkan"}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className={cn("absolute mt-1 min-w-48 w-max max-w-[80vw] rounded bg-popover border border-border z-50", align === "left" ? "left-0" : "right-0")}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 md:py-2.5 text-xs font-medium text-left transition-colors duration-150",
                  value === option.value
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
              {value === option.value && <Check className="h-3 w-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
