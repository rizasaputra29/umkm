import Link from "next/link";
import { getAllUmkm } from "@/actions/umkm";
import { getAllCategories } from "@/actions/category";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Tags } from "lucide-react";
import { DeleteUmkmButton } from "@/components/delete-umkm-button";
import { MinimalPagination } from "@/components/minimal-pagination";
import { UmkmCategoryFilter } from "./category-filter";
import { CategoryModal } from "@/components/category-modal";

export default async function UmkmManagePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const categoryId = params.category || "";

  const [{ data: umkmList, totalPages }, categories] = await Promise.all([
    getAllUmkm(page, "", categoryId),
    getAllCategories(),
  ]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight text-[#1A1A1A]">
          Kelola UMKM
        </h1>
        <div className="flex items-center gap-2">
          <CategoryModal
            categories={categories.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              _count: { umkms: (c as any)._count.umkms },
            }))}
          >
            <Button variant="outline" size="sm" className="gap-1.5">
              <Tags className="h-3.5 w-3.5" />
              Kelola Kategori
            </Button>
          </CategoryModal>
          <Link href="/umkm/new">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Tambah UMKM
            </Button>
          </Link>
        </div>
      </div>

      <UmkmCategoryFilter
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          count: (c as any)._count.umkms,
        }))}
        currentCategory={categoryId}
      />

      <div className="rounded-xl border border-[#E5E2DD] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] font-medium uppercase tracking-[0.15em]">
                Nama Usaha
              </TableHead>
              <TableHead className="text-[11px] font-medium uppercase tracking-[0.15em]">
                Kategori
              </TableHead>
              <TableHead className="text-[11px] font-medium uppercase tracking-[0.15em]">
                Pemilik
              </TableHead>
              <TableHead className="text-[11px] font-medium uppercase tracking-[0.15em]">
                WhatsApp
              </TableHead>
              <TableHead className="w-[100px] text-[11px] font-medium uppercase tracking-[0.15em]">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {umkmList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-sm text-[#6B6B6B]"
                >
                  {categoryId
                    ? "Tidak ada UMKM dalam kategori ini"
                    : "Belum ada data UMKM"}
                </TableCell>
              </TableRow>
            ) : (
              umkmList.map((umkm: any) => (
                <TableRow key={umkm.id} className="hover:bg-[#EDEAE6]/30">
                  <TableCell className="font-medium text-[#1A1A1A]">
                    {umkm.namaUsaha}
                  </TableCell>
                  <TableCell className="text-[#6B6B6B]">
                    {umkm.category?.name || (
                      <span className="text-[#D5D0CA]">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-[#6B6B6B]">
                    {umkm.namaPemilik}
                  </TableCell>
                  <TableCell className="text-[#6B6B6B]">
                    {umkm.whatsapp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link href={`/umkm/${umkm.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <DeleteUmkmButton id={umkm.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <MinimalPagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/umkm"
          />
        </div>
      )}
    </div>
  );
}
