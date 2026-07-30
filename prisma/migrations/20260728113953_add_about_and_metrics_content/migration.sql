-- CreateTable
CREATE TABLE "about_content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "paragraph1" TEXT NOT NULL,
    "paragraph2" TEXT NOT NULL,
    "ctaText" TEXT NOT NULL DEFAULT 'Jelajahi UMKM',
    "ctaLink" TEXT NOT NULL DEFAULT '#umkm',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metrics_content" (
    "id" TEXT NOT NULL,
    "sectionTitle" TEXT NOT NULL,
    "label1" TEXT NOT NULL,
    "label2" TEXT NOT NULL,
    "label3" TEXT NOT NULL,
    "label4" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metrics_content_pkey" PRIMARY KEY ("id")
);
