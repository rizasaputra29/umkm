"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import {
  umkmFormSchema,
  type UmkmFormValues,
  PLATFORM_LABELS,
  PLATFORM_PLACEHOLDERS,
} from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { StepperForm } from "./stepper-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface UmkmFormProps {
  categories?: Category[];
  defaultValues?: Partial<UmkmFormValues>;
  onSubmit: (data: UmkmFormValues) => Promise<void>;
  submitLabel?: string;
}

export function UmkmForm({
  categories = [],
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
}: UmkmFormProps) {
  const router = useRouter();
  const form = useForm<UmkmFormValues>({
    resolver: zodResolver(umkmFormSchema) as any,
    defaultValues: {
      namaUsaha: "",
      deskripsi: "",
      alamat: "",
      namaPemilik: "",
      whatsapp: "",
      thumbnailIndex: 0,
      socialLinks: [{ platform: "instagram", url: "" }],
      images: [],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function handleSubmit() {
    const valid = await form.trigger();
    if (!valid) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }
    try {
      await onSubmit(form.getValues());
      toast.success("Data UMKM berhasil disimpan");
      router.push("/umkm");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan data UMKM");
      console.error(error);
    }
  }

  const inputClass =
    "h-10 border-0 border-b border-[#D5D0CA] bg-transparent px-0 text-sm text-[#1A1A1A] focus-visible:ring-0 focus-visible:border-[#1A1A1A] placeholder:text-[#6B6B6B]";
  const labelClass =
    "text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]";

  const steps = [
    {
      title: "Informasi Dasar",
      description: "Masukkan data dasar usaha Anda",
      content: (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Controller
              name="namaUsaha"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Nama Usaha
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Contoh: Warung Mak Juhri"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="namaPemilik"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Nama Pemilik
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Contoh: Juhri"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="deskripsi"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  Deskripsi Usaha
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ceritakan tentang usaha Anda..."
                  className={`min-h-[100px] ${inputClass} resize-none`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="alamat"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  Alamat
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Alamat lengkap usaha"
                  className={`min-h-[80px] ${inputClass} resize-none`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Controller
              name="whatsapp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Nomor WhatsApp
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="08xxxxxxxxxx"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="tanggalMulai"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tanggalMulai" className={labelClass}>
                    Tanggal Mulai Usaha
                  </FieldLabel>
                  <Input
                    id="tanggalMulai"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {categories.length > 0 && (
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className={labelClass}>
                    Kategori (Opsional)
                  </FieldLabel>
                  <Select
                    value={field.value || "__none__"}
                    onValueChange={(v) =>
                      field.onChange(v === "__none__" ? "" : v)
                    }
                  >
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="h-10 border-0 border-b border-[#D5D0CA] bg-transparent text-sm text-[#1A1A1A] focus:ring-0"
                    >
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">Tanpa Kategori</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}
        </div>
      ),
    },
    {
      title: "Platform Digital & Sosial Media",
      description: "Tambahkan tautan sosial media dan marketplace",
      content: (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start">
              <Controller
                name={`socialLinks.${index}.platform`}
                control={form.control}
                render={({ field: selectField, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="w-[160px] shrink-0"
                  >
                    <Select
                      value={selectField.value}
                      onValueChange={selectField.onChange}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="h-10 border-0 border-b border-[#D5D0CA] bg-transparent text-sm text-[#1A1A1A] focus:ring-0"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PLATFORM_LABELS).map(
                          ([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <Controller
                name={`socialLinks.${index}.url`}
                control={form.control}
                render={({ field: inputField, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <Input
                      {...inputField}
                      aria-invalid={fieldState.invalid}
                      placeholder={
                        PLATFORM_PLACEHOLDERS[
                          form.watch(`socialLinks.${index}.platform`)
                        ] || "https://..."
                      }
                      className={inputClass}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="h-10 w-10 shrink-0 text-[#6B6B6B] hover:text-[#1A1A1A]"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => append({ platform: "instagram", url: "" })}
            disabled={fields.length >= 10}
            className="gap-1.5 text-[#6B6B6B] hover:text-[#1A1A1A]"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Link
          </Button>

          {form.formState.errors.socialLinks?.message && (
            <p className="text-sm text-[#D94F4F]">
              {form.formState.errors.socialLinks.message}
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Gambar Usaha",
      description: `Upload foto usaha Anda (maks. 5 gambar)`,
      content: (
        <div className="space-y-3">
          <Label className={labelClass}>Gambar Usaha (Maks. 5)</Label>
          <Controller
            name="images"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  maxImages={5}
                  thumbnailIndex={form.watch("thumbnailIndex")}
                  onThumbnailChange={(index) => form.setValue("thumbnailIndex", index, { shouldValidate: true })}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      ),
    },
  ];

  return (
    <StepperForm
      steps={steps}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      isSubmitting={isSubmitting}
      onCancel={() => router.back()}
    />
  );
}
