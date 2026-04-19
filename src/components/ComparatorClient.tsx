'use client';

import { useState, useMemo } from 'react';
import Link from '@/components/LocaleLink';
import type { ProductFrontmatter } from '@/lib/types';
import RatingStars from './RatingStars';
import ProductLogo from './ProductLogo';
import RadarChart from './RadarChart';
import CountryFlag from './CountryFlag';
import { CheckIcon, XIcon } from './Icons';
import { FEATURE_LABELS, INTEGRATION_LABELS } from '@/lib/constants';

interface ComparatorClientProps {
  products: ProductFrontmatter[];
}

export default function ComparatorClient({ products }: ComparatorClientProps) {
  const [slugA, setSlugA] = useState('');
  const [slugB, setSlugB] = useState('');
  const [slugC, setSlugC] = useState('');

  const productA = useMemo(() => products.find((p) => p.slug === slugA), [products, slugA]);
  const productB = useMemo(() => products.find((p) => p.slug === slugB), [products, slugB]);
  const productC = useMemo(() => products.find((p) => p.slug === slugC), [products, slugC]);

  const selected = [productA, productB, productC].filter(Boolean) as ProductFrontmatter[];

  const ratingDimensions = [
    { key: 'easeOfUse', label: 'Prise en main', max: 5 },
    { key: 'features', label: 'Fonctionnalités', max: 5 },
    { key: 'support', label: 'Support', max: 5 },
    { key: 'valueForMoney', label: 'Rapport qualité/prix', max: 5 },
    { key: 'candidateExperience', label: 'Exp. candidat', max: 5 },
    { key: 'overall', label: 'Note globale', max: 5 },
  ];

  const colors = ['#2563eb', '#dc2626', '#16a34a'];
  const featureEntries = Object.entries(FEATURE_LABELS);
  const integrationEntries = Object.entries(INTEGRATION_LABELS);

  return (
    <div className="space-y-8">
      {/* Selectors */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { value: slugA, setter: setSlugA, label: 'ATS n°1', exclude: [slugB, slugC] },
          { value: slugB, setter: setSlugB, label: 'ATS n°2', exclude: [slugA, slugC] },
          { value: slugC, setter: setSlugC, label: 'ATS n°3 (optionnel)', exclude: [slugA, slugB] },
        ].map(({ value, setter, label, exclude }, i) => (
          <div key={i}>
            <label htmlFor={`select-ats-${i}`} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <select
              id={`select-ats-${i}`}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">— Choisir un ATS —</option>
              {products
                .filter((p) => !exclude.includes(p.slug))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name} ({p.ratings.overall}/5)
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison content */}
      {selected.length >= 2 ? (
        <>
          {/* Header cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {selected.map((product, i) => (
              <div
                key={product.slug}
                className="rounded-xl border-2 p-4 text-center"
                style={{ borderColor: colors[i] }}
              >
                <ProductLogo name={product.name} slug={product.slug} size="md" />
                <h3 className="mt-2 font-bold text-gray-900">{product.name}</h3>
                <div className="mt-1 flex items-center justify-center gap-1">
                  <CountryFlag country={product.headquarter} size="sm" />
                  <span className="text-xs text-gray-500">{product.headquarter}</span>
                </div>
                <div className="mt-2 flex justify-center">
                  <RatingStars rating={product.ratings.overall} size="sm" />
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-700">
                  {product.pricing.startingPrice
                    ? `${product.pricing.startingPrice} €/mois`
                    : 'Sur devis'}
                </p>
              </div>
            ))}
          </div>

          {/* Radar chart */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-center text-lg font-bold text-gray-900">
              Comparaison visuelle
            </h3>
            <RadarChart
              dimensions={ratingDimensions}
              datasets={selected.map((product, i) => ({
                label: product.name,
                color: colors[i],
                values: product.ratings as unknown as Record<string, number>,
              }))}
            />
          </div>

          {/* Ratings table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Critère</th>
                  {selected.map((p, i) => (
                    <th key={p.slug} className="px-4 py-3 text-center font-semibold" style={{ color: colors[i] }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ratingDimensions.map((dim) => {
                  const values = selected.map(
                    (p) => (p.ratings as unknown as Record<string, number>)[dim.key] ?? 0
                  );
                  const maxVal = Math.max(...values);
                  return (
                    <tr key={dim.key}>
                      <td className="px-4 py-3 font-medium text-gray-700">{dim.label}</td>
                      {selected.map((p, i) => {
                        const val = values[i];
                        return (
                          <td
                            key={p.slug}
                            className={`px-4 py-3 text-center font-semibold ${
                              val === maxVal ? 'text-green-600' : 'text-gray-600'
                            }`}
                          >
                            {val.toFixed(1)}/5
                            {val === maxVal && values.filter((v) => v === maxVal).length === 1 && (
                              <span className="ml-1 text-green-500" aria-label="Meilleur score">★</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Features table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Fonctionnalité</th>
                  {selected.map((p, i) => (
                    <th key={p.slug} className="px-4 py-3 text-center font-semibold" style={{ color: colors[i] }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {featureEntries.map(([key, label]) => (
                  <tr key={key}>
                    <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
                    {selected.map((p) => {
                      const val = (p.features as unknown as Record<string, boolean | number>)[key];
                      const hasFeature = typeof val === 'number' ? val > 0 : Boolean(val);
                      return (
                        <td key={p.slug} className="px-4 py-3 text-center">
                          {hasFeature ? (
                            <span className="inline-flex items-center gap-1 text-green-600">
                              <CheckIcon className="h-5 w-5" />
                              {typeof val === 'number' && val > 1 && (
                                <span className="text-xs font-medium">({val})</span>
                              )}
                            </span>
                          ) : (
                            <XIcon className="mx-auto h-5 w-5 text-gray-300" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Integrations table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Intégration</th>
                  {selected.map((p, i) => (
                    <th key={p.slug} className="px-4 py-3 text-center font-semibold" style={{ color: colors[i] }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {integrationEntries.map(([key, label]) => (
                  <tr key={key}>
                    <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
                    {selected.map((p) => {
                      const val = (p.integrations as unknown as Record<string, boolean>)[key];
                      return (
                        <td key={p.slug} className="px-4 py-3 text-center">
                          {val ? (
                            <CheckIcon className="mx-auto h-5 w-5 text-green-600" />
                          ) : (
                            <XIcon className="mx-auto h-5 w-5 text-gray-300" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Links to full pages */}
          <div className="flex flex-wrap justify-center gap-3">
            {selected.map((p) => (
              <Link
                key={p.slug}
                href={`/logiciels/${p.slug}`}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                Fiche complète de {p.name} →
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-600">
            Sélectionnez au moins 2 ATS pour lancer la comparaison
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Vous pouvez comparer jusqu&apos;à 3 solutions côte à côte
          </p>
        </div>
      )}
    </div>
  );
}
