'use client';

import { useMemo, useRef, useState } from "react";
import Button from "@/app/DesignSystem/components/Button";
import type { EleuEntry, EleuVault } from "../types";
import { encryptJSON, decryptJSON } from "../lib/crypto";
import { writeVaultCipher, readVaultCipher } from "../lib/storage";
import { uid } from "../lib/uid";

function copy(text: string) {
  try { navigator.clipboard.writeText(text); } catch {}
}

type Props = {
  cryptoKey: CryptoKey;
  initial: EleuVault;
  onLock: () => void;
};

export default function Vault({ cryptoKey, initial, onLock }: Props) {
  const [vault, setVault] = useState<EleuVault>(initial);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<EleuEntry | null>(null);

  async function persist(next: EleuVault) {
    const payload = await encryptJSON(cryptoKey, next);
    writeVaultCipher(payload);
  }

  function filtered(entries: EleuEntry[]) {
    if (!q.trim()) return entries;
    const s = q.toLowerCase();
    return entries.filter((e) =>
      (e.title && e.title.toLowerCase().includes(s)) ||
      (e.username && e.username.toLowerCase().includes(s)) ||
      (e.url && e.url.toLowerCase().includes(s)) ||
      (e.notes && e.notes.toLowerCase().includes(s))
    );
  }

  async function saveEntry(e: EleuEntry) {
    const list = [...vault.entries];
    const idx = list.findIndex((x) => x.id === e.id);
    if (idx >= 0) list[idx] = e; else list.unshift(e);
    const next = { entries: list, updatedAt: Date.now() };
    setVault(next);
    await persist(next);
    setEditing(null);
  }

  function onExport() {
    // Export encrypted payload as JSON file
    const payload = readVaultCipher();
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ELEUTHIA-encrypted-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const fileRef = useRef<HTMLInputElement>(null);
  function onImportClick() {
    fileRef.current?.click();
  }
  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      // validate shape
      if (!payload.iv || !payload.ct) throw new Error("Invalid file");
      // quick decrypt test
      const v = await decryptJSON<EleuVault>(cryptoKey, payload);
      setVault(v);
      writeVaultCipher(payload);
    } catch (err) {
      alert("Import failed (wrong file or passphrase).");
    } finally {
      e.target.value = "";
    }
  }

  const entries = useMemo(() => filtered(vault.entries), [vault.entries, q]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">ELEUTHIA</h2>
          <p className="text-xs text-gray-500">Zero-knowledge · local-first · AES‑GCM 256</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onExport}>Export (encrypted)</Button>
          <Button onClick={onImportClick} className="opacity-90">Import (encrypted)</Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onImportFile} />
          <Button onClick={onLock} className="opacity-75">Lock</Button>
        </div>
      </header>

      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300"
        />
        <Button onClick={() => setEditing({ id: uid("e"), title: "", username: "", password: "", url: "", notes: "", updatedAt: Date.now() })}>
          Add entry
        </Button>
      </div>

      {entries.length === 0 ? (
        <div className="rounded border border-gray-200 p-6 text-center text-sm text-gray-600">No entries yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {entries.map((e) => (
            <article key={e.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{e.title}</h3>
                <div className="text-xs text-gray-500">{new Date(e.updatedAt).toLocaleString()}</div>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                {e.username && <div><span className="text-gray-500">User:</span> {e.username}</div>}
                {e.url && (
                  <div className="truncate">
                    <span className="text-gray-500">URL:</span>{" "}
                    <a className="underline hover:no-underline" href={e.url} target="_blank" rel="noreferrer">{e.url}</a>
                  </div>
                )}
                {e.notes && <div className="whitespace-pre-wrap text-gray-700">{e.notes}</div>}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {e.password && <Button onClick={() => copy(e.password!)} className="opacity-90">Copy password</Button>}
                <Button onClick={() => setEditing(e)} className="opacity-90">Edit</Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <div className="rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium">{editing.id.startsWith("e_") ? "New entry" : "Edit entry"}</h4>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="text-sm">
              Title
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300" />
            </label>
            <label className="text-sm">
              Username
              <input value={editing.username ?? ""} onChange={(e) => setEditing({ ...editing, username: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300" />
            </label>
            <label className="text-sm">
              Password
              <input type="password" value={editing.password ?? ""} onChange={(e) => setEditing({ ...editing, password: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300" />
            </label>
            <label className="text-sm">
              URL
              <input value={editing.url ?? ""} onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300" />
            </label>
          </div>
          <label className="mt-3 block text-sm">
            Notes
            <textarea value={editing.notes ?? ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
              rows={4}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-300" />
          </label>

          <div className="mt-4 flex items-center gap-2">
            <Button onClick={() => saveEntry({ ...editing, updatedAt: Date.now() })} disabled={!editing.title}>Save</Button>
            <Button onClick={() => setEditing(null)} className="opacity-75">Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
