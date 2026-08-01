import { useSyncExternalStore } from "react";

const KEY = "cd:premium";

type Listener = () => void;
const listeners = new Set<Listener>();

let cache: boolean | null = null;

function get(): boolean {
  if (cache === null) {
    if (typeof window === "undefined") return false;
    try {
      cache = window.localStorage.getItem(KEY) === "1";
    } catch {
      cache = false;
    }
  }
  return cache;
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function set(v: boolean) {
  cache = v;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l());
}

export function usePremium() {
  const active = useSyncExternalStore(
    subscribe,
    () => get(),
    () => false,
  );
  return {
    active,
    activate: () => set(true),
    cancel: () => set(false),
  };
}
