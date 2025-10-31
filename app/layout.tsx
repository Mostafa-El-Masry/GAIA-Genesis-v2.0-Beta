import "../styles/global.css";
import type { Metadata } from "next";
import { ThemeRoot } from "./DesignSystem";
import AppBar from "./components/AppBar";
export const metadata: Metadata = {
  title: "GAIA",
  description: "GAIA v2.0 · Phase 5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Week 2: Design System ThemeRoot (applies data-theme from localStorage) */}
        <ThemeRoot>
          {/* Global app navigation bar */}
          <AppBar />
          <div className="pt-14">{children}</div>
        </ThemeRoot>
      </body>
    </html>
  );
}
