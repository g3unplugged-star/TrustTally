'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, DollarSign, Shield, Calculator } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Mortgage', href: '/mortgage', icon: Calculator },
    { name: 'Retirement', href: '/retirement', icon: TrendingUp },
    { name: 'DCA', href: '/dca', icon: DollarSign },
    { name: 'Afford', href: '/affordability', icon: Shield },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-bottom z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full touch-manipulation
                ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-blue-600/10' : ''}`} />
              <span className="text-[11px] font-medium mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
