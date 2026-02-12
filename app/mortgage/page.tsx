'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Calendar, TrendingDown, Clock, Home, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { calculateMortgage, MortgageInput, MortgageResult } from '@/lib/calculators/mortgage';
import { formatUSD, formatPercentage, formatYearsMonths } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState<MortgageInput>({
    loanAmount: 400000,
    interestRate: 6.5,
    loanTermYears: 30,
    monthlyPrepayment: 200
  });

  const [result, setResult] = useState<MortgageResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = () => {
    const calcResult = calculateMortgage(inputs);
    setResult(calcResult);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Mortgage Prepayment' }
      ]} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mortgage Prepayment</h1>
            <p className="text-sm text-gray-600">See how extra payments save thousands</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Loan details</h2>
          </div>
          
          {/* Loan Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={inputs.loanAmount}
                onChange={(e) => setInputs({ ...inputs, loanAmount: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="400,000"
              />
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-xs text-gray-500">$100k</span>
              <span className="text-xs font-medium text-blue-600">{formatUSD(inputs.loanAmount)}</span>
              <span className="text-xs text-gray-500">$1M+</span>
            </div>
          </div>

          {/* Interest Rate - Big Thumb Slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Interest rate
              </label>
              <span className="text-lg font-bold text-blue-600">{inputs.interestRate}%</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="0.125"
              value={inputs.interestRate}
              onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between mt-1 px-1">
              <span className="text-xs text-gray-500">2.0%</span>
              <span className="text-xs text-gray-500">6.0%</span>
              <span className="text-xs text-gray-500">10.0%</span>
            </div>
          </div>

          {/* Loan Term - Big Touch Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Loan term
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((years) => (
                <button
                  key={years}
                  onClick={() => setInputs({ ...inputs, loanTermYears: years })}
                  className={`py-4 text-sm font-semibold rounded-xl transition-all active:scale-[0.98]
                    ${inputs.loanTermYears === years
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {years} years
                </button>
              ))}
            </div>
          </div>

          {/* Prepayment */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Monthly prepayment
              </label>
              <span className="text-lg font-bold text-green-600">+{formatUSD(inputs.monthlyPrepayment)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={inputs.monthlyPrepayment}
              onChange={(e) => setInputs({ ...inputs, monthlyPrepayment: Number(e.target.value) })}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between mt-1 px-1">
              <span className="text-xs text-gray-500">$0</span>
              <span className="text-xs text-gray-500">$500</span>
              <span className="text-xs text-gray-500">$1,000+</span>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg active:bg-blue-700 active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2"
          >
            <DollarSign className="h-5 w-5" />
            Calculate your savings
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Hero Savings - Sticky Results on Mobile */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 shadow-lg results-sheet">
              <p className="text-green-100 text-sm font-medium uppercase tracking-wide">
                Total interest saved
              </p>
              <p className="text-4xl font-bold text-white mt-1">
                {formatUSD(result.interestSaved)}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  🎯 {formatYearsMonths(result.monthsToPayoff)} payoff
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  ⚡ {Math.round((inputs.loanTermYears * 12 - result.monthsToPayoff) / 12)} years early
                </span>
              </div>
            </div>

            {/* Key Metrics - Single Column Mobile */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly payment</p>
                    <p className="text-xl font-bold text-gray-900">{formatUSD(result.monthlyPayment)}</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700 font-medium">
                  P&I only
                </span>
              </div>

              <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payoff date</p>
                    <p className="text-xl font-bold text-gray-900">{result.payoffDate}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total interest</p>
                    <p className="text-xl font-bold text-gray-900">{formatUSD(result.totalInterest)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown - Accordion */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white active:bg-gray-50"
              >
                <span className="font-semibold text-gray-900">Payment breakdown</span>
                {showDetails ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {showDetails && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal & interest</span>
                      <span className="font-semibold text-gray-900">{formatUSD(result.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Extra payment</span>
                      <span className="font-semibold text-green-600">+{formatUSD(inputs.monthlyPrepayment)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-medium text-gray-900">Total monthly</span>
                      <span className="font-bold text-gray-900">{formatUSD(result.monthlyPayment + inputs.monthlyPrepayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan term</span>
                      <span className="font-semibold text-gray-900">
                        {formatYearsMonths(result.monthsToPayoff)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* How it works - Educational */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm">How you save</h3>
                  <p className="text-sm text-blue-800 mt-2 leading-relaxed">
                    By paying <span className="font-bold">an extra {formatUSD(inputs.monthlyPrepayment)} monthly</span>, 
                    you'll save <span className="font-bold">{formatUSD(result.interestSaved)}</span> in interest and 
                    pay off your loan <span className="font-bold">{Math.round((inputs.loanTermYears * 12 - result.monthsToPayoff) / 12)} years faster</span>.
                  </p>
                  <p className="text-xs text-blue-700 mt-3">
                    Based on {inputs.loanTermYears}-year fixed-rate mortgage. Actual savings may vary.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Tools - Internal Links for SEO */}
            <RelatedTools 
              current="mortgage"
              tools={[
                { name: 'Home Affordability', href: '/affordability', description: 'How much house can you afford?' },
                { name: 'DCA Investing', href: '/dca', description: 'Monthly investment calculator' },
                { name: 'Rent vs Buy', href: '/rent-vs-buy', description: 'Should you rent or buy?' }
              ]}
            />
          </div>
        )}

        {/* FAQ Section - SEO Gold */}
        <FAQ 
          items={[
            {
              question: 'How much does TrustTally cost?',
              answer: 'TrustTally is 100% free. No subscription, no login, no credit card required. We don\'t even track your data.'
            },
            {
              question: 'How accurate is this mortgage calculator?',
              answer: 'We use the same standard amortization formulas as Fannie Mae and Freddie Mac. All calculations are accurate to the penny for U.S. fixed-rate mortgages.'
            },
            {
              question: 'Should I pay extra on my mortgage?',
              answer: 'Extra payments save interest and build equity faster. Use this calculator to see exactly how much you can save based on your specific loan terms.'
            },
            {
              question: 'What is mortgage prepayment?',
              answer: 'Mortgage prepayment means paying more than your required monthly payment. The extra amount goes directly to your principal, reducing total interest and shortening your loan term.'
            }
          ]}
        />
      </div>
    </div>
  );
}
