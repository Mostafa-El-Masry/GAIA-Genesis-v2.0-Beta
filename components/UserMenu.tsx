'use client'
import Link from "next/link"
import { useState } from "react"

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-base-200"
      >
        <div className="h-6 w-6 rounded-full bg-neutral/20" />
        <span className="text-sm">User</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-lg border bg-base-100 shadow-lg p-1"
          onMouseLeave={() => setOpen(false)}
        >
          <Link href="/settings" className="block px-3 py-2 rounded hover:bg-base-200">Settings</Link>
        </div>
      )}
    </div>
  )
}
