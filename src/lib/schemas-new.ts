import { z } from "zod";

export const testimonialSchema = z.object({
  quote: z.string().min(5, "Quote minimal 5 karakter"),
  author: z.string().min(2, "Nama author minimal 2 karakter"),
  role: z.string().optional(),
  avatar: z.string().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export const bannerSchema = z.object({
  image: z.string().url("Gambar banner wajib diupload"),
  mobileImage: z.string().url().optional().or(z.literal("")).default(""),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  link: z.string().optional(),
  active: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
});

export type BannerFormValues = z.infer<typeof bannerSchema>;

export const aboutContentSchema = z.object({
  title: z.string().min(2, "Judul minimal 2 karakter"),
  paragraph1: z.string().min(5, "Paragraf 1 minimal 5 karakter"),
  paragraph2: z.string().min(5, "Paragraf 2 minimal 5 karakter"),
  ctaText: z.string().min(2, "Teks tombol minimal 2 karakter"),
  ctaLink: z.string().min(1, "Link tombol wajib diisi"),
});

export type AboutContentFormValues = z.infer<typeof aboutContentSchema>;

export const metricsContentSchema = z.object({
  sectionTitle: z.string().min(2, "Judul section minimal 2 karakter"),
  label1: z.string().min(1, "Label 1 wajib diisi"),
  label2: z.string().min(1, "Label 2 wajib diisi"),
  label3: z.string().min(1, "Label 3 wajib diisi"),
  label4: z.string().min(1, "Label 4 wajib diisi"),
});

export type MetricsContentFormValues = z.infer<typeof metricsContentSchema>;
