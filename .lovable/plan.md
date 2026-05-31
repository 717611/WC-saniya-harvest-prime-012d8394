## Goal
Move the Kisan Saathi widget off the Products page onto the Home page, and add natural typing + staggered entrance animations inside the chat — without breaking the existing Order flow or modal.

## 1. Relocate widget to Home

**`src/routes/products.tsx`**
- Remove the `KisanSaathiWidget` import.
- Remove `<KisanSaathiWidget onOrder={openOrder} />` from the returned JSX.
- Keep `useOrderFlow()`, `{modal}`, and all `ProductCard` order wiring untouched (products grid still needs it).

**`src/routes/index.tsx`**
- Import `KisanSaathiWidget` and `useOrderFlow`.
- Inside `Index`, call `const { openOrder, modal } = useOrderFlow();`.
- Render `{modal}` and `<KisanSaathiWidget onOrder={openOrder} />` at the end of the returned fragment, so the order modal (form → 3-step processing → WhatsApp deep link) works seamlessly when a user taps "Order" from chat on the Home page.
- No router/config/dep changes. Widget stays `fixed bottom-20 right-4 z-[90]` so it floats above the bottom nav on every page where it's mounted (Home only now).

## 2. Natural typing + staggered reveals (scoped to `KisanSaathiWidget.tsx`)

Add two tiny presentational primitives inside the same file (no new files, no deps):

### a. `<TypingBubble text={...} onDone?={...} speed={18} />`
- Replaces `ChatBubble` usage for assistant messages in `MukhyaMenu`, `ProductList`, `BestProducts`, and the "Finding expert…" line in `TalkToExpert`.
- Internally uses `useState` + `useEffect` with `setInterval` to append characters at ~18ms/char (≈55 chars/sec — readable, not sluggish, not instant). Clears interval on unmount/re-trigger.
- While typing, shows a soft caret (`▍` with `animate-pulse`) at the end.
- Calls `onDone()` when complete so the parent can trigger the staggered reveal.
- Supports rich content by accepting a plain string OR a small structured payload (string with optional bold segments via a `**text**` marker → rendered with `<b>`); used for the existing bold Hinglish phrases.

### b. `<Stagger delayStart={0} step={70}>{children}</Stagger>`
- Wraps a list of items. Each direct child gets an inline `style={{ animationDelay: ... }}` and the classes `animate-in fade-in slide-in-from-bottom-2 duration-200 ease-out fill-mode-both`.
- Cascade step: 70ms per item (within the requested 50–100ms range).
- Used for:
  - The 4 menu pills in `MukhyaMenu`.
  - The `MiniProductRow` cards in `ProductList`.
  - The Eco Root card under the Hinglish description in `BestProducts`.

### Wiring per state
- `MukhyaMenu`: render `<TypingBubble>` first, hold the pills hidden until `onDone`, then mount the `<Stagger>` of buttons. Use a local `useState<boolean>('revealed')` reset on state entry.
- `ProductList`: same pattern — typing line "Yeh rahe humare top recommendations 👇", then staggered product rows.
- `BestProducts`: typing line with the Eco Root description, then a single staggered card (still benefits from the fade/slide entrance for consistency).
- `TalkToExpert`: animate the "Finding our kisaan sathi expert…" text via `TypingBubble`-style typing; once `connected` flips, the existing zoom-in success block already has an entrance animation — keep it.

### Reset behavior
- The `KisanSaathiWidget` already remounts state children on every `state` change. Keying each state subtree by `state` (`<div key={state}>` wrapper) guarantees typing + stagger restart cleanly when the user navigates back and forth.

### Performance
- Pure CSS transforms / opacity (`animate-in fade-in slide-in-from-bottom-2`) → GPU-accelerated.
- Typing uses one `setInterval` per active bubble, cleared on unmount. Negligible CPU.
- No new dependencies.

## Files touched

Edited only:
- `src/routes/products.tsx` — remove widget mount + import.
- `src/routes/index.tsx` — mount widget + order modal.
- `src/components/kisan-saathi/KisanSaathiWidget.tsx` — add `TypingBubble` + `Stagger`, rewire menu/product/best/expert states, key state subtree.

No new files, no config, no dependency, no router changes. Existing `useOrderFlow` hook, `OrderFlowModal` JSX, WhatsApp number, ref-ID generation, and Products page behaviour all unchanged.

## Acceptance
- Home page (`/`) shows the floating badge above the bottom nav; Products page no longer shows it.
- Tapping the badge opens chat; assistant text types in smoothly (~55 chars/sec) with a blinking caret; option pills / product rows cascade in 70ms apart immediately after.
- Navigating between states restarts the typing + stagger every time.
- Tapping "Order" inside chat from `/` opens the same 3-step `OrderFlowModal` and produces the identical WhatsApp deep link.
- Type-check clean; no visual regressions on Products page.
