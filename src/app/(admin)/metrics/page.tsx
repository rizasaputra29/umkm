import { getMetricsContentForAdmin, upsertMetricsContent } from "@/actions/site-content";
import { MetricsContentForm } from "@/components/metrics-content-form";
import type { MetricsContentFormValues } from "@/lib/schemas-new";

export default async function MetricsPage() {
  const content = await getMetricsContentForAdmin();

  async function handleSubmit(data: MetricsContentFormValues) {
    "use server";
    await upsertMetricsContent(data);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Edit Section Statistik
      </h1>
      <div className="rounded-[12px] border border-border/50 bg-card p-6 max-w-2xl">
        <MetricsContentForm
          defaultValues={
            content
              ? {
                  sectionTitle: content.sectionTitle,
                  label1: content.label1,
                  label2: content.label2,
                  label3: content.label3,
                  label4: content.label4,
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
