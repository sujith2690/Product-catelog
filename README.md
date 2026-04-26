# Dynamic Multi‑Category Product Catalog

Production‑ready React app that reads local JSON data and dynamically renders categories + item details.

## Tech stack
- React + TypeScript (functional components + hooks)
- React Router (lazy‑loaded pages)
- Tailwind CSS + shadcn/ui‑style components (local `src/components/ui/*`)
- Optional animations via Framer Motion

## Run locally
From this folder (`catalog/`):

```bash
npm install
npm run dev
```

Build/preview:

```bash
npm run build
npm run preview
```

## Data source
- The original dataset lives in your workspace root as `../data.tsx`.
- For Vite compatibility, it is copied into `src/data/rawData.ts` and normalized in `src/data/items.ts`.
- Item properties support both shapes: `{ label, value }` and `{ key, value }`.

## App features
- **Home**: dynamic categories, preview items, “View all” per category
- **Item detail**: `/:category/:itemSlug`, breadcrumbs, image + dynamic property list
- **Search + filtering**: query + category filter + favorites filter (URL‑backed)
- **Dark mode**: persisted toggle (localStorage), `dark` class strategy
- **Loading/empty/error**: skeletons, empty states, error boundary

## Project structure
- `src/components/`: reusable components (cards, grids, states, etc.)
- `src/components/ui/`: shadcn/ui‑style primitives (`Button`, `Card`, `Badge`, `Input`, etc.)
- `src/pages/`: route pages (`HomePage`, `ItemDetailPage`, `NotFoundPage`)
- `src/hooks/`: reusable hooks (theme, favorites, query params, debounce)
- `src/utils/`: selectors + slug helpers
- `src/types/`: strict TypeScript types
- `src/layout/`: app layout + header

