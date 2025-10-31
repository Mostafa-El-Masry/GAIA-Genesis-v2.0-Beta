"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Slim App Bar (Phase 5 · Week 1)
 * - Fixed top, left GAIA/G symbol linking to "/"
 * - Single global Search input (no separate /search route)
 * - Emits "gaia:search" CustomEvent on Enter for feature hooks
 */
export default function AppBar() {
  const [q, setQ] = useState("");

  function submit() {
    const val = q.trim();
    if (!val) return;
    try {
      // Broadcast for any listeners (e.g., dashboard filters, in-page search)
      window.dispatchEvent(new CustomEvent("gaia:search", { detail: val }));
      localStorage.setItem("gaia:lastSearch", val);
    } catch {}
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-3 px-3">
        {/* Left: GAIA/G symbol */}
        <Link href="/" className="flex items-center gap-2">
          {/* Use svg with png fallback */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gaia-intro.svg"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.src = "/gaia-intro.png";
            }}
            alt="GAIA"
            className="h-6 w-auto"
          />
          <span className="sr-only">GAIA Home</span>
        </Link>

        {/* Center: global Search (controlled, no dedicated page) */}
        <div className="mx-2 flex-1">
          <div className="relative">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              placeholder="Search GAIA…"
              className="h-10 w-full rounded-full border border-black/10 bg-white/60 px-4 outline-none placeholder:text-black/50 focus:border-black/30"
            />
            {/* Optional: submit button visible to a11y only */}
            <button
              onClick={submit}
              className="absolute right-1 top-1 hidden h-8 rounded-full px-3 text-sm"
              aria-label="Search"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
