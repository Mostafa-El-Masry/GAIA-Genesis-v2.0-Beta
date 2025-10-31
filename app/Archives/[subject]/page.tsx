import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const SubjectClient = dynamic(() => import("./components/SubjectClient"), { ssr: false });

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const { subject } = params;
  // Client will validate and render errors; page shell stays light.
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <SubjectClient subjectId={subject} />
    </main>
  );
}
