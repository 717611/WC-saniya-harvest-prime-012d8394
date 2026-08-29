import { Star } from "lucide-react";
import f1 from "@/assets/farmer-1.jpg";
import f2 from "@/assets/farmer-2.jpg";
import f3 from "@/assets/farmer-3.jpg";

const reviews = [
  {
    img: f1,
    name: "Ramesh Patel",
    loc: "Farmer, Maharashtra",
    text: "Eco Root has improved root strength and overall plant health in our crops. Very effective product.",
  },
  {
    img: f2,
    name: "Suresh Yadav",
    loc: "Farmer, Madhya Pradesh",
    text: "The organic manure is excellent for soil health and crop growth. We saw better results this season.",
  },
  {
    img: f3,
    name: "Mahavir Singh",
    loc: "Farmer, Rajasthan",
    text: "Good quality seeds with high germination. Totally satisfied with the product quality.",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.25em] text-emerald uppercase">Testimonials</p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-forest-deep">
            What Our Farmers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-all flex flex-col"
            >
              <div className="flex gap-0.5 text-gold mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground/85 leading-relaxed flex-1">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  className="size-12 rounded-full object-cover ring-2 ring-gold/60"
                />
                <div>
                  <div className="font-semibold text-forest-deep text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.loc}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
