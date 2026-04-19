import type { Metadata } from 'next';
import { getVisibleProducts } from '@/lib/mdx';
import { generateProductListSchema } from '@/lib/schema';
import ProductGrid from '@/components/ProductGrid';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import PriceEstimator from '@/components/PriceEstimator';
import { getDictionary, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Tous les logiciels ATS - Comparatif complet',
  description:
    'Liste complète et comparatif de tous les logiciels de recrutement (ATS) disponibles en France. Filtrez par prix, fonctionnalités et profil.',
  alternates: { canonical: '/logiciels' },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LogicielsPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const products = getVisibleProducts().sort((a, b) => b.ratings.overall - a.ratings.overall);

  const schema = generateProductListSchema(
    products,
    'Tous les logiciels ATS en France',
    'Comparatif complet des logiciels de recrutement disponibles en France.',
    '/logiciels'
  );

  return (
    <>
      <SchemaMarkup schema={schema} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: dict.nav.logiciels }]} />

          <h1 className="text-3xl font-bold text-gray-900">
            {dict.products.pageTitle}
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            {dict.products.pageDescription.replace('{count}', String(products.length))}
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <ProductGrid products={products} />
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <PriceEstimator products={products} />
              </div>
            </aside>
          </div>

          {/* Mobile price estimator */}
          <div className="mt-10 lg:hidden">
            <PriceEstimator products={products} />
          </div>

          {products.length === 0 && (
            <p className="mt-10 text-center text-gray-500">
              {dict.products.noProducts}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
