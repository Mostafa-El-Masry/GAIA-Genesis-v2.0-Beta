"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Slim App Bar (Phase 5 · Week 1)
 * - Fixed top, left GAIA/G symbol linking to "/"
 * - Single global Search input (no separate /search route)
 * - Emits "gaia:search" CustomEvent on Enter for feature hooks
 */
export default function AppBar() {
  const [q, setQ] = useState("");
  const pathname = usePathname();
  const hideSearch = pathname === "/";

  // Hide the entire AppBar on the Intro page
  if (pathname === "/") return null;

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
    <header className="gaia-border fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
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

        {/* Center: global Search (controlled, no dedicated page) - hidden on Intro (/) */}
        {!hideSearch ? (
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
                className="gaia-input h-10 w-full rounded-full px-4 outline-none focus:ring-2 focus:ring-black/10"
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
        ) : (
          <div className="mx-2 flex-1" />
        )}
      </div>
    </header>
  );
}
