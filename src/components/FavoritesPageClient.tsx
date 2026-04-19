'use client';

import Link from '@/components/LocaleLink';
import type { ProductFrontmatter } from '@/lib/types';
import { useFavorites } from './FavoritesProvider';
import FavoritesButton from './FavoritesButton';
import RatingStars from './RatingStars';
import ProductLogo from './ProductLogo';

interface FavoritesPageClientProps {
  products: ProductFrontmatter[];
}

export default function FavoritesPageClient({ products }: FavoritesPageClientProps) {
  const { favorites, count } = useFavorites();

  const savedProducts = products.filter((p) => favorites.includes(p.slug));

  if (count === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <h2 className="mt-4 text-lg font-semibold text-gray-600">Aucun favori pour le moment</h2>
        <p className="mt-2 text-sm text-gray-500">
          Cliquez sur le cœur d&apos;un ATS pour le sauvegarder ici.
        </p>
        <Link
          href="/logiciels"
          className="mt-6 inline-flex rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          Découvrir les ATS
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm text-gray-500">
        {count} logiciel{count > 1 ? 's' : ''} sauvegardé{count > 1 ? 's' : ''}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {savedProducts.map((product) => (
          <div
            key={product.slug}
            className="relative rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
          >
            <div className="absolute right-3 top-3">
              <FavoritesButton slug={product.slug} name={product.name} size="md" />
            </div>

            <div className="flex items-center gap-3">
              <ProductLogo name={product.name} slug={product.slug} size="sm" />
              <div className="min-w-0">
                <Link
                  href={`/logiciels/${product.slug}`}
                  className="block truncate font-bold text-gray-900 hover:text-blue-700"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-gray-500">{product.headquarter}</p>
              </div>
            </div>

            <div className="mt-3">
              <RatingStars rating={product.ratings.overall} size="sm" />
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                {product.pricing.startingPrice
                  ? `${product.pricing.startingPrice} €/mois`
                  : 'Sur devis'}
              </span>
              <Link
                href={`/logiciels/${product.slug}`}
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Voir la fiche →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/comparer"
          className="rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          Comparer mes favoris
        </Link>
        <Link
          href="/logiciels"
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Découvrir d&apos;autres ATS
        </Link>
      </div>
    </div>
  );
}
