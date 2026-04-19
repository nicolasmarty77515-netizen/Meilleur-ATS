import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { getVisibleGuides } from '@/lib/mdx';
import { getDictionary, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Guides recrutement - Conseils et comparatifs ATS',
  description:
    'Guides pratiques pour choisir et utiliser un logiciel de recrutement (ATS). RGPD, multiposting, IA et bonnes pratiques.',
  alternates: { canonical: '/guides' },
};

const CATEGORY_COLORS: Record<string, string> = {
  Guide: 'bg-blue-100 text-blue-700',
  Réglementation: 'bg-red-100 text-red-700',
  Comparatif: 'bg-orange-100 text-orange-700',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GuidesPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const guides = getVisibleGuides();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {dict.guides.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {dict.guides.pageDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 flex justify-center gap-8 text-center text-sm text-gray-500">
          <div>
            <span className="block text-2xl font-bold text-gray-900">{guides.length}</span>
            {locale === 'fr' ? 'guides publiés' : 'guides published'}
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900">
              {guides.reduce((acc, g) => acc + g.readingTime, 0)}
            </span>
            {locale === 'fr' ? 'min de lecture au total' : 'min total reading time'}
          </div>
        </div>

        {/* Guide cards */}
        <div className="mt-10 space-y-6">
          {guides.map((guide) => {
            const catColor = CATEGORY_COLORS[guide.category] ?? 'bg-gray-100 text-gray-700';
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${catColor}`}>
                      {guide.category}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
                      {guide.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {guide.description}
                    </p>
                  </div>
                  <svg
                    className="mt-6 h-5 w-5 shrink-0 text-gray-300 transition group-hover:text-blue-500"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {dict.guides.readingTime.replace('{minutes}', String(guide.readingTime))}
                  </span>
                  <span>{guide.publishedAt}</span>
                  {guide.keywords && guide.keywords.length > 0 && (
                    <div className="ml-auto hidden flex-wrap gap-1 sm:flex">
                      {guide.keywords.slice(0, 3).map((kw) => (
                        <span key={kw} className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}

          {guides.length === 0 && (
            <p className="text-center text-gray-500">{locale === 'fr' ? 'Les guides arrivent bientôt !' : 'Guides coming soon!'}</p>
          )}
        </div>
      </div>
    </section>
  );
}
