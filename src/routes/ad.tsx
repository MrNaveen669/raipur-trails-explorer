import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Phone, Sparkles } from "lucide-react";
import adImg from "@/assets/ad-jewellery.jpg";

export const Route = createFileRoute("/ad")({
  head: () => ({
    meta: [
      { title: "Shree Ratnam Jewellers — Sponsored" },
      { name: "description", content: "Celebrate every moment with pure gold & diamond jewellery. Flat 20% off on making charges." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdSplash,
});

function AdSplash() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try { sessionStorage.setItem("cd:ad-shown", "1"); } catch {}
    const iv = setInterval(() => setCount((c) => (c > 0 ? c - 1 : 0)), 1000);
    const fade = setTimeout(() => setLeaving(true), 4600);
    const go = setTimeout(() => navigate({ to: "/home", replace: true }), 5000);
    return () => { clearInterval(iv); clearTimeout(fade); clearTimeout(go); };
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{
        background:
          "radial-gradient(circle at 20% 10%, oklch(0.97 0.03 85 / 0.9), transparent 55%), radial-gradient(circle at 80% 90%, oklch(0.92 0.06 75 / 0.85), transparent 60%), linear-gradient(180deg, #fbf7ef 0%, #f4ecd8 55%, #ece0bf 100%)",
      }}
    >
      {/* marble veins */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(200,170,110,0.35), transparent 55%)",
        }}
      />

      {/* sparkles */}
      <Sparkle style={{ top: "12%", left: "10%", animationDelay: "0.2s" }} />
      <Sparkle style={{ top: "22%", right: "14%", animationDelay: "0.9s" }} />
      <Sparkle style={{ top: "60%", left: "8%", animationDelay: "1.5s" }} />
      <Sparkle style={{ top: "72%", right: "12%", animationDelay: "0.6s" }} />

      <div className="relative z-10 flex h-full flex-col px-6 pb-6 pt-8">
        <div className="text-center animate-slide-up-fade">
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#a17b2b]">Sponsored</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-[#3d2c10]" style={{ letterSpacing: "0.01em" }}>
            Shree Ratnam Jewellers
          </h1>
          <p className="mt-1 text-xs italic text-[#8a6a2a]">Timeless Elegance • Trusted Since 1998</p>
        </div>

        {/* Hero image with glow + zoom */}
        <div className="relative mx-auto mt-5 w-full max-w-xs animate-slide-up-fade">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(220,180,90,0.55), transparent 70%)" }}
          />
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-[#d9bd7a]/60 shadow-[0_25px_60px_-20px_rgba(120,80,20,0.45)]">
            <img
              src={adImg}
              alt="Gold and diamond bridal jewellery collection"
              width={1024}
              height={1280}
              className="h-64 w-full object-cover ad-zoom"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#c8972b] to-[#f0d071] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3d2c10] shadow-md">
              Flat 20% OFF on Making Charges
            </div>
          </div>
        </div>

        <div className="mt-5 text-center animate-slide-up-fade">
          <h2 className="font-display text-lg font-semibold leading-snug text-[#2d2107] text-balance">
            Celebrate Every Moment with Pure Gold &amp; Diamond Jewellery
          </h2>
          <p className="mx-auto mt-2 max-w-[18rem] text-[11px] leading-relaxed text-[#5a4620]">
            Handcrafted Gold, Diamond, Silver &amp; Bridal Collections designed for every special occasion.
          </p>
        </div>

        <div className="mx-auto mt-4 flex w-full max-w-xs flex-col gap-2 rounded-2xl border border-[#d9bd7a]/50 bg-white/50 px-4 py-3 backdrop-blur animate-slide-up-fade">
          <div className="flex items-center gap-2 text-xs text-[#3d2c10]">
            <MapPin className="h-3.5 w-3.5 text-[#a17b2b]" />
            <span>Sadar Bazar, Raipur</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#3d2c10]">
            <Phone className="h-3.5 w-3.5 text-[#a17b2b]" />
            <span>+91 98765 43210</span>
          </div>
        </div>

        <div className="mt-auto flex flex-col items-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => setLeaving(true)}
            className="rounded-full bg-gradient-to-r from-[#8a6220] via-[#c8972b] to-[#8a6220] px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(140,90,20,0.7)] ring-1 ring-[#f0d071]/60"
          >
            Visit Store
          </button>
          <p className="text-[11px] font-medium tracking-wide text-[#5a4620]">
            Opening My City in <span className="font-display text-base text-[#8a6220]">{count > 0 ? count : 1}</span>...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ad-zoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        .ad-zoom { animation: ad-zoom 5s ease-out forwards; }
        @keyframes ad-sparkle { 0%,100% { opacity: 0; transform: scale(0.5) rotate(0deg); } 50% { opacity: 1; transform: scale(1) rotate(180deg); } }
        .ad-sparkle { animation: ad-sparkle 2.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function Sparkle({ style }: { style: React.CSSProperties }) {
  return (
    <div className="ad-sparkle pointer-events-none absolute" style={style}>
      <Sparkles className="h-4 w-4 text-[#d4a53a]" />
    </div>
  );
}
