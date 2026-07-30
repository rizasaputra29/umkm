<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:seeder-images -->
# Seeder image source

All seeder images in `prisma/seed.ts` come from **picsum.photos**, a real-photo placeholder service (powered by Unsplash).

- **Banners** (`prisma/seed.ts:703-731`): `https://picsum.photos/seed/{seed}/1920/1080` (desktop), `/768/1024` (mobile)
- **UMKM images** (`prisma/seed.ts:733-1044`): `https://picsum.photos/seed/{publicId-slug}/800/600`
- **Seed determinism**: same seed → same photo every time
- **No local image files** — all URLs are hardcoded strings.
<!-- END:seeder-images -->
