"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Intro v2.1 – centered symbol + glass search; 4 links left / 4 links right.
 * Changes:
 * - Replaced next/image with plain <img> to avoid asset import issues.
 * - Ensured no stray scroll: min-h-[100svh], no margins.
 * - No Sync link (Backup is in /settings#backup).
 */
export default function Intro() {
  const router = useRouter();
  // search removed: no open state or query state

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
  ];

  // search removed: submit no-op

  return (
    <main className="grid min-h-[100svh] place-items-center bg-white text-black p-6">
      <div className="w-full max-w-6xl">
        {/* Desktop layout */}
        <div className="hidden items-center justify-between gap-6 lg:flex">
          {/* Left links */}
          <div className="flex w-64 flex-col gap-3">
            {left.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl border border-black/10 bg-white px-4 py-3 text-lg font-semibold hover:border-black/30 hover:shadow-md active:scale-[.99] transition"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Center: symbol + glass search */}
          <div className="flex min-w-[360px] max-w-[520px] flex-col items-center gap-5">
            {/* Symbol (fallback to .png if .svg missing via onError swap) */}
            <div className="relative h-40 w-40 sm:h-48 sm:w-48">
              <img
                src="/gaia-intro.svg"
                alt="GAIA Symbol"
                className="h-full w-full object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  if (t.src.indexOf(".svg") >= 0) t.src = "/gaia-intro.png";
                }}
              />
            </div>

            {/* Symbol only (search removed) */}
            <div className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/20 backdrop-blur">
              <span className="text-lg font-black tracking-tight">G</span>
            </div>
          </div>

          {/* Right links */}
          <div className="flex w-64 flex-col gap-3">
            {right.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl border border-black/10 bg-white px-4 py-3 text-lg font-semibold hover:border-black/30 hover:shadow-md active:scale-[.99] transition"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          <div className="relative h-28 w-28">
            <img
              src="/gaia-intro.svg"
              alt="GAIA Symbol"
              className="h-full w-full object-contain"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                if (t.src.indexOf(".svg") >= 0) t.src = "/gaia-intro.png";
              }}
            />
          </div>

          {/* Search removed for mobile — symbol-only */}
          <div className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white/20 backdrop-blur">
            <span className="text-lg font-black tracking-tight">G</span>
          </div>

          <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
            {[...left, ...right].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl border border-black/10 bg-white px-4 py-3 text-base font-semibold hover:border-black/30 hover:shadow-md active:scale-[.99] transition"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs opacity-50">
          <a className="underline" href="/settings#backup">
            Settings + Backup
          </a>
          <br />
          <a className="underline" href="/interlog">
            Introduction
          </a>
        </div>
      </div>
    </main>
  );
}
