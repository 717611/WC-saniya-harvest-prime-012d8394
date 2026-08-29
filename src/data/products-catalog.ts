import ecoRoot from "@/assets/eco-root-box.png";
import yugm from "@/assets/product-yugm.png";
import rajSeeds from "@/assets/product-raj-seeds.png";
import uttamFasal from "@/assets/product-uttam-fasal.png";
import ecoGreen from "@/assets/product-eco-green.png";
import silk from "@/assets/product-silk.png";
import ecoGranule from "@/assets/product-eco-granule.png";

export const WHATSAPP_NUMBER = "919413050436";
export const EXPERT_DIAL_NUMBER = "8852003393";

export type Category = "All" | "Fertilizers" | "Manures" | "Seeds" | "Phosphorus" | "Best Sellers";

export type Variant = { label: string; price: number };

export type Item = {
  name: string;
  category: Exclude<Category, "All" | "Best Sellers">;
  image: string;
  tagline: string;
  price: string;
  bestSeller?: boolean;
  variants?: Variant[];
  defaultVariant?: string;
};

export const items: Item[] = [
  {
    name: "Eco Root",
    category: "Fertilizers",
    image: ecoRoot,
    tagline: "Humic Acid 98%",
    price: "₹1,000",
    bestSeller: true,
    variants: [
      { label: "250g", price: 350 },
      { label: "500g", price: 600 },
      { label: "1kg", price: 1000 },
    ],
    defaultVariant: "1kg",
  },
  {
    name: "Eco Green",
    category: "Fertilizers",
    image: ecoGreen,
    tagline: "Liquid organic booster",
    price: "₹650",
  },
  {
    name: "Eco Granule",
    category: "Fertilizers",
    image: ecoGranule,
    tagline: "Granular crop nutrition",
    price: "₹550",
  },
  {
    name: "Uttam Fasal",
    category: "Fertilizers",
    image: uttamFasal,
    tagline: "Humic + seaweed granules",
    price: "₹1600",
  },
  {
    name: "युग्म मोर प्रोम",
    category: "Phosphorus",
    image: yugm,
    tagline: "Phosphate rich organic manure",
    price: "₹1600",
    bestSeller: true,
  },
  {
    name: "RAJ Organic Seeds R-46",
    category: "Seeds",
    image: rajSeeds,
    tagline: "Improved mustard seed",
    price: "₹1300",
  },
  {
    name: "Silk",
    category: "Manures",
    image: silk,
    tagline: "Trisiloxane spread adjuvant",
    price: "₹380",
  },
];

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export type OrderTarget = {
  product: Item;
  variant?: Variant;
  price: number;
  priceLabel: string;
};

export function buildOrderTarget(p: Item, variant?: Variant): OrderTarget {
  const numericPrice = variant ? variant.price : Number(p.price.replace(/[^\d]/g, "")) || 0;
  return {
    product: p,
    variant,
    price: numericPrice,
    priceLabel: variant ? formatINR(variant.price) : p.price,
  };
}
