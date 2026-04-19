import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.glossary.pageTitle,
    description: dict.glossary.pageDescription,
    alternates: { canonical: '/glossaire' },
    keywords: ['glossaire recrutement', 'definition ATS', 'lexique RH', 'termes recrutement'],
  };
}

interface Term {
  term: string;
  slug: string;
  definition: string;
  related?: string[];
}

const GLOSSARY: Term[] = [
  {
    term: 'ATS (Applicant Tracking System)',
    slug: 'ats',
    definition:
      'Logiciel de gestion des candidatures qui permet aux recruteurs de centraliser, trier et suivre les candidatures tout au long du processus de recrutement. Un ATS automatise la publication des offres, le parsing des CV, le tri des candidats et la communication avec eux.',
    related: ['CRM', 'Parsing CV', 'Multiposting'],
  },
  {
    term: 'Boolean Search (Recherche booléenne)',
    slug: 'boolean-search',
    definition:
      'Technique de recherche utilisant des opérateurs logiques (AND, OR, NOT) pour affiner les résultats. Très utilisée dans le sourcing pour trouver des profils précis sur LinkedIn, les CVthèques ou les bases de données internes.',
    related: ['Sourcing', 'Vivier de candidats'],
  },
  {
    term: 'Candidate Experience (Expérience candidat)',
    slug: 'candidate-experience',
    definition:
      'L\'ensemble des interactions et ressentis d\'un candidat tout au long du processus de recrutement, de la découverte de l\'offre à l\'onboarding. Une bonne expérience candidat renforce la marque employeur et augmente le taux d\'acceptation des offres.',
    related: ['Marque employeur', 'Onboarding', 'Page carrière'],
  },
  {
    term: 'Cooptation',
    slug: 'cooptation',
    definition:
      'Programme de recommandation interne par lequel les collaborateurs actuels recommandent des candidats de leur réseau. La cooptation génère des recrutements de meilleure qualité avec un coût d\'acquisition inférieur et un taux de rétention plus élevé.',
    related: ['Sourcing', 'Quality of Hire'],
  },
  {
    term: 'Cost-per-Hire (Coût par recrutement)',
    slug: 'cost-per-hire',
    definition:
      'Indicateur RH mesurant le coût total d\'un recrutement, incluant les frais de publication, les outils, le temps des recruteurs, les cabinets éventuels et les coûts d\'intégration. La formule : (coûts internes + coûts externes) / nombre de recrutements.',
    related: ['Time-to-Hire', 'Quality of Hire', 'KPI recrutement'],
  },
  {
    term: 'CRM (Candidate Relationship Management)',
    slug: 'crm',
    definition:
      'Outil de gestion de la relation candidat, souvent intégré à un ATS. Le CRM permet de maintenir le contact avec les candidats potentiels sur le long terme, de créer des campagnes de nurturing et de constituer un vivier de talents actif.',
    related: ['ATS', 'Vivier de candidats', 'Talent Pool'],
  },
  {
    term: 'CV Parsing (Analyse de CV)',
    slug: 'cv-parsing',
    definition:
      'Technologie d\'extraction automatique des informations contenues dans un CV (nom, coordonnées, expériences, compétences, formations). Le parsing convertit un document non structuré en données exploitables dans l\'ATS.',
    related: ['ATS', 'IA recrutement', 'Matching'],
  },
  {
    term: 'Employer Branding (Marque employeur)',
    slug: 'employer-branding',
    definition:
      'Stratégie visant à promouvoir l\'image de l\'entreprise en tant qu\'employeur attractif. Elle englobe la communication RH, la page carrière, la présence sur les réseaux sociaux, les avis collaborateurs et la culture d\'entreprise.',
    related: ['Page carrière', 'Candidate Experience'],
  },
  {
    term: 'IA Recrutement (Intelligence Artificielle)',
    slug: 'ia-recrutement',
    definition:
      'Application de l\'intelligence artificielle dans le recrutement : tri automatique des CV, matching candidat-poste, chatbots de pré-qualification, analyse prédictive de succès, génération automatique d\'offres d\'emploi.',
    related: ['CV Parsing', 'Matching', 'Scoring'],
  },
  {
    term: 'Jobboard',
    slug: 'jobboard',
    definition:
      'Site web spécialisé dans la publication d\'offres d\'emploi. Les principaux jobboards en France : Indeed, HelloWork, Apec, LinkedIn Jobs, France Travail, Welcome to the Jungle, Monster.',
    related: ['Multiposting', 'ATS'],
  },
  {
    term: 'KPI Recrutement',
    slug: 'kpi-recrutement',
    definition:
      'Indicateurs clés de performance du recrutement : time-to-hire, cost-per-hire, quality of hire, taux de transformation, taux d\'acceptation des offres, volume de candidatures par source, diversité des recrutements.',
    related: ['Time-to-Hire', 'Cost-per-Hire', 'Quality of Hire'],
  },
  {
    term: 'Matching (Mise en correspondance)',
    slug: 'matching',
    definition:
      'Algorithme qui évalue automatiquement la compatibilité entre un profil candidat et une offre d\'emploi, en comparant les compétences, l\'expérience, la localisation et d\'autres critères définis par le recruteur.',
    related: ['IA recrutement', 'Scoring', 'CV Parsing'],
  },
  {
    term: 'Multiposting (Multidiffusion)',
    slug: 'multiposting',
    definition:
      'Fonctionnalité permettant de publier simultanément une offre d\'emploi sur plusieurs jobboards et réseaux sociaux depuis un seul interface. Le multiposting fait gagner du temps et maximise la visibilité des annonces.',
    related: ['ATS', 'Jobboard'],
  },
  {
    term: 'Onboarding (Intégration)',
    slug: 'onboarding',
    definition:
      'Processus d\'accueil et d\'intégration d\'un nouveau collaborateur dans l\'entreprise. Un onboarding structuré comprend les formalités administratives, la formation, la présentation des équipes et le suivi de la période d\'essai.',
    related: ['Candidate Experience', 'SIRH'],
  },
  {
    term: 'Page carrière (Career Site)',
    slug: 'page-carriere',
    definition:
      'Section du site web de l\'entreprise dédiée au recrutement. Elle présente la marque employeur, les offres ouvertes, les avantages, les témoignages collaborateurs et un formulaire de candidature. Souvent générée par l\'ATS.',
    related: ['Employer Branding', 'ATS'],
  },
  {
    term: 'Pipeline de recrutement',
    slug: 'pipeline',
    definition:
      'Représentation visuelle des étapes du processus de recrutement (réception, présélection, entretien, test, offre). Le pipeline permet de visualiser l\'avancement des candidats à chaque étape et d\'identifier les goulots d\'étranglement.',
    related: ['ATS', 'KPI recrutement'],
  },
  {
    term: 'Quality of Hire (Qualité du recrutement)',
    slug: 'quality-of-hire',
    definition:
      'Indicateur mesurant la qualité d\'un recrutement sur le moyen terme : performance du nouvel employé, durée de rétention, satisfaction du manager, adéquation culturelle. C\'est l\'indicateur RH le plus important mais aussi le plus difficile à mesurer.',
    related: ['KPI recrutement', 'Cost-per-Hire'],
  },
  {
    term: 'RGPD (Règlement Général sur la Protection des Données)',
    slug: 'rgpd',
    definition:
      'Règlement européen encadrant le traitement des données personnelles. Dans le recrutement, le RGPD impose : consentement du candidat, durée de conservation limitée (24 mois max recommandés par la CNIL), droit d\'accès, de rectification et de suppression.',
    related: ['ATS', 'CNIL'],
  },
  {
    term: 'Scoring (Notation automatique)',
    slug: 'scoring',
    definition:
      'Attribution automatique d\'un score à chaque candidature en fonction de critères prédéfinis (compétences, expérience, formation, localisation). Le scoring aide les recruteurs à prioriser les candidatures les plus pertinentes.',
    related: ['Matching', 'IA recrutement', 'CV Parsing'],
  },
  {
    term: 'SIRH (Système d\'Information des Ressources Humaines)',
    slug: 'sirh',
    definition:
      'Suite logicielle complète couvrant l\'ensemble des processus RH : paie, gestion des temps, recrutement, formation, gestion des talents, administration du personnel. Un SIRH peut inclure un module ATS intégré.',
    related: ['ATS', 'Onboarding'],
  },
  {
    term: 'Sourcing',
    slug: 'sourcing',
    definition:
      'Démarche proactive d\'identification et d\'approche de candidats potentiels, souvent passifs (non en recherche active). Le sourcing s\'effectue via LinkedIn, les CVthèques, les réseaux sociaux, les événements et les recommandations.',
    related: ['Boolean Search', 'Vivier de candidats', 'InMail'],
  },
  {
    term: 'Talent Pool (Vivier de candidats)',
    slug: 'talent-pool',
    definition:
      'Base de données de candidats qualifiés constituée au fil du temps. Le vivier inclut des candidats précédemment rencontrés, des profils sourcés et des candidatures spontanées. Un bon ATS permet de rechercher et de réactiver ces profils pour de futurs postes.',
    related: ['CRM', 'Sourcing', 'ATS'],
  },
  {
    term: 'Time-to-Hire (Délai de recrutement)',
    slug: 'time-to-hire',
    definition:
      'Nombre de jours entre la publication d\'une offre et l\'acceptation par le candidat retenu. En France, le time-to-hire moyen est de 30 à 45 jours pour un poste cadre. Un ATS performant peut réduire ce délai de 20 à 40 %.',
    related: ['KPI recrutement', 'Cost-per-Hire', 'Pipeline'],
  },
  {
    term: 'Workflow de recrutement',
    slug: 'workflow',
    definition:
      'Séquence d\'actions automatisées dans le processus de recrutement : envoi d\'accusés de réception, relances automatiques, planification d\'entretiens, notifications aux managers, mises à jour de statut. Les workflows réduisent les tâches manuelles et accélèrent le processus.',
    related: ['ATS', 'Pipeline'],
  },
];

