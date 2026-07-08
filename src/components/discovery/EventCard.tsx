import { CalendarDays } from "lucide-react";
import type { Event } from "@/lib/types";
import { formatEventDate } from "@/lib/format";

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="relative w-64 shrink-0 overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
      <div className="relative h-32 w-full bg-muted">
        <img src={event.cover} alt={event.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute top-2 left-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          {event.tag}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-semibold">{event.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{event.venue}</p>
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatEventDate(event.date)}
        </p>
      </div>
    </div>
  );
}
