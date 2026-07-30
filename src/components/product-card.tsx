import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface ProductCardProps {
  href: string;
  image?: string;
  title: string;
  location?: string;
  className?: string;
}

export function ProductCard({
  href,
  image,
  title,
  location,
  className,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <div className="aspect-[4/5] overflow-hidden bg-[#EDEAE6]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-light text-[#D5D0CA]">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-[#1A1A1A] line-clamp-1">
          {title}
        </h3>
        {location && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-[#6B6B6B]">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{location}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
