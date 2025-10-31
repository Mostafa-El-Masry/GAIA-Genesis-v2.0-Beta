'use client';

import { useCitadelProgress } from "../lib/progress";
import { tracks } from "../data/tracks";

/**
 * Very small mini-map: 8 × 5 grid of squares (tracks × tiers)
 */
export default function MiniMap() {
  const { isUnlocked } = useCitadelProgress();

  return (
    <div className="hidden items-center gap-2 md:flex">
      <div className="text-xs text-gray-500">Mini‑map</div>
      <div className="grid grid-cols-5 gap-0.5 rounded border border-gray-200 p-1">
        {tracks.map((t) =>
          t.nodes.map((n) => (
            <div
              key={n.id}
              className={`h-2 w-2 rounded ${isUnlocked(n.id) ? "bg-green-600" : "bg-gray-300"}`}
              title={`${t.title} · Tier ${n.tier}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
