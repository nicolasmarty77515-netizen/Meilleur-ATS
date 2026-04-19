import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { getAllGuides } from '@/lib/mdx';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import { getDictionary, type Locale } from '@/lib/i18n';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQ from '@/components/FAQ';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Accompagnement au choix d\u2019un ATS - Cabinets et agences conseil en France',
  description:
    'Annuaire des cabinets de conseil et agences qui accompagnent les entreprises dans le choix de leur ATS / logiciel de recrutement en France. Guides et ressources inclus.',
  alternates: { canonical: '/accompagnement' },
  keywords: [
    'accompagnement choix ATS',
    'cabinet conseil ATS',
    'AMOA SIRH recrutement',
    'aide au choix logiciel recrutement',
    'consultant SIRH France',
  ],
};

/* ─── Agences spécialisées ATS ────────────────────────────────── */
const atsSpecialists = [
  {
    name: 'Orhatek',
    url: 'https://www.orhatek.fr/',
    city: 'Nantes, Lille, Bordeaux',
    description:
      'Agence spécialisée dans le conseil en solutions RH avec une forte expertise sur la sélection d\u2019ATS. Accompagne de l\u2019analyse des besoins au déploiement. Travaille avec 150+ éditeurs.',
    tags: ['ATS', 'Jobboards', 'Onboarding'],
  },
  {
    name: 'RH Match',
    url: 'https://rh-match.com/',
    city: 'France',
    description:
      'Premier comparateur indépendant d\u2019ATS en France. Benchmarking gratuit : analyse vos besoins et recommande 3 à 4 solutions adaptées sous 24 h. Compare 150+ logiciels de recrutement.',
    tags: ['Comparateur ATS', 'Gratuit', 'Indépendant'],
  },
  {
    name: 'Ideuzo',
    url: 'https://ideuzo.com/',
    city: 'France (8 agences)',
    description:
      'Agence de communication RH et conseil, propose un comparateur couvrant 150+ ATS. Expertise sourcing, marque employeur et marketing RH. 1 300+ entreprises clientes en Europe.',
    tags: ['ATS', 'Marque employeur', 'Sourcing'],
  },
  {
    name: 'NexaRH',
    url: 'https://www.nexarh.com/',
    city: 'Paris, Québec',
    description:
      'Cabinet spécialisé dans la sélection de logiciels SIRH, ATS et LMS. Processus rigoureux d\u2019évaluation des éditeurs, appels d\u2019offres et feuilles de route SIRH à 3-10 ans.',
    tags: ['ATS', 'SIRH', 'LMS'],
  },
];

/* ─── Cabinets SIRH / conseil RH ──────────────────────────────── */
const sirhConsultants = [
  {
    name: 'ConvictionsRH (Mercer)',
    url: 'https://www.convictionsrh.com/',
    city: 'Paris',
    description:
      'Cabinet de conseil SIRH indépendant de référence, acquis par Mercer en 2025. Publie le « Panorama des Solutions SIRH ». Offre cahier des charges, aide au choix, AMOA et conduite du changement.',
    tags: ['SIRH', 'AMOA', 'Panorama SIRH'],
  },
  {
    name: 'HRConseil',
    url: 'https://hrconseil.com/',
    city: 'Paris, Lyon, Nantes',
    description:
      'Cabinet indépendant fondé en 2004, spécialisé en accompagnement RH et SIRH. Aide au choix, trajectoire SIRH cible et AMOA projet. 20+ ans d\u2019expérience.',
    tags: ['SIRH', 'AMOA', 'Trajectoire SIRH'],
  },
  {
    name: 'ACT-ON GROUP',
    url: 'https://actongroup.com/',
    city: 'Neuilly-sur-Seine',
    description:
      'Groupe de conseil RH et SIRH créé en 2001, 400+ consultants. Expertise SAP HR, Workday et autres plateformes. Accompagne l\u2019optimisation RH, le choix SIRH et la transformation digitale.',
    tags: ['SIRH', 'SAP', 'Workday'],
  },
  {
    name: 'Fortify (ex-Newext RH)',
    url: 'https://fortify.fr/',
    city: 'Lyon, Paris, Nantes, Montpellier',
    description:
      'Groupe conseil et intégration SIRH. La division « Fortify Advise » propose audit, schéma directeur, aide au choix SIRH, AMOA et conduite du changement. Expertise paie et GTA.',
    tags: ['SIRH', 'Paie', 'GTA'],
  },
  {
    name: 'Althéa',
    url: 'https://althea-groupe.com/',
    city: 'Issy-les-Moulineaux',
    description:
      'Cabinet de conseil en transformation digitale RH, Finance et Supply Chain. 250+ consultants dont 130 dédiés RH. Schéma directeur SIRH, aide au choix et AMOA.',
    tags: ['SIRH', 'Transformation digitale', 'AMOA'],
  },
  {
    name: 'Calexa Group',
    url: 'https://www.calexa-group.com/',
    city: 'Paris',
    description:
      'Cabinet indépendant spécialisé en gestion RH et SIRH. Accompagnement aide au choix, AMOA et conduite du changement. Organisme de formation certifié Qualiopi.',
    tags: ['SIRH', 'AMOA', 'Formation'],
  },
  {
    name: 'TalHenT',
    url: 'https://www.talhent.com/',
    city: 'France',
    description:
      'Cabinet spécialisé SIRH et transformation digitale RH. Audits SIRH, schémas directeurs, aide au choix, AMOA et AMOE. 10+ ans d\u2019expérience secteur public et privé.',
    tags: ['SIRH', 'Audit', 'Schéma directeur'],
  },
  {
    name: 'HR Path',
    url: 'https://hr-path.com/',
    city: 'Paris (20+ pays)',
    description:
      'Groupe international de conseil et solutions SIRH. Stratégie « AIR » : Advise (aide au choix), Implement (Workday, Oracle, SAP, Cegid), Run (externalisation). Présent dans 20+ pays.',
    tags: ['SIRH', 'Workday', 'International'],
  },
];

