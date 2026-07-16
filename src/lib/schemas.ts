import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.enum([
    "instagram",
    "facebook",
    "tiktok",
    "whatsapp",
    "twitter",
    "youtube",
    "shopee",
    "tokopedia",
  ]),
  url: z.string().url("URL tidak valid"),
});

export const imageSchema = z.object({
  publicId: z.string(),
  url: z.string().url(),
});

export const umkmFormSchema = z.object({
  namaUsaha: z.string().min(2, "Nama usaha minimal 2 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  alamat: z.string().min(5, "Alamat minimal 5 karakter"),
  namaPemilik: z.string().min(2, "Nama pemilik minimal 2 karakter"),
  whatsapp: z
    .string()
    .regex(
      /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
      "Nomor WhatsApp tidak valid"
    ),
  tanggalMulai: z.coerce.date(),
  categoryId: z.string().optional(),
  thumbnailIndex: z.coerce.number().int().min(0).default(0),
  socialLinks: z
    .array(socialLinkSchema)
    .min(1, "Tambahkan minimal 1 tautan sosial media"),
  images: z.array(imageSchema).max(5, "Maksimal 5 gambar"),
});

export type UmkmFormValues = z.infer<typeof umkmFormSchema>;

export const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  twitter: "Twitter/X",
  youtube: "YouTube",
  shopee: "Shopee",
  tokopedia: "Tokopedia",
};

export const PLATFORM_PLACEHOLDERS: Record<string, string> = {
  instagram: "https://instagram.com/username",
  facebook: "https://facebook.com/page",
  tiktok: "https://tiktok.com/@username",
  whatsapp: "https://wa.me/628xxxxxxxxxx",
  twitter: "https://twitter.com/username",
  youtube: "https://youtube.com/@channel",
  shopee: "https://shopee.co.id/shop",
  tokopedia: "https://tokopedia.com/shop",
};

// Category schema
export const categoryFormSchema = z.object({
  name: z.string().min(2, "Nama kategori minimal 2 karakter"),
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan dash"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
