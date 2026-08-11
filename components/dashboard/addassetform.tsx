'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Asset } from './types';

interface AddAssetFormProps {
  onAddAsset: (asset: Asset) => void;
}

export default function AddAssetForm({ onAddAsset }: AddAssetFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Saham');
  const [initialAmount, setInitialAmount] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !initialAmount || !currentValue) return;

    onAddAsset({
      id: Date.now(),
      name,
      category,
      initialAmount: parseFloat(initialAmount),
      currentValue: parseFloat(currentValue),
    });

    setName('');
    setInitialAmount('');
    setCurrentValue('');
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
          <Plus className="w-5 h-5 text-emerald-400" /> Tambah Aset Investasi
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Nama Aset / Kode</label>
            <input 
              type="text" placeholder="Contoh: BBCA, Bitcoin, Reksadana A"
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Kategori</label>
            <select 
              value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="Saham">Saham</option>
              <option value="Reksadana">Reksadana</option>
              <option value="Obligasi">Obligasi</option>
              <option value="Kripto">Kripto</option>
              <option value="Kas">Kas / Deposito</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Modal Awal (IDR)</label>
            <input 
              type="number" placeholder="10000000"
              value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Nilai Saat Ini (IDR)</label>
            <input 
              type="number" placeholder="12000000"
              value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Tambahkan ke Portofolio
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl text-xs text-blue-300">
        💡 <strong>Tips:</strong> Perbarui nilai aset Anda secara berkala untuk mendapatkan kalkulasi alokasi dan keuntungan proyeksi yang lebih akurat.
      </div>
    </div>
  );
}