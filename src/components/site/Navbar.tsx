import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/saniya-logo-full.png";

type NavLink =
  { label: string; to: string; kind: "route" } | { label: string; href: string; kind: "anchor" };

const links: NavLink[] = [
  { label: "Home", to: "/", kind: "route" },
  { label: "About", to: "/about", kind: "route" },
  { label: "Products", to: "/products", kind: "route" },
  { label: "Benefits", href: "/#benefits", kind: "anchor" },
  { label: "Reviews", href: "/#reviews", kind: "anchor" },
  { label: "Contact", href: "/#contact", kind: "anchor" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-lg shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="size-11 lg:size-12 rounded-full bg-white shadow-soft ring-1 ring-forest/15 grid place-items-center overflow-hidden">
            <img
              src={logo}
              alt="Saniya Agriculture Solution logo"
              className="size-full object-contain p-1"
              loading="eager"
            />
          </span>
          <span className="font-display font-semibold leading-tight text-forest-deep text-sm sm:text-base">
            Saniya Agriculture
            <span className="block text-[11px] sm:text-xs font-medium text-muted-foreground">
              Solution
            </span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) =>
            l.kind === "route" ? (
              <li key={l.label}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="text-sm font-medium text-foreground/80 hover:text-forest transition-colors data-[status=active]:text-forest data-[status=active]:font-semibold"
                >
                  {l.label}
                </Link>
              </li>
            ) : (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-foreground/80 hover:text-forest transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <a
          href="tel:+918852003393"
          className="hidden md:flex items-center gap-2.5 bg-forest-gradient text-primary-foreground rounded-full pl-2 pr-5 py-2 shadow-card hover:shadow-elegant transition-all hover:-translate-y-0.5"
        >
          <span className="size-8 rounded-full bg-white/15 grid place-items-center">
            <Phone className="size-4" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[10px] uppercase tracking-wider opacity-80">Call Now</span>
            <span className="block text-xs font-semibold">+91 8852003393</span>
          </span>
        </a>

        <button
          aria-label="Toggle menu"
          className="lg:hidden grid place-items-center size-10 rounded-full bg-forest/10 text-forest"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <ul className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.label}>
                {l.kind === "route" ? (
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-foreground/90 font-medium"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-foreground/90 font-medium"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
            <a
              href="tel:+918852003393"
              className="mt-2 flex items-center justify-center gap-2 bg-forest-gradient text-primary-foreground rounded-full py-3 font-semibold"
            >
              <Phone className="size-4" /> +91 8852003393
            </a>
          </ul>
        </div>
      )}
    </header>
  );
}
