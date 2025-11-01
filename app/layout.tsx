import "@/styles/theme.css";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { DesignProvider } from "./DesignSystem/context/DesignProvider";
import AppBar from "./components/AppBar";
import ThemeInitScript from "@/components/theme/ThemeInitScript";
import {
  ThemeProvider,
  type ThemeName,
} from "@/components/theme/ThemeProvider";
import { DAISY_THEMES } from "../daisyThemes";

export const metadata = { title: "GAIA", description: "GAIA v2.0 · Phase 5" };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read theme from cookie. Some Next runtimes may provide a cookies() object
  // that doesn't expose `get` as a function at runtime, causing a crash.
  // Try the cookies().get API if available; otherwise fall back to parsing
  // the raw Cookie header via headers(). This keeps the server component
  // resilient across Next versions/environments.
  const SUPPORTED_THEMES = new Set<string>(DAISY_THEMES as readonly string[]);
  const pickTheme = (value: unknown): ThemeName =>
    typeof value === "string" && SUPPORTED_THEMES.has(value)
      ? (value as ThemeName)
      : "light";
  let cookieTheme: ThemeName = "light";

  try {
    const c = await cookies();
    if (c && typeof (c as any).get === "function") {
      const raw = (c as any).get("gaia.theme")?.value ?? "light";
      cookieTheme = pickTheme(raw);
    } else {
      // Fallback: parse Cookie header
      const hdrs = await headers();
      const cookieHeader = (hdrs.get("cookie") as string) ?? "";
      if (cookieHeader) {
        const match = cookieHeader
          .split(";")
          .map((s: string) => s.trim())
          .find((s: string) => s.startsWith("gaia.theme="));
        if (match) {
          const val = match.split("=").slice(1).join("=");
          try {
            const decoded = decodeURIComponent(val);
            cookieTheme = pickTheme(decoded);
          } catch {
            cookieTheme = pickTheme(val);
          }
        }
      }
    }
  } catch (e) {
    // If anything goes wrong, default to light
    cookieTheme = "light";
  }

  const initialTheme: ThemeName = SUPPORTED_THEMES.has(cookieTheme)
    ? cookieTheme
    : "light";

  return (
    <html lang="en" data-theme={initialTheme}>
      <head>
        {/* Prevent theme flash on first paint */}
        <ThemeInitScript />
      </head>
      <body className="overflow-x-hidden">
        <DesignProvider>
          <AppBar />
          <div className="content min-h-screen">
            <ThemeProvider initialTheme={initialTheme}>
              {children}
            </ThemeProvider>
          </div>
        </DesignProvider>
      </body>
    </html>
  );
}
