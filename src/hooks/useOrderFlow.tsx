import { useEffect, useMemo, useState } from "react";
import { Loader2, Check, X, CheckCircle2 } from "lucide-react";
import {
  buildOrderTarget,
  WHATSAPP_NUMBER,
  type Item,
  type OrderTarget,
  type Variant,
} from "@/data/products-catalog";

type Stage = "form" | "processing" | "success";

export function useOrderFlow() {
  const [orderTarget, setOrderTarget] = useState<OrderTarget | null>(null);
  const [stage, setStage] = useState<Stage>("form");
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [refId, setRefId] = useState("");
  const [processingStep, setProcessingStep] = useState(0);

  const openOrder = (p: Item, variant?: Variant) => {
    setOrderTarget(buildOrderTarget(p, variant));
    setStage("form");
    setCustName("");
    setCustPhone("");
    setNameErr("");
    setPhoneErr("");
    setProcessingStep(0);
  };

  const closeOrder = () => setOrderTarget(null);

  const submitForm = () => {
    const name = custName.trim();
    const phone = custPhone.trim();
    let ok = true;
    if (name.length < 2) {
      setNameErr("Please enter your full name");
      ok = false;
    } else setNameErr("");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setPhoneErr("Enter a valid 10-digit Indian mobile number");
      ok = false;
    } else setPhoneErr("");
    if (!ok) return;
    setStage("processing");
  };

  useEffect(() => {
    if (stage !== "processing") return;
    setProcessingStep(0);
    const t1 = setTimeout(() => setProcessingStep(1), 1000);
    const t2 = setTimeout(() => setProcessingStep(2), 2000);
    const t3 = setTimeout(() => {
      const id = Math.floor(1000 + Math.random() * 9000);
      setRefId(`SAS-2026-${id}`);
      setStage("success");
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [stage]);

  const productLabel = orderTarget
    ? `${orderTarget.product.name}${orderTarget.variant ? ` (${orderTarget.variant.label})` : ""}`
    : "";

  const whatsappHref = useMemo(() => {
    if (!orderTarget) return "#";
    const message = [
      "Hello Saniya Agricultural Solutions,",
      "I would like to place an order.",
      `Reference Number: ${refId}`,
      `Product: ${productLabel}`,
      `Customer Name: ${custName.trim()}`,
      `Mobile Number: ${custPhone.trim()}`,
      "Please assist me with completing my order.",
    ].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [orderTarget, refId, productLabel, custName, custPhone]);

  const modal = orderTarget ? (
    <div
      className="fixed inset-0 z-[120] grid place-items-center p-4 bg-forest-deep/40 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={stage === "processing" ? undefined : closeOrder}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white/95 backdrop-blur-xl shadow-elegant p-5 animate-in zoom-in-95 fade-in duration-200"
      >
        {stage !== "processing" && (
          <button
            onClick={closeOrder}
            aria-label="Close"
            className="absolute top-3 right-3 size-8 grid place-items-center rounded-full bg-secondary/70 text-forest-deep active:scale-95 transition-all duration-100"
          >
            <X className="size-4" />
          </button>
        )}

        {stage === "form" && (
          <div>
            <h2 className="font-display font-bold text-forest-deep text-xl tracking-tight">
              Complete Your Order Request
            </h2>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Confirm your details to generate an order reference.
            </p>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-gradient-to-br from-secondary/60 to-card p-3">
              <div className="size-14 rounded-xl bg-white grid place-items-center overflow-hidden shrink-0 border border-border">
                <img
                  src={orderTarget.product.image}
                  alt={orderTarget.product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-emerald font-bold">
                  {orderTarget.product.category}
                </p>
                <h3 className="font-display font-bold text-forest-deep text-[14px] leading-tight line-clamp-1">
                  {orderTarget.product.name}
                </h3>
                {orderTarget.variant && (
                  <p className="text-[11px] text-muted-foreground">
                    Variant:{" "}
                    <span className="font-semibold text-forest-deep">
                      {orderTarget.variant.label}
                    </span>
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  Total
                </div>
                <div className="font-display font-bold text-forest-deep text-base">
                  {orderTarget.priceLabel}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-forest-deep">Full Name</label>
                <input
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  maxLength={80}
                  placeholder="e.g. Ramesh Kumar"
                  className="mt-1 w-full h-11 px-3 rounded-xl border border-border bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-emerald/40 transition-shadow duration-200"
                />
                {nameErr && <p className="mt-1 text-[11px] text-destructive">{nameErr}</p>}
              </div>
              <div>
                <label className="text-[11px] font-semibold text-forest-deep">Mobile Number</label>
                <div className="mt-1 flex items-center h-11 rounded-xl border border-border bg-white focus-within:ring-2 focus-within:ring-emerald/40 transition-shadow duration-200">
                  <span className="px-3 text-[13px] text-muted-foreground border-r border-border">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile"
                    className="flex-1 h-full px-3 bg-transparent text-[13px] focus:outline-none"
                  />
                </div>
                {phoneErr && <p className="mt-1 text-[11px] text-destructive">{phoneErr}</p>}
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={closeOrder}
                className="flex-1 h-11 rounded-full border border-border bg-card text-forest-deep font-semibold text-[13px] active:scale-95 transition-all duration-100"
              >
                Cancel
              </button>
              <button
                onClick={submitForm}
                className="flex-[1.4] h-11 rounded-full bg-forest-gradient text-primary-foreground font-semibold text-[13px] shadow-md active:shadow-sm active:scale-95 transition-all duration-100 ease-out"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div className="py-6">
            <div className="flex flex-col items-center text-center">
              <div className="size-14 rounded-full bg-emerald/10 grid place-items-center">
                <Loader2 className="size-7 text-emerald animate-spin" />
              </div>
              <h2 className="mt-3 font-display font-bold text-forest-deep text-lg">
                Processing Your Request
              </h2>
              <p className="text-[12px] text-muted-foreground animate-pulse">
                Please hold on a moment…
              </p>
            </div>

            <ol className="mt-6 space-y-3">
              {[
                "Verifying Product Availability",
                "Checking Service Coverage",
                "Generating Order Reference",
              ].map((label, i) => {
                const done = processingStep > i;
                const active = processingStep === i;
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                      done
                        ? "border-emerald/30 bg-emerald/5"
                        : active
                          ? "border-forest/30 bg-secondary/60"
                          : "border-border bg-card opacity-60"
                    }`}
                  >
                    <div className="size-7 rounded-full grid place-items-center bg-white border border-border">
                      {done ? (
                        <Check className="size-4 text-emerald" />
                      ) : active ? (
                        <Loader2 className="size-4 text-forest animate-spin" />
                      ) : (
                        <span className="size-2 rounded-full bg-muted-foreground/40" />
                      )}
                    </div>
                    <span
                      className={`text-[13px] font-medium ${
                        active ? "text-forest-deep animate-pulse" : "text-forest-deep"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {stage === "success" && (
          <div className="text-center">
            <div className="mx-auto size-16 rounded-full bg-emerald/15 grid place-items-center animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="size-10 text-emerald" />
            </div>
            <h2 className="mt-3 font-display font-bold text-forest-deep text-xl tracking-tight">
              Order Request Generated Successfully
            </h2>

            <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-4 text-left space-y-2">
              <div className="flex justify-between gap-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Reference
                </span>
                <span className="font-display font-bold text-forest-deep text-[13px]">{refId}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Product
                </span>
                <span className="font-semibold text-forest-deep text-[13px] text-right">
                  {productLabel}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Customer
                </span>
                <span className="font-semibold text-forest-deep text-[13px]">
                  {custName.trim()}
                </span>
              </div>
            </div>

            <p className="mt-4 text-[12px] text-muted-foreground leading-relaxed">
              Please continue on WhatsApp to complete your order. Our agricultural specialist will
              assist you with quantity, delivery details and order confirmation.
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 h-12 rounded-full bg-forest-gradient text-primary-foreground font-semibold text-[14px] tracking-tight shadow-md active:shadow-sm active:scale-95 transition-all duration-100 ease-out"
            >
              Continue on WhatsApp
            </a>
            <button
              onClick={closeOrder}
              className="mt-2 w-full h-10 rounded-full text-forest-deep/70 text-[12px] font-medium active:scale-95 transition-all duration-100"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;

  return { openOrder, closeOrder, modal };
}
