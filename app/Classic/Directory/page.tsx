import dynamic from "next/dynamic";
import LastUpdatedBadge from "../Shared/components/LastUpdatedBadge";
import ViewCounter from "../Shared/components/ViewCounter";

const DirectoryClient = dynamic(() => import("./components/DirectoryClient"), { ssr: false });

export default function DirectoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dev Directory</h1>
          <p className="text-sm text-gray-600">Quick list of app routes for development.</p>
        </div>
        <div className="flex items-center gap-2">
          <LastUpdatedBadge />
          <ViewCounter path="/Classic/Directory" />
        </div>
      </header>
      <DirectoryClient />
    </main>
  );
}
