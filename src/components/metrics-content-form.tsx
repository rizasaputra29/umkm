"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import { metricsContentSchema, type MetricsContentFormValues } from "@/lib/schemas-new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

interface MetricsContentFormProps {
  defaultValues?: Partial<MetricsContentFormValues>;
  onSubmit: (data: MetricsContentFormValues) => Promise<void>;
  submitLabel?: string;
}

export function MetricsContentForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
}: MetricsContentFormProps) {
  const router = useRouter();
  const form = useForm<MetricsContentFormValues>({
    resolver: zodResolver(metricsContentSchema),
    defaultValues: {
      sectionTitle: "",
      label1: "",
      label2: "",
      label3: "",
      label4: "",
      ...defaultValues,
    },
  });

  const { formState: { isSubmitting } } = form;

  async function handleSubmit(data: MetricsContentFormValues) {
    try {
      await onSubmit(data);
      toast.success("Konten Statistik berhasil disimpan");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan konten Statistik");
      console.error(error);
    }
  }

  const inputClass = "h-10 border-0 border-b border-border bg-transparent px-0 text-sm text-foreground focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground";
  const labelClass = "text-[11px] font-normal tracking-[0.15em] text-muted-foreground";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Controller
        name="sectionTitle"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Judul Section
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Komunitas yang Terus Bertumbuh"
              className={inputClass}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="label1"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Label Stat 1
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="UMKM Terdaftar"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="label2"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Label Stat 2
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="UMKM Aktif"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="label3"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Label Stat 3
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Kategori"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="label4"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Label Stat 4
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Testimoni"
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
