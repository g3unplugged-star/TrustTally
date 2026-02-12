'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, DollarSign, Percent, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { calculateAffordability, AffordabilityInput, AffordabilityResult } from '@/lib/calculators/affordability';
import { formatUSD } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function AffordabilityCalculator() {
  const [inputs, setInputs] = useState<AffordabilityInput>({
    annualIncome: 120000,
    monthlyDebts: 600,
    downPayment: 60000,
    interestRate: 6.5,
    loanTermYears: 30,
    propertyTaxRate: 1.1,
    homeInsurance: 150,
    dtiLimit: 43
  });

  const [result, setResult] = useState<AffordabilityResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = () => {
    const calcResult = calculateAffordability(inputs);
    setResult(calcResult);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Home Affordability' }
      ]} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Home Affordability</h1>
            <p className="text-sm text-gray-600">How much house can you afford?</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Home className="h-5 w-5 text-indigo-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Your financial profile</h2>
          </div>
          
          {/* Annual Income */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual household income
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={inputs.annualIncome}
                onChange={(e) => setInputs({ ...inputs, annualIncome: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
                placeholder="120,000"
              />
            </div>
          </div>

          {/* Monthly Debts */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly debt payments
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={inputs.monthlyDebts}
                onChange={(e) => setInputs({ ...inputs, monthlyDebts: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
                placeholder="600"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Car loans, student loans, credit cards, child support
            </p>
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Down payment
              </label>
              <span className="text-lg font-bold text-blue-600">{formatUSD(inputs.downPayment)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={inputs.downPayment}
              onChange={(e) => setInputs({ ...inputs, downPayment: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">$0</span>
              <span className="text-xs text-gray-500">$100k</span>
              <span className="text-xs text-gray-500">$200k+</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Interest rate
              </label>
              <span className="text-lg font-bold text-blue-600">{inputs.interestRate}%</span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="0.125"
              value={inputs.interestRate}
              onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Loan Term */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Loan term
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((years) => (
                <button
                  key={years}
                  onClick={() => setInputs({ ...inputs, loanTermYears: years })}
                  className={`py-4 text-sm font-semibold rounded-xl transition-all
                    ${inputs.loanTermYears === years
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {years} years
                </button>
              ))}
            </div>
          </div>

          {/* Property Tax */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Property tax rate
              </label>
              <span className="text-lg font-bold text-blue-600">{inputs.propertyTaxRate}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={inputs.propertyTaxRate}
              onChange={(e) => setInputs({ ...inputs, propertyTaxRate: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Low (0.5%)</span>
              <span className="text-xs text-gray-500">Avg (1.1%)</span>
              <span className="text-xs text-gray-500">High (2.5%)</span>
            </div>
          </div>

          {/* Home Insurance */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly home insurance
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={inputs.homeInsurance}
                onChange={(e) => setInputs({ ...inputs, homeInsurance: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl"
                placeholder="150"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-indigo-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Calculate your budget
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Hero Result */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 shadow-lg">
              <p className="text-indigo-100 text-sm font-medium uppercase tracking-wide">
                Maximum home price
              </p>
              <p className="text-4xl font-bold text-white mt-1">
                {formatUSD(result.maxHomePrice)}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  Loan: {formatUSD(result.maxLoanAmount)}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  Down: {formatUSD(inputs.downPayment)}
                </span>
              </div>
            </div>

            {/* Monthly Payment Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Monthly payment</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Principal & interest</span>
                  <span className="font-semibold text-gray-900">{formatUSD(result.monthlyPrincipalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property taxes</span>
                  <span className="font-semibold text-gray-900">{formatUSD(result.monthlyTaxes)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Home insurance</span>
                  <span className="font-semibold text-gray-900">{formatUSD(result.monthlyInsurance)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-medium text-gray-900">Total monthly</span>
                  <span className="font-bold text-indigo-600">{formatUSD(result.totalMonthlyPayment)}</span>
                </div>
              </div>
            </div>

            {/* DTI Analysis */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Debt-to-income ratio</h3>
                <Percent className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">Your DTI</span>
                <span className={`text-xl font-bold ${
                  result.dti <= 36 ? 'text-green-600' : 
                  result.dti <= 43 ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {result.dti}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    result.dti <= 36 ? 'bg-green-600' : 
                    result.dti <= 43 ? 'bg-yellow-600' : 
                    'bg-red-600'
                  }`}
                  style={{ width: `${Math.min(result.dti, 50)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Qualified Mortgage Limit: 43%</span>
                <span>Your DTI: {result.dti}%</span>
              </div>
            </div>

            {/* Related Tools */}
            <RelatedTools 
              current="affordability"
              tools={[
                { name: 'Mortgage Prepayment', href: '/mortgage', description: 'Save interest & pay off early' },
                { name: 'Rent vs Buy', href: '/rent-vs-buy', description: 'Should you rent or buy?' },
                { name: 'DCA Investing', href: '/dca', description: 'Save for down payment' }
              ]}
            />
          </div>
        )}

        {/* FAQ */}
        <FAQ 
          items={[
            {
              question: 'How much house can I afford with $120k salary?',
              answer: 'With $120k annual income, $0 debt, and $60k down payment, you can typically afford a $380k-$450k home depending on interest rates and property taxes.'
            },
            {
              question: 'What is the 28/36 rule?',
              answer: 'Lenders prefer housing costs under 28% of income and total debts under 36%. Our calculator uses the qualified mortgage limit of 43%.'
            },
            {
              question: 'Should I put 20% down?',
              answer: '20% down avoids PMI, but many first-time buyers put 3-5% down. Use this calculator to compare scenarios.'
            }
          ]}
        />
      </div>
    </div>
  );
}
