import { getAllTestimonials } from "@/actions/testimonial";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteTestimonialButton } from "./delete-testimonial-button";

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-normal tracking-tight text-foreground">
          Testimonials
        </h1>
        <Link href="/testimonials/new">
          <Button variant="default" className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Testimonial
          </Button>
        </Link>
      </div>

      <div className="rounded-[12px] border border-border/50 bg-card p-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Quote
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Author
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Role
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                  Belum ada testimonial
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((t) => (
                <TableRow key={t.id} className="hover:bg-muted/50">
                  <TableCell className="max-w-xs truncate text-sm text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {t.author}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {t.role || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/testimonials/${t.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <DeleteTestimonialButton id={t.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
