import { Link } from "@tanstack/react-router";
import {
  Leaf,
  Truck,
  Users,
  Award,
  Headphones,
  Sprout,
  Star,
  Handshake,
  ArrowRight,
} from "lucide-react";
import farmerDesktop from "@/assets/farmer-portrait-desktop.png";
import farmerMobile from "@/assets/farmer-portrait-mobile.png";

const values = [
  { icon: Leaf, title: "100% Organic", meta: "Natural & Safe for Soil" },
  { icon: Truck, title: "Pan India Delivery", meta: "Fast & Reliable Service" },
  { icon: Users, title: "Farmer Trusted", meta: "Loved by 2500+ Farmers" },
  { icon: Award, title: "Premium Quality", meta: "Best Products for Best Yield" },
  { icon: Headphones, title: "Expert Support", meta: "Always Here to Help" },
  { icon: Sprout, title: "Better Yield", meta: "Better Soil, Better Future" },
];

const avatars = [
  { initials: "RK", bg: "bg-emerald-700" },
  { initials: "SP", bg: "bg-amber-600" },
  { initials: "MV", bg: "bg-stone-600" },
  { initials: "AY", bg: "bg-yellow-700" },
  { initials: "BJ", bg: "bg-emerald-900" },
];

export function SubheroTrust() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden py-12 md:py-24 bg-[var(--cream)]"
    >
      {/* Background images */}
      <img
        src={farmerDesktop}
        alt=""
        aria-hidden
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      />
      <img
        src={farmerMobile}
        alt=""
        aria-hidden
        className="md:hidden absolute inset-0 w-full h-full object-cover object-[center_top]"
      />

      {/* Scrims using cream token — mobile uses lighter top scrim so farmer stays visible */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[var(--cream)] via-transparent to-[var(--cream)]" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[var(--cream)] via-[color-mix(in_oklab,var(--cream)_90%,transparent)] to-transparent" />

      {/* Floating leaves */}
      <div className="pointer-events-none absolute inset-0">
        <Leaf className="absolute top-10 left-[6%] size-8 md:size-10 text-emerald-700/15 rotate-12 blur-[1px] animate-float" />
        <Leaf className="absolute top-[35%] left-[42%] size-6 md:size-8 text-emerald-700/10 -rotate-45 blur-[1px] animate-float" style={{ animationDelay: "1.5s" }} />
        <Leaf className="absolute bottom-12 left-[10%] size-9 md:size-12 text-emerald-700/15 rotate-45 blur-[1px] animate-float" style={{ animationDelay: "0.8s" }} />
        <Leaf className="hidden md:block absolute top-[20%] right-[8%] size-10 text-emerald-700/10 -rotate-12 blur-[1px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-12 md:gap-8 md:items-center">
        {/* Left column */}
        <div className="md:col-span-7 space-y-4 md:space-y-6">
          <span className="inline-block bg-emerald-800 text-white font-bold text-[10px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm">
            Trusted By Farmers Across India
          </span>

          <h2 className="text-emerald-950 font-display font-bold text-2xl md:text-5xl leading-tight [text-shadow:0_1px_0_rgba(255,255,255,0.6)]">
            किसानों का भरोसा,<br className="md:hidden" /> बेहतर खेती का साथी।
          </h2>

          <div className="flex items-center gap-3 max-w-md">
            <span className="h-px bg-stone-300 flex-1" />
            <Leaf className="size-4 text-emerald-700" />
            <span className="h-px bg-stone-300 flex-1" />
          </div>

          <p className="text-stone-800 font-medium text-sm md:text-lg max-w-xl leading-relaxed inline-block md:!bg-transparent md:!border-0 md:!p-0 md:!rounded-none border border-white/60 bg-white/40 backdrop-blur-[2px] px-3 py-2 rounded-xl">
            Saniya Agriculture Solutions is committed to providing premium
            quality products and trusted support to farmers across India.
          </p>

          {/* Value grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4 pt-1 md:pt-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex items-center gap-2.5 md:gap-3 md:!bg-transparent md:!border-0 md:!p-0 md:!rounded-none border border-white/60 bg-white/40 backdrop-blur-[2px] px-3 py-1.5 rounded-xl"
              >
                <div className="size-9 md:size-11 rounded-full border-2 border-emerald-700/30 grid place-items-center text-emerald-700 bg-white/60 backdrop-blur-sm shrink-0">
                  <v.icon className="size-4 md:size-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-emerald-950 text-xs md:text-sm leading-tight">
                    {v.title}
                  </div>
                  <div className="text-stone-600 text-[10px] md:text-xs">{v.meta}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Spacer on mobile so the red Eco Root box in the background remains visible */}
          <div className="md:hidden h-56" aria-hidden />

          {/* Social proof */}
          <div className="rounded-3xl border border-stone-200 bg-white/90 backdrop-blur-sm p-4 text-center shadow-sm max-w-md">
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="mt-1.5 text-stone-700 text-xs font-semibold">
              Trusted By Thousands of Farmers
            </div>
            <div className="mt-3 flex items-center justify-center">
              <div className="flex">
                {avatars.map((a, i) => (
                  <div
                    key={a.initials}
                    className={`size-9 rounded-full ring-2 ring-white grid place-items-center text-white font-bold text-[11px] ${a.bg} ${
                      i === 0 ? "" : "-ml-2"
                    }`}
                  >
                    {a.initials}
                  </div>
                ))}
              </div>
              <span className="ml-3 bg-emerald-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                +2500 Happy Farmers
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/products"
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] duration-100 max-w-md"
          >
            Explore Products <ArrowRight className="size-4" />
          </Link>

          {/* Mobile-only review card */}
          <div className="md:hidden bg-[#fefce8] border border-stone-200/60 p-5 rounded-3xl shadow-lg">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-stone-800 text-sm font-medium leading-relaxed">
              "Eco Root ने मेरी फसल की पैदावार बहुत बढ़ा दी। मिट्टी पहले से
              बेहतर है और पौधों की जड़ें मज़बूत हैं।"
            </p>
            <div className="mt-3 text-xs font-bold text-emerald-900">
              — रमेश कुमार, राजस्थान
            </div>
          </div>
        </div>

        {/* Right column — visual pane with watermark seal */}
        <div className="hidden md:block md:col-span-5 relative min-h-[520px]">
          <div className="absolute bottom-6 right-2 w-44 h-44 rounded-full border-2 border-amber-700/70 bg-[color-mix(in_oklab,var(--cream)_85%,transparent)] backdrop-blur p-4 grid place-items-center text-center shadow-lg">
            <div>
              <Handshake className="size-6 text-amber-800 mx-auto" />
              <div className="mt-1 font-display font-bold text-emerald-950 text-sm">
                हमारा संकल्प
              </div>
              <div className="mt-0.5 text-[10px] font-semibold text-stone-700 leading-snug">
                आपकी तरक्की
                <br />
                हमारी ज़िम्मेदारी
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
