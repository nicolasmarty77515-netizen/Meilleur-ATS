import Link from '@/components/LocaleLink';
import { getVisibleProducts } from '@/lib/mdx';
import ProfileSelector from '@/components/ProfileSelector';
import HomeShowcase from '@/components/HomeShowcase';
import FAQ from '@/components/FAQ';
import SchemaMarkup from '@/components/SchemaMarkup';
import ScrollReveal from '@/components/ScrollReveal';
import { generateFAQSchema } from '@/lib/schema';
import { getDictionary, type Locale } from '@/lib/i18n';

const homeFAQ = [
  // --- General ---
  {
    question: "Qu'est-ce qu'un ATS (Applicant Tracking System) ?",
    answer:
      "Un ATS est un logiciel de gestion des candidatures qui permet aux recruteurs de centraliser, trier et suivre les candidatures tout au long du processus de recrutement. Il automatise la diffusion d'offres sur les jobboards, le tri de CV par parsing et IA, et la communication avec les candidats. En France, on parle aussi de logiciel de recrutement ou de gestion des candidatures.",
  },
  {
    question: 'Pourquoi utiliser un ATS plutôt que des fichiers Excel ?',
    answer:
      'Un ATS fait gagner en moyenne <a href="https://www.selectsoftwarereviews.com/blog/applicant-tracking-system-statistics" target="_blank" rel="noopener noreferrer">40 % de temps sur le processus de recrutement</a> par rapport à un suivi manuel (source : <a href="https://www.selectsoftwarereviews.com/blog/applicant-tracking-system-statistics" target="_blank" rel="noopener noreferrer">Select Software Reviews, Applicant Tracking System Statistics 2025</a>). Il élimine les doublons, assure la conformité RGPD (conservation des données, consentement), centralise les échanges avec les candidats et permet la multidiffusion automatique sur les jobboards. Au-delà de 5 recrutements par an, un ATS devient quasiment indispensable.',
  },
  {
    question: 'Comment choisir le bon ATS pour mon activité ?',
    answer:
      "Le choix dépend de votre profil (cabinet, indépendant, RH interne, intérim...), de votre volume de recrutement, de votre budget et de vos besoins spécifiques (CRM, multiposting, IA, intégrations). Les critères clés sont : la facilité de prise en main, le rapport qualité/prix, la conformité RGPD, la qualité du support et les intégrations disponibles. Notre comparatif segmente les solutions par profil pour vous aider.",
  },
  // --- Prix ---
  {
    question: 'Combien coûte un ATS en France en 2026 ?',
    answer:
      'Les prix varient considérablement : de 0 EUR (versions gratuites comme <a href="https://www.zoho.com/recruit/pricing.html" target="_blank" rel="noopener noreferrer">Zoho Recruit Free</a>) à plus de 1 000 EUR/mois pour les solutions enterprise (<a href="https://www.oracle.com/fr/human-capital-management/taleo/" target="_blank" rel="noopener noreferrer">Taleo</a>, <a href="https://www.sap.com/france/products/hcm/talent-management.html" target="_blank" rel="noopener noreferrer">SuccessFactors</a>). Les tarifs les plus courants pour les PME se situent entre 50 et 300 EUR/mois. Certains facturent par utilisateur (<a href="/logiciels/nicoka">Nicoka</a>, <a href="/logiciels/bullhorn">Bullhorn</a> à ~90-130 EUR/utilisateur/mois), d\'autres au forfait (<a href="https://taleez.com/tarifs" target="_blank" rel="noopener noreferrer">Taleez à 99 EUR/mois</a>, <a href="https://www.flatchr.io/tarifs" target="_blank" rel="noopener noreferrer">Flatchr à 49 EUR/mois</a>). Les solutions enterprise sont généralement sur devis.',
  },
  {
    question: 'Existe-t-il des ATS gratuits ?',
    answer:
      'Oui, plusieurs solutions proposent des plans gratuits : <a href="https://www.zoho.com/recruit/pricing.html" target="_blank" rel="noopener noreferrer">Zoho Recruit (version Free)</a>, <a href="https://breezy.hr/pricing" target="_blank" rel="noopener noreferrer">Breezy HR (version Bootstrap gratuite)</a>, et certains ATS open-source. Ces plans sont toutefois limités en nombre d\'offres actives, d\'utilisateurs ou de fonctionnalités. Pour un usage professionnel régulier, un plan payant entre 25 et 100 EUR/mois est recommandé.',
  },
  // --- RGPD ---
  {
    question: 'Les ATS sont-ils conformes au RGPD ?',
    answer:
      'La plupart des ATS du marché français sont conformes au RGPD. Les solutions françaises (Taleez, Flatchr, Beetween, Nicoka, Softy, etc.) hébergent généralement les données en France et offrent des fonctionnalités natives : consentement candidat, suppression automatique après <a href="https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees" target="_blank" rel="noopener noreferrer">24 mois (recommandation CNIL)</a>, droit à l\'oubli, registre des traitements. Pour les solutions américaines, vérifiez l\'hébergement EU et les clauses contractuelles.',
  },
  {
    question: 'Quelles sont les obligations RGPD pour un recruteur ?',
    answer:
      'Les principales obligations sont : recueillir le consentement des candidats avant de stocker leurs données, ne pas conserver les CV plus de <a href="https://www.cnil.fr/fr/les-durees-de-conservation-des-donnees" target="_blank" rel="noopener noreferrer">2 ans sans renouvellement du consentement (CNIL)</a>, permettre l\'exercice du droit à l\'oubli, minimiser les données collectées et tenir un registre des traitements. Un bon ATS automatise la plupart de ces obligations. Plus d\'informations sur le <a href="https://www.cnil.fr/fr/recrutement-les-bons-reflexes" target="_blank" rel="noopener noreferrer">guide recrutement de la CNIL</a>.',
  },
  // --- Fonctionnalités ---
  {
    question: "Qu'est-ce que le multiposting ?",
    answer:
      'Le multiposting (ou multidiffusion) permet de publier une offre d\'emploi sur plusieurs jobboards simultanément depuis votre ATS, au lieu de les saisir manuellement site par site. Les meilleurs ATS proposent 100 à 200+ jobboards intégrés (Indeed, LinkedIn, Apec, France Travail, HelloWork, Welcome to the Jungle...). Consultez notre <a href="/guides/multiposting-guide">guide complet du multiposting</a> et notre <a href="/logiciels">comparatif ATS</a> pour les chiffres détaillés par solution.',
  },
  {
    question: "Qu'est-ce que le matching IA dans un ATS ?",
    answer:
      "Le matching IA (ou scoring intelligent) est une fonctionnalité qui analyse automatiquement les CV reçus et les classe par pertinence par rapport à l'offre d'emploi. L'algorithme compare les compétences, l'expérience et les mots-clés du CV avec les critères du poste. Des solutions comme SmartRecruiters, Layan, Manatal ou Ashby proposent un matching IA avancé.",
  },
  {
    question: "Quelle est la différence entre un ATS et un CRM de recrutement ?",
    answer:
      "Un ATS gère le processus de candidature (réception, tri, suivi, entretiens), tandis qu'un CRM de recrutement gère la relation à long terme avec les candidats et les clients (nurturing, viviers, relances). Certains outils combinent les deux (Nicoka, Bullhorn, Lever, Jarvi), ce qui est indispensable pour les cabinets de recrutement et chasseurs de têtes.",
  },
  // --- Par profil ---
  {
    question: 'Quel ATS pour un recruteur indépendant ou freelance ?',
    answer:
      'Un recruteur indépendant a besoin d\'un ATS abordable combinant ATS + CRM pour gérer à la fois ses candidats et ses clients. Les solutions recommandées sont : <a href="/logiciels/nicoka">Nicoka</a> (ATS+CRM complet), <a href="/logiciels/jarvi">Jarvi</a> (moderne, conçu pour les agences), <a href="/logiciels/zoho-recruit">Zoho Recruit</a> (plan gratuit), <a href="/logiciels/manatal">Manatal</a> (IA à petit prix) et <a href="/logiciels/jobaffinity">Jobaffinity</a> (français, adapté aux petites structures). Budget type : 50 à 130 EUR/mois. Voir notre <a href="/guides/ats-recruteur-independant">guide dédié aux indépendants</a>.',
  },
  {
    question: 'Quel ATS pour un cabinet de recrutement ?',
    answer:
      'Un cabinet de recrutement recherche un ATS avec CRM intégré, gestion multi-consultants, vivier partagé et reporting client. Les leaders du marché sont : <a href="/logiciels/bullhorn">Bullhorn</a> (référence mondiale du staffing), <a href="/logiciels/nicoka">Nicoka</a> (français, ATS+CRM), <a href="/logiciels/jarvi">Jarvi</a> (ATS+CRM moderne), <a href="/logiciels/beetween">Beetween</a> (personnalisable) et <a href="/logiciels/jobaffinity">Jobaffinity</a> (spécialisé cabinets). Le budget moyen pour un cabinet de 5-10 consultants est de 500 à 1 500 EUR/mois selon les tarifs éditeurs.',
  },
  {
    question: 'Quel ATS pour un service RH interne ?',
    answer:
      'Les RH internes privilégient la simplicité, le multiposting, la marque employeur et l\'intégration SIRH. Les solutions les mieux adaptées sont : <a href="/logiciels/taleez">Taleez</a> (intuitif, support réactif), <a href="/logiciels/flatchr">Flatchr</a> (collaboratif, <a href="https://www.flatchr.io" target="_blank" rel="noopener noreferrer">160+ jobboards</a>), <a href="/logiciels/we-recruit">We Recruit</a> (excellent rapport qualité/prix), <a href="/logiciels/teamtailor">Teamtailor</a> (marque employeur premium) et <a href="/logiciels/recruitee">Recruitee</a> (collaboratif). Pour les grands groupes : Cegid Talentsoft, <a href="/logiciels/greenhouse">Greenhouse</a> ou SAP SuccessFactors.',
  },
  // --- Comparaisons ---
  {
    question: 'ATS français ou international : lequel choisir ?',
    answer:
      "Les ATS français (Taleez, Flatchr, Nicoka, Beetween...) offrent l'avantage d'un support en français, de l'hébergement en France, de la conformité RGPD native et des intégrations avec les jobboards français (Apec, France Travail, HelloWork). Les ATS internationaux (Greenhouse, Lever, Workable...) sont souvent plus riches en fonctionnalités mais le support est en anglais et les données peuvent être hébergées hors UE.",
  },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const allProducts = getVisibleProducts();

  return (
    <>
      <SchemaMarkup schema={generateFAQSchema(homeFAQ)} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {dict.home.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            {dict.home.subtitle.replace('{count}', String(allProducts.length))}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/questionnaire"
              className="rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              {dict.home.ctaPrimary}
            </Link>
            <Link
              href="/logiciels"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Profile Selector */}
      <ScrollReveal>
        <ProfileSelector />
      </ScrollReveal>

      {/* Products showcase with search + random order */}
      <ScrollReveal delay={100}>
        <HomeShowcase products={allProducts} />
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal delay={200}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FAQ items={homeFAQ} />
        </div>
      </ScrollReveal>
    </>
  );
}
