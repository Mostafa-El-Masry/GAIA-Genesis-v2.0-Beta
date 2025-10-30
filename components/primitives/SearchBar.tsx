'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchBar() {
  const router = useRouter()
  const params = useSearchParams()
  const [q, setQ] = useState("")

  useEffect(() => {
    const current = params.get("q") || ""
    setQ(current)
  }, [params])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const term = q.trim()
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search")
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search GAIA…"
        className="w-full h-10 rounded-full border px-4 focus:outline-none"
        aria-label="Global search"
      />
    </form>
  )
}
