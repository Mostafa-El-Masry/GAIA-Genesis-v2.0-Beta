'use client';

import { routes } from "../data/routes";

function copy(text: string) {
  try { navigator.clipboard.writeText(text); } catch {}
}

export default function SiteMapClient() {
  const byGroup = routes.reduce((acc: Record<string, typeof routes>, r) => {
    const g = r.group || "General";
    acc[g] = acc[g] || [];
    acc[g].push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(byGroup).map(([g, list]) => (
        <section key={g} className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">{g}</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => (
              <a
                key={r.path}
                href={r.path}
                className="group flex items-center justify-between rounded border border-gray-200 p-3 transition hover:border-gray-300"
                title={r.path}
              >
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-gray-500">{r.path}</div>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); copy(location.origin + r.path); }}
                  className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-600 opacity-0 transition group-hover:opacity-100"
                >
                  Copy URL
                </button>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
