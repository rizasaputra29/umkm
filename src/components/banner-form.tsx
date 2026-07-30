"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import { bannerSchema, type BannerFormValues } from "@/lib/schemas-new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowRight, Upload, X } from "lucide-react";
import { useRef, useState, useCallback } from "react";

interface BannerFormProps {
  defaultValues?: Partial<BannerFormValues>;
  onSubmit: (data: BannerFormValues) => Promise<void>;
  submitLabel?: string;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default";
const MAX_IMAGES = 5;

export function BannerForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
}: BannerFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema) as any,
    defaultValues: {
      images: [],
      thumbnailIndex: 0,
      title: "",
      subtitle: "",
      link: "",
      active: true,
      order: 0,
      ...defaultValues,
    },
  });

  const { formState: { isSubmitting } } = form;

  async function handleSubmit(data: BannerFormValues) {
    try {
      await onSubmit(data);
      toast.success("Banner berhasil disimpan");
      router.push("/banners");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan banner");
      console.error(error);
    }
  }

  const inputClass = "h-10 border-0 border-b border-[#D5D0CA] bg-transparent px-0 text-sm text-[#1A1A1A] focus-visible:ring-0 focus-visible:border-[#1A1A1A] placeholder:text-[#6B6B6B]";
  const labelClass = "text-[11px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]";

  const images = form.watch("images");

  const uploadToCloudinary = useCallback(async (file: File) => {
    const tempId = `temp-${Date.now()}-${file.name}`;
    setUploading((prev) => [...prev, tempId]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      const current = form.getValues("images");
      form.setValue("images", [...current, { publicId: data.public_id, url: data.secure_url }], { shouldValidate: true });
    } catch {
      toast.error(`Gagal mengupload ${file.name}`);
    } finally {
      setUploading((prev) => prev.filter((id) => id !== tempId));
    }
  }, [form]);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const current = form.getValues("images");
    const remaining = MAX_IMAGES - current.length - uploading.length;
    const toUpload = Array.from(files).slice(0, remaining);
    if (toUpload.length === 0) {
      toast.error(`Maksimal ${MAX_IMAGES} gambar`);
      return;
    }
    await Promise.all(toUpload.map(uploadToCloudinary));
  }, [form, uploading.length, uploadToCloudinary]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = "";
  }, [handleFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  function removeImage(index: number) {
    const current = form.getValues("images");
    const newImages = current.filter((_, i) => i !== index);
    form.setValue("images", newImages, { shouldValidate: true });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-3">
        <label className={labelClass}>Gambar Banner</label>
        <div className="rounded-xl border border-[#E5E2DD] bg-white p-4 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 py-8 cursor-pointer transition-colors ${
              dragOver
                ? "border-[#6B6B6B] bg-[#F5F3F0]"
                : "border-[#D5D0CA] hover:border-[#6B6B6B] text-[#6B6B6B] hover:text-[#1A1A1A]"
            }`}
          >
            <div className="flex items-center gap-2 rounded-lg border border-[#D5D0CA] bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A] shadow-sm">
              <Upload className="h-4 w-4" />
              Upload
            </div>
            <span className="text-xs text-[#6B6B6B]">
              Choose images or drag & drop it here. JPG, JPEG, PNG and WEBP. Max 20 MB.
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />

          {/* Image grid */}
          {(images.length > 0 || uploading.length > 0) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {images.map((image, index) => (
                <div
                  key={image.publicId}
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#EDEAE6] group border border-[#E5E2DD]"
                >
                  <img
                    src={image.url}
                    alt={`Gambar ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-[#D94F4F] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {uploading.map((tempId) => (
                <div
                  key={tempId}
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#EDEAE6] border border-[#E5E2DD] flex items-center justify-center"
                >
                  <Loader2 className="h-5 w-5 text-[#6B6B6B] animate-spin" />
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-[#6B6B6B]">
            {images.length}/{MAX_IMAGES} gambar diupload
            {uploading.length > 0 && ` (${uploading.length} mengupload...)`}
          </p>
        </div>
        {form.formState.errors.images && (
          <p className="text-sm text-[#D94F4F]">
            {form.formState.errors.images.message}
          </p>
        )}
      </div>

      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Judul (opsional)
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Judul banner"
              className={inputClass}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="subtitle"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Subtitle (opsional)
            </FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Deskripsi singkat banner"
              className={`min-h-[60px] ${inputClass} resize-none`}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="link"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Link (opsional)
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="/umkm/xxx atau https://..."
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Urutan
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="0"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        name="active"
        control={form.control}
        render={({ field }) => (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={field.value}
              onChange={field.onChange}
              className="w-4 h-4 rounded border-[#D5D0CA] text-[#1A1A1A] focus:ring-[#1A1A1A]"
            />
            <span className="text-sm text-[#1A1A1A]">Banner aktif</span>
          </label>
        )}
      />

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="coffee" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {submitLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} className="text-[#6B6B6B] hover:text-[#1A1A1A]">
          Batal
        </Button>
      </div>
    </form>
  );
}
