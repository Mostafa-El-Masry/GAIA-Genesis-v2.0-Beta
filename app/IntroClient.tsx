"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    { href: "/settings", label: "Settings" },
  ];

  const [radius, setRadius] = useState<number>(180);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setRadius(140);
      else if (w < 1024) setRadius(200);
      else setRadius(320);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <main className="fixed inset-0 grid place-items-center px-4">
      <div className="w-full max-w-5xl">
        <div className="grid items-center">
          {/* Circular layout: render the 8 main links around the central logo */}
          <div className="relative mx-auto w-full max-w-3xl h-[380px] sm:h-[480px] lg:h-[min(720px,calc(100vh-80px))]">
            {/* Center logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
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
            </div>

            {/* Links positioned around the circle */}
            {(() => {
              const items = [...left, ...right, ...more];
              return items.map((l, i) => {
                const angle = (i / items.length) * 360;
                const transform = `translate(-50%,-50%) rotate(${angle}deg) translate(0,-${radius}px) rotate(-${angle}deg)`;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="gaia-glass gaia-border absolute left-1/2 top-1/2 block rounded-xl border p-2 px-4 text-center backdrop-blur transition hover:shadow-md active:scale-[.99] text-[var(--gaia-text-default)] no-underline"
                    style={{ transform }}
                  >
                    {l.label}
                  </Link>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </main>
  );
}
