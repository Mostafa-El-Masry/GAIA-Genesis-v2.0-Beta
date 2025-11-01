import "@/styles/globals.css";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { DesignProvider } from "./DesignSystem/context/DesignProvider";
import AppBar from "./components/AppBar";
import ThemeInitScript from "@/components/theme/ThemeInitScript";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
  const SUPPORTED_THEMES = new Set(["light", "dark", "cupcake"] as const);
  type ThemeName = "light" | "dark" | "cupcake";
  let cookieTheme: ThemeName = "light";

  try {
    const c = await cookies();
    if (c && typeof (c as any).get === "function") {
      const raw = (c as any).get("gaia.theme")?.value ?? "light";
      cookieTheme = SUPPORTED_THEMES.has(raw as ThemeName)
        ? (raw as ThemeName)
        : "light";
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
            cookieTheme = SUPPORTED_THEMES.has(decoded as ThemeName)
              ? (decoded as ThemeName)
              : "light";
          } catch {
            cookieTheme = SUPPORTED_THEMES.has(val as ThemeName)
              ? (val as ThemeName)
              : "light";
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
    <html
      lang="en"
      data-theme={initialTheme}
      className={initialTheme === "dark" ? "dark" : undefined}
    >
      <head>
        {/* Prevent theme flash on first paint */}
        <ThemeInitScript />
      </head>
      <body>
        <DesignProvider>
          <AppBar />
          <div className="pt-14">
            <ThemeProvider initialTheme={initialTheme}>
              {children}
            </ThemeProvider>
          </div>
        </DesignProvider>
      </body>
    </html>
  );
}
