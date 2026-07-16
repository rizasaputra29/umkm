import { getTestimonialById, updateTestimonial } from "@/actions/testimonial";
import { TestimonialForm } from "@/components/testimonial-form";
import type { TestimonialFormValues } from "@/lib/schemas-new";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let testimonial;
  try {
    testimonial = await getTestimonialById(id);
  } catch {
    notFound();
  }

  async function handleSubmit(data: TestimonialFormValues) {
    "use server";
    await updateTestimonial(id, data);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-medium tracking-tight text-[#1A1A1A]">
        Edit Testimonial
      </h1>
      <div className="max-w-2xl">
        <TestimonialForm
          defaultValues={{
            quote: testimonial.quote,
            author: testimonial.author,
            role: testimonial.role || undefined,
            avatar: testimonial.avatar || undefined,
          }}
          onSubmit={handleSubmit}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
