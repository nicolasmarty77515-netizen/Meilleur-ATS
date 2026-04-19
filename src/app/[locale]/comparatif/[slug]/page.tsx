import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/LocaleLink';
import {
  getComparativeBySlug,
  getComparativeSlugs,
  getProductBySlug,
  getAllProducts,
} from '@/lib/mdx';
import { generateComparisonSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { FEATURE_LABELS, getIndexableMetadata } from '@/lib/constants';
import { getDictionary, type Locale } from '@/lib/i18n';
import RandomSuggestions from '@/components/RandomSuggestions';
import RatingStars from '@/components/RatingStars';
import RadarChart from '@/components/RadarChart';
import CountryFlag from '@/components/CountryFlag';
import Breadcrumb from '@/components/Breadcrumb';
import ExportPDF from '@/components/ExportPDF';
import { CheckIcon, MinusIcon } from '@/components/Icons';
import SchemaMarkup from '@/components/SchemaMarkup';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) => getComparativeSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparativeBySlug(slug);
  if (!comp) return {};

  return {
    title: comp.title,
    description: comp.description,
    alternates: { canonical: `/comparatif/${slug}` },
    ...getIndexableMetadata('versus', slug),
  };
}

export default async function ComparatifPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const comp = getComparativeBySlug(slug);
  if (!comp) notFound();

  const productA = getProductBySlug(comp.productA);
  const productB = getProductBySlug(comp.productB);
  if (!productA || !productB) notFound();

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.nav.logiciels, url: '/logiciels' },
    { name: comp.title, url: `/comparatif/${slug}` },
  ]);

  const compSchema = generateComparisonSchema(comp, productA, productB);
  const featureEntries = Object.entries(FEATURE_LABELS);

  const ratingKeys = [
    { key: 'overall', label: dict.products.ratingOverall },
    { key: 'easeOfUse', label: dict.products.easeOfUse },
    { key: 'features', label: dict.products.features },
    { key: 'support', label: dict.products.support },
    { key: 'valueForMoney', label: dict.products.valueForMoney },
    { key: 'candidateExperience', label: dict.products.candidateExperience },
  ];

  return (
    <>
      <SchemaMarkup schema={[breadcrumb, compSchema]} />

      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: dict.common.home, href: '/' },
              { label: dict.nav.logiciels, href: '/logiciels' },
              { label: comp.title },
            ]}
          />

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{comp.title}</h1>
              <p className="mt-3 text-lg text-gray-600">{comp.description}</p>
            </div>
            <ExportPDF className="shrink-0" />
          </div>

          {/* Ratings comparison */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">Comparaison des notes</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{dict.comparator.criterion}</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">
                      <span className="mr-1 inline-block align-middle"><CountryFlag country={productA.headquarter} size="sm" /></span>
                      {productA.name}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">
                      <span className="mr-1 inline-block align-middle"><CountryFlag country={productB.headquarter} size="sm" /></span>
                      {productB.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ratingKeys.map(({ key, label }) => {
                    const rA = productA.ratings[key as keyof typeof productA.ratings];
                    const rB = productB.ratings[key as keyof typeof productB.ratings];
                    return (
                      <tr key={key} className="border-b border-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
                        <td className={`px-4 py-3 text-center ${rA > rB ? 'font-bold text-green-700' : ''}`}>
                          <RatingStars rating={rA} size="sm" />
                        </td>
                        <td className={`px-4 py-3 text-center ${rB > rA ? 'font-bold text-green-700' : ''}`}>
                          <RatingStars rating={rB} size="sm" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Radar comparison */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">Comparaison visuelle</h2>
            <p className="mt-1 text-sm text-gray-500">Sélectionnez les critères à comparer sur le radar</p>
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
                    label: productA.name,
                    color: '#2563eb',
                    values: { ...productA.ratings },
                  },
                  {
                    label: productB.name,
                    color: '#dc2626',
                    values: { ...productB.ratings },
                  },
                ]}
              />
            </div>
          </section>

          {/* Features comparison */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">Comparaison des fonctionnalités</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{dict.products.featuresTitle}</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">
                      <span className="mr-1 inline-block align-middle"><CountryFlag country={productA.headquarter} size="sm" /></span>
                      {productA.name}
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">
                      <span className="mr-1 inline-block align-middle"><CountryFlag country={productB.headquarter} size="sm" /></span>
                      {productB.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureEntries.map(([key, label]) => {
                    const vA = productA.features[key as keyof typeof productA.features];
                    const vB = productB.features[key as keyof typeof productB.features];
                    return (
                      <tr key={key} className="border-b border-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center">
                            {typeof vA === 'boolean' ? (
                              vA ? <CheckIcon className="h-5 w-5 text-green-500" /> : <MinusIcon className="h-5 w-5 text-gray-300" />
                            ) : (
                              <span className="font-medium text-gray-700">{vA ?? '—'}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center">
                            {typeof vB === 'boolean' ? (
                              vB ? <CheckIcon className="h-5 w-5 text-green-500" /> : <MinusIcon className="h-5 w-5 text-gray-300" />
                            ) : (
                              <span className="font-medium text-gray-700">{vB ?? '—'}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Browser extensions comparison */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">{dict.products.browserExtensions}</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Navigateur</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">{productA.name}</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">{productB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {(['chrome', 'edge'] as const).map((browser) => {
                    const extA = productA.browserExtensions[browser];
                    const extB = productB.browserExtensions[browser];
                    const labels = { chrome: 'Chrome', edge: 'Edge' };
                    return (
                      <tr key={browser} className="border-b border-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-700">{labels[browser]}</td>
                        <td className="px-4 py-3 text-center">
                          {extA.available ? (
                            <div>
                              <span className="text-green-600">&#10003;</span>
                              {extA.users != null && (
                                <span className="ml-1 text-xs text-gray-500">
                                  ({extA.users.toLocaleString(locale)}+ {dict.products.users})
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-300">&mdash;</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {extB.available ? (
                            <div>
                              <span className="text-green-600">&#10003;</span>
                              {extB.users != null && (
                                <span className="ml-1 text-xs text-gray-500">
                                  ({extB.users.toLocaleString(locale)}+ {dict.products.users})
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-300">&mdash;</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Links */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href={`/logiciels/${productA.slug}`}
              className="rounded-xl border border-gray-200 p-6 text-center transition hover:border-blue-300"
            >
              <p className="font-semibold text-gray-900">{dict.common.viewDetails} — {productA.name}</p>
            </Link>
            <Link
              href={`/logiciels/${productB.slug}`}
              className="rounded-xl border border-gray-200 p-6 text-center transition hover:border-blue-300"
            >
              <p className="font-semibold text-gray-900">{dict.common.viewDetails} — {productB.name}</p>
            </Link>
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
            excludeSlugs={[productA.slug, productB.slug]}
          />
        </div>
      </article>
    </>
  );
}
