import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Compass } from "lucide-react";
import splashMark from "@/assets/splash-mark.jpg";
import { useOnboarded } from "@/lib/favorites";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const { done } = useOnboarded();
  useEffect(() => {
    if (done === null) return;
    const t = setTimeout(() => {
      navigate({ to: done ? "/home" : "/onboarding" });
    }, 1400);
    return () => clearTimeout(t);
  }, [done, navigate]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-primary text-primary-foreground">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, oklch(0.65 0.16 40 / 0.55), transparent 55%), radial-gradient(circle at 80% 80%, oklch(0.78 0.14 80 / 0.35), transparent 60%)",
        }}
      />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-8 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md shadow-[var(--shadow-hero)] animate-slide-up-fade">
          <Compass className="h-12 w-12" strokeWidth={2.2} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 animate-slide-up-fade">
          Chhattisgarh Edition
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight animate-slide-up-fade">
          City Discovery
        </h1>
        <p className="mt-3 max-w-xs text-sm text-white/80 animate-slide-up-fade">
          Discover Raipur like a local. Temples, food, parks, and every hidden gem in between.
        </p>

        <img src={splashMark} alt="" aria-hidden className="mt-10 h-40 w-40 rounded-full object-cover opacity-90 shadow-[var(--shadow-hero)] animate-slide-up-fade" />

        <Link
          to={done ? "/home" : "/onboarding"}
          className="mt-10 rounded-full bg-white/95 px-6 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-hero)] animate-slide-up-fade"
        >
          Skip intro
        </Link>
      </div>
    </div>
  );
}
