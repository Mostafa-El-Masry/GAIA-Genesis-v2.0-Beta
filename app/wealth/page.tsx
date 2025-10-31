import WealthBars from "./components/WealthBars";

const demo = [
  { label: "Jan", value: 1000 },
  { label: "Feb", value: 1300 },
  { label: "Mar", value: 1800 },
  { label: "Apr", value: 2100 },
  { label: "May", value: 2600 },
  { label: "Jun", value: 3000 },
  { label: "Jul", value: 4000 },
  { label: "Aug", value: 5200 },
];

export default function WealthPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Wealth</h1>
        <p className="text-sm text-gray-600">Same layout, stronger visual scale using exponential heights.</p>
      </header>
      <WealthBars title="Savings" data={demo} />
    </main>
  );
}
