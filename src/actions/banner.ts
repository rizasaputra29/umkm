"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAllBanners() {
  return prisma.heroBanner.findMany({
    include: { images: { orderBy: { urutan: "asc" } } },
    orderBy: { order: "asc" },
  });
}

export async function getActiveBanners() {
  return prisma.heroBanner.findMany({
    where: { active: true },
    include: { images: { orderBy: { urutan: "asc" } } },
    orderBy: { order: "asc" },
  });
}

export async function getBannerById(id: string) {
  const banner = await prisma.heroBanner.findUnique({
    where: { id },
    include: { images: { orderBy: { urutan: "asc" } } },
  });
  if (!banner) throw new Error("Banner tidak ditemukan");
  return banner;
}

export async function createBanner(data: {
  images: { publicId: string; url: string }[];
  thumbnailIndex: number;
  title?: string;
  subtitle?: string;
  link?: string;
  active?: boolean;
  order?: number;
}) {
  const { images, thumbnailIndex, ...rest } = data;
  const banner = await prisma.heroBanner.create({
    data: {
      ...rest,
      thumbnailIndex,
      images: {
        create: images.map((img, i) => ({
          publicId: img.publicId,
          url: img.url,
          urutan: i,
        })),
      },
    },
    include: { images: true },
  });
  revalidatePath("/");
  revalidatePath("/banners");
  return banner;
}

export async function updateBanner(
  id: string,
  data: {
    images: { publicId: string; url: string }[];
    thumbnailIndex: number;
    title?: string;
    subtitle?: string;
    link?: string;
    active?: boolean;
    order?: number;
  }
) {
  const { images, thumbnailIndex, ...rest } = data;
  const banner = await prisma.heroBanner.update({
    where: { id },
    data: {
      ...rest,
      thumbnailIndex,
      images: {
        deleteMany: {},
        create: images.map((img, i) => ({
          publicId: img.publicId,
          url: img.url,
          urutan: i,
        })),
      },
    },
    include: { images: true },
  });
  revalidatePath("/");
  revalidatePath("/banners");
  return banner;
}

export async function deleteBanner(id: string) {
  await prisma.heroBanner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/banners");
}
