import { useSyncExternalStore } from "react";

const KEY = "cd:premium";

type Listener = () => void;
const listeners = new Set<Listener>();

let cache: string | null = null;

function get(): string {
  if (cache === null) {
    cache = typeof window === "undefined" ? "0" : window.localStorage.getItem(KEY) ?? "0";
  }
  return cache;
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function usePremium() {
  const value = useSyncExternalStore(subscribe, get, () => "0");
  return {
    isPremium: value === "1",
    activate: () => {
      cache = "1";
      if (typeof window !== "undefined") window.localStorage.setItem(KEY, "1");
      listeners.forEach((l) => l());
    },
    cancel: () => {
      cache = "0";
      if (typeof window !== "undefined") window.localStorage.setItem(KEY, "0");
      listeners.forEach((l) => l());
    },
  };
}
