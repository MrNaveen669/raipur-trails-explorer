import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MessageSquarePlus } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { ReviewCard } from "@/components/discovery/ReviewCard";
import { myReviews } from "@/data/reviews";
import { placeById } from "@/data/places";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Your Reviews — City Discovery" }] }),
  component: Reviews,
});

function Reviews() {
  return (
    <MobileShell>
      <div className="flex items-center gap-2 px-3 pt-3">
        <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary" aria-label="Back">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-display text-xl font-semibold">Your reviews</h1>
          <p className="text-xs text-muted-foreground">{myReviews.length} shared</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 px-4">
        {myReviews.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-8 text-center">
            <p className="font-display text-lg font-semibold">Nothing here yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Review a place you loved to help others discover it.</p>
          </div>
        ) : myReviews.map((r) => {
          const place = placeById[r.placeId];
          return (
            <div key={r.id} className="space-y-2">
              {place && (
                <Link to="/place/$id" params={{ id: place.id }} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-card)]">
                  <img src={place.cover} alt="" loading="lazy" className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{place.name}</p>
                    <p className="text-xs text-muted-foreground">{place.area}</p>
                  </div>
                </Link>
              )}
              <ReviewCard review={r} />
            </div>
          );
        })}
      </div>

      <button className="fixed bottom-24 right-4 z-30 flex h-14 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-hero)]">
        <MessageSquarePlus className="h-5 w-5" /> Write a review
      </button>
    </MobileShell>
  );
}
