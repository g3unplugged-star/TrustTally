'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PiggyBank, TrendingUp, DollarSign, Calendar, Info } from 'lucide-react';
import { formatUSD } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function RothIRACalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualContribution, setAnnualContribution] = useState(6500);
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [currentTaxRate, setCurrentTaxRate] = useState(22);
  const [retirementTaxRate, setRetirementTaxRate] = useState(12);
  const [result, setResult] = useState<null | {
    rothBalance: number;
    traditionalBalance: number;
    rothAfterTax: number;
    traditionalAfterTax: number;
    taxSavings: number;
    betterOption: 'Roth' | 'Traditional';
  }>(null);

  const calculateRoth = () => {
    const years = retirementAge - currentAge;
    const annualRate = 1 + (annualReturn / 100);
    
    // Roth: Pay tax now, grow tax-free
    const rothContribution = annualContribution; // Already after-tax
    let rothBalance = currentBalance;
    for (let i = 0; i < years; i++) {
      rothBalance += rothContribution;
      rothBalance *= annualRate;
    }
    
    // Traditional: Tax-deferred, pay tax on withdrawals
    const traditionalContribution = annualContribution / (1 - (currentTaxRate / 100));
    let traditionalBalance = currentBalance;
    for (let i = 0; i < years; i++) {
      traditionalBalance += traditionalContribution;
      traditionalBalance *= annualRate;
    }
    
    const rothAfterTax = rothBalance;
    const traditionalAfterTax = traditionalBalance * (1 - (retirementTaxRate / 100));
    
    setResult({
      rothBalance: Math.round(rothBalance),
      traditionalBalance: Math.round(traditionalBalance),
      rothAfterTax: Math.round(rothAfterTax),
      traditionalAfterTax: Math.round(traditionalAfterTax),
      taxSavings: Math.round(Math.abs(rothAfterTax - traditionalAfterTax)),
      betterOption: rothAfterTax > traditionalAfterTax ? 'Roth' : 'Traditional'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Roth vs Traditional IRA' }
      ]} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Roth vs Traditional IRA</h1>
            <p className="text-sm text-gray-600">Tax now vs tax later</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <PiggyBank className="h-5 w-5 text-amber-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Your IRA profile</h2>
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
              Current IRA balance
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
                Annual contribution
              </label>
              <span className="text-lg font-bold text-blue-600">{formatUSD(annualContribution)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="7000"
              step="500"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">$0</span>
              <span className="text-xs text-gray-500">2026 Limit: $7,000</span>
              <span className="text-xs text-gray-500">$7k</span>
            </div>
          </div>

          {/* Return Rate */}
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

          {/* Tax Rates */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-4 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Your tax situation
            </h3>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-blue-700">Current tax bracket</label>
                <span className="text-sm font-bold text-blue-700">{currentTaxRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="37"
                step="1"
                value={currentTaxRate}
                onChange={(e) => setCurrentTaxRate(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-blue-700">Retirement tax bracket (expected)</label>
                <span className="text-sm font-bold text-blue-700">{retirementTaxRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="37"
                step="1"
                value={retirementTaxRate}
                onChange={(e) => setRetirementTaxRate(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateRoth}
            className="w-full bg-amber-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-amber-700 active:scale-[0.98] transition-all"
          >
            Compare Roth vs Traditional
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Winner Card */}
            <div className={`rounded-2xl p-6 shadow-lg ${
              result.betterOption === 'Roth' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            }`}>
              <p className="text-white/90 text-sm font-medium uppercase tracking-wide">
                🏆 Better choice for you
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                {result.betterOption} IRA
              </p>
              <p className="text-white/90 text-sm mt-2">
                You save {formatUSD(result.taxSavings)} in taxes
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Roth IRA</p>
                <p className="text-xl font-bold text-amber-600">{formatUSD(result.rothAfterTax)}</p>
                <p className="text-xs text-gray-500 mt-1">Tax-free withdrawals</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Traditional IRA</p>
                <p className="text-xl font-bold text-blue-600">{formatUSD(result.traditionalAfterTax)}</p>
                <p className="text-xs text-gray-500 mt-1">After {retirementTaxRate}% tax</p>
              </div>
            </div>

            {/* Related Tools */}
            <RelatedTools 
              current="roth-ira"
              tools={[
                { name: '401k & Retirement', href: '/retirement', description: 'Employer match calculator' },
                { name: 'DCA Investing', href: '/dca', description: 'Monthly investment plan' },
                { name: 'Compound Interest', href: '/compound', description: 'Visualize your growth' }
              ]}
            />
          </div>
        )}

        {/* FAQ */}
        <FAQ 
          items={[
            {
              question: 'Roth vs Traditional IRA: Which is better?',
              answer: 'Choose Roth if you expect higher taxes in retirement. Choose Traditional if you want a tax break now and expect lower taxes later.'
            },
            {
              question: 'What are the 2026 IRA contribution limits?',
              answer: 'The 2026 limit is $7,000 ($8,000 if age 50+). Income phaseouts apply for Roth IRA contributions.'
            },
            {
              question: 'Can I have both Roth and Traditional IRAs?',
              answer: 'Yes, but your total contributions cannot exceed the annual limit across both accounts.'
            }
          ]}
        />
      </div>
    </div>
  );
}
