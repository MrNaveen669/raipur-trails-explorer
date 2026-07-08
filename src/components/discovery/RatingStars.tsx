import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  size = 14,
  showValue = true,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-foreground", className)}>
      <Star className="fill-gold text-gold" style={{ width: size, height: size }} />
      {showValue && <span>{value.toFixed(1)}</span>}
    </span>
  );
}
