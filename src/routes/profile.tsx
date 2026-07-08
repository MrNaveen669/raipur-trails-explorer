import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Star, Crown, Settings, HelpCircle, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { useFavorites } from "@/lib/favorites";
import { myReviews } from "@/data/reviews";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — City Discovery" }] }),
  component: Profile,
});

function Profile() {
  const { count } = useFavorites();
  return (
    <MobileShell>
      {/* Header card */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 h-48" style={{ background: "linear-gradient(140deg, oklch(0.36 0.06 155), oklch(0.28 0.05 155))" }} />
        <div className="relative px-5 pt-8 pb-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <img
              src="https://api.dicebear.com/9.x/initials/svg?seed=Ananya&backgroundColor=e85d3a&textColor=ffffff"
              alt=""
              className="h-16 w-16 rounded-2xl bg-white/20 shadow-lg ring-4 ring-white/20"
            />
            <div>
              <h1 className="font-display text-2xl font-semibold">Ananya Sharma</h1>
              <p className="flex items-center gap-1 text-xs text-white/85"><MapPin className="h-3.5 w-3.5" /> Raipur, CG</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat n={count} label="Saved" />
            <Stat n={myReviews.length} label="Reviews" />
            <Stat n={12} label="Visited" />
          </div>
        </div>
      </div>

      {/* Premium CTA */}
      <div className="mx-4 -mt-4 rounded-3xl border border-gold/40 bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-gold">
            <Crown className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Go Premium</p>
            <p className="text-xs text-muted-foreground">Offline maps, no ads, exclusive itineraries.</p>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Upgrade</button>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-2 px-4">
        <Row to="/favorites" Icon={Bookmark} label="Saved places" hint={`${count} places`} />
        <Row to="/reviews" Icon={Star} label="Your reviews" hint={`${myReviews.length}`} />
        <Row to="/settings" Icon={Settings} label="Settings" />
        <Row to="/settings" Icon={HelpCircle} label="Help & support" />
        <Row to="/settings" Icon={Sparkles} label="What's new" />
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">City Discovery v1.0 · Chhattisgarh Edition</p>
    </MobileShell>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-2xl bg-white/12 p-3 text-center backdrop-blur-md">
      <p className="font-display text-2xl font-semibold">{n}</p>
      <p className="text-[11px] uppercase tracking-wider text-white/80">{label}</p>
    </div>
  );
}

function Row({ to, Icon, label, hint }: { to: "/favorites" | "/reviews" | "/settings"; Icon: typeof Bookmark; label: string; hint?: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-card)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1 text-sm font-semibold">{label}</span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
