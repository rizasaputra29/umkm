import Link from "next/link";
import { cn } from "@/lib/utils";

interface MinimalPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  className?: string;
}

export function MinimalPagination({
  currentPage,
  totalPages,
  basePath = "/",
  className,
}: MinimalPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-1.5 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          &larr;
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={cn(
            "px-3 py-1.5 text-sm transition-colors rounded-md",
            page === currentPage
              ? "bg-[#1A1A1A] text-white"
              : "text-[#6B6B6B] hover:text-[#1A1A1A]"
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-1.5 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          &rarr;
        </Link>
      )}
    </nav>
  );
}
