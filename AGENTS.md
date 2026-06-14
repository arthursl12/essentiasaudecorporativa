# Essentia Saúde Corporativa — Agent Guide

## Stack

React 19 + Vite 6 + TypeScript + Tailwind v4 (`@theme` directive in `src/index.css` — **no** `tailwind.config.*`/`postcss.config.*`) + `motion` + `lucide-react`.

Single-page landing page, pt-BR, all content in one component (`src/App.tsx`, ~1472 lines). Entry: `index.html` → `src/main.tsx` → `App.tsx`.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server on `0.0.0.0:3000` |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type-check only (`tsc --noEmit`) — no ESLint/Prettier |
| `npm run clean` | Removes `dist/` and `server.js` |

No test framework configured.

## Env

- `GEMINI_API_KEY` — required (injected by AI Studio at runtime)
- `APP_URL` — optional (for callbacks)
- `DISABLE_HMR=true` — disables HMR + file watching (saves CPU in AI Studio)

Copy `.env.example` → `.env.local`.

## Architecture

```
src/
  main.tsx          # React entry
  App.tsx           # Entire app SPA (single component)
  data.ts           # All content: services, testimonials, metrics
  types.ts          # Enums (ServiceFormat) and interfaces
  index.css         # Tailwind v4 theme via @theme, font imports
  assets/images/    # 2 JPG images
```

## Quirks

- **Tailwind v4**: theme defined in CSS via `@theme {}` directive in `index.css`. Custom colors: `brand-primary`, `brand-sage`, `brand-green-accent`, etc. No JS config file.
- **Path alias**: `@/*` maps to project root (e.g. `@/src/data`), **not** `./src/*`.
- **tsconfig**: `experimentalDecorators: true`, `useDefineForClassFields: false`.
- **Leads**: persisted in `localStorage` key `essentia_leads`.
- **WhatsApp**: number `5531991422212` (31 99142-2212).
- **AI Studio**: Express in deps but not used in src — `server.js` is generated at build by AI Studio deployment.
- **No CI, no pre-commit hooks, no linter/formatter** — only `tsc --noEmit`.
