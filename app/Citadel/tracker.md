# Citadel — tracker (Week 6 integration update)

**Routes:** `/Citadel`, `/Labs`

**Week 6 changes**
- `app/Citadel/components/Tower.tsx` — **UPDATED**: adds `id="track-<id>"` to each track panel for mini‑map navigation.
- `app/Citadel/components/TowerMiniMap.tsx` — **UPDATED**: mini‑map squares are clickable and scroll to the corresponding track panel.
- `app/Citadel/components/Academy.tsx` — **UPDATED**: shows a quick link to `/Labs` after finishing.

**New feature: Labs**
- `app/Labs/page.tsx` — Labs shell
- `app/Labs/components/LabsClient.tsx` — lists completed Academy builds from local storage
- `app/Labs/components/BuildCard.tsx` — shows embedded URL or notes
- `app/Labs/lib/labs.ts` — reads Academy results/notes; parses first URL for embed
- `app/Labs/tracker.md` — this file
