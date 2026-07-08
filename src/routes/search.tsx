import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, Clock, SlidersHorizontal, Star } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { PlaceRow } from "@/components/discovery/PlaceCard";
import { places } from "@/data/places";
import { trendingSearches, recentSearchesSeed } from "@/data/reviews";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — City Discovery Raipur" }] }),
  component: SearchScreen,
});

function SearchScreen() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [maxDist, setMaxDist] = useState(300);
  const [recent, setRecent] = useState<string[]>(recentSearchesSeed);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return places.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (p.rating < minRating) return false;
      if (p.distanceKm > maxDist) return false;
      if (!term) return true;
      return (
        p.name.toLowerCase().includes(term) ||
        p.area.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term))
      );
    });
  }, [q, cat, minRating, maxDist]);

  const commit = (term: string) => {
    setQ(term);
    setRecent((r) => [term, ...r.filter((x) => x !== term)].slice(0, 6));
  };

  return (
    <MobileShell>
      <div className="sticky top-0 z-20 bg-background/95 px-4 pt-4 pb-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button aria-label="Back" onClick={() => navigate({ to: "/home" })} className="text-sm font-semibold text-muted-foreground">Cancel</button>
          <div className="flex h-12 flex-1 items-center gap-2 rounded-2xl border border-border bg-card px-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search places, food, tags…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear"><X className="h-4 w-4 text-muted-foreground" /></button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(true)}
            aria-label="Filters"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!q && !cat && minRating === 0 && maxDist === 300 && (
        <div className="space-y-6 px-4 pt-2">
          {recent.length > 0 && (
            <section>
              <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"><Clock className="h-4 w-4" /> Recent</h2>
              <div className="flex flex-wrap gap-2">
                {recent.map((r) => (
                  <button key={r} onClick={() => commit(r)} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold">{r}</button>
                ))}
              </div>
            </section>
          )}
          <section>
            <h2 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"><TrendingUp className="h-4 w-4" /> Trending searches</h2>
            <div className="flex flex-col gap-2">
              {trendingSearches.map((t, i) => (
                <button key={t} onClick={() => commit(t)} className="flex items-center justify-between rounded-2xl bg-card p-3 shadow-[var(--shadow-card)]">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent">{i + 1}</span>
                    <span className="text-sm font-medium">{t}</span>
                  </span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-2 text-sm font-semibold text-muted-foreground">Browse categories</h2>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((c) => (
                <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="flex flex-col items-center gap-1 rounded-2xl bg-card p-3 text-center shadow-[var(--shadow-card)]">
                  <span className="text-[11px] font-semibold">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground">{c.count}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      {(q || cat || minRating > 0 || maxDist < 300) && (
        <div className="px-4 pt-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{results.length} results</p>
          {results.length === 0 ? (
            <div className="rounded-2xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold">No matches</p>
              <p className="mt-1 text-xs text-muted-foreground">Try a different word or clear your filters.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 pb-4">
              {results.map((p) => <PlaceRow key={p.id} place={p} />)}
            </div>
          )}
        </div>
      )}

      {/* Filter sheet */}
      {filtersOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/50 animate-slide-up-fade"
          onClick={() => setFiltersOpen(false)}
          aria-label="Close"
        />
      )}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[480px] rounded-t-3xl bg-card p-5 shadow-[var(--shadow-sheet)] transition-transform",
          filtersOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1.25rem)" }}
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        <h3 className="font-display text-xl font-semibold">Filters</h3>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCat(null)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", !cat ? "bg-primary text-primary-foreground" : "bg-secondary")}>Any</button>
            {categories.map((c) => (
              <button key={c.slug} onClick={() => setCat(c.slug)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", cat === c.slug ? "bg-primary text-primary-foreground" : "bg-secondary")}>{c.name}</button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Min rating</span>
            <span className="text-foreground">{minRating > 0 ? `${minRating.toFixed(1)}+` : "Any"}</span>
          </p>
          <div className="flex gap-2">
            {[0, 3.5, 4, 4.5].map((r) => (
              <button key={r} onClick={() => setMinRating(r)} className={cn("flex flex-1 items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-semibold", minRating === r ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                {r > 0 && <Star className="h-3.5 w-3.5 fill-current" />} {r === 0 ? "Any" : `${r}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Distance</span>
            <span className="text-foreground">Within {maxDist} km</span>
          </p>
          <input type="range" min={5} max={300} step={5} value={maxDist} onChange={(e) => setMaxDist(+e.target.value)} className="w-full accent-primary" />
        </div>

        <button onClick={() => setFiltersOpen(false)} className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
          Show {results.length} results
        </button>
      </div>
    </MobileShell>
  );
}
