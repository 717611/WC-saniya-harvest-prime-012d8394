import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import ecoRoot from "@/assets/product-eco-root.png";
import yugm from "@/assets/product-yugm.png";
import rajSeeds from "@/assets/product-raj-seeds.png";
import uttamFasal from "@/assets/product-uttam-fasal.png";
import ecoGreen from "@/assets/product-eco-green.png";
import silk from "@/assets/product-silk.png";
import ecoGranule from "@/assets/product-eco-granule.png";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

type Category = "All" | "Fertilizers" | "Manures" | "Seeds" | "Adjuvants";

type Item = {
  name: string;
  category: Exclude<Category, "All">;
  image: string;
  tagline: string;
};

const items: Item[] = [
  { name: "Eco Root", category: "Fertilizers", image: ecoRoot, tagline: "Humic acid soil conditioner" },
  { name: "Eco Green", category: "Fertilizers", image: ecoGreen, tagline: "Liquid organic booster" },
  { name: "Eco Granule", category: "Fertilizers", image: ecoGranule, tagline: "Granular crop nutrition" },
  { name: "Uttam Fasal", category: "Fertilizers", image: uttamFasal, tagline: "Humic + seaweed granules" },
  { name: "युग्म मोर प्रोम", category: "Manures", image: yugm, tagline: "Phosphate rich organic manure" },
  { name: "RAJ Organic Seeds R-46", category: "Seeds", image: rajSeeds, tagline: "Improved mustard seed" },
  { name: "Silk", category: "Adjuvants", image: silk, tagline: "Trisiloxane spread adjuvant" },
];

const categories: Category[] = ["All", "Fertilizers", "Manures", "Seeds", "Adjuvants"];

function ProductsPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active],
  );

  return (
    <>
      <Helmet>
        <title>Our Products | Saniya Agriculture Solution</title>
        <meta
          name="description"
          content="Explore our range of eco-friendly agricultural solutions including Eco Root, Eco Green, and Raj Organic Seeds to boost your crop yield."
        />
        <link rel="canonical" href="https://saniya-harvest.vercel.app/products" />
      </Helmet>
      <section className="pt-24 md:pt-28 pb-16 bg-secondary/40 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-[0.25em] text-emerald uppercase">Shop</p>
          <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-forest-deep">
            Our Products
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Premium organic agricultural solutions delivered Pan-India.
          </p>
        </div>

        {/* Category chips */}
        <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 w-max mx-auto pb-2">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-forest-gradient text-primary-foreground shadow-card"
                      : "bg-card text-forest-deep border border-border hover:border-forest"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <article
              key={p.name}
              className="group bg-card rounded-2xl border border-border shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col"
            >
              <div className="aspect-square bg-gradient-to-b from-secondary/60 to-background grid place-items-center p-4">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.tagline}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-display font-bold text-forest-deep text-sm sm:text-base leading-tight">
                  {p.name}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-emerald font-semibold">
                  {p.category}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">{p.tagline}</p>
                <a
                  href="tel:+918852003393"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-forest-gradient text-primary-foreground rounded-full py-2.5 px-4 text-sm font-semibold shadow-card hover:shadow-elegant transition-all"
                >
                  <ShoppingCart className="size-4" /> View / Add
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
