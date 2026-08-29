import { Leaf, Phone, Mail, MapPin, MessageCircle, Camera, Play, Share2 } from "lucide-react";
const Facebook = Share2;
const Instagram = Camera;
const Youtube = Play;

export function Footer() {
  return (
    <footer className="bg-forest-deep text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="size-10 rounded-full bg-white/10 grid place-items-center">
              <Leaf className="size-5 text-gold" />
            </span>
            <span className="font-display font-bold leading-tight">
              Saniya Agriculture
              <span className="block text-xs font-medium opacity-75">Solution</span>
            </span>
          </div>
          <p className="mt-4 text-sm opacity-80 leading-relaxed">
            Organic bio fertilizers, manures, phosphorus products and quality seeds for sustainable
            farming.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, MessageCircle, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="size-9 grid place-items-center rounded-full bg-white/8 hover:bg-gold hover:text-forest-deep transition-colors"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-gold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-85">
            {["Home", "About Us", "Products", "Benefits", "Reviews", "Contact Us"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-gold transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-gold mb-4">Our Products</h3>
          <ul className="space-y-2 text-sm opacity-85">
            {[
              "Eco Root",
              "युग्म मोर प्रोम",
              "RAJ Organic Seeds",
              "Fertilizers",
              "Organic Manures",
            ].map((l) => (
              <li key={l}>
                <a href="#products" className="hover:text-gold transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-bold text-gold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2.5">
              <Phone className="size-4 text-gold mt-0.5 shrink-0" />
              <a href="tel:+918852003393">+91 8852003393</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="size-4 text-gold mt-0.5 shrink-0" />
              <a href="mailto:saniyaagrisolution@gmail.com">saniyaagrisolution@gmail.com</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="size-4 text-gold mt-0.5 shrink-0" />
              Serving Farmers Across India
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs opacity-75">
          <p>© {new Date().getFullYear()} Saniya Agriculture Solution. All Rights Reserved.</p>
          <p>Designed for Better Soil. Better Crops. Better Future.</p>
        </div>
      </div>
    </footer>
  );
}
