import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "cd:favorites";
const ONBOARD_KEY = "cd:onboarded";

type Listener = () => void;
const listeners = new Set<Listener>();

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

let cache: Set<string> | null = null;

function get(): Set<string> {
  if (cache === null) cache = read();
  return cache;
}

function write(next: Set<string>) {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(Array.from(next)));
  }
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useFavorites() {
  const set = useSyncExternalStore(
    subscribe,
    () => get(),
    () => new Set<string>() as Set<string>
  );
  return {
    ids: set,
    has: (id: string) => set.has(id),
    toggle: (id: string) => {
      const next = new Set(get());
      if (next.has(id)) next.delete(id); else next.add(id);
      write(next);
    },
    clear: () => write(new Set()),
    count: set.size,
  };
}

export function useOnboarded() {
  const [done, setDone] = useState<boolean | null>(null);
  useEffect(() => {
    setDone(typeof window !== "undefined" && window.localStorage.getItem(ONBOARD_KEY) === "1");
  }, []);
  const complete = () => {
    if (typeof window !== "undefined") window.localStorage.setItem(ONBOARD_KEY, "1");
    setDone(true);
  };
  return { done, complete };
}
