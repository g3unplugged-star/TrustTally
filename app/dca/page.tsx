'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, PieChart, Info } from 'lucide-react';
import { formatUSD } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function DCACalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [dividendYield, setDividendYield] = useState(1.5);
  const [result, setResult] = useState<null | {
    finalBalance: number;
    totalContributions: number;
    totalEarnings: number;
    dividendIncome: number;
    afterTaxValue: number;
  }>(null);

  const calculateDCA = () => {
    const monthlyRate = annualReturn / 100 / 12;
    const dividendRate = dividendYield / 100 / 12;
    const totalMonths = years * 12;
    
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    let totalDividends = 0;

    for (let month = 0; month < totalMonths; month++) {
      // Add monthly contribution
      balance += monthlyContribution;
      totalContributions += monthlyContribution;
      
      // Apply market return
      balance *= (1 + monthlyRate);
      
      // Apply dividend reinvestment
      const monthlyDividend = balance * dividendRate;
      balance += monthlyDividend;
      totalDividends += monthlyDividend;
    }

    const totalEarnings = balance - totalContributions;
    const afterTaxValue = balance - (totalEarnings * 0.15);

    setResult({
      finalBalance: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalEarnings: Math.round(totalEarnings),
      dividendIncome: Math.round(totalDividends),
      afterTaxValue: Math.round(afterTaxValue)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'DCA & Dividend Calculator' }
      ]} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">DCA + DRIP Calculator</h1>
            <p className="text-sm text-gray-600">Dollar cost averaging with dividend reinvestment</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Investment strategy</h2>
          </div>
          
          {/* Initial Investment */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial investment
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Monthly contribution
              </label>
              <span className="text-lg font-bold text-blue-600">{formatUSD(monthlyContribution)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Time Horizon */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Time horizon
              </label>
              <span className="text-lg font-bold text-blue-600">{years} years</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Expected Return */}
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

          {/* Dividend Yield */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Dividend yield (DRIP)
              </label>
              <span className="text-lg font-bold text-purple-600">{dividendYield}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={dividendYield}
              onChange={(e) => setDividendYield(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateDCA}
            className="w-full bg-purple-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-purple-700 active:scale-[0.98] transition-all"
          >
            Calculate future value
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Hero Result */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg">
              <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">
                Future value
              </p>
              <p className="text-4xl font-bold text-white mt-1">
                {formatUSD(result.finalBalance)}
              </p>
              <p className="text-purple-100 text-sm mt-2">
                after {years} years of DCA + DRIP
              </p>
            </div>

            {/* Key Metrics */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Your contributions</p>
                    <p className="text-xl font-bold text-gray-900">{formatUSD(result.totalContributions)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Investment earnings</p>
                    <p className="text-xl font-bold text-green-600">{formatUSD(result.totalEarnings)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dividend income</p>
                    <p className="text-xl font-bold text-purple-600">{formatUSD(result.dividendIncome)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <RelatedTools 
              current="dca"
              tools={[
                { name: '401k & Retirement', href: '/retirement', description: 'With employer match' },
                { name: 'Roth IRA Calculator', href: '/roth-ira', description: 'Tax-free growth' },
                { name: 'Compound Interest', href: '/compound', description: 'Visualize your growth' }
              ]}
            />
          </div>
        )}

        {/* FAQ */}
        <FAQ 
          items={[
            {
              question: 'What is Dollar Cost Averaging (DCA)?',
              answer: 'DCA means investing a fixed amount regularly, regardless of market conditions. This reduces the impact of volatility and removes emotion from investing.'
            },
            {
              question: 'What is DRIP?',
              answer: 'DRIP (Dividend Reinvestment Plan) automatically uses dividend payments to buy more shares. This compounds your returns over time.'
            },
            {
              question: 'What return should I expect?',
              answer: 'The S&P 500 has historically returned 7-10% annually. Dividend yields average 1.5% for the broad market, but can be higher with dividend-focused ETFs.'
            }
          ]}
        />
      </div>
    </div>
  );
}
