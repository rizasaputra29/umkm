import { prisma } from "@/lib/db";
import { Store, Image, Link2 } from "lucide-react";

export default async function AdminPage() {
  const [umkmCount, totalImages, totalLinks] = await Promise.all([
    prisma.umkm.count(),
    prisma.umkmImage.count(),
    prisma.socialLink.count(),
  ]);

  const stats = [
    { title: "Total UMKM", value: umkmCount, icon: Store },
    { title: "Total Gambar", value: totalImages, icon: Image },
    { title: "Total Tautan", value: totalLinks, icon: Link2 },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-[12px] border border-border/50 bg-card p-6"
        >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground">
                {stat.title}
              </p>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-medium text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
