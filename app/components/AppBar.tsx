"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Slim App Bar
 */
export default function AppBar() {
  const [q, setQ] = useState("");
  const pathname = usePathname();

  function submit() {
    const val = q.trim();
    if (!val) return;
    try {
      window.dispatchEvent(new CustomEvent("gaia:search", { detail: val }));
      localStorage.setItem("gaia:lastSearch", val);
    } catch {}
  }

  // Mark the document when the AppBar is present so layout can add padding.
  // This effect must run (or be registered) on every render to keep hook order
  // stable — it reacts to `pathname` to add/remove the body class.
  useEffect(() => {
    try {
      if (pathname === "/") {
        // Ensure class is removed when on intro
        document.body.classList.remove("has-navbar");
        return;
      }
      document.body.classList.add("has-navbar");
      return () => {
        document.body.classList.remove("has-navbar");
      };
    } catch (e) {
      // ignore DOM exceptions in non-browser environments
    }
  }, [pathname]);

  // Hide the AppBar on the intro page
  if (pathname === "/") return null;

  return (
    <header className="gaia-glass-strong gaia-border fixed inset-x-0 top-0 z-50 border-b border backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-3 px-3">
        <Link href="/" className="flex items-center gap-2">
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
