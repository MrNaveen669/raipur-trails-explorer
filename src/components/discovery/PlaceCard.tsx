import { Link } from "@tanstack/react-router";
import type { Place } from "@/lib/types";
import { RatingStars } from "./RatingStars";
import { FavoriteButton } from "./FavoriteButton";
import { formatDistance, formatReviewCount, priceLevelToString } from "@/lib/format";
import { categoryBySlug } from "@/data/categories";
import { cn } from "@/lib/utils";

export function PlaceCard({ place, size = "md" }: { place: Place; size?: "sm" | "md" | "lg" }) {
  const cat = categoryBySlug[place.category];
  const width = size === "sm" ? "w-44" : size === "lg" ? "w-72" : "w-60";
  const imgH = size === "sm" ? "h-32" : size === "lg" ? "h-48" : "h-40";
  return (
    <Link
      to="/place/$id"
      params={{ id: place.id }}
      className={cn("group block shrink-0", width)}
    >
      <div className={cn("relative overflow-hidden rounded-2xl bg-muted", imgH)}>
        <img
          src={place.cover}
          alt={place.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-active:scale-105"
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton id={place.id} size={16} />
        </div>
        {place.isHiddenGem && (
          <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            Hidden gem
          </span>
        )}
      </div>
      <div className="mt-2 space-y-1 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-[15px] font-semibold text-foreground">{place.name}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RatingStars value={place.rating} />
          <span>({formatReviewCount(place.reviewCount)})</span>
          <span>·</span>
          <span className="capitalize">{cat?.name.replace(/s$/, "") ?? place.category}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDistance(place.distanceKm)} · {priceLevelToString(place.priceLevel)}
        </p>
      </div>
    </Link>
  );
}

export function PlaceRow({ place }: { place: Place }) {
  const cat = categoryBySlug[place.category];
  return (
    <Link
      to="/place/$id"
      params={{ id: place.id }}
      className="flex gap-3 rounded-2xl bg-card p-2 shadow-[var(--shadow-card)] transition-transform active:scale-[0.99]"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img src={place.cover} alt={place.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1 py-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-[15px] font-semibold">{place.name}</h3>
          <FavoriteButton id={place.id} size={16} variant="overlay" className="h-8 w-8" />
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <RatingStars value={place.rating} />
          <span>({formatReviewCount(place.reviewCount)})</span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{place.area} · {cat?.name}</p>
        <p className="mt-1 text-xs font-medium text-foreground/80">
          {formatDistance(place.distanceKm)} · {priceLevelToString(place.priceLevel)}
          {place.isOpen ? <span className="ml-1 text-success">· Open</span> : <span className="ml-1 text-destructive">· Closed</span>}
        </p>
      </div>
    </Link>
  );
}
