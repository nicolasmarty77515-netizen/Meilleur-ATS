'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from '@/components/LocaleLink';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface HomeShowcaseProps {
  products: Product[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function HomeShowcase({ products }: HomeShowcaseProps) {
  const [search, setSearch] = useState('');
  const [shuffled, setShuffled] = useState<Product[]>(products);

  // Shuffle on mount (client-side only) for random order on each visit
  useEffect(() => {
    setShuffled(shuffleArray(products));
  }, [products]);

  const filtered = useMemo(() => {
    if (!search.trim()) return shuffled;

    const query = search.toLowerCase().trim();
    return shuffled.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.headquarter.toLowerCase().includes(query)
    );
  }, [shuffled, search]);

  const displayed = search.trim() ? filtered : filtered.slice(0, 6);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Découvrez nos {products.length} logiciels ATS
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Recherchez par nom, pays ou fonctionnalité. L&apos;ordre est aléatoire pour une découverte équitable.
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un ATS par nom, pays..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results count when searching */}
        {search.trim() && (
          <p className="mt-4 text-center text-sm text-gray-500">
            {filtered.length} résultat{filtered.length !== 1 ? 's' : ''} pour &laquo; {search} &raquo;
          </p>
        )}

        {/* Product grid */}
        {displayed.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">Aucun ATS ne correspond à votre recherche.</p>
            <button
              onClick={() => setSearch('')}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Effacer la recherche
            </button>
          </div>
        )}

        {/* CTA when not searching */}
        {!search.trim() && (
          <div className="mt-8 text-center">
            <Link
              href="/logiciels"
              className="font-semibold text-blue-700 hover:text-blue-800"
            >
              Voir les {products.length} logiciels avec filtres avancés &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
