'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface GrowthSimulatorProps {
  monthlyContribution: number;
  setMonthlyContribution: (val: number) => void;
  annualReturn: number;
  setAnnualReturn: (val: number) => void;
  years: number;
  setYears: (val: number) => void;
  totalValue: number;
  projectedValue: number;
  formatIDR: (val: number) => string;
}

export default function GrowthSimulator({
  monthlyContribution,
  setMonthlyContribution,
  annualReturn,
  setAnnualReturn,
  years,
  setYears,
  totalValue,
  projectedValue,
  formatIDR,
}: GrowthSimulatorProps) {
  const totalInjectedCapital = totalValue + (monthlyContribution * years * 12);
  const totalProfitOnly = projectedValue - totalInjectedCapital;

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-400" /> Simulator Pertumbuhan
      </h2>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Investasi Rutin / Bulan:</span>
            <span className="font-semibold text-blue-400">{formatIDR(monthlyContribution)}</span>
          </div>
          <input 
            type="range" min="0" max="20000000" step="500000" 
            value={monthlyContribution} 
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full accent-blue-500 bg-slate-700 rounded-lg h-2 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Asumsi Imbal Hasil (Per Tahun):</span>
            <span className="font-semibold text-emerald-400">{annualReturn}%</span>
          </div>
          <input 
            type="range" min="1" max="25" step="0.5" 
            value={annualReturn} 
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-700 rounded-lg h-2 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Jangka Waktu:</span>
            <span className="font-semibold text-amber-400">{years} Tahun</span>
          </div>
          <input 
            type="range" min="1" max="30" step="1" 
            value={years} 
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-amber-500 bg-slate-700 rounded-lg h-2 cursor-pointer"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/40 space-y-2">
        <div className="text-xs text-slate-400">Estimasi Total Modal Disetor:</div>
        <div className="text-sm font-semibold">{formatIDR(totalInjectedCapital)}</div>
        <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">Estimasi Keuntungan Saja:</div>
        <div className="text-base font-bold text-emerald-400">
          {formatIDR(totalProfitOnly)}
        </div>
      </div>
    </div>
  );
}