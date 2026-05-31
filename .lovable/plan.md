## Subhero Trust Section — Replace "What We Do" on Home (Revised)

Replace `<WhatWeDo />` on `/` with a pixel-crafted "Subhero Trust" section using the two uploaded farmer photos. Other home sections and global chrome (Kisan Saathi widget, BottomNav) untouched.

### Refinements from user feedback
1. **Scrim colors → global cream theme.** Replace `stone-50` in scrims with the project's existing `--cream` token via `bg-[var(--cream)]` (and `via-[color-mix(in_oklab,var(--cream)_90%,transparent)]`). This matches the page canvas and removes any seam.
2. **Avatar stack → stylized initials, no pravatar.cc.** Render 5 circular avatars with farmer-style initials (e.g., RK, SP, MV, AY, BJ) using a rotating warm earth-tone palette: `bg-emerald-700`, `bg-amber-600`, `bg-stone-600`, `bg-yellow-700` (ochre), `bg-emerald-900`. White bold initials, `ring-2 ring-white`, overlapping `-ml-2`.

### Files

1. **Copy uploaded assets** → `src/assets/farmer-portrait-mobile.png`, `src/assets/farmer-portrait-desktop.png`.
2. **Create** `src/components/site/SubheroTrust.tsx`.
3. **Edit** `src/routes/index.tsx`: swap `WhatWeDo` import + render for `SubheroTrust`.
4. Leave `WhatWeDo.tsx` on disk (unreferenced — safe, no breakage).

### Component structure (`SubheroTrust.tsx`)

- `<section className="relative overflow-hidden py-16 md:py-24">`
  - **Background images (absolute inset-0):** desktop `hidden md:block object-cover`, mobile `md:hidden object-cover object-top`.
  - **Scrims (absolute inset-0) using cream token:**
    - Mobile: `bg-gradient-to-b from-[var(--cream)] via-[color-mix(in_oklab,var(--cream)_85%,transparent)] to-transparent md:hidden`
    - Desktop: `hidden md:block bg-gradient-to-r from-[var(--cream)] via-[color-mix(in_oklab,var(--cream)_90%,transparent)] to-transparent`
  - **Floating leaves (pointer-events-none):** 3–4 lucide `Leaf` icons absolutely positioned, `text-emerald-700/15`, `rotate-12`/`-rotate-45`, `blur-[1px]`, `animate-float`.
  - **Content:** `relative max-w-7xl mx-auto px-6 grid md:grid-cols-12 md:gap-8 md:items-center`

  **Left (`md:col-span-7`):**
  - Pill badge → "Trusted By Farmers Across India"
  - H1 `text-emerald-950 font-display font-bold text-3xl md:text-5xl leading-tight [text-shadow:0_1px_0_rgba(255,255,255,0.6)]` → "किसानों का भरोसा, बेहतर खेती का साथी।"
  - Divider with center `Leaf` icon between two `h-px bg-stone-300 flex-1` rules.
  - Paragraph `text-stone-800 font-medium`.
  - 6-value grid `grid grid-cols-1 md:grid-cols-2 gap-4` with ringed icon circles (Leaf, Truck, Users, Award, Headphones, Sprout). Title `font-bold text-emerald-950`; meta `text-stone-600 text-xs`.
  - Social proof card `rounded-3xl border border-stone-200 bg-white/90 backdrop-blur-sm p-4 text-center`:
    - 5 `Star` icons `fill-amber-400 text-amber-400`
    - "Trusted By Thousands of Farmers"
    - **Initial-avatar stack** (5 circles, `size-9 rounded-full ring-2 ring-white -ml-2 grid place-items-center text-white font-bold text-xs` with earth-tone bg per index) + `bg-emerald-900 text-white text-xs font-bold px-3 py-1 rounded-full` "+2500 Happy Farmers"
  - CTA `<Link to="/products">` → "Explore Products →" with required button classes.

  **Right (`hidden md:block md:col-span-5 relative`):**
  - Empty pane — desktop bg image already shows the farmer on the right.
  - Watermark seal (absolute bottom-right): `rounded-full border-2 border-amber-700/70 bg-[var(--cream)]/80 backdrop-blur p-4 w-40 h-40 grid place-items-center text-center` containing `Handshake` icon, "हमारा संकल्प", "आपकी तरक्की हमारी ज़िम्मेदारी".

  **Mobile-only review card** (below CTA, `md:hidden`): `bg-[#fefce8] border border-stone-200/60 p-5 rounded-3xl shadow-lg` with a short trust quote.

### Tech notes
- Uses existing `--cream` token from `src/styles.css` so scrims blend with the page canvas.
- No new deps; icons from `lucide-react`.
- `Link` from `@tanstack/react-router`; `/products` route already exists.
- Kisan Saathi widget and BottomNav z-index untouched.
