import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SearchBar({ placeholder = "Search temples, food, gems…", asLink = true }: { placeholder?: string; asLink?: boolean }) {
  const inner = (
    <div className="glass-card flex h-12 w-full items-center gap-3 rounded-2xl px-4">
      <Search className="h-5 w-5 text-[color:var(--gold)]" strokeWidth={1.7} />
      <span className="flex-1 truncate text-sm text-muted-foreground">{placeholder}</span>
      <span className="rounded-lg border border-[color:var(--gold)]/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--gold)]">Filters</span>
    </div>
  );
  return asLink ? (
    <Link to="/search" className="block">
      {inner}
    </Link>
  ) : inner;
}
