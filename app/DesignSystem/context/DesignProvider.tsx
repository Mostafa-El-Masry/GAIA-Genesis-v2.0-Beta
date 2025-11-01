"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AVAILABLE_THEMES, type ThemeName } from "@/components/theme/ThemeProvider";

export type Theme = ThemeName;
export type ButtonStyle = "solid" | "outline" | "ghost";
export type SearchStyle = "rounded" | "pill" | "underline";

type DesignState = {
  theme: Theme;
  button: ButtonStyle;
  search: SearchStyle;
  setTheme: (t: Theme) => void;
  setButton: (b: ButtonStyle) => void;
  setSearch: (s: SearchStyle) => void;
};

export const Ctx = createContext<DesignState | null>(null);

const THEME_KEY = "gaia.theme";
const BTN_KEY = "gaia.ui.button";
const SRCH_KEY = "gaia.ui.search";

const VALID_THEMES: Theme[] = [...AVAILABLE_THEMES];
const VALID_BUTTONS: ButtonStyle[] = ["solid", "outline", "ghost"];
const VALID_SEARCHES: SearchStyle[] = ["rounded", "pill", "underline"];

function read<T extends string>(
  k: string,
  fallback: T,
  allowed?: readonly string[]
): T {
  try {
    const raw = localStorage.getItem(k);
    if (!raw) return fallback;
    // Handle legacy JSON-serialized values before we standardized on plain strings.
    if (
      (raw.startsWith('"') && raw.endsWith('"')) ||
      raw.startsWith("{") ||
      raw.startsWith("[")
    ) {
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === "string") {
          if (!allowed || allowed.includes(parsed)) {
            return (parsed as T) ?? fallback;
          }
          return fallback;
        }
      } catch {
        // Fall through to treat the raw value as-is.
      }
    }
    if (!allowed || allowed.includes(raw)) {
      return raw as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}
function write<T extends string>(k: string, v: T) {
  try {
    localStorage.setItem(k, v);
  } catch {}
}

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [button, setButton] = useState<ButtonStyle>("solid");
  const [search, setSearch] = useState<SearchStyle>("rounded");

  useEffect(() => {
    setTheme(read(THEME_KEY, "light", VALID_THEMES));
    setButton(read(BTN_KEY, "solid", VALID_BUTTONS));
    setSearch(read(SRCH_KEY, "rounded", VALID_SEARCHES));
  }, []);

  useEffect(() => {
    write(THEME_KEY, theme);
    write(BTN_KEY, button);
    write(SRCH_KEY, search);
    // Optional: tag html for debugging/themes
    document.documentElement.setAttribute("data-gaia-theme", theme);
  }, [theme, button, search]);

  const value = useMemo<DesignState>(
    () => ({
      theme,
      button,
      search,
      setTheme,
      setButton,
      setSearch,
    }),
    [theme, button, search]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDesign() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDesign must be used within DesignProvider");
  return v;
}

// A safe variant that returns null when the provider is missing. Useful for
// components that may be used both inside and outside the DesignProvider.
export function useDesignSafe() {
  return useContext(Ctx) as DesignState | null;
}
