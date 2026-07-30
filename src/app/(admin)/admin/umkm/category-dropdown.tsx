"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface CategoryDropdownProps {
  categories: Category[];
  currentCategory: string;
}

export function CategoryDropdown({
  categories,
  currentCategory,
}: CategoryDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = categories.find((c) => c.id === currentCategory);

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

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.delete("page");
    router.push(`/admin/umkm?${params.toString()}`);
    setIsOpen(false);
  }

  const allCategories = [{ id: "all", name: "Semua Kategori" }, ...categories];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-[12px] border border-border bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground whitespace-nowrap transition-colors duration-150 hover:border-foreground"
      >
        {selected?.name || "Semua Kategori"}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-48 rounded border border-border bg-popover">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect(cat.id)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2.5 text-left text-xs font-medium transition-colors duration-150",
                (currentCategory || "all") === cat.id
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.name}
              {(currentCategory || "all") === cat.id && (
                <Check className="h-3 w-3" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
