'use client';

import { useEffect, useState } from 'react';

export default function LastUpdatedBadge({ date }: { date?: string }) {
  const [d, setD] = useState<string>("");
  useEffect(() => {
    const source = date ? new Date(date) : new Date(document.lastModified || Date.now());
    setD(source.toLocaleString());
  }, [date]);
  return (
    <span className="inline-flex items-center rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600">
      Last updated: {d || "—"}
    </span>
  );
}
