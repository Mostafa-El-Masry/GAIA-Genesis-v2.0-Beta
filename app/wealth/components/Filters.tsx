'use client';

import { useState } from 'react';

export type FilterState = {
  q: string;
  type: 'All' | 'income' | 'expense' | 'transfer';
  category: string;
  from?: string; // YYYY-MM-DD
  to?: string;
};

const PANEL =
  "gaia-surface rounded-xl border gaia-border p-4 shadow-sm";
const INPUT =
  "gaia-input rounded-lg px-3 py-1.5";
const BUTTON =
  "gaia-border gaia-surface rounded-lg px-3 py-1.5 text-sm font-semibold shadow-sm";

export default function Filters({ onChange }:{ onChange:(f:FilterState)=>void }){
  const [q,setQ] = useState('');
  const [type,setType] = useState<'All'|'income'|'expense'|'transfer'>('All');
  const [category,setCategory] = useState('');
  const [from,setFrom] = useState<string>('');
  const [to,setTo] = useState<string>('');

  function fire(){ onChange({ q, type, category, from: from || undefined, to: to || undefined }); }

  return (
    <section className={PANEL}>
      <div className="flex flex-wrap items-center gap-2">
        <input className={INPUT} placeholder="Search note/tags/category..." value={q} onChange={e=>{setQ(e.target.value);}} onBlur={fire} />
        <select className={INPUT} value={type} onChange={e=>{setType(e.target.value as any); fire();}}>
          <option>All</option><option>income</option><option>expense</option><option>transfer</option>
        </select>
        <input className={INPUT} placeholder="Category" value={category} onChange={e=>{setCategory(e.target.value)}} onBlur={fire} />
        <input className={INPUT} type="date" value={from} onChange={e=>{setFrom(e.target.value); fire();}} />
        <input className={INPUT} type="date" value={to} onChange={e=>{setTo(e.target.value); fire();}} />
        <button className={BUTTON} onClick={fire}>Apply</button>
      </div>
    </section>
  );
}
