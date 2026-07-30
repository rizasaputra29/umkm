import type { Metadata } from "next";
import { cookies } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMKM Lokal - Temukan Usaha Lokal Terbaik",
  description:
    "Temukan dan dukung usaha mikro, kecil, dan menengah lokal. Platform untuk menemukan produk dan layanan UMKM di sekitar Anda.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value || "system";
  const isDark = themeCookie === "dark";

  return (
    <html lang="id" className={`h-full antialiased ${GeistSans.className}${isDark ? " dark" : ""}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <ServiceWorkerRegistration />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
