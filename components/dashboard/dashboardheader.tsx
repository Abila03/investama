'use client';

import React from 'react';
import { Download } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Portofolio Investasi
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Pantau alokasi aset, kinerja investasi, dan simulasi pertumbuhan masa depan.
        </p>
      </div>
      <button 
        onClick={() => alert("Fitur ekspor PDF/Excel siap diintegrasikan!")}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg border border-slate-700 transition"
      >
        <Download className="w-4 h-4" /> Ekspor Laporan
      </button>
    </div>
  );
}