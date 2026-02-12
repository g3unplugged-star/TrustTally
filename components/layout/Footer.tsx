import Link from 'next/link';
import { Home, TrendingUp, DollarSign, Shield, PiggyBank, HeartPulse, Building2, Gift, BarChart3, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 pb-24 md:pb-8">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Brand */}
        <div className="mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TrustTally™
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Trust your numbers. Tally your future.™
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Free U.S. financial calculators. No login, no ads, 100% private.
          </p>
        </div>

        {/* Calculator Links - SEO Internal Linking */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Mortgage
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mortgage" className="text-sm text-gray-600 hover:text-blue-600">
                  Mortgage Prepayment
                </Link>
              </li>
              <li>
                <Link href="/affordability" className="text-sm text-gray-600 hover:text-blue-600">
                  Home Affordability
                </Link>
              </li>
              <li>
                <Link href="/rent-vs-buy" className="text-sm text-gray-600 hover:text-blue-600">
                  Rent vs Buy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Retirement
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/retirement" className="text-sm text-gray-600 hover:text-blue-600">
                  401k & Retirement
                </Link>
              </li>
              <li>
                <Link href="/roth-ira" className="text-sm text-gray-600 hover:text-blue-600">
                  Roth vs Traditional
                </Link>
              </li>
              <li>
                <Link href="/401k-match" className="text-sm text-gray-600 hover:text-blue-600">
                  401k Match
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Investing
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dca" className="text-sm text-gray-600 hover:text-blue-600">
                  DCA + DRIP
                </Link>
              </li>
              <li>
                <Link href="/compound" className="text-sm text-gray-600 hover:text-blue-600">
                  Compound Interest
                </Link>
              </li>
              <li>
                <Link href="/hsa" className="text-sm text-gray-600 hover:text-blue-600">
                  HSA Investment
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/glossary" className="text-sm text-gray-600 hover:text-blue-600">
                  Financial Glossary
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                  Blog (Coming Soon)
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-700">
              🇺🇸 U.S. Market
            </span>
            <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-700">
              ✅ 2026 Rates
            </span>
            <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-700">
              🔒 Zero Tracking
            </span>
            <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs text-gray-700">
              📱 Mobile First
            </span>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-900">
              Privacy
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Terms
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Disclaimer
            </Link>
            <span>© {new Date().getFullYear()} TrustTally</span>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            TrustTally is for informational purposes only. Not financial advice. 
            Always consult a qualified professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
