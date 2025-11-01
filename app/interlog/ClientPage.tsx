"use client";

import React from "react";

/**
 * GAIA v1.3 — Interlog (Phase 4 wrap)
 * Not linked from Intro by default; you can add a link elsewhere when ready.
 * Tailwind inline only.
 */
export default function InterlogPage() {
  const roadmap = `Week  1: 2025-12-29 → 2026-01-04 — Intro (glass search)
Week  2: 2026-01-05 → 2026-01-11 — Gallery (restart, 3-col vision)
Week  3: 2026-01-12 → 2026-01-18 — Apollo (archives MVP)
Week  4: 2026-01-19 → 2026-01-25 — Timeline (Big Bang → now)
Week  5: 2026-01-26 → 2026-02-01 — Health (starter logs)
Week  6: 2026-02-02 → 2026-02-08 — Labs (experiments)
Week  7: 2026-02-09 → 2026-02-15 — Sync → moved to Settings
Week  8: 2026-02-16 → 2026-02-22 — Search & Close App
Week  9: 2026-02-23 → 2026-03-01 — Dashboard (overview)
Week 10: 2026-03-02 → 2026-03-08 — Settings & Scene Prefs (+Backup)
Week 11: 2026-03-09 → 2026-03-15 — Media Tools (Manifests & Subnames)
Week 12: 2026-03-16 → 2026-03-22 — Buffer / polish (Week 13 delayed)`;
  const tree = `/app
  /apollo                 # learning archives (manual-first)
  /dashboard              # local-first overview
  /gallery                # images/videos (max 3 cols vision)
  /goodbye                # close-app fallback
  /health                 # starter logs
  /interlog               # <-- this page
  /labs                   # experiments
  /media-tools            # manifest, subnames, tags, previews
  /search                 # local search + power menu
  /settings               # appearance, scene, accessibility, lock, backup
    /sections
    /sync                 # export/import internals (moved here)
  /sync                   # legacy redirect to /settings#backup
  /timeline               # Big Bang → now
  /wealth                 # plan A/B compounding model
/page.tsx (Intro v2.1)    # centered symbol + glass search
/layout.tsx               # boot loader (loads /public/json/*.json before render)
/public
  /json                   # place gaia-v1.3-backup.json here
  /gallery                # your media (images/videos/previews)
  gaia-intro.svg|png      # intro symbol
`;
  const drawlab = `GAIA v1.3 — Local-first map ("drawlab")

[ public/json/*.json ] --(on load)--> [ app/layout.tsx boot loader ] --applies--> [ LocalStorage ]
                                                                        |
                                                                        v
  [ Intro ]  [ Gallery ]  [ Apollo ]  [ Timeline ]  [ Health ]  [ Wealth ]  [ Labs ]  [ Dashboard ]  [ Settings ]
                            |                                                   |
                            v                                                   v
                   [ /media-tools ] --> builds gallery_manifest_v1       [ Backup tab ] export/import
`;

  return (
    <main className="min-h-screen gaia-surface-soft pt-16 font-sans antialiased">
      <div className="fixed left-4 top-4 z-40">
        <a
          href="/"
          className="gaia-border gaia-surface inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold shadow-sm transition duration-200 hover:shadow"
        >
          ⟵ GAIA
        </a>
      </div>

      <div className="mx-auto max-w-3xl space-y-8 px-4 pb-4">
        <header className="space-y-2">
          <h1 className="gaia-strong text-3xl font-extrabold tracking-tight">
            Interlog — Phase 4 (v1.3) Wrap
          </h1>
          <p className="text-sm gaia-muted">
            Plan start: <b>2025-12-29</b> · Current status: Week 12 delivered; Week 13 delayed.
          </p>
        </header>

        <section className="gaia-surface rounded-2xl border gaia-border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="gaia-strong mb-3 text-xl font-bold">Summary (you + me)</h2>
          <div className="prose prose-sm max-w-none space-y-4 gaia-muted">
            <p>
              <b className="gaia-strong">Your intent:</b> Make GAIA the last static build of its kind, then transition to
              a helper that eases real work. Keep it simple, local-first, and fast; one strong approach per week; minimal
              CSS files; Tailwind inline; each feature fully isolated under{" "}
              <code className="gaia-code rounded px-1.5 py-0.5">app/&lt;Feature&gt;/</code> with its own tracker.
            </p>
            <p>
              <b className="gaia-strong">What we shipped:</b> Clean intro with glass search, Gallery restart vision,
              Apollo manual archives, a cosmic Timeline, Health starter logs, Labs, Search+Close, Dashboard, Settings with
              integrated Backup (moved from Sync), and Media Tools for a single gallery manifest with titles/tags/preview
              patterns. Boot now pre-loads a backup JSON from{" "}
              <code className="gaia-code rounded px-1.5 py-0.5">/public/json/</code> before any page renders.
            </p>
            <p>
              <b className="gaia-strong">What I think:</b> The local-first foundation is solid: boot loader + LocalStorage
              + pages. Media Tools give Gallery a dependable backbone when you're ready to plug it in. Settings
              centralizes Backup so Sync buttons can stay out of feature pages. We stayed within your rules (no global
              navbar; GAIA icon back to <code className="gaia-code rounded px-1.5 py-0.5">/</code>; Tailwind inline;
              client-first order).
            </p>
            <p>
              <b className="gaia-strong">What you said next:</b> Pause big new builds to live with GAIA, learn the flows,
              and list tedious tasks GAIA should help with in Phase 5 (light server + tiny DB only when needed). Keep
              production on schedule; you'll link this Interlog somewhere (not on Intro) for reference.
            </p>
          </div>
        </section>

        <section className="gaia-surface rounded-2xl border gaia-border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="gaia-strong mb-3 text-xl font-bold">Roadmap (Weeks 1–12)</h2>
          <pre className="gaia-surface-soft border gaia-border whitespace-pre-wrap rounded-xl p-4 font-mono text-sm leading-relaxed tracking-tight">
            {roadmap}
          </pre>
        </section>

        <section className="gaia-surface rounded-2xl border gaia-border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="gaia-strong mb-3 text-xl font-bold">Drawlab (architecture sketch)</h2>
          <pre className="gaia-surface-soft border gaia-border whitespace-pre-wrap rounded-xl p-4 font-mono text-sm leading-relaxed tracking-tight">
            {drawlab}
          </pre>
        </section>

        <section className="gaia-surface rounded-2xl border gaia-border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="gaia-strong mb-3 text-xl font-bold">Tree snapshot</h2>
          <pre className="gaia-surface-soft border gaia-border whitespace-pre-wrap rounded-xl p-4 font-mono text-sm leading-relaxed tracking-tight">
            {tree}
          </pre>
        </section>

        <section className="gaia-surface rounded-2xl border gaia-border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <h2 className="gaia-strong mb-3 text-xl font-bold">Next (Phase 5 preview)</h2>
          <ul className="ml-5 space-y-2 text-sm gaia-muted list-disc marker:text-inherit">
            <li>Use GAIA for a while; write down repetitive tasks and desired report formats.</li>
            <li>Prioritize 1–2 tiny server-backed helpers (only if truly needed): e.g., long JSON storage or background thumbnailing.</li>
            <li>
              Evolve Gallery to read <code className="gaia-code rounded px-1.5 py-0.5">gallery_manifest_v1</code> by default and
              pre-index for Search.
            </li>
            <li>Add "tips & tricks" as small Labs artifacts you create by hand (GAIA hosts & organizes).</li>
          </ul>
        </section>

        <footer className="gaia-muted pb-10 text-center text-xs">
          GAIA v1.3 · Interlog page lives at <code className="gaia-code rounded px-1.5 py-0.5">/interlog</code> · Link it from
          anywhere except Intro.
        </footer>
      </div>
    </main>
  );
}
