'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HeartPulse, TrendingUp, DollarSign, Calendar, Award } from 'lucide-react';
import { formatUSD } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function HSACalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(5000);
  const [annualContribution, setAnnualContribution] = useState(3550);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [taxRate, setTaxRate] = useState(22);
  const [useForMedical, setUseForMedical] = useState(true);
  const [result, setResult] = useState<null | {
    hsaBalance: number;
    taxSavings: number;
    equivalent401k: number;
    totalValue: number;
  }>(null);

  const calculateHSA = () => {
    const years = retirementAge - currentAge;
    const annualRate = 1 + (annualReturn / 100);
    
    let balance = currentBalance;
    let totalContributions = currentBalance;
    
    for (let i = 0; i < years; i++) {
      balance += annualContribution;
      totalContributions += annualContribution;
      balance *= annualRate;
    }
    
    // Tax savings: contributions × tax rate
    const taxSavings = (totalContributions - currentBalance) * (taxRate / 100);
    
    // HSA is triple tax-advantaged
    const equivalent401k = balance / (1 - (taxRate / 100));
    
    setResult({
      hsaBalance: Math.round(balance),
      taxSavings: Math.round(taxSavings),
      equivalent401k: Math.round(equivalent401k),
      totalValue: Math.round(balance + taxSavings)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'HSA Investment Calculator' }
      ]} />

      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">HSA Investment Calculator</h1>
            <p className="text-sm text-gray-600">Triple tax advantage • Medical + Retirement</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <HeartPulse className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Your HSA strategy</h2>
          </div>
          
          {/* Age */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement age
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full px-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Current Balance */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current HSA balance
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Annual Contribution */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Annual HSA contribution
              </label>
              <span className="text-lg font-bold text-blue-600">{formatUSD(annualContribution)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="3850"
              step="50"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">$0</span>
              <span className="text-xs text-gray-500">2026 Limit: $3,850</span>
              <span className="text-xs text-gray-500">$3,850</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Individual: $3,850 • Family: $7,750 • Catch-up (55+): +$1,000
            </p>
          </div>

          {/* Investment Return */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Expected annual return
              </label>
              <span className="text-lg font-bold text-blue-600">{annualReturn}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Tax Rate */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Your tax bracket
              </label>
              <span className="text-lg font-bold text-blue-600">{taxRate}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="37"
              step="1"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Strategy Toggle */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="medicalStrategy"
                checked={useForMedical}
                onChange={(e) => setUseForMedical(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="medicalStrategy" className="text-sm font-medium text-gray-700">
                Pay current medical expenses out-of-pocket (invest HSA for retirement)
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2 ml-8">
              This is the "HSA as super IRA" strategy. Save receipts, invest tax-free.
            </p>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateHSA}
            className="w-full bg-emerald-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Award className="h-5 w-5" />
            Calculate triple tax advantage
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Hero Result */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-lg">
              <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide">
                Your HSA at age {retirementAge}
              </p>
              <p className="text-4xl font-bold text-white mt-1">
                {formatUSD(result.hsaBalance)}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  💰 Tax savings: {format
