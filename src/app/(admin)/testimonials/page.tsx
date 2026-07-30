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
        <h1 className="text-2xl font-medium tracking-tight text-[#1A1A1A]">
          Testimonials
        </h1>
        <Link href="/testimonials/new">
          <Button variant="coffee" className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Testimonial
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-[#E5E2DD] bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                Quote
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                Author
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                Role
              </TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.15em] text-[#6B6B6B] text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-[#6B6B6B]">
                  Belum ada testimonial
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="max-w-xs truncate text-sm text-[#1A1A1A]">
                    &ldquo;{t.quote}&rdquo;
                  </TableCell>
                  <TableCell className="text-sm text-[#1A1A1A]">
                    {t.author}
                  </TableCell>
                  <TableCell className="text-sm text-[#6B6B6B]">
                    {t.role || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/testimonials/${t.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#6B6B6B] hover:text-[#1A1A1A]"
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
