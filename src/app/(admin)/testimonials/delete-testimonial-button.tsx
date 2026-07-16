"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { deleteTestimonial } from "@/actions/testimonial";
import { toast } from "sonner";

export function DeleteTestimonialButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial berhasil dihapus");
      router.refresh();
    } catch {
      toast.error("Gagal menghapus testimonial");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 text-[#D94F4F] hover:text-[#D94F4F] hover:bg-red-50" />}>
        <Trash2 className="h-3.5 w-3.5" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-[#E5E2DD]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#1A1A1A]">
            Hapus Testimonial
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#6B6B6B]">
            Apakah Anda yakin ingin menghapus testimonial ini? Tindakan ini
            tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#E5E2DD] text-[#6B6B6B]">
            Batal
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-[#D94F4F] text-white hover:bg-[#c44545]"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
