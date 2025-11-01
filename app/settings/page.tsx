"use client";

import { useEffect } from "react";
import {
  useDesign,
  type Theme,
  type ButtonStyle,
  type SearchStyle,
} from "@/app/DesignSystem/context/DesignProvider";
import ThemeSelector from "@/components/theme/ThemeSelector";

const THEMES: Theme[] = ["light", "dark", "charcoal"];
const BUTTONS: ButtonStyle[] = ["solid", "outline", "ghost"];
const SEARCHES: SearchStyle[] = ["rounded", "pill", "underline"];

/**
 * Phase 5 baseline: Theme picker + 1 Button + 1 Search style
 */
export default function SettingsPage() {
  const { theme, setTheme, button, setButton, search, setSearch } = useDesign();

  useEffect(() => {
    // no-op, render client
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-600">
          Per-user theme and UI primitives. Stored locally.
        </p>
      </header>

      {/* Theme picker */}
      <section className="space-y-3 rounded-lg border border-gray-200 p-4 mb-8">
        <ThemeSelector />
      </section>

      <section className="space-y-3 rounded-lg border border-gray-200 p-4">
        <h2 className="font-medium">Button</h2>
        <div className="flex flex-wrap items-center gap-2">
          {BUTTONS.map((b) => (
            <button
              key={b}
              onClick={() => setButton(b)}
              className={`rounded border px-3 py-1 text-sm capitalize ${
                button === b
                  ? "border-gray-900"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-lg border border-gray-200 p-4">
        <h2 className="font-medium">Search bar</h2>
        <div className="flex flex-wrap items-center gap-2">
          {SEARCHES.map((s) => (
            <button
              key={s}
              onClick={() => setSearch(s)}
              className={`rounded border px-3 py-1 text-sm capitalize ${
                search === s
                  ? "border-gray-900"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
