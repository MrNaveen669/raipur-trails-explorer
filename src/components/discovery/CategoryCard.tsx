import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryChip({ category }: { category: Category }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ?? Icons.MapPin;
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className="flex shrink-0 flex-col items-center gap-1.5"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[var(--shadow-card)] transition-transform active:scale-95"
        style={{ backgroundColor: category.tint }}
      >
        <Icon className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <span className="text-[11px] font-medium text-foreground">{category.name}</span>
    </Link>
  );
}

export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[category.icon] ?? Icons.MapPin;
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className={cn("group relative block h-40 shrink-0 overflow-hidden rounded-3xl", className)}
    >
      <img src={category.cover} alt={category.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-active:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md"
          style={{ backgroundColor: `color-mix(in oklab, ${category.tint} 70%, transparent)` }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">{category.name}</h3>
          <p className="mt-0.5 text-xs text-white/85">{category.count} places · {category.blurb}</p>
        </div>
      </div>
    </Link>
  );
}
