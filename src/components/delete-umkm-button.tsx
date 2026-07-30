"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUmkm } from "@/actions/umkm";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteUmkmButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteUmkm(id);
      toast.success("UMKM berhasil dihapus");
      router.refresh();
    } catch {
      toast.error("Gagal menghapus UMKM");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" disabled={isDeleting} />}>
        {isDeleting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Trash2 className="h-3.5 w-3.5 text-[#6B6B6B] hover:text-[#D94F4F]" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-xl border-[#E5E2DD] bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base font-medium text-[#1A1A1A]">
            Hapus UMKM?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#6B6B6B]">
            Tindakan ini tidak dapat dibatalkan. Semua data termasuk gambar dan
            tautan sosial media akan dihapus permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm">Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-[#D94F4F] text-white hover:bg-[#D94F4F]/90 text-sm"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
