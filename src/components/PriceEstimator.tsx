'use client';

import { useState, useMemo } from 'react';
import Link from '@/components/LocaleLink';
import type { ProductFrontmatter } from '@/lib/types';
import RatingStars from './RatingStars';
import ProductLogo from './ProductLogo';

interface PriceEstimatorProps {
  products: ProductFrontmatter[];
}

export default function PriceEstimator({ products }: PriceEstimatorProps) {
  const [users, setUsers] = useState(5);

  const estimates = useMemo(() => {
    return products
      .map((product) => {
        let monthlyPrice: number | null = null;
        let label = '';

        switch (product.pricing.model) {
          case 'per-user-per-month':
            if (product.pricing.startingPrice) {
              monthlyPrice = product.pricing.startingPrice * users;
              label = `${product.pricing.startingPrice} € × ${users} utilisateurs`;
            }
            break;
          case 'flat':
            monthlyPrice = product.pricing.startingPrice ?? null;
            label = 'Forfait fixe';
            break;
          case 'free':
            monthlyPrice = 0;
            label = 'Gratuit';
            break;
          case 'per-job':
            if (product.pricing.startingPrice) {
              monthlyPrice = product.pricing.startingPrice;
              label = 'Par offre publiée';
            }
            break;
          default:
            label = 'Sur devis';
        }

        return { product, monthlyPrice, label };
      })
      .filter((e) => e.monthlyPrice !== null)
      .sort((a, b) => (a.monthlyPrice ?? 999999) - (b.monthlyPrice ?? 999999));
  }, [products, users]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-bold text-gray-900">
        Estimateur de prix mensuel
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Ajustez le nombre d&apos;utilisateurs pour estimer votre budget mensuel.
      </p>

      {/* Slider */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <label htmlFor="user-count" className="text-sm font-medium text-gray-700">
            Nombre d&apos;utilisateurs
          </label>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
            {users}
          </span>
        </div>
        <input
          id="user-count"
          type="range"
          min={1}
          max={50}
          value={users}
          onChange={(e) => setUsers(Number(e.target.value))}
          className="mt-2 w-full accent-blue-600"
          aria-valuemin={1}
          aria-valuemax={50}
          aria-valuenow={users}
          aria-valuetext={`${users} utilisateurs`}
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>1</span>
          <span>10</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 space-y-3">
        {estimates.slice(0, 8).map(({ product, monthlyPrice, label }) => (
          <Link
            key={product.slug}
            href={`/logiciels/${product.slug}`}
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-blue-200 hover:bg-blue-50/50"
          >
            <ProductLogo name={product.name} slug={product.slug} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
            <div className="text-right">
              {monthlyPrice !== null ? (
                <>
                  <p className="text-sm font-bold text-gray-900">
                    {monthlyPrice === 0 ? 'Gratuit' : `${monthlyPrice} €`}
                  </p>
                  {monthlyPrice > 0 && (
                    <p className="text-xs text-gray-400">/mois</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-400">Sur devis</p>
              )}
            </div>
            <RatingStars rating={product.ratings.overall} size="sm" showValue={false} />
          </Link>
        ))}
      </div>

      {estimates.length > 8 && (
        <p className="mt-3 text-center text-xs text-gray-400">
          et {estimates.length - 8} autres solutions disponibles
        </p>
      )}

      <p className="mt-4 text-xs text-gray-400">
        * Prix indicatifs basés sur les tarifs publics. Contactez les éditeurs pour un devis personnalisé.
      </p>
    </div>
  );
}
