import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

export function SectionHeader({
  title,
  eyebrow,
  linkTo,
  linkParams,
  action,
}: {
  title: string;
  eyebrow?: string;
  linkTo?: string;
  linkParams?: Record<string, string>;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between px-4">
      <div>
        {eyebrow && <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>}
        <h2 className="font-display text-[22px] font-semibold leading-tight text-ink">{title}</h2>
      </div>
      {action}
      {linkTo && !action && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Link to={linkTo as any} params={linkParams as any} className="flex items-center gap-0.5 text-xs font-semibold text-primary">
          See all <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function Rail({ children }: { children: ReactNode }) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-1">
      {children}
    </div>
  );
}
