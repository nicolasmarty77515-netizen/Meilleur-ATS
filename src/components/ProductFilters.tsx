'use client';

import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type PriceRange = '' | 'free' | 'lt50' | '50-100' | '100-200' | '200+' | 'custom';
export type SortOption = 'rating' | 'price-asc' | 'name-az';

export type ProfileFilterKey =
  | 'independant'
  | 'sourceur'
  | 'chasseur'
  | 'cabinet'
  | 'interim'
  | 'collectif'
  | 'rhInterne'
  | 'consultant';

export type FeatureFilterKey =
  | 'crm'
  | 'aiMatching'
  | 'multiposting'
  | 'cvParsing'
  | 'careerPage'
  | 'videoInterview';

export interface Filters {
  profile: ProfileFilterKey | '';
  priceRange: PriceRange;
  features: FeatureFilterKey[];
  hostedInFrance: boolean;
  sort: SortOption;
}

export const DEFAULT_FILTERS: Filters = {
  profile: '',
  priceRange: '',
  features: [],
  hostedInFrance: false,
  sort: 'rating',
};

/* ------------------------------------------------------------------ */
/*  Label maps                                                        */
/* ------------------------------------------------------------------ */

const PROFILE_OPTIONS: { key: ProfileFilterKey; label: string }[] = [
  { key: 'independant', label: 'Indépendant' },
  { key: 'sourceur', label: 'Sourceur' },
  { key: 'chasseur', label: 'Chasseur' },
  { key: 'cabinet', label: 'Cabinet' },
  { key: 'interim', label: 'Intérim' },
  { key: 'collectif', label: 'Collectif' },
  { key: 'rhInterne', label: 'RH interne' },
  { key: 'consultant', label: 'Consultant' },
];

const PRICE_OPTIONS: { key: PriceRange; label: string }[] = [
  { key: '', label: 'Tous les prix' },
  { key: 'free', label: 'Gratuit' },
  { key: 'lt50', label: '< 50 EUR' },
  { key: '50-100', label: '50 - 100 EUR' },
  { key: '100-200', label: '100 - 200 EUR' },
  { key: '200+', label: '200+ EUR' },
  { key: 'custom', label: 'Sur devis' },
];

const FEATURE_OPTIONS: { key: FeatureFilterKey; label: string }[] = [
  { key: 'crm', label: 'CRM intégré' },
  { key: 'aiMatching', label: 'Matching IA' },
  { key: 'multiposting', label: 'Multiposting' },
  { key: 'cvParsing', label: 'Parsing CV' },
  { key: 'careerPage', label: 'Page carrière' },
  { key: 'videoInterview', label: 'Entretien vidéo' },
];

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: 'rating', label: 'Note globale' },
  { key: 'price-asc', label: 'Prix croissant' },
  { key: 'name-az', label: 'Nom A-Z' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ProductFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const toggleFeature = (key: FeatureFilterKey) => {
    const next = filters.features.includes(key)
      ? filters.features.filter((f) => f !== key)
      : [...filters.features, key];
    update({ features: next });
  };

  const hasActiveFilters =
    filters.profile !== '' ||
    filters.priceRange !== '' ||
    filters.features.length > 0 ||
    filters.hostedInFrance;

  const resetAll = () => onChange({ ...DEFAULT_FILTERS, sort: filters.sort });

  /* ---- Shared classes ---- */
  const selectClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Mobile toggle */}
      <button
        type="button"
        className="flex w-full items-center justify-between text-left sm:hidden"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="text-base font-semibold text-gray-900">
          Filtres{hasActiveFilters ? ' (actifs)' : ''}
        </span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop: always visible. Mobile: collapsible */}
      <div className={`${mobileOpen ? 'mt-4 block' : 'hidden'} sm:block`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---- Profile ---- */}
          <div>
            <label htmlFor="filter-profile" className="mb-1.5 block text-sm font-medium text-gray-700">
              Profil
            </label>
            <select
              id="filter-profile"
              className={selectClass}
              value={filters.profile}
              onChange={(e) => update({ profile: e.target.value as ProfileFilterKey | '' })}
            >
              <option value="">Tous les profils</option>
              {PROFILE_OPTIONS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* ---- Price ---- */}
          <div>
            <label htmlFor="filter-price" className="mb-1.5 block text-sm font-medium text-gray-700">
              Budget
            </label>
            <select
              id="filter-price"
              className={selectClass}
              value={filters.priceRange}
              onChange={(e) => update({ priceRange: e.target.value as PriceRange })}
            >
              {PRICE_OPTIONS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* ---- Sort ---- */}
          <div>
            <label htmlFor="filter-sort" className="mb-1.5 block text-sm font-medium text-gray-700">
              Trier par
            </label>
            <select
              id="filter-sort"
              className={selectClass}
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as SortOption })}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* ---- Hosting ---- */}
          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition hover:border-blue-300">
              <input
                type="checkbox"
                checked={filters.hostedInFrance}
                onChange={(e) => update({ hostedInFrance: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">Hébergé en France</span>
            </label>
          </div>
        </div>

        {/* ---- Features ---- */}
        <div className="mt-5">
          <span className="mb-2 block text-sm font-medium text-gray-700">Fonctionnalités</span>
          <div className="flex flex-wrap gap-2">
            {FEATURE_OPTIONS.map((f) => {
              const active = filters.features.includes(f.key);
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => toggleFeature(f.key)}
                  className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                    active
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Reset ---- */}
        {hasActiveFilters && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetAll}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
