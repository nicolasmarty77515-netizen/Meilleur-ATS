import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { getDictionary, type Locale } from '@/lib/i18n';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQ from '@/components/FAQ';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Éditeurs ATS - Référencez votre logiciel de recrutement',
  description:
    'Vous éditez un logiciel de recrutement (ATS) ? Référencez ou mettez à jour votre solution sur Meilleur ATS et gagnez en visibilité auprès des recruteurs en France.',
  alternates: { canonical: '/editeurs' },
};

const faqItems = [
  {
    question: 'Le référencement de notre solution est-il payant ?',
    answer:
      'Non. Le référencement de base sur Meilleur ATS est entièrement gratuit. Nous évaluons chaque solution de manière indépendante, sans contrepartie financière de la part des éditeurs.',
  },
  {
    question: 'Quels types de logiciels acceptez-vous ?',
    answer:
      'Nous référençons les logiciels de suivi des candidatures (ATS), les CRM de recrutement et les plateformes de gestion du recrutement disponibles sur le marché français. La solution doit proposer une interface en français ou un support francophone.',
  },
  {
    question: 'Combien de temps prend le processus de référencement ?',
    answer:
      'Après réception de votre dossier complet, nous procédons à une évaluation approfondie sous 2 à 4 semaines. Vous recevez un retour détaillé avant la publication de la fiche.',
  },
  {
    question: 'Pouvons-nous influencer la note attribuée à notre solution ?',
    answer:
      'Non. Nos évaluations sont indépendantes et basées sur des critères objectifs. Nous ne vendons pas de meilleures positions ni de notes améliorées. Cette indépendance est essentielle à la confiance que nous accordent les recruteurs.',
  },
  {
    question: 'Comment contester une information erronée sur notre fiche ?',
    answer:
      'Si vous constatez une erreur factuelle (tarif obsolète, fonctionnalité manquante, etc.), envoyez-nous un e-mail à contact@meilleur-ats.com avec les corrections et les justificatifs. Nous mettons à jour la fiche dans les meilleurs délais.',
  },
  {
    question: 'Proposez-vous des mises en avant sponsorisées ?',
    answer:
      'Nous étudions actuellement des formats de visibilité complémentaire (encarts sponsorisés, contenus partenaires) clairement identifiés comme tels. Ces formats n\u2019affectent jamais les notes ni les classements. Contactez-nous pour en savoir plus.',
  },
];

