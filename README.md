# KMEDITOUR — Next.js

The KMEDITOUR site, migrated to **Next.js (App Router, TypeScript)** for Vercel hosting.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also validates Vercel readiness)
npm start        # serve the production build
```

## Deploy to Vercel

The repo root is the Next.js app, so Vercel auto-detects everything:

1. Push this repo to GitHub.
2. In Vercel: **New Project → Import** the repo. Framework = Next.js (auto). Build = `next build` (auto), Output = `.next` (auto).
3. Deploy.

(Or run `npx vercel` from the project root.)

## Architecture (Phase 1 migration)

This is the first migration step: a real Next.js app that renders the original,
pixel-faithful markup and reuses the existing CSS/JS — zero visual regression.

- **Routing** — one route per page under `app/` (`/`, `/about`, `/procedure`, …).
  Each `page.tsx` imports its page-specific CSS and renders `<LegacyPage file="x.html" />`.
- **`lib/legacy.ts`** — reads the original `*.html` at build time, returns the
  `<body>` markup (with `.html` links rewritten to clean routes and asset paths to
  `/assets/…`) plus the scripts it declared.
- **`components/LegacyPage.tsx`** — renders that markup and loads the page's scripts
  via `next/script`.
- **Global CSS** — imported once in `app/layout.tsx` (reset, font, theme, shared
  components, common). Page-specific CSS is imported per route.
- **Assets / JS** — served from `public/assets` and `public/js`.
- **Navigation** — plain `<a>` (full reload), matching the original multi-page behavior,
  so the vanilla JS re-runs cleanly on every page.

### Source of truth
The original `*.html`, `css/`, and `js/` files are kept and are read at build time —
**do not delete them.** `public/assets` and `public/js` are copies for runtime serving.

## Phase 2 (next step, optional)
Incrementally replace the `dangerouslySetInnerHTML` bodies with hand-authored JSX
components (starting with shared chrome: header, GNB, footer, bottom bar) and convert
navigation to `next/link` + React state, retiring the vanilla JS file by file.
