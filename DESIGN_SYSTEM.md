# UMKM Lokal — Design System

## Overview

A minimalist, whitespace-first design system inspired by the "minim" aesthetic. Clean, neutral, and product-focused with an emphasis on typography and breathing room.

---

## Typography

### Font Stack
```css
--font-sans: 'Stack Sans Text', system-ui, sans-serif;
```

Import:
```css
@import url('https://fonts.googleapis.com/css2?family=Stack+Sans+Text:wght@200..700&display=swap');
```

### Type Scale

| Level | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| Hero Title | 48–64px | 300 (light) | -0.02em | Main hero headline |
| Section Title | 24–32px | 500 | -0.01em | Section headers |
| Card Title | 14px | 500 | normal | Product names |
| Body | 16px | 400 | normal | Descriptions, content |
| Caption | 12px | 400 | normal | Metadata, prices |
| Label | 11px | 500 | 0.15–0.2em | Uppercase labels, form labels |
| Tiny | 11px | 400 | normal | Footer links, pagination |

---

## Colors

### Light Mode

| Token | Value | Usage |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#1a1a1a` | Primary text |
| `--card` | `#ffffff` | Card backgrounds |
| `--muted` | `#f5f5f5` | Surface backgrounds, hover states |
| `--muted-foreground` | `#737373` | Secondary text, labels |
| `--border` | `#e5e5e5` | Borders, dividers |
| `--primary` | `#1a1a1a` | Buttons, links |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `#f5f5f5` | Secondary buttons |
| `--destructive` | `#ef4444` | Error states, delete actions |

### Dark Mode

| Token | Value |
|---|---|
| `--background` | `#0a0a0a` |
| `--foreground` | `#fafafa` |
| `--card` | `#171717` |
| `--muted` | `#262626` |
| `--border` | `#262626` |
| `--primary` | `#fafafa` |

---

## Spacing

| Token | Value | Usage |
|---|---|---|
| Section gap | 80–120px | Between major page sections |
| Grid gap | 24px | Between product cards |
| Card padding | 16px | Inside cards |
| Page padding | 24px (mobile), 48px (desktop), 64px (wide) | Container sides |
| Component gap | 8–12px | Between related elements |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | 0.75rem (12px) | Cards, containers |
| Small | 0.375rem (6px) | Buttons, inputs, badges |
| Full | 9999px | Avatars, status dots |

---

## Shadows

Shadows are minimal and subtle:

| State | Value |
|---|---|
| Default | `none` |
| Card hover | `0 4px 20px rgba(0,0,0,0.06)` |
| Focus ring | `0 0 0 1px var(--ring)` |

---

## Component Breakdown

### Reusable Layout Components

#### `PageContainer`
Max-width wrapper for consistent page layout.

```tsx
<PageContainer as="main" className="py-16">
  {children}
</PageContainer>
```

- Max width: `1280px`
- Padding: `24px` → `48px` → `64px` (responsive)
- Element: `div`, `main`, or `section`

---

#### `SectionHeader`
Centered section title with optional label and description.

```tsx
<SectionHeader
  label="UMKM Terbaru"
  title="Jelajahi UMKM Lokal"
  description="Temukan usaha lokal terbaik di sekitar Anda"
/>
```

- Label: 11px uppercase, tracking 0.2em, muted color
- Title: 24–32px, font-medium
- Bottom margin: 48–64px

---

#### `ProductGrid`
Grid wrapper with optional light gray background.

```tsx
<ProductGrid withBackground={true}>
  <ProductCard ... />
  <ProductCard ... />
</ProductGrid>
```

- Grid: 1 col → 2 → 3 → 4 (responsive)
- Gap: 24px
- Background: `#f5f5f5` (when `withBackground={true}`)
- Internal padding: 64–96px vertical

---

#### `MinimalPagination`
Text-based pagination links.

```tsx
<MinimalPagination
  currentPage={1}
  totalPages={5}
  basePath="/"
/>
```

- Active page: bottom border underline
- Inactive: muted color, hover to foreground
- Arrow links for prev/next

---

### Navigation Components

#### `Navbar`
Minimal top navigation bar.

```tsx
<Navbar />
```

- Height: 64px
- Background: white with subtle border-bottom
- Left: "UMKM Lokal" wordmark (font-medium)
- Right: search icon, mobile menu toggle
- Sticky: `top-0`

---

#### `Footer`
Three-column minimal footer.

```tsx
<Footer />
```

