import { Phone, MessageCircle, Sprout } from "lucide-react";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="bg-forest-gradient text-primary-foreground relative overflow-hidden"
    >
      <div className="absolute -left-4 -bottom-4 opacity-25 text-gold">
        <Sprout className="size-40" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-14 grid lg:grid-cols-2 gap-8 items-center relative">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-balance">
            Ready to Improve Your Farming Results?
          </h2>
          <p className="mt-3 text-sm sm:text-base opacity-90 max-w-xl">
            Get the right agricultural solutions for healthier soil and higher crop productivity.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
          <a
            href="tel:+918852003393"
            className="flex items-center justify-center gap-3 bg-background text-forest-deep rounded-2xl px-6 py-4 font-semibold shadow-elegant hover:-translate-y-0.5 transition-transform"
          >
            <span className="size-10 rounded-full bg-forest/10 grid place-items-center text-forest">
              <Phone className="size-5" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                Call Now
              </span>
              <span className="block">+91 8852003393</span>
            </span>
          </a>
          <a
            href="https://wa.me/918852003393"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-3 bg-emerald text-primary-foreground rounded-2xl px-6 py-4 font-semibold shadow-elegant hover:-translate-y-0.5 transition-transform"
          >
            <span className="size-10 rounded-full bg-white/15 grid place-items-center">
              <MessageCircle className="size-5" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-wider opacity-80">
                Send Inquiry
              </span>
              <span className="block">on WhatsApp</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
