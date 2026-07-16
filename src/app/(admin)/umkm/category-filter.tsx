"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface UmkmCategoryFilterProps {
  categories: Category[];
  currentCategory: string;
}

export function UmkmCategoryFilter({
  categories,
  currentCategory,
}: UmkmCategoryFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Link
        href="/umkm"
        className={cn(
          "rounded-full px-4 py-2 text-xs font-medium transition-colors",
          !currentCategory
            ? "bg-[#1A1A1A] text-white"
            : "bg-white text-[#6B6B6B] border border-[#E5E2DD] hover:border-[#D5D0CA]"
        )}
      >
        Semua
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/umkm?category=${cat.id}`}
          className={cn(
            "rounded-full px-4 py-2 text-xs font-medium transition-colors",
            currentCategory === cat.id
              ? "bg-[#1A1A1A] text-white"
              : "bg-white text-[#6B6B6B] border border-[#E5E2DD] hover:border-[#D5D0CA]"
          )}
        >
          {cat.name}
          <span className="ml-1.5 opacity-60">{cat.count}</span>
        </Link>
      ))}
    </div>
  );
}
