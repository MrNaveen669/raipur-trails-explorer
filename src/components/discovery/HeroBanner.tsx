import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bell, MapPin, Star, TrendingUp } from "lucide-react";
import nayaRaipurImg from "@/assets/city-naya-raipur.jpg";
import marineDriveImg from "@/assets/hero-marine-drive.jpg";
import magnetoImg from "@/assets/hero-magneto-mall.jpg";
import ghataraniImg from "@/assets/hero-ghatarani.jpg";
import funCityImg from "@/assets/hero-fun-city.jpg";

const SLIDES = [
  { name: "Naya Raipur", tagline: "India's smartest planned city", rating: 4.7, distance: "24.0 km", img: nayaRaipurImg },
  { name: "Marine Drive Raipur", tagline: "Lakeside lights & evening strolls", rating: 4.6, distance: "3.2 km", img: marineDriveImg },
  { name: "Magneto Mall", tagline: "Shop, dine and unwind under one roof", rating: 4.5, distance: "5.8 km", img: magnetoImg },
  { name: "Ghatarani Waterfall", tagline: "Monsoon cascades in deep forest", rating: 4.8, distance: "86.4 km", img: ghataraniImg },
  { name: "MM Fun City", tagline: "Rides, slides and neon nights", rating: 4.4, distance: "12.1 km", img: funCityImg },
];

const INTERVAL = 4000;

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37) % 96,
  size: 3 + ((i * 5) % 5),
  delay: (i % 7) * 0.9,
  duration: 9 + ((i * 3) % 7),
  opacity: 0.25 + ((i % 4) * 0.12),
}));

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setOffset(Math.min(y * 0.28, 90));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = SLIDES[index];

  return (
    <section
      ref={ref as never}
      className="relative -mt-px h-[74vh] min-h-[480px] w-full overflow-hidden rounded-b-[2rem] shadow-[var(--shadow-hero)]"
      aria-label="Featured places"
    >
      {/* Slides */}
      <div className="absolute inset-0" style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.06)` }}>
        {SLIDES.map((s, i) => (
          <img
            key={s.name}
            src={s.img}
            alt={`${s.name}, Chhattisgarh`}
            width={1024}
            height={1280}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              animation: i === index ? "ken-burns 6s ease-out both" : undefined,
            }}
          />
        ))}
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.10_0.03_255/0.72)_0%,oklch(0.10_0.03_255/0.15)_35%,oklch(0.08_0.02_255/0.80)_78%,oklch(0.06_0.02_255/0.97)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_120%,oklch(0.78_0.14_85/0.20),transparent_60%)]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-float-particle absolute bottom-0 rounded-full bg-[color:var(--gold)]"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              filter: "blur(0.4px)",
            }}
          />
        ))}
      </div>

      {/* Top bar */}
      <div className="relative flex items-start justify-between px-5 pt-6">
        <div className="animate-slide-up-fade">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[color:var(--gold)]">My City</p>
          <h1 className="mt-1 font-display text-xl text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
            Discover Raipur like a local
          </h1>
        </div>
        <Link
          to="/notifications"
          className="animate-glow-soft relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/35 bg-black/25 text-[color:var(--gold)] backdrop-blur-md transition-transform duration-200 active:scale-90"
          aria-label="Notifications, 3 new"
        >
          <Bell className="h-5 w-5" strokeWidth={1.6} />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground shadow-[0_0_0_2px_oklch(0.10_0.03_255)]">
            +3
          </span>
          <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-5 w-5 animate-pulse-ring rounded-full bg-destructive" />
        </Link>
      </div>

      {/* Info card */}
      <div className="absolute inset-x-4 bottom-5">
        <div
          key={active.name}
          className="glass-card animate-card-rise rounded-3xl px-5 py-4 backdrop-saturate-150 transition-transform duration-300 active:scale-[0.985] active:-translate-y-0.5"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,oklch(0.86_0.13_85),oklch(0.74_0.16_60))] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.16_0.03_255)]">
              <TrendingUp className="h-3 w-3 animate-icon-pulse" strokeWidth={2.2} /> Trending
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">
              <Star className="h-3.5 w-3.5 fill-[color:var(--gold)] text-[color:var(--gold)]" /> {active.rating.toFixed(1)}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/75">
              <MapPin className="h-3.5 w-3.5 text-[color:var(--gold)]" strokeWidth={1.7} /> {active.distance}
            </span>
          </div>

          <h2 className="mt-2.5 font-display text-2xl font-semibold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
            {active.name}
          </h2>
          <p className="mt-1 text-xs text-white/75">{active.tagline}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              to="/explore"
              className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,oklch(0.86_0.13_85),oklch(0.74_0.16_60))] px-5 py-2.5 text-sm font-semibold text-[oklch(0.16_0.03_255)] shadow-[0_10px_28px_-10px_oklch(0.80_0.14_85/0.9)] transition-transform duration-200 active:scale-95"
            >
              Explore Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>

            <div className="flex items-center gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${s.name}`}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? 18 : 6,
                    background: i === index ? "var(--gold)" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
