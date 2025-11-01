"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadNetItems,
  saveNetItems,
  loadNetSnaps,
  saveNetSnaps,
  nid,
} from "../lib/store";
import type { NetItem, NetSnapshot } from "../lib/types";

function fmt(n: number) {
  return n.toLocaleString("en-EG", { maximumFractionDigits: 0 });
}

const PANEL =
  "gaia-surface rounded-xl border gaia-border p-4 shadow-sm";
const INPUT =
  "gaia-input rounded-lg px-3 py-1.5";
const BUTTON =
  "gaia-border gaia-surface rounded-lg px-3 py-1.5 text-sm font-semibold shadow-sm";
const TABLE_WRAPPER =
  "mt-2 rounded-lg border gaia-border bg-[color-mix(in_srgb,var(--gaia-surface)_88%,transparent)]";

export default function NetWorth() {
  const [items, setItems] = useState<NetItem[]>([]);
  const [month, setMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [snaps, setSnaps] = useState<NetSnapshot[]>([]);

  const [name, setName] = useState("Cash");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setItems(loadNetItems());
    setSnaps(loadNetSnaps());
  }, []);

  const total = useMemo(() => items.reduce((s, i) => s + i.amount, 0), [items]);

  function add() {
    const next = [...items, { id: nid(), name, amount }];
    saveNetItems(next);
    setItems(next);
    setName("Cash");
    setAmount(0);
  }
  function remove(id: string) {
    const next = items.filter((i) => i.id !== id);
    saveNetItems(next);
    setItems(next);
  }
  function snapshot() {
    const next = [...snaps.filter((s) => s.month !== month), { month, total }];
    saveNetSnaps(next);
    setSnaps(next);
  }

  return (
    <section className={PANEL}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-extrabold tracking-wide gaia-strong">Net Worth</h2>
        <div className="flex items-center gap-2">
          <input
            className={INPUT}
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <button
            className={BUTTON}
            onClick={snapshot}
          >
            Snapshot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-lg border gaia-border p-3 gaia-surface shadow-sm">
          <div className="font-semibold gaia-strong">Items</div>
          <div className="mt-2 flex items-center gap-2">
            <input
              className={INPUT}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={INPUT}
              placeholder="Amount (+/-)"
              type="number"
              value={amount ?? ""}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
              className={BUTTON}
              onClick={add}
            >
              Add
            </button>
          </div>
          <div className={TABLE_WRAPPER}>
            <table className="w-full text-sm">
              <thead className="gaia-panel-soft">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-t gaia-border">
                    <td className="p-2">{i.name}</td>
                    <td className="p-2 text-right">{fmt(i.amount)}</td>
                    <td className="p-2 text-right">
                      <button
                        className="gaia-border gaia-surface rounded-lg px-2 py-1 text-xs font-semibold shadow-sm"
                        onClick={() => remove(i.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td className="gaia-muted p-3 text-center" colSpan={3}>
                      No items.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-right text-sm">
            Total: <span className="font-bold">{fmt(total)}</span>
          </div>
        </div>
        <div className="rounded-lg border gaia-border p-3 gaia-surface shadow-sm">
          <div className="font-semibold gaia-strong">Snapshots</div>
          <div className={TABLE_WRAPPER}>
            <table className="w-full text-sm">
              <thead className="gaia-panel-soft">
                <tr>
                  <th className="p-2 text-left">Month</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {snaps
                  .sort((a, b) => a.month.localeCompare(b.month))
                  .map((s) => (
                    <tr key={s.month} className="gaia-border border-t">
                      <td className="p-2">{s.month}</td>
                      <td className="p-2 text-right">{fmt(s.total)}</td>
                    </tr>
                  ))}
                {snaps.length === 0 && (
                  <tr>
                    <td className="gaia-muted p-3 text-center" colSpan={2}>
                      No snapshots yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
