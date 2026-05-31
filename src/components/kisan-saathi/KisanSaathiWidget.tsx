import { useState } from "react";
import { ArrowLeft, X, Phone, CheckCircle2, ShoppingBag, Sprout, Wheat, Star, MessageCircle } from "lucide-react";
import avatar from "@/assets/kisan-saathi-avatar.png";
import {
  items,
  formatINR,
  EXPERT_DIAL_NUMBER,
  type Item,
  type Variant,
} from "@/data/products-catalog";
import { useEffect } from "react";

type ChatState = "menu" | "fertilizer" | "beej" | "best" | "expert";

type Props = {
  onOrder: (item: Item, variant?: Variant) => void;
};

export function KisanSaathiWidget({ onOrder }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ChatState>("menu");

  const open = () => {
    setState("menu");
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  const goBack = () => setState("menu");

  const titles: Record<ChatState, string> = {
    menu: "Kisan Saathi",
    fertilizer: "Fertilizer (खाद) Salah",
    beej: "Beej Salah",
    best: "Best Products",
    expert: "Talk to Expert",
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={open}
          aria-label="Open Kisan Saathi chat"
          className="fixed bottom-20 right-4 z-[90] active:scale-95 transition-transform duration-100 ease-out"
        >
          <span
            aria-hidden="true"
            className="absolute -top-10 right-0 whitespace-nowrap px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald/30 shadow-elegant text-[11px] font-semibold text-forest-deep animate-bounce"
          >
            Namaste, can I help? 👋
          </span>
          <img
            src={avatar}
            alt="Kisan Saathi"
            className="size-14 rounded-full object-cover ring-2 ring-emerald shadow-elegant bg-white"
          />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-20 right-4 z-[90] w-[360px] max-w-[90vw] max-h-[60vh] flex flex-col rounded-3xl border border-stone-200/80 bg-white/95 backdrop-blur-md shadow-elegant animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
          role="dialog"
          aria-label="Kisan Saathi chat"
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-stone-200/80 bg-gradient-to-r from-emerald/5 to-transparent">
            {state !== "menu" ? (
              <button
                onClick={goBack}
                aria-label="Back"
                className="size-8 grid place-items-center rounded-full hover:bg-secondary/60 text-forest-deep active:scale-95 transition-all duration-100"
              >
                <ArrowLeft className="size-4" />
              </button>
            ) : (
              <img
                src={avatar}
                alt=""
                className="size-9 rounded-full object-cover ring-2 ring-emerald shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-forest-deep text-[14px] leading-tight truncate">
                {titles[state]}
              </h3>
              <p className="text-[10px] text-emerald font-semibold">● Online</p>
            </div>
            <button
              onClick={close}
              aria-label="Close chat"
              className="size-8 grid place-items-center rounded-full bg-secondary/60 text-forest-deep active:scale-95 transition-all duration-100"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {state === "menu" && <MukhyaMenu onPick={setState} />}
            {state === "fertilizer" && (
              <ProductList
                products={items.filter((i) => i.category === "Fertilizers")}
                onOrder={onOrder}
              />
            )}
            {state === "beej" && (
              <ProductList
                products={items.filter((i) => i.category === "Seeds")}
                onOrder={onOrder}
              />
            )}
            {state === "best" && <BestProducts onOrder={onOrder} />}
            {state === "expert" && <TalkToExpert />}
          </div>
        </div>
      )}
    </>
  );
}

function ChatBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <img
        src={avatar}
        alt=""
        className="size-7 rounded-full object-cover ring-1 ring-emerald/50 shrink-0 mt-0.5"
      />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary/60 border border-border px-3 py-2 text-[12px] text-forest-deep leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function MukhyaMenu({ onPick }: { onPick: (s: ChatState) => void }) {
  const options: { key: ChatState; icon: React.ElementType; label: string }[] = [
    { key: "fertilizer", icon: Sprout, label: "🌾 Fertilizer (खाद) salah" },
    { key: "beej", icon: Wheat, label: "🌱 Beej salah" },
    { key: "best", icon: Star, label: "🌟 Best Products" },
    { key: "expert", icon: MessageCircle, label: "📞 Talk to Expert" },
  ];
  return (
    <>
      <ChatBubble>
        Namaste 🙏 Main apka <b>kisaan sathi</b>, kheti se judi samasya me madad kar sakta hoon.
      </ChatBubble>
      <div className="space-y-2 pt-1">
        {options.map((o) => (
          <button
            key={o.key}
            onClick={() => onPick(o.key)}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-forest-gradient text-primary-foreground font-semibold text-[13px] shadow-md active:shadow-sm active:scale-95 duration-100 ease-out transition-all"
          >
            <span className="text-left">{o.label}</span>
            <ArrowLeft className="size-4 rotate-180 opacity-80" />
          </button>
        ))}
      </div>
    </>
  );
}

function MiniProductRow({
  p,
  onOrder,
}: {
  p: Item;
  onOrder: (item: Item, variant?: Variant) => void;
}) {
  const [selVariant, setSelVariant] = useState<string | undefined>(p.defaultVariant);
  const activeV = p.variants?.find((v) => v.label === selVariant);
  const priceLabel = activeV ? formatINR(activeV.price) : p.price;

  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl border border-border bg-card shadow-sm">
      <div className="size-14 rounded-xl bg-secondary/60 grid place-items-center overflow-hidden shrink-0">
        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] uppercase tracking-wider text-emerald font-bold">{p.category}</p>
        <h4 className="font-display font-bold text-forest-deep text-[12px] leading-tight line-clamp-1">
          {p.name}
        </h4>
        <p className="text-[10px] text-muted-foreground line-clamp-1">{p.tagline}</p>
        {p.variants && (
          <div className="mt-1 flex gap-1">
            {p.variants.map((v) => {
              const sel = v.label === selVariant;
              return (
                <button
                  key={v.label}
                  onClick={() => setSelVariant(v.label)}
                  className={`px-1.5 py-0.5 rounded-full text-[9px] font-semibold transition-all active:scale-95 duration-100 ${
                    sel
                      ? "bg-forest-gradient text-primary-foreground"
                      : "bg-secondary/60 text-forest-deep border border-border"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="font-display font-bold text-forest-deep text-[13px]">{priceLabel}</span>
        <button
          onClick={() => onOrder(p, activeV)}
          className="inline-flex items-center gap-1 rounded-full bg-forest-gradient text-primary-foreground px-2.5 py-1 text-[10px] font-semibold shadow-sm active:scale-95 active:shadow-none transition-all duration-100"
        >
          <ShoppingBag className="size-3" /> Order
        </button>
      </div>
    </div>
  );
}

function ProductList({
  products,
  onOrder,
}: {
  products: Item[];
  onOrder: (item: Item, variant?: Variant) => void;
}) {
  if (products.length === 0) {
    return <ChatBubble>Koi product available nahi hai abhi.</ChatBubble>;
  }
  return (
    <>
      <ChatBubble>Yeh rahe humare top recommendations 👇</ChatBubble>
      <div className="space-y-2">
        {products.map((p) => (
          <MiniProductRow key={p.name} p={p} onOrder={onOrder} />
        ))}
      </div>
    </>
  );
}

function BestProducts({
  onOrder,
}: {
  onOrder: (item: Item, variant?: Variant) => void;
}) {
  const ecoRoot = items.find((i) => i.name === "Eco Root");
  if (!ecoRoot) return <ChatBubble>Product not found.</ChatBubble>;
  return (
    <>
      <ChatBubble>
        Eco Root ek <b>premium product</b> hai jo fasal ki jado ka tezi se vikas karta hai aur mitti ki urvarata badhata hai. Ise istemal karne se fasal majboot aur swasth banti hai. 🌿
      </ChatBubble>
      <MiniProductRow p={ecoRoot} onOrder={onOrder} />
    </>
  );
}

function TalkToExpert() {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    setConnected(false);
    const t = setTimeout(() => setConnected(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-4 px-2">
      {!connected ? (
        <>
          <div className="size-16 rounded-full bg-emerald/10 grid place-items-center animate-pulse">
            <Phone className="size-7 text-emerald animate-pulse" />
          </div>
          <p className="mt-4 text-[13px] font-semibold text-forest-deep">
            Finding our kisaan sathi expert...
          </p>
        </>
      ) : (
        <>
          <div className="size-16 rounded-full bg-emerald/15 grid place-items-center animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="size-10 text-emerald" />
          </div>
          <p className="mt-4 text-[13px] font-bold text-forest-deep leading-snug">
            हमारे एक्सपर्ट बात करने के लिए उपलब्ध हैं।
          </p>
          <a
            href={`tel:${EXPERT_DIAL_NUMBER}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 h-11 rounded-full bg-forest-gradient text-primary-foreground font-semibold text-[13px] shadow-md active:shadow-sm active:scale-95 transition-all duration-100"
          >
            <Phone className="size-4" /> Call Expert Now
          </a>
          <p className="mt-2 text-[11px] text-muted-foreground">
            +91 {EXPERT_DIAL_NUMBER}
          </p>
        </>
      )}
    </div>
  );
}
