/*
  Warnings:

  - Added the required column `alamat_pribadi` to the `umkm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "umkm" ADD COLUMN     "alamat_pribadi" TEXT NOT NULL DEFAULT '';
