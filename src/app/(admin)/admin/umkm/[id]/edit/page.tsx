import { getUmkmById, updateUmkm } from "@/actions/umkm";
import { getAllCategories } from "@/actions/category";
import { UmkmForm } from "@/components/umkm-form";
import type { UmkmFormValues } from "@/lib/schemas";
import { notFound } from "next/navigation";

export default async function EditUmkmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let umkm: Awaited<ReturnType<typeof getUmkmById>>;
  try {
    umkm = await getUmkmById(id);
  } catch {
    notFound();
  }

  const categories = await getAllCategories();

  const defaultValues: Partial<UmkmFormValues> = {
    namaUsaha: umkm.namaUsaha,
    deskripsi: umkm.deskripsi,
    alamat: umkm.alamat,
    alamatPribadi: umkm.alamatPribadi,
    namaPemilik: umkm.namaPemilik,
    whatsapp: umkm.whatsapp,
    tanggalMulai: new Date(umkm.tanggalMulai),
    categoryId: umkm.categoryId || undefined,
    thumbnailIndex: umkm.thumbnailIndex,
    showPhotoAlert: umkm.showPhotoAlert,
    socialLinks: umkm.socialLinks.map((link) => ({
      platform: link.platform as UmkmFormValues["socialLinks"][number]["platform"],
      url: link.url,
    })),
    images: umkm.images.map((img) => ({
      publicId: img.publicId,
      url: img.url,
    })),
  };

  async function handleSubmit(data: UmkmFormValues) {
    "use server";
    await updateUmkm(id, data, umkm.updatedAt);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Edit UMKM
      </h1>
      <div className="max-w-3xl">
        <UmkmForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          submitLabel="Simpan Perubahan"
          redirectTo="/admin/umkm"
        />
      </div>
    </div>
  );
}
