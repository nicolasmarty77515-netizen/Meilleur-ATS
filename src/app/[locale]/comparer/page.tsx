import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/mdx';
import { generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import ComparatorClient from '@/components/ComparatorClient';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.comparator.pageTitle,
    description: dict.comparator.pageDescription,
    alternates: { canonical: '/comparer' },
  };
}

export default async function ComparerPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const products = getAllProducts().sort((a, b) => a.name.localeCompare(b.name));

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.comparator.pageTitle, url: '/comparer' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <div className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: dict.comparator.pageTitle }]} />

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {dict.comparator.pageTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {dict.comparator.pageDescription}
            </p>
          </div>

          <div className="mt-10">
            <ComparatorClient products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
