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
          scroll={false}
          className="px-3 py-1.5 rounded-[12px] border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
        >
          &larr;
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          scroll={false}
          className={cn(
            "px-3 py-1.5 rounded-[12px] text-sm transition-colors duration-150",
            page === currentPage
              ? "border border-foreground text-foreground font-semibold"
              : "border border-border/50 text-muted-foreground/50 hover:text-foreground hover:bg-muted"
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          scroll={false}
          className="px-3 py-1.5 rounded-[12px] border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
        >
          &rarr;
        </Link>
      )}
    </nav>
  );
}
