import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { getAllProducts } from '@/lib/mdx';
import { generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Questionnaire from '@/components/Questionnaire';
import { getDictionary, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Questionnaire - Trouvez l\'ATS idéal pour votre activité',
  description:
    'Répondez à 5 questions pour découvrir les meilleurs logiciels de recrutement (ATS) adaptés à votre profil, votre budget et vos besoins.',
  alternates: { canonical: '/questionnaire' },
};

export default async function QuestionnairePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const allProducts = getAllProducts();

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.nav.questionnaire, url: '/questionnaire' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700">
              {dict.common.home}
            </Link>
            {' / '}
            <span className="text-gray-900">{dict.nav.questionnaire}</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {dict.questionnaire.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            {dict.home.subtitle.replace('{count}', String(allProducts.length))}
          </p>
        </div>
      </section>

      <section className="py-10">
        <Questionnaire products={allProducts} />
      </section>
    </>
  );
}
