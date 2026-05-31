## Goal
Add a self-contained "Kisan Saathi" guided chatbot widget mounted on `/products`, driven by a client-side state machine, reusing the existing product catalog and order-processing pipeline (no duplication, no LLM).

## Architecture

### Shared module extraction (to avoid duplication)
Extract from `src/routes/products.tsx` into reusable modules:

1. **`src/data/products-catalog.ts`** — move `Item`, `Variant`, `Category` types, the `items` array, all image imports, `WHATSAPP_NUMBER`, and the `formatINR` helper. Re-export and import back into `products.tsx`.
2. **`src/components/order/OrderFlowModal.tsx`** — extract the existing modal (form → 3-step processing → success → WhatsApp handoff) into a controlled component with `(open, target, onClose)` props. Reuse in both `products.tsx` and the chatbot. The 3-second processing pipeline (Availability → Coverage → Reference ID) and the WhatsApp message format stay identical.
3. **`src/hooks/useOrderFlow.ts`** — small hook exposing `{ orderTarget, openOrder, closeOrder, modalProps }` so any surface can trigger the identical flow.

This guarantees the chatbot's "Order Now" routes through the exact same pipeline.

### Chatbot widget
New folder `src/components/kisan-saathi/`:

```
kisan-saathi/
  KisanSaathiWidget.tsx     // main container + state machine + mount
  FloatingBadge.tsx         // circular avatar + bouncing "Namaste" bubble
  ChatShell.tsx             // glassmorphic card frame, header (avatar, back, X)
  states/
    MukhyaMenu.tsx          // State 0
    FertilizerSalah.tsx     // State 1
    BeejSalah.tsx           // State 2
    BestProducts.tsx        // State 3 (Eco Root spotlight)
    TalkToExpert.tsx        // State 4
  types.ts                  // ChatState union
```

Avatar asset: copy `user-uploads://1780256934556.png` → `src/assets/kisan-saathi-avatar.png` and import as ES6 module (the spec says `.jpg` but the actual upload is `.png`).

### State machine
Single `useState<ChatState>` in `KisanSaathiWidget`:
```ts
type ChatState = "menu" | "fertilizer" | "beej" | "best" | "expert";
```
- Header shows back arrow whenever `state !== "menu"`.
- Each state renders pill-style action buttons; no text input field anywhere.
- `active:scale-95 duration-100 ease-out` on every tile.

### Data wiring
- **Fertilizer state**: `items.filter(i => i.category === "Fertilizers")`.
- **Beej state**: `items.filter(i => i.category === "Seeds")`.
- **Best Products state**: `items.find(i => i.name === "Eco Root")` with the Hinglish summary card and variant selector reusing the same variant logic.
- All "Order Now" buttons call `openOrder(item, variant)` from the shared hook, which mounts the same modal over the chatbot.

### Talk to Expert flow
Local `useState` for animation phase:
- 0–1.5s: pulsing `Phone` icon + "Finding our kisaan sathi expert..."
- 1.5s+: `CheckCircle2` + "हमारे एक्सपर्ट बात करने के लिए उपलब्ध हैं।"
- Primary CTA `<a href="tel:8852003393">` + secondary "Back to menu" button.

## Positioning & styling

- Widget root: `fixed bottom-20 right-4 z-50` (above the sticky `BottomNav` which typically sits at `bottom-0` h≈64px → 80px clearance).
- **Floating badge**: 56px circular `img` clipped with `rounded-full ring-2 ring-emerald shadow-elegant`. Pop-up bubble absolutely positioned above it (`-top-10`) with `animate-bounce` and a tail.
- **Chat panel**: `w-[360px] max-w-[90vw] max-h-[60vh]` with `bg-white/95 backdrop-blur-md border border-stone-200/80 rounded-3xl shadow-elegant flex flex-col`. Header (sticky) + scrollable body (`overflow-y-auto`). No footer input.
- Open/close: badge ↔ panel mutually exclusive via local boolean `isOpen`.
- Tailwind animations only (`animate-in fade-in zoom-in-95`, `animate-bounce`). Zero new deps.

## Mount point
At the end of the returned fragment in `ProductsPage` (`src/routes/products.tsx`), after the `OrderFlowModal`, mount `<KisanSaathiWidget />`. The widget owns its own `useOrderFlow` instance or — cleaner — receives `onOrder` as a prop so a single modal instance services both surfaces. **Chosen approach**: lift `useOrderFlow` into `ProductsPage`, pass `openOrder` to both `ProductCard` and `KisanSaathiWidget`, render one `<OrderFlowModal {...modalProps} />`.

## Files touched

Created:
- `src/data/products-catalog.ts`
- `src/components/order/OrderFlowModal.tsx`
- `src/hooks/useOrderFlow.ts`
- `src/components/kisan-saathi/KisanSaathiWidget.tsx`
- `src/components/kisan-saathi/FloatingBadge.tsx`
- `src/components/kisan-saathi/ChatShell.tsx`
- `src/components/kisan-saathi/states/{MukhyaMenu,FertilizerSalah,BeejSalah,BestProducts,TalkToExpert}.tsx`
- `src/components/kisan-saathi/types.ts`
- `src/assets/kisan-saathi-avatar.png` (copied)

Edited:
- `src/routes/products.tsx` — replace inline `items`/types/`formatINR`/`WHATSAPP_NUMBER` and modal JSX with imports + extracted components; mount widget.

No router, config, dep, or other route changes.

## Acceptance
- Badge sits above bottom nav on mobile 728×496, never overlaps it.
- Tapping badge opens a 360px / max-60vh glassmorphic panel; back/X work; no text input is visible.
- Each state pulls live data from the shared catalog (changing a price in `items` updates both grid and chatbot).
- "Order Now" from any chatbot card triggers the identical 3-step processing animation, generates `SAS-2026-####`, and opens the same WhatsApp deep link to `919413050436`.
- Talk-to-Expert animation hits the dialer at `tel:8852003393`.
- Type-check clean; products page renders unchanged visually aside from the new floating widget.
