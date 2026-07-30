import { createBanner } from "@/actions/banner";
import { BannerForm } from "@/components/banner-form";
import type { BannerFormValues } from "@/lib/schemas-new";

export default function NewBannerPage() {
  async function handleSubmit(data: BannerFormValues) {
    "use server";
    await createBanner(data);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Tambah Banner
      </h1>
      <div className="rounded-[12px] border border-border/50 bg-card p-6 max-w-2xl">
        <BannerForm onSubmit={handleSubmit} submitLabel="Tambah Banner" />
      </div>
    </div>
  );
}
