import { z } from "zod";

export const testimonialSchema = z.object({
  quote: z.string().min(5, "Quote minimal 5 karakter"),
  author: z.string().min(2, "Nama author minimal 2 karakter"),
  role: z.string().optional(),
  avatar: z.string().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const bannerImageSchema = z.object({
  publicId: z.string(),
  url: z.string().url(),
});

export const bannerSchema = z.object({
  images: z.array(bannerImageSchema).min(1, "Minimal 1 gambar"),
  thumbnailIndex: z.coerce.number().int().min(0).default(0),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  link: z.string().optional(),
  active: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
});

export type BannerImageFormValues = z.infer<typeof bannerImageSchema>;
export type BannerFormValues = z.infer<typeof bannerSchema>;
