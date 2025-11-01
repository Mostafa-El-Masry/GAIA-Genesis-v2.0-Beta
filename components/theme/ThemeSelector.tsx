// components/theme/ThemeSelector.tsx
"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useDesignSafe } from "@/app/DesignSystem/context/DesignProvider";

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
          const t = e.target.value as "light" | "dark";
          setTheme(t);
          // If the DesignProvider is present, keep its copy in sync so UI
          // elsewhere (settings buttons, previews) updates immediately.
          try {
            design?.setTheme(t);
          } catch {}
        }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <p className="mt-3 text-xs opacity-70">
        This setting applies everywhere. Stored per user (cookie + local).
      </p>
    </div>
  );
}
