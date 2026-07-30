"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterChip {
  id: string;
  label: string;
  value: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function FilterChips({
  chips,
  onRemove,
  onClearAll,
  className,
}: FilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        Filter:
      </span>
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-foreground text-background text-xs font-semibold tracking-[0.1em]"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.id)}
            className="hover:bg-white/20 p-0.5 transition-colors duration-150"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {chips.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          Hapus Semua
        </button>
      )}
    </div>
  );
}
