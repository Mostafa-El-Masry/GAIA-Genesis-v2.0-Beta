# Citadel — tracker (Week 5 update)

**Route:** `/Citadel`

**Week 5 changes**
- `app/Citadel/components/Academy.tsx` — **UPDATED** to Academy v1 loop (learn → quiz → build → complete), unlocks Tower node on pass.
- `app/Citadel/data/academy.ts` — **NEW** Tier 1 micro-concepts with short lessons and quizzes.
- `app/Citadel/lib/academy.ts` — **NEW** Local-first storage for Academy results and build notes.

**Existing (unchanged)**
- `app/Citadel/components/Tower.tsx` (Week 4 gating + reveal)
- `app/Citadel/components/TowerMiniMap.tsx`
- `app/Citadel/components/CitadelClient.tsx`
- `app/Citadel/page.tsx`
- `app/Citadel/lib/progress.ts`
- `app/Citadel/data/tracks.ts`
