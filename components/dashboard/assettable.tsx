'use client';

import React, { useState } from 'react';
import { PieChart, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Asset } from './types';

interface AssetTableProps {
  assets: Asset[];
  totalValue: number;
  onDeleteAsset: (id: number) => void;
  formatIDR: (val: number) => string;
}

// Tipe kolom yang bisa di-sort
type SortField = 'name' | 'category' | 'initialAmount' | 'currentValue' | 'profitLoss' | 'allocation';
type SortOrder = 'asc' | 'desc';

export default function AssetTable({ assets, totalValue, onDeleteAsset, formatIDR }: AssetTableProps) {
  const [activeTab, setActiveTab] = useState('Semua');

  // State untuk Sorting
  const [sortField, setSortField] = useState<SortField>('currentValue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Handler saat Header Kolom diklik
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // 1. Filter berdasarkan Tab Kategori
  const filteredAssets = activeTab === 'Semua' 
    ? assets 
    : assets.filter(item => item.category === activeTab);

  // 2. Sort data yang telah difilter
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    let aValue: number | string = 0;
    let bValue: number | string = 0;

    if (sortField === 'profitLoss') {
      aValue = a.currentValue - a.initialAmount;
      bValue = b.currentValue - b.initialAmount;
    } else if (sortField === 'allocation') {
      aValue = totalValue > 0 ? a.currentValue / totalValue : 0;
      bValue = totalValue > 0 ? b.currentValue / totalValue : 0;
    } else {
      aValue = a[sortField] ?? 0;
      bValue = b[sortField] ?? 0;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortOrder === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  // Helper Ikon Sort dari Lucide React
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />;
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
      : <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />;
  };

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
          <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs select-none">
            <tr>
              <th 
                onClick={() => handleSort('name')} 
                className="p-3 rounded-l-lg cursor-pointer hover:text-white group"
              >
                <div className="flex items-center gap-1.5">
                  Aset {renderSortIcon('name')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('category')} 
                className="p-3 cursor-pointer hover:text-white group"
              >
                <div className="flex items-center gap-1.5">
                  Kategori {renderSortIcon('category')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('initialAmount')} 
                className="p-3 cursor-pointer hover:text-white group"
              >
                <div className="flex items-center gap-1.5">
                  Modal Awal {renderSortIcon('initialAmount')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('currentValue')} 
                className="p-3 cursor-pointer hover:text-white group"
              >
                <div className="flex items-center gap-1.5">
                  Nilai Sekarang {renderSortIcon('currentValue')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('profitLoss')} 
                className="p-3 cursor-pointer hover:text-white group"
              >
                <div className="flex items-center gap-1.5">
                  Profit / Loss {renderSortIcon('profitLoss')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('allocation')} 
                className="p-3 cursor-pointer hover:text-white group"
              >
                <div className="flex items-center gap-1.5">
                  Porsi Portofolio {renderSortIcon('allocation')}
                </div>
              </th>
              <th className="p-3 text-center rounded-r-lg">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sortedAssets.length > 0 ? (
              sortedAssets.map((asset) => {
                const profitLoss = asset.currentValue - asset.initialAmount;
                const profitPercentage = asset.initialAmount > 0 
                  ? ((profitLoss / asset.initialAmount) * 100).toFixed(2) 
                  : '0.00';
                const allocationPercentage = totalValue > 0 
                  ? ((asset.currentValue / totalValue) * 100).toFixed(1) 
                  : '0';

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