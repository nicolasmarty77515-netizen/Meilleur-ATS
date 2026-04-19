import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { getAllProducts } from '@/lib/mdx';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.stats.pageTitle,
    description: dict.stats.pageDescription,
    alternates: { canonical: '/etudes' },
    keywords: ['statistiques recrutement', 'marche ATS', 'chiffres recrutement France'],
  };
}

interface Stat {
  value: string;
  label: string;
  source: string;
  sourceUrl: string;
}

const MARKET_STATS: Stat[] = [
  {
    value: '3,2 Mds $',
    label: 'Taille du marché mondial des ATS en 2025',
    source: 'Grand View Research',
    sourceUrl: 'https://www.grandviewresearch.com/industry-analysis/applicant-tracking-system-market',
  },
  {
    value: '6,7 %',
    label: 'Croissance annuelle du marché ATS (CAGR 2025-2030)',
    source: 'Grand View Research',
    sourceUrl: 'https://www.grandviewresearch.com/industry-analysis/applicant-tracking-system-market',
  },
  {
    value: '98 %',
    label: 'Des entreprises du Fortune 500 utilisent un ATS',
    source: 'Jobscan',
    sourceUrl: 'https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/',
  },
  {
    value: '75 %',
    label: 'Des candidatures ne sont jamais vues par un humain',
    source: 'Harvard Business Review',
    sourceUrl: 'https://hbr.org/2021/09/hidden-workers-untapped-talent',
  },
];

const RECRUITMENT_STATS: Stat[] = [
  {
    value: '36 jours',
    label: 'Délai moyen de recrutement en France',
    source: 'APEC',
    sourceUrl: 'https://corporate.apec.fr/les-etudes-apec',
  },
  {
    value: '79 %',
    label: 'Des recruteurs français utilisent au moins un outil digital',
    source: 'APEC',
    sourceUrl: 'https://corporate.apec.fr/les-etudes-apec',
  },
  {
    value: '40 %',
    label: 'De réduction du temps de recrutement grâce à un ATS',
    source: 'Select Software Reviews',
    sourceUrl: 'https://www.selectsoftwarereviews.com/buyer-guide/applicant-tracking-systems',
  },
  {
    value: '250',
    label: 'Candidatures reçues en moyenne par offre d\'emploi',
    source: 'Glassdoor',
    sourceUrl: 'https://www.glassdoor.com/blog/most-important-employer-branding-statistics/',
  },
];

const TECH_STATS: Stat[] = [
  {
    value: '67 %',
    label: 'Des entreprises prévoient d\'augmenter leur budget tech RH',
    source: 'PwC HR Tech Survey',
    sourceUrl: 'https://www.pwc.com/gx/en/issues/workforce/hr-technology-survey.html',
  },
  {
    value: '24 mois',
    label: 'Durée max de conservation des CV recommandée par la CNIL',
    source: 'CNIL',
    sourceUrl: 'https://www.cnil.fr/fr/recrutement-quelles-donnees-personnelles',
  },
  {
    value: '60 %',
    label: 'Des candidats postulent depuis un mobile',
    source: 'Appcast',
    sourceUrl: 'https://www.appcast.io/benchmarks/',
  },
  {
    value: '90 %',
    label: 'De précision du parsing CV par IA pour les champs standards',
    source: 'Evaluation interne',
    sourceUrl: '/guides/meilleur-ats-parsing-cv',
  },
];

function StatCard({ stat, sourceLabel }: { stat: Stat; sourceLabel: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md">
      <p className="text-3xl font-bold text-blue-700">{stat.value}</p>
      <p className="mt-2 text-sm font-medium text-gray-900">{stat.label}</p>
      <a
        href={stat.sourceUrl}
        target={stat.sourceUrl.startsWith('/') ? undefined : '_blank'}
        rel={stat.sourceUrl.startsWith('/') ? undefined : 'noopener noreferrer'}
        className="mt-3 inline-flex items-center gap-1 text-xs text-gray-500 transition hover:text-blue-600"
      >
        {sourceLabel} : {stat.source}
        {!stat.sourceUrl.startsWith('/') && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        )}
      </a>
    </div>
  );
}

export default async function EtudesPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const products = getAllProducts();

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.stats.pageTitle, url: '/etudes' },
  ]);

  // Compute site-level stats
  const avgRating = (products.reduce((s, p) => s + p.ratings.overall, 0) / products.length).toFixed(1);
  const withFreeTrial = products.filter((p) => p.pricing.freeTrial).length;
  const frenchMade = products.filter((p) => p.headquarter === 'France').length;
  const rgpdCompliant = products.filter((p) => p.rgpdCompliant).length;

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <div className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: dict.stats.pageTitle }]} />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dict.stats.pageTitle}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {dict.stats.pageDescription}
          </p>

          {/* Our database stats */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
            <h2 className="text-xl font-bold">{dict.stats.ourDatabase}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{products.length}</p>
                <p className="mt-1 text-sm text-blue-200">{dict.stats.atsAnalyzed}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{avgRating}/5</p>
                <p className="mt-1 text-sm text-blue-200">{dict.stats.avgRating}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{frenchMade}</p>
                <p className="mt-1 text-sm text-blue-200">{dict.stats.frenchSolutions}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{rgpdCompliant}</p>
                <p className="mt-1 text-sm text-blue-200">{dict.stats.rgpdCompliant}</p>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-blue-200">
              {withFreeTrial} {dict.stats.withFreeTrial.toLowerCase()}
            </div>
          </div>

          {/* Market Stats */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">{dict.stats.worldMarket}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {MARKET_STATS.map((stat, i) => (
                <StatCard key={i} stat={stat} sourceLabel={dict.common.source} />
              ))}
            </div>
          </section>

          {/* Recruitment Stats */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">{dict.stats.recruitmentNumbers}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {RECRUITMENT_STATS.map((stat, i) => (
                <StatCard key={i} stat={stat} sourceLabel={dict.common.source} />
              ))}
            </div>
          </section>

          {/* Tech & RGPD Stats */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">{dict.stats.techCompliance}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {TECH_STATS.map((stat, i) => (
                <StatCard key={i} stat={stat} sourceLabel={dict.common.source} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">{dict.nav.logiciels}</h3>
              <Link
                href="/logiciels"
                className="mt-4 inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                {dict.common.seeAll} →
              </Link>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">{dict.nav.guides}</h3>
              <Link
                href="/guides"
                className="mt-4 inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                {dict.common.readMore} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
