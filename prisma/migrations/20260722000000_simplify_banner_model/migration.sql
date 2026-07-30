-- AlterTable: Add image and mobile_image columns (nullable temporarily)
ALTER TABLE "hero_banners" ADD COLUMN "image" TEXT,
ADD COLUMN "mobile_image" TEXT;

-- Copy image data from banner_images into hero_banners.image
-- Uses the image at thumbnail_index position, or falls back to the first image
UPDATE "hero_banners" hb
SET "image" = bi.url
FROM "banner_images" bi
WHERE bi."banner_id" = hb.id
AND bi."urutan" = hb."thumbnail_index";

-- Fallback: if thumbnail_index didn't match, use the first image (lowest urutan)
UPDATE "hero_banners" hb
SET "image" = bi.url
FROM "banner_images" bi
WHERE bi."banner_id" = hb.id
AND hb."image" IS NULL
AND bi."urutan" = (
  SELECT MIN(bi2."urutan")
  FROM "banner_images" bi2
  WHERE bi2."banner_id" = hb.id
);

-- Make image NOT NULL now that data is populated
ALTER TABLE "hero_banners" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable: Drop thumbnail_index
ALTER TABLE "hero_banners" DROP COLUMN "thumbnail_index";

-- DropTable: Drop banner_images
DROP TABLE "banner_images";
