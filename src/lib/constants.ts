import type { ProfileSlug } from './types';

export const SITE_NAME = 'Meilleur ATS';
export const SITE_URL = 'https://meilleur-ats.fr';
export const SITE_DESCRIPTION =
  'Comparatif indépendant des meilleurs logiciels de recrutement (ATS) en France. Trouvez la solution adaptée à votre profil : cabinet, indépendant, RH, intérim.';

export const PROFILES: Record<
  ProfileSlug,
  { name: string; shortName: string; icon: string; description: string; keyNeeds: string[] }
> = {
  'recruteur-independant': {
    name: 'Recruteur indépendant / Freelance',
    shortName: 'Indépendant',
    icon: '🧑‍💼',
    description:
      'Vous recrutez en solo et cherchez un outil abordable avec CRM intégré et automatisation LinkedIn.',
    keyNeeds: ['Coût bas', 'CRM + ATS', 'LinkedIn automation', 'Multiposting'],
  },
  sourceur: {
    name: 'Sourceur',
    shortName: 'Sourceur',
    icon: '🔍',
    description:
      'Vous identifiez et qualifiez des candidats. Vous avez besoin de sourcing avancé et de matching IA.',
    keyNeeds: ['LinkedIn sourcing', 'CV database', 'IA matching', 'Boolean search'],
  },
  'chasseur-de-tetes': {
    name: 'Chasseur de têtes',
    shortName: 'Chasseur',
    icon: '🎯',
    description:
      'Vous recrutez des profils cadres et dirigeants. Gestion clients et relation candidat sont vos priorités.',
    keyNeeds: ['Gestion clients (CRM)', 'Relation candidat', 'Confidentialité', 'Reporting'],
  },
  'cabinet-recrutement': {
    name: 'Cabinet de recrutement',
    shortName: 'Cabinet',
    icon: '🏢',
    description:
      'Vous gérez une équipe de consultants et plusieurs clients. Collaboration et facturation sont essentiels.',
    keyNeeds: ['Multi-utilisateurs', 'Facturation', 'Collaboration', 'Vivier candidats'],
  },
  interim: {
    name: "Agence d'intérim / Travail temporaire",
    shortName: 'Intérim',
    icon: '⏱️',
    description:
      'Vous gérez des placements à court terme avec un volume élevé. Intégration paie et gestion contractuelle sont clés.',
    keyNeeds: ['Contrats courts', 'Volume élevé', 'Intégration paie', 'Gestion contractuelle'],
  },
  'collectif-recruteurs': {
    name: 'Collectif de recruteurs',
    shortName: 'Collectif',
    icon: '👥',
    description:
      'Vous travaillez en collectif indépendant. Partage de vivier et collaboration sont vos besoins principaux.',
    keyNeeds: ['Collaboration', 'Vivier partagé', 'Workflow', 'Répartition missions'],
  },
  'rh-interne': {
    name: 'RH interne',
    shortName: 'RH interne',
    icon: '🏠',
    description:
      'Vous recrutez pour votre entreprise (PME, ETI ou grand groupe). Simplicité et intégration SIRH comptent.',
    keyNeeds: ['Multiposting', 'Simplicité', 'Intégration SIRH', 'Marque employeur'],
  },
  'consultant-recrutement': {
    name: 'Consultant en recrutement',
    shortName: 'Consultant',
    icon: '💼',
    description:
      'Vous accompagnez vos clients dans leurs recrutements. Dashboard client et reporting sont indispensables.',
    keyNeeds: ['Dashboard client', 'Reporting', 'CRM', 'Gestion multi-clients'],
  },
};

export const PROFILE_SLUGS = Object.keys(PROFILES) as ProfileSlug[];

export const FEATURE_LABELS: Record<string, string> = {
  multiposting: 'Multiposting',
  crm: 'CRM intégré',
  sirh: 'SIRH intégré',
  aiMatching: 'Matching IA',
  cvParsing: 'Parsing CV',
  careerPage: 'Page carrière',
  videoInterview: 'Entretien vidéo',
  assessments: 'Tests & évaluations',
  reporting: 'Reporting & analytics',
  api: 'API disponible',
  mobileApp: 'Application mobile',
  collaborativeHiring: 'Recrutement collaboratif',
};

export const INTEGRATION_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  indeed: 'Indeed',
  apec: 'Apec',
  poleEmploi: 'France Travail',
  welcomeToTheJungle: 'Welcome to the Jungle',
  helloWork: 'HelloWork',
};

export const PRICING_MODEL_LABELS: Record<string, string> = {
  'per-user-per-month': '/ utilisateur / mois',
  flat: '/ mois (forfait)',
  'per-job': '/ offre',
  custom: 'Sur devis',
  free: 'Gratuit',
};

/** Code ISO 2 lettres pour chaque pays (utilisé pour les images de drapeaux) */
export const COUNTRY_CODES: Record<string, string> = {
  France: 'fr',
  'Etats-Unis': 'us',
  'États-Unis': 'us',
  'United States': 'us',
  Suede: 'se',
  Suède: 'se',
  Allemagne: 'de',
  'Pays-Bas': 'nl',
  Inde: 'in',
  Thailande: 'th',
  Thaïlande: 'th',
  'Royaume-Uni': 'gb',
  Espagne: 'es',
  Canada: 'ca',
  Belgique: 'be',
  Suisse: 'ch',
};

export const RATING_SOURCES = [
  { name: 'G2', url: 'https://www.g2.com', searchPath: '/search?query=' },
  { name: 'Capterra', url: 'https://www.capterra.fr', searchPath: '/search/?query=' },
  { name: 'Trustpilot', url: 'https://www.trustpilot.com', searchPath: '/search?query=' },
];

export const RATING_DISCLAIMER =
  'Notes basées sur une synthèse éditoriale des avis publiés sur G2, Capterra et Trustpilot. Elles ne constituent pas un classement certifié. Dernière vérification à la date indiquée.';

export const PROFILE_KEY_TO_SLUG: Record<string, ProfileSlug> = {
  independant: 'recruteur-independant',
  sourceur: 'sourceur',
  chasseur: 'chasseur-de-tetes',
  cabinet: 'cabinet-recrutement',
  interim: 'interim',
  collectif: 'collectif-recruteurs',
  rhInterne: 'rh-interne',
  consultant: 'consultant-recrutement',
};
