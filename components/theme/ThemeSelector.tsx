// components/theme/ThemeSelector.tsx
"use client";

import { useTheme, type ThemeName } from "@/components/theme/ThemeProvider";
import { useDesignSafe } from "@/app/DesignSystem/context/DesignProvider";

const OPTIONS: { value: ThemeName; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "cupcake", label: "Cupcake (DaisyUI)" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const design = useDesignSafe();

  return (
    <div className="max-w-md rounded-xl border border-base-200 p-4">
      <h2 className="text-lg font-semibold mb-2">Theme</h2>
      <label className="block text-sm mb-2">Choose appearance</label>

      <select
        className="select select-bordered w-full"
        value={theme}
        onChange={(e) => {
          const t = e.target.value as ThemeName;
          setTheme(t);
          // Keep DesignProvider in sync so previews update immediately.
          try {
            design?.setTheme(t);
          } catch {}
        }}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <p className="mt-3 text-xs opacity-70">
        This setting applies everywhere. Stored per user (cookie + local).
      </p>
    </div>
  );
}
