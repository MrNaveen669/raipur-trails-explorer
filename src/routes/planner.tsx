import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, MapPin, Sparkles, Clock, Plus } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { featured, hiddenGems } from "@/data/places";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Planner — My City" },
      { name: "description", content: "Craft your perfect Raipur itinerary with curated stops, timings and hidden gems." },
      { property: "og:title", content: "Planner — My City" },
      { property: "og:description", content: "Craft your perfect Raipur itinerary." },
    ],
  }),
  component: Planner,
});

function Planner() {
  const morning = featured()[0];
  const afternoon = hiddenGems()[0];
  const evening = featured()[1];
  const day = [
    { when: "Morning", time: "8:00 — 10:30", place: morning, note: "Golden hour, minimal crowd" },
    { when: "Afternoon", time: "12:30 — 3:00", place: afternoon, note: "Lunch nearby, quiet lanes" },
    { when: "Evening", time: "6:00 — 9:00", place: evening, note: "Sunset views, live music" },
  ];

  return (
    <MobileShell>
      <Header title="Planner" back={false} />
      <div className="px-5 pt-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--gold)]">Your itinerary</p>
        <h1 className="mt-1 font-display text-3xl leading-tight text-ink">A curated day in Raipur</h1>
        <p className="mt-2 text-sm text-muted-foreground">Handpicked stops, refined timing, effortless flow.</p>
      </div>

      <div className="mt-5 px-4">
        <div className="glass-card flex items-center gap-3 rounded-3xl p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
            <CalendarCheck className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Tomorrow · Saturday</p>
            <p className="text-xs text-muted-foreground">3 stops · ~11.4 km · 8h</p>
          </div>
          <button className="rounded-full border border-[color:var(--gold)]/50 px-3 py-1.5 text-[11px] font-semibold text-[color:var(--gold)] transition active:scale-95">
            Edit
          </button>
        </div>
      </div>

      <ol className="mt-6 space-y-4 px-4 pb-4">
        {day.map((slot, i) => (
          <li key={slot.when} className="relative">
            {i < day.length - 1 && (
              <span className="absolute left-[22px] top-14 bottom-[-16px] w-px bg-gradient-to-b from-[color:var(--gold)]/60 to-transparent" />
            )}
            <div className="flex gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--surface)]/70 text-xs font-semibold text-[color:var(--gold)]">
                {i + 1}
              </div>
              <div className="glass-card flex-1 overflow-hidden rounded-3xl">
                <div className="relative h-36 w-full">
                  {slot.place && <img src={slot.place.cover} alt={slot.place.name} className="absolute inset-0 h-full w-full object-cover" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)] via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-[color:var(--gold)]/40 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--gold)] backdrop-blur">
                    {slot.when}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg leading-tight">{slot.place?.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {slot.time}
                    <span className="mx-1">·</span>
                    <MapPin className="h-3.5 w-3.5" /> {slot.place?.area}
                  </p>
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-[color:var(--gold)]/90">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5" /> {slot.note}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="px-4 pb-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[color:var(--gold)]/40 py-4 text-sm font-semibold text-[color:var(--gold)] transition active:scale-[0.99]">
          <Plus className="h-4 w-4" /> Add another stop
        </button>
      </div>
    </MobileShell>
  );
}
