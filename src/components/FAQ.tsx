'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Questions frequentes' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-base font-medium text-gray-900">{item.question}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
