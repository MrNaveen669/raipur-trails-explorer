import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Star, Crown, Settings, HelpCircle, ChevronRight, MapPin, Sparkles, BadgeCheck, RefreshCw, RotateCcw, Gem } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { useFavorites } from "@/lib/favorites";
import { usePremium } from "@/lib/premium";
import { toast } from "sonner";
import { myReviews } from "@/data/reviews";


export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — City Discovery" }] }),
  component: Profile,
});

function Profile() {
  const { count } = useFavorites();
  const { active, cancel } = usePremium();
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

      {/* Premium */}
      {active ? (
        <div className="mx-4 -mt-4 rounded-3xl p-5 glass-card animate-slide-up-fade">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground"
              style={{ background: "linear-gradient(140deg, oklch(0.86 0.14 88), oklch(0.66 0.13 78))", boxShadow: "var(--shadow-gold)" }}
            >
              <Crown className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <div className="flex-1">
              <p className="font-display text-base font-semibold">👑 Premium Member</p>
              <p className="text-xs text-muted-foreground">₹79/month · Renews automatically</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold gold-border">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} /> Active
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <PremiumAction Icon={Settings} label="Manage Membership" onClick={() => { cancel(); toast("Membership cancelled (prototype)."); }} />
            <PremiumAction Icon={RefreshCw} label="Renew Plan" onClick={() => toast.success("Plan renewed for 30 days.")} />
            <PremiumAction Icon={RotateCcw} label="Restore Purchase" onClick={() => toast.success("Purchase restored.")} />
            <PremiumAction Icon={Gem} label="Premium Benefits" to="/premium" />
          </div>
        </div>
      ) : (
        <Link
          to="/premium"
          className="mx-4 -mt-4 block overflow-hidden rounded-3xl p-5 glass-card animate-slide-up-fade transition-transform duration-200 active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground"
              style={{ background: "linear-gradient(140deg, oklch(0.86 0.14 88), oklch(0.66 0.13 78))", boxShadow: "var(--shadow-gold)" }}
            >
              <Crown className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <div className="flex-1">
              <p className="font-display text-base font-semibold">👑 Upgrade to My City Premium</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-gold">
                Explore Smarter • Travel Better • Experience More
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Only <span className="font-display text-lg font-semibold text-gold">₹79</span>/month
            </p>
            <span
              className="rounded-full px-5 py-2.5 text-xs font-semibold text-primary-foreground"
              style={{ background: "linear-gradient(120deg, oklch(0.86 0.14 88), oklch(0.70 0.13 80))", boxShadow: "var(--shadow-gold)" }}
            >
              Upgrade Now
            </span>
          </div>
        </Link>
      )}



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

function PremiumAction({ Icon, label, onClick, to }: { Icon: typeof Bookmark; label: string; onClick?: () => void; to?: "/premium" }) {
  const cls =
    "flex items-center gap-2 rounded-2xl bg-gold/10 px-3 py-2.5 text-left text-[11px] font-semibold transition-transform duration-200 active:scale-[0.97] gold-border";
  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.8} />
      <span className="flex-1 leading-tight">{label}</span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
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
