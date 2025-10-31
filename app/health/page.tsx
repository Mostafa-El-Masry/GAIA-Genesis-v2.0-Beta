import TrendBars from "./components/TrendBars";

const demo = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 45 },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 55 },
  { label: "Fri", value: 53 },
  { label: "Sat", value: 58 },
  { label: "Sun", value: 60 },
  { label: "Next", value: 65 },
];

export default function HealthPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Health</h1>
        <p className="text-sm text-gray-600">Same layout, but bar heights now use exponential scaling to feel richer.</p>
      </header>
      <TrendBars title="Energy" data={demo} />
    </main>
  );
}
