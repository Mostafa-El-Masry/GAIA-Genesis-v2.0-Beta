// components/theme/ThemeProvider.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DAISY_THEMES,
  type DaisyThemeName,
  DAISY_FALLBACK,
  DAISY_INTEGRITY,
} from "../../daisyThemes";

export type ThemeName = DaisyThemeName;
export const AVAILABLE_THEMES = DAISY_THEMES;

const SUPPORTED_THEMES = new Set<string>(DAISY_THEMES as readonly string[]);

function ensureFallbackStyles(onLoad?: () => void) {
  if (typeof document === "undefined") return;

  // Check if daisyUI styles are already present in the bundle
  const hasDaisyStyles = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-base-100")
    .trim();

  if (hasDaisyStyles) {
    if (onLoad) onLoad();
    return;
  }

  const existing = document.querySelector<HTMLLinkElement>(
    "link[data-daisyui-fallback]"
  );
  if (existing) {
    if (onLoad) {
      if (existing.sheet) onLoad();
      else existing.addEventListener("load", onLoad, { once: true });
    }
    return;
  }

  // Try loading from CDN, catch CSP errors
  try {
    const testElement = document.createElement("link");
    testElement.rel = "stylesheet";
    testElement.href = DAISY_FALLBACK;
    testElement.onload = () => {
      document.head.removeChild(testElement);
      // CDN works, proceed with actual CDN load
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[ThemeProvider] Using daisyUI CDN fallback. For better reliability, ensure daisyUI is included in your production build.",
          "\nVerify your tailwind.config.ts includes the daisyui plugin and run a production build."
        );
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = DAISY_FALLBACK;
      link.setAttribute("data-daisyui-fallback", "");
      link.setAttribute("integrity", DAISY_INTEGRITY);
      link.setAttribute("crossorigin", "anonymous");
      if (onLoad) link.addEventListener("load", onLoad, { once: true });
      document.head.appendChild(link);
    };
    testElement.onerror = () => {
      // CSP blocked or network error, rely on bundled CSS
      console.warn(
        "[ThemeProvider] Could not load CDN fallback (possibly due to CSP). Using local daisyUI build.",
        "\nEnsure your Tailwind build includes daisyUI classes."
      );
      if (onLoad) onLoad();
    };
    document.head.appendChild(testElement);
  } catch (e) {
    // CSP or other error prevented even creating the element
    console.warn(
      "[ThemeProvider] Strict CSP detected. Using local daisyUI build.",
      "\nEnsure your Tailwind build includes daisyUI classes."
    );
    if (onLoad) onLoad();
  }
}

function isTheme(value: unknown): value is ThemeName {
  return typeof value === "string" && SUPPORTED_THEMES.has(value as string);
}

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function persistTheme(t: ThemeName) {
  try {
    document.cookie = `gaia.theme=${encodeURIComponent(
      t
    )}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
  try {
    localStorage.setItem("gaia.theme", t);
  } catch {}
}

type RGB = { r: number; g: number; b: number };

const colorCanvas =
  typeof document !== "undefined" ? document.createElement("canvas") : null;
const colorCtx = colorCanvas ? colorCanvas.getContext("2d") : null;

function parseColor(input: string): RGB | null {
  if (!colorCtx) return null;
  try {
    colorCtx.fillStyle = "#000";
    colorCtx.fillStyle = input;
    const value = colorCtx.fillStyle;
    const match = value.match(/\d+(\.\d+)?/g);
    if (!match) return null;
    const [r, g, b] = match.slice(0, 3).map(Number);
    return { r, g, b };
  } catch {
    return null;
  }
}

function mixColors(a: string, b: string, amount: number): string {
  const ca = parseColor(a);
  const cb = parseColor(b);
  if (!ca || !cb) return a;
  const ratio = Math.min(Math.max(amount, 0), 1);
  const r = Math.round(ca.r * (1 - ratio) + cb.r * ratio);
  const g = Math.round(ca.g * (1 - ratio) + cb.g * ratio);
  const bVal = Math.round(ca.b * (1 - ratio) + cb.b * ratio);
  return `rgb(${r}, ${g}, ${bVal})`;
}

function luminance({ r, g, b }: RGB): number {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function resolveCssVariable(
  styles: CSSStyleDeclaration,
  name: string,
  fallback: string
) {
  const value = styles.getPropertyValue(name).trim();
  return value || fallback;
}

export function syncGaiaTokens() {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const styles = getComputedStyle(root);

  // Base colors from daisyUI theme
  const surface = resolveCssVariable(styles, "--color-base-100", "#ffffff");
  const surfaceSoft = resolveCssVariable(styles, "--color-base-200", surface);
  const border = resolveCssVariable(styles, "--color-base-300", surfaceSoft);
  const foreground = resolveCssVariable(
    styles,
    "--color-base-content",
    "#0f172a"
  );
  const muted = resolveCssVariable(
    styles,
    "--color-neutral-content",
    "#64748b"
  );

  root.style.setProperty("--gaia-surface", surface);
  root.style.setProperty("--gaia-surface-soft", surfaceSoft);
  root.style.setProperty("--gaia-border", border);
  root.style.setProperty("--gaia-foreground", foreground);
  root.style.setProperty("--gaia-muted", muted);

  const surfaceRGB = parseColor(surface) ?? { r: 255, g: 255, b: 255 };
  const foregroundRGB = parseColor(foreground) ?? { r: 15, g: 23, b: 42 };
  const mutedRGB = parseColor(muted) ?? { r: 100, g: 116, b: 139 };
  const surfaceLum = luminance(surfaceRGB);
  const isDarkSurface = surfaceLum < 0.45;

  const strong = mixColors(
    `rgb(${foregroundRGB.r}, ${foregroundRGB.g}, ${foregroundRGB.b})`,
    isDarkSurface ? "#ffffff" : "#000000",
    isDarkSurface ? 0.35 : 0.08
  );
  const def = mixColors(
    `rgb(${foregroundRGB.r}, ${foregroundRGB.g}, ${foregroundRGB.b})`,
    isDarkSurface ? "#ffffff" : surface,
    isDarkSurface ? 0.45 : 0.2
  );
  const mutedColor = mixColors(
    `rgb(${mutedRGB.r}, ${mutedRGB.g}, ${mutedRGB.b})`,
    isDarkSurface ? "#ffffff" : surface,
    isDarkSurface ? 0.55 : 0.25
  );

  root.style.setProperty("--gaia-text-strong", strong);
  root.style.setProperty("--gaia-text-default", def);
  root.style.setProperty("--gaia-text-muted", mutedColor);
}

function applyThemeToDOM(t: ThemeName) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  // Let daisyUI handle dark mode - remove manual class toggling
  requestAnimationFrame(syncGaiaTokens);
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

  useEffect(() => {
    // Ensure daisyUI styles are present. If the local build didn't include
    // daisyUI (or variables are missing), load the CDN fallback so CSS
    // custom properties are available for token syncing.
    ensureFallbackStyles(() => {
      try {
        syncGaiaTokens();
      } catch {}
    });
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
    applyThemeToDOM(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
