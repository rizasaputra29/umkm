"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { rejectUmkm } from "@/actions/umkm";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

interface RejectUmkmButtonProps {
  id: string;
}

export function RejectUmkmButton({ id }: RejectUmkmButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [pending, startTransition] = useTransition();

  function handleReject() {
    startTransition(async () => {
      try {
        await rejectUmkm(id, reason || undefined);
        toast.success("UMKM ditolak");
        setOpen(false);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Gagal menolak UMKM");
      }
    });
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-1.5 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
      >
        <X className="h-3.5 w-3.5" />
        Tolak
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tolak UMKM</AlertDialogTitle>
            <AlertDialogDescription>
              Berikan alasan penolakan (opsional)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Alasan penolakan..."
            className="mt-2"
          />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Batal</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={pending}
              className="gap-2"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              Tolak UMKM
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
