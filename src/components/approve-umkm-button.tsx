"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { approveUmkm } from "@/actions/umkm";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";

interface ApproveUmkmButtonProps {
  id: string;
}

export function ApproveUmkmButton({ id }: ApproveUmkmButtonProps) {
  const [pending, startTransition] = useTransition();

  function handleApprove() {
    startTransition(async () => {
      try {
        await approveUmkm(id);
        toast.success("UMKM berhasil disetujui");
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Gagal menyetujui UMKM");
      }
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleApprove}
      disabled={pending}
      className="gap-1.5 text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Check className="h-3.5 w-3.5" />
      )}
      Setujui
    </Button>
  );
}
