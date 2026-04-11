import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A propos - Notre methodologie',
  description:
    'Decouvrez la methodologie de Meilleur ATS pour evaluer et comparer les logiciels de recrutement en France.',
  alternates: { canonical: '/a-propos' },
};

export default function AProposPage() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">A propos de Meilleur ATS</h1>

        <div className="prose prose-blue mt-8 max-w-none">
          <p>
            <strong>Meilleur ATS</strong> est un comparatif independant des logiciels de
            recrutement (ATS) disponibles en France. Notre mission : aider chaque professionnel
            du recrutement a trouver l&apos;outil adapte a ses besoins.
          </p>

          <h2>Notre methodologie</h2>
          <p>Chaque logiciel est evalue selon 6 criteres :</p>
          <ul>
            <li><strong>Facilite d&apos;utilisation</strong> - Prise en main, ergonomie, courbe d&apos;apprentissage</li>
            <li><strong>Fonctionnalites</strong> - Multiposting, CRM, IA, parsing CV, reporting</li>
            <li><strong>Support client</strong> - Reactivite, qualite, disponibilite en francais</li>
            <li><strong>Rapport qualite/prix</strong> - Tarification, transparence, options incluses</li>
            <li><strong>Experience candidat</strong> - Page carriere, processus de candidature, communication</li>
            <li><strong>Conformite RGPD</strong> - Hebergement des donnees, consentement, droit a l&apos;oubli</li>
          </ul>

          <h2>Pourquoi par profil ?</h2>
          <p>
            Un recruteur independant n&apos;a pas les memes besoins qu&apos;un cabinet de 50
            consultants ou qu&apos;une direction RH. C&apos;est pourquoi nous segmentons nos
            recommandations par profil : independant, sourceur, chasseur de tetes, cabinet,
            interim, collectif, RH interne et consultant.
          </p>

          <h2>Independance</h2>
          <p>
            Nos evaluations sont basees sur des tests reels, des retours utilisateurs et une
            analyse approfondie de chaque solution. Nous ne sommes pas sponsorises par les
            editeurs evalues.
          </p>
        </div>
      </div>
    </section>
  );
}
