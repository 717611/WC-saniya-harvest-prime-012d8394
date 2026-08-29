import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ShoppingBag, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: ShoppingBag },
  { to: "/about", label: "About", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md rounded-full bg-[#0a1e0f]/82 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/[0.08] shadow-2xl z-50 flex justify-around items-center p-2"
    >
      {tabs.map((t) => {
        const active = pathname === t.to;
        const Icon = t.icon;
        return (
          <Link
            key={t.to}
            to={t.to}
            className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
              active
                ? "bg-[#1a6b3a] text-white px-4 py-2.5 shadow-[0_0_12px_rgba(26,107,58,0.6)]"
                : "text-white/55 px-3 py-2.5"
            }`}
          >
            <Icon className="size-5 shrink-0" />
            {active && <span className="text-sm font-semibold whitespace-nowrap">{t.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
