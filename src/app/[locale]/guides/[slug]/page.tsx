import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/LocaleLink';
import { getGuideBySlug, getGuideSlugs, getVisibleGuides, getVisibleProducts } from '@/lib/mdx';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { getIndexableMetadata } from '@/lib/constants';
import SchemaMarkup from '@/components/SchemaMarkup';
import RandomSuggestions from '@/components/RandomSuggestions';
import Breadcrumb from '@/components/Breadcrumb';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) => getGuideSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${slug}` },
    keywords: guide.keywords,
    ...getIndexableMetadata('guide', slug),
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const allGuides = getVisibleGuides().filter((g) => g.slug !== slug);

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.nav.guides, url: '/guides' },
    { name: guide.title, url: `/guides/${slug}` },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: dict.common.home, href: '/' },
              { label: dict.nav.guides, href: '/guides' },
              { label: guide.title },
            ]}
          />

          {/* Header */}
          <header className="border-b border-gray-200 pb-8">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              {guide.category}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{guide.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {dict.guides.readingTime.replace('{minutes}', String(guide.readingTime))}
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {locale === 'fr' ? `Publié le ${guide.publishedAt}` : `Published ${guide.publishedAt}`}
              </span>
              {guide.updatedAt !== guide.publishedAt && (
                <span>{dict.common.lastUpdated} {guide.updatedAt}</span>
              )}
            </div>
          </header>

          {/* Keywords */}
          {guide.keywords && guide.keywords.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {guide.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-blue prose-lg mt-10 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-6 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-4 prose-li:text-gray-700 prose-li:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />

          {/* CTA */}
          <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="text-lg font-semibold text-gray-900">
              {locale === 'fr' ? 'Besoin d\'un comparatif détaillé ?' : 'Need a detailed comparison?'}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {locale === 'fr'
                ? `Découvrez notre annuaire de ${30}+ ATS avec filtres, notes et comparaisons.`
                : `Explore our directory of ${30}+ ATS with filters, ratings and comparisons.`}
            </p>
            <Link
              href="/logiciels"
              className="mt-4 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              {locale === 'fr' ? 'Voir tous les logiciels ATS' : 'See all ATS software'}
            </Link>
          </div>

          {/* Random suggestions */}
          <RandomSuggestions
            products={getVisibleProducts().map((p) => ({
              name: p.name,
              slug: p.slug,
              description: p.description,
              headquarter: p.headquarter,
              ratings: { overall: p.ratings.overall },
              pricing: { startingPrice: p.pricing.startingPrice, currency: p.pricing.currency },
            }))}
          />

          {/* Other guides */}
          {allGuides.length > 0 && (
            <section className="mt-12 border-t border-gray-200 pt-10">
              <h2 className="text-xl font-bold text-gray-900">{dict.guides.relatedGuides}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {allGuides.slice(0, 4).map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-300 hover:shadow-sm"
                  >
                    <span className="text-xs font-medium uppercase text-blue-600">{g.category}</span>
                    <h3 className="mt-1 text-sm font-semibold text-gray-900">{g.title}</h3>
                    <p className="mt-1 text-xs text-gray-400">{g.readingTime} min</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
