import dynamic from "next/dynamic";

const SubjectsClient = dynamic(() => import("./components/SubjectsClient"), { ssr: false });

export default function ArchivesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Archives</h1>
        <p className="text-sm text-gray-600">Eight starter subjects. Mark lessons as “teachable” and push them to Academy.</p>
      </header>
      <SubjectsClient />
    </main>
  );
}
