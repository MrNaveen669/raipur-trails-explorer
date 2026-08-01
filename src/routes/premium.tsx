import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  Crown,
  Check,
  ChevronLeft,
  Loader2,
  Sparkles,
  Route as RouteIcon,
  Compass,
  Heart,
  Zap,
  Clock,
  X,
  ShieldCheck,
} from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { usePremium } from "@/lib/premium";
import { toast } from "sonner";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "My City Premium — Explore Smarter, Travel Better" },
      { name: "description", content: "My City Premium at ₹79/month: AI trip planner, unlimited favourites, verified local tips, ad-free browsing and priority support." },
      { property: "og:title", content: "My City Premium — Explore Smarter, Travel Better" },
      { property: "og:description", content: "AI trip planner, unlimited favourites, verified local tips and an ad-free experience for ₹79/month." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Premium,
});

const GROUPS: { title: string; Icon: typeof Crown; items: string[]; soon?: boolean }[] = [
  {
    title: "Smart Planning",
    Icon: RouteIcon,
    items: [
      "AI Smart Trip Planner",
      "Unlimited Trip Planning",
      "Smart Route Optimization",
      "Personalized Recommendations",
      "Seasonal Travel Suggestions",
    ],
  },
  {
    title: "Premium Exploration",
    Icon: Compass,
    items: [
      "Premium Curated Places",
      "Early Access to New Features",
      "Premium Collections",
      "Verified Local Experience",
      "Best Time To Visit Tips",
      "Local Expert Recommendations",
    ],
  },
  {
    title: "Personal Features",
    Icon: Heart,
    items: [
      "Unlimited Favourites",
      "Unlimited Custom Lists",
      "Personal Travel Notes",
      "Visited Places Tracker",
    ],
  },
  {
    title: "Convenience",
    Icon: Zap,
    items: ["Ad-Free Experience", "Premium Badge", "Priority Support", "Faster Premium Experience"],
  },
  {
    title: "Coming Soon",
    Icon: Clock,
    soon: true,
    items: [
      "Restaurant Discounts",
      "Hotel Offers",
      "Cafe Coupons",
      "Event Discounts",
      "Cloud Backup",
      "Multi Device Sync",
    ],
  },
];

const FREE = ["Basic Explore", "Limited Planner", "Limited Favourites", "Ads"];
const PRO = [
  "Unlimited Planner",
  "Unlimited Favourites",
  "AI Planner",
  "Verified Local Tips",
  "Premium Badge",
  "Ad-Free Experience",
  "Priority Support",
  "Early Access",
];

const GOLD_GRADIENT = "linear-gradient(120deg, oklch(0.86 0.14 88), oklch(0.70 0.13 80))";

type Stage = "idle" | "loading" | "success";

