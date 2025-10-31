import dynamic from "next/dynamic";
import LastUpdatedBadge from "../Shared/components/LastUpdatedBadge";
import ViewCounter from "../Shared/components/ViewCounter";

const DownloadCenterClient = dynamic(() => import("./components/DownloadCenterClient"), { ssr: false });

export default function DownloadCenterPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Download Center</h1>
          <p className="text-sm text-gray-600">Curated downloads. Links can point to /public files or remote URLs.</p>
        </div>
        <div className="flex items-center gap-2">
          <LastUpdatedBadge />
          <ViewCounter path="/Classic/DownloadCenter" />
        </div>
      </header>
      <DownloadCenterClient />
    </main>
  );
}
