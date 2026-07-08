import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Moon, Bell, Globe, Shield, LogOut, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — City Discovery" }] }),
  component: Settings,
});

function Settings() {
  const [dark, setDark] = useState(false);
  const [notif, setNotif] = useState(true);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <MobileShell>
      <div className="flex items-center gap-2 px-3 pt-3">
        <Link to="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary" aria-label="Back">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-display text-xl font-semibold">Settings</h1>
      </div>

      <section className="mt-4 px-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Appearance</p>
        <div className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
          <ToggleRow Icon={Moon} label="Dark mode" hint="Comfortable for evening browsing" value={dark} onChange={toggleDark} />
        </div>
      </section>

      <section className="mt-6 px-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Preferences</p>
        <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
          <ToggleRow Icon={Bell} label="Notifications" hint="Events, saved place updates" value={notif} onChange={() => setNotif((v) => !v)} />
          <LinkRow Icon={Globe} label="Language" value="English (India)" />
          <LinkRow Icon={Shield} label="Privacy" value="Manage" />
        </div>
      </section>

      <section className="mt-6 px-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">About</p>
        <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-semibold">Version</span>
            <span className="text-xs text-muted-foreground">1.0.0 (Raipur)</span>
          </div>
          <button className="flex w-full items-center justify-between p-4 text-left">
            <span className="text-sm font-semibold">Terms & privacy</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </section>

      <div className="mt-6 px-4">
        <button
          onClick={() => toast("Signed out (demo)")}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-secondary text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </MobileShell>
  );
}

function ToggleRow({ Icon, label, hint, value, onChange }: { Icon: typeof Moon; label: string; hint?: string; value: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={onChange}
        className={`relative h-7 w-12 rounded-full transition-colors ${value ? "bg-primary" : "bg-border"}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${value ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}

function LinkRow({ Icon, label, value }: { Icon: typeof Globe; label: string; value?: string }) {
  return (
    <button className="flex w-full items-center gap-3 p-4 text-left">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1 text-sm font-semibold">{label}</span>
      {value && <span className="text-xs text-muted-foreground">{value}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
