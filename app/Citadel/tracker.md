# Citadel — tracker (Week 3 foundation)

**Route:** `/Citadel`

**Files**
- `app/Citadel/page.tsx` — Page shell for Citadel
- `app/Citadel/components/CitadelClient.tsx` — Client tabs (Tower/Academy)
- `app/Citadel/components/Tower.tsx` — Visual tree by tracks (8 × 5)
- `app/Citadel/components/TowerMiniMap.tsx` — 8×5 mini-map
- `app/Citadel/components/Academy.tsx` — Session skeleton (Tier 1 picker, unlock placeholder)
- `app/Citadel/lib/progress.ts` — Local-first progress store (`gaia.citadel.progress`)
- `app/Citadel/data/tracks.ts` — 8 tracks × 5 tiers data

**Integration**
- Uses Design System `Button` and global `SearchInput` (already in AppBar)
- No CSS files; Tailwind-only, per Phase 5 rule
- Emits events:
  - `gaia:citadel:progress` on unlock toggle
  - `gaia:citadel:session` when a skeleton session completes
