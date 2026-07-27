import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, Heart, MapPin, ChevronRight } from "lucide-react";
import { useOnboarded } from "@/lib/favorites";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — City Discovery" }] }),
  component: Onboarding,
});

const slides = [
  {
    Icon: Compass,
    eyebrow: "Discover",
    title: "Raipur, curated.",
    body: "Handpicked temples, restaurants, parks and offbeat gems — organised the way locals actually explore.",
    tint: "oklch(0.36 0.06 155)",
  },
  {
    Icon: Heart,
    eyebrow: "Save",
    title: "Build your list.",
    body: "Save places to collections. Access them anywhere — even before your next trip is booked.",
    tint: "oklch(0.65 0.16 40)",
  },
  {
    Icon: MapPin,
    eyebrow: "Navigate",
    title: "Go, effortlessly.",
    body: "One-tap directions, live open hours, and nearby recommendations for every place you visit.",
    tint: "oklch(0.55 0.14 220)",
  },
];

function Onboarding() {
  const [i, setI] = useState(0);
  const { complete } = useOnboarded();
  const navigate = useNavigate();
  const slide = slides[i];
  const Icon = slide.Icon;
  const isLast = i === slides.length - 1;

  const goHome = () => {
    const adShown = typeof window !== "undefined" && sessionStorage.getItem("cd:ad-shown") === "1";
    navigate({ to: adShown ? "/home" : "/ad" });
  };

  const advance = () => {
    if (isLast) {
      complete();
      goHome();
    } else {
      setI(i + 1);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex items-center justify-end px-5 pt-5">
        <button
          onClick={() => { complete(); goHome(); }}
          className="text-sm font-semibold text-muted-foreground"
        >
          Skip
        </button>

      </div>

      <div key={i} className="flex flex-1 flex-col items-center justify-center px-8 text-center animate-slide-up-fade">
        <div
          className="mb-8 flex h-32 w-32 items-center justify-center rounded-3xl text-white shadow-[var(--shadow-hero)]"
          style={{ backgroundColor: slide.tint }}
        >
          <Icon className="h-14 w-14" strokeWidth={2} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{slide.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-balance">{slide.title}</h1>
        <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground text-balance">{slide.body}</p>
      </div>

      <div className="px-6 pb-10 pt-6">
        <div className="mb-6 flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
        <button
          onClick={advance}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-[var(--shadow-hero)] transition-transform active:scale-[0.99]"
        >
          {isLast ? "Get started" : "Next"}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