- Left: Logo + copyright
- Center: Newsletter input (underline style)
- Right: Navigation links
- Border-top: 1px solid var(--border)

---

### Content Components

#### `HeroSection`
Full-width hero with abstract background visual.

```tsx
<HeroSection />
```

- Full viewport height (70vh mobile, 80vh desktop)
- Abstract background: CSS gradient circles + grid pattern
- Centered content: label → title → subtitle → search bar → stats
- Search: underline input with arrow submit

---

#### `ProductCard`
Image-first product card.

```tsx
<ProductCard
  href="/umkm/123"
  image="https://..."
  title="Warung Mak Juhri"
  location="Jakarta Selatan"
/>
```

- Image: aspect-[4/3], rounded top
- Title: 14px font-medium
- Location: 12px muted with MapPin icon
- Hover: translateY(-4px) + subtle shadow
- No badges, no prices

---

#### `TestimonialCard`
Quote card for testimonials.

```tsx
<TestimonialCard
  quote="UMKM Lokal membantu saya..."
  author="Rina Wijaya"
  role="Pecinta Kerajinan Lokal"
/>
```

- Quote: 16–18px, slightly muted color
- Author: 14px font-medium
- Decorative line separator

---

#### `TestimonialSection`
Horizontal testimonial section.

```tsx
<TestimonialSection />
```

- Uses SectionHeader with "Testimoni" label
- 3-column grid on desktop
- Pre-defined sample testimonials

---

### Form Components

#### Input (Minimal Variant)
Bottom-border only input style.

```tsx
<Input className="h-10 border-0 border-b border-input bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:border-foreground" />
```

- No box border, only bottom line
- Transparent background
- Focus: bottom border changes to foreground

---

#### Button
Standard button with minimal variants.

```tsx
<Button variant="ghost">Action</Button>
<Button variant="outline">Action</Button>
```

- Default: solid dark background
- Ghost: transparent, hover shows muted bg
- Outline: border only

---

### Admin Components

#### Admin Layout
Minimal sidebar layout.

- Sidebar width: 224px
- No background color (white)
- Active item: muted background
- Border-right separator

---

#### Dashboard Stats
Minimal stat cards.

```tsx
<div className="rounded-xl border border-border bg-card p-6">
  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Total UMKM</p>
  <p className="text-3xl font-medium">500</p>
</div>
```

---

#### Data Table
Clean table with minimal styling.

- No outer container border
- Header: 11px uppercase labels
- Row separator: 1px border
- Hover: subtle muted background

---

## Design Principles

1. **Whitespace is content** — Give elements room to breathe
2. **Typography drives hierarchy** — Use size and weight, not color
3. **Subtle interactions** — Hover states should be gentle (4px lift, light shadow)
4. **No decorative elements** — Remove anything that doesn't serve a purpose
5. **Consistent spacing** — Use 8px increments (8, 16, 24, 32, 48, 64, 96)
6. **Neutral palette** — Stick to whites, grays, and charcoal
7. **Image-first cards** — Let product images speak, keep metadata minimal

---

## File Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens & base styles
│   ├── layout.tsx           # Root layout with font
│   ├── (public)/
│   │   ├── page.tsx         # Homepage with hero + grid
│   │   └── umkm/[id]/       # Detail page
│   ├── (admin)/
│   │   ├── layout.tsx       # Admin sidebar layout
│   │   ├── dashboard/       # Dashboard stats
│   │   └── umkm/            # CRUD pages
│   └── (auth)/
│       ├── login/           # Minimal login form
│       └── register/        # Minimal register form
├── components/
│   ├── page-container.tsx   # Layout wrapper
│   ├── navbar.tsx           # Top navigation
│   ├── footer.tsx           # Site footer
│   ├── hero-section.tsx     # Homepage hero
│   ├── section-header.tsx   # Section titles
│   ├── product-card.tsx     # UMKM card
│   ├── product-grid.tsx     # Grid wrapper
│   ├── testimonial-card.tsx # Quote card
│   ├── testimonial-section.tsx
│   ├── minimal-pagination.tsx
│   ├── umkm-card.tsx        # Legacy (uses product-card patterns)
│   ├── umkm-form.tsx        # UMKM create/edit form
│   ├── image-uploader.tsx   # Cloudinary uploader
│   ├── delete-umkm-button.tsx
│   └── ui/                  # Base UI primitives (shadcn)
└── lib/
    ├── utils.ts             # cn() helper
    ├── schemas.ts           # Zod schemas
    └── db.ts                # Prisma client
```
