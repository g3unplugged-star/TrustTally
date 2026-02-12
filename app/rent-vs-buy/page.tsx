'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, Home, TrendingUp, DollarSign, Scale } from 'lucide-react';
import { formatUSD } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(1.1);
  const [homeInsurance, setHomeInsurance] = useState(150);
  const [maintenance, setMaintenance] = useState(1);
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [rentIncrease, setRentIncrease] = useState(3);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [years, setYears] = useState(7);
  const [result, setResult] = useState<null | {
    buyNetWorth: number;
    rentNetWorth: number;
    buyMonthly: number;
    rentMonthly: number;
    betterOption: 'Buy' | 'Rent';
    breakEvenYear: number;
    difference: number;
  }>(null);

  const calculateRentVsBuy = () => {
    // BUY scenario
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    
    // Monthly mortgage payment
    const mortgagePayment = loanAmount > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;
    
    const monthlyTax = homePrice * (propertyTax / 100 / 12);
    const monthlyMaintenance = homePrice * (maintenance / 100 / 12);
    const buyMonthlyPayment = mortgagePayment + monthlyTax + homeInsurance + monthlyMaintenance;
    
    // Home equity after N years
    let remainingBalance = loanAmount;
    for (let i = 0; i < years * 12; i++) {
      const interest = remainingBalance * monthlyRate;
      const principal = mortgagePayment - interest;
      remainingBalance -= principal;
      if (remainingBalance < 0) remainingBalance = 0;
    }
    
    const homeEquity = homePrice - remainingBalance;
    const homeAppreciation = homePrice * Math.pow(1 + 0.03, years) - homePrice; // 3% annual appreciation
    const buyNetWorth = downPayment + homeEquity + homeAppreciation;
    
    // RENT scenario
    let rentCost = 0;
    let investedAmount = downPayment;
    
    for (let year = 0; year < years; year++) {
      // Annual rent cost
      const yearlyRent = monthlyRent * 12 * Math.pow(1 + rentIncrease / 100, year);
      rentCost += yearlyRent;
      
      // Invest down payment and savings
      investedAmount *= (1 + investmentReturn / 100);
    }
    
    // Monthly savings from renting (difference between buy and rent)
    const monthlySavings = Math.max(0, buyMonthlyPayment - monthlyRent);
    let investedSavings = 0;
    for (let i = 0; i < years * 12; i++) {
      investedSavings += monthlySavings;
      investedSavings *= (1 + investmentReturn / 100 / 12);
    }
    
    const rentNetWorth = investedAmount + investedSavings;
    
    setResult({
      buyNetWorth: Math.round(buyNetWorth),
      rentNetWorth: Math.round(rentNetWorth),
      buyMonthly: Math.round(buyMonthlyPayment),
      rentMonthly: monthlyRent,
      betterOption: buyNetWorth > rentNetWorth ? 'Buy' : 'Rent',
      breakEvenYear: 5, // Simplified
      difference: Math.round(Math.abs(buyNetWorth - rentNetWorth))
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Rent vs Buy' }
      ]} />

      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Rent vs Buy</h1>
            <p className="text-sm text-gray-600">Should you rent or buy your next home?</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Buy Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Buy scenario</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down payment
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
                  step="0.125"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan term
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              >
                <option value={15}>15 years</option>
                <option value={20}>20 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rent Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Rent scenario</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly rent
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual rent increase
            </label>
            <div className="relative">
              <input
                type="number"
                value={rentIncrease}
                onChange={(e) => setRentIncrease(Number(e.target.value))}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
        </div>

        {/* Investment Assumptions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Investment assumptions</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment return (S&P 500)
            </label>
            <div className="relative">
              <input
                type="number"
                value={investmentReturn}
                onChange={(e) => setInvestmentReturn(Number(e.target.value))}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time horizon (years)
            </label>
            <div className="relative">
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">years</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Average U.S. homeowner stays 7 years
            </p>
          </div>

          <button
            onClick={calculateRentVsBuy}
            className="w-full bg-purple-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-purple-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Scale className="h-5 w-5" />
            Compare rent vs buy
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <div className={`rounded-2xl p-6 shadow-lg ${
              result.betterOption === 'Buy' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>
              <p className="text-white/90 text-sm font-medium uppercase tracking-wide">
                🏆 Better financial decision
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                {result.betterOption}
              </p>
              <p className="text-white/90 text-sm mt-2">
                You save {formatUSD(result.difference)} over {years} years
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Buy net worth</p>
                <p className="text-xl font-bold text-blue-600">{formatUSD(result.buyNetWorth)}</p>
                <p className="text-xs text-gray-500 mt-1">{formatUSD(result.buyMonthly)}/mo</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Rent net worth</p>
                <p className="text-xl font-bold text-purple-600">{formatUSD(result.rentNetWorth)}</p>
                <p className="text-xs text-gray-500 mt-1">{formatUSD(result.rentMonthly)}/mo</p>
              </div>
            </div>

            <RelatedTools 
              current="rent-vs-buy"
              tools={[
                { name: 'Home Affordability', href: '/affordability', description: 'How much house can you afford?' },
                { name: 'Mortgage Prepayment', href: '/mortgage', description: 'Pay off your home faster' },
                { name: 'DCA Investing', href: '/dca', description: 'Invest your down payment' }
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
