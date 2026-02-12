'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Gift, Award } from 'lucide-react';
import { formatUSD, formatPercentage } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function Match401kCalculator() {
  const [salary, setSalary] = useState(80000);
  const [contributionPercentage, setContributionPercentage] = useState(6);
  const [matchPercentage, setMatchPercentage] = useState(50);
  const [matchLimit, setMatchLimit] = useState(6);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [result, setResult] = useState<null | {
    yourContribution: number;
    employerMatch: number;
    totalAnnual: number;
    matchCaptured: boolean;
    missedMatch: number;
    futureValue: number;
    employerMatchValue: number;
  }>(null);

  const calculateMatch = () => {
    const yourContribution = salary * (contributionPercentage / 100);
    const maxMatchAmount = salary * (matchLimit / 100);
    const eligibleContribution = Math.min(yourContribution, maxMatchAmount);
    const employerMatch = eligibleContribution * (matchPercentage / 100);
    const totalAnnual = yourContribution + employerMatch;
    const matchCaptured = contributionPercentage >= matchLimit;
    const missedMatch = matchCaptured ? 0 : (maxMatchAmount - yourContribution) * (matchPercentage / 100);
    
    const years = retirementAge - currentAge;
    const annualRate = 1 + (annualReturn / 100);
    
    // Calculate future value of just employer match
    let matchFutureValue = 0;
    for (let i = 0; i < years; i++) {
      matchFutureValue += employerMatch;
      matchFutureValue *= annualRate;
    }
    
    // Calculate future value of total contributions
    let totalFutureValue = 0;
    for (let i = 0; i < years; i++) {
      totalFutureValue += totalAnnual;
      totalFutureValue *= annualRate;
    }

    setResult({
      yourContribution: Math.round(yourContribution),
      employerMatch: Math.round(employerMatch),
      totalAnnual: Math.round(totalAnnual),
      matchCaptured,
      missedMatch: Math.round(missedMatch),
      futureValue: Math.round(totalFutureValue),
      employerMatchValue: Math.round(matchFutureValue)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: '401k Match Calculator' }
      ]} />

      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">401k Match Calculator</h1>
            <p className="text-sm text-gray-600">Don't leave free money on the table</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Gift className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Your 401k match details</h2>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Your contribution
              </label>
              <span className="text-lg font-bold text-blue-600">{contributionPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={contributionPercentage}
              onChange={(e) => setContributionPercentage(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">0%</span>
              <span className="text-xs text-gray-500">Recommended: {matchLimit}%</span>
              <span className="text-xs text-gray-500">15%+</span>
            </div>
          </div>

          <div className="mb-6 p-4 bg-green-50 rounded-xl">
            <h3 className="font-medium text-green-800 mb-4">Employer match formula</h3>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-green-700">Match percentage</label>
                <span className="text-sm font-bold text-green-700">{matchPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={matchPercentage}
                onChange={(e) => setMatchPercentage(Number(e.target.value))}
                className="w-full accent-green-600"
              />
              <p className="text-xs text-green-700 mt-2">
                Common: 50% (match half of your contribution)
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-green-700">Match limit</label>
                <span className="text-sm font-bold text-green-700">{matchLimit}% of salary</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={matchLimit}
                onChange={(e) => setMatchLimit(Number(e.target.value))}
                className="w-full accent-green-600"
              />
              <p className="text-xs text-green-700 mt-2">
                Common: 6% (match up to 6% of your salary)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
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
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

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

          <button
            onClick={calculateMatch}
            className="w-full bg-green-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Award className="h-5 w-5" />
            Calculate your free money
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 shadow-lg">
              <p className="text-green-100 text-sm font-medium uppercase tracking-wide">
                Annual employer match
              </p>
              <p className="text-4xl font-bold text-white mt-1">
                {formatUSD(result.employerMatch)}
              </p>
              <p className="text-green-100 text-sm mt-2">
                Free money from your employer
              </p>
            </div>

            {!result.matchCaptured && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-amber-800">You're leaving money on the table</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Increase your contribution to {matchLimit}% to get an additional {formatUSD(result.missedMatch)}/year
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your 401k growth</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Your contributions</span>
                  <span className="font-semibold text-gray-900">{formatUSD(result.yourContribution)}/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employer match</span>
                  <span className="font-semibold text-green-600">{formatUSD(result.employerMatch)}/year</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-medium text-gray-900">Total annual contribution</span>
                  <span className="font-bold text-gray-900">{formatUSD(result.totalAnnual)}/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Future value at retirement</span>
                  <span className="font-bold text-blue-600">{formatUSD(result.futureValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value of employer match alone</span>
                  <span className="font-bold text-green-600">{formatUSD(result.employerMatchValue)}</span>
                </div>
              </div>
            </div>

            <RelatedTools 
              current="401k-match"
              tools={[
                { name: '401k & Retirement', href: '/retirement', description: 'Full retirement planner' },
                { name: 'Roth IRA', href: '/roth-ira', description: 'Compare Roth vs Traditional' },
                { name: 'DCA Investing', href: '/dca', description: 'Monthly investment calculator' }
              ]}
            />
          </div>
        )}

        <FAQ 
          items={[
            {
              question: 'What is a 401k employer match?',
              answer: 'An employer match is free money your company contributes to your 401k when you contribute. Common formula: 50% match up to 6% of salary.'
            },
            {
              question: 'How much should I contribute to get full match?',
              answer: 'Contribute at least your employer\'s match limit. If they match 50% up to 6%, contribute 6%. This is an instant 50% return on your money.'
            },
            {
              question: 'What happens if I contribute too much?',
              answer: 'You cannot contribute more than the IRS limit ($22,500 in 2026, plus $7,500 catch-up if 50+). Employer match does not count toward this limit.'
            }
          ]}
        />
      </div>
    </div>
  );
}
