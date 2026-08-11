'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Asset } from '@/components/dashboard/types';

interface PortfolioChartProps {
  assets: Asset[];
  formatIDR: (val: number) => string;
}

// Warna menarik untuk tiap kategori
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1'];

export default function PortfolioChart({ assets, formatIDR }: PortfolioChartProps) {
  // 1. Kelompokkan total nilai berdasarkan Kategori
  const categoryData = assets.reduce((acc, asset) => {
    const existingCategory = acc.find((item) => item.name === asset.category);
    if (existingCategory) {
      existingCategory.value += asset.currentValue;
    } else {
      acc.push({ name: asset.category, value: asset.currentValue });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Total portofolio untuk hitung persentase
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);

  // Custom Tooltip saat hover
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = totalValue > 0 ? ((data.value / totalValue) * 100).toFixed(1) : 0;
      return (
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
          <p className="font-semibold text-slate-200">{data.name}</p>
          <p className="text-emerald-400 font-bold">{formatIDR(data.value)}</p>
          <p className="text-slate-400">{percentage}% dari total portofolio</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Alokasi Portofolio</h3>
      
      {categoryData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
          Belum ada data aset untuk ditampilkan.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60} // Menjadikan donut chart (ubah ke 0 jika ingin pie utuh)
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                formatter={(value) => <span className="text-slate-300 text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}