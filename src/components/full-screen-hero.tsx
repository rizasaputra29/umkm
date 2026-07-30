"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";

interface BannerImage {
  id: string;
  publicId: string;
  url: string;
  urutan: number;
}

interface Banner {
  id: string;
  title: string | null;
  subtitle: string | null;
  link: string | null;
  thumbnailIndex: number;
  images: BannerImage[];
}

interface FullScreenHeroProps {
  banners: Banner[];
}

export function FullScreenHero({ banners }: FullScreenHeroProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollability = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = clientWidth;
    if (cardWidth > 0) {
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, banners.length - 1));
    }
  }, [banners.length]);

  useEffect(() => {
    checkScrollability();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollability, { passive: true });
    return () => el.removeEventListener("scroll", checkScrollability);
  }, [checkScrollability]);

  // Auto-rotate
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      const nextScroll = scrollLeft + clientWidth;
      if (nextScroll >= scrollWidth - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const scrollLeft = () => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
  };

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-[#EDEAE6]">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex w-full h-full overflow-x-auto overscroll-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {banners.map((banner, index) => {
          const thumbnailUrl =
            banner.images[banner.thumbnailIndex]?.url ||
            banner.images[0]?.url;

          return (
            <div
              key={banner.id}
              className="relative flex-shrink-0 w-full h-full snap-center"
            >
              {/* Background Image */}
              {thumbnailUrl && (
                <Image
                  src={thumbnailUrl}
                  alt={banner.title || banner.subtitle || "Hero Banner"}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              )}

              {/* Gradient Overlay — darker at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

              {/* Text Content — bottom-left */}
              <motion.div
                className="absolute bottom-20 md:bottom-24 left-6 md:left-12 lg:left-20 z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {banner.title && (
                  <p className="font-sans text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-white/70 mb-3">
                    {banner.title}
                  </p>
                )}
                {banner.subtitle && (
                  <h1
                    className="font-sans font-light text-white tracking-tight leading-[1.05]"
                    style={{
                      fontSize: "clamp(2.5rem, 1.2rem + 5vw, 5.5rem)",
                    }}
                  >
                    {banner.subtitle}
                  </h1>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows — solid grey circles, vertically centered */}
      {banners.length > 1 && (
        <>
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#EDEAE6]/80 backdrop-blur-sm text-[#1A1A1A] hover:bg-[#EDEAE6] transition-colors disabled:opacity-30 disabled:cursor-default"
            aria-label="Previous banner"
          >
            <IconArrowNarrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#EDEAE6]/80 backdrop-blur-sm text-[#1A1A1A] hover:bg-[#EDEAE6] transition-colors disabled:opacity-30 disabled:cursor-default"
            aria-label="Next banner"
          >
            <IconArrowNarrowRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots Indicator — bottom center */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white w-7"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
