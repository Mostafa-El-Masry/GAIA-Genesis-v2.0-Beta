'use client';

import { tracks } from "../data/tracks";
import { useCitadelProgress } from "../lib/progress";
import MiniMap from "./TowerMiniMap";

/**
 * Tower v1 (Week 4)
 * - Tier gating: T2 requires T1, T3 requires T2, etc. (per track)
 * - Reveal hint: the first locked-but-unlockable node pulses to guide the user
 * - Tailwind-only (no CSS files)
 */
export default function Tower() {
  const { isUnlocked, toggleNode, countUnlocked } = useCitadelProgress();

  function canUnlock(trackId: string, tier: 1 | 2 | 3 | 4 | 5) {
    // T1 is always unlockable
    if (tier === 1) return true;
    // require all previous tiers in the same track to be unlocked
    for (let t = 1 as 1 | 2 | 3 | 4 | 5; t < tier; t = ((t + 1) as any)) {
      const id = `${trackId}-t${t}`;
      if (!isUnlocked(id)) return false;
    }
    return true;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium">Tower</h2>
          <p className="mt-1 text-xs text-gray-500">
            Unlock tiers in order per track. Tier 2 requires Tier 1, etc. The next unlockable node will gently pulse.
          </p>
        </div>
        <MiniMap />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {tracks.map((track) => {
          // Find the first locked-but-unlockable node for the pulse effect
          const nextId = track.nodes.find((n) => !isUnlocked(n.id) && canUnlock(track.id, n.tier))?.id;

          return (
            <div key={track.id} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{track.title}</h3>
                <span className="text-xs text-gray-500">
                  {track.nodes.filter((n) => isUnlocked(n.id)).length}/5
                </span>
              </div>

              <ol className="space-y-2">
                {track.nodes.map((node) => {
                  const unlocked = isUnlocked(node.id);
                  const allowed = canUnlock(track.id, node.tier);
                  const unlockable = !unlocked && allowed;
                  const isNext = node.id === nextId;

                  let classes =
                    "w-full rounded-md border p-3 text-left transition focus:outline-none ";
                  if (unlocked) {
                    classes += "border-green-600 bg-green-50/70";
                  } else if (unlockable) {
                    classes += "border-gray-300 hover:border-gray-400 ring-1 ring-gray-200";
                    if (isNext) classes += " animate-pulse";
                  } else {
                    classes += "border-gray-200 opacity-60 cursor-not-allowed";
                  }

                  return (
                    <li key={node.id}>
                      <button
                        onClick={() => {
                          if (unlocked) {
                            // allow re-lock for flexibility during development
                            toggleNode(node.id, false);
                          } else if (allowed) {
                            toggleNode(node.id, true);
                          }
                        }}
                        aria-disabled={!unlocked && !allowed}
                        className={classes}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Tier {node.tier}</span>
                          <span className="text-xs">{unlocked ? "Unlocked" : allowed ? "Ready" : "Locked"}</span>
                        </div>
                        <div className="mt-1 font-medium">{node.title}</div>
                        {!unlocked && allowed && (
                          <div className="mt-2 text-[11px] text-gray-500">Click to unlock</div>
                        )}
                        {!allowed && !unlocked && (
                          <div className="mt-2 text-[11px] text-gray-400">
                            Requires previous tier in {track.title}
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-500">Total unlocked: {countUnlocked()}</p>
    </section>
  );
}
