'use client';

import ThemePicker from "./components/ThemePicker";
import PrimitivesPicker from "./components/PrimitivesPicker";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-gray-600">Per-user preferences are stored locally in your browser.</p>

      <section className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium">Appearance</h2>
        <div className="mt-4 space-y-8">
          <ThemePicker />
          <PrimitivesPicker />
        </div>
      </section>

      <section className="mt-10 text-xs text-gray-500">
        <p>Phase 5 baseline: Theme picker + one default Button + one default Search bar.</p>
      </section>
    </main>
  );
}
