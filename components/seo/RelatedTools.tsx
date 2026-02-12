import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Tool {
  name: string;
  href: string;
  description: string;
}

interface RelatedToolsProps {
  current: string;
  tools: Tool[];
}

export default function RelatedTools({ current, tools }: RelatedToolsProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-lg">🔗</span>
        Related calculators
      </h3>
      <div className="space-y-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block bg-white p-4 rounded-lg hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{tool.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">{tool.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