export default async function EditeursPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: 'Éditeurs', url: '/editeurs' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700">
              {dict.common.home}
            </Link>
            {' / '}
            <span className="text-gray-900">Éditeurs</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Éditeurs de logiciels ATS :&nbsp;
            <span className="text-blue-700">gagnez en visibilité</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Meilleur ATS est le comparatif de référence pour les recruteurs en France.
            Référencez votre solution et touchez une audience qualifiée de professionnels
            du recrutement à la recherche de leur prochain outil.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#referencer"
              className="inline-flex items-center rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Référencer votre solution
            </a>
            <a
              href="#modifier"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            >
              Modifier vos informations
            </a>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <span className="block text-3xl font-bold text-blue-700">8</span>
              <span className="mt-1 text-sm text-gray-600">profils de recruteurs ciblés</span>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <span className="block text-3xl font-bold text-blue-700">100 %</span>
              <span className="mt-1 text-sm text-gray-600">indépendant et transparent</span>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <span className="block text-3xl font-bold text-blue-700">Gratuit</span>
              <span className="mt-1 text-sm text-gray-600">référencement de base offert</span>
            </div>
          </div>
        </div>
      </section>

      {/* Référencer votre solution */}
      <section id="referencer" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Référencer votre solution</h2>
          <p className="mt-4 text-gray-600">
            Pour apparaître dans notre comparatif, envoyez-nous les informations suivantes
            par e-mail. Notre équipe procédera à une évaluation complète de votre solution.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">1. Informations générales</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Nom du logiciel et URL du site
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Description courte (2-3 phrases)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Logo en haute résolution (SVG ou PNG)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Siège social et année de création
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">2. Offre et tarification</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Grille tarifaire (ou fourchette de prix)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Existence d&apos;un essai gratuit ou d&apos;une version freemium
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Profils cibles (indépendants, cabinets, ESN, etc.)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Lieu d&apos;hébergement des données
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">3. Fonctionnalités clés</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Liste des fonctionnalités principales
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Intégrations disponibles (jobboards, SIRH, etc.)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Fonctionnalités IA ou automatisation
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Support client (langues, canaux, horaires)
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">4. Accès démo</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Accès à un compte de test ou de démonstration
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Documentation technique ou guide utilisateur
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Contact d&apos;un référent pour nos questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-700">&#10003;</span>
                  Captures d&apos;écran ou vidéo de présentation
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm text-blue-800">
              <strong>Envoyez votre dossier par e-mail :</strong>{' '}
              <a
                href="mailto:contact@meilleur-ats.com?subject=Référencement ATS"
                className="font-semibold underline hover:text-blue-900"
              >
                contact@meilleur-ats.com
              </a>
              . Nous accusons réception sous 48 h et vous informons de l&apos;avancement de
              l&apos;évaluation.
            </p>
          </div>
        </div>
      </section>

      {/* Modifier vos informations */}
      <section id="modifier" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Modifier vos informations</h2>
          <p className="mt-4 text-gray-600">
            Votre solution est déjà référencée et vous souhaitez mettre à jour vos données ?
            Nous tenons à ce que chaque fiche reflète fidèlement la réalité de votre offre.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Identifiez les modifications</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Consultez votre fiche actuelle sur le site et identifiez les informations
                  à corriger ou compléter : tarifs, fonctionnalités, intégrations, captures
                  d&apos;écran, etc.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Envoyez-nous les corrections</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Adressez un e-mail à{' '}
                  <a
                    href="mailto:contact@meilleur-ats.com?subject=Mise à jour fiche ATS"
                    className="font-medium text-blue-700 underline hover:text-blue-800"
                  >
                    contact@meilleur-ats.com
                  </a>{' '}
                  en précisant le nom de votre logiciel, les champs à modifier et les nouvelles
                  valeurs avec les justificatifs si nécessaire.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Validation et publication</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Notre équipe vérifie les modifications et met à jour votre fiche sous
                  5 jours ouvrés. Vous recevez une confirmation par e-mail une fois la
                  mise à jour effective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos critères d'évaluation */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Nos critères d&apos;évaluation</h2>
          <p className="mt-4 text-gray-600">
            La transparence est au coeur de notre démarche. Voici les 6 critères sur lesquels
            chaque solution est évaluée, avec une note de 1 à 5.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titre: 'Facilité d\u2019utilisation',
                description: 'Prise en main, ergonomie de l\u2019interface et courbe d\u2019apprentissage.',
              },
              {
                titre: 'Fonctionnalités',
                description: 'Multiposting, CRM, parsing CV, IA, reporting et automatisations.',
              },
              {
                titre: 'Support client',
                description: 'Réactivité, qualité des réponses et disponibilité en français.',
              },
              {
                titre: 'Rapport qualité/prix',
                description: 'Transparence tarifaire, options incluses et coût global.',
              },
              {
                titre: 'Expérience candidat',
                description: 'Page carrière, processus de candidature et communication candidat.',
              },
              {
                titre: 'Conformité RGPD',
                description: 'Hébergement des données, consentement et droit à l\u2019oubli.',
              },
            ].map((critere) => (
              <div
                key={critere.titre}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900">{critere.titre}</h3>
                <p className="mt-2 text-sm text-gray-600">{critere.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Pour en savoir plus sur notre approche, consultez la page{' '}
            <Link href="/a-propos" className="font-medium text-blue-700 underline hover:text-blue-800">
              {dict.nav.aPropos}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FAQ items={faqItems} title="Questions fréquentes pour les éditeurs" />
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="bg-blue-700 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Prêt à référencer votre solution ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Contactez-nous dès maintenant pour rejoindre le comparatif de référence des ATS
            en France. Notre équipe vous accompagne à chaque étape.
          </p>
          <a
            href="mailto:contact@meilleur-ats.com?subject=Contact éditeur ATS"
            className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
          >
            Nous contacter
          </a>
          <p className="mt-4 text-sm text-blue-200">
            contact@meilleur-ats.com
          </p>
        </div>
      </section>
    </>
  );
}
