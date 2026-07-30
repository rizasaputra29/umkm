import { getUmkmById, getRandomUmkm } from "@/actions/umkm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import {
  MapPin,
  Phone,
  Calendar,
  User,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { PLATFORM_LABELS } from "@/lib/schemas";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { UmkmDetailClient } from "./umkm-detail-client";

export default async function UmkmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let umkm;
  try {
    umkm = await getUmkmById(id);
  } catch {
    notFound();
  }

  const relatedUmkm = await getRandomUmkm(4, id);
  const mainImageUrl = umkm.images[umkm.thumbnailIndex]?.url || umkm.images[0]?.url;

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 md:pt-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali
          </Link>

          {/* Bygone-style: large image left, info right */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] mb-20">
            {/* Left: Images */}
            <UmkmDetailClient
              images={umkm.images}
              thumbnailIndex={umkm.thumbnailIndex}
              namaUsaha={umkm.namaUsaha}
            />

            {/* Right: Info */}
            <div className="py-4 lg:py-8 space-y-8">
              <div>
                <h1
                  className="font-medium tracking-tight text-[#1A1A1A] mb-2"
                  style={{ fontSize: "clamp(2rem, 1rem + 2.5vw, 3rem)" }}
                >
                  {umkm.namaUsaha}
                </h1>
                <p className="text-[#6B6B6B] text-sm">
                  {umkm.namaPemilik}
                </p>
              </div>

              <div className="h-px bg-[#E5E2DD]" />

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 text-[#6B6B6B]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {umkm.namaPemilik}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">Pemilik</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#6B6B6B]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {umkm.alamat}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">Alamat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-[#6B6B6B]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {umkm.whatsapp}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-[#6B6B6B]" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {new Date(umkm.tanggalMulai).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">Tanggal Mulai</p>
                  </div>
                </div>
              </div>

              {umkm.socialLinks.length > 0 && (
                <>
                  <div className="h-px bg-[#E5E2DD]" />
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6B6B]">
                      Platform Digital
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {umkm.socialLinks.map((link: any) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EDEAE6] text-sm text-[#1A1A1A] hover:bg-[#E5E2DD] transition-colors"
                        >
                          {PLATFORM_LABELS[link.platform] || link.platform}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="h-px bg-[#E5E2DD]" />

              <div>
                <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B6B6B]">
                  Tentang Usaha Ini
                </h2>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-[#1A1A1A]/80">
                  {umkm.deskripsi}
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${umkm.whatsapp.replace(/^0/, "62")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill inline-block px-8 py-3.5 bg-[#1A1A1A] text-white rounded-full text-sm font-medium transition-colors hover:text-white"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>

          {/* You might also like */}
          {relatedUmkm.length > 0 && (
            <section className="mb-20">
              <div className="mb-8">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] block mb-3">
                  Lainnya
                </span>
                <h2
                  className="font-medium tracking-tight text-[#1A1A1A]"
                  style={{ fontSize: "clamp(1.5rem, 0.8rem + 1.5vw, 2rem)" }}
                >
                  UMKM Lainnya
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedUmkm.map((item: any) => (
                  <ProductCard
                    key={item.id}
                    href={`/umkm/${item.id}`}
                    image={item.images[item.thumbnailIndex]?.url || item.images[0]?.url}
                    title={item.namaUsaha}
                    location={item.alamat}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
