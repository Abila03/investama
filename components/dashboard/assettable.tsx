'use client';

import React, { useState } from 'react';
import { PieChart, Trash2 } from 'lucide-react';
import { Asset } from './types';

interface AssetTableProps {
  assets: Asset[];
  totalValue: number;
  onDeleteAsset: (id: number) => void;
  formatIDR: (val: number) => string;
}

export default function AssetTable({ assets, totalValue, onDeleteAsset, formatIDR }: AssetTableProps) {
  const [activeTab, setActiveTab] = useState('Semua');

  const filteredAssets = activeTab === 'Semua' 
    ? assets 
    : assets.filter(item => item.category === activeTab);

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-400" /> Rincian Aset
        </h2>

        <div className="flex flex-wrap gap-2">
          {['Semua', 'Saham', 'Reksadana', 'Obligasi', 'Kripto', 'Kas', 'Komoditas', 'ETF'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs">
            <tr>
              <th className="p-3 rounded-l-lg">Aset</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Modal Awal</th>
              <th className="p-3">Nilai Sekarang</th>
              <th className="p-3">Profit / Loss</th>
              <th className="p-3">Porsi Portofolio</th>
              <th className="p-3 text-center rounded-r-lg">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => {
                const profitLoss = asset.currentValue - asset.initialAmount;
                const profitPercentage = ((profitLoss / asset.initialAmount) * 100).toFixed(2);
                const allocationPercentage = totalValue > 0 ? ((asset.currentValue / totalValue) * 100).toFixed(1) : '0';

                return (
                  <tr key={asset.id} className="hover:bg-slate-700/30 transition">
                    <td className="p-3 font-semibold text-white">{asset.name}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-xs bg-slate-900 border border-slate-700 text-slate-300">
                        {asset.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{formatIDR(asset.initialAmount)}</td>
                    <td className="p-3 font-medium text-white">{formatIDR(asset.currentValue)}</td>
                    <td className="p-3">
                      <span className={`font-medium ${profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {profitLoss >= 0 ? '+' : ''}{formatIDR(profitLoss)} ({profitPercentage}%)
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full" 
                            style={{ width: `${allocationPercentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{allocationPercentage}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => onDeleteAsset(asset.id)}
                        className="p-1.5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition"
                        title="Hapus Aset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-6 text-slate-500">
                  Tidak ada aset pada kategori ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}