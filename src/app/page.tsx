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
    question: 'Pourquoi utiliser un ATS plutot que des fichiers Excel ?',
    answer:
      "Un ATS fait gagner en moyenne 40% de temps sur le processus de recrutement par rapport a un suivi manuel. Il elimine les doublons, assure la conformite RGPD (conservation des donnees, consentement), centralise les echanges avec les candidats et permet la multidiffusion automatique sur les jobboards. Au-dela de 5 recrutements par an, un ATS devient quasiment indispensable.",
  },
  {
    question: 'Comment choisir le bon ATS pour mon activite ?',
    answer:
      "Le choix depend de votre profil (cabinet, independant, RH interne, interim...), de votre volume de recrutement, de votre budget et de vos besoins specifiques (CRM, multiposting, IA, integrations). Les criteres cles sont : la facilite de prise en main, le rapport qualite/prix, la conformite RGPD, la qualite du support et les integrations disponibles. Notre comparatif segmente les solutions par profil pour vous aider.",
  },
  // --- Prix ---
  {
    question: 'Combien coute un ATS en France en 2026 ?',
    answer:
      "Les prix varient considerablement : de 0 EUR (versions gratuites limitees comme Zoho Recruit ou Breezy HR) a plus de 1 000 EUR/mois pour les solutions entreprise (Taleo, SuccessFactors). Les tarifs les plus courants pour les PME se situent entre 50 et 300 EUR/mois. Certains facturent par utilisateur (Nicoka, Bullhorn a ~90-130 EUR/utilisateur/mois), d'autres au forfait (Taleez a 99 EUR/mois, Flatchr a 49 EUR/mois). Les solutions enterprise sont generalement sur devis.",
  },
  {
    question: 'Existe-t-il des ATS gratuits ?',
    answer:
      "Oui, plusieurs solutions proposent des plans gratuits : Zoho Recruit (version Free limitee), Breezy HR (version Bootstrap gratuite), et certains ATS open-source. Ces plans sont toutefois limites en nombre d'offres actives, d'utilisateurs ou de fonctionnalites. Pour un usage professionnel regulier, un plan payant entre 25 et 100 EUR/mois est recommande.",
  },
  // --- RGPD ---
  {
    question: 'Les ATS sont-ils conformes au RGPD ?',
    answer:
      "La plupart des ATS du marche francais sont conformes au RGPD. Les solutions francaises (Taleez, Flatchr, Beetween, Nicoka, Softy, etc.) hebergent generalement les donnees en France et offrent des fonctionnalites natives : consentement candidat, suppression automatique apres 24 mois, droit a l'oubli, registre des traitements. Pour les solutions americaines, verifiez l'hebergement EU et les clauses contractuelles.",
  },
  {
    question: 'Quelles sont les obligations RGPD pour un recruteur ?',
    answer:
      "Les principales obligations sont : recueillir le consentement des candidats avant de stocker leurs donnees, ne pas conserver les CV plus de 2 ans sans renouvellement du consentement, permettre l'exercice du droit a l'oubli, minimiser les donnees collectees et tenir un registre des traitements. Un bon ATS automatise la plupart de ces obligations.",
  },
  // --- Fonctionnalites ---
  {
    question: "Qu'est-ce que le multiposting ?",
    answer:
      "Le multiposting (ou multidiffusion) permet de publier une offre d'emploi sur plusieurs jobboards simultanement depuis votre ATS, au lieu de les saisir manuellement site par site. Les meilleurs ATS proposent 100 a 200+ jobboards integres (Indeed, LinkedIn, Apec, France Travail, HelloWork, Welcome to the Jungle...). Cela fait gagner un temps considerable et assure une coherence des annonces.",
  },
  {
    question: "Qu'est-ce que le matching IA dans un ATS ?",
    answer:
      "Le matching IA (ou scoring intelligent) est une fonctionnalite qui analyse automatiquement les CV recus et les classe par pertinence par rapport a l'offre d'emploi. L'algorithme compare les competences, l'experience et les mots-cles du CV avec les criteres du poste. Des solutions comme SmartRecruiters, Layan, Manatal ou Ashby proposent un matching IA avance.",
  },
  {
    question: "Quelle est la difference entre un ATS et un CRM de recrutement ?",
    answer:
      "Un ATS gere le processus de candidature (reception, tri, suivi, entretiens), tandis qu'un CRM de recrutement gere la relation a long terme avec les candidats et les clients (nurturing, viviers, relances). Certains outils combinent les deux (Nicoka, Bullhorn, Lever, Jarvi), ce qui est indispensable pour les cabinets de recrutement et chasseurs de tetes.",
  },
  // --- Par profil ---
  {
    question: 'Quel ATS pour un recruteur independant ou freelance ?',
    answer:
      "Un recruteur independant a besoin d'un ATS abordable combinant ATS + CRM pour gerer a la fois ses candidats et ses clients. Les solutions recommandees sont : Nicoka (ATS+CRM complet), Jarvi (moderne, concu pour les agences), Zoho Recruit (plan gratuit), Manatal (IA a petit prix) et Jobaffinity (francais, adapte aux petites structures). Budget type : 50 a 130 EUR/mois.",
  },
  {
    question: 'Quel ATS pour un cabinet de recrutement ?',
    answer:
      "Un cabinet de recrutement recherche un ATS avec CRM integre, gestion multi-consultants, vivier partage et reporting client. Les leaders du marche sont : Bullhorn (reference mondiale du staffing), Nicoka (francais, ATS+CRM), Jarvi (ATS+CRM moderne), Beetween (personnalisable) et Jobaffinity (specialise cabinets). Le budget moyen pour un cabinet de 5-10 consultants est de 500 a 1 500 EUR/mois.",
  },
  {
    question: 'Quel ATS pour un service RH interne ?',
    answer:
      "Les RH internes privilegient la simplicite, le multiposting, la marque employeur et l'integration SIRH. Les solutions les mieux adaptees sont : Taleez (intuitif, support reactif), Flatchr (collaboratif, 160+ jobboards), We Recruit (excellent rapport qualite/prix), Teamtailor (marque employeur premium) et Recruitee (collaboratif). Pour les grands groupes : Cegid Talentsoft, Greenhouse ou SAP SuccessFactors.",
  },
  // --- Comparaisons ---
  {
    question: 'ATS francais ou international : lequel choisir ?',
    answer:
      "Les ATS francais (Taleez, Flatchr, Nicoka, Beetween...) offrent l'avantage d'un support en francais, de l'hebergement en France, de la conformite RGPD native et des integrations avec les jobboards francais (Apec, France Travail, HelloWork). Les ATS internationaux (Greenhouse, Lever, Workable...) sont souvent plus riches en fonctionnalites mais le support est en anglais et les donnees peuvent etre hebergees hors UE.",
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
            Comparatif independant de {allProducts.length}+ logiciels de recrutement en France.
            Que vous soyez independant, en cabinet, RH interne ou en interim, trouvez la solution
            adaptee a votre profil.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/questionnaire"
              className="rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Trouver mon ATS ideal
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
