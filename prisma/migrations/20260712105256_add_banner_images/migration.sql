/*
  Warnings:

  - You are about to drop the column `image_url` on the `hero_banners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hero_banners" DROP COLUMN "image_url",
ADD COLUMN     "thumbnail_index" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "banner_images" (
    "id" TEXT NOT NULL,
    "banner_id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banner_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "banner_images_banner_id_idx" ON "banner_images"("banner_id");

-- AddForeignKey
ALTER TABLE "banner_images" ADD CONSTRAINT "banner_images_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "hero_banners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
