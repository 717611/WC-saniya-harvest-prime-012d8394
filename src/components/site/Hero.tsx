import { ArrowRight, Leaf, Phone } from "lucide-react";
import heroPortrait from "@/assets/hero-products-portrait.png";
import heroLandscape from "@/assets/hero-products-landscape.png";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] md:flex md:flex-row overflow-hidden">
      {/* MOBILE background image */}
      <img
        src={heroPortrait}
        alt="Saniya Agriculture Solution product lineup in the field"
        className="md:hidden absolute inset-0 w-full h-full object-cover object-bottom"
        loading="eager"
        fetchPriority="high"
      />
      {/* MOBILE gradient overlay for legibility */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-transparent" />

      {/* DESKTOP background */}
      <img
        src={heroLandscape}
        alt="Saniya Agriculture Solution organic fertilizers, manures and seeds product range"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom -z-10"
        loading="eager"
        fetchPriority="high"
      />
      <div
        className="hidden md:block absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--cream) 92%, transparent) 0%, color-mix(in oklab, var(--cream) 70%, transparent) 40%, transparent 70%), linear-gradient(180deg, color-mix(in oklab, var(--cream) 60%, transparent) 0%, transparent 40%, color-mix(in oklab, var(--forest-deep) 20%, transparent) 100%)",
        }}
      />

      {/* TEXT + CTA */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-start pt-24 pb-8 px-4 sm:px-6 lg:px-12 md:justify-center md:pt-16">
        <div className="animate-fade-up max-w-xl">
          <h1 className="font-display font-bold text-forest-deep text-3xl md:text-4xl lg:text-5xl leading-tight text-balance">
            BUY BEST QUALITY Bio organic fertilizers, Manures, Phosphorus & Seeds.
          </h1>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg text-balance">
            Supporting healthier soil, stronger roots and sustainable crop growth with trusted
            agricultural solutions.
          </p>

          <div className="mt-5 md:mt-8 flex flex-wrap gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-forest-gradient text-primary-foreground rounded-full px-5 py-3 md:px-6 md:py-3.5 font-semibold shadow-card hover:shadow-elegant transition-all hover:-translate-y-0.5"
            >
              <Leaf className="size-4" /> Explore Products
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-background border border-border text-forest-deep rounded-full px-5 py-3 md:px-6 md:py-3.5 font-semibold hover:border-forest hover:text-forest transition-all"
            >
              <Phone className="size-4" /> Contact Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
