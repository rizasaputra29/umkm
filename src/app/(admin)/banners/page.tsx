import { getAllBanners } from "@/actions/banner";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteBannerButton } from "./delete-banner-button";
import Image from "next/image";

export default async function BannersPage() {
  const banners = await getAllBanners();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-[#1A1A1A]">
          Hero Banners
        </h1>
        <Link href="/banners/new">
          <Button variant="coffee" className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Banner
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-[#E5E2DD] bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                Gambar
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                Judul
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                Status
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                Urutan
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-[#6B6B6B]">
                  Belum ada banner
                </TableCell>
              </TableRow>
            ) : (
              banners.map((b) => {
                const thumbnailUrl = b.images[b.thumbnailIndex]?.url || b.images[0]?.url;
                return (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="w-20 h-12 rounded-lg overflow-hidden bg-[#EDEAE6]">
                      {thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={b.title || "Banner"}
                          width={80}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#6B6B6B]">
                          No image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-[#1A1A1A]">
                    {b.title || "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                        b.active
                          ? "bg-green-100 text-green-700"
                          : "bg-[#EDEAE6] text-[#6B6B6B]"
                      }`}
                    >
                      {b.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-[#6B6B6B]">
                    {b.order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/banners/${b.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#6B6B6B] hover:text-[#1A1A1A]"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <DeleteBannerButton id={b.id} />
                    </div>
                  </TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
