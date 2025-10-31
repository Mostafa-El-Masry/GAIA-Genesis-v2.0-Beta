# TRACE_UI-THEME.md — Phase 5 · Week 1
- app/components/AppBar.tsx — New Slim App Bar (fixed top), global Search input (no separate /search page).
- app/layout.tsx — Imported AppBar (line 6); renders `<AppBar />` above content with `pt-14` spacer (line 131).
- app/IntroClient.tsx — Removed local “glass search”; centralized search in App Bar; replaced right link “Search” → “Intro”.

(Keep this file updated after any theme/primitive changes.)
