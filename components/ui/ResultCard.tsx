import { ReactNode } from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  color?: string;
  trend?: 'positive' | 'negative' | 'neutral';
  subtext?: string;
}

export default function ResultCard({
  label,
  value,
  icon,
  color = 'bg-blue-100',
  trend,
  subtext
}: ResultCardProps) {
  const trendColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{label}</p>
          <p className={`text-xl font-bold ${trend ? trendColors[trend] : 'text-gray-900'}`}>
            {value}
          </p>
          {subtext && (
            <p className="text-xs text-gray-500 mt-1">{subtext}</p>
          )}
        </div>
      </div>
    </div>
  );
}
