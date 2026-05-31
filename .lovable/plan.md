Re-skin the BottomNav component with the new dark forest glassmorphism brand identity while preserving all routing, layout, and interaction logic.

1. **Container (nav element)**
   - Replace `bg-white/70` with `bg-[#0a1e0f]/82`.
   - Replace `backdrop-blur-xl` with `backdrop-blur-[20px] backdrop-saturate-[180%]`.
   - Replace `border-white/40` with `border-white/[0.08]`.

2. **Active tab Link**
   - Replace `bg-forest-gradient text-primary-foreground` with `bg-[#1a6b3a] text-white`.
   - Add `shadow-[0_0_12px_rgba(26,107,58,0.6)]`.
   - Remove `shadow-card` (superseded by new glow).

3. **Inactive tab Link**
   - Replace `text-forest-deep/70 hover:text-forest-deep` with `text-white/55`.

4. **Safety checks**
   - Keep `active:scale-95 transition-all duration-100 ease-out` on the Kisan Saathi widget as-is (it lives in a separate component).
   - Verify no `z-index` or positioning changes are needed; the widget at `bottom-20` already clears the nav at `bottom-6`.
   - Confirm no changes to `tabs` array, `Link` `to` props, `pathname` logic, or responsive `md:hidden` behavior.

Only file edited: `src/components/site/BottomNav.tsx`.