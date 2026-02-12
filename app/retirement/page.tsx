'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, PieChart, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { formatUSD } from '@/lib/utils/formatters';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import RelatedTools from '@/components/seo/RelatedTools';
import FAQ from '@/components/ui/FAQ';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [employerMatch, setEmployerMatch] = useState(50); // % of contribution matched
  const [matchLimit, setMatchLimit] = useState(6); // % of salary matched
  const [salary, setSalary] = useState(80000);
  const [dividendYield, setDividendYield] = useState(1.5);
  const [showDetails, setShowDetails] = useState(false);
  const [result, setResult] = useState<null | {
    finalBalance: number;
    totalContributions: number;
    totalEarnings: number;
    employerMatchTotal: number;
    dividendIncome: number;
    afterTaxValue: number;
    yearlyData: any[];
  }>(null);

  const calculateRetirement = () => {
    const years = retirementAge - currentAge;
    const months = years * 12;
    const monthlyRate = annualReturn / 100 / 12;
    const dividendRate = dividendYield / 100 / 12;
    
    let balance = currentBalance;
    let totalContributions = currentBalance;
    let totalEmployerMatch = 0;
    let totalDividends = 0;
    
    // Calculate monthly contribution with employer match
    const employeeContribution = monthlyContribution;
    const maxMatchAmount = (salary / 12) * (matchLimit / 100);
    const matchContribution = Math.min(employeeContribution, maxMatchAmount) * (employerMatch / 100);
    const totalMonthlyContribution = employeeContribution + matchContribution;

    for (let month = 0; month < months; month++) {
      // Add monthly contributions
      balance += totalMonthlyContribution;
      totalContributions += employeeContribution;
      totalEmployerMatch += matchContribution;
      
      // Apply market return
      const monthlyReturn = balance * monthlyRate;
      balance += monthlyReturn;
      
      // Apply dividend reinvestment
      const monthlyDividend = balance * dividendRate;
      balance += monthlyDividend;
      totalDividends += monthlyDividend;
    }

    const totalEarnings = balance - totalContributions - totalEmployerMatch;
    const afterTaxValue = balance - (totalEarnings * 0.15); // 15% cap gains

    setResult({
      finalBalance: Math.round(balance),
      totalContributions: Math.round(totalContributions),
      totalEarnings: Math.round(totalEarnings),
      employerMatchTotal: Math.round(totalEmployerMatch),
      dividendIncome: Math.round(totalDividends),
      afterTaxValue: Math.round(afterTaxValue),
      yearlyData: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: '401k & Retirement' }
      ]} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">401k & Retirement</h1>
            <p className="text-sm text-gray-600">DCA + employer match + dividend reinvestment</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="font-semibold text-gray-900">Your retirement profile</h2>
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
                min="18"
                max="80"
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
                min="50"
                max="95"
              />
            </div>
          </div>

          {/* Current Balance */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current 401k/IRA balance
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

          {/* Monthly Contribution */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Your monthly contribution
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
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">$0</span>
              <span className="text-xs text-gray-500">$1,000</span>
              <span className="text-xs text-gray-500">$2,000+</span>
            </div>
          </div>

          {/* Salary for Match */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual salary (for employer match)
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

          {/* Employer Match */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎁</span>
              <span className="font-medium text-green-800">Employer match (free money)</span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-green-700">Match percentage</label>
                <span className="text-sm font-bold text-green-700">{employerMatch}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={employerMatch}
                onChange={(e) => setEmployerMatch(Number(e.target.value))}
                className="w-full accent-green-600"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-green-600">0%</span>
                <span className="text-xs text-green-600">50%</span>
                <span className="text-xs text-green-600">100%</span>
              </div>
              <p className="text-xs text-green-700 mt-2">
                Common: 50% match up to 6% of salary
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
            </div>
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
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Conservative (4%)</span>
              <span className="text-xs text-gray-500">Balanced (7%)</span>
              <span className="text-xs text-gray-500">Aggressive (10%)</span>
            </div>
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
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">S&P 500: 1.5%</span>
              <span className="text-xs text-gray-500">SCHD: 3.5%</span>
              <span className="text-xs text-gray-500">JEPI: 7%+</span>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateRetirement}
            className="w-full bg-green-600 text-white py-5 px-4 rounded-xl font-bold text-base shadow-lg hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            Calculate your future nest egg
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Hero Result */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 shadow-lg">
              <p className="text-green-100 text-sm font-medium uppercase tracking-wide">
                Projected retirement balance
              </p>
              <p className="text-4xl font-bold text-white mt-1">
                {formatUSD(result.finalBalance)}
              </p>
              <p className="text-green-100 text-sm mt-2">
                at age {retirementAge} • {retirementAge - currentAge} years of investing
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
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Employer match</p>
                    <p className="text-xl font-bold text-amber-600">{formatUSD(result.employerMatchTotal)}</p>
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

            {/* After-Tax Value */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">After-tax value (15% cap gains)</span>
                <span className="text-xl font-bold text-gray-900">{formatUSD(result.afterTaxValue)}</span>
              </div>
            </div>

            {/* Related Tools */}
            <RelatedTools 
              current="retirement"
              tools={[
                { name: 'DCA Calculator', href: '/dca', description: 'Monthly investment with DRIP' },
                { name: 'Roth vs Traditional IRA', href: '/roth-ira', description: 'Which is better for you?' },
                { name: '401k Match', href: '/401k-match', description: 'Maximize employer match' }
              ]}
            />
          </div>
        )}

        {/* FAQ */}
        <FAQ 
          items={[
            {
              question: 'What is the average 401k return?',
              answer: 'The S&P 500 has historically returned 7-10% annually. We use 7% as a conservative estimate for long-term retirement planning.'
            },
            {
              question: 'How much should I contribute to my 401k?',
              answer: 'At minimum, contribute enough to get your full employer match. That\'s free money. Beyond that, aim for 10-15% of your income including the match.'
            },
            {
              question: 'What is dividend reinvestment (DRIP)?',
              answer: 'DRIP automatically uses dividend payments to buy more shares. This compounds your returns and significantly increases long-term growth.'
            }
          ]}
        />
      </div>
    </div>
  );
}
