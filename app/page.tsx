'use client';

import React, { useState } from 'react';
import { Asset } from '@/components/dashboard/types';
import { INITIAL_ASSETS } from '@/data/mockassets';
import { formatIDR } from '@/utils/formatters';

import DashboardHeader from '@/components/dashboard/dashboardheader';
import KpiCards from '@/components/dashboard/kpicards';
import GrowthSimulator from '@/components/dashboard/growthsimulator';
import AddAssetForm from '@/components/dashboard/addassetform';
import AssetTable from '@/components/dashboard/assettable';
import PortfolioChart from '@/components/dashboard/chart';




export default function InvestmentPortfolio() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(2000000);
  const [annualReturn, setAnnualReturn] = useState<number>(10);
  const [years, setYears] = useState<number>(10);

  // Perhitungan Nilai Utama
  const totalValue = assets.reduce((sum, item) => sum + item.currentValue, 0);
  const totalInvested = assets.reduce((sum, item) => sum + item.initialAmount, 0);
  const totalProfitLoss = totalValue - totalInvested;
  const percentagePL = totalInvested > 0 ? ((totalProfitLoss / totalInvested) * 100).toFixed(2) : '0';



  // Kalkulasi Proyeksi Masa Depan
  const calculateProjection = () => {
    let currentBalance = totalValue;
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    for (let i = 0; i < totalMonths; i++) {
      currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
    }
    return currentBalance;
  };

  const handleAddAsset = (newAsset: Asset) => setAssets([...assets, newAsset]);
  const handleDeleteAsset = (id: number) => setAssets(assets.filter(a => a.id !== id));
  
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />

        <KpiCards 
          totalValue={totalValue}
          totalInvested={totalInvested}
          totalProfitLoss={totalProfitLoss}
          percentagePL={percentagePL}
          projectedValue={calculateProjection()}
          years={years}
          annualReturn={annualReturn}
          formatIDR={formatIDR}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pie Chart Alokasi */}
          <div className="lg:col-span-1">
            <PortfolioChart assets={assets} formatIDR={formatIDR} />
          </div>
          
          <GrowthSimulator 
            monthlyContribution={monthlyContribution}
            setMonthlyContribution={setMonthlyContribution}
            annualReturn={annualReturn}
            setAnnualReturn={setAnnualReturn}
            years={years}
            setYears={setYears}
            totalValue={totalValue}
            projectedValue={calculateProjection()}
            formatIDR={formatIDR}
          />
          <div className="lg:col-span-2">
            <AddAssetForm onAddAsset={handleAddAsset} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          

          
        </div>

        <AssetTable 
          assets={assets}
          totalValue={totalValue}
          onDeleteAsset={handleDeleteAsset}
          formatIDR={formatIDR}
        />
      </div>
    </div>
  );
}