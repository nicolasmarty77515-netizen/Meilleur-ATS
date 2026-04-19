import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'À propos - Notre méthodologie',
  description:
    'Découvrez la méthodologie de Meilleur ATS pour évaluer et comparer les logiciels de recrutement en France.',
  alternates: { canonical: '/a-propos' },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AProposPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{dict.nav.aPropos} — Meilleur ATS</h1>

        <div className="prose prose-blue mt-8 max-w-none">
          <p>
            <strong>Meilleur ATS</strong> est un comparatif indépendant des logiciels de
            recrutement (ATS) disponibles en France. Notre mission : aider chaque professionnel
            du recrutement à trouver l&apos;outil adapté à ses besoins.
          </p>

          <h2>Notre méthodologie</h2>
          <p>Chaque logiciel est évalué selon 6 critères :</p>
          <ul>
            <li><strong>Facilité d&apos;utilisation</strong> - Prise en main, ergonomie, courbe d&apos;apprentissage</li>
            <li><strong>Fonctionnalités</strong> - Multiposting, CRM, IA, parsing CV, reporting</li>
            <li><strong>Support client</strong> - Réactivité, qualité, disponibilité en français</li>
            <li><strong>Rapport qualité/prix</strong> - Tarification, transparence, options incluses</li>
            <li><strong>Expérience candidat</strong> - Page carrière, processus de candidature, communication</li>
            <li><strong>Conformité RGPD</strong> - Hébergement des données, consentement, droit à l&apos;oubli</li>
          </ul>

          <h2>Pourquoi par profil ?</h2>
          <p>
            Un recruteur indépendant n&apos;a pas les mêmes besoins qu&apos;un cabinet de 50
            consultants ou qu&apos;une direction RH. C&apos;est pourquoi nous segmentons nos
            recommandations par profil : indépendant, sourceur, chasseur de têtes, cabinet,
            intérim, collectif, RH interne et consultant.
          </p>

          <h2>Indépendance</h2>
          <p>
            Nos évaluations sont basées sur des tests réels, des retours utilisateurs et une
            analyse approfondie de chaque solution. Nous ne sommes pas sponsorisés par les
            éditeurs évalués.
          </p>
        </div>
      </div>
    </section>
  );
}
