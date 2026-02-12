import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  color: string;
  badge?: string;
  metrics?: string[];
}

export default function Card({
  title,
  description,
  href,
  icon,
  color,
  badge,
  metrics
}: CardProps) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl p-5 active:bg-gray-50 transition-all shadow-sm hover:shadow-md border border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className={`${color} rounded-xl p-3 flex-shrink-0 shadow-md`}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">
              {title}
            </h3>
            {badge && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                {badge}
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            {description}
          </p>
          
          {metrics && metrics.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              {metrics.map((metric, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                  {metric}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
      </div>
    </Link>
  );
}
