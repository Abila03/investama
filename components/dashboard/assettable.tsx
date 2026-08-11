'use client';

import React, { useState } from 'react';
import { Asset } from '@/components/dashboard/types';

interface AssetTableProps {
  assets: Asset[];
  totalValue: number;
  onDeleteAsset: (id: number) => void;
  formatIDR: (val: number) => string;
}

// Tipe kolom yang bisa di-sort (Format Lama)
type SortField = 'name' | 'category' | 'initialAmount' | 'currentValue' | 'profitLoss';
type SortOrder = 'asc' | 'desc';

export default function AssetTable({ assets, onDeleteAsset, formatIDR }: AssetTableProps) {
  // State untuk melacak kolom yang sedang di-sort
  const [sortField, setSortField] = useState<SortField>('currentValue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Handler saat header diklik
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Logika Pengurutan Data
  const sortedAssets = [...assets].sort((a, b) => {
    let aValue: number | string = 0;
    let bValue: number | string = 0;

    if (sortField === 'profitLoss') {
      aValue = a.currentValue - a.initialAmount;
      bValue = b.currentValue - b.initialAmount;
    } else {
      aValue = a[sortField] ?? 0;
      bValue = b[sortField] ?? 0;
    }

    // Sort untuk teks (A-Z)
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Sort untuk angka
    return sortOrder === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  // Helper Ikon Panah Sort
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="text-slate-600 ml-1">↕</span>;
    }
    return <span className="text-emerald-400 ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-100">Daftar Aset Portofolio</h3>
        <span className="text-xs text-slate-400">Klik header kolom untuk mengurutkan</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs border-b border-slate-700">
            <tr>
              <th onClick={() => handleSort('name')} className="p-3 cursor-pointer hover:text-slate-200 select-none">
                Nama Aset {renderSortIcon('name')}
              </th>
              <th onClick={() => handleSort('category')} className="p-3 cursor-pointer hover:text-slate-200 select-none">
                Kategori {renderSortIcon('category')}
              </th>
              <th onClick={() => handleSort('initialAmount')} className="p-3 cursor-pointer hover:text-slate-200 select-none text-right">
                Total Modal {renderSortIcon('initialAmount')}
              </th>
              <th onClick={() => handleSort('currentValue')} className="p-3 cursor-pointer hover:text-slate-200 select-none text-right">
                Nilai Sekarang {renderSortIcon('currentValue')}
              </th>
              <th onClick={() => handleSort('profitLoss')} className="p-3 cursor-pointer hover:text-slate-200 select-none text-right">
                Profit / Loss {renderSortIcon('profitLoss')}
              </th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sortedAssets.map((asset) => {
              const profitLoss = asset.currentValue - asset.initialAmount;
              const isProfit = profitLoss >= 0;

              return (
                <tr key={asset.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-3 font-medium text-slate-100">{asset.name}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                      {asset.category}
                    </span>
                  </td>
                  <td className="p-3 text-right">{formatIDR(asset.initialAmount)}</td>
                  <td className="p-3 text-right font-semibold text-slate-100">{formatIDR(asset.currentValue)}</td>
                  <td className={`p-3 text-right font-semibold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isProfit ? '+' : ''}{formatIDR(profitLoss)}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => onDeleteAsset(asset.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors text-xs p-1"
                      title="Hapus Aset"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}