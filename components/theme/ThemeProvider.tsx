// components/theme/ThemeProvider.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDOM(t: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  if (t === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function persistTheme(t: Theme) {
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
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((t: Theme) => {
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
      if (ls && (ls === "light" || ls === "dark") && ls !== theme) {
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
