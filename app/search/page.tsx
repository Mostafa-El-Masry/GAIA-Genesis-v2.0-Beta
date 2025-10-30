import index from "@/data/searchIndex.json"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams?.q ?? "").toLowerCase()
  const results = (index as { title: string; path: string; tags?: string[] }[])
    .filter(item => {
      if (!q) return true
      const hay = (item.title + " " + item.path + " " + (item.tags || []).join(" ")).toLowerCase()
      return hay.includes(q)
    })

  return (
    <div className="mx-auto max-w-4xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Search</h1>
      <p className="text-sm opacity-70">Showing {results.length} result(s){q ? ` for “${q}”` : ""}.</p>
      <ul className="divide-y border rounded">
        {results.map((r, i) => (
          <li key={i} className="p-3 hover:bg-base-200">
            <a href={r.path} className="font-medium hover:underline">{r.title}</a>
            <div className="text-xs opacity-70">{r.path}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
