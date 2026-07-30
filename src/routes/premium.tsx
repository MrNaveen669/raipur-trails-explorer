import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Crown, Check, ChevronLeft, Loader2, BadgeCheck } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { usePremium } from "@/lib/premium";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "My City Premium — Ad-Free & AI Trip Planner" },
      { name: "description", content: "Unlock My City Premium for ₹79/month: ad-free browsing, AI smart trip planner, exclusive local offers and priority support." },
      { property: "og:title", content: "My City Premium — Ad-Free & AI Trip Planner" },
      { property: "og:description", content: "Unlock My City Premium for ₹79/month: ad-free browsing, AI smart trip planner and exclusive local offers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Premium,
});

const BENEFITS = [
  "Ad-Free Experience",
  "AI Smart Trip Planner",
  "Unlimited Planner Access",
  "Exclusive Local Offers & Coupons",
  "Premium Place Recommendations",
  "Early Access to New Features",
  "Save Unlimited Favourite Places",
  "Priority Customer Support",
  "Premium Profile Badge",
  "Special Festival & Event Notifications",
];

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

  if (stage === "success") return <SuccessView onContinue={() => router.navigate({ to: "/profile" })} />;

  return (
    <MobileShell showNav={false}>
      <div className="relative px-5 pb-16 pt-6">
        <button
          onClick={() => router.history.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full glass-card"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5 text-gold" strokeWidth={1.7} />
        </button>

        {/* Crown hero */}
        <div className="mt-6 flex flex-col items-center text-center animate-slide-up-fade">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gold/20 animate-pulse-ring" />
            <span className="absolute inset-2 rounded-full bg-gold/10" />
            <span
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(140deg, oklch(0.86 0.14 88), oklch(0.66 0.13 78))", boxShadow: "var(--shadow-gold)" }}
            >
              <Crown className="h-10 w-10 text-primary-foreground" strokeWidth={1.6} />
            </span>
          </div>

          <span className="mt-5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold gold-border">
            Most Popular
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold">My City Premium</h1>
          <p className="mt-1 text-sm text-muted-foreground">Explore the city like a true insider.</p>

          <div className="mt-4 flex items-end gap-1">
            <span className="font-display text-5xl font-semibold text-gold">₹79</span>
            <span className="pb-2 text-sm text-muted-foreground">/month</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 rounded-3xl p-5 glass-card animate-slide-up-fade">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Premium Benefits</p>
          <ul className="mt-4 space-y-3">
            {BENEFITS.map((b, i) => (
              <li key={b} className="flex items-start gap-3 animate-slide-up-fade" style={{ animationDelay: `${i * 40}ms` }}>
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2.2} />
                </span>
                <span className="text-sm leading-6">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Prototype only — no real payment is processed. Cancel anytime.
        </p>
      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] px-5 pb-6 pt-4"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}>
        <button
          onClick={buy}
          disabled={stage === "loading"}
          className="relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl font-display text-base font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.98] disabled:opacity-90"
          style={{ background: "linear-gradient(120deg, oklch(0.86 0.14 88), oklch(0.70 0.13 80))", boxShadow: "var(--shadow-gold)" }}
        >
          {stage === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} />
              Processing payment…
            </>
          ) : (
            <>
              <Crown className="h-5 w-5" strokeWidth={1.8} />
              Upgrade for ₹79
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
        {/* confetti */}
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
            style={{ background: "linear-gradient(140deg, oklch(0.86 0.14 88), oklch(0.66 0.13 78))", boxShadow: "0 0 60px -8px oklch(0.82 0.14 85 / 0.8)" }}
          >
            <Check className="h-12 w-12 text-primary-foreground animate-check-pop" strokeWidth={2.6} />
          </span>
        </div>

        <h1 className="mt-8 font-display text-3xl font-semibold animate-slide-up-fade">Welcome to My City Premium!</h1>
        <p className="mt-2 text-sm text-muted-foreground animate-slide-up-fade">Your Premium Membership is now active.</p>

        <div className="mt-6 flex items-center gap-2 rounded-full px-4 py-2 glass-card animate-slide-up-fade">
          <BadgeCheck className="h-4 w-4 text-gold" strokeWidth={1.8} />
          <span className="text-xs font-semibold text-gold">Premium Member · Active</span>
        </div>

        <button
          onClick={onContinue}
          className="mt-10 h-14 w-full max-w-xs rounded-2xl font-display text-base font-semibold text-primary-foreground transition-transform duration-200 active:scale-[0.98]"
          style={{ background: "linear-gradient(120deg, oklch(0.86 0.14 88), oklch(0.70 0.13 80))", boxShadow: "var(--shadow-gold)" }}
        >
          Continue
        </button>
      </div>
    </MobileShell>
  );
}
