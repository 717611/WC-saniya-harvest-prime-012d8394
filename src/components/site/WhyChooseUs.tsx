import { Sprout, BadgeCheck, ShieldCheck, TrendingUp } from "lucide-react";

const items = [
  {
    icon: Sprout,
    title: "Sustainable Farming Support",
    desc: "Promoting eco-friendly and sustainable agricultural practices.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Agriculture Inputs",
    desc: "Carefully selected products for better crop performance.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Organic Products",
    desc: "Safe, effective and reliable organic farming solutions.",
  },
  {
    icon: TrendingUp,
    title: "Better Crop Performance",
    desc: "Supporting farmers for higher yields and better outcomes.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="benefits"
      className="bg-forest-gradient text-primary-foreground py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">Why Choose Us</p>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Why Farmers Trust Saniya Agriculture Solution
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="text-center sm:text-left">
              <div className="size-14 rounded-2xl bg-gold/15 ring-1 ring-gold/40 grid place-items-center text-gold mx-auto sm:mx-0 mb-4">
                <it.icon className="size-6" />
              </div>
              <h3 className="font-display font-bold text-lg">{it.title}</h3>
              <p className="mt-1.5 text-sm opacity-85 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
