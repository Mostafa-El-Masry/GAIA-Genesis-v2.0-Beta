'use client';

import { DEFAULT_THEME, THEMES } from "@/app/DesignSystem";
import { useEffect, useState } from "react";

export default function ThemePicker() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const stored = window.localStorage.getItem("gaia.theme");
    setTheme(stored && THEMES.includes(stored as any) ? (stored as string) : DEFAULT_THEME);
  }, []);

  function updateTheme(next: string) {
    if (!THEMES.includes(next as any)) return;
    setTheme(next);
    window.localStorage.setItem("gaia.theme", next);
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new CustomEvent("gaia:theme", { detail: { theme: next } }));
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Theme</label>
      <select
        value={theme}
        onChange={(e) => updateTheme(e.target.value)}
        className="w-full max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300"
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500">Phase 5 baseline: themes apply globally via <code>data-theme</code>.</p>
    </div>
  );
}
