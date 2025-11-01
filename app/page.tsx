"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NoScroll from "@/components/NoScroll";

interface NavLink {
  href: string;
  label: string;
}

/**
 * New GAIA Home (v2.0)
 * - Circular layout with links around central symbol
 * - Responsive radius based on viewport
 */
export default function HomePage() {
  const [radius, setRadius] = useState<number>(280);

  // All links in one array for circular layout
  const links: NavLink[] = [
    { href: "/gallery", label: "Gallery" },
    { href: "/apollo", label: "Apollo" },
    { href: "/timeline", label: "Timeline" },
    { href: "/health", label: "Health" },
    { href: "/wealth", label: "Wealth" },
    { href: "/labs", label: "Labs" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/Archives", label: "Archives" },
    { href: "/Citadel", label: "Citadel" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <main className="fixed inset-0 flex items-center justify-center no-nav">
      <NoScroll />
      <div className="relative mx-auto max-w-6xl w-full">
        {/* Circle Container */}
        <div className="relative h-[640px] sm:h-[720px] lg:h-[800px]">
          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <img src="/gaia-intro-1.png" alt="GAIA" className="h-96 w-auto" />
          </div>

          {/* Links positioned in a circle */}
          {links.map((link: NavLink, i: number) => {
            const angle = i * (360 / links.length) * (Math.PI / 180);

            const rawX = radius * Math.cos(angle);
            const rawY = radius * Math.sin(angle);
            const x = rawX.toFixed(3);
            const y = rawY.toFixed(3);
            const style = {
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            };

            return (
              <Link
                key={link.href}
                href={link.href}
                className="gaia-glass gaia-border absolute left-1/2 top-1/2 w-32 rounded-xl border px-6 py-3 text-center text-lg font-medium shadow-sm backdrop-blur transition hover:shadow-md active:scale-[.99] whitespace-nowrap"
                style={style}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
