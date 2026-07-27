import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ChevronLeft,
  MapPin,
  Copy,
  ExternalLink,
  Clock,
  Ticket,
  Car,
  Bath,
  Accessibility,
  Camera,
  PawPrint,
  Utensils,
  Sparkles,
  Users,
  Timer,
  BookOpen,
  Lightbulb,
  Compass,
  CloudSun,
  ShieldAlert,
  BadgeCheck,
  Tag,
  Hash,
  CalendarCheck,
} from "lucide-react";
import { placeById } from "@/data/places";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/place/$id/details")({
  loader: ({ params }) => {
    const place = placeById[params.id];
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `More about ${loaderData.place.name} — City Discovery Raipur` },
          { name: "description", content: `Detailed information, tips, timings and nearby spots for ${loaderData.place.name}.` },
          { property: "og:title", content: `More about ${loaderData.place.name}` },
          { property: "og:description", content: `Detailed information, tips, timings and nearby spots for ${loaderData.place.name}.` },
          { property: "og:image", content: loaderData.place.cover },
        ]
      : [{ title: "Place details — City Discovery" }],
  }),
  component: PlaceMoreDetails,
});

const NA = "Not Available";
const val = <T,>(v: T | null | undefined): T | string => (v === null || v === undefined || v === "" ? NA : v);

