"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Store, Tags, MessageCircle, CheckCircle } from "lucide-react";
import { PageContainer } from "./page-container";
import { ScrollReveal } from "./scroll-reveal";

interface StatCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

function StatCard({ value, label, icon, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center gap-6 rounded-[12px] border border-border/50 bg-card p-8 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div className="font-display text-4xl font-normal tracking-[-0.04em] text-foreground md:text-5xl">
        {isInView ? value : 0}
      </div>
      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}

interface MetricsSectionProps {
  totalUmkm: number;
  totalActiveUmkm: number;
  totalCategories: number;
  totalTestimonials: number;
  sectionTitle: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
}

export function MetricsSection({
  totalUmkm,
  totalActiveUmkm,
  totalCategories,
  totalTestimonials,
  sectionTitle,
  label1,
  label2,
  label3,
  label4,
}: MetricsSectionProps) {
  const stats = [
    {
      value: totalUmkm,
      label: label1,
      icon: <Store className="h-5 w-5" />,
    },
    {
      value: totalActiveUmkm,
      label: label2,
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      value: totalCategories,
      label: label3,
      icon: <Tags className="h-5 w-5" />,
    },
    {
      value: totalTestimonials,
      label: label4,
      icon: <MessageCircle className="h-5 w-5" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <PageContainer>
        <ScrollReveal y={25} className="mb-16 text-center">
          <h2
            className="font-display font-normal tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.5rem)" }}
          >
            {sectionTitle}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
