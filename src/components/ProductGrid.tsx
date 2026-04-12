'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductFilters, {
  DEFAULT_FILTERS,
  type Filters,
  type FeatureFilterKey,
} from '@/components/ProductFilters';
import type { ProductFrontmatter } from '@/lib/types';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function matchesPriceRange(product: ProductFrontmatter, range: string): boolean {
  const { pricing } = product;

  switch (range) {
    case '':
      return true;
    case 'free':
      return pricing.model === 'free';
    case 'lt50':
      return pricing.startingPrice !== null && pricing.startingPrice > 0 && pricing.startingPrice < 50;
    case '50-100':
      return pricing.startingPrice !== null && pricing.startingPrice >= 50 && pricing.startingPrice <= 100;
    case '100-200':
      return pricing.startingPrice !== null && pricing.startingPrice > 100 && pricing.startingPrice <= 200;
    case '200+':
      return pricing.startingPrice !== null && pricing.startingPrice > 200;
    case 'custom':
      return pricing.model === 'custom';
    default:
      return true;
  }
}

function matchesFeatures(product: ProductFrontmatter, features: FeatureFilterKey[]): boolean {
  return features.every((key) => product.features[key as keyof typeof product.features]);
}

function matchesProfile(product: ProductFrontmatter, profile: string): boolean {
  if (!profile) return true;
  const score = product.targetProfiles[profile as keyof typeof product.targetProfiles];
  return score !== undefined && score >= 3;
}

function sortProducts(products: ProductFrontmatter[], sort: string): ProductFrontmatter[] {
  const copy = [...products];

  switch (sort) {
    case 'rating':
      return copy.sort((a, b) => b.ratings.overall - a.ratings.overall);
    case 'price-asc':
      return copy.sort((a, b) => {
        const pa = a.pricing.startingPrice ?? Infinity;
        const pb = b.pricing.startingPrice ?? Infinity;
        return pa - pb;
      });
    case 'name-az':
      return copy.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    default:
      return copy;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ProductGridProps {
  products: ProductFrontmatter[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (!matchesProfile(p, filters.profile)) return false;
      if (!matchesPriceRange(p, filters.priceRange)) return false;
      if (!matchesFeatures(p, filters.features)) return false;
      if (filters.hostedInFrance && p.dataHosting !== 'France') return false;
      return true;
    });

    return sortProducts(result, filters.sort);
  }, [products, filters]);

  return (
    <>
      <ProductFilters filters={filters} onChange={setFilters} />

      <p className="mt-6 text-sm text-gray-600">
        {filtered.length === 0
          ? 'Aucun logiciel ne correspond à vos critères.'
          : filtered.length === 1
            ? '1 logiciel correspond à vos critères.'
            : `${filtered.length} logiciels correspondent à vos critères.`}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          Essayez d&apos;élargir vos filtres pour voir plus de résultats.
        </p>
      )}
    </>
  );
}
