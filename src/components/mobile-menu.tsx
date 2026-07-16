"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: { label: string; link: string }[];
}

export function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 z-70 h-full w-[85%] max-w-sm bg-white shadow-2xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#E5E2DD]">
              <span className="font-sans text-xl font-semibold tracking-tight text-[#1A1A1A]">
                Menu
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#EDEAE6] rounded-full flex items-center justify-center hover:bg-[#E5E2DD] transition-colors"
                aria-label="Close Menu"
              >
                <X size={20} className="text-[#1A1A1A]" />
              </button>
            </div>

            <nav className="p-6">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.link}
                      onClick={onClose}
                      className="block py-4 text-2xl font-medium text-[#1A1A1A] hover:text-[#6B6B6B] transition-colors border-b border-[#E5E2DD]"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.05 + 0.2 }}
                className="mt-8"
              >
                <Link
                  href="/login"
                  onClick={onClose}
                  className="block w-full py-4 px-6 bg-[#1A1A1A] text-white text-center text-lg font-medium rounded-full hover:bg-[#333] transition-colors"
                >
                  Login Admin
                </Link>
              </motion.div>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#E5E2DD]">
              <p className="text-sm text-[#6B6B6B] text-center">
                &copy; {new Date().getFullYear()} UMKM Lokal
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
