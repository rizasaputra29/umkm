"use server";

import { prisma } from "@/lib/db";

export async function getStats() {
  const [totalUmkm, totalActiveUmkm, totalCategories, totalTestimonials] =
    await Promise.all([
      prisma.umkm.count(),
      prisma.umkm.count({ where: { isActive: true } }),
      prisma.category.count(),
      prisma.testimonial.count(),
    ]);

  return { totalUmkm, totalActiveUmkm, totalCategories, totalTestimonials };
}
