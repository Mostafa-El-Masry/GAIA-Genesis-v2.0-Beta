"use client";

import Link from "next/link";

/**
 * Intro v3.0 (Phase 5 · Week 1)
 * - Removes local/glass search (global search now lives in the Slim App Bar)
 * - Keeps 8 quick links (no /search)
 * - Mobile-first layout, centered symbol
 */
export default function Intro() {
  const left = [
    { href: "/gallery", label: "Gallery" },
    { href: "/apollo", label: "Apollo" },
    { href: "/timeline", label: "Timeline" },
    { href: "/health", label: "Health" },
  ];
  const right = [
    { href: "/wealth", label: "Wealth" },
    { href: "/labs", label: "Labs" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/interlog", label: "Intro" },
  ];
  const more = [
    { href: "/Archives", label: "Archives" },
    { href: "/Citadel", label: "Citadel" },
    { href: "/media-tools", label: "Media Tools" },
    { href: "/sync", label: "Sync" },
    { href: "/settings", label: "Settings" },
    { href: "/goodbye", label: "Goodbye" },
  ];

  return (
    <main className="grid min-h-[100svh] place-items-center px-4">
      <div className="w-full max-w-5xl">
        <div className="grid items-center gap-6 sm:grid-cols-3">
          {/* Left 4 links */}
          <div className="order-3 grid gap-3 sm:order-1">
            {left.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl border border-black/10 bg-white/30 p-3 text-center backdrop-blur transition hover:shadow-md active:scale-[.99]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Center: symbol */}
          <div className="order-1 flex min-w-[260px] flex-col items-center justify-center gap-5 sm:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gaia-intro-1.png"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.src = "/gaia-intro3.png";
              }}
              alt="GAIA"
              className="h-36 w-auto sm:h-48 md:h-56 lg:h-64"
            />
            <div className="text-sm opacity-60">
              Use the search bar at the top to find anything in GAIA.
            </div>
          </div>

          {/* Right 4 links */}
          <div className="order-2 grid gap-3 sm:order-3">
            {right.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl border border-black/10 bg-white/30 p-3 text-center backdrop-blur transition hover:shadow-md active:scale-[.99]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer mini-links */}
        <div className="mt-6 text-center text-xs opacity-50">
          <a className="underline" href="/settings#backup">
            Settings + Backup
          </a>
          <br />
          <a className="underline" href="/interlog">
            Introduction
          </a>
        </div>
        {/* More links (additional app sections not present in the main 8 links) */}
        <div className="mt-6 text-center text-sm opacity-90">
          <div className="mb-3 text-xs uppercase tracking-wide">More</div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {more.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="block rounded-xl border border-black/10 bg-white/30 p-3 text-center backdrop-blur transition hover:shadow-md active:scale-[.99]"
              >
                {m.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
