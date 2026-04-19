import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/LocaleLink';
import { PROFILES, PROFILE_SLUGS, PROFILE_KEY_TO_SLUG, getIndexableMetadata } from '@/lib/constants';
import { getProductsForProfile } from '@/lib/mdx';
import { generateProductListSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { getDictionary, type Locale } from '@/lib/i18n';
import type { ProfileSlug } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';

interface PageProps {
  params: Promise<{ locale: string; profil: string }>;
}

export async function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) => PROFILE_SLUGS.map((profil) => ({ locale, profil })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profil } = await params;
  const profile = PROFILES[profil as ProfileSlug];
  if (!profile) return {};

  return {
    title: `Meilleur ATS pour ${profile.shortName} - Comparatif 2026`,
    description: `Comparatif des meilleurs logiciels de recrutement pour ${profile.name.toLowerCase()}. ${profile.description}`,
    alternates: { canonical: `/profils/${profil}` },
    ...getIndexableMetadata('profile', profil),
  };
}

// Map profile slug to targetProfiles key
const SLUG_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(PROFILE_KEY_TO_SLUG).map(([k, v]) => [v, k])
);

export default async function ProfilPage({ params }: PageProps) {
  const { locale: localeParam, profil } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const profile = PROFILES[profil as ProfileSlug];
  if (!profile) notFound();

  const profileKey = SLUG_TO_KEY[profil] ?? profil;
  const products = getProductsForProfile(profileKey, 3);

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.nav.parProfil, url: '/profils/rh-interne' },
    { name: profile.shortName, url: `/profils/${profil}` },
  ]);

  const listSchema = generateProductListSchema(
    products,
    `Meilleurs ATS pour ${profile.shortName}`,
    profile.description,
    `/profils/${profil}`
  );

  return (
    <>
      <SchemaMarkup schema={[breadcrumb, listSchema]} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: dict.common.home, href: '/' },
              { label: dict.nav.parProfil, href: '/profils/rh-interne' },
              { label: profile.shortName },
            ]}
          />

          {/* Header */}
          <div className="max-w-3xl">
            <span className="text-5xl">{profile.icon}</span>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              {dict.profiles.bestAtsFor.replace('{profile}', profile.name.toLowerCase())}
            </h1>
            <p className="mt-3 text-lg text-gray-600">{profile.description}</p>
          </div>

          {/* Key needs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.keyNeeds.map((need) => (
              <span
                key={need}
                className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
              >
                {need}
              </span>
            ))}
          </div>

          {/* Products */}
          <h2 className="mt-12 text-2xl font-bold text-gray-900">
            {dict.profiles.recommendedAts}
          </h2>

          {products.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">
              Les recommandations pour ce profil arrivent bientôt.
            </p>
          )}

          {/* Other profiles */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900">Autres profils</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {PROFILE_SLUGS.filter((s) => s !== profil).map((s) => (
                <Link
                  key={s}
                  href={`/profils/${s}`}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  {PROFILES[s].icon} {PROFILES[s].shortName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