function Premium() {
  const router = useRouter();
  const { activate } = usePremium();
  const [stage, setStage] = useState<Stage>("idle");

  const buy = () => {
    setStage("loading");
    setTimeout(() => {
      activate();
      setStage("success");
    }, 2000);
  };

  if (stage === "success") {
    return (
      <SuccessView
        onContinue={() => {
          toast.success("Premium membership activated.");
          router.navigate({ to: "/explore" });
        }}
      />
    );
  }

  return (
    <MobileShell showNav={false}>
      <div className="px-5 pb-40 pt-6">
        <button
          onClick={() => router.history.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full glass-card transition-transform duration-200 active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5 text-gold" strokeWidth={1.7} />
        </button>

        {/* Header */}
        <div className="mt-6 flex flex-col items-center text-center animate-slide-up-fade">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gold/20 animate-pulse-ring" />
            <span className="absolute inset-2 rounded-full bg-gold/10" />
            <span
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: GOLD_GRADIENT, boxShadow: "var(--shadow-gold)" }}
            >
              <Crown className="h-10 w-10 text-primary-foreground" strokeWidth={1.6} />
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold">My City Premium</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">
            Explore Smarter • Travel Better • Experience More
          </p>
        </div>

        {/* Pricing card */}
        <div className="mt-7 overflow-hidden rounded-3xl p-6 text-center glass-card animate-slide-up-fade">
          <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold gold-border">
            Most Popular
          </span>
          <div className="mt-4 flex items-end justify-center gap-1">
            <span className="font-display text-5xl font-semibold text-gold">₹79</span>
            <span className="pb-2 text-sm text-muted-foreground">/ Month</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Cancel Anytime</p>

          <button
            onClick={buy}
            disabled={stage === "loading"}
            className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-display text-base font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.98] disabled:opacity-90"
            style={{ background: GOLD_GRADIENT, boxShadow: "var(--shadow-gold)" }}
          >
            {stage === "loading" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} /> Processing…
              </>
            ) : (
              "Upgrade Now"
            )}
          </button>
          <button
            onClick={() => router.history.back()}
            className="mt-3 w-full rounded-2xl py-3 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Maybe Later
          </button>
        </div>

        {/* Benefit groups */}
        <div className="mt-8 space-y-4">
          {GROUPS.map((g, gi) => (
            <div
              key={g.title}
              className="rounded-3xl p-5 glass-card animate-slide-up-fade"
              style={{ animationDelay: `${gi * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <g.Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <p className="flex-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">{g.title}</p>
                {g.soon && (
                  <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold gold-border">
                    Coming Soon
                  </span>
                )}
              </div>
              <ul className="mt-4 space-y-3">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${g.soon ? "bg-muted" : "bg-gold/15"}`}
                    >
                      {g.soon ? (
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
                      ) : (
                        <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2.2} />
                      )}
                    </span>
                    <span className={`text-sm leading-6 ${g.soon ? "text-muted-foreground" : ""}`}>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-8 rounded-3xl p-5 glass-card animate-slide-up-fade">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Free vs Premium</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-muted/40 p-4">
              <p className="text-sm font-semibold">Free</p>
              <ul className="mt-3 space-y-2.5">
                {FREE.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                    {f === "Ads" ? (
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" strokeWidth={2.2} />
                    ) : (
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    )}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gold/10 p-4 gold-border">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gold">
                <Crown className="h-4 w-4" strokeWidth={1.8} /> Premium
              </p>
              <ul className="mt-3 space-y-2.5">
                {PRO.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs leading-5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2.2} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Why premium */}
        <div className="mt-6 rounded-3xl p-5 glass-card animate-slide-up-fade">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <p className="font-display text-lg font-semibold">Why Premium?</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Your Premium Membership helps us personally verify places, keep city information updated, improve app
            quality, and build the most trusted city guide experience.
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Prototype only — no real payment is processed. Cancel anytime.
        </p>
      </div>

      {/* Sticky CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] px-5 pb-6 pt-4"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
      >
        <button
          onClick={buy}
          disabled={stage === "loading"}
          className="relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl font-display text-base font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.98] disabled:opacity-90"
          style={{ background: GOLD_GRADIENT, boxShadow: "var(--shadow-gold)" }}
        >
          {stage === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} />
              Processing payment…
            </>
          ) : (
            <>
              <Crown className="h-5 w-5" strokeWidth={1.8} />
              Upgrade for ₹79/month
            </>
          )}
        </button>
      </div>
    </MobileShell>
  );
}

const CONFETTI = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 10) * 120,
  dur: 2200 + ((i * 173) % 1400),
  hue: i % 3,
  size: 6 + (i % 4) * 2,
}));

function SuccessView({ onContinue }: { onContinue: () => void }) {
  return (
    <MobileShell showNav={false}>
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="absolute top-[-8%] block rounded-[2px] animate-confetti"
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 1.8,
                animationDelay: `${c.delay}ms`,
                animationDuration: `${c.dur}ms`,
                background:
                  c.hue === 0 ? "var(--gold)" : c.hue === 1 ? "oklch(0.92 0.03 90)" : "oklch(0.60 0.14 220)",
              }}
            />
          ))}
        </div>

        <div className="relative flex h-32 w-32 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-gold/25 animate-pulse-ring" />
          <span
            className="relative flex h-24 w-24 items-center justify-center rounded-full animate-scale-in"
            style={{
              background: "linear-gradient(140deg, oklch(0.86 0.14 88), oklch(0.66 0.13 78))",
              boxShadow: "0 0 60px -8px oklch(0.82 0.14 85 / 0.8)",
            }}
          >
            <Check className="h-12 w-12 text-primary-foreground animate-check-pop" strokeWidth={2.6} />
          </span>
        </div>

        <h1 className="mt-8 font-display text-3xl font-semibold animate-slide-up-fade">
          🎉 Welcome to My City Premium
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground animate-slide-up-fade">
          Your Premium Membership has been activated successfully. You now have access to all Premium features.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-full px-4 py-2 glass-card animate-slide-up-fade">
          <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.8} />
          <span className="text-xs font-semibold text-gold">Premium Member · Active</span>
        </div>

        <button
          onClick={onContinue}
          className="mt-10 h-14 w-full max-w-xs rounded-2xl font-display text-base font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.98]"
          style={{ background: GOLD_GRADIENT, boxShadow: "var(--shadow-gold)" }}
        >
          Start Exploring
        </button>
      </div>
    </MobileShell>
  );
}
