'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-blue-600">❓</span>
        Frequently asked questions
      </h2>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <span className="font-medium text-gray-900 text-sm pr-4">
                {item.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <p className="text-sm text-gray-600 pb-2 pr-4 leading-relaxed">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": items.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
