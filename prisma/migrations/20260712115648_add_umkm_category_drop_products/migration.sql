/*
  Warnings:

  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "umkm" ADD COLUMN     "category_id" TEXT;

-- DropTable
DROP TABLE "product_images";

-- DropTable
DROP TABLE "products";

-- CreateIndex
CREATE INDEX "umkm_category_id_idx" ON "umkm"("category_id");

-- AddForeignKey
ALTER TABLE "umkm" ADD CONSTRAINT "umkm_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
