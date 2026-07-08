import { Heart } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  id,
  className,
  size = 20,
  variant = "overlay",
}: {
  id: string;
  className?: string;
  size?: number;
  variant?: "overlay" | "plain";
}) {
  const { has, toggle } = useFavorites();
  const active = has(id);
  const [pop, setPop] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
        setPop(true);
        setTimeout(() => setPop(false), 500);
      }}
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center rounded-full transition-transform active:scale-90",
        variant === "overlay"
          ? "h-9 w-9 bg-white/85 text-foreground backdrop-blur-md shadow-sm dark:bg-black/40 dark:text-white"
          : "h-10 w-10 bg-secondary text-foreground",
        className
      )}
    >
      <Heart
        style={{ width: size, height: size }}
        className={cn(
          "transition-colors",
          active ? "fill-accent text-accent" : "text-foreground/70",
          pop && "animate-heart-pop"
        )}
      />
    </button>
  );
}
