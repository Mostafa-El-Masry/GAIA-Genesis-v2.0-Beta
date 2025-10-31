import dynamic from "next/dynamic";
import LastUpdatedBadge from "../Shared/components/LastUpdatedBadge";
import ViewCounter from "../Shared/components/ViewCounter";

const SiteMapClient = dynamic(() => import("./components/SiteMapClient"), { ssr: false });

export default function SiteMapPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manual Site Map</h1>
          <p className="text-sm text-gray-600">Curated links to the important places.</p>
        </div>
        <div className="flex items-center gap-2">
          <LastUpdatedBadge />
          <ViewCounter path="/Classic/SiteMap" />
        </div>
      </header>
      <SiteMapClient />
    </main>
  );
}
