import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/LocaleLink';
import { getProductBySlug, getProductSlugs, getAllProducts } from '@/lib/mdx';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { FEATURE_LABELS, INTEGRATION_LABELS, PRICING_MODEL_LABELS, RATING_SOURCES, RATING_DISCLAIMER, getIndexableMetadata } from '@/lib/constants';
import RatingStars from '@/components/RatingStars';
import ProductLogo from '@/components/ProductLogo';
import CountryFlag from '@/components/CountryFlag';
import RadarChart from '@/components/RadarChart';
import { CheckIcon, XIcon } from '@/components/Icons';
import SchemaMarkup from '@/components/SchemaMarkup';
import RandomSuggestions from '@/components/RandomSuggestions';
import Breadcrumb from '@/components/Breadcrumb';
import FavoritesButton from '@/components/FavoritesButton';
import ExportPDF from '@/components/ExportPDF';
import ReviewSection from '@/components/ReviewSection';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) => getProductSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} - Avis et test complet`,
    description: `Test et avis complet de ${product.name}. Note : ${product.ratings.overall}/5. ${product.description}`,
    alternates: { canonical: `/logiciels/${slug}` },
    ...getIndexableMetadata('product', slug),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.nav.logiciels, url: '/logiciels' },
    { name: product.name, url: `/logiciels/${slug}` },
  ]);

  const featureEntries = Object.entries(FEATURE_LABELS);
  const integrationEntries = Object.entries(INTEGRATION_LABELS);

  const priceLabel = product.pricing.startingPrice
    ? `${product.pricing.startingPrice} ${product.pricing.currency} ${PRICING_MODEL_LABELS[product.pricing.model] ?? ''}`
    : PRICING_MODEL_LABELS[product.pricing.model] ?? dict.common.onQuote;

  return (
    <>
      <SchemaMarkup schema={[generateProductSchema(product), breadcrumb]} />

      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: dict.common.home, href: '/' },
              { label: dict.nav.logiciels, href: '/logiciels' },
              { label: product.name },
            ]}
          />

          {/* Header */}
          <header className="flex items-start gap-6">
            <ProductLogo name={product.name} slug={slug} size="lg" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
                  <CountryFlag country={product.headquarter} size="lg" />
                  {product.name}
                </h1>
                <div className="flex shrink-0 items-center gap-2">
                  <FavoritesButton slug={slug} name={product.name} showLabel />
                  <ExportPDF label="PDF" />
                </div>
              </div>
              <p className="mt-2 text-lg text-gray-600">{product.description}</p>
              <div className="mt-3 flex items-center gap-4">
                <RatingStars rating={product.ratings.overall} size="lg" />
                <span className="text-lg font-semibold text-gray-700">{priceLabel}</span>
              </div>
            </div>
          </header>

          {/* CRM / SIRH prominent badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                product.features.crm
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  product.features.crm
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {product.features.crm ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <XIcon className="h-4 w-4" />
                )}
              </span>
              <div>
                <p className={`text-sm font-bold ${product.features.crm ? 'text-blue-900' : 'text-gray-400'}`}>
                  CRM intégré
                </p>
                <p className="text-xs text-gray-500">
                  {product.features.crm ? 'Gestion relation clients' : 'Non disponible'}
                </p>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                product.features.sirh
                  ? 'border-purple-200 bg-purple-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  product.features.sirh
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {product.features.sirh ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <XIcon className="h-4 w-4" />
                )}
              </span>
              <div>
                <p className={`text-sm font-bold ${product.features.sirh ? 'text-purple-900' : 'text-gray-400'}`}>
                  SIRH intégré
                </p>
                <p className="text-xs text-gray-500">
                  {product.features.sirh ? 'Gestion RH complète' : 'Non disponible'}
                </p>
              </div>
            </div>
            {product.features.multiposting && (
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-green-900">Multiposting</p>
                  <p className="text-xs text-gray-500">
                    {product.features.multipostingCount
                      ? `${product.features.multipostingCount}+ jobboards`
                      : 'Diffusion multi-sites'}
                  </p>
                </div>
              </div>
            )}
            {product.features.aiMatching && (
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-amber-900">IA / Matching</p>
                  <p className="text-xs text-gray-500">Intelligence artificielle</p>
                </div>
              </div>
            )}
            <div
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 ${
                product.features.mobileApp
                  ? 'border-teal-200 bg-teal-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  product.features.mobileApp
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {product.features.mobileApp ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <XIcon className="h-4 w-4" />
                )}
              </span>
              <div>
                <p className={`text-sm font-bold ${product.features.mobileApp ? 'text-teal-900' : 'text-gray-400'}`}>
                  App mobile
                </p>
                <p className="text-xs text-gray-500">
                  {product.features.mobileApp ? 'iOS et/ou Android' : 'Non disponible'}
                </p>
              </div>
            </div>
          </div>

          {/* Key info */}
          <div className="mt-4 grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-sm text-gray-500">{dict.products.headquarters}</span>
              <p className="flex items-center gap-1.5 font-medium">
                <CountryFlag country={product.headquarter} size="sm" />
                {product.headquarter}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">{dict.products.dataHosting}</span>
              <p className="font-medium">{product.dataHosting}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">{dict.products.rgpdCompliant}</span>
              <p className="font-medium">{product.rgpdCompliant ? dict.common.yes : dict.common.no}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">{dict.products.freeTrial}</span>
              <p className="font-medium">
                {product.pricing.freeTrial
                  ? `${dict.common.yes} (${dict.products.freeTrialDays.replace('{days}', String(product.pricing.freeTrialDays ?? '?'))})`
                  : dict.common.no}
              </p>
            </div>
          </div>

          {/* Pricing plans */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{dict.products.pricingTitle}</h2>

            {/* Engagement options */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Engagement :</span>
              {product.pricing.commitment?.map((c) => {
                const labels: Record<string, string> = {
                  monthly: 'Mois par mois',
                  annual: 'Annuel',
                  custom: 'Sur mesure',
                };
                const icons: Record<string, string> = {
                  monthly: '\u{1F4C5}',
                  annual: '\u{1F4C6}',
                  custom: '\u{1F4DD}',
                };
                return (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
                  >
                    <span>{icons[c]}</span>
                    {labels[c] ?? c}
                  </span>
                );
              })}
              {product.pricing.annualDiscount && (
                <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
                  -{product.pricing.annualDiscount} annuel
                </span>
              )}
            </div>

            {/* Plans grid */}
            {product.pricing.plans && product.pricing.plans.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.pricing.plans.map((plan, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-5 ${
                      i === 1
                        ? 'border-blue-300 bg-blue-50 ring-1 ring-blue-200'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <h3 className="text-base font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      {plan.price != null ? (
                        <p className="text-2xl font-extrabold text-gray-900">
                          {plan.price} <span className="text-sm font-medium text-gray-500">{product.pricing.currency}</span>
                          <span className="text-sm font-normal text-gray-400">
                            {product.pricing.model === 'per-user-per-month' ? ' /util. /mois' : ' /mois'}
                          </span>
                        </p>
                      ) : (
                        <p className="text-lg font-bold text-gray-600">Sur devis</p>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Ratings detail */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{dict.products.ratingOverall}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(product.ratings).map(([key, value]) => {
                const labels: Record<string, string> = {
                  overall: dict.products.ratingOverall,
                  easeOfUse: dict.products.easeOfUse,
                  features: dict.products.features,
                  support: dict.products.support,
                  valueForMoney: dict.products.valueForMoney,
                  candidateExperience: dict.products.candidateExperience,
                };
                return (
                  <div key={key} className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-3">
                    <span className="text-sm text-gray-700">{labels[key] ?? key}</span>
                    <RatingStars rating={value} size="sm" />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Rating sources & methodology */}
          <div className="mt-4 space-y-3">
            {/* Direct links to reviews */}
            <div className="flex flex-wrap gap-2">
              {RATING_SOURCES.map((src) => (
                <a
                  key={src.name}
                  href={`${src.url}${src.searchPath}${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  {locale === 'fr' ? `Voir les avis sur ${src.name}` : `See reviews on ${src.name}`}
                </a>
              ))}
            </div>

            {/* Methodology */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">Méthodologie de notation</p>
              <p className="mt-1 text-xs leading-relaxed text-amber-800">
                La <strong>note globale ({product.ratings.overall}/5)</strong> est la moyenne pondérée de 5 critères :
                Facilité d&apos;utilisation ({product.ratings.easeOfUse}), Fonctionnalités ({product.ratings.features}),
                Support client ({product.ratings.support}), Rapport qualité/prix ({product.ratings.valueForMoney})
                et Expérience candidat ({product.ratings.candidateExperience}).
              </p>
              <p className="mt-2 text-xs text-amber-700">
                {RATING_DISCLAIMER}
              </p>
            </div>
          </div>

          {/* Radar chart */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{locale === 'fr' ? 'Visualisation radar' : 'Radar Visualization'}</h2>
            <p className="mt-1 text-sm text-gray-500">{locale === 'fr' ? 'Sélectionnez les critères à afficher sur le graphique' : 'Select the criteria to display on the chart'}</p>
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
              <RadarChart
                dimensions={[
                  { key: 'overall', label: dict.products.ratingOverall, max: 5 },
                  { key: 'easeOfUse', label: dict.products.easeOfUse, max: 5 },
                  { key: 'features', label: dict.products.features, max: 5 },
                  { key: 'support', label: dict.products.support, max: 5 },
                  { key: 'valueForMoney', label: dict.products.valueForMoney, max: 5 },
                  { key: 'candidateExperience', label: dict.products.candidateExperience, max: 5 },
                ]}
                datasets={[
                  {
                    label: product.name,
                    color: '#2563eb',
                    values: { ...product.ratings },
                  },
                ]}
              />
            </div>
          </section>

          {/* Pros / Cons */}
          <section className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="font-semibold text-green-800">{dict.products.prosTitle}</h3>
              <ul className="mt-3 space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex gap-2 text-sm text-green-900">
                    <span className="text-green-600">&#10003;</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="font-semibold text-red-800">{dict.products.consTitle}</h3>
              <ul className="mt-3 space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex gap-2 text-sm text-red-900">
                    <span className="text-red-500">&#10007;</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Features */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{dict.products.featuresTitle}</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {featureEntries.map(([key, label]) => {
                const value = product.features[key as keyof typeof product.features];
                const active = typeof value === 'boolean' ? value : value !== null;
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                      active
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {active ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-400">
                        <XIcon className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <span className={`text-sm font-medium ${active ? 'text-gray-900' : 'text-gray-400'}`}>
                      {label}
                      {key === 'multiposting' && product.features.multipostingCount
                        ? ` (${product.features.multipostingCount}+ jobboards)`
                        : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Integrations */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{dict.products.integrationsTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {integrationEntries.map(([key, label]) => {
                const active = product.integrations[key as keyof typeof product.integrations];
                return (
                  <span
                    key={key}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${active ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </section>

          {/* Browser extensions */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{dict.products.browserExtensions}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { key: 'chrome' as const, label: 'Chrome', icon: '\u{1F7E2}' },
                  { key: 'edge' as const, label: 'Edge', icon: '\u{1F535}' },
                ] as const
              ).map(({ key, label, icon }) => {
                const ext = product.browserExtensions[key];
                return (
                  <div
                    key={key}
                    className={`rounded-xl border p-4 ${
                      ext.available
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{icon}</span>
                      <span className="font-semibold text-gray-900">{label}</span>
                      <span
                        className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                          ext.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {ext.available ? (locale === 'fr' ? 'Disponible' : 'Available') : (locale === 'fr' ? 'Non disponible' : 'Not available')}
                      </span>
                    </div>
                    {ext.available && (
                      <div className="mt-2 space-y-1">
                        {ext.name && (
                          <p className="text-sm text-gray-600">
                            <span className="text-gray-400">{dict.products.chromeExtension} :</span>{' '}
                            {ext.url ? (
                              <a
                                href={ext.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-700 hover:underline"
                              >
                                {ext.name}
                              </a>
                            ) : (
                              <span className="font-medium">{ext.name}</span>
                            )}
                          </p>
                        )}
                        {ext.users != null && (
                          <p className="text-sm text-gray-600">
                            <span className="text-gray-400">{dict.products.users} :</span>{' '}
                            <span className="font-semibold text-gray-900">
                              {ext.users.toLocaleString('fr-FR')}+
                            </span>
                          </p>
                        )}
                        {ext.users == null && key !== 'edge' && (
                          <p className="text-xs text-gray-400 italic">
                            Nombre d&apos;utilisateurs non communiqué
                          </p>
                        )}
                        {key === 'edge' && (
                          <p className="text-xs text-gray-400 italic">
                            Compatible via le Chrome Web Store
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-10 rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="text-lg font-semibold text-gray-900">
              {locale === 'fr' ? `Intéressé par ${product.name} ?` : `Interested in ${product.name}?`}
            </p>
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              {dict.products.visitWebsite}
            </a>
          </div>

          {/* User reviews */}
          <div className="mt-12">
            <ReviewSection productSlug={slug} productName={product.name} />
          </div>

          {/* Random suggestions */}
          <RandomSuggestions
            products={getAllProducts().map((p) => ({
              name: p.name,
              slug: p.slug,
              description: p.description,
              headquarter: p.headquarter,
              ratings: { overall: p.ratings.overall },
              pricing: { startingPrice: p.pricing.startingPrice, currency: p.pricing.currency },
            }))}
            excludeSlugs={[slug]}
          />

          <p className="mt-8 text-sm text-gray-400">
            {dict.common.lastUpdated} : {product.updatedAt}
          </p>
        </div>
      </article>
    </>
  );
}
