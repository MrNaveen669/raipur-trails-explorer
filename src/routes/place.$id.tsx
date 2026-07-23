import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Share2, MapPin, Clock, Navigation, MessageSquarePlus, Heart, Star, ChevronRight, Phone } from "lucide-react";
import { placeById, places } from "@/data/places";
import { reviewsFor } from "@/data/reviews";
import { categoryBySlug } from "@/data/categories";
import { formatDistance, formatReviewCount, priceLevelToString } from "@/lib/format";
import { RatingStars } from "@/components/discovery/RatingStars";
import { ReviewCard } from "@/components/discovery/ReviewCard";
import { PlaceCard } from "@/components/discovery/PlaceCard";
import { useFavorites } from "@/lib/favorites";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/place/$id")({
  loader: ({ params }) => {
    const place = placeById[params.id];
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.place.name} — City Discovery Raipur` },
          { name: "description", content: loaderData.place.description.slice(0, 155) },
          { property: "og:title", content: loaderData.place.name },
          { property: "og:description", content: loaderData.place.description.slice(0, 155) },
          { property: "og:image", content: loaderData.place.cover },
        ]
      : [{ title: "Place — City Discovery" }],
  }),
  component: PlaceDetail,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-semibold">Place not found</h1>
        <Link to="/home" className="mt-4 inline-block text-sm font-semibold text-primary">Back to Home</Link>
      </div>
    </div>
  ),
});

function PlaceDetail() {
  const { place } = Route.useLoaderData() as { place: import("@/lib/types").Place };
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  const { has, toggle } = useFavorites();
  const active = has(place.id);
  const cat = categoryBySlug[place.category];
  const reviews = reviewsFor(place.id);
  const nearby = places.filter((p) => p.id !== place.id && p.category === place.category).slice(0, 5);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[480px] bg-background pb-28">
      {/* Hero gallery */}
      <div className="relative h-80 w-full overflow-hidden bg-muted">
        <img src={place.gallery[idx]} alt={place.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Top actions */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-3" style={{ paddingTop: "max(env(safe-area-inset-top), 0.75rem)" }}>
          <button
            onClick={() => navigate({ to: "/home" })}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { navigator.clipboard?.writeText(place.name); toast.success("Link copied"); }}
              aria-label="Share"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Gallery dots */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
          {place.gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn("h-1.5 rounded-full transition-all", i === idx ? "w-6 bg-white" : "w-1.5 bg-white/50")}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Header info */}
      <section className="px-5 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">{cat?.name}</p>
        <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-balance">{place.name}</h1>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <RatingStars value={place.rating} />
          <span className="text-muted-foreground">({formatReviewCount(place.reviewCount)} reviews)</span>
          <span className="text-muted-foreground">·</span>
          <span className="font-semibold">{priceLevelToString(place.priceLevel)}</span>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">{place.address}</p>
              <p className="text-xs text-muted-foreground">{formatDistance(place.distanceKm)} away · {place.area}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="flex-1">
              <span className={cn("font-semibold", place.isOpen ? "text-success" : "text-destructive")}>
                {place.isOpen ? "Open now" : "Closed"}
              </span>
              <span className="text-muted-foreground"> · {place.hoursToday}</span>
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {place.tags.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">{t}</span>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="mt-6 px-5">
        <h2 className="font-display text-lg font-semibold">About</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{place.description}</p>
      </section>

      {/* Photos */}
      <section className="mt-6">
        <h2 className="px-5 font-display text-lg font-semibold">Photos</h2>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-5">
          {place.gallery.map((src, i) => (
            <button key={i} onClick={() => setIdx(i)} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Map preview */}
      <section className="mt-6 px-5">
        <h2 className="font-display text-lg font-semibold">Location</h2>
        <div className="mt-3 relative h-40 overflow-hidden rounded-2xl border border-border">
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, oklch(0.94 0.02 155), oklch(0.92 0.03 80))" }} />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" preserveAspectRatio="none">
            <path d="M0 50 Q 200 90 400 40" stroke="oklch(0.85 0.02 80)" strokeWidth="8" fill="none" />
            <path d="M120 0 L 140 160" stroke="oklch(0.88 0.02 80)" strokeWidth="4" fill="none" />
          </svg>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
              <MapPin className="h-5 w-5" />
            </span>
          </span>
        </div>
      </section>

      {/* Reviews preview */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-display text-lg font-semibold">Reviews</h2>
          <Link to="/reviews" className="flex items-center text-xs font-semibold text-primary">See all <ChevronRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-3 flex flex-col gap-2.5 px-5">
          {reviews.slice(0, 2).map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="mt-6">
          <h2 className="px-5 font-display text-lg font-semibold">Nearby {cat?.name.toLowerCase()}</h2>
          <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5">
            {nearby.map((p) => <PlaceCard key={p.id} place={p} />)}
          </div>
        </section>
      )}

      <div className="h-6" />

      {/* Sticky action bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px] border-t border-border/70 bg-card/95 px-4 pt-3 shadow-[var(--shadow-sticky)] backdrop-blur-lg"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => { toggle(place.id); toast.success(active ? "Removed" : "Saved to favorites"); }}
            aria-label="Save"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary"
          >
            <Heart className={cn("h-5 w-5", active ? "fill-accent text-accent" : "text-foreground")} />
          </button>
          <button
            aria-label="Call"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary"
          >
            <Phone className="h-5 w-5" />
          </button>
          <button
            onClick={() => toast("Opening review composer")}
            aria-label="Write review"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary"
          >
            <MessageSquarePlus className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate({ to: "/directions/$id", params: { id: place.id } })}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-[var(--shadow-hero)]"
          >
            <Navigation className="h-5 w-5" /> Directions
          </button>

        </div>
      </div>
    </div>
  );
}
