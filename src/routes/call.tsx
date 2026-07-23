import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Volume2, Mic, Grid3x3, Plus, Bluetooth, PhoneOff } from "lucide-react";

export const Route = createFileRoute("/call")({
  head: () => ({
    meta: [
      { title: "Calling... Coll utha re naveen" },
      { name: "description", content: "Dummy incoming/outgoing call screen for the City Discovery prototype." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CallScreen,
});

const controls = [
  { label: "Speaker", Icon: Volume2 },
  { label: "Mute", Icon: Mic },
  { label: "Keypad", Icon: Grid3x3 },
  { label: "Add Call", Icon: Plus },
  { label: "Bluetooth", Icon: Bluetooth },
];

function CallScreen() {
  const navigate = useNavigate();

  return (
    <div className="dark mx-auto flex min-h-dvh w-full max-w-[480px] animate-fade-in flex-col justify-between bg-background text-foreground">
      {/* Caller info */}
      <div className="flex flex-col items-center px-6 pt-10" style={{ paddingTop: "max(env(safe-area-inset-top), 2.5rem)" }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Calling...</p>
        <h1 className="mt-3 text-center font-display text-3xl font-semibold text-foreground">Coll utha re naveen</h1>

        {/* Avatar with pulsing rings */}
        <div className="relative mt-10 flex h-32 w-32 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full border border-primary/30 animate-pulse-ring"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-ring"
            style={{ animationDelay: "0.6s" }}
          />
          <span
            className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring"
            style={{ animationDelay: "1.2s" }}
          />
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-3xl font-semibold shadow-lg ring-4 ring-background/20">
            CN
          </div>
        </div>

        {/* Sound waves */}
        <div className="mt-10 flex h-8 items-end gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-primary/70 animate-sound-wave"
              style={{
                height: `${12 + (i % 3) * 8}px`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-6 px-6 pb-8" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 2rem)" }}>
        <div className="grid w-full grid-cols-3 gap-x-4 gap-y-5">
          {controls.map(({ label, Icon }) => (
            <button
              key={label}
              aria-label={label}
              className="group flex flex-col items-center gap-2"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/80 text-foreground transition-transform active:scale-95">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            navigate({ to: -1 });
          }}
          aria-label="End Call"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-[0_12px_32px_-8px_oklch(0.58_0.22_25/0.55)] transition-transform active:scale-95"
        >
          <PhoneOff className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
