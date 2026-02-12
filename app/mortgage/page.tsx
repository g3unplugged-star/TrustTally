'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Home, 
  DollarSign, 
  Calendar, 
  TrendingDown, 
  Clock, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Target,
  Shield,
  PieChart,
  Download
} from 'lucide-react';
import { calculateMortgage, MortgageInput, MortgageResult } from '@/lib/calculators/mortgage';
import { formatUSD, formatYearsMonths } from '@/lib/utils/formatters';

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState<MortgageInput>({
    loanAmount: 400000,
    interestRate: 6.5,
    loanTermYears: 30,
    monthlyPrepayment: 200
  });

  const [result, setResult] = useState<MortgageResult | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const handleCalculate = () => {
    const calcResult = calculateMortgage(inputs);
    setResult(calcResult);
  };

  const presetLoans = [
    { label: '🏠 Median US Home', amount: 400000, rate: 6.5, term: 30 },
    { label: '🏢 First-time Buyer', amount: 300000, rate: 6.25, term: 30 },
    { label: '💰 Jumbo Loan', amount: 750000, rate: 6.75, term: 30 },
    { label: '⚡ 15-Year', amount: 350000, rate: 5.875, term: 15 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Navigation */}
      <div className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="p-2 hover:bg-neutral-100 rounded-xl transition-all group"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-600 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-2">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-neutral-900">Mortgage Prepayment</h1>
                    <p className="text-sm text-neutral-600">See how extra payments save thousands</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="premium-badge">
                <Sparkles className="h-3 w-3 mr-1" />
                Updated 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Inputs */}
          <div className="space-y-6 animate-slide-in">
            {/* Preset Loans */}
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-neutral-900">Quick start</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presetLoans.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setInputs({
                      loanAmount: preset.amount,
                      interestRate: preset.rate,
                      loanTermYears: preset.term,
                      monthlyPrepayment: inputs.monthlyPrepayment
                    })}
                    className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl text-left transition-all hover:scale-[0.98]"
                  >
                    <div className="text-sm font-medium text-neutral-900">{preset.label}</div>
                    <div className="text-xs text-neutral-600 mt-1">
                      {formatUSD(preset.amount)} • {preset.rate}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Calculator */}
            <div className="premium-card">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-1.5">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-semibold text-neutral-900">Loan details</h2>
              </div>
              
              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Loan amount
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      {formatUSD(inputs.loanAmount)}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-lg">$</span>
                    <input
                      type="number"
                      value={inputs.loanAmount}
                      onChange={(e) => setInputs({ ...inputs, loanAmount: Number(e.target.value) })}
                      className="premium-input pl-10"
                      placeholder="400,000"
                    />
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="1000000"
                    step="5000"
                    value={inputs.loanAmount}
                    onChange={(e) => setInputs({ ...inputs, loanAmount: Number(e.target.value) })}
                    className="premium-slider mt-4"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-neutral-500">$100k</span>
                    <span className="text-xs text-neutral-500">$500k</span>
                    <span className="text-xs text-neutral-500">$1M+</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Interest rate
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      {inputs.interestRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.125"
                    value={inputs.interestRate}
                    onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                    className="premium-slider"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-neutral-500">2.0%</span>
                    <span className="text-xs text-neutral-500">6.0%</span>
                    <span className="text-xs text-neutral-500">10.0%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Loan term
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[15, 20, 30].map((years) => (
                      <button
                        key={years}
                        onClick={() => setInputs({ ...inputs, loanTermYears: years })}
                        className={`py-4 text-sm font-semibold rounded-xl transition-all
                          ${inputs.loanTermYears === years
                            ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-lg'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                      >
                        {years} years
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prepayment */}
                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-lg p-1">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                    </div>
                    <label className="text-sm font-medium text-neutral-700">
                      Monthly prepayment
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-neutral-600">Extra payment</span>
                    <span className="text-2xl font-bold text-green-600">
                      +{formatUSD(inputs.monthlyPrepayment)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={inputs.monthlyPrepayment}
                    onChange={(e) => setInputs({ ...inputs, monthlyPrepayment: Number(e.target.value) })}
                    className="premium-slider accent-green-600"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-neutral-500">$0</span>
                    <span className="text-xs text-neutral-500">$500</span>
                    <span className="text-xs text-neutral-500">$1,000+</span>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  className="premium-button w-full text-lg py-5 mt-4 group"
                >
                  <span>Calculate your savings</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Educational Tips */}
            {showTips && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Pro tip</h3>
                      <p className="text-sm text-blue-800 mt-2 leading-relaxed">
                        Adding just {formatUSD(inputs.monthlyPrepayment)} to your monthly payment 
                        can save you tens of thousands in interest and shave years off your loan.
                      </p>
                      <p className="text-xs text-blue-700 mt-3">
                        💡 Even $100 extra monthly makes a significant difference over 30 years.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTips(false)}
                    className="p-1 hover:bg-blue-200/50 rounded-lg transition-colors"
                  >
                    <ChevronUp className="h-4 w-4 text-blue-600" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6 animate-fade-in">
            {result ? (
              <>
                {/* Hero Result */}
                <div className="result-card">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-yellow-300" />
                      <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                        Your total savings
                      </span>
                    </div>
                    <div className="result-value text-white mb-2">
                      {formatUSD(result.interestSaved)}
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-white/80" />
                        <span className="text-white/90 text-sm">
                          Paid off by {result.payoffDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-white/80" />
                        <span className="text-white/90 text-sm">
                          {formatYearsMonths(result.monthsToPayoff)} total
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl p-2">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="stat-label">Monthly payment</div>
                        <div className="stat-number">{formatUSD(result.monthlyPayment)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Principal & interest only
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl p-2">
                        <TrendingDown className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="stat-label">Total interest</div>
                        <div className="stat-number">{formatUSD(result.totalInterest)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Over full loan term
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl p-2">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="stat-label">Years saved</div>
                        <div className="stat-number">
                          {Math.round((inputs.loanTermYears * 12 - result.monthsToPayoff) / 12)} yrs
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {inputs.loanTermYears} year → {Math.floor(result.monthsToPayoff / 12)} years
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl p-2">
                        <Target className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="stat-label">Monthly + extra</div>
                        <div className="stat-number">
                          {formatUSD(result.monthlyPayment + inputs.monthlyPrepayment)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Including ${inputs.monthlyPrepayment} prepayment
                    </div>
                  </div>
                </div>

                {/* Amortization Schedule */}
                <div className="premium-card">
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <PieChart className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-neutral-900">
                        Amortization schedule
                      </span>
                    </div>
                    {showAmortization ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500" />
                    )}
                  </button>
                  
                  {showAmortization && (
                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-4 text-xs font-medium text-neutral-500 pb-2 border-b">
                        <div>Year</div>
                        <div>Payment</div>
                        <div>Principal</div>
                        <div>Interest</div>
                      </div>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {result.amortizationSchedule.slice(0, 12).map((row, i) => (
                          <div key={i} className="grid grid-cols-4 text-sm">
                            <div className="text-neutral-900">{row.month}</div>
                            <div className="text-neutral-900">{formatUSD(row.payment)}</div>
                            <div className="text-green-600">{formatUSD(row.principal)}</div>
                            <div className="text-amber-600">{formatUSD(row.interest)}</div>
                          </div>
                        ))}
                      </div>
                      <button className="text-primary text-sm font-medium flex items-center gap-2 mt-2 hover:gap-3 transition-all">
                        <Download className="h-4 w-4" />
                        Download full schedule
                      </button>
                    </div>
                  )}
                </div>

                {/* Comparison Tool */}
                <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Compare scenarios
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-white rounded-xl border-2 border-primary/20 hover:border-primary transition-all text-left group">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-neutral-900">No prepayment</span>
                          <p className="text-xs text-neutral-600 mt-1">
                            Pay off in {inputs.loanTermYears} years • {formatUSD(result.totalInterest + result.interestSaved)} interest
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                    <button className="w-full p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border-2 border-primary/30 text-left group">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-primary">Current prepayment</span>
                          <p className="text-xs text-neutral-700 mt-1">
                            Save {formatUSD(result.interestSaved)} • {Math.floor((inputs.loanTermYears * 12 - result.monthsToPayoff) / 12)} years early
                          </p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Empty State
              <div className="premium-card h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl p-5 mb-6">
                  <Home className="h-10 w-10 text-neutral-500" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Ready to see your savings?
                </h3>
                <p className="text-neutral-600 mb-6 max-w-md">
                  Enter your loan details and we'll show you exactly how much you can save with extra payments.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Average user saves $54,321</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
