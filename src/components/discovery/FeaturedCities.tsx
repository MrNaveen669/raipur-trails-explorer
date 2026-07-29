import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, MapPin, TrendingUp } from "lucide-react";
import raipurImg from "@/assets/hero-raipur.jpg";
import nayaRaipurImg from "@/assets/city-naya-raipur.jpg";
import dhamtariImg from "@/assets/city-dhamtari.jpg";
import bhilaiImg from "@/assets/city-bhilai.jpg";
import bilaspurImg from "@/assets/city-bilaspur.jpg";

const CITIES = [
  { name: "Raipur", region: "Chhattisgarh", tagline: "Capital city · Temples & street food", img: raipurImg },
  { name: "Naya Raipur", region: "Atal Nagar", tagline: "India's smartest planned city", img: nayaRaipurImg },
  { name: "Dhamtari", region: "Chhattisgarh", tagline: "Gangrel dam & riverside sunsets", img: dhamtariImg },
  { name: "Bhilai", region: "Durg", tagline: "Steel city lights after dark", img: bhilaiImg },
  { name: "Bilaspur", region: "Chhattisgarh", tagline: "Heritage temples on the Arpa", img: bilaspurImg },
];

const INTERVAL = 3500;

export function FeaturedCities() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % CITIES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  const active = CITIES[index];

  return (
    <>
      {/* Header */}
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--gold)]">Good evening</p>
            <div className="mt-1 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[color:var(--gold)]" strokeWidth={1.7} />
              <h1 key={active.name} className="animate-slide-up-fade font-display text-2xl text-ink">
                {active.name}, {active.region}
              </h1>
            </div>
          </div>
          <Link
            to="/notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--surface)]/60 text-[color:var(--gold)] backdrop-blur-md"
            aria-label="Notifications, 3 new"
          >
            <Bell className="h-5 w-5" strokeWidth={1.7} />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground shadow-[0_0_0_2px_var(--background)]">
              +3
            </span>
            <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-5 w-5 animate-pulse-ring rounded-full bg-destructive" />
          </Link>

        </div>
      </div>

      {/* Rotating featured city card */}
      <div className="mt-4 px-4">
        <Link
          to="/explore"
          className="relative block h-56 overflow-hidden rounded-3xl shadow-[var(--shadow-hero)]"
          aria-label={`Explore ${active.name}`}
        >
          {CITIES.map((c, i) => (
            <img
              key={c.name}
              src={c.img}
              alt={`${c.name}, Chhattisgarh`}
              width={1024}
              height={768}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out"
              style={{
                opacity: i === index ? 1 : 0,
                animation: i === index ? "ken-burns 5s ease-out both" : undefined,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

          {/* Trending badge */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,oklch(0.86_0.13_85),oklch(0.74_0.16_60))] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.16_0.03_255)] shadow-[0_6px_18px_-6px_oklch(0.78_0.14_85/0.8)]">
            <TrendingUp className="h-3 w-3" strokeWidth={2.2} /> Trending
          </span>

          {/* Glass overlay */}
          <div className="absolute inset-x-3 bottom-3">
            <div
              key={active.name}
              className="glass-card animate-slide-up-fade rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[color:var(--gold)]" strokeWidth={1.8} />
                <h2 className="font-display text-lg font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
                  {active.name}
                </h2>
              </div>
              <p className="mt-0.5 text-xs text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">{active.tagline}</p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1.5">
            {CITIES.map((c, i) => (
              <span
                key={c.name}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === index ? 16 : 6,
                  background: i === index ? "var(--gold)" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </Link>
      </div>
    </>
  );
}
