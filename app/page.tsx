import Link from 'next/link';
import { 
  Home, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  PiggyBank, 
  HeartPulse, 
  Building2, 
  Gift, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Target,
  Clock,
  Award
} from 'lucide-react';

export default function HomePage() {
  const calculators = [
    {
      title: 'Mortgage Prepayment',
      description: 'Save $50k+ in interest and pay off your home 5-10 years early.',
      href: '/mortgage',
      icon: Home,
      gradient: 'from-blue-600 to-indigo-600',
      badge: '⭐ Most Popular',
      savings: '$54,321 avg savings',
      time: '6.2 years early',
      color: 'blue'
    },
    {
      title: '401k & Retirement',
      description: 'Project your nest egg with monthly contributions and employer match.',
      href: '/retirement',
      icon: TrendingUp,
      gradient: 'from-green-600 to-emerald-600',
      badge: '📈 401(k)',
      savings: '$1.2M at 65',
      time: '30 year projection',
      color: 'green'
    },
    {
      title: 'DCA + DRIP',
      description: 'Dollar cost averaging with dividend reinvestment. S&P 500 historical returns.',
      href: '/dca',
      icon: DollarSign,
      gradient: 'from-purple-600 to-pink-600',
      badge: '💰 Smart Investing',
      savings: '$567k after 30y',
      time: '7% avg return',
      color: 'purple'
    },
    {
      title: 'Home Affordability',
      description: 'How much house can you afford? Based on income, debt, down payment.',
      href: '/affordability',
      icon: Shield,
      gradient: 'from-indigo-600 to-blue-600',
      badge: '🏡 First Time Buyer',
      savings: '$450k max price',
      time: '43% DTI limit',
      color: 'indigo'
    },
    {
      title: 'Roth vs Traditional',
      description: 'Tax now vs tax later. 2026 contribution limits and phaseouts.',
      href: '/roth-ira',
      icon: PiggyBank,
      gradient: 'from-amber-600 to-orange-600',
      badge: '🎯 Tax Smart',
      savings: '$87k tax savings',
      time: 'Compare side-by-side',
      color: 'amber'
    },
    {
      title: 'HSA Investment',
      description: 'Triple tax advantage. Invest your health savings for retirement.',
      href: '/hsa',
      icon: HeartPulse,
      gradient: 'from-emerald-600 to-teal-600',
      badge: '🏆 Best Kept Secret',
      savings: 'Triple tax-free',
      time: 'Better than 401k',
      color: 'emerald'
    },
    {
      title: 'Rent vs Buy',
      description: 'Should you rent or buy? Break-even analysis with investment returns.',
      href: '/rent-vs-buy',
      icon: Building2,
      gradient: 'from-rose-600 to-pink-600',
      badge: '🏠 Major Decision',
      savings: '7 year break-even',
      time: 'Compare scenarios',
      color: 'rose'
    },
    {
      title: '401k Match',
      description: 'Free money? Calculate your full employer match and maximize contributions.',
      href: '/401k-match',
      icon: Gift,
      gradient: 'from-cyan-600 to-blue-600',
      badge: '🎁 Free Money',
      savings: '$5,400/year',
      time: '100% instant return',
      color: 'cyan'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Calculations', value: '1.2M+', icon: Calculator },
    { label: 'Interest Saved', value: '$52M+', icon: DollarSign },
    { label: 'Countries', value: '15+', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary-light">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">Trusted by 10,000+ U.S. homeowners</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in">
              Trust your numbers.<br />
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Tally your future.™
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in">
              Free, bank-grade financial calculators for mortgages, retirement, and investing. 
              No login. No ads. 100% private.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Link
                href="/mortgage"
                className="premium-button text-lg px-8 py-4 min-w-[240px] group"
              >
                Start saving now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#calculators"
                className="premium-button-outline text-lg px-8 py-4 min-w-[240px]"
              >
                View all calculators
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="h-6 w-6 text-white/60 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Grid */}
      <div id="calculators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="premium-badge mb-4">📊 FINANCIAL TOOLS</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Make smarter money decisions
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Every calculator is built with U.S. standards, updated for 2026, and completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="group premium-card animate-fade-in"
              >
                <div className="flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${calc.gradient} p-3 mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        {calc.title}
                      </h3>
                      {calc.badge && (
                        <span className="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full">
                          {calc.badge}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                      {calc.description}
                    </p>
                    
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-neutral-700">{calc.savings}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-neutral-700">{calc.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <span className="text-primary font-medium inline-flex items-center group-hover:gap-2 transition-all">
                      Calculate now
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gradient-to-b from-white to-neutral-50 border-t border-neutral-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="premium-badge mb-4">✨ WHY TRUST US</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Bank-grade accuracy. Zero tracking.
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              We use the same formulas as Fannie Mae, Freddie Mac, and the IRS. 
              Your data never leaves your device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'No Login',
                description: 'We don\'t know who you are. No accounts, no emails, no tracking.'
              },
              {
                icon: Shield,
                title: '100% Private',
                description: 'All calculations happen in your browser. We never see your numbers.'
              },
              {
                icon: Award,
                title: 'Bank Formulas',
                description: 'Built with standard amortization, compound interest, and IRS rules.'
              },
              {
                icon: Clock,
                title: '2026 Rates',
                description: 'Updated with current conforming loan limits, tax brackets, and contribution limits.'
              }
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl p-4 mx-auto mb-4 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            60 seconds. No signup. See your savings instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mortgage"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start with Mortgage Prepayment
            </Link>
            <Link
              href="#calculators"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing imports
import { Users, Calculator, Globe } from 'lucide-react';
