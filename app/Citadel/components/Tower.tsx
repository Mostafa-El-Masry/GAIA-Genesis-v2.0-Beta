'use client';

import { tracks } from "../data/tracks";
import { useCitadelProgress } from "../lib/progress";
import MiniMap from "./TowerMiniMap";

/**
 * Tower foundation:
 * - 8 tracks
 * - 5 tiers per track
 * - Click a node to toggle unlock (Week 3 behavior)
 */
export default function Tower() {
  const { isUnlocked, toggleNode, countUnlocked } = useCitadelProgress();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Tower</h2>
        <MiniMap />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {tracks.map((track) => (
          <div key={track.id} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">{track.title}</h3>
              <span className="text-xs text-gray-500">{track.nodes.filter(n => isUnlocked(n.id)).length}/5</span>
            </div>

            <ol className="space-y-2">
              {track.nodes.map((node) => {
                const unlocked = isUnlocked(node.id);
                return (
                  <li key={node.id}>
                    <button
                      onClick={() => toggleNode(node.id, !unlocked)}
                      className={`w-full rounded-md border p-3 text-left transition ${
                        unlocked
                          ? "border-green-600 bg-green-50/70"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Tier {node.tier}</span>
                        <span className="text-xs">{unlocked ? "Unlocked" : "Locked"}</span>
                      </div>
                      <div className="mt-1 font-medium">{node.title}</div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500">Tip: You can also unlock a Tier 1 node from the Academy skeleton. Total unlocked: {countUnlocked()}</p>
    </section>
  );
}
