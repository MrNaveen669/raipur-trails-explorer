import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, LayoutGrid, List, Compass } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { PlaceCard, PlaceRow } from "@/components/discovery/PlaceCard";
import { placeById } from "@/data/places";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Saved Places — City Discovery" }] }),
  component: Favorites,
});

function Favorites() {
  const { ids } = useFavorites();
  const [view, setView] = useState<"grid" | "list">("grid");
  const saved = Array.from(ids).map((id) => placeById[id]).filter(Boolean);

  return (
    <MobileShell>
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold">Saved</h1>
            <p className="text-sm text-muted-foreground">{saved.length} {saved.length === 1 ? "place" : "places"} in your list</p>
          </div>
          {saved.length > 0 && (
            <div className="flex overflow-hidden rounded-full border border-border bg-card">
              <button onClick={() => setView("grid")} className={cn("flex h-9 w-9 items-center justify-center", view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setView("list")} className={cn("flex h-9 w-9 items-center justify-center", view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
                <List className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="mx-4 mt-16 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Heart className="h-7 w-7" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">No saved places yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any place to save it here for later.</p>
          </div>
          <Link to="/home" className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Compass className="h-4 w-4" /> Start exploring
          </Link>
        </div>
      ) : view === "grid" ? (
        <div className="mt-4 grid grid-cols-2 gap-3 px-4">
          {saved.map((p) => <PlaceCard key={p.id} place={p} size="sm" />)}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2.5 px-4">
          {saved.map((p) => <PlaceRow key={p.id} place={p} />)}
        </div>
      )}
    </MobileShell>
  );
}
