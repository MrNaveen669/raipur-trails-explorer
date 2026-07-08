import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { SearchBar } from "@/components/discovery/SearchBar";
import { PlaceRow } from "@/components/discovery/PlaceCard";
import { categories } from "@/data/categories";
import { places } from "@/data/places";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — City Discovery Raipur" },
      { name: "description", content: "Browse every place across Raipur on a live map view." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? places.filter((p) => p.category === filter) : places;

  return (
    <MobileShell>
      <div className="px-4 pt-4">
        <h1 className="font-display text-2xl font-semibold">Explore Raipur</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} places near you</p>
        <div className="mt-3"><SearchBar /></div>
      </div>

      {/* Map preview */}
      <div className="mt-4 px-4">
        <div className="relative h-56 overflow-hidden rounded-3xl border border-border/70 bg-muted">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(120deg, oklch(0.94 0.02 155) 0%, oklch(0.92 0.03 80) 100%)",
              backgroundSize: "cover",
            }}
          />
          {/* Fake road grid */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 220" preserveAspectRatio="none">
            <path d="M0 40 Q 200 60 400 30" stroke="oklch(0.85 0.02 80)" strokeWidth="8" fill="none" />
            <path d="M0 130 Q 180 100 400 140" stroke="oklch(0.85 0.02 80)" strokeWidth="6" fill="none" />
            <path d="M100 0 L 130 220" stroke="oklch(0.88 0.02 80)" strokeWidth="4" fill="none" />
            <path d="M280 0 L 260 220" stroke="oklch(0.88 0.02 80)" strokeWidth="4" fill="none" />
          </svg>
          {/* Pins */}
          {filtered.slice(0, 8).map((p, i) => (
            <span
              key={p.id}
              className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background"
              style={{ left: `${10 + ((i * 47) % 80)}%`, top: `${15 + ((i * 31) % 70)}%` }}
            >
              <MapPin className="h-4 w-4" />
            </span>
          ))}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold shadow-[var(--shadow-card)]">
            <MapPin className="h-3.5 w-3.5 text-accent" /> Raipur
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mt-5">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4 pb-1">
          <button className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </button>
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3.5 text-xs font-semibold transition-colors",
              !filter ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setFilter(c.slug)}
              className={cn(
                "h-9 shrink-0 rounded-full px-3.5 text-xs font-semibold transition-colors",
                filter === c.slug ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="mt-3 flex flex-col gap-2.5 px-4">
        {filtered.map((p) => <PlaceRow key={p.id} place={p} />)}
      </div>
    </MobileShell>
  );
}
