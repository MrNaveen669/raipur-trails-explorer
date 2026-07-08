import type { Review, Event } from "@/lib/types";
import { places } from "./places";

const AUTHORS = [
  ["Ananya S.", "ananya"], ["Rohit K.", "rohit"], ["Priya M.", "priya"],
  ["Vikram J.", "vikram"], ["Neha P.", "neha"], ["Aditya R.", "aditya"],
  ["Sneha D.", "sneha"], ["Karthik N.", "karthik"],
];

const SNIPPETS = [
  "Absolutely stunning at sunset. Came back three times this trip.",
  "Very peaceful in the morning. Locals were welcoming and the space is spotless.",
  "The food is unreal — order the traditional platter and don't skip dessert.",
  "Kids loved it. Plenty of shade, benches, and clean restrooms.",
  "A must-visit if you're in Raipur even for a day. The energy is special.",
  "Slightly crowded on weekends but worth the wait.",
  "Hidden gem for real. Wish I'd known about this on day one.",
];

export const reviews: Review[] = places.flatMap((p, i) =>
  Array.from({ length: 3 + (i % 3) }, (_, k) => {
    const [author, seed] = AUTHORS[(i + k) % AUTHORS.length];
    return {
      id: `${p.id}-r${k}`,
      placeId: p.id,
      author,
      avatarSeed: seed,
      rating: Math.min(5, Math.max(3, Math.round(p.rating + (k % 2 === 0 ? 0 : -0.5)))),
      date: new Date(Date.now() - (k + i) * 86400000 * 7).toISOString(),
      text: SNIPPETS[(i + k) % SNIPPETS.length],
      helpful: 3 + ((i + k) % 24),
    } satisfies Review;
  })
);

export const reviewsFor = (placeId: string) => reviews.filter((r) => r.placeId === placeId);

// A few reviews the "user" has written
export const myReviews: Review[] = [
  reviews[0], reviews[8], reviews[15], reviews[22],
].filter(Boolean).map((r) => ({ ...r, author: "You", avatarSeed: "me" }));

export const events: Event[] = [
  { id: "e1", title: "Rajim Kumbh Kalpa", venue: "Rajim Sangam", date: "2026-02-12", cover: "https://picsum.photos/seed/rajimkumbh-e/800/500", tag: "Festival" },
  { id: "e2", title: "Raipur Food Festival", venue: "Marine Drive", date: "2026-07-18", cover: "https://picsum.photos/seed/foodfest-e/800/500", tag: "Food" },
  { id: "e3", title: "Chakradhar Samaroh", venue: "Ramlila Maidan", date: "2026-08-30", cover: "https://picsum.photos/seed/chakradhar-e/800/500", tag: "Dance" },
  { id: "e4", title: "Bastar Dussehra", venue: "Jagdalpur", date: "2026-10-05", cover: "https://picsum.photos/seed/bastardussehra-e/800/500", tag: "Cultural" },
];

export const trendingSearches = [
  "Chhattisgarhi thali", "Mahamaya Temple", "Marine Drive food",
  "Waterfalls near Raipur", "Best cafes", "Weekend getaways",
];

export const recentSearchesSeed = ["Nandan Van", "Sadar Bazaar", "Purkhauti Muktangan"];
