// components/theme/ThemeProvider.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeName = "light" | "dark" | "cupcake";
const SUPPORTED_THEMES: readonly ThemeName[] = ["light", "dark", "cupcake"];

function isTheme(value: unknown): value is ThemeName {
  return typeof value === "string" && SUPPORTED_THEMES.includes(value as ThemeName);
}

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDOM(t: ThemeName) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  if (t === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function persistTheme(t: ThemeName) {
  try {
    // 1 year
    document.cookie = `gaia.theme=${encodeURIComponent(
      t
    )}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
  try {
    localStorage.setItem("gaia.theme", t);
  } catch {}
}

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: ThemeName;
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<ThemeName>(initialTheme);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
    applyThemeToDOM(t);
    persistTheme(t);
  }, []);

  // In case cookie was missing and localStorage had a value, sync once on mount.
  useEffect(() => {
    try {
      let ls = localStorage.getItem("gaia.theme");
      if (ls && ls.startsWith('"') && ls.endsWith('"')) {
        try {
          ls = JSON.parse(ls);
        } catch {
          ls = null;
        }
      }
      if (isTheme(ls) && ls !== theme) {
        setTheme(ls);
        return;
      }
    } catch {}
    // Ensure DOM reflects initial on first mount as well
    applyThemeToDOM(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
