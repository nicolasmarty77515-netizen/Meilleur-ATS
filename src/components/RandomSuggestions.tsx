'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductLogo from './ProductLogo';
import CountryFlag from './CountryFlag';
import RatingStars from './RatingStars';

interface SuggestionProduct {
  name: string;
  slug: string;
  description: string;
  headquarter: string;
  ratings: { overall: number };
  pricing: { startingPrice: number | null; currency: string };
}

interface RandomSuggestionsProps {
  products: SuggestionProduct[];
  excludeSlugs?: string[];
  count?: number;
}

export default function RandomSuggestions({
  products,
  excludeSlugs = [],
  count = 2,
}: RandomSuggestionsProps) {
  const [picks, setPicks] = useState<SuggestionProduct[]>([]);

  useEffect(() => {
    const available = products.filter((p) => !excludeSlugs.includes(p.slug));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    setPicks(shuffled.slice(0, count));
  }, [products, excludeSlugs, count]);

  if (picks.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-gray-900">Découvrez aussi</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {picks.map((p) => (
          <Link
            key={p.slug}
            href={`/logiciels/${p.slug}`}
            className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
          >
            <ProductLogo name={p.name} slug={p.slug} size="md" />
            <div className="min-w-0 flex-1">
              <h3 className="flex items-center gap-1.5 font-semibold text-gray-900 group-hover:text-blue-700">
                <CountryFlag country={p.headquarter} size="sm" />
                {p.name}
              </h3>
              <RatingStars rating={p.ratings.overall} size="sm" />
              <p className="mt-1 line-clamp-2 text-xs text-gray-500">{p.description}</p>
              <p className="mt-1 text-xs font-medium text-gray-700">
                {p.pricing.startingPrice
                  ? `À partir de ${p.pricing.startingPrice} ${p.pricing.currency}/mois`
                  : 'Sur devis'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
