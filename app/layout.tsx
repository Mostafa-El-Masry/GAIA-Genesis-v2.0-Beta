import "@/styles/globals.css";
import { DesignProvider } from "./DesignSystem/context/DesignProvider";
import AppBar from "./components/AppBar";

export const metadata = { title: "GAIA", description: "GAIA v2.0 · Phase 5" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DesignProvider>
          <AppBar />
          <div className="pt-14">{children}</div>
        </DesignProvider>
      </body>
    </html>
  );
}
