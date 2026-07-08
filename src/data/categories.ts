import type { Category } from "@/lib/types";
import temples from "@/assets/cat-temples.jpg";
import restaurants from "@/assets/cat-restaurants.jpg";
import parks from "@/assets/cat-parks.jpg";
import attractions from "@/assets/cat-attractions.jpg";
import hotels from "@/assets/cat-hotels.jpg";
import events from "@/assets/cat-events.jpg";
import shopping from "@/assets/cat-shopping.jpg";
import hidden from "@/assets/cat-hidden.jpg";

export const categories: Category[] = [
  { slug: "temples",     name: "Temples",     icon: "Landmark",   tint: "oklch(0.65 0.16 40)",  cover: temples,     count: 12, blurb: "Sacred sites & spiritual retreats" },
  { slug: "restaurants", name: "Restaurants", icon: "UtensilsCrossed", tint: "oklch(0.60 0.18 25)", cover: restaurants, count: 18, blurb: "From street eats to fine dining" },
  { slug: "parks",       name: "Parks",       icon: "Trees",      tint: "oklch(0.55 0.14 155)", cover: parks,       count: 9,  blurb: "Green escapes in the city" },
  { slug: "attractions", name: "Attractions", icon: "Camera",     tint: "oklch(0.55 0.14 220)", cover: attractions, count: 14, blurb: "Must-see landmarks & tours" },
  { slug: "hotels",      name: "Hotels",      icon: "BedDouble",  tint: "oklch(0.55 0.10 280)", cover: hotels,      count: 11, blurb: "Rest well after the day" },
  { slug: "events",      name: "Events",      icon: "PartyPopper", tint: "oklch(0.68 0.18 340)", cover: events,     count: 6,  blurb: "Festivals, fairs & shows" },
  { slug: "shopping",    name: "Shopping",    icon: "ShoppingBag", tint: "oklch(0.65 0.15 80)", cover: shopping,   count: 8,  blurb: "Markets, malls & handicrafts" },
  { slug: "hidden-gems", name: "Hidden Gems", icon: "Sparkles",   tint: "oklch(0.55 0.14 190)", cover: hidden,      count: 7,  blurb: "Places locals love" },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<string, Category>;
