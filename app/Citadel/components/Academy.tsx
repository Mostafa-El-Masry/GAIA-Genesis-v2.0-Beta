'use client';

import { tracks } from "../data/tracks";
import { useCitadelProgress } from "../lib/progress";
import Button from "@/app/DesignSystem/components/Button";
import { useMemo, useState } from "react";

/**
 * Skeleton for the Academy loop. For Week 3 we show:
 * - Pick a micro‑concept (Tier 1 nodes from any track)
 * - "Start session" button placeholder
 * Later weeks add quiz/build steps and auto-embed.
 */
export default function Academy() {
  const { isUnlocked, toggleNode } = useCitadelProgress();
  const tier1Nodes = useMemo(
    () =>
      tracks
        .flatMap((t) => t.nodes.filter((n) => n.tier === 1).map((n) => ({ ...n, track: t.id, trackTitle: t.title })))
        .slice(0, 16),
    []
  );

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Choose a micro‑concept</h2>
        <p className="text-sm text-gray-600">Start with Tier 1. Completing a session will unlock the corresponding node in the Tower.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tier1Nodes.map((n) => {
          const active = selected === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setSelected(n.id)}
              className={`rounded-md border p-3 text-left transition ${
                active ? "border-gray-900 shadow-sm" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-xs text-gray-500">{n.trackTitle} · Tier {n.tier}</div>
              <div className="mt-1 font-medium">{n.title}</div>
              <div className="mt-2 text-xs">
                Status: {isUnlocked(n.id) ? <span className="text-green-600">Unlocked</span> : <span className="text-gray-500">Locked</span>}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            if (!selected) return;
            // Placeholder: mark selected node as unlocked
            toggleNode(selected, true);
            window.dispatchEvent(new CustomEvent("gaia:citadel:session", { detail: { nodeId: selected, result: "complete" } }));
          }}
          disabled={!selected}
        >
          Start session
        </Button>

        <span className="text-xs text-gray-500">Week 3 skeleton: clicking “Start session” simply unlocks the node.</span>
      </div>
    </section>
  );
}
