import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CalendarDays, PartyPopper, FerrisWheel, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import mela from "@/assets/notif-mela.jpg";
import culture from "@/assets/notif-culture.jpg";
import city from "@/assets/notif-city.jpg";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — My City Raipur" },
      { name: "description", content: "Upcoming festivals, cultural events and city updates happening around Raipur." },
      { property: "og:title", content: "Notifications — My City Raipur" },
      { property: "og:description", content: "Stay updated with what's happening around your city." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Notifications,
});

const items = [
  {
    img: mela,
    Icon: FerrisWheel,
    badge: "Upcoming Festival",
    title: "Raipur Mela 2026",
    desc: "Experience delicious local food, cultural performances, shopping stalls, live music and exciting rides.",
    status: "Coming Soon in Raipur",
    cta: "Notify Me",
  },
  {
    img: culture,
    Icon: PartyPopper,
    badge: "Upcoming Event",
    title: "Raipur Cultural Festival",
    desc: "An evening filled with live performances, local artists, food courts and entertainment.",
    status: "Coming Soon in Raipur",
    cta: "Remind Me",
  },
  {
    img: city,
    Icon: CalendarDays,
    badge: "City Update",
    title: "More Exciting Events Coming Soon",
    desc: "Stay connected for upcoming festivals, exhibitions, concerts and city celebrations.",
    status: "More announcements coming soon.",
    cta: "Explore",
  },
];

function Notifications() {
  return (
    <MobileShell>
      <Header title="Notifications" />

      <div className="px-5 pt-2">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-[color:var(--gold)]" strokeWidth={1.7} />
          <h2 className="font-display text-2xl text-ink">Notifications</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Stay updated with what's happening around your city.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-5 px-4 pb-6">
        {items.map((n, i) => (
          <article
            key={n.title}
            className="glass-card animate-slide-up-fade overflow-hidden rounded-3xl"
            style={{ animationDelay: `${i * 110}ms` }}
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={n.img}
                alt={n.title}
                width={1024}
                height={640}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 bg-background/60 px-3 py-1 text-[11px] font-medium text-[color:var(--gold)] backdrop-blur-md">
                <n.Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                {n.badge}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-display text-lg text-ink">{n.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{n.desc}</p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs text-[color:var(--gold)]">{n.status}</p>
                {n.cta === "Explore" ? (
                  <Link
                    to="/explore"
                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[color:var(--gold)] to-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-95"
                  >
                    {n.cta}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                ) : (
                  <button
                    onClick={() => toast.success(`We'll remind you about ${n.title}`)}
                    className="rounded-full bg-gradient-to-r from-[color:var(--gold)] to-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200 active:scale-95"
                  >
                    {n.cta}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </MobileShell>
  );
}
