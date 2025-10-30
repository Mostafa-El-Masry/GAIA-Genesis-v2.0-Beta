'use client'
import { useEffect, useState } from "react"
import Button from "@/components/primitives/Button"
import { getTheme, setTheme, themes } from "@/lib/theme"

export default function SettingsPage() {
  const [theme, setThemeState] = useState<string>(getTheme())

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("gaia.theme", theme)
  }, [theme])

  return (
    <div className="mx-auto max-w-2xl p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <section className="space-y-2">
        <h2 className="font-medium">Theme</h2>
        <div className="flex flex-wrap gap-2">
          {themes.map(t => (
            <button
              key={t}
              onClick={() => setThemeState(t)}
              className={`px-3 py-1 rounded border ${theme===t ? "bg-base-200" : "hover:bg-base-200"}`}
              aria-pressed={theme===t}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-medium">Primitives (preview)</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <input placeholder="Search style" className="h-10 rounded-full border px-4" />
        </div>
      </section>
    </div>
  )
}