/* ─── Intégrateurs / cabinets IT avec pratique SIRH ───────────── */
const integrators = [
  {
    name: 'mc2i',
    url: 'https://experts.mc2i.fr/expertises/ressources-humaines',
    city: 'Paris',
    description:
      'Cabinet de conseil IT indépendant avec une pratique SIRH/RH dédiée. 32 ans d\u2019expérience. Digitalisation, migrations SIRH, audit RH, aide au choix et AMOA.',
    tags: ['Conseil IT', 'SIRH', 'AMOA'],
  },
  {
    name: 'Baker Tilly',
    url: 'https://www.bakertilly.fr/services/expertise-rh-sociale/digital-rh/sirh',
    city: 'Paris (réseau national)',
    description:
      'Méthodologie « Advise, Build, Run ». Pré-sélectionne 3 solutions SIRH adaptées, organise les démonstrations et accompagne le déploiement. Double expertise paie et SIRH.',
    tags: ['SIRH', 'Audit', 'Paie'],
  },
  {
    name: 'Apogea',
    url: 'https://www.apogea.fr/',
    city: 'France (14 agences)',
    description:
      'Intégrateur de logiciels de gestion (ERP, SIRH, CRM) depuis 30+ ans. 4 000 clients PME/ETI. Partenaire Sage, Cegid, Lucca, Silae.',
    tags: ['Intégrateur', 'SIRH', 'ERP'],
  },
  {
    name: 'Anderlaine (ex-SR Conseil)',
    url: 'https://www.anderlaine.com/',
    city: 'La Motte-Servolex (Savoie)',
    description:
      'Cabinet conseil SIRH et paie fondé en 1971. Indépendant des éditeurs. 2 500+ clients. Intervention modulable : aide au choix seule ou projet de bout en bout.',
    tags: ['SIRH', 'Paie', 'Indépendant'],
  },
  {
    name: 'SRHFirst',
    url: 'https://www.srhfirst.com/',
    city: 'Paris',
    description:
      'Cabinet SIRH proposant 3 offres : SRH-Étude (audit, cahier des charges, aide au choix), SRH-Déploiement (AMOA/AMOE), SRH-Support (maintenance, formation).',
    tags: ['SIRH', 'Paie', 'Support'],
  },
  {
    name: 'Syxperiane',
    url: 'https://syxperiane.com/',
    city: 'France',
    description:
      'Intégrateur ERP, CRM et SIRH depuis 2007. Aide au choix SIRH selon le niveau de maturité de l\u2019entreprise. Partenaire Lucca (SIRH) et Silae (Paie).',
    tags: ['Intégrateur', 'Lucca', 'Silae'],
  },
];

