"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  avatar: string | null;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimoni" className="py-20 md:py-32 bg-[#F5F3F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <ScrollReveal y={25} className="mb-16 md:mb-20 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6B6B]">
            Testimoni
          </p>
          <h2
            className="font-medium tracking-tight text-[#1A1A1A]"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.5rem)" }}
          >
            Apa Kata Mereka
          </h2>
        </ScrollReveal>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative bg-white rounded-2xl p-8 border border-[#E5E2DD] hover:border-[#D5D0CA] transition-colors"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-8">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="text-[#C8603D]/10"
                >
                  <path
                    d="M9.333 18.667c0 2.946-2.387 5.333-5.333 5.333V18.667c0-1.1.9-2 2-2h2v-2.667H6c-2.56 0-4.667 2.107-4.667 4.667v5.333C1.333 27.253 4.08 30 7.333 30c2.947 0 5.334-2.387 5.334-5.333 0-2.56-2.107-4.667-4.667-4.667H9.333zM24.667 18.667c0 2.946-2.387 5.333-5.334 5.333V18.667c0-1.1.9-2 2-2h2v-2.667h-2c-2.56 0-4.667 2.107-4.667 4.667v5.333c0 3.253 2.747 6 6 6 2.947 0 5.334-2.387 5.334-5.333 0-2.56-2.107-4.667-4.667-4.667h1.334z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Quote */}
              <blockquote className="font-sans text-base text-[#1A1A1A] leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                {testimonial.avatar ? (
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={44}
                    height={44}
                    className="rounded-full object-cover w-11 h-11"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#EDEAE6] flex items-center justify-center text-sm font-medium text-[#6B6B6B]">
                    {testimonial.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-sans text-sm font-medium text-[#1A1A1A]">
                    {testimonial.author}
                  </p>
                  {testimonial.role && (
                    <p className="font-sans text-xs text-[#6B6B6B]">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
