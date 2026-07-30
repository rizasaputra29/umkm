import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn("rounded-[12px] border border-border bg-card p-6", className)}>
      <blockquote className="text-base leading-relaxed text-foreground/80 md:text-lg tracking-[-0.01em]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{author}</p>
          {role && (
            <p className="text-xs text-muted-foreground tracking-[0.05em]">{role}</p>
          )}
        </div>
      </div>
    </div>
  );
}
