'use client';

import { useState } from 'react';
import { nid, loadTx, saveTx } from '../lib/store';
import type { Transaction, TxType } from '../lib/types';

const PANEL =
  "gaia-surface rounded-xl border gaia-border p-4 shadow-sm";
const INPUT =
  "gaia-input rounded-lg px-3 py-1.5";
const BUTTON =
  "gaia-border gaia-surface rounded-lg px-3 py-1.5 text-sm font-semibold shadow-sm";

export default function QuickAdd(){
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TxType>('expense');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));

  function addTx(){
    if (!amount || amount <= 0) return;
    const list = loadTx();
    const tx: Transaction = {
      id: nid(),
      date: new Date(date).toISOString(),
      amount: Number(amount),
      type, category,
      tags: tags ? tags.split(',').map(s=>s.trim()).filter(Boolean) : [],
      note: note || undefined,
    };
    list.push(tx); saveTx(list);
    setAmount(0); setNote(''); setTags('');
  }

  return (
    <section className={PANEL}>
      <h2 className="mb-2 text-lg font-extrabold tracking-wide gaia-strong">Quick Add</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-6">
        <input className={`${INPUT} sm:col-span-1`} type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input className={`${INPUT} sm:col-span-1`} placeholder="Amount" type="number" value={amount || ''} onChange={e=>setAmount(Number(e.target.value))} />
        <select className={`${INPUT} sm:col-span-1`} value={type} onChange={e=>setType(e.target.value as TxType)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="transfer">Transfer</option>
        </select>
        <input className={`${INPUT} sm:col-span-1`} placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <input className={`${INPUT} sm:col-span-1`} placeholder="tags, comma,separated" value={tags} onChange={e=>setTags(e.target.value)} />
        <div className="flex items-center gap-2 sm:col-span-1">
          <button className={BUTTON} onClick={addTx}>Add</button>
        </div>
        <input className={`${INPUT} sm:col-span-6`} placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
      </div>
    </section>
  );
}
