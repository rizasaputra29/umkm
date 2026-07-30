import { createTestimonial } from "@/actions/testimonial";
import { TestimonialForm } from "@/components/testimonial-form";
import type { TestimonialFormValues } from "@/lib/schemas-new";

export default function NewTestimonialPage() {
  async function handleSubmit(data: TestimonialFormValues) {
    "use server";
    await createTestimonial(data);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Tambah Testimonial
      </h1>
      <div className="rounded-[12px] border border-border/50 bg-card p-6 max-w-2xl">
        <TestimonialForm onSubmit={handleSubmit} submitLabel="Tambah Testimonial" />
      </div>
    </div>
  );
}
