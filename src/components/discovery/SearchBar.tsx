import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SearchBar({ placeholder = "Search temples, food, gems…", asLink = true }: { placeholder?: string; asLink?: boolean }) {
  const inner = (
    <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 shadow-[var(--shadow-card)]">
      <Search className="h-5 w-5 text-muted-foreground" />
      <span className="flex-1 truncate text-sm text-muted-foreground">{placeholder}</span>
      <span className="rounded-lg bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Filters</span>
    </div>
  );
  return asLink ? (
    <Link to="/search" className="block">
      {inner}
    </Link>
  ) : inner;
}
