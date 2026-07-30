"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import { testimonialSchema, type TestimonialFormValues } from "@/lib/schemas-new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

interface TestimonialFormProps {
  defaultValues?: Partial<TestimonialFormValues>;
  onSubmit: (data: TestimonialFormValues) => Promise<void>;
  submitLabel?: string;
}

export function TestimonialForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
}: TestimonialFormProps) {
  const router = useRouter();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      quote: "",
      author: "",
      role: "",
      avatar: "",
      ...defaultValues,
    },
  });

  const { formState: { isSubmitting } } = form;

  async function handleSubmit(data: TestimonialFormValues) {
    try {
      await onSubmit(data);
      toast.success("Testimonial berhasil disimpan");
      router.push("/testimonials");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan testimonial");
      console.error(error);
    }
  }

  const inputClass = "h-10 border-0 border-b border-border bg-transparent px-0 text-sm text-foreground focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground";
  const labelClass = "text-[11px] font-normal tracking-[0.15em] text-muted-foreground";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Controller
        name="quote"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Quote
            </FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Apa kata mereka tentang usaha ini..."
              className={`min-h-[100px] ${inputClass} resize-none`}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="author"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Author
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Nama"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Role (opsional)
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Contoh: Pelanggan"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="default" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {submitLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          Batal
        </Button>
      </div>
    </form>
  );
}
