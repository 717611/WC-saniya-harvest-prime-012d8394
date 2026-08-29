import { useEffect, useState, type ReactNode, Children } from "react";
import { ArrowLeft, X, Phone, CheckCircle2, ShoppingBag } from "lucide-react";
import avatar from "@/assets/kisan-saathi-avatar.png";
import {
  items,
  formatINR,
  EXPERT_DIAL_NUMBER,
  type Item,
  type Variant,
} from "@/data/products-catalog";

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

          {/* Body — keyed by state so typing + stagger restart on each transition */}
          <div key={state} className="flex-1 overflow-y-auto p-3 space-y-3">
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

/* ---------- Typing bubble ---------- */

// Renders text with **bold** segments preserved.
function renderRich(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <b key={i}>{p.slice(2, -2)}</b>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

function TypingBubble({
  text,
  onDone,
  speed = 18,
}: {
  text: string;
  onDone?: () => void;
  speed?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  const shown = text.slice(0, count);
  const done = count >= text.length;

  return (
    <div className="flex items-start gap-2">
      <img
        src={avatar}
        alt=""
        className="size-7 rounded-full object-cover ring-1 ring-emerald/50 shrink-0 mt-0.5"
      />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary/60 border border-border px-3 py-2 text-[12px] text-forest-deep leading-relaxed">
        {renderRich(shown)}
        {!done && (
          <span className="inline-block w-[6px] h-[12px] align-[-1px] ml-0.5 bg-forest-deep/70 animate-pulse" />
        )}
      </div>
    </div>
  );
}

/* ---------- Stagger wrapper ---------- */

function Stagger({
  children,
  step = 70,
  delayStart = 0,
}: {
  children: ReactNode;
  step?: number;
  delayStart?: number;
}) {
  const kids = Children.toArray(children);
  return (
    <>
      {kids.map((child, i) => (
        <div
          key={i}
          className="animate-in fade-in slide-in-from-bottom-2 duration-200 ease-out fill-mode-both"
          style={{ animationDelay: `${delayStart + i * step}ms` }}
        >
          {child}
        </div>
      ))}
    </>
  );
}

/* ---------- States ---------- */

function MukhyaMenu({ onPick }: { onPick: (s: ChatState) => void }) {
  const [revealed, setRevealed] = useState(false);
  const options: { key: ChatState; label: string }[] = [
    { key: "fertilizer", label: "🌾 Fertilizer (खाद) salah" },
    { key: "beej", label: "🌱 Beej salah" },
    { key: "best", label: "🌟 Best Products" },
    { key: "expert", label: "📞 Talk to Expert" },
  ];
  return (
    <>
      <TypingBubble
        text="Namaste 🙏 Main apka **kisaan sathi**, kheti se judi samasya me madad kar sakta hoon."
        onDone={() => setRevealed(true)}
      />
      {revealed && (
        <div className="space-y-2 pt-1">
          <Stagger>
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
          </Stagger>
        </div>
      )}
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
  const [revealed, setRevealed] = useState(false);
  if (products.length === 0) {
    return <TypingBubble text="Koi product available nahi hai abhi." />;
  }
  return (
    <>
      <TypingBubble
        text="Yeh rahe humare top recommendations 👇"
        onDone={() => setRevealed(true)}
      />
      {revealed && (
        <div className="space-y-2">
          <Stagger>
            {products.map((p) => (
              <MiniProductRow key={p.name} p={p} onOrder={onOrder} />
            ))}
          </Stagger>
        </div>
      )}
    </>
  );
}

function BestProducts({ onOrder }: { onOrder: (item: Item, variant?: Variant) => void }) {
  const [revealed, setRevealed] = useState(false);
  const ecoRoot = items.find((i) => i.name === "Eco Root");
  if (!ecoRoot) return <TypingBubble text="Product not found." />;
  return (
    <>
      <TypingBubble
        text="Eco Root ek **premium product** hai jo fasal ki jado ka tezi se vikas karta hai aur mitti ki urvarata badhata hai. Ise istemal karne se fasal majboot aur swasth banti hai. 🌿"
        onDone={() => setRevealed(true)}
      />
      {revealed && (
        <Stagger>
          <MiniProductRow p={ecoRoot} onOrder={onOrder} />
        </Stagger>
      )}
    </>
  );
}

function TalkToExpert() {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    setConnected(false);
    const t = setTimeout(() => setConnected(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-4 px-2">
      {!connected ? (
        <>
          <div className="size-16 rounded-full bg-emerald/10 grid place-items-center animate-pulse">
            <Phone className="size-7 text-emerald animate-pulse" />
          </div>
          <div className="mt-4 w-full">
            <TypingBubble text="Finding our kisaan sathi expert..." />
          </div>
        </>
      ) : (
        <>
          <div className="size-16 rounded-full bg-emerald/15 grid place-items-center animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="size-10 text-emerald" />
          </div>
          <p className="mt-4 text-[13px] font-bold text-forest-deep leading-snug animate-in fade-in slide-in-from-bottom-2 duration-200">
            हमारे एक्सपर्ट बात करने के लिए उपलब्ध हैं।
          </p>
          <a
            href={`tel:${EXPERT_DIAL_NUMBER}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 h-11 rounded-full bg-forest-gradient text-primary-foreground font-semibold text-[13px] shadow-md active:shadow-sm active:scale-95 transition-all duration-100 animate-in fade-in slide-in-from-bottom-2 duration-200"
            style={{ animationDelay: "70ms" }}
          >
            <Phone className="size-4" /> Call Expert Now
          </a>
          <p className="mt-2 text-[11px] text-muted-foreground">+91 {EXPERT_DIAL_NUMBER}</p>
        </>
      )}
    </div>
  );
}
