// components/theme/ThemeSelector.tsx
"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useDesignSafe } from "@/app/DesignSystem/context/DesignProvider";
import { DAISY_THEMES, type DaisyThemeName } from "@/daisyThemes";

const OPTIONS: { value: DaisyThemeName; label: string }[] = DAISY_THEMES.map(
  (value: DaisyThemeName) => ({
    value,
    label: value
      .split("-")
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
  })
);

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
          const t = e.target.value as DaisyThemeName;
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
