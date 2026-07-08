
# City Discovery — Raipur Edition (v1)

A mobile-first **web app** built in this project's stack (React 19 + TanStack Start + Tailwind v4) that looks and feels like a native mobile app. Frontend-only, mock data, no backend.

Note on stack: React Native / Expo isn't available in this project. We'll build a PWA-quality mobile web experience with the same UX patterns (bottom nav, bottom sheets, sticky CTAs, swipe carousels, fluid transitions). Preview will be locked to the mobile viewport.

## Scope (v1)

**11 screens** — the two subsets you picked:

Core discovery: Splash · Onboarding · Home · Explore · Search · Category · Place Detail
Personal: Favorites · Reviews · Profile · Settings

Deferred (not in v1): Premium, Offline Maps, Events screen. (Upcoming Events will still appear as a section on Home.)

**City:** Raipur only, ~50 richly-detailed places across all categories.

## Design direction

Travel-premium, highly visual, warm-with-confidence. Inspired by Airbnb (cards, whitespace, imagery-forward), Google Maps (bottom sheets, sticky action bar), Zomato (dense discovery scroll), Spotify (rounded pills, curated rails).

- Palette: warm ivory background, deep forest-green primary, terracotta accent, charcoal ink — evokes Chhattisgarh's temples + landscape without kitsch.
- Type: display serif for hero moments (place names, section headers), clean grotesk for UI/body.
- Rounded-2xl cards, soft elevation, generous imagery, sticky bottom nav with 5 tabs.
- Motion: fade+slide screen transitions, spring-based save/heart animation, skeleton loaders, bottom-sheet drag.

## Folder structure

```text
src/
  routes/
    __root.tsx              (mobile shell: safe-area, bottom nav slot)
    index.tsx               (Splash — auto-advances)
    onboarding.tsx
    home.tsx
    explore.tsx
    search.tsx
    category.$slug.tsx
    place.$id.tsx
    favorites.tsx
    reviews.tsx
    profile.tsx
    settings.tsx
  components/
    layout/         MobileShell, BottomNav, Header, SafeArea
    ui/             (existing shadcn primitives)
    discovery/      SearchBar, CategoryChip, CategoryCard, PlaceCard,
                    PlaceCardHorizontal, HiddenGemCard, EventCard,
                    SectionHeader, HorizontalRail
    place/          HeroGallery, RatingStars, OpenStatusBadge,
                    ReviewCard, MapPreview, StickyActionBar,
                    NearbyRail, FavoriteButton
    sheets/         FilterSheet, ShareSheet, ReviewSheet
    feedback/       Skeleton*, EmptyState
  data/
    places.ts       (~50 Raipur places)
    categories.ts   (8 categories w/ icon, color, cover, count)
    reviews.ts      (mock reviews per place)
    events.ts       (upcoming Raipur events)
    trending.ts     (recent + trending searches)
  lib/
    favorites.ts    (localStorage-backed favorites store + hook)
    types.ts        (Place, Category, Review, Event)
    format.ts       (distance, open-status, rating helpers)
```

## Navigation

- **Bottom tab nav** (persistent on Home / Explore / Favorites / Profile): Home · Explore · Search · Favorites · Profile.
- Splash → Onboarding (first visit, gated by localStorage flag) → Home.
- Category, Place Detail, Reviews, Settings push above the tab shell with a back header; sticky bottom CTA on Place Detail replaces the tab bar.
- Type-safe `<Link to="/place/$id" params={{id}} />` throughout; no href interpolation.

## Design system (in `src/styles.css`)

Tokens added via `@theme` + `:root`:
- Colors: `--primary` forest green, `--accent` terracotta, `--background` warm ivory, `--ink`, `--muted`, `--success`/`--warning` for open/closed pills.
- Radius scale up to `rounded-3xl` for hero cards.
- Shadow tokens: `--shadow-card`, `--shadow-sheet`, `--shadow-sticky`.
- Type scale: display (serif), title, body, caption, overline.
- Web fonts loaded via `<link>` in `__root.tsx` head (Fraunces + Inter or similar).

## Screens (what each contains)

1. **Splash** — logo, gradient, 1.2s auto-advance.
2. **Onboarding** — 3 swipe slides (Discover · Save · Navigate) with skip.
3. **Home** — location pill, search bar, 8 category chips, then rails: Trending · Hidden Gems · Popular Restaurants · Famous Temples · Weekend Destinations · Upcoming Events · Featured Businesses.
4. **Explore** — full-bleed map preview at top (static styled image), scrollable list of places below with filter chips.
5. **Search** — focused input, recent searches, trending searches, instant filtered results as user types, category + distance + rating filters via bottom sheet.
6. **Category** — hero cover, place count, sort dropdown, grid/list toggle, filter sheet.
7. **Place Detail** — hero image carousel, name/category/rating, open-status pill, address, description, photo grid, review preview (3 + "see all"), static map preview, nearby rail, sticky bottom action bar (Save · Navigate · Share · Review).
8. **Favorites** — empty state; when populated: collection tabs, grid/list toggle.
9. **Reviews** — list of user's mock reviews with edit affordance.
10. **Profile** — avatar header, stats (saved, reviews, level), links to Reviews / Favorites / Settings / Help.
11. **Settings** — theme, language, notifications, about, sign out (mock).

## Mock data (Raipur)

~50 places across Temples (Mahamaya, Dudhadhari Math, Hatkeshwar…), Parks (Nandan Van, Marine Drive, Energy Park), Restaurants (indie + chains, regional cuisine), Tourist Attractions (Purkhauti Muktangan, MM Fun City), Hotels, Shopping (Magneto Mall, Jaistambh Chowk market), Hidden Gems, Events (Rajim Kumbh, Chakradhar Samaroh, food festivals). Each place: id, name, category, rating (1-decimal), reviewCount, address, area, coords, hours, priceLevel, tags, gallery (4–6 images), description, isHiddenGem, isFeatured.

Images: generated hero covers for each category + Raipur landmarks; remaining gallery slots use tasteful stock references.

## State & persistence

Favorites persisted to `localStorage` via a small `useFavorites` hook + Zustand-free custom store. Onboarding-seen flag in `localStorage`. No server functions, no Cloud.

## Technical details

- Preview locked to **mobile viewport**.
- Each route defines its own `head()` with unique title + description + og tags.
- Bottom nav hidden on Splash / Onboarding / Place Detail (sticky CTA takes over).
- Reanimated-style motion via Tailwind + `tw-animate-css` + a few Motion for React touches for the save-heart pop, sheet drag, and page transitions.
- Skeleton components for every rail while "loading" (simulated 300ms on first mount).
- All colors via semantic tokens — no hardcoded hex in components.
- SEO/head metadata set per route; app title "City Discovery — Raipur" replaces the Lovable defaults.

## Build order

1. Design tokens + fonts + `MobileShell` + `BottomNav`.
2. Mock data + types + favorites store.
3. Reusable components (SearchBar, PlaceCard, CategoryCard, RatingStars, HeroGallery, StickyActionBar, sheets, skeletons).
4. Splash → Onboarding → Home.
5. Explore, Search, Category, Place Detail.
6. Favorites, Reviews, Profile, Settings.
7. Motion polish + skeleton timing + empty states + head metadata pass.

Ready to build on approval.
