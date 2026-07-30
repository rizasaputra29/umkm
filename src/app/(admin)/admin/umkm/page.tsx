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
import { ToggleUmkmStatus } from "@/components/toggle-umkm-status";
import { MinimalPagination } from "@/components/minimal-pagination";
import { CategoryDropdown } from "./category-dropdown";
import { CategoryModal } from "@/components/category-modal";
import { AdminSearchSort } from "./admin-search-sort";
import { UmkmStatusBadge } from "@/components/umkm-status-badge";

export default async function UmkmManagePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const categoryId = params.category || "";
  const search = params.q || "";
  const sortBy = params.sort || "newest";

  const [{ data: umkmList, totalPages }, categories] = await Promise.all([
    getAllUmkm(page, search, categoryId, sortBy, "", true, undefined),
    getAllCategories(),
  ]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-normal tracking-tight text-foreground">
          Kelola UMKM
        </h1>
        <div className="flex items-center gap-2">
          <CategoryModal
            categories={categories.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              _count: { umkms: c._count.umkms },
            }))}
          >
            <Button variant="outline" size="sm" className="gap-1.5">
              <Tags className="h-3.5 w-3.5" />
              Kelola Kategori
            </Button>
          </CategoryModal>
          <Link href="/admin/umkm/new">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Tambah UMKM
            </Button>
          </Link>
        </div>
      </div>

      <AdminSearchSort
        currentSearch={search}
        currentSort={sortBy}
        currentCategory={categoryId}
        categoryDropdown={
          <CategoryDropdown
            categories={categories.map((c) => ({
              id: c.id,
              name: c.name,
            }))}
            currentCategory={categoryId}
          />
        }
      />

      <div className="rounded-[12px] border border-border/50 bg-card p-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] font-medium tracking-[0.15em]">
                Nama Usaha
              </TableHead>
              <TableHead className="text-[11px] font-medium tracking-[0.15em]">
                Kategori
              </TableHead>
              <TableHead className="text-[11px] font-medium tracking-[0.15em]">
                Pemilik
              </TableHead>
              <TableHead className="text-[11px] font-medium tracking-[0.15em]">
                WhatsApp
              </TableHead>
              <TableHead className="w-[90px] text-[11px] font-medium tracking-[0.15em]">
                Status
              </TableHead>
              <TableHead className="w-[70px] text-[11px] font-medium tracking-[0.15em]">
                Aktif
              </TableHead>
              <TableHead className="w-[180px] text-[11px] font-medium tracking-[0.15em]">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {umkmList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  {search
                    ? `Tidak ada UMKM yang ditemukan untuk "${search}"`
                    : categoryId
                      ? "Tidak ada UMKM dalam kategori ini"
                      : "Belum ada data UMKM"}
                </TableCell>
              </TableRow>
            ) : (
              umkmList.map((umkm) => (
                <TableRow key={umkm.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">
                    {umkm.namaUsaha}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {umkm.category?.name || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {umkm.namaPemilik}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {umkm.whatsapp}
                  </TableCell>
                  <TableCell>
                    <UmkmStatusBadge status={umkm.status} />
                  </TableCell>
                  <TableCell>
                    <ToggleUmkmStatus id={umkm.id} isActive={umkm.isActive} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/umkm/${umkm.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
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

        {totalPages > 1 && (
          <div className="mt-6">
            <MinimalPagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/admin/umkm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
