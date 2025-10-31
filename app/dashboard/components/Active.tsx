'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { listBuilds } from "@/app/Labs/lib/labs";
import { hasVault } from "@/app/ELEUTHIA/lib/storage";

type Result = { conceptId: string; score: number; total: number; completedAt: number; notes?: string };

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

export default function Active() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Result[]>([]);
  const [vault, setVault] = useState<boolean>(false);
  const [buildCount, setBuildCount] = useState<number>(0);

  useEffect(() => {
    function load() {
      setProgress(readJSON("gaia.citadel.progress", {}));
      setResults(readJSON<Result[]>("gaia.citadel.academy.results", []));
      setVault(hasVault());
      try {
        setBuildCount(listBuilds().length);
      } catch {
        setBuildCount(0);
      }
    }
    load();
    function onAny() { load(); }
    window.addEventListener("storage", onAny);
    window.addEventListener("gaia:citadel:progress", onAny as any);
    return () => {
      window.removeEventListener("storage", onAny);
      window.removeEventListener("gaia:citadel:progress", onAny as any);
    };
  }, []);

  const unlocked = useMemo(() => Object.values(progress).filter(Boolean).length, [progress]);
  const last = useMemo(() => results.slice().sort((a,b) => (b.completedAt||0) - (a.completedAt||0))[0], [results]);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Active</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/Citadel" className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300">
          <div className="text-xs text-gray-500">Citadel</div>
          <div className="mt-1 text-3xl font-semibold">{unlocked}</div>
          <div className="text-xs text-gray-500">nodes unlocked</div>
        </Link>

        <Link href="/Citadel" className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300">
          <div className="text-xs text-gray-500">Last Academy score</div>
          <div className="mt-1 text-3xl font-semibold">
            {last ? `${last.score}/${last.total}` : "—"}
          </div>
          <div className="text-xs text-gray-500">{last ? new Date(last.completedAt).toLocaleString() : "No sessions yet"}</div>
        </Link>

        <Link href="/Labs" className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300">
          <div className="text-xs text-gray-500">Labs builds</div>
          <div className="mt-1 text-3xl font-semibold">{buildCount}</div>
          <div className="text-xs text-gray-500">completed concepts</div>
        </Link>

        <Link href="/ELEUTHIA" className="rounded-lg border border-gray-200 p-4 transition hover:border-gray-300">
          <div className="text-xs text-gray-500">ELEUTHIA</div>
          <div className="mt-1 text-3xl font-semibold">{vault ? "Ready" : "Setup"}</div>
          <div className="text-xs text-gray-500">{vault ? "Vault present" : "Create your vault"}</div>
        </Link>
      </div>
    </section>
  );
}
