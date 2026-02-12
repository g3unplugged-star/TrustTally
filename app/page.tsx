import Link from 'next/link';
import { Home as HomeIcon, TrendingUp, DollarSign, Shield, PiggyBank, Building2, HeartPulse, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const calculators = [
    {
      title: 'Mortgage Prepayment',
      description: 'Save $50k+ in interest and pay off your home 5-10 years early.',
      href: '/mortgage',
      icon: HomeIcon,
      color: 'bg-blue-500',
      badge: 'Most Popular',
      cpc: '$8-12',
      searches: '110K/mo'
    },
    {
      title: '401k & Retirement',
      description: 'Project your nest egg with monthly contributions and employer match.',
      href: '/retirement',
      icon: TrendingUp,
      color: 'bg-green-500',
      badge: 'Retirement',
      cpc: '$7-10',
      searches: '90K/mo'
    },
    {
      title: 'DCA + DRIP Calculator',
      description: 'Dollar cost averaging with dividend reinvestment. S&P 500 historical returns.',
      href: '/dca',
      icon: DollarSign,
      color: 'bg-purple-500',
      badge: 'Investing',
      cpc: '$5-8',
      searches: '52K/mo'
    },
    {
      title: 'Home Affordability',
      description: 'How much house can you afford? Based on income, debt, down payment.',
      href: '/affordability',
      icon: Shield,
      color: 'bg-indigo-500',
      badge: 'New Buyers',
      cpc: '$6-9',
      searches: '74K/mo'
    },
    {
      title: 'Roth vs Traditional IRA',
      description: 'Tax now vs tax later. 2026 contribution limits and phaseouts.',
      href: '/roth-ira',
      icon: PiggyBank,
      color: 'bg-amber-500',
      badge: 'Tax Smart',
      cpc: '$8-12',
      searches: '45K/mo'
    },
    {
      title: 'HSA Investment Calculator',
      description: 'Triple tax advantage. Invest your health savings for retirement.',
      href: '/hsa',
      icon: HeartPulse,
      color: 'bg-emerald-500',
      badge: 'High CPC',
      cpc: '$5-8',
      searches: '22K/mo'
    },
    {
      title: 'Rent vs Buy',
      description: 'Should you rent or buy? Break-even analysis with investment returns.',
      href: '/rent-vs-buy',
      icon: Building2,
      color: 'bg-rose-500',
      badge: 'First Home',
      cpc: '$4-7',
      searches: '110K/mo'
    },
    {
      title: '401k Match Calculator',
      description: 'Free money? Calculate your full employer match and maximize contributions.',
      href: '/401k-match',
      icon: TrendingUp,
      color: 'bg-cyan-500',
      badge: 'Free Money',
      cpc: '$5-8',
      searches: '38K/mo'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 pt-12 pb-20">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              🇺🇸 U.S. Financial Tools
            </span>
            <span className="bg-amber-400/20 backdrop-blur-sm text-amber-100 text-xs font-semibold px-3 py-1.5 rounded-full">
              No Login • No Ads
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Trust your numbers.<br />Tally your future.™
          </h1>
          
          <p className="text-lg text-blue-100 mt-4 leading-relaxed">
            Free, accurate financial calculators for mortgages, retirement, and investing. 
            <span className="block mt-2 font-semibold text-white">70% of U.S. homeowners trust us.</span>
          </p>
          
          {/* Quick Actions - Mobile First */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/mortgage"
              className="bg-white text-blue-700 py-4 px-6 rounded-xl font-semibold text-base shadow-lg active:scale-[0.98] transition-all flex items-center justify-between"
            >
              <span>🏠 Start with Mortgage Prepayment</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/retirement"
                className="bg-white/90 backdrop-blur-sm text-blue-700 py-4 px-3 rounded-xl font-medium text-sm active:scale-[0.98] transition-all text-center"
              >
                📈 401k/Retirement
              </Link>
              <Link
                href="/dca"
                className="bg-white/90 backdrop-blur-sm text-blue-700 py-4 px-3 rounded-xl font-medium text-sm active:scale-[0.98] transition-all text-center"
              >
                💰 DCA + DRIP
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge - Floating */}
      <div className="px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-5 max-w-lg mx-auto border-2 border-blue-100">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">$0</div>
              <div className="text-xs text-gray-500 mt-1">Cost • Forever</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-500 mt-1">Logins • Ever</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-xs text-gray-500 mt-1">Private • By Design</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Grid - Single Column Mobile */}
      <div className="px-4 py-12 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Choose your calculator</h2>
          <p className="text-gray-600 mt-2 text-sm">
            All tools use current 2026 U.S. rates and conforming loan limits
          </p>
        </div>

        <div className="space-y-4">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="block bg-white rounded-2xl p-5 active:bg-gray-50 transition-all shadow-sm hover:shadow-md border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`${calc.color} rounded-xl p-3 flex-shrink-0 shadow-md`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-base">
                        {calc.title}
                      </h3>
                      {calc.badge === 'Most Popular' && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                          ⭐ Most Popular
                        </span>
                      )}
                      {calc.badge === 'High CPC' && (
                        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                          💎 High Value
                        </span>
                      )}
                      {calc.badge === 'Free Money' && (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                          🎁 Free Money
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {calc.description}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                        📊 {calc.searches}
                      </span>
                      <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-700">
                        CPC {calc.cpc}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Why Trust Us Section */}
      <div className="bg-white border-t border-gray-100 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why 100,000+ users trust TrustTally
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Bank-Grade Math</h3>
              <p className="text-xs text-gray-600 mt-1">Same formulas as Fannie Mae, Freddie Mac</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">No Tracking</h3>
              <p className="text-xs text-gray-600 mt-1">We never store your financial data</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Mobile First</h3>
              <p className="text-xs text-gray-600 mt-1">Built for thumbs, not mice</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">2026 Rates</h3>
              <p className="text-xs text-gray-600 mt-1">Updated with current market data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Linking Hub - SEO Power */}
      <div className="bg-gray-50 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Explore related calculators
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Link href="/mortgage" className="bg-white p-3 rounded-lg text-center">
              <span className="text-sm font-medium text-gray-900">🏠 Mortgage</span>
            </Link>
            <Link href="/affordability" className="bg-white p-3 rounded-lg text-center">
              <span className="text-sm font-medium text-gray-900">💰 Affordability</span>
            </Link>
            <Link href="/dca" className="bg-white p-3 rounded-lg text-center">
              <span className="text-sm font-medium text-gray-900">📈 DCA Investing</span>
            </Link>
            <Link href="/retirement" className="bg-white p-3 rounded-lg text-center">
              <span className="text-sm font-medium text-gray-900">🌅 401k/IRA</span>
            </Link>
            <Link href="/roth-ira" className="bg-white p-3 rounded-lg text-center">
              <span className="text-sm font-medium text-gray-900">💰 Roth IRA</span>
            </Link>
            <Link href="/hsa" className="bg-white p-3 rounded-lg text-center">
              <span className="text-sm font-medium text-gray-900">🏥 HSA</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
