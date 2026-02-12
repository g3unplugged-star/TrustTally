import Link from 'next/link';
import { ArrowLeft, BookOpen, Home, TrendingUp, DollarSign, Shield, PiggyBank, HeartPulse, Building2, Gift, BarChart3 } from 'lucide-react';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export default function GlossaryPage() {
  const terms = [
    {
      term: 'Mortgage Prepayment',
      definition: 'Paying extra toward your mortgage principal to reduce total interest and shorten loan term.',
      category: 'Mortgage',
      icon: Home,
      color: 'bg-blue-500',
      link: '/mortgage',
      searches: '110K/mo'
    },
    {
      term: 'Dollar Cost Averaging (DCA)',
      definition: 'Investing a fixed amount regularly regardless of market conditions to reduce volatility impact.',
      category: 'Investing',
      icon: DollarSign,
      color: 'bg-green-500',
      link: '/dca',
      searches: '52K/mo'
    },
    {
      term: 'DRIP (Dividend Reinvestment)',
      definition: 'Automatically using dividend payments to buy more shares, compounding returns over time.',
      category: 'Investing',
      icon: TrendingUp,
      color: 'bg-purple-500',
      link: '/dca',
      searches: '41K/mo'
    },
    {
      term: 'Debt-to-Income Ratio (DTI)',
      definition: 'Monthly debt payments divided by gross monthly income. Lenders use this to qualify mortgages.',
      category: 'Mortgage',
      icon: Shield,
      color: 'bg-indigo-500',
      link: '/affordability',
      searches: '74K/mo'
    },
    {
      term: 'Roth IRA',
      definition: 'After-tax retirement account with tax-free withdrawals. Contributions can be withdrawn anytime.',
      category: 'Retirement',
      icon: PiggyBank,
      color: 'bg-amber-500',
      link: '/roth-ira',
      searches: '45K/mo'
    },
    {
      term: 'Traditional IRA',
      definition: 'Pre-tax retirement account with tax-deductible contributions. Withdrawals taxed as income.',
      category: 'Retirement',
      icon: PiggyBank,
      color: 'bg-amber-500',
      link: '/roth-ira',
      searches: '45K/mo'
    },
    {
      term: 'Health Savings Account (HSA)',
      definition: 'Triple tax-advantaged account for medical expenses. Only available with HDHP.',
      category: 'Investing',
      icon: HeartPulse,
      color: 'bg-emerald-500',
      link: '/hsa',
      searches: '22K/mo'
    },
    {
      term: '401(k) Employer Match',
      definition: 'Free money from your employer when you contribute to your 401k. Common: 50% match up to 6%.',
      category: 'Retirement',
      icon: Gift,
      color: 'bg-green-500',
      link: '/401k-match',
      searches: '38K/mo'
    },
    {
      term: 'Compound Interest',
      definition: 'Interest earned on both principal and previously accumulated interest. "Interest on interest."',
      category: 'Investing',
      icon: BarChart3,
      color: 'bg-blue-500',
      link: '/compound',
      searches: '90K/mo'
    },
    {
      term: 'Amortization',
      definition: 'The process of paying down a loan with equal monthly payments. Early payments go mostly to interest.',
      category: 'Mortgage',
      icon: Home,
      color: 'bg-blue-500',
      link: '/mortgage',
      searches: '110K/mo'
    },
    {
      term: 'Private Mortgage Insurance (PMI)',
      definition: 'Insurance required when down payment is less than 20%. Protects lender, not borrower.',
      category: 'Mortgage',
      icon: Shield,
      color: 'bg-indigo-500',
      link: '/affordability',
      searches: '74K/mo'
    },
    {
      term: 'Qualified Mortgage (QM)',
      definition: 'Loans that meet federal standards, including 43% DTI limit. Offers strong consumer protections.',
      category: 'Mortgage',
      icon: Shield,
      color: 'bg-indigo-500',
      link: '/affordability',
      searches: '22K/mo'
    },
    {
      term: 'S&P 500',
      definition: 'Stock market index of 500 largest U.S. companies. Historical average return: 7-10% annually.',
      category: 'Investing',
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/dca',
      searches: '200K/mo'
    },
    {
      term: 'Capital Gains Tax',
      definition: 'Tax on investment profits. Long-term (held >1 year) rates: 0%, 15%, or 20% based on income.',
      category: 'Tax',
      icon: DollarSign,
      color: 'bg-gray-500',
      link: '/roth-ira',
      searches: '65K/mo'
    },
    {
      term: 'Rent vs Buy Analysis',
      definition: 'Comparison of net worth outcomes between renting + investing vs buying + building equity.',
      category: 'Real Estate',
      icon: Building2,
      color: 'bg-purple-500',
      link: '/rent-vs-buy',
      searches: '110K/mo'
    }
  ];

  const categories = [...new Set(terms.map(t => t.category))];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Financial Glossary' }
      ]} />

      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Financial Glossary</h1>
            <p className="text-sm text-gray-600">Understand your money. Better decisions start here.</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg mb-8">
          <BookOpen className="h-8 w-8 text-white/90 mb-3" />
          <h2 className="text-xl font-bold text-white">Learn the language of finance</h2>
          <p className="text-blue-100 text-sm mt-2">
            Clear, accurate definitions. No jargon. Every term links to our free calculators.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="bg-white px-4 py-3 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Terms by Category */}
        {categories.map((category) => (
          <div key={category} id={category} className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              {category}
            </h2>
            
            <div className="space-y-4">
              {terms
                .filter(term => term.category === category)
                .map((term, index) => {
                  const Icon = term.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className={`${term.color} rounded-lg p-2 flex-shrink-0`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">{term.term}</h3>
                            {term.link && (
                              <Link 
                                href={term.link}
                                className="text-xs text-blue-600 font-medium hover:text-blue-800"
                              >
                                Calculate →
                              </Link>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {term.definition}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                              📊 {term.searches}
                            </span>
                            <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">
                              {category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* SEO Internal Linking Hub */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
          <h3 className="font-bold text-gray-900 mb-4">Popular calculator tools</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/mortgage" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-all">
              <Home className="h-5 w-5 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Mortgage</span>
            </Link>
            <Link href="/retirement" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-all">
              <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">401k</span>
            </Link>
            <Link href="/dca" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-all">
              <DollarSign className="h-5 w-5 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">DCA</span>
            </Link>
            <Link href="/affordability" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-all">
              <Shield className="h-5 w-5 text-indigo-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Afford</span>
            </Link>
            <Link href="/roth-ira" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-all">
              <PiggyBank className="h-5 w-5 text-amber-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Roth IRA</span>
            </Link>
            <Link href="/hsa" className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-all">
              <HeartPulse className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">HSA</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
