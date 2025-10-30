# GAIA v2.0 · Phase 5 · Week 1 — Overlay Patch

This overlay **adds** the Slim App Bar (global Search), **Settings** (Theme + default Button/Search primitives),
moves/creates the **Intro** page under *Archives → GAIA → Intro*, and scaffolds feature folders with `tracker.md`.
It does **not** delete your old files; copy the contents into your repo root and merge/replace where appropriate.

## What’s included
- `components/AppBar.tsx` — slim top bar (GAIA/G + global Search + User menu)
- `components/UserMenu.tsx` — avatar/name with dropdown → **Settings**
- `components/primitives/Button.tsx` — default button primitive
- `components/primitives/SearchBar.tsx` — global Search input used by AppBar
- `app/search/page.tsx` — centralized search results page (reads `data/searchIndex.json`)
- `app/settings/page.tsx` — per-user Theme picker + default Button/Search style
- `app/Archives/GAIA/Intro/page.tsx` — Intro page placement (Phase-5 canonical location)
- `app/Citadel/tracker.md` … `app/Timelines/tracker.md` — feature trackers
- `lib/theme.ts` — tiny theming helper
- `styles/theme.css` — minimal theme surface (data-theme)
- `data/searchIndex.json` — placeholder search index (replace with your content)
- `docs/REMOVALS.md` — checklist to fully remove NAV1 + old search bars
- `TRACE_UI-THEME.md` — lines & paths touched for theme-related logic

## How to apply
1) Unzip into your repo root (Next.js App Router).
2) Ensure `app/layout.tsx` includes the **AppBar** at the top (see snippet below).
3) Remove legacy nav/search elements (use `docs/REMOVALS.md`).
4) Start dev server: `pnpm dev` / `npm run dev` / `yarn dev`.

### 2) layout snippet (drop-in example)
```tsx
// app/layout.tsx
import "./globals.css"
import "./../styles/theme.css"
import type { Metadata } from "next"
import AppBar from "@/components/AppBar"

export const metadata: Metadata = { title: "GAIA", description: "GAIA Genesis" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-base-100 text-base-content">
        <AppBar />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  )
}
```
> Note: `pt-14` offsets the fixed AppBar height.

### 3) Remove old nav/search
- Delete any NAV1 components and imports.
- Delete page-level search bars; route all search to `/search?q=...`.
- Keep a small GAIA/G logo at top-left linking to `/` (already in **AppBar**).

---

## Local verification
This environment can’t run your dev server here, but all components are self-contained.
After merging, run locally and verify:
- AppBar visible on all pages; search submits to `/search?q=term`.
- Settings theme switch updates `data-theme` on `<html>` and persists across reloads.
- Intro is reachable at **/Archives/GAIA/Intro** and from your Dashboard card (if you link it).
