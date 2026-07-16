import Link from "next/link";
import { MapPin } from "lucide-react";

interface UmkmCardProps {
  umkm: {
    id: string;
    namaUsaha: string;
    deskripsi: string;
    alamat: string;
    namaPemilik: string;
    whatsapp: string;
    tanggalMulai: Date;
    socialLinks: { id: string; platform: string; url: string }[];
    images: { id: string; publicId: string; url: string; urutan: number }[];
  };
}

export function UmkmCard({ umkm }: UmkmCardProps) {
  const mainImage = umkm.images[0];

  return (
    <Link
      href={`/umkm/${umkm.id}`}
      className="group block overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div className="aspect-[4/5] overflow-hidden bg-[#EDEAE6]">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={umkm.namaUsaha}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-light text-[#D5D0CA]">
              {umkm.namaUsaha.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-[#1A1A1A] line-clamp-1">
          {umkm.namaUsaha}
        </h3>
        <p className="mt-1 text-xs text-[#6B6B6B] line-clamp-2">
          {umkm.deskripsi}
        </p>
        <div className="mt-2 flex items-center gap-1 text-xs text-[#6B6B6B]">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{umkm.alamat}</span>
        </div>
      </div>
    </Link>
  );
}
