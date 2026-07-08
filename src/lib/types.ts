export type CategorySlug =
  | "temples"
  | "restaurants"
  | "parks"
  | "attractions"
  | "hotels"
  | "events"
  | "shopping"
  | "hidden-gems";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string; // lucide icon name
  tint: string; // css color token or hex
  cover: string;
  count: number;
  blurb: string;
}

export interface Place {
  id: string;
  name: string;
  category: CategorySlug;
  rating: number; // 1 decimal
  reviewCount: number;
  address: string;
  area: string;
  city: string;
  distanceKm: number;
  priceLevel: 1 | 2 | 3 | 4;
  hoursToday: string;
  isOpen: boolean;
  tags: string[];
  gallery: string[];
  cover: string;
  description: string;
  isHiddenGem?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  coords: { lat: number; lng: number };
}

export interface Review {
  id: string;
  placeId: string;
  author: string;
  avatarSeed: string;
  rating: number;
  date: string; // ISO
  text: string;
  helpful: number;
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  date: string; // ISO
  cover: string;
  tag: string;
}
