'use client';

import { useState } from "react";

/**
 * Global Search primitive (single default style)
 * - Emits CustomEvent("gaia:search", { detail: { q }}) on Enter
 */
export default function SearchInput({ placeholder = "Search GAIA…", className = "" }: { placeholder?: string; className?: string }) {
  const [q, setQ] = useState("");

  function emitSearch() {
    const event = new CustomEvent("gaia:search", { detail: { q } });
    window.dispatchEvent(event);
  }

  return (
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") emitSearch();
      }}
      placeholder={placeholder}
      className={`w-full max-w-xl rounded-md border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:ring focus:ring-gray-300 ${className}`}
      aria-label="Search GAIA"
    />
  );
}
