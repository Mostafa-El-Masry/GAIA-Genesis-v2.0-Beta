'use client';

import { useMemo, useState } from "react";
import { items } from "../data/entries";

function daysSince(date: string) {
  const d = (Date.now() - new Date(date).getTime()) / (1000*60*60*24);
  return Math.floor(d);
}

export default function WhatsNewClient() {
  const [tag, setTag] = useState<string>("all");
  const tags = useMemo(() => {
    const s = new Set<string>();
    items.forEach(i => i.tags?.forEach(t => s.add(t)));
    return ["all", ...Array.from(s).sort()];
  }, []);

  const list = useMemo(() => {
    const sorted = items.slice().sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return tag === "all" ? sorted : sorted.filter(i => i.tags?.includes(tag));
  }, [tag]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm">Filter</label>
        <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
          {tags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {list.map((i) => (
          <article key={i.id} className="rounded border border-gray-200 p-4">
            <header className="flex items-center justify-between">
              <h3 className="font-semibold">{i.title}</h3>
              <div className="text-xs text-gray-500">{new Date(i.date).toLocaleDateString()}</div>
            </header>
            <p className="mt-2 text-sm text-gray-700">{i.body}</p>
            <div className="mt-2 flex items-center gap-2">
              {i.tags?.map(t => <span key={t} className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-600">{t}</span>)}
              {daysSince(i.date) <= 14 && <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">New</span>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
