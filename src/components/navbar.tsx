"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  { label: "Home", link: "/" },
  { label: "UMKM", link: "/#umkm" },
  { label: "Testimoni", link: "/#testimoni" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile: Standard (NOT scrolled) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/">
              <span className="font-sans text-2xl font-semibold tracking-tight text-[#1A1A1A]">
                UMKM
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-1.5 shadow-sm hover:bg-white transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="w-5 h-[1.5px] bg-[#1A1A1A]"></div>
              <div className="w-5 h-[1.5px] bg-[#1A1A1A]"></div>
            </button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile: Floating Pill (Scrolled) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.header
            className="fixed top-4 left-0 right-0 z-50 flex justify-center md:hidden pointer-events-none"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-[#E5E2DD]/50 px-4 py-2.5 rounded-full shadow-lg flex items-center gap-4">
              <Link href="/">
                <span className="font-sans text-lg font-semibold tracking-tight text-[#1A1A1A]">
                  UMKM
                </span>
              </Link>
              <div className="w-px h-5 bg-[#E5E2DD]"></div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-9 h-9 bg-[#EDEAE6] rounded-full flex flex-col items-center justify-center gap-1 hover:bg-[#E5E2DD] transition-colors"
                aria-label="Toggle Menu"
              >
                <div className="w-4 h-[1.5px] bg-[#1A1A1A]"></div>
                <div className="w-4 h-[1.5px] bg-[#1A1A1A]"></div>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Desktop: Standard (NOT scrolled) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.header
            className="fixed top-0 left-0 mx-12 right-0 z-40 hidden md:flex items-center justify-between px-12 py-8 bg-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="font-sans text-2xl font-semibold tracking-tight text-[#1A1A1A]"
            >
              UMKM Lokal
            </Link>

            <nav className="flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className="text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Login Admin
            </Link>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Desktop: Floating Pill (Scrolled) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.header
            className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="pointer-events-auto bg-white/80 backdrop-blur-xl border border-[#E5E2DD]/50 p-1.5 rounded-full shadow-sm flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.link}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-[#6B6B6B] hover:text-[#1A1A1A]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="w-px h-4 bg-[#E5E2DD] mx-2"></div>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-[#1A1A1A] text-white hover:bg-[#333]"
              >
                Login
              </Link>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  );
}
