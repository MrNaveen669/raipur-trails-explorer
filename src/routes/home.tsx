import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, MapPin } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { SearchBar } from "@/components/discovery/SearchBar";
import { CategoryChip, CategoryCard } from "@/components/discovery/CategoryCard";
import { PlaceCard } from "@/components/discovery/PlaceCard";
import { EventCard } from "@/components/discovery/EventCard";
import { SectionHeader, Rail } from "@/components/discovery/SectionHeader";
import { categories } from "@/data/categories";
import { featured, hiddenGems, placesByCategory, trending, weekendPicks } from "@/data/places";
import { events } from "@/data/reviews";
import heroImg from "@/assets/hero-raipur.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — City Discovery Raipur" },
      { name: "description", content: "Trending places, hidden gems, popular restaurants and weekend escapes across Raipur." },
      { property: "og:title", content: "Home — City Discovery Raipur" },
      { property: "og:description", content: "Trending places, hidden gems and weekend escapes across Raipur." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <MobileShell>
      {/* Header */}
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Current location</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" />
              <h1 className="font-display text-xl font-semibold text-ink">Raipur, CG</h1>
            </div>
          </div>
          <Link to="/profile" className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Hero card */}
      <div className="mt-4 px-4">
        <Link to="/place/$id" params={{ id: "temples-mahamaya" }} className="relative block h-56 overflow-hidden rounded-3xl shadow-[var(--shadow-hero)]">
          <img src={heroImg} alt="Mahamaya Temple at dawn" width={1200} height={1600} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">Editor's pick</p>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight">Sunrise at Mahamaya Temple</h2>
            <p className="mt-1 text-xs text-white/85">2.4 km · Historic Shakti Peeth</p>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="mt-4 px-4">
        <SearchBar />
      </div>

      {/* Categories */}
      <div className="mt-6">
        <SectionHeader title="Explore by category" linkTo="/explore" />
        <div className="no-scrollbar mt-3 flex gap-4 overflow-x-auto px-4 pb-1">
          {categories.map((c) => <CategoryChip key={c.slug} category={c} />)}
        </div>
      </div>

      {/* Trending */}
      <div className="mt-6">
        <SectionHeader eyebrow="Right now" title="Trending in Raipur" linkTo="/category/$slug" linkParams={{ slug: "attractions" }} />
        <Rail>
          {trending().map((p) => <PlaceCard key={p.id} place={p} />)}
        </Rail>
      </div>

      {/* Hidden gems */}
      <div className="mt-6">
        <SectionHeader eyebrow="Locals swear by" title="Hidden gems" linkTo="/category/$slug" linkParams={{ slug: "hidden-gems" }} />
        <Rail>
          {hiddenGems().map((p) => <PlaceCard key={p.id} place={p} size="lg" />)}
        </Rail>
      </div>

      {/* Popular restaurants */}
      <div className="mt-6">
        <SectionHeader title="Popular restaurants" linkTo="/category/$slug" linkParams={{ slug: "restaurants" }} />
        <Rail>
          {placesByCategory("restaurants").slice(0, 6).map((p) => <PlaceCard key={p.id} place={p} />)}
        </Rail>
      </div>

      {/* Famous temples */}
      <div className="mt-6 px-4">
        <SectionHeader title="Famous temples" linkTo="/category/$slug" linkParams={{ slug: "temples" }} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 px-4">
        {categories.filter((c) => ["temples", "parks"].includes(c.slug)).map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>

      {/* Weekend destinations */}
      <div className="mt-6">
        <SectionHeader eyebrow="Under 3 hours away" title="Weekend escapes" />
        <Rail>
          {weekendPicks().map((p) => <PlaceCard key={p.id} place={p} size="lg" />)}
        </Rail>
      </div>

      {/* Upcoming events */}
      <div className="mt-6">
        <SectionHeader title="Upcoming events" linkTo="/category/$slug" linkParams={{ slug: "events" }} />
        <Rail>
          {events.map((e) => <EventCard key={e.id} event={e} />)}
        </Rail>
      </div>

      {/* Featured businesses */}
      <div className="mt-6 mb-2">
        <SectionHeader title="Featured this month" />
        <div className="mt-3 flex flex-col gap-3 px-4">
          {featured().slice(0, 3).map((p) => (
            <Link key={p.id} to="/place/$id" params={{ id: p.id }} className="relative block h-32 overflow-hidden rounded-2xl">
              <img src={p.cover} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-4 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">Featured</p>
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="text-xs text-white/80">{p.area} · {p.tags.slice(0, 2).join(" · ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
