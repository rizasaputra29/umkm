"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Loader2, X, Check } from "lucide-react";
import { toast } from "sonner";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/actions/category";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { umkms: number };
}

export function CategoryModal({
  categories,
  children,
}: {
  categories: Category[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    setCreating(true);
    try {
      await createCategory({
        name: newName.trim(),
        slug: generateSlug(newName.trim()),
      });
      toast.success("Kategori berhasil ditambahkan");
      setNewName("");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Gagal menambahkan kategori");
    } finally {
      setCreating(false);
    }
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return;

    setSavingEdit(true);
    try {
      await updateCategory(id, {
        name: editName.trim(),
        slug: generateSlug(editName.trim()),
      });
      toast.success("Kategori berhasil diperbarui");
      setEditingId(null);
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Gagal memperbarui kategori");
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDelete(id: string, name: string, count: number) {
    if (count > 0) {
      toast.error(`Tidak bisa menghapus "${name}" karena masih memiliki ${count} UMKM`);
      return;
    }

    setDeletingId(id);
    try {
      await deleteCategory(id);
      toast.success("Kategori berhasil dihapus");
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus kategori");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as React.ReactElement} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Kelola Kategori</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add new category form */}
          <form onSubmit={handleCreate} className="flex gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nama kategori baru"
              className="h-9 border-border text-sm"
              disabled={creating}
            />
            <Button
              type="submit"
              variant="default"
              size="sm"
              className="gap-1.5 shrink-0"
              disabled={creating || !newName.trim()}
            >
              {creating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              Tambah
            </Button>
          </form>

          {/* Category list */}
          <div className="space-y-1 max-h-[300px] overflow-y-auto">
            {categories.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Belum ada kategori
              </p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 transition-colors group"
                >
                  {editingId === cat.id ? (
                    <>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8 flex-1 border-border text-sm"
                        disabled={savingEdit}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate(cat.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => handleUpdate(cat.id)}
                        disabled={savingEdit || !editName.trim()}
                      >
                        {savingEdit ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => setEditingId(null)}
                        disabled={savingEdit}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-normal text-foreground truncate">
                          {cat.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cat._count.umkms} UMKM
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditName(cat.name);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(cat.id, cat.name, cat._count.umkms)}
                        disabled={deletingId === cat.id}
                      >
                        {deletingId === cat.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-red-500" />
                        )}
                      </Button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
