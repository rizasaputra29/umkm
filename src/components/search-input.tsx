"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
  className,
  debounceMs = 300,
}: SearchInputProps) {
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastCommittedRef = useRef(value);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = useCallback(
    (newValue: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      if (newValue === value) {
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      timerRef.current = setTimeout(() => {
        lastCommittedRef.current = newValue;
        onChange(newValue);
        setIsSearching(false);
      }, debounceMs);
    },
    [value, onChange, debounceMs]
  );

  const handleClear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsSearching(false);
    lastCommittedRef.current = "";
    onChange("");
  }, [onChange]);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        defaultValue={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 md:py-2.5 rounded-[12px] bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-150"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 min-w-10 min-h-10 md:min-w-0 md:min-h-0 w-5 h-5 flex items-center justify-center hover:bg-muted transition-colors duration-150"
        >
          {isSearching ? (
            <Loader2 className="h-3 w-3 text-muted-foreground animate-spin" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}
