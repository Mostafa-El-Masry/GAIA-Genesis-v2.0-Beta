'use client';

import { useCitadelProgress } from "../lib/progress";
import { tracks } from "../data/tracks";

/**
 * Mini-map (Week 6): clickable squares to jump to a track section.
 * Each square represents a node; clicking any square in a track scrolls to that track's panel.
 */
export default function MiniMap() {
  const { isUnlocked } = useCitadelProgress();

  return (
    <div className="hidden items-center gap-2 md:flex">
      <div className="text-xs text-gray-500">Mini-map</div>
      <div className="grid grid-cols-5 gap-0.5 rounded border border-gray-200 p-1">
        {tracks.map((t) =>
          t.nodes.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                const el = document.getElementById(`track-${t.id}`);
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`h-2 w-2 rounded ${isUnlocked(n.id) ? "bg-green-600" : "bg-gray-300"} focus:outline-none focus:ring focus:ring-gray-300`}
              title={`${t.title} · Tier ${n.tier}`}
              aria-label={`${t.title} tier ${n.tier}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
