export default function Intro() {
  return (
    <div className="mx-auto max-w-3xl p-4 space-y-4">
      <h1 className="text-3xl font-semibold">GAIA · Phase 5 (v2.0) — Intro</h1>
      <p>
        Phase 5 turns GAIA from a static archive into a guided, personal system that <strong>teaches</strong>,
        <strong> tracks</strong>, and <strong>protects</strong>.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Citadel</strong> (Tower + Academy) — learn → quiz → build; nodes light up as you progress.</li>
        <li><strong>ELEUTHIA</strong> — single place for passwords, encryption and backups (zero‑knowledge, local‑first).</li>
        <li><strong>Design System + Settings</strong> — Theme picker + 1 default Button + 1 default Search bar.</li>
        <li><strong>Slim App Bar</strong> — GAIA/G + global Search (fixed top).</li>
        <li><strong>Vertical Timelines</strong> — Timeline, Health, Wealth.</li>
      </ul>
      <p className="text-sm opacity-70">
        Placement: this Intro lives at <em>Archives → GAIA → Intro</em> and should be linked from your Dashboard.
      </p>
    </div>
  )
}
