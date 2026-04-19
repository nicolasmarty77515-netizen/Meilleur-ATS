import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { generateBreadcrumbSchema } from '@/lib/schema';
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
    title: dict.changelog.pageTitle,
    description: dict.changelog.pageDescription,
    alternates: { canonical: '/changelog' },
  };
}

interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'pricing' | 'integration' | 'acquisition' | 'update';
  products: string[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-04-10',
    title: 'Taleez lance son module d\'IA générative',
    description:
      'Taleez intègre un assistant IA capable de rédiger des offres d\'emploi, générer des questions d\'entretien et résumer les candidatures. Disponible sur tous les plans payants.',
    type: 'feature',
    products: ['taleez'],
  },
  {
    date: '2026-04-05',
    title: 'Flatchr augmente sa couverture multiposting à 120 jobboards',
    description:
      'Flatchr annonce l\'ajout de 30 nouveaux jobboards partenaires, portant son réseau de diffusion à 120 plateformes dont plusieurs jobboards sectoriels (santé, tech, BTP).',
    type: 'integration',
    products: ['flatchr'],
  },
  {
    date: '2026-03-28',
    title: 'Beetween déploie sa nouvelle page carrière personnalisable',
    description:
      'Beetween propose désormais un builder de page carrière drag-and-drop avec intégration vidéo, témoignages collaborateurs et gestion multilingue.',
    type: 'feature',
    products: ['beetween'],
  },
  {
    date: '2026-03-20',
    title: 'Recruitee revoit ses tarifs à la hausse',
    description:
      'Recruitee (par Tellent) augmente ses tarifs de 15% sur l\'ensemble de ses plans. Le plan Starter passe de 199\u20AC à 229\u20AC/mois. Les clients existants bénéficient d\'une période de transition de 6 mois.',
    type: 'pricing',
    products: ['recruitee'],
  },
  {
    date: '2026-03-15',
    title: 'SmartRecruiters acquiert une startup d\'IA de matching',
    description:
      'SmartRecruiters annonce l\'acquisition de la startup française MatchTalent, spécialisée dans le matching sémantique candidat-poste basé sur l\'IA. L\'intégration est prévue pour le Q3 2026.',
    type: 'acquisition',
    products: ['smartrecruiters'],
  },
  {
    date: '2026-03-08',
    title: 'Nicoka lance son intégration LinkedIn Recruiter',
    description:
      'Nicoka CABS s\'intègre désormais directement avec LinkedIn Recruiter, permettant l\'import automatique des profils et la synchronisation des InMails dans le CRM.',
    type: 'integration',
    products: ['nicoka'],
  },
  {
    date: '2026-03-01',
    title: 'Greenhouse obtient la certification ISO 27001',
    description:
      'Greenhouse annonce l\'obtention de la certification ISO 27001 pour la sécurité de l\'information, renforçant sa conformité aux exigences européennes.',
    type: 'update',
    products: ['greenhouse'],
  },
  {
    date: '2026-02-22',
    title: 'Softy ajoute le scoring prédictif',
    description:
      'Softy déploie un algorithme de scoring prédictif qui analyse les critères de réussite des embauches passées pour prioriser automatiquement les nouvelles candidatures.',
    type: 'feature',
    products: ['softy'],
  },
  {
    date: '2026-02-15',
    title: 'Manatal passe son offre gratuite à 15 postes ouverts',
    description:
      'Manatal élargit son plan gratuit : de 5 à 15 postes ouverts simultanément, avec parsing CV et accès API inclus. Une stratégie agressive pour gagner des parts de marché.',
    type: 'pricing',
    products: ['manatal'],
  },
  {
    date: '2026-02-08',
    title: 'Jobaffinity déploie la visioconférence intégrée',
    description:
      'Jobaffinity intègre un outil de visioconférence natif, permettant de planifier et mener des entretiens vidéo directement depuis l\'ATS sans outil tiers.',
    type: 'feature',
    products: ['jobaffinity'],
  },
  {
    date: '2026-01-30',
    title: 'We Recruit s\'intègre à France Travail Connect',
    description:
      'We Recruit propose désormais une connexion directe avec l\'API France Travail Connect pour la publication automatique des offres sur les plateformes publiques.',
    type: 'integration',
    products: ['we-recruit'],
  },
  {
    date: '2026-01-20',
    title: 'Bullhorn lance son marketplace d\'extensions',
    description:
      'Bullhorn ouvre sa marketplace officielle avec 50+ extensions partenaires couvrant les tests de personnalité, la vérification des diplômes, les contrôles de références et le reporting avancé.',
    type: 'feature',
    products: ['bullhorn'],
  },
];

export default async function ChangelogPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const typeConfig: Record<string, { label: string; color: string; icon: string }> = {
    feature: { label: dict.changelog.types.feature, color: 'bg-green-100 text-green-700', icon: '✨' },
    pricing: { label: dict.changelog.types.pricing, color: 'bg-orange-100 text-orange-700', icon: '💰' },
    integration: { label: dict.changelog.types.integration, color: 'bg-blue-100 text-blue-700', icon: '🔗' },
    acquisition: { label: dict.changelog.types.acquisition, color: 'bg-purple-100 text-purple-700', icon: '🤝' },
    update: { label: dict.changelog.types.update, color: 'bg-gray-100 text-gray-700', icon: '📋' },
  };

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.changelog.pageTitle, url: '/changelog' },
  ]);

  const dateLocale = locale === 'en' ? 'en-GB' : 'fr-FR';

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <div className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: dict.changelog.pageTitle }]} />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {dict.changelog.pageTitle}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {dict.changelog.pageDescription}
          </p>

          {/* Filter legend */}
          <div className="mt-6 flex flex-wrap gap-2">
            {Object.entries(typeConfig).map(([key, config]) => (
              <span
                key={key}
                className={`rounded-full px-3 py-1 text-xs font-medium ${config.color}`}
              >
                {config.icon} {config.label}
              </span>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-10 space-y-0">
            {CHANGELOG.map((entry, index) => {
              const config = typeConfig[entry.type];
              const dateObj = new Date(entry.date);
              return (
                <div key={index} className="relative flex gap-4 pb-8">
                  {/* Timeline line */}
                  {index < CHANGELOG.length - 1 && (
                    <div className="absolute left-[19px] top-10 h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  )}
                  {/* Dot */}
                  <div
                    className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-lg shadow-sm"
                    aria-hidden="true"
                  >
                    {config.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <time
                        dateTime={entry.date}
                        className="text-sm font-medium text-gray-500"
                      >
                        {dateObj.toLocaleDateString(dateLocale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-gray-900">{entry.title}</h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {entry.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.products.map((slug) => (
                        <Link
                          key={slug}
                          href={`/logiciels/${slug}`}
                          className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
                        >
                          {slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gray-50 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">Vous êtes éditeur ATS ?</h2>
            <p className="mt-2 text-gray-600">
              Informez-nous de vos dernières mises à jour pour apparaître dans notre fil d&apos;actualités.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
