"use server";

import { prisma } from "@/lib/db";
import { umkmFormSchema, type UmkmFormValues } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function getAllUmkm(
  page = 1,
  search = "",
  categoryId = ""
) {
  const take = 12;
  const skip = (page - 1) * take;

  const where: any = {};

  if (search) {
    where.OR = [
      { namaUsaha: { contains: search, mode: "insensitive" as const } },
      { deskripsi: { contains: search, mode: "insensitive" as const } },
      { namaPemilik: { contains: search, mode: "insensitive" as const } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const [umkmList, total] = await Promise.all([
    prisma.umkm.findMany({
      where,
      include: {
        socialLinks: true,
        images: { orderBy: { urutan: "asc" } },
        category: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.umkm.count({ where }),
  ]);

  return {
    data: umkmList,
    totalPages: Math.ceil(total / take),
    currentPage: page,
  };
}

export async function getUmkmById(id: string) {
  const umkm = await prisma.umkm.findUnique({
    where: { id },
    include: {
      socialLinks: true,
      images: { orderBy: { urutan: "asc" } },
      category: true,
    },
  });

  if (!umkm) {
    throw new Error("UMKM tidak ditemukan");
  }

  return umkm;
}

export async function createUmkm(data: UmkmFormValues) {
  const validated = umkmFormSchema.parse(data);

  const umkm = await prisma.umkm.create({
    data: {
      namaUsaha: validated.namaUsaha,
      deskripsi: validated.deskripsi,
      alamat: validated.alamat,
      namaPemilik: validated.namaPemilik,
      whatsapp: validated.whatsapp,
      tanggalMulai: validated.tanggalMulai,
      thumbnailIndex: validated.thumbnailIndex,
      categoryId: validated.categoryId || null,
      socialLinks: {
        create: validated.socialLinks.map((link) => ({
          platform: link.platform,
          url: link.url,
        })),
      },
      images: {
        create: validated.images.map((img, index) => ({
          publicId: img.publicId,
          url: img.url,
          urutan: index + 1,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");

  return umkm;
}

export async function updateUmkm(id: string, data: UmkmFormValues) {
  const validated = umkmFormSchema.parse(data);

  await prisma.socialLink.deleteMany({ where: { umkmId: id } });
  await prisma.umkmImage.deleteMany({ where: { umkmId: id } });

  const umkm = await prisma.umkm.update({
    where: { id },
    data: {
      namaUsaha: validated.namaUsaha,
      deskripsi: validated.deskripsi,
      alamat: validated.alamat,
      namaPemilik: validated.namaPemilik,
      whatsapp: validated.whatsapp,
      tanggalMulai: validated.tanggalMulai,
      thumbnailIndex: validated.thumbnailIndex,
      categoryId: validated.categoryId || null,
      socialLinks: {
        create: validated.socialLinks.map((link) => ({
          platform: link.platform,
          url: link.url,
        })),
      },
      images: {
        create: validated.images.map((img, index) => ({
          publicId: img.publicId,
          url: img.url,
          urutan: index + 1,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath(`/umkm/${id}`);
  revalidatePath("/dashboard");

  return umkm;
}

export async function getRandomUmkm(count = 4, excludeId?: string) {
  const all = await prisma.umkm.findMany({
    where: excludeId ? { id: { not: excludeId } } : {},
    include: {
      images: { orderBy: { urutan: "asc" }, take: 1 },
    },
  });

  const shuffled = all.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function deleteUmkm(id: string) {
  await prisma.umkm.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/dashboard");
}
