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
  let cookieTheme = "light" as "light" | "dark";

  try {
    const c = await cookies();
    if (c && typeof (c as any).get === "function") {
      cookieTheme = ((c as any).get("gaia.theme")?.value ?? "light") as
        | "light"
        | "dark";
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
            cookieTheme =
              (decodeURIComponent(val) as any) === "dark" ? "dark" : "light";
          } catch {
            cookieTheme = val === "dark" ? "dark" : "light";
          }
        }
      }
    }
  } catch (e) {
    // If anything goes wrong, default to light
    cookieTheme = "light";
  }

  const initialTheme = cookieTheme === "dark" ? "dark" : "light";

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
