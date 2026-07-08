import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  transparent?: boolean;
  onBack?: () => void;
}

export function Header({ title, back = true, right, transparent = false, onBack }: Props) {
  const navigate = useNavigate();
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center justify-between px-3",
        transparent ? "bg-transparent" : "bg-background/85 backdrop-blur-md border-b border-border/60"
      )}
    >
      <div className="flex items-center gap-2">
        {back && (
          <button
            onClick={() => (onBack ? onBack() : navigate({ to: "/home" as never }) || window.history.back())}
            aria-label="Back"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors active:scale-95",
              transparent ? "bg-black/30 text-white backdrop-blur-md" : "bg-secondary text-foreground"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {title && (
          <h1 className={cn("text-base font-semibold", transparent && "sr-only")}>{title}</h1>
        )}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  );
}
