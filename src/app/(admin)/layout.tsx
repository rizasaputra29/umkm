"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Store,
  Menu,
  LogOut,
  MessageSquareQuote,
  Image,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/umkm", label: "Kelola UMKM", icon: Store },
  { href: "/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/banners", label: "Hero Banners", icon: Image },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F5F3F0]">
      <aside className="hidden w-64 border-r border-[#E5E2DD] bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-[#E5E2DD] px-6">
            <Link
              href="/admin"
              className="text-sm font-semibold tracking-tight text-[#1A1A1A]"
            >
              UMKM Lokal Admin
            </Link>
          </div>
          <nav className="flex-1 space-y-0.5 p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-[#EDEAE6] font-medium text-[#1A1A1A]"
                    : "text-[#6B6B6B] hover:bg-[#EDEAE6]/50 hover:text-[#1A1A1A]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-[#E5E2DD] p-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#6B6B6B] hover:bg-[#EDEAE6]/50 hover:text-[#1A1A1A] transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Kembali ke Situs
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col lg:hidden">
        <header className="flex h-16 items-center justify-between border-b border-[#E5E2DD] bg-white px-4">
          <Link
            href="/admin"
            className="text-sm font-semibold tracking-tight text-[#1A1A1A]"
          >
            UMKM Lokal Admin
          </Link>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-white">
              <nav className="mt-6 space-y-0.5 px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "bg-[#EDEAE6] font-medium text-[#1A1A1A]"
                        : "text-[#6B6B6B] hover:bg-[#EDEAE6]/50 hover:text-[#1A1A1A]"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#6B6B6B] hover:bg-[#EDEAE6]/50 hover:text-[#1A1A1A] transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Kembali ke Situs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>

      <main className="hidden flex-1 p-8 lg:block">{children}</main>
    </div>
  );
}
