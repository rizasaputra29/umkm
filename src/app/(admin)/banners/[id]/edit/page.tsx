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
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Edit Banner
      </h1>
      <div className="rounded-[12px] border border-border/50 bg-card p-6 max-w-2xl">
        <BannerForm
          defaultValues={{
            image: banner.image,
            mobileImage: banner.mobileImage || undefined,
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
