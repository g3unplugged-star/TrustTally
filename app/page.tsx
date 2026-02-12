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
  Award,
  Users,
  Calculator,
  Globe,
  BarChart3,
  TrendingDown,
  ShieldCheck,
  Lock,
  Zap,
  Infinity,
  Coins,
  Landmark,
  ChartPie,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const calculators = [
    {
      title: 'Mortgage Prepayment',
      description: 'Save $50k+ in interest and pay off your home 5-10 years early.',
      href: '/mortgage',
      icon: Home,
      gradient: 'from-blue-700 to-indigo-700',
      lightGradient: 'from-blue-50 to-indigo-50',
      badge: '⭐ Most Popular',
      badgeColor: 'premium-badge-gold',
      metrics: [
        { label: 'Avg Savings', value: '$54,321', icon: DollarSign },
        { label: 'Years Early', value: '6.2', icon: Clock }
      ],
      color: 'blue'
    },
    {
      title: '401k & Retirement',
      description: 'Project your nest egg with monthly contributions and employer match.',
      href: '/retirement',
      icon: TrendingUp,
      gradient: 'from-emerald-700 to-teal-700',
      lightGradient: 'from-emerald-50 to-teal-50',
      badge: '📈 401(k)',
      metrics: [
        { label: 'At 65', value: '$1.2M', icon: Target },
        { label: 'Projection', value: '30 years', icon: Calendar }
      ],
      color: 'emerald'
    },
    {
      title: 'DCA + DRIP',
      description: 'Dollar cost averaging with dividend reinvestment. S&P 500 historical returns.',
      href: '/dca',
      icon: DollarSign,
      gradient: 'from-purple-700 to-pink-700',
      lightGradient: 'from-purple-50 to-pink-50',
      badge: '💰 Smart Investing',
      metrics: [
        { label: 'After 30y', value: '$567k', icon: TrendingUp },
        { label: 'Avg Return', value: '7%', icon: BarChart3 }
      ],
      color: 'purple'
    },
    {
      title: 'Home Affordability',
      description: 'How much house can you afford? Based on income, debt, down payment.',
      href: '/affordability',
      icon: Shield,
      gradient: 'from-indigo-700 to-blue-700',
      lightGradient: 'from-indigo-50 to-blue-50',
      badge: '🏡 First Time Buyer',
      metrics: [
        { label: 'Max Price', value: '$450k', icon: Home },
        { label: 'DTI Limit', value: '43%', icon: Shield }
      ],
      color: 'indigo'
    },
    {
      title: 'Roth vs Traditional',
      description: 'Tax now vs tax later. 2026 contribution limits and phaseouts.',
      href: '/roth-ira',
      icon: PiggyBank,
      gradient: 'from-amber-700 to-orange-700',
      lightGradient: 'from-amber-50 to-orange-50',
      badge: '🎯 Tax Smart',
      metrics: [
        { label: 'Tax Savings', value: '$87k', icon: Coins },
        { label: 'Side-by-side', value: 'Compare', icon: ChartPie }
      ],
      color: 'amber'
    },
    {
      title: 'HSA Investment',
      description: 'Triple tax advantage. Invest your health savings for retirement.',
      href: '/hsa',
      icon: HeartPulse,
      gradient: 'from-emerald-700 to-teal-700',
      lightGradient: 'from-emerald-50 to-teal-50',
      badge: '🏆 Best Kept Secret',
      metrics: [
        { label: 'Tax-Free', value: 'Triple', icon: ShieldCheck },
        { label: 'Vs 401k', value: 'Better', icon: TrendingUp }
      ],
      color: 'emerald'
    },
    {
      title: 'Rent vs Buy',
      description: 'Should you rent or buy? Break-even analysis with investment returns.',
      href: '/rent-vs-buy',
      icon: Building2,
      gradient: 'from-rose-700 to-pink-700',
      lightGradient: 'from-rose-50 to-pink-50',
      badge: '🏠 Major Decision',
      metrics: [
        { label: 'Break-even', value: '7 years', icon: Clock },
        { label: 'Scenarios', value: 'Compare', icon: Briefcase }
      ],
      color: 'rose'
    },
    {
      title: '401k Match',
      description: 'Free money? Calculate your full employer match and maximize contributions.',
      href: '/401k-match',
      icon: Gift,
      gradient: 'from-cyan-700 to-blue-700',
      lightGradient: 'from-cyan-50 to-blue-50',
      badge: '🎁 Free Money',
      metrics: [
        { label: 'Per Year', value: '$5,400', icon: DollarSign },
        { label: 'Return', value: '100%', icon: Zap }
      ],
      color: 'cyan'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users', icon: Users, suffix: 'trust us' },
    { value: '1.2M+', label: 'Calculations', icon: Calculator, suffix: 'and counting' },
    { value: '$52M+', label: 'Interest Saved', icon: TrendingDown, suffix: 'for homeowners' },
    { value: '15+', label: 'Countries', icon: Globe, suffix: 'worldwide' }
  ];

  const trustFeatures = [
    {
      icon: Lock,
      title: 'No Login. No Tracking.',
      description: 'We don\'t know who you are. No accounts, no emails, no cookies. Your data never leaves your device.',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Landmark,
      title: 'Bank-Grade Formulas',
      description: 'Built with standard amortization, compound interest, and IRS rules. Same as Fannie Mae and Freddie Mac.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: ShieldCheck,
      title: '100% Private by Design',
      description: 'All calculations happen in your browser. We never see, store, or transmit your financial information.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Infinity,
      title: 'Always Free. Forever.',
      description: 'No subscriptions, no hidden fees, no credit cards. Just accurate financial tools for everyone.',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-2 shadow-lg">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                  TrustTally™
                </span>
                <span className="hidden md:block text-xs text-neutral-500 -mt-1">
                  Trust your numbers. Tally your future.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { name: 'Mortgage', href: '/mortgage', icon: Home },
                { name: 'Retirement', href: '/retirement', icon: TrendingUp },
                { name: 'DCA/Invest', href: '/dca', icon: DollarSign },
                { name: 'Affordability', href: '/affordability', icon: Shield }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-neutral-700 hover:text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-all flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3">
              <span className="hidden lg:flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Trusted by 10k+</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-slide-up">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">Trusted by 10,000+ U.S. homeowners</span>
            </div>

            {/* Main Headline */}
            <h1 className="display-1 font-bold text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Trust your numbers.
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                Tally your future.™
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Free, bank-grade financial calculators for mortgages, retirement, and investing. 
              No login. No ads. 100% private.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/mortgage"
                className="luxury-button-primary text-lg px-8 py-4 min-w-[240px] group"
              >
                Start saving now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#calculators"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 min-w-[240px]"
              >
                View all calculators
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-white/60" />
                      <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                    <div className="text-xs text-white/40 mt-1">{stat.suffix}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section id="calculators" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="premium-badge mb-4">📊 FINANCIAL TOOLS</span>
            <h2 className="heading-1 text-neutral-900 mb-4">
              Make smarter money decisions
            </h2>
            <p className="text-lg text-neutral-600">
              Every calculator is built with U.S. standards, updated for 2026, and completely free.
            </p>
          </div>

          {/* Calculator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calculators.map((calc, index) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group premium-card animate-scale"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${calc.gradient} p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title & Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                        {calc.title}
                      </h3>
                      {calc.badge && (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${calc.badgeColor || 'premium-badge'}`}>
                          {calc.badge}
                        </span>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                      {calc.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="space-y-2 mt-auto">
                      {calc.metrics.map((metric) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div key={metric.label} className="flex items-center gap-2 text-sm">
                            <MetricIcon className={`h-4 w-4 text-${calc.color}-600`} />
                            <span className="font-medium text-neutral-900">{metric.value}</span>
                            <span className="text-neutral-500">{metric.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-4 border-t border-neutral-100">
                      <span className={`text-${calc.color}-600 font-medium inline-flex items-center group-hover:gap-3 transition-all`}>
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
      </section>

      {/* Trust Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 py-24 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
              <ShieldCheck className="h-4 w-4 text-white/80" />
              <span className="text-sm font-medium text-white/90">✨ WHY TRUST US</span>
            </span>
            <h2 className="heading-1 text-white mb-4">
              Bank-grade accuracy.<br />Zero tracking.
            </h2>
            <p className="text-lg text-white/70">
              We use the same formulas as Fannie Mae, Freddie Mac, and the IRS. 
              Your data never leaves your device.
            </p>
          </div>

          {/* Trust Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl p-4 mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-8 border-t border-white/10">
            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm font-medium text-white/80">U.S. Market</span>
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
              <span className="text-2xl">✅</span>
              <span className="text-sm font-medium text-white/80">2026 Rates</span>
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-medium text-white/80">Zero Tracking</span>
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
              <span className="text-2xl">📱</span>
              <span className="text-sm font-medium text-white/80">Mobile First</span>
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-800">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full mix-blend-overlay filter blur-3xl" />
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h2 className="heading-1 text-white mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            60 seconds. No signup. See your savings instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mortgage"
              className="px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Start with Mortgage Prepayment
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#calculators"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Main Footer */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-2">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                    TrustTally™
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                Trust your numbers. Tally your future.™
              </p>
              <p className="text-xs text-neutral-500">
                Free U.S. financial calculators.<br />
                No login, no ads, 100% private.
              </p>
            </div>

            {/* Mortgage Links */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                Mortgage
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/mortgage" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    Mortgage Prepayment
                  </Link>
                </li>
                <li>
                  <Link href="/affordability" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    Home Affordability
                  </Link>
                </li>
                <li>
                  <Link href="/rent-vs-buy" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    Rent vs Buy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Retirement Links */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                Retirement
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/retirement" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    401k & Retirement
                  </Link>
                </li>
                <li>
                  <Link href="/roth-ira" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    Roth vs Traditional
                  </Link>
                </li>
                <li>
                  <Link href="/401k-match" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    401k Match
                  </Link>
                </li>
              </ul>
            </div>

            {/* Investing & Resources */}
            <div>
              <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4">
                Investing
              </h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link href="/dca" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    DCA + DRIP
                  </Link>
                </li>
                <li>
                  <Link href="/compound" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    Compound Interest
                  </Link>
                </li>
                <li>
                  <Link href="/hsa" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    HSA Investment
                  </Link>
                </li>
              </ul>
              
              <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-4 mt-6">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/glossary" className="text-sm text-neutral-600 hover:text-primary-700 transition-colors">
                    Financial Glossary
                  </Link>
                </li>
                <li>
                  <span className="text-sm text-neutral-400">Blog (Coming Soon)</span>
                </li>
                <li>
                  <span className="text-sm text-neutral-400">Contact</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-neutral-200">
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-xs text-neutral-700">
                <span>🇺🇸</span> U.S. Market
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-xs text-neutral-700">
                <span>✅</span> 2026 Rates
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-xs text-neutral-700">
                <span>🔒</span> Zero Tracking
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-xs text-neutral-700">
                <span>📱</span> Mobile First
              </span>
            </div>
            <span className="text-xs text-neutral-500">
              © {new Date().getFullYear()} TrustTally
            </span>
          </div>

          {/* Legal */}
          <div className="pt-6 border-t border-neutral-200">
            <div className="flex flex-wrap gap-6 text-xs text-neutral-500">
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-neutral-900 transition-colors">
                Disclaimer
              </Link>
            </div>
            <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
              TrustTally is for informational purposes only. Not financial advice. 
              Always consult a qualified professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
