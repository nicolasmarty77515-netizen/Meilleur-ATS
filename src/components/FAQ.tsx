'use client';

import { useState, useId } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Questions fréquentes' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="py-12" aria-labelledby={`${baseId}-title`}>
      <h2 id={`${baseId}-title`} className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200" role="list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const headingId = `${baseId}-q-${index}`;
          const panelId = `${baseId}-a-${index}`;

          return (
            <div key={index} role="listitem">
              <h3>
                <button
                  id={headingId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-base font-medium text-gray-900">{item.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                hidden={!isOpen}
              >
                {isOpen && (
                  <div
                    className="px-6 pb-4 text-sm text-gray-600 leading-relaxed [&_a]:text-blue-700 [&_a]:underline hover:[&_a]:text-blue-800"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
