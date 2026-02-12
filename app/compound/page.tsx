'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, PieChart, BarChart3 } from 'lucide-react';
import { formatUSD } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function CompoundCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(30);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [compoundFrequency, setCompoundFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
  const [result, setResult] = useState<null | {
    finalBalance: number;
    totalContributions: number;
    totalEarnings: number;
    yearlyBreakdown: { year: number; balance: number }[];
  }>(null);

  const calculateCompound = () => {
    let periodsPerYear: number;
    switch (compoundFrequency) {
      case 'monthly': periodsPerYear = 12; break;
      case 'quarterly': periodsPerYear = 4; break;
      case 'annually': periodsPerYear = 1; break;
    }
    
    const periodicRate = annualReturn / 100 / periodsPerYear;
    const totalPeriods = years * periodsPerYear;
    const contributionPerPeriod = monthlyContribution * (12 / periodsPerYear);
    
    let balance = principal;
    let totalContributions = principal;
    const yearlyBreakdown = [];
    
    for (let year = 1; year <= years; year++) {
      for (let period = 1; period <= periodsPerYear; period++) {
        // Add interest
        balance *= (1 + periodicRate);
        
        // Add contribution
        if (period === periodsPerYear || year < years || period <= periodsPerYear) {
          balance += contributionPerPeriod;
          totalContributions += contributionPerPeriod;
        }
      }
      
      yearlyBreakdown.push({
        year,
        balance: Math.round(balance)
      });
    }
    
    setResult({
      finalBalance: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalEarnings: Math.round(balance - totalContributions),
      yearlyBreakdown
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Compound Interest Visualizer' }
      ]} />

      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Compound Interest Visualizer</h1>
            <p className="text-sm text-gray-600">See the power of exponential growth</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Investment parameters</h2>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial investment
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

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
              max="50"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Annual return
              </label>
              <span className="text-lg font-bold text-blue-600">{annualReturn}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Compound frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'annually', label: 'Annually' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCompoundFrequency(option.value as any)}
                  className={`py-4 text-sm font-semibold rounded-xl transition-all
                    ${compoundFrequency === option.value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={calculateCompound}
            className="w-full bg-blue-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            Visualize compound growth
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg">
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                Future value
              </p>
              <p className="text-4xl font-bold text-white mt-1">
                {formatUSD(result.finalBalance)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Your contributions</p>
                <p className="text-xl font-bold text-gray-900">{formatUSD(result.totalContributions)}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Investment earnings</p>
                <p className="text-xl font-bold text-green-600">{formatUSD(result.totalEarnings)}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Growth visualization</h3>
              <div className="space-y-3">
                {result.yearlyBreakdown.filter((_, i) => i % 5 === 0).map((data) => (
                  <div key={data.year} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-12">Year {data.year}</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        style={{ width: `${(data.balance / result.finalBalance) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-900">{formatUSD(data.balance)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">⚡ The power of compound interest</h4>
              <p className="text-sm text-blue-800">
                Your {formatUSD(principal)} initial investment grew to {formatUSD(result.finalBalance)}.
                That's <span className="font-bold">{formatUSD(result.totalEarnings)}</span> in earnings 
                from just {formatUSD(result.totalContributions - principal)} of additional contributions.
              </p>
            </div>

            <RelatedTools 
              current="compound"
              tools={[
                { name: 'DCA Calculator', href: '/dca', description: 'Monthly investment with DRIP' },
                { name: '401k & Retirement', href: '/retirement', description: 'Employer match calculator' },
                { name: 'Roth IRA', href: '/roth-ira', description: 'Tax-free growth' }
              ]}
            />
          </div>
        )}

        <FAQ 
          items={[
            {
              question: 'What is compound interest?',
              answer: 'Compound interest means earning "interest on interest". Your money grows exponentially because you earn returns on both your original investment and previously earned returns.'
            },
            {
              question: 'What is a good average return?',
              answer: 'The S&P 500 has historically returned 7-10% annually after inflation. We recommend using 7% for conservative long-term estimates.'
            },
            {
              question: 'Does compound frequency matter?',
              answer: 'Yes. More frequent compounding (monthly vs annually) results in slightly higher returns. Monthly compounding is standard for most investments.'
            }
          ]}
        />
      </div>
    </div>
  );
}
