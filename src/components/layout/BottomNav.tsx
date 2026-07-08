import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, Search, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/explore", label: "Explore", Icon: Compass },
  { to: "/search", label: "Search", Icon: Search, primary: true },
  { to: "/favorites", label: "Saved", Icon: Heart },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.25rem)" }}
    >
      <div className="mx-3 mb-3 rounded-3xl border border-border/70 bg-card/95 shadow-[var(--shadow-sheet)] backdrop-blur-lg">
        <ul className="grid grid-cols-5 items-end px-2 py-2">
          {tabs.map(({ to, label, Icon, primary }) => {
            const active = pathname === to || (to === "/home" && pathname === "/home");
            if (primary) {
              return (
                <li key={to} className="flex justify-center">
                  <Link
                    to={to}
                    aria-label={label}
                    className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-hero)] transition-transform active:scale-95"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
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
                    "flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[11px] font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5", active && "fill-primary/10")} strokeWidth={active ? 2.4 : 2} />
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
