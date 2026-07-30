"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { SearchInput } from "@/components/search-input";
import { SortDropdown, type SortOption } from "@/components/sort-dropdown";

const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "name_asc", label: "Nama A-Z" },
  { value: "name_desc", label: "Nama Z-A" },
];

interface AdminSearchSortProps {
  currentSearch: string;
  currentSort: string;
  currentCategory: string;
  categoryDropdown?: React.ReactNode;
}

export function AdminSearchSort({
  currentSearch,
  currentSort,
  currentCategory,
  categoryDropdown,
}: AdminSearchSortProps) {
  const router = useRouter();

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams();
      if (value) params.set("q", value);
      if (currentCategory) params.set("category", currentCategory);
      if (currentSort) params.set("sort", currentSort);
      router.push(`/umkm?${params.toString()}`);
    },
    [currentCategory, currentSort, router]
  );

  const handleSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams();
      if (currentSearch) params.set("q", currentSearch);
      if (currentCategory) params.set("category", currentCategory);
      params.set("sort", value);
      router.push(`/umkm?${params.toString()}`);
    },
    [currentSearch, currentCategory, router]
  );

  return (
    <div className="mb-6 flex items-center gap-3">
      <SearchInput
        value={currentSearch}
        onChange={handleSearch}
        placeholder="Cari UMKM..."
        className="flex-1"
      />
      {categoryDropdown}
      <SortDropdown
        options={SORT_OPTIONS}
        value={currentSort}
        onChange={handleSort}
      />
    </div>
  );
}
