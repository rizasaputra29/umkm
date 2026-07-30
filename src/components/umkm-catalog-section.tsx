"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MinimalPagination } from "./minimal-pagination";
import { PageContainer } from "./page-container";

interface Category {
  id: string;
  name: string;
}

interface UmkmImage {
  id: string;
  url: string;
}

interface Umkm {
  id: string;
  namaUsaha: string;
  alamat: string;
  thumbnailIndex: number;
  images: UmkmImage[];
  categoryId: string | null;
}

interface UmkmCatalogSectionProps {
  categories: Category[];
  umkmList: Umkm[];
  totalPages: number;
  currentPage: number;
  currentCategory: string;
  currentSearch: string;
}

export function UmkmCatalogSection({
  categories,
  umkmList,
  totalPages,
  currentPage,
  currentCategory,
  currentSearch,
}: UmkmCatalogSectionProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (currentCategory) params.set("category", currentCategory);
      router.push(`/?${params.toString()}`);
    },
    [search, currentCategory, router]
  );

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (categoryId) params.set("category", categoryId);
      router.push(`/?${params.toString()}`);
    },
    [search, router]
  );

  const clearSearch = useCallback(() => {
    setSearch("");
    const params = new URLSearchParams();
    if (currentCategory) params.set("category", currentCategory);
    router.push(`/?${params.toString()}`);
  }, [currentCategory, router]);

  return (
    <section id="umkm" className="py-16 md:py-24 bg-[#F5F3F0]">
      <PageContainer>
        {/* Header with title and search */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] block mb-3">
              Jelajahi
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-[#1A1A1A]">
              UMKM Lokal
            </h2>
          </div>

          <form onSubmit={handleSearch} className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari UMKM..."
              className="w-full pl-11 pr-10 py-3 bg-white rounded-full border border-[#E5E2DD] text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#D5D0CA] transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#EDEAE6] hover:bg-[#E5E2DD] transition-colors"
              >
                <X className="h-3 w-3 text-[#6B6B6B]" />
              </button>
            )}
          </form>
        </div>

        {/* Category filter tabs */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 hide-scrollbar">
            <button
              onClick={() => handleCategoryChange("")}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                !currentCategory
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white text-[#6B6B6B] border border-[#E5E2DD] hover:border-[#D5D0CA]"
              )}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                  currentCategory === cat.id
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-white text-[#6B6B6B] border border-[#E5E2DD] hover:border-[#D5D0CA]"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* UMKM grid */}
        {umkmList.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#6B6B6B]">
              {currentSearch
                ? `Tidak ada UMKM yang ditemukan untuk "${currentSearch}"`
                : currentCategory
                  ? "Tidak ada UMKM dalam kategori ini"
                  : "Belum ada UMKM yang terdaftar"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {umkmList.map((umkm, index) => (
              <motion.div
                key={umkm.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href={`/umkm/${umkm.id}`}
                  className="group block overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#EDEAE6]">
                    {umkm.images[umkm.thumbnailIndex]?.url || umkm.images[0]?.url ? (
                      <img
                        src={umkm.images[umkm.thumbnailIndex]?.url || umkm.images[0]?.url}
                        alt={umkm.namaUsaha}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-5xl font-light text-[#D5D0CA]">
                          {umkm.namaUsaha.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-medium text-[#1A1A1A] line-clamp-1">
                      {umkm.namaUsaha}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-[#6B6B6B]">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{umkm.alamat}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <MinimalPagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/"
            />
          </div>
        )}
      </PageContainer>
    </section>
  );
}
