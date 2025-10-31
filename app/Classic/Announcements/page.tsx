import dynamic from "next/dynamic";
import LastUpdatedBadge from "../Shared/components/LastUpdatedBadge";
import ViewCounter from "../Shared/components/ViewCounter";

const AnnouncementsClient = dynamic(() => import("./components/AnnouncementsClient"), { ssr: false });

export default function AnnouncementsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Announcements</h1>
          <p className="text-sm text-gray-600">Longer notes and bulletins.</p>
        </div>
        <div className="flex items-center gap-2">
          <LastUpdatedBadge />
          <ViewCounter path="/Classic/Announcements" />
        </div>
      </header>
      <AnnouncementsClient />
    </main>
  );
}
