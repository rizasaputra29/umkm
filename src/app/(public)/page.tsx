import { getActiveBanners } from "@/actions/banner";
import { getAllTestimonials } from "@/actions/testimonial";
import { getAllUmkm } from "@/actions/umkm";
import { getAllCategories } from "@/actions/category";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FullScreenHero } from "@/components/full-screen-hero";
import { UmkmCatalogSection } from "@/components/umkm-catalog-section";
import { TestimonialSection } from "@/components/testimonial-section";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.q || "";
  const categoryId = params.category || "";

  const [banners, { data: umkmList, totalPages }, categories, testimonials] =
    await Promise.all([
      getActiveBanners(),
      getAllUmkm(page, search, categoryId),
      getAllCategories(),
      getAllTestimonials(),
    ]);

  return (
    <>
      <Navbar />
      <main>
        <FullScreenHero banners={banners} />
        <UmkmCatalogSection
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          umkmList={umkmList}
          totalPages={totalPages}
          currentPage={page}
          currentCategory={categoryId}
          currentSearch={search}
        />
        <TestimonialSection testimonials={testimonials} />
      </main>
      <Footer />
    </>
  );
}
