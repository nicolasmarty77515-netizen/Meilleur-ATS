import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/mdx';
import { generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Questionnaire from '@/components/Questionnaire';

export const metadata: Metadata = {
  title: 'Questionnaire - Trouvez l\'ATS ideal pour votre activite',
  description:
    'Repondez a 5 questions pour decouvrir les meilleurs logiciels de recrutement (ATS) adaptes a votre profil, votre budget et vos besoins.',
  alternates: { canonical: '/questionnaire' },
};

export default function QuestionnairePage() {
  const allProducts = getAllProducts();

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Questionnaire', url: '/questionnaire' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700">
              Accueil
            </Link>
            {' / '}
            <span className="text-gray-900">Questionnaire</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trouvez votre <span className="text-blue-700">ATS ideal</span> en 5 questions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Repondez a quelques questions sur votre activite et vos besoins. Nous vous
            recommanderons les solutions les plus adaptees parmi {allProducts.length} logiciels
            analyses.
          </p>
        </div>
      </section>

      <section className="py-10">
        <Questionnaire products={allProducts} />
      </section>
    </>
  );
}
