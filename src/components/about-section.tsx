"use client";

import { PageContainer } from "./page-container";
import { ScrollReveal } from "./scroll-reveal";

interface AboutSectionProps {
  title: string;
  paragraph1: string;
  paragraph2: string;
}

export function AboutSection({
  title,
  paragraph1,
  paragraph2,
}: AboutSectionProps) {
  return (
    <section className="py-28 md:py-36 bg-background">
      <PageContainer>
        <ScrollReveal y={25} className="text-center">
          <h2
            className="mx-auto font-display font-normal tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2vw, 2.5rem)" }}
          >
            {title}
          </h2>
        </ScrollReveal>

        <ScrollReveal y={30} delay={0.15}>
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg tracking-[-0.01em]">
              {paragraph1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg tracking-[-0.01em]">
              {paragraph2}
            </p>
          </div>
        </ScrollReveal>


      </PageContainer>
    </section>
  );
}
