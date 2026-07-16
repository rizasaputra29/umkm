"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAllTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTestimonialById(id: string) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) throw new Error("Testimonial tidak ditemukan");
  return testimonial;
}

export async function createTestimonial(data: {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}) {
  const testimonial = await prisma.testimonial.create({ data });
  revalidatePath("/");
  revalidatePath("/testimonials");
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  data: { quote: string; author: string; role?: string; avatar?: string }
) {
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/testimonials");
  return testimonial;
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/testimonials");
}
