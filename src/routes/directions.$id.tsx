import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Navigation, Car, MapPin, Clock, Route as RouteIcon } from "lucide-react";
import { placeById } from "@/data/places";
import { formatDistance } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/directions/$id")({
  loader: ({ params }) => {
    const place = placeById[params.id];
    if (!place) throw notFound();
    return { place };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Directions to ${loaderData.place.name}` : "Directions" },
      { name: "description", content: "Route preview with distance and estimated time." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DirectionsPreview,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-2xl font-semibold">Place not found</h1>
        <Link to="/home" className="mt-4 inline-block text-sm font-semibold text-primary">Back to Home</Link>
      </div>
    </div>
  ),
});

// Deterministic pseudo-random from id
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}

function estimateMinutes(distanceKm: number, id: string) {
  // ~2.2 min/km base + urban buffer, jittered per place
  const jitter = (hash(id) % 5) - 2; // -2..+2
  return Math.max(4, Math.round(distanceKm * 2.3 + 3 + jitter));
}

function DirectionsPreview() {
  const { place } = Route.useLoaderData() as { place: import("@/lib/types").Place };
  const navigate = useNavigate();
  const minutes = estimateMinutes(place.distanceKm, place.id);
  const eta = new Date(Date.now() + minutes * 60000).toLocaleTimeString("en-IN", {
    hour: "numeric", minute: "2-digit",
  });

  // Deterministic route curve endpoints based on id
  const h = hash(place.id);
  const startX = 60, startY = 640;
  const endX = 320 + (h % 40);
  const endY = 120 + ((h >> 3) % 60);
  const c1x = 120 + ((h >> 5) % 120), c1y = 420 + ((h >> 7) % 80);
  const c2x = 220 + ((h >> 9) % 100), c2y = 240 + ((h >> 11) % 80);
  const path = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[480px] bg-background animate-fade-in">
      {/* Map canvas */}
      <div className="relative h-[100dvh] w-full overflow-hidden">
        {/* Base */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #eef4ee 0%, #e6efe8 60%, #e2ecdf 100%)" }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          {/* Parks */}
          <ellipse cx="80" cy="180" rx="70" ry="50" fill="#cfe6c8" />
          <ellipse cx="330" cy="500" rx="90" ry="60" fill="#cfe6c8" />
          <ellipse cx="60" cy="560" rx="50" ry="40" fill="#d6ead0" />
          <text x="80" y="185" textAnchor="middle" fontSize="9" fill="#4b6b46" fontWeight="600">Nagar Ghadi Park</text>
          <text x="330" y="505" textAnchor="middle" fontSize="9" fill="#4b6b46" fontWeight="600">MM Fun City</text>

          {/* River (Kharun) */}
          <path d="M -20 380 Q 120 340 220 400 T 420 360" stroke="#bcdcee" strokeWidth="26" fill="none" strokeLinecap="round" />
          <text x="300" y="378" fontSize="9" fill="#5f8aa6" fontWeight="600">Kharun River</text>

          {/* Blocks */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = (i * 53 + (h % 40)) % 380;
            const y = ((i * 91 + (h >> 4)) % 720) + 30;
            const w = 26 + (i % 3) * 10;
            const hh = 22 + ((i * 7) % 18);
            return <rect key={i} x={x} y={y} width={w} height={hh} rx="3" fill="#e8ecec" />;
          })}

          {/* Roads */}
          <g stroke="#ffffff" strokeLinecap="round">
            <path d="M -20 640 L 420 620" strokeWidth="14" />
            <path d="M 60 -20 L 80 820" strokeWidth="12" />
            <path d="M -20 300 Q 200 260 420 320" strokeWidth="10" />
            <path d="M 260 -20 L 300 820" strokeWidth="9" />
            <path d="M -20 480 L 420 460" strokeWidth="8" />
          </g>
          <g stroke="#d8d8d8" strokeWidth="1">
            <path d="M -20 640 L 420 620" />
            <path d="M 60 -20 L 80 820" />
          </g>

          {/* Landmarks */}
          <g fontSize="8" fill="#7a7a7a" fontWeight="600">
            <circle cx="150" cy="700" r="3" fill="#c9a06b" />
            <text x="158" y="703">Ghadi Chowk</text>
            <circle cx="280" cy="220" r="3" fill="#c9a06b" />
            <text x="288" y="223">Telibandha</text>
            <circle cx="100" cy="440" r="3" fill="#c9a06b" />
            <text x="108" y="443">Purani Basti</text>
          </g>

          {/* Route glow + line */}
          <path d={path} stroke="#2563eb" strokeOpacity="0.18" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path
            d={path}
            stroke="#2563eb"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{ animation: "dashDraw 1.4s ease-out forwards" }}
          />

          {/* Destination pin */}
          <g transform={`translate(${endX} ${endY})`}>
            <circle r="14" fill="#2563eb" fillOpacity="0.15" />
            <path d="M 0 -14 C 8 -14 12 -8 12 -3 C 12 5 0 14 0 14 C 0 14 -12 5 -12 -3 C -12 -8 -8 -14 0 -14 Z" fill="#ef4444" />
            <circle cy="-3" r="4" fill="#ffffff" />
          </g>

          {/* Current location dot */}
          <g transform={`translate(${startX} ${startY})`}>
            <circle r="18" fill="#2563eb" fillOpacity="0.15">
              <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.25;0.05;0.25" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
          </g>
        </svg>

        <style>{`@keyframes dashDraw { to { stroke-dashoffset: 0; } }`}</style>

        {/* Top back button */}
        <button
          onClick={() => navigate({ to: "/place/$id", params: { id: place.id } })}
          aria-label="Back"
          className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground shadow-lg"
          style={{ top: "max(env(safe-area-inset-top), 1rem)" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Top ETA chip */}
        <div
          className="absolute right-4 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold shadow-lg"
          style={{ top: "max(env(safe-area-inset-top), 1rem)" }}
        >
          <Clock className="h-3.5 w-3.5 text-primary" />
          Arrives {eta}
        </div>

        {/* Floating info card */}
        <div
          className="absolute inset-x-3 z-10 rounded-3xl border border-border/60 bg-card/95 p-4 shadow-[var(--shadow-hero)] backdrop-blur-xl animate-fade-in"
          style={{ bottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Car className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Driving to</p>
              <h1 className="truncate font-display text-lg font-semibold leading-tight">{place.name}</h1>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> <span className="truncate">{place.address}</span>
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat icon={<RouteIcon className="h-4 w-4" />} label="Distance" value={formatDistance(place.distanceKm)} />
            <Stat icon={<Clock className="h-4 w-4" />} label="Time" value={`${minutes} min`} />
            <Stat icon={<Car className="h-4 w-4" />} label="Mode" value="Car" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => navigate({ to: "/place/$id", params: { id: place.id } })}
              className="h-12 flex-1 rounded-2xl bg-secondary text-sm font-semibold text-secondary-foreground transition-transform active:scale-[0.98]"
            >
              Back
            </button>
            <button
              onClick={() => toast.success("Navigation started")}
              className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-[var(--shadow-hero)] transition-transform active:scale-[0.98]"
            >
              <Navigation className="h-5 w-5" /> Start Navigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-2.5">
      <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-0.5 font-display text-base font-semibold">{value}</p>
    </div>
  );
}
