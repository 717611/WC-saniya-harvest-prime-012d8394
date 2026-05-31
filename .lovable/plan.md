
## Goal
Redesign `src/routes/products.tsx` into a premium mobile-first shopping experience. All work isolated to this single route file plus two new image assets.

## New assets
- `src/assets/products-hero-banner.jpg` — copied from `IMG_20260531_213811.png`
- `src/assets/eco-root-promo.jpg` — copied from `file_0000000090607206a1af6986bbd6ad40.png`

## Viewport & spacing rules (revised)
- Section top padding: `pt-16` on mobile (compressed from pt-20), `md:pt-24`
- Hero Header Banner: `h-[14vh] min-h-[96px]`
- Eco Root Focus Banner: `h-[10vh] min-h-[72px]`
- Category chips: `py-1 px-3 text-[11px]`
- Trust Bar: tight `flex` row of 4 columns, each `flex-col items-center text-[10px] leading-tight gap-0.5`, ~h-12
- Search bar: compact `h-10`, overlaps banner via `-mt-5`
- Target: header stack (banner + search + chips + trust + promo) < 38vh so 2nd grid row peeks above fold on standard mobile

## Page structure (top-down)

1. **Hero Header Banner** — `<img>` of `products-hero-banner.jpg`, `w-full h-[14vh] min-h-[96px] object-cover rounded-2xl`.
2. **Glassmorphic Floating Search** — `-mt-5 mx-3 backdrop-blur-md bg-white/80 border border-white/60 shadow-elegant rounded-full h-10`, lucide Search icon left, integrated gradient filter button right. Wired to `query` state filtering by name/tagline.
3. **Category Chips** — horizontal scroll. Options: All, Fertilizers, Manures, Seeds, Phosphorus, Best Sellers. `py-1 px-3 text-[11px]`. Active = `bg-forest-gradient text-primary-foreground`.
4. **Trust Bar** — 4 columns (Truck/Leaf/Users/Award + micro-copy: Pan India Delivery, 100% Organic, Farmer Trusted, Premium Quality). `text-[10px] leading-tight`, no card chrome.
5. **Eco Root Focus Banner** — `<img>` of `eco-root-promo.jpg` inside `rounded-2xl overflow-hidden h-[10vh] min-h-[72px] object-cover`. Wrapped in `<a href="tel:+918852003393">`.
6. **Product Grid** — 2-col mobile / 3 md / 4 lg. `aspect-square` image well, `p-2.5`. Heart bookmark top-right (local toggle state). Gold "Best Seller" pill on Eco Root. Bold price line + category sub-label. Floating gradient `+` button bottom-right replaces full-width CTA.

## Helmet
Keep existing `<Helmet>` unchanged.

## Safety
- Only `src/routes/products.tsx` edited; 2 new assets added
- No dep / router / vite / package.json changes
- Standard Tailwind v4 utilities only

## Files touched
- `src/routes/products.tsx`
- `src/assets/products-hero-banner.jpg` (new)
- `src/assets/eco-root-promo.jpg` (new)
