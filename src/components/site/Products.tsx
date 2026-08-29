import {
  Check,
  ShoppingCart,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ecoRoot from "@/assets/product-eco-root.png";
import yugm from "@/assets/product-yugm.png";
import rajSeeds from "@/assets/product-raj-seeds.png";
import uttamFasal from "@/assets/product-uttam-fasal.png";
import ecoGreen from "@/assets/product-eco-green.png";
import silk from "@/assets/product-silk.png";
import ecoGranule from "@/assets/product-eco-granule.png";
import logo from "@/assets/saniya-logo-full.png";

type Product = {
  image: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  prices?: { label: string; price: string }[];
  meta?: { label: string; value: string }[];
  cta: { label: string; icon: LucideIcon; href: string };
  badge: string;
  badgeTone: "gold" | "emerald";
};

const products: Product[] = [
  {
    image: ecoRoot,
    name: "Eco Root",
    category: "Organic Soil Conditioner",
    description:
      "Advanced humic acid formulation designed to improve root growth, nutrient absorption, and soil fertility for healthier crop development.",
    benefits: [
      "Stronger Root Development",
      "Better Nutrient Absorption",
      "Improves Soil Health & Structure",
    ],
    prices: [
      { label: "1 KG", price: "₹1000" },
      { label: "500 GM", price: "₹625" },
      { label: "250 GM", price: "₹350" },
    ],
    cta: { label: "Order Now", icon: ShoppingCart, href: "tel:+918852003393" },
    badge: "Best Seller",
    badgeTone: "gold",
  },
  {
    image: yugm,
    name: "युग्म मोर प्रोम",
    category: "Phosphate Rich Organic Manure (PROM)",
    description:
      "Organic phosphorus-rich manure that improves soil fertility and supports strong root and crop development naturally.",
    benefits: [
      "Enhances Root Development",
      "Better Nutrient Absorption",
      "Improves Soil Fertility",
      "Increases Crop Yield",
    ],
    meta: [
      { label: "Pack", value: "50 KG" },
      { label: "Usage", value: "50–60 KG / Acre" },
      { label: "MRP", value: "₹1600" },
    ],
    cta: { label: "Enquire Now", icon: MessageCircle, href: "https://wa.me/918852003393" },
    badge: "Farmer Trusted",
    badgeTone: "emerald",
  },
  {
    image: rajSeeds,
    name: "RAJ Organic Seeds R-46",
    category: "Improved Mustard Seed",
    description:
      "High-quality hybrid mustard seed variety with strong germination, better oil content, and improved crop performance.",
    benefits: [
      "High Germination & Vigour",
      "Better Plant Growth",
      "Higher Oil Content",
      "Disease Resistance",
    ],
    cta: { label: "Get Details", icon: ArrowRight, href: "#contact" },
    badge: "Premium Seeds",
    badgeTone: "gold",
  },
  {
    image: uttamFasal,
    name: "Uttam Fasal",
    category: "Humic Acid & Seaweed Granules",
    description:
      "Granular bio-nutrient formulation enriched with humic acid and seaweed extract for better crop health and soil vitality.",
    benefits: [
      "Improves Soil Microbial Activity",
      "Better Water Retention",
      "Promotes Healthy Crop Growth",
      "Enhances Nutrient Uptake",
    ],
    cta: { label: "Learn More", icon: ArrowRight, href: "#contact" },
    badge: "Organic Formula",
    badgeTone: "emerald",
  },
  {
    image: ecoGreen,
    name: "Eco Green",
    category: "Liquid Organic Growth Booster",
    description:
      "Premium liquid humic solution formulated for healthy soil, improved nutrient efficiency, and enhanced crop productivity.",
    benefits: [
      "Healthy Soil Development",
      "Better Crop Yield",
      "Organic Plant Nutrition",
      "Improves Root Activity",
    ],
    meta: [{ label: "Net Content", value: "1 Litre" }],
    cta: { label: "Order Now", icon: ShoppingCart, href: "tel:+918852003393" },
    badge: "100% Organic",
    badgeTone: "emerald",
  },
  {
    image: silk,
    name: "Silk",
    category: "Trisiloxane Spread Adjuvant",
    description:
      "High-performance trisiloxane spread adjuvant that improves spray coverage, penetration, and effectiveness on crops.",
    benefits: [
      "Better Spray Coverage",
      "Faster Absorption",
      "Improves Pesticide Efficiency",
      "Rainfast Performance",
    ],
    cta: { label: "Get Details", icon: ArrowRight, href: "#contact" },
    badge: "Advanced Formula",
    badgeTone: "gold",
  },
  {
    image: ecoGranule,
    name: "Eco Granule",
    category: "Granular Crop Nutrition",
    description:
      "Advanced eco granule formulation designed to support balanced crop nutrition and improve plant growth performance.",
    benefits: [
      "Balanced Nutrition",
      "Better Soil Conditioning",
      "Supports Plant Growth",
      "Improves Yield Quality",
    ],
    cta: { label: "Enquire Now", icon: MessageCircle, href: "https://wa.me/918852003393" },
    badge: "Eco Care",
    badgeTone: "emerald",
  },
];

export function Products() {
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [autoplay.current],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section id="products" className="py-20 lg:py-28 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.25em] text-emerald uppercase">Our Products</p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-forest-deep">
            Featured Products
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Premium agricultural solutions designed for healthier soil, stronger crops, and
            sustainable farming results.
          </p>
        </div>

        <div className="relative">
          <button
            aria-label="Previous product"
            onClick={() => emblaApi?.scrollPrev()}
            className="hidden lg:grid absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 size-12 rounded-full bg-card shadow-elegant place-items-center text-forest hover:bg-forest hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            aria-label="Next product"
            onClick={() => emblaApi?.scrollNext()}
            className="hidden lg:grid absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 size-12 rounded-full bg-card shadow-elegant place-items-center text-forest hover:bg-forest hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>

          <div ref={emblaRef} className="overflow-hidden -mx-3">
            <div className="flex">
              {products.map((p, i) => (
                <div
                  key={p.name}
                  className="shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 px-3 pb-4"
                >
                  <article className="group h-full bg-card rounded-2xl shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 border border-border overflow-hidden flex flex-col">
                    <div className="relative aspect-[4/3] bg-gradient-to-b from-secondary/60 to-background grid place-items-center p-6 overflow-hidden">
                      <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        className="absolute top-3 left-3 size-8 opacity-60 mix-blend-multiply"
                      />
                      <span
                        className={`absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase backdrop-blur-sm ${
                          p.badgeTone === "gold"
                            ? "bg-gold/20 text-forest-deep ring-1 ring-gold/40"
                            : "bg-emerald/15 text-emerald ring-1 ring-emerald/30"
                        }`}
                      >
                        <Sparkles className="size-3" />
                        {p.badge}
                      </span>
                      <img
                        src={p.image}
                        alt={`${p.name} — ${p.category}`}
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                        {...(i < 3 ? { fetchPriority: "high" as const } : {})}
                        className="max-h-full max-w-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-xl text-forest-deep text-center">
                        {p.name}
                      </h3>
                      <p className="text-center text-[11px] font-semibold tracking-wider text-emerald uppercase mt-1">
                        {p.category}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground text-center line-clamp-2">
                        {p.description}
                      </p>

                      {p.prices && p.prices.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {p.prices.map((pr) => (
                            <div
                              key={pr.label}
                              className="rounded-lg border border-border bg-secondary/60 px-3 py-2 text-center min-w-[88px]"
                            >
                              <div className="text-[10px] font-semibold text-muted-foreground tracking-wide">
                                {pr.label}
                              </div>
                              <div className="font-display font-bold text-forest-deep">
                                {pr.price}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {p.meta && p.meta.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {p.meta.map((m) => (
                            <div
                              key={m.label}
                              className="rounded-lg border border-border bg-secondary/60 px-3 py-2 text-center"
                            >
                              <div className="text-[10px] font-semibold text-muted-foreground tracking-wide">
                                {m.label}
                              </div>
                              <div className="font-display font-bold text-forest-deep text-sm">
                                {m.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <ul className="mt-5 space-y-2 text-sm">
                        {p.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-foreground/85">
                            <Check className="size-4 text-emerald shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <a href={p.cta.href} className="mt-auto pt-6">
                        <span className="flex items-center justify-center gap-2 bg-forest-gradient text-primary-foreground rounded-full py-3 font-semibold shadow-card hover:shadow-elegant hover:-translate-y-0.5 transition-all">
                          <p.cta.icon className="size-4" /> {p.cta.label}
                        </span>
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {snaps.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === selectedIndex ? "w-6 bg-forest" : "w-2 bg-forest/25 hover:bg-forest/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
