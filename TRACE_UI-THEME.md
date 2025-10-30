# TRACE_UI-THEME.md (Phase 5 · Week 1)

List of theme-related references with file paths + line numbers.

- styles/theme.css
  - [1–36] CSS variables + `data-theme` switches; base utility mappings.

- app/settings/page.tsx
  - [1] `'use client'`
  - [3–6] Theme state + hydration
  - [8–14] `data-theme` attribute + localStorage persistence
  - [18–34] Theme buttons

- lib/theme.ts
  - [1–3] Supported themes
  - [5–10] `getTheme()` reads localStorage
  - [12–16] `setTheme()` updates `data-theme`

- components/primitives/Button.tsx
  - [16–20] Token-like class usage for Button styles (primary/outline)

- components/primitives/SearchBar.tsx
  - [21] Rounded full input with border (ties to theme border color)

- app/layout.tsx (in your repo; patch snippet in PATCH_NOTES.md)
  - Ensure `../styles/theme.css` is imported and `<html data-theme>` is used.
