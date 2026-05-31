import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { Quote, MapPin, Sprout, ShieldCheck } from "lucide-react";
import founder from "@/assets/ak-singhal-portrait.png";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Saniya Agriculture Solution</title>
        <meta
          name="description"
          content="Led by C.M.D. A.K. Singhal, Saniya Agriculture Solution is committed to providing top-tier agricultural products and services for the betterment of farmers."
        />
        <link rel="canonical" href="https://saniya-harvest.vercel.app/about" />
      </Helmet>
    <div className="pt-24 md:pt-28 pb-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-[0.25em] text-emerald uppercase">About Us</p>
          <h1 className="mt-2 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-forest-deep">
            Cultivating trust across India
          </h1>
          <p className="mt-4 text-muted-foreground">
            Saniya Agriculture Solution is a premier provider, marketer and seller of bio organic
            fertilizers, manures, phosphorus products and quality seeds — serving farmers at a
            Pan-India level.
          </p>
        </div>

        {/* Leadership split */}
        <section className="mt-14 lg:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-forest-gradient rounded-3xl opacity-20 blur-2xl" />
              <img
                src={founder}
                alt="A.K. Singhal, C.M.D. of Saniya Agriculture Solution"
                className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-elegant ring-1 ring-forest/10"
                loading="eager"
              />
              <div className="absolute -bottom-4 left-4 right-4 bg-card/95 backdrop-blur-md rounded-2xl border border-border shadow-card px-4 py-3 flex items-center gap-3">
                <span className="size-10 rounded-full bg-forest-gradient grid place-items-center text-primary-foreground">
                  <Sprout className="size-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-display font-bold text-forest-deep">A.K. Singhal</p>
                  <p className="text-xs text-emerald font-semibold tracking-wide">
                    C.M.D., Saniya Agriculture Solution
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.25em] text-emerald uppercase">Leadership</p>
            <h2 className="mt-2 font-display font-bold text-3xl lg:text-4xl text-forest-deep leading-tight">
              A.K. Singhal
            </h2>
            <p className="mt-1 text-base text-emerald font-semibold tracking-wide">
              C.M.D., Saniya Agriculture Solution
            </p>

            <figure className="mt-6 relative bg-secondary/60 border-l-4 border-forest rounded-2xl p-6 lg:p-8 shadow-card">
              <Quote className="absolute -top-3 -left-3 size-10 text-gold bg-card rounded-full p-2 shadow-card" />
              <blockquote className="font-display text-lg lg:text-2xl text-forest-deep leading-snug text-balance">
                “We are committed to selling our products and services related to Agriculture for
                the betterment of farmers.”
              </blockquote>
            </figure>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <MapPin className="size-5 text-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-forest-deep text-sm">Pan-India Reach</p>
                  <p className="text-xs text-muted-foreground">
                    Premier provider, marketer and seller serving farmers nationwide.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <ShieldCheck className="size-5 text-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-forest-deep text-sm">Trusted Quality</p>
                  <p className="text-xs text-muted-foreground">
                    Curated organic agri-solutions backed by farmer-first values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-16 lg:mt-24 bg-forest-gradient rounded-3xl p-8 lg:p-12 text-primary-foreground text-center">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-balance">
            A premier provider, marketer and seller — at a Pan-India level
          </h2>
          <p className="mt-3 opacity-90 max-w-2xl mx-auto">
            We work closely with farming communities across India to deliver organic agricultural
            solutions that support healthier soil, stronger crops and a more sustainable future.
          </p>
        </section>
      </div>
    </div>
  );
}
