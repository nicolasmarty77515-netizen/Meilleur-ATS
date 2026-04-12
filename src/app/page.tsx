import Link from 'next/link';
import { getAllProducts } from '@/lib/mdx';
import ProfileSelector from '@/components/ProfileSelector';
import HomeShowcase from '@/components/HomeShowcase';
import FAQ from '@/components/FAQ';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateFAQSchema } from '@/lib/schema';

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
      "Un ATS fait gagner en moyenne 40% de temps sur le processus de recrutement par rapport à un suivi manuel. Il élimine les doublons, assure la conformité RGPD (conservation des données, consentement), centralise les échanges avec les candidats et permet la multidiffusion automatique sur les jobboards. Au-delà de 5 recrutements par an, un ATS devient quasiment indispensable.",
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
      "Les prix varient considérablement : de 0 EUR (versions gratuites limitées comme Zoho Recruit ou Breezy HR) à plus de 1 000 EUR/mois pour les solutions entreprise (Taleo, SuccessFactors). Les tarifs les plus courants pour les PME se situent entre 50 et 300 EUR/mois. Certains facturent par utilisateur (Nicoka, Bullhorn à ~90-130 EUR/utilisateur/mois), d'autres au forfait (Taleez à 99 EUR/mois, Flatchr à 49 EUR/mois). Les solutions enterprise sont généralement sur devis.",
  },
  {
    question: 'Existe-t-il des ATS gratuits ?',
    answer:
      "Oui, plusieurs solutions proposent des plans gratuits : Zoho Recruit (version Free limitée), Breezy HR (version Bootstrap gratuite), et certains ATS open-source. Ces plans sont toutefois limités en nombre d'offres actives, d'utilisateurs ou de fonctionnalités. Pour un usage professionnel régulier, un plan payant entre 25 et 100 EUR/mois est recommandé.",
  },
  // --- RGPD ---
  {
    question: 'Les ATS sont-ils conformes au RGPD ?',
    answer:
      "La plupart des ATS du marché français sont conformes au RGPD. Les solutions françaises (Taleez, Flatchr, Beetween, Nicoka, Softy, etc.) hébergent généralement les données en France et offrent des fonctionnalités natives : consentement candidat, suppression automatique après 24 mois, droit à l'oubli, registre des traitements. Pour les solutions américaines, vérifiez l'hébergement EU et les clauses contractuelles.",
  },
  {
    question: 'Quelles sont les obligations RGPD pour un recruteur ?',
    answer:
      "Les principales obligations sont : recueillir le consentement des candidats avant de stocker leurs données, ne pas conserver les CV plus de 2 ans sans renouvellement du consentement, permettre l'exercice du droit à l'oubli, minimiser les données collectées et tenir un registre des traitements. Un bon ATS automatise la plupart de ces obligations.",
  },
  // --- Fonctionnalités ---
  {
    question: "Qu'est-ce que le multiposting ?",
    answer:
      "Le multiposting (ou multidiffusion) permet de publier une offre d'emploi sur plusieurs jobboards simultanément depuis votre ATS, au lieu de les saisir manuellement site par site. Les meilleurs ATS proposent 100 à 200+ jobboards intégrés (Indeed, LinkedIn, Apec, France Travail, HelloWork, Welcome to the Jungle...). Cela fait gagner un temps considérable et assure une cohérence des annonces.",
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
      "Un recruteur indépendant a besoin d'un ATS abordable combinant ATS + CRM pour gérer à la fois ses candidats et ses clients. Les solutions recommandées sont : Nicoka (ATS+CRM complet), Jarvi (moderne, conçu pour les agences), Zoho Recruit (plan gratuit), Manatal (IA à petit prix) et Jobaffinity (français, adapté aux petites structures). Budget type : 50 à 130 EUR/mois.",
  },
  {
    question: 'Quel ATS pour un cabinet de recrutement ?',
    answer:
      "Un cabinet de recrutement recherche un ATS avec CRM intégré, gestion multi-consultants, vivier partagé et reporting client. Les leaders du marché sont : Bullhorn (référence mondiale du staffing), Nicoka (français, ATS+CRM), Jarvi (ATS+CRM moderne), Beetween (personnalisable) et Jobaffinity (spécialisé cabinets). Le budget moyen pour un cabinet de 5-10 consultants est de 500 à 1 500 EUR/mois.",
  },
  {
    question: 'Quel ATS pour un service RH interne ?',
    answer:
      "Les RH internes privilégient la simplicité, le multiposting, la marque employeur et l'intégration SIRH. Les solutions les mieux adaptées sont : Taleez (intuitif, support réactif), Flatchr (collaboratif, 160+ jobboards), We Recruit (excellent rapport qualité/prix), Teamtailor (marque employeur premium) et Recruitee (collaboratif). Pour les grands groupes : Cegid Talentsoft, Greenhouse ou SAP SuccessFactors.",
  },
  // --- Comparaisons ---
  {
    question: 'ATS français ou international : lequel choisir ?',
    answer:
      "Les ATS français (Taleez, Flatchr, Nicoka, Beetween...) offrent l'avantage d'un support en français, de l'hébergement en France, de la conformité RGPD native et des intégrations avec les jobboards français (Apec, France Travail, HelloWork). Les ATS internationaux (Greenhouse, Lever, Workable...) sont souvent plus riches en fonctionnalités mais le support est en anglais et les données peuvent être hébergées hors UE.",
  },
];

export default function HomePage() {
  const allProducts = getAllProducts();

  return (
    <>
      <SchemaMarkup schema={generateFAQSchema(homeFAQ)} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Trouvez le <span className="text-blue-700">meilleur ATS</span> pour votre recrutement
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Comparatif indépendant de {allProducts.length}+ logiciels de recrutement en France.
            Que vous soyez indépendant, en cabinet, RH interne ou en intérim, trouvez la solution
            adaptée à votre profil.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/questionnaire"
              className="rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Trouver mon ATS idéal
            </Link>
            <Link
              href="/logiciels"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Comparer les ATS
            </Link>
          </div>
        </div>
      </section>

      {/* Profile Selector */}
      <ProfileSelector />

      {/* Products showcase with search + random order */}
      <HomeShowcase products={allProducts} />

      {/* FAQ */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FAQ items={homeFAQ} />
      </div>
    </>
  );
}
