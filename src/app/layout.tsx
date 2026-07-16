import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMKM Lokal - Temukan Usaha Lokal Terbaik",
  description:
    "Temukan dan dukung usaha mikro, kecil, dan menengah lokal. Platform untuk menemukan produk dan layanan UMKM di sekitar Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-[#F5F3F0]">
        <ServiceWorkerRegistration />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
