"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#1A1A1A] pt-32 pb-12 md:pb-16 text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col min-h-[50vh] justify-between relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mb-32 pb-16 border-b border-white/20">
          <div className="footer-reveal">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 block mb-8">
              Navigasi
            </span>
            <ul className="flex flex-col gap-4 font-sans text-sm md:text-base text-white/95">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#umkm" className="hover:text-white transition-colors">
                  UMKM
                </Link>
              </li>
              <li>
                <Link href="/#testimoni" className="hover:text-white transition-colors">
                  Testimoni
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-reveal">
            <span className="font-sans font-semibold text-[10px] uppercase tracking-[0.2em] text-white/75 block mb-8">
              Admin
            </span>
            <ul className="flex flex-col gap-4 font-sans text-sm md:text-base text-white/95">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/umkm" className="hover:text-white transition-colors">
                  Kelola UMKM
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-reveal col-span-2">
            <span className="font-sans font-semibold text-[10px] uppercase tracking-[0.2em] text-white/75 block mb-8">
              Tentang
            </span>
            <p className="font-sans text-sm md:text-base text-white/90 leading-relaxed max-w-sm">
              Platform untuk menemukan dan mendukung usaha mikro, kecil, dan
              menengah lokal. Temukan produk dan layanan terbaik di sekitar
              Anda.
            </p>
          </div>
        </div>

        <div className="flex flex-col mb-4 footer-reveal">
          <div className="w-full flex justify-center items-center mb-8">
            <h2 className="font-sans text-[12vw] md:text-[14vw] leading-[0.8] tracking-tighter font-medium text-white/95 whitespace-nowrap select-none">
              UMKM Lokal
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/20 font-sans text-xs text-white/80 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} UMKM Lokal. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
