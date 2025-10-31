'use client';

import { posts } from "../data/posts";

export default function AnnouncementsClient() {
  return (
    <div className="space-y-3">
      {posts.map((p) => (
        <article key={p.id} className="rounded border border-gray-200 p-4">
          <header className="flex items-center justify-between">
            <h3 className="font-semibold">{p.title}</h3>
            <div className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</div>
          </header>
          <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{p.body}</p>
        </article>
      ))}
    </div>
  );
}
