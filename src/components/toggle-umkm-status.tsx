"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleUmkmStatus } from "@/actions/umkm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ToggleUmkmStatus({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await toggleUmkmStatus(id);
      toast.success(isActive ? "UMKM ditandai libur" : "UMKM ditandai aktif");
      router.refresh();
    } catch {
      toast.error("Gagal mengubah status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
      className={`h-7 min-w-[70px] text-[11px] font-medium tracking-wider ${
        isActive
          ? "text-green-600 hover:text-green-700"
          : "text-amber-600 hover:text-amber-700"
      }`}
    >
      {loading ? "..." : isActive ? "Aktif" : "Libur"}
    </Button>
  );
}
