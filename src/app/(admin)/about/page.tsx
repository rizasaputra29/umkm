import { getAboutContentForAdmin, upsertAboutContent } from "@/actions/site-content";
import { AboutContentForm } from "@/components/about-content-form";
import type { AboutContentFormValues } from "@/lib/schemas-new";

export default async function AboutPage() {
  const content = await getAboutContentForAdmin();

  async function handleSubmit(data: AboutContentFormValues) {
    "use server";
    await upsertAboutContent(data);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Edit Section Tentang
      </h1>
      <div className="rounded-[12px] border border-border/50 bg-card p-6 max-w-2xl">
        <AboutContentForm
          defaultValues={
            content
              ? {
                  title: content.title,
                  paragraph1: content.paragraph1,
                  paragraph2: content.paragraph2,
                  ctaText: content.ctaText,
                  ctaLink: content.ctaLink,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
