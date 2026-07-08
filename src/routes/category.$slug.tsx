import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, MapPin, ChevronLeft } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { PlaceCard, PlaceRow } from "@/components/discovery/PlaceCard";
import { categoryBySlug } from "@/data/categories";
import { placesByCategory } from "@/data/places";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = categoryBySlug[params.slug];
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} in Raipur — City Discovery` },
          { name: "description", content: `${loaderData.cat.count} ${loaderData.cat.name.toLowerCase()} in Raipur. ${loaderData.cat.blurb}.` },
          { property: "og:title", content: `${loaderData.cat.name} in Raipur` },
          { property: "og:description", content: loaderData.cat.blurb },
          { property: "og:image", content: loaderData.cat.cover },
        ]
      : [{ title: "Category — City Discovery" }],
  }),
  component: CategoryScreen,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-semibold">Category not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try browsing from the home screen.</p>
      </div>
    </div>
  ),
});

function CategoryScreen() {
  const { cat } = Route.useLoaderData() as { cat: import("@/lib/types").Category };
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<"rating" | "distance">("rating");
  const navigate = useNavigate();

  const items = [...placesByCategory(cat.slug)].sort((a, b) =>
    sort === "rating" ? b.rating - a.rating : a.distanceKm - b.distanceKm
  );

  return (
    <MobileShell>
      {/* Hero */}
      <div className="relative h-56 w-full overflow-hidden">
        <img src={cat.cover} alt={cat.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <button
          onClick={() => navigate({ to: "/home" })}
          aria-label="Back"
          className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Category</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">{cat.name}</h1>
          <p className="mt-1 flex items-center gap-2 text-xs text-white/85">
            <MapPin className="h-3.5 w-3.5" /> {items.length} places · {cat.blurb}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-20 mt-2 flex items-center gap-2 bg-background/90 px-4 py-3 backdrop-blur-md">
        <button className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
        </button>
        <button
          onClick={() => setSort(sort === "rating" ? "distance" : "rating")}
          className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-semibold"
        >
          <ArrowUpDown className="h-3.5 w-3.5" /> {sort === "rating" ? "Top rated" : "Nearest"}
        </button>
        <div className="ml-auto flex overflow-hidden rounded-full border border-border bg-card">
          <button
            onClick={() => setView("grid")}
            aria-label="Grid"
            className={cn("flex h-9 w-9 items-center justify-center", view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="List"
            className={cn("flex h-9 w-9 items-center justify-center", view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-6">
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {items.map((p) => (
              <div key={p.id} className="w-full">
                <PlaceCard place={p} size="sm" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {items.map((p) => <PlaceRow key={p.id} place={p} />)}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
