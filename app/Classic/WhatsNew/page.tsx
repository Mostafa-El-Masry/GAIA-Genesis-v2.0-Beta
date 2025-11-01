import LastUpdatedBadge from "../Shared/components/LastUpdatedBadge";
import ViewCounter from "../Shared/components/ViewCounter";
import WhatsNewClient from "./components/WhatsNewClient";

export default function WhatsNewPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">What’s New</h1>
          <p className="text-sm gaia-muted">Latest updates across GAIA.</p>
        </div>
        <div className="flex items-center gap-2">
          <LastUpdatedBadge />
          <ViewCounter path="/Classic/WhatsNew" />
        </div>
      </header>
      <WhatsNewClient />
    </main>
  );
}
