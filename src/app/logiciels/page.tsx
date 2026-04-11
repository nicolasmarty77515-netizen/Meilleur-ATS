import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/mdx';
import { generateProductListSchema } from '@/lib/schema';
import ProductGrid from '@/components/ProductGrid';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Tous les logiciels ATS - Comparatif complet',
  description:
    'Liste complete et comparatif de tous les logiciels de recrutement (ATS) disponibles en France. Filtrez par prix, fonctionnalites et profil.',
  alternates: { canonical: '/logiciels' },
};

export default function LogicielsPage() {
  const products = getAllProducts().sort((a, b) => b.ratings.overall - a.ratings.overall);

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
          <h1 className="text-3xl font-bold text-gray-900">
            Comparatif des logiciels ATS en France
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            {products.length} solutions de recrutement comparees. Trouvez celle qui correspond a
            vos besoins en termes de fonctionnalites, prix et profil.
          </p>

          <div className="mt-10">
            <ProductGrid products={products} />
          </div>

          {products.length === 0 && (
            <p className="mt-10 text-center text-gray-500">
              Les fiches logiciels sont en cours de creation. Revenez bientot !
            </p>
          )}
        </div>
      </section>
    </>
  );
}