const faqItems = [
  {
    question: 'Pourquoi se faire accompagner dans le choix d\u2019un ATS ?',
    answer:
      'Le marché des ATS compte plus de 50 solutions en France. Un cabinet spécialisé vous fait gagner du temps en présélectionnant les 3-4 solutions les plus adaptées à votre profil, votre budget et vos contraintes (RGPD, intégrations, volume). L\u2019accompagnement réduit aussi le risque d\u2019un mauvais choix, dont le coût peut dépasser plusieurs dizaines de milliers d\u2019euros (migration, formation, perte de productivité).',
  },
  {
    question: 'Combien coûte un accompagnement au choix d\u2019un ATS ?',
    answer:
      'Les tarifs varient selon le périmètre : un simple benchmark / aide au choix coûte entre 3 000 et 10 000 EUR, tandis qu\u2019un accompagnement complet (cahier des charges, appel d\u2019offres, AMOA jusqu\u2019au déploiement) peut atteindre 20 000 à 50 000 EUR pour un grand groupe. Certains services comme <a href="https://rh-match.com/" target="_blank" rel="noopener noreferrer">RH Match</a> proposent un benchmarking gratuit.',
  },
  {
    question: 'Quelle est la différence entre aide au choix et AMOA ?',
    answer:
      'L\u2019<strong>aide au choix</strong> se concentre sur la phase de sélection : analyse des besoins, benchmark des solutions, démonstrations et recommandation finale. L\u2019<strong>AMOA</strong> (Assistance à Maîtrise d\u2019Ouvrage) couvre un périmètre plus large : elle inclut l\u2019aide au choix mais aussi le pilotage du déploiement, la recette, la conduite du changement et le suivi post-démarrage.',
  },
  {
    question: 'Puis-je choisir mon ATS sans accompagnement ?',
    answer:
      'Oui, c\u2019est tout à fait possible, surtout pour les petites structures. Utilisez notre <a href="/questionnaire">questionnaire</a> pour identifier les solutions adaptées à votre profil, consultez nos <a href="/guides">guides thématiques</a> et profitez des périodes d\u2019essai gratuites des éditeurs. L\u2019accompagnement est surtout recommandé pour les projets complexes (multi-sites, intégration SIRH, volumes importants).',
  },
  {
    question: 'Les cabinets listés sont-ils indépendants des éditeurs ?',
    answer:
      'La majorité des cabinets listés se positionnent comme indépendants, c\u2019est-à-dire qu\u2019ils ne revendent pas de licences logicielles et sont rémunérés uniquement par leurs clients. Certains intégrateurs ont des partenariats privilégiés avec des éditeurs (Workday, SAP, Cegid...), ce qui est indiqué dans leur description. Nous vous recommandons de vérifier ce point lors de votre premier échange.',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Guide: 'bg-blue-100 text-blue-700',
  Réglementation: 'bg-red-100 text-red-700',
  'Comparatif fonctionnel': 'bg-orange-100 text-orange-700',
};

export default async function AccompagnementPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const guides = getAllGuides();

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.nav.accompagnement, url: '/accompagnement' },
  ]);

  const totalReadingTime = guides.reduce((sum, g) => sum + g.readingTime, 0);

  return (
    <>
      <SchemaMarkup schema={[breadcrumb, generateFAQSchema(faqItems)]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700">{dict.common.home}</Link>
            {' / '}
            <span className="text-gray-900">{dict.nav.accompagnement}</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Se faire accompagner dans le{' '}
            <span className="text-blue-700">choix de son ATS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Annuaire des cabinets de conseil, agences et intégrateurs qui aident les
            entreprises à choisir et déployer leur logiciel de recrutement en France.
            Retrouvez aussi tous nos guides pour faire votre choix en autonomie.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#agences"
              className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Voir les agences
            </a>
            <a
              href="#guides"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            >
              Consulter les guides
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 1 : Spécialistes ATS ──────────────────────────── */}
      <section id="agences" className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Spécialistes de l&apos;accompagnement ATS
          </h2>
          <p className="mt-2 text-gray-600">
            Ces agences sont spécialisées dans le conseil et la comparaison de logiciels
            de recrutement (ATS).
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {atsSpecialists.map((a) => (
              <AgencyCard key={a.name} agency={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2 : Cabinets SIRH ─────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Cabinets de conseil SIRH
          </h2>
          <p className="mt-2 text-gray-600">
            Ces cabinets accompagnent les entreprises sur l&apos;ensemble de leur stratégie
            SIRH, incluant la sélection d&apos;un ATS dans un projet plus large.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {sirhConsultants.map((a) => (
              <AgencyCard key={a.name} agency={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 : Intégrateurs ──────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Intégrateurs et cabinets IT avec pratique SIRH
          </h2>
          <p className="mt-2 text-gray-600">
            Ces acteurs combinent conseil et intégration technique pour déployer votre
            solution de recrutement.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {integrators.map((a) => (
              <AgencyCard key={a.name} agency={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 : Guides existants ──────────────────────────── */}
      <section id="guides" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Nos guides pour choisir votre ATS
              </h2>
              <p className="mt-2 text-gray-600">
                {guides.length} guides &middot; {totalReadingTime} min de lecture au total
              </p>
            </div>
            <Link
              href="/guides"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              {dict.common.seeAll} &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
              >
                <span
                  className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${CATEGORY_COLORS[g.category] ?? 'bg-gray-100 text-gray-700'}`}
                >
                  {g.category}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                  {g.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-xs text-gray-500">
                  {g.description}
                </p>
                <p className="mt-3 text-xs text-gray-400">{g.readingTime} min de lecture</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA questionnaire ─────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Vous préférez choisir en autonomie ?
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Notre questionnaire interactif analyse votre profil et vos besoins pour
              recommander les ATS les plus adaptés, en moins de 2 minutes.
            </p>
            <Link
              href="/questionnaire"
              className="mt-5 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Trouver mon ATS idéal
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FAQ items={faqItems} title="Questions fréquentes sur l&apos;accompagnement" />
      </div>
    </>
  );
}

/* ── Composant carte agence ───────────────────────────────────── */
interface Agency {
  name: string;
  url: string;
  city: string;
  description: string;
  tags: string[];
}

function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <a
      href={agency.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
          {agency.name}
        </h3>
        <svg
          className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </div>
      <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {agency.city}
      </p>
      <p className="mt-3 flex-1 text-sm text-gray-600">{agency.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {agency.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