function PlaceMoreDetails() {
  const { place } = Route.useLoaderData() as { place: import("@/lib/types").Place };
  const navigate = useNavigate();

  // Dummy structured metadata (would come from backend later)
  const meta = {
    placeId: "RCG-REST-0001",
    name: place.name ?? "Bapu Bazaar Chaat",
    category: "Food & Cafés",
    subCategory: "Street Food",
    tags: ["Street Food", "Chaat", "Local Favourite", "Evening Snacks", "Family Friendly"],
    address: "Bapu Bazaar, Sadar Bazaar, Raipur, Chhattisgarh 492001",
    gps: { lat: 21.2389, lng: 81.6337 },
    mapsUrl: "https://maps.google.com/?q=21.2389,81.6337",
    openingTime: "4:00 PM",
    closingTime: "11:00 PM",
    entryFee: "Free",
    parking: "Limited roadside parking available",
    washroom: "Not Available",
    wheelchair: "Partially Accessible",
    photography: "Allowed",
    petFriendly: "No",
    foodNearby: ["Kulfi Stall", "Lassi Corner", "South Indian Snacks", "Tea Stall"],
    bestTime: "6:00 PM - 9:00 PM",
    crowdLevel: "High (Evenings)",
    timeRequired: "30-45 Minutes",
    description:
      "One of the most popular street food spots in Raipur, known for crispy golgappa, samosa chaat, dahi chaat and local flavours. Ideal for evening snacks with family and friends.",
    history:
      "A well-known local food destination serving visitors for many years and loved by residents for authentic street food.",
    tips: [
      "Visit before 7 PM to avoid heavy crowds.",
      "Carry cash or UPI.",
      "Evening is the best time.",
      "Try Golgappa and Samosa Chaat.",
    ],
    nearby: ["Jay Stambh Chowk", "Sadar Bazaar Market", "Mahant Ghasidas Memorial Museum", "Marine Drive Raipur"],
    season: "Best in Winter and Monsoon",
    emergency: { police: "112", ambulance: "108" },
    verifiedDate: "20 July 2026",
    verified: true,
  };

  const copyGps = async () => {
    const text = `${meta.gps.lat}, ${meta.gps.lng}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("GPS coordinates copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* Luxury navy background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 10% 0%, oklch(0.28 0.06 265) 0%, oklch(0.16 0.05 265) 55%, oklch(0.10 0.04 265) 100%)",
        }}
      />
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 40% at 90% 10%, oklch(0.55 0.12 85 / 0.28), transparent 60%), radial-gradient(50% 40% at 0% 90%, oklch(0.55 0.12 265 / 0.35), transparent 60%)",
        }}
      />

      <div className="mx-auto w-full max-w-[480px] px-4 pb-16 pt-3 text-white animate-slide-up-fade" style={{ paddingTop: "max(env(safe-area-inset-top), 0.75rem)" }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/place/$id", params: { id: place.id } })}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl transition active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {meta.verified && (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 backdrop-blur-xl">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </span>
          )}
        </div>

        {/* Title */}
        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "oklch(0.82 0.14 85)" }}>
            More About This Place
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-balance text-white">
            {meta.name}
          </h1>
          <p className="mt-1 text-sm text-white/70">{meta.category} · {meta.subCategory}</p>
        </div>

        {/* Identity card */}
        <GlassCard className="mt-5">
          <Row icon={<Hash className="h-4 w-4" />} label="Place ID" value={meta.placeId} />
          <Divider />
          <Row icon={<Tag className="h-4 w-4" />} label="Category" value={`${meta.category} · ${meta.subCategory}`} />
          <Divider />
          <div className="px-4 py-3">
            <Label icon={<Sparkles className="h-4 w-4" />}>Experience Tags</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {meta.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Location */}
        <SectionTitle>Location</SectionTitle>
        <GlassCard>
          <div className="px-4 py-3">
            <Label icon={<MapPin className="h-4 w-4" />}>Address</Label>
            <p className="mt-1.5 text-sm leading-relaxed text-white/90">{val(meta.address)}</p>
          </div>
          <Divider />
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="flex-1">
              <Label icon={<Compass className="h-4 w-4" />}>GPS</Label>
              <p className="mt-1 font-mono text-sm text-white/90">
                {meta.gps.lat}, {meta.gps.lng}
              </p>
            </div>
            <button
              onClick={copyGps}
              className="flex h-10 items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 text-xs font-semibold text-white transition active:scale-95"
              aria-label="Copy GPS coordinates"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
          <Divider />
          <a
            href={meta.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-between px-4 py-3.5 transition active:bg-white/5"
          >
            <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "oklch(0.82 0.14 85)" }}>
              <ExternalLink className="h-4 w-4" /> Open in Google Maps
            </span>
            <ChevronLeft className="h-4 w-4 rotate-180 text-white/50" />
          </a>
        </GlassCard>

        {/* Timings & Entry */}
        <SectionTitle>Timings & Entry</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Clock className="h-4 w-4" />} label="Opens" value={val(meta.openingTime)} />
          <StatCard icon={<Clock className="h-4 w-4" />} label="Closes" value={val(meta.closingTime)} />
          <StatCard icon={<Ticket className="h-4 w-4" />} label="Entry Fee" value={val(meta.entryFee)} />
          <StatCard icon={<Timer className="h-4 w-4" />} label="Time Required" value={val(meta.timeRequired)} />
          <StatCard icon={<CalendarCheck className="h-4 w-4" />} label="Best Time" value={val(meta.bestTime)} />
          <StatCard icon={<Users className="h-4 w-4" />} label="Crowd Level" value={val(meta.crowdLevel)} />
        </div>

        {/* Facilities */}
        <SectionTitle>Facilities</SectionTitle>
        <GlassCard>
          <Row icon={<Car className="h-4 w-4" />} label="Parking" value={val(meta.parking)} />
          <Divider />
          <Row icon={<Bath className="h-4 w-4" />} label="Washroom" value={val(meta.washroom)} />
          <Divider />
          <Row icon={<Accessibility className="h-4 w-4" />} label="Wheelchair Access" value={val(meta.wheelchair)} />
          <Divider />
          <Row icon={<Camera className="h-4 w-4" />} label="Photography" value={val(meta.photography)} />
          <Divider />
          <Row icon={<PawPrint className="h-4 w-4" />} label="Pet Friendly" value={val(meta.petFriendly)} />
        </GlassCard>

        {/* About */}
        <SectionTitle>About</SectionTitle>
        <GlassCard>
          <div className="px-4 py-3.5">
            <p className="text-sm leading-relaxed text-white/85">{val(meta.description)}</p>
          </div>
          <Divider />
          <div className="px-4 py-3.5">
            <Label icon={<BookOpen className="h-4 w-4" />}>History</Label>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85">{val(meta.history)}</p>
          </div>
        </GlassCard>

        {/* Tips */}
        <SectionTitle>Tips</SectionTitle>
        <GlassCard>
          <ul className="divide-y divide-white/10">
            {meta.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 px-4 py-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "oklch(0.82 0.14 85 / 0.15)", color: "oklch(0.82 0.14 85)" }}
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm leading-relaxed text-white/90">{tip}</p>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Food Nearby */}
        <SectionTitle>Food Nearby</SectionTitle>
        <GlassCard>
          <div className="flex flex-wrap gap-2 px-4 py-3.5">
            {meta.foodNearby.map((f) => (
              <span key={f} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium">
                <Utensils className="h-3.5 w-3.5" style={{ color: "oklch(0.82 0.14 85)" }} /> {f}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Nearby Places */}
        <SectionTitle>Nearby Places</SectionTitle>
        <GlassCard>
          <ul className="divide-y divide-white/10">
            {meta.nearby.map((n) => (
              <li key={n} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10">
                  <MapPin className="h-4 w-4" style={{ color: "oklch(0.82 0.14 85)" }} />
                </span>
                <span className="text-sm text-white/90">{n}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Season */}
        <SectionTitle>Season & Safety</SectionTitle>
        <GlassCard>
          <Row icon={<CloudSun className="h-4 w-4" />} label="Season" value={val(meta.season)} />
          <Divider />
          <Row icon={<ShieldAlert className="h-4 w-4" />} label="Police" value={meta.emergency.police} />
          <Divider />
          <Row icon={<ShieldAlert className="h-4 w-4" />} label="Ambulance" value={meta.emergency.ambulance} />
        </GlassCard>

        {/* Gallery */}
        {place.gallery?.length > 0 && (
          <>
            <SectionTitle>Gallery</SectionTitle>
            <div className="grid grid-cols-3 gap-2">
              {place.gallery.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl border border-white/10">
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Verification footer */}
        <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-emerald-300" />
            <span className="text-xs text-white/80">Verified on {meta.verifiedDate}</span>
          </div>
          <Link
            to="/place/$id"
            params={{ id: place.id }}
            className="text-xs font-semibold"
            style={{ color: "oklch(0.82 0.14 85)" }}
          >
            Back to place
          </Link>
        </div>
      </div>
    </div>
  );
}

function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2.5 mt-6 px-1 font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-white/70">
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="h-px bg-white/10" />;
}

function Label({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
      <span style={{ color: "oklch(0.82 0.14 85)" }}>{icon}</span>
      {children}
    </div>
  );
}

function Row({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
        style={{ color: "oklch(0.82 0.14 85)" }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/55">{label}</p>
        <p className="mt-0.5 truncate text-sm text-white/95">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-xl">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
        <span style={{ color: "oklch(0.82 0.14 85)" }}>{icon}</span>
        {label}
      </div>
      <p className="mt-1.5 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
