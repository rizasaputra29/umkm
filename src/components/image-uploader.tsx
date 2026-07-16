"use client";

import { ImagePlus, X, Loader2, Check } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { toast } from "sonner";

interface Image {
  publicId: string;
  url: string;
}

interface ImageUploaderProps {
  value: Image[];
  onChange: (images: Image[]) => void;
  maxImages?: number;
  thumbnailIndex?: number;
  onThumbnailChange?: (index: number) => void;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default";

export function ImageUploader({
  value,
  onChange,
  maxImages = 5,
  thumbnailIndex = 0,
  onThumbnailChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

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
      onChange([...value, { publicId: data.public_id, url: data.secure_url }]);
    } catch {
      toast.error(`Gagal mengupload ${file.name}`);
    } finally {
      setUploading((prev) => prev.filter((id) => id !== tempId));
    }
  }, [value, onChange]);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const remaining = maxImages - value.length - uploading.length;
    const toUpload = Array.from(files).slice(0, remaining);
    if (toUpload.length === 0) {
      toast.error(`Maksimal ${maxImages} gambar`);
      return;
    }
    await Promise.all(toUpload.map(uploadToCloudinary));
  }, [value.length, uploading.length, maxImages, uploadToCloudinary]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = "";
  }, [handleFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = useCallback((index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
    if (onThumbnailChange) {
      if (thumbnailIndex >= newImages.length) {
        onThumbnailChange(Math.max(0, newImages.length - 1));
      } else if (thumbnailIndex === index) {
        onThumbnailChange(0);
      } else if (thumbnailIndex > index) {
        onThumbnailChange(thumbnailIndex - 1);
      }
    }
  }, [value, onChange, thumbnailIndex, onThumbnailChange]);

  return (
    <div className="space-y-4">
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
          <ImagePlus className="h-4 w-4" />
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

      {(value.length > 0 || uploading.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {value.map((image, index) => (
            <div
              key={image.publicId}
              className={`relative aspect-square rounded-lg overflow-hidden bg-[#EDEAE6] group border cursor-pointer ${
                onThumbnailChange && thumbnailIndex === index
                  ? "border-2 border-[#C8603D]"
                  : "border border-[#E5E2DD]"
              }`}
              onClick={() => onThumbnailChange?.(index)}
            >
              <img
                src={image.url}
                alt={`Gambar ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {onThumbnailChange && thumbnailIndex === index && (
                <div className="absolute bottom-1.5 left-1.5 bg-[#C8603D] text-white rounded-md px-1.5 py-0.5 text-[10px] font-medium flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Thumbnail
                </div>
              )}
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
        {value.length}/{maxImages} gambar diupload
        {uploading.length > 0 && ` (${uploading.length} mengupload...)`}
      </p>
    </div>
  );
}
