import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, CalendarCheck, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs: Array<{ to: "/home" | "/explore" | "/planner" | "/favorites" | "/profile"; label: string; Icon: typeof Home; primary?: boolean }> = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/explore", label: "Explore", Icon: Compass },
  { to: "/planner", label: "Planner", Icon: CalendarCheck, primary: true },
  { to: "/favorites", label: "Saved", Icon: Heart },
  { to: "/profile", label: "Profile", Icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.25rem)" }}
    >
      <div className="mx-3 mb-3 rounded-3xl border border-[color:var(--gold)]/25 bg-[color:var(--surface)]/70 shadow-[var(--shadow-sheet)] backdrop-blur-xl">
        <ul className="grid grid-cols-5 items-end px-2 py-2">
          {tabs.map(({ to, label, Icon, primary }) => {
            const active = pathname === to;
            if (primary) {
              return (
                <li key={to} className="flex justify-center">
                  <Link
                    to={to}
                    aria-label={label}
                    className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-200 active:scale-95"
                    style={{ background: "linear-gradient(140deg, oklch(0.86 0.13 90) 0%, oklch(0.72 0.14 78) 100%)" }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </Link>
                </li>
              );
            }
            return (
              <li key={to}>
                <Link
                  to={to}
                  aria-label={label}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[11px] font-medium transition-colors duration-200",
                    active ? "text-[color:var(--gold)]" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.2 : 1.7} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
