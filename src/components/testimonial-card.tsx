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
    <div className={cn("flex flex-col", className)}>
      <blockquote className="text-base leading-relaxed text-[#1A1A1A]/80 md:text-lg">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px w-8 bg-[#C8603D]" />
        <div>
          <p className="text-sm font-medium text-[#1A1A1A]">{author}</p>
          {role && (
            <p className="text-xs text-[#6B6B6B]">{role}</p>
          )}
        </div>
      </div>
    </div>
  );
}
