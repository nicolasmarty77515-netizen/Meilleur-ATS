import Link from 'next/link';
import type { ProductFrontmatter } from '@/lib/types';
import { PRICING_MODEL_LABELS } from '@/lib/constants';
import RatingStars from './RatingStars';
import ProductLogo from './ProductLogo';
import CountryFlag from './CountryFlag';

interface ProductCardProps {
  product: ProductFrontmatter;
}

export default function ProductCard({ product }: ProductCardProps) {
  const priceLabel = product.pricing.startingPrice
    ? `${product.pricing.startingPrice} ${product.pricing.currency} ${PRICING_MODEL_LABELS[product.pricing.model] ?? ''}`
    : PRICING_MODEL_LABELS[product.pricing.model] ?? 'Sur devis';

  return (
    <Link
      href={`/logiciels/${product.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <ProductLogo name={product.name} slug={product.slug} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 text-lg font-semibold text-gray-900 group-hover:text-blue-700">
            <CountryFlag country={product.headquarter} size="sm" />
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{product.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <RatingStars rating={product.ratings.overall} size="sm" />
        <span className="text-sm font-medium text-gray-700">{priceLabel}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.features.multiposting && (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            Multiposting
          </span>
        )}
        {product.features.crm && (
          <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
            CRM
          </span>
        )}
        {product.features.sirh && (
          <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
            SIRH
          </span>
        )}
        {product.features.aiMatching && (
          <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
            IA
          </span>
        )}
        {product.features.mobileApp && (
          <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
            App mobile
          </span>
        )}
        {product.rgpdCompliant && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            RGPD
          </span>
        )}
        {product.dataHosting === 'France' && (
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            Heberge en France
          </span>
        )}
        {product.browserExtensions?.chrome.available && (
          <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
            Extension Chrome
            {product.browserExtensions.chrome.users != null &&
              ` (${product.browserExtensions.chrome.users.toLocaleString('fr-FR')}+)`}
          </span>
        )}
      </div>
    </Link>
  );
}
