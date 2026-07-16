import { getBannerById, updateBanner } from "@/actions/banner";
import { BannerForm } from "@/components/banner-form";
import type { BannerFormValues } from "@/lib/schemas-new";
import { notFound } from "next/navigation";

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let banner;
  try {
    banner = await getBannerById(id);
  } catch {
    notFound();
  }

  async function handleSubmit(data: BannerFormValues) {
    "use server";
    await updateBanner(id, data);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-medium tracking-tight text-[#1A1A1A]">
        Edit Banner
      </h1>
      <div className="max-w-2xl">
        <BannerForm
          defaultValues={{
            images: banner.images.map((img) => ({
              publicId: img.publicId,
              url: img.url,
            })),
            thumbnailIndex: banner.thumbnailIndex,
            title: banner.title || undefined,
            subtitle: banner.subtitle || undefined,
            link: banner.link || undefined,
            active: banner.active,
            order: banner.order,
          }}
          onSubmit={handleSubmit}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
