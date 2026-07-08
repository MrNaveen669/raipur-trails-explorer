import { Star, ThumbsUp } from "lucide-react";
import type { Review } from "@/lib/types";
import { formatReviewDate } from "@/lib/format";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
      <header className="flex items-center gap-3">
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${review.avatarSeed}`}
          alt=""
          className="h-9 w-9 rounded-full bg-secondary"
          width={36}
          height={36}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{review.author}</p>
          <p className="text-[11px] text-muted-foreground">{formatReviewDate(review.date)}</p>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={i < review.rating ? "h-3.5 w-3.5 fill-gold text-gold" : "h-3.5 w-3.5 text-border"} />
          ))}
        </div>
      </header>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{review.text}</p>
      <footer className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <button className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 font-medium">
          <ThumbsUp className="h-3 w-3" /> Helpful · {review.helpful}
        </button>
      </footer>
    </article>
  );
}