export default async function GlossairePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.glossary.pageTitle, url: '/glossaire' },
  ]);

  const faqItems = GLOSSARY.slice(0, 10).map((t) => ({
    question: `Qu'est-ce qu'un ${t.term.split(' (')[0]} ?`,
    answer: t.definition,
  }));

  const letters = [...new Set(GLOSSARY.map((t) => t.term[0].toUpperCase()))].sort();

  return (
    <>
      <SchemaMarkup schema={[breadcrumb, generateFAQSchema(faqItems)]} />

      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: dict.glossary.pageTitle }]} />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dict.glossary.pageTitle}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {dict.glossary.pageDescription}
            {' '}{dict.glossary.termCount.replace('{count}', String(GLOSSARY.length))}
          </p>

          {/* Letter navigation */}
          <nav className="mt-8 flex flex-wrap gap-2" aria-label={dict.a11y.alphabeticNav}>
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
              >
                {letter}
              </a>
            ))}
          </nav>

          {/* Terms */}
          <div className="mt-10 space-y-12">
            {letters.map((letter) => {
              const terms = GLOSSARY.filter((t) => t.term[0].toUpperCase() === letter);
              return (
                <section key={letter} id={`letter-${letter}`}>
                  <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      {letter}
                    </span>
                    {letter}
                  </h2>
                  <dl className="mt-4 space-y-6">
                    {terms.map((t) => (
                      <div key={t.slug} id={t.slug} className="scroll-mt-24 rounded-xl border border-gray-200 bg-white p-5">
                        <dt className="text-lg font-bold text-gray-900">{t.term}</dt>
                        <dd className="mt-2 text-gray-700 leading-relaxed">{t.definition}</dd>
                        {t.related && t.related.length > 0 && (
                          <dd className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs font-medium text-gray-500">{dict.glossary.seeAlso} :</span>
                            {t.related.map((r) => {
                              const target = GLOSSARY.find(
                                (g) => g.term.toLowerCase().includes(r.toLowerCase())
                              );
                              return target ? (
                                <a
                                  key={r}
                                  href={`#${target.slug}`}
                                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
                                >
                                  {r}
                                </a>
                              ) : (
                                <span
                                  key={r}
                                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                                >
                                  {r}
                                </span>
                              );
                            })}
                          </dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </section>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-blue-50 p-8 text-center">
            <h2 className="text-xl font-bold text-blue-900">
              Besoin d&apos;aide pour choisir votre ATS ?
            </h2>
            <p className="mt-2 text-blue-700">
              Répondez à notre questionnaire pour trouver le logiciel adapté à vos besoins.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/questionnaire"
                className="rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                {dict.nav.questionnaire}
              </Link>
              <Link
                href="/logiciels"
                className="rounded-lg border border-blue-300 px-6 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
              >
                {dict.nav.logiciels}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
