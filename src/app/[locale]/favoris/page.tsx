import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/mdx';
import { generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import FavoritesPageClient from '@/components/FavoritesPageClient';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.favorites.pageTitle,
    description: dict.favorites.pageDescription,
    alternates: { canonical: '/favoris' },
  };
}

export default async function FavorisPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const products = getAllProducts();

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.favorites.pageTitle, url: '/favoris' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <div className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: dict.favorites.pageTitle }]} />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dict.favorites.pageTitle}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {dict.favorites.pageDescription}
          </p>

          <div className="mt-8">
            <FavoritesPageClient products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
