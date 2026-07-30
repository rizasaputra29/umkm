"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function getAllBanners() {
  await requireAdmin();
  return prisma.heroBanner.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getActiveBanners() {
  return prisma.heroBanner.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
}

export async function getBannerById(id: string) {
  await requireAdmin();
  const banner = await prisma.heroBanner.findUnique({
    where: { id },
  });
  if (!banner) throw new Error("Banner tidak ditemukan");
  return banner;
}

export async function createBanner(data: {
  image: string;
  mobileImage?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  active?: boolean;
  order?: number;
}) {
  await requireAdmin();
  const banner = await prisma.heroBanner.create({
    data,
  });
  revalidatePath("/");
  revalidatePath("/banners");
  return banner;
}

export async function updateBanner(
  id: string,
  data: {
    image: string;
    mobileImage?: string;
    title?: string;
    subtitle?: string;
    link?: string;
    active?: boolean;
    order?: number;
  }
) {
  await requireAdmin();
  const banner = await prisma.heroBanner.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/banners");
  return banner;
}

export async function deleteBanner(id: string) {
  await requireAdmin();
  await prisma.heroBanner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/banners");
}
