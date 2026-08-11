'use client';

import React from 'react';
import { Wallet, TrendingUp, DollarSign, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KpiCardsProps {
  totalValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  percentagePL: string;
  projectedValue: number;
  years: number;
  annualReturn: number;
  formatIDR: (val: number) => string;
}

export default function KpiCards({
  totalValue,
  totalInvested,
  totalProfitLoss,
  percentagePL,
  projectedValue,
  years,
  annualReturn,
  formatIDR,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Total Nilai Portofolio</span>
          <Wallet className="w-5 h-5 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-white">{formatIDR(totalValue)}</div>
        <div className="text-xs text-slate-400 mt-1">Modal Awal: {formatIDR(totalInvested)}</div>
      </div>

      {/* Card 2 */}
      <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Total Profit / Loss</span>
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>
        <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {totalProfitLoss >= 0 ? '+' : ''}{formatIDR(totalProfitLoss)}
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold mt-1">
          {totalProfitLoss >= 0 ? (
            <span className="flex items-center text-emerald-400"><ArrowUpRight className="w-3 h-3"/> +{percentagePL}%</span>
          ) : (
            <span className="flex items-center text-rose-400"><ArrowDownRight className="w-3 h-3"/> {percentagePL}%</span>
          )}
          <span className="text-slate-500">secara keseluruhan</span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Proyeksi Aset ({years} Thn)</span>
          <DollarSign className="w-5 h-5 text-amber-400" />
        </div>
        <div className="text-2xl font-bold text-amber-400">{formatIDR(projectedValue)}</div>
        <div className="text-xs text-slate-400 mt-1">Asumsi return {annualReturn}% / thn</div>
      </div>

      {/* Card 4 */}
      <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Tingkat Risiko Portofolio</span>
          <ShieldAlert className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="text-2xl font-bold text-indigo-300">Moderat</div>
        <div className="text-xs text-slate-400 mt-1">Diversifikasi seimbang</div>
      </div>
    </div>
  );
}