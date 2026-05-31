import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Truck,
  Leaf,
  Users,
  Award,
  Heart,
  Flame,
  ShoppingBag,
} from "lucide-react";
import heroBanner from "@/assets/products-hero-banner.jpg";
import ecoRootPromo from "@/assets/eco-root-promo.jpg";
import {
  items,
  formatINR,
  type Category,
  type Item,
  type Variant,
} from "@/data/products-catalog";
import { useOrderFlow } from "@/hooks/useOrderFlow";
import { KisanSaathiWidget } from "@/components/kisan-saathi/KisanSaathiWidget";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

function ProductCard({
  p,
  isSaved,
  onToggleSave,
  onOrder,
}: {
  p: Item;
  isSaved: boolean;
  onToggleSave: () => void;
  onOrder: (p: Item, variant?: Variant) => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    p.defaultVariant,
  );
  const activeVariant = p.variants?.find((v) => v.label === selectedVariant);
  const displayPrice = activeVariant ? formatINR(activeVariant.price) : p.price;

  return (
    <article className="group relative bg-card rounded-2xl border border-border shadow-card hover:shadow-elegant hover:-translate-y-0.5 overflow-hidden flex flex-col transition-all duration-200 active:scale-[0.99]">
      <button
        aria-label={isSaved ? "Remove from favorites" : "Save to favorites"}
        onClick={onToggleSave}
        className="absolute top-2 right-2 z-10 size-7 grid place-items-center rounded-full bg-white/85 backdrop-blur-sm border border-border shadow-sm"
      >
        <Heart
          className={`size-3.5 transition-colors ${
            isSaved ? "fill-emerald text-emerald" : "text-forest-deep/70"
          }`}
        />
      </button>

      {p.bestSeller && (
        <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full bg-gold/90 text-forest-deep px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow-sm">
          <Flame className="size-2.5" /> Best
        </span>
      )}

      <div className="aspect-square bg-gradient-to-b from-secondary/60 to-background grid place-items-center p-3">
        <img
          src={p.image}
          alt={`${p.name} — ${p.tagline}`}
          loading="lazy"
          className="max-h-full max-w-full object-contain bg-transparent drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="relative p-2.5 flex flex-col gap-0.5">
        <p className="text-[9px] uppercase tracking-wider text-emerald font-bold">
          {p.category}
        </p>
        <h3 className="font-display font-bold text-forest-deep text-[13px] leading-tight line-clamp-1">
          {p.name}
        </h3>
        <p className="text-[10px] text-muted-foreground line-clamp-1">
          {p.tagline}
        </p>

        {p.variants && p.variants.length > 0 && (
          <div className="mt-1.5 flex gap-1">
            {p.variants.map((v) => {
              const isSel = v.label === selectedVariant;
              return (
                <button
                  key={v.label}
                  onClick={() => setSelectedVariant(v.label)}
                  aria-pressed={isSel}
                  className={`flex-1 rounded-full py-1 text-[10px] font-semibold transition-all active:scale-95 duration-100 ${
                    isSel
                      ? "bg-forest-gradient text-primary-foreground shadow-sm"
                      : "bg-secondary/60 text-forest-deep border border-border"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-1 flex items-end justify-between">
          <span
            key={displayPrice}
            className="font-display font-bold text-forest-deep text-base animate-in fade-in duration-200"
          >
            {displayPrice}
          </span>
        </div>

        <button
          onClick={() => onOrder(p, activeVariant)}
          className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-forest-gradient text-primary-foreground py-2 text-[12px] font-semibold tracking-tight shadow-md active:shadow-sm transition-all active:scale-95 duration-100 ease-out"
        >
          <ShoppingBag className="size-3.5" />
          Order Now
        </button>
      </div>
    </article>
  );
}

const categories: Category[] = [
  "All",
  "Fertilizers",
  "Manures",
  "Seeds",
  "Phosphorus",
  "Best Sellers",
];

const trustBar = [
  { icon: Truck, label: "Pan India", sub: "Delivery" },
  { icon: Leaf, label: "100%", sub: "Organic" },
  { icon: Users, label: "Farmer", sub: "Trusted" },
  { icon: Award, label: "Premium", sub: "Quality" },
];

function ProductsPage() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const { openOrder, modal } = useOrderFlow();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchesCat =
        active === "All"
          ? true
          : active === "Best Sellers"
            ? !!i.bestSeller
            : i.category === active;
      const matchesQ =
        !q || i.name.toLowerCase().includes(q) || i.tagline.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [active, query]);

  return (
    <>
      <Helmet>
        <title>Our Products | Saniya Agriculture Solution</title>
        <meta
          name="description"
          content="Explore our range of eco-friendly agricultural solutions including Eco Root, Eco Green, and Raj Organic Seeds to boost your crop yield."
        />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:url" content={currentUrl} />
      </Helmet>

      <section className="pt-16 md:pt-24 pb-16 bg-secondary/40 min-h-screen">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          {/* 1. Hero Header Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-elegant">
            <img
              src={heroBanner}
              alt="Saniya Agriculture Solution — Best Quality Fertilizers, Manures, Seeds & Phosphorus delivered Pan India"
              className="w-full h-[14vh] min-h-[96px] md:h-[28vh] md:min-h-[200px] object-cover"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* 2. Glassmorphic Floating Search */}
          <div className="relative -mt-5 mx-3 z-10">
            <div className="flex items-center gap-2 h-10 pl-3 pr-1 rounded-full backdrop-blur-md bg-white/80 border border-white/60 shadow-elegant">
              <Search className="size-4 text-forest-deep/70 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fertilizers, seeds, manures…"
                className="flex-1 bg-transparent text-[13px] placeholder:text-muted-foreground focus:outline-none transition-shadow duration-200"
              />
              <button
                aria-label="Filter"
                className="size-8 grid place-items-center rounded-full bg-forest-gradient text-primary-foreground shadow-card"
              >
                <SlidersHorizontal className="size-4" />
              </button>
            </div>
          </div>

          {/* 3. Category Chips */}
          <div className="mt-4 -mx-3 px-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 w-max">
              {categories.map((c) => {
                const isActive = c === active;
                return (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className={`whitespace-nowrap rounded-full py-1 px-3 text-[11px] font-semibold transition-all duration-200 ease-out active:scale-95 ${
                      isActive
                        ? "bg-forest-gradient text-primary-foreground shadow-card"
                        : "bg-card text-forest-deep border border-border"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Trust Bar */}
          <div className="mt-3 flex items-stretch justify-between rounded-xl bg-card border border-border px-2 py-2">
            {trustBar.map((t, i) => (
              <div
                key={t.label}
                className={`flex-1 flex flex-col items-center text-center gap-0.5 leading-tight ${
                  i < trustBar.length - 1 ? "border-r border-border/60" : ""
                }`}
              >
                <t.icon className="size-3.5 text-emerald" />
                <div className="text-[10px] font-bold text-forest-deep">{t.label}</div>
                <div className="text-[9px] text-muted-foreground">{t.sub}</div>
              </div>
            ))}
          </div>

          {/* 5. Eco Root Focus Banner */}
          <a
            href="tel:+918852003393"
            className="mt-3 block rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-shadow"
          >
            <img
              src={ecoRootPromo}
              alt="Eco Root Humic Acid 98% — Best Seller. Improves root development, nutrient uptake & soil health."
              className="w-full h-[10vh] min-h-[72px] md:h-[22vh] md:min-h-[180px] object-cover"
              loading="eager"
              decoding="async"
            />
          </a>

          {/* 6. Product Grid */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {filtered.map((p) => (
              <ProductCard
                key={p.name}
                p={p}
                isSaved={!!saved[p.name]}
                onToggleSave={() =>
                  setSaved((s) => ({ ...s, [p.name]: !s[p.name] }))
                }
                onOrder={openOrder}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No products match your search.
            </p>
          )}
        </div>
      </section>

      {modal}

      <KisanSaathiWidget onOrder={openOrder} />
    </>
  );
}
