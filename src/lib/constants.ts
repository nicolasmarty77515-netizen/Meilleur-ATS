import type { ProfileSlug } from './types';

export const SITE_NAME = 'Meilleur ATS';
export const SITE_URL = 'https://meilleur-ats.fr';
export const SITE_DESCRIPTION =
  'Comparatif independant des meilleurs logiciels de recrutement (ATS) en France. Trouvez la solution adaptee a votre profil : cabinet, independant, RH, interim.';

export const PROFILES: Record<
  ProfileSlug,
  { name: string; shortName: string; icon: string; description: string; keyNeeds: string[] }
> = {
  'recruteur-independant': {
    name: 'Recruteur independant / Freelance',
    shortName: 'Independant',
    icon: '🧑‍💼',
    description:
      'Vous recrutez en solo et cherchez un outil abordable avec CRM integre et automatisation LinkedIn.',
    keyNeeds: ['Cout bas', 'CRM + ATS', 'LinkedIn automation', 'Multiposting'],
  },
  sourceur: {
    name: 'Sourceur',
    shortName: 'Sourceur',
    icon: '🔍',
    description:
      'Vous identifiez et qualifiez des candidats. Vous avez besoin de sourcing avance et de matching IA.',
    keyNeeds: ['LinkedIn sourcing', 'CV database', 'IA matching', 'Boolean search'],
  },
  'chasseur-de-tetes': {
    name: 'Chasseur de tetes',
    shortName: 'Chasseur',
    icon: '🎯',
    description:
      'Vous recrutez des profils cadres et dirigeants. Gestion clients et relation candidat sont vos priorites.',
    keyNeeds: ['Gestion clients (CRM)', 'Relation candidat', 'Confidentialite', 'Reporting'],
  },
  'cabinet-recrutement': {
    name: 'Cabinet de recrutement',
    shortName: 'Cabinet',
    icon: '🏢',
    description:
      'Vous gerez une equipe de consultants et plusieurs clients. Collaboration et facturation sont essentiels.',
    keyNeeds: ['Multi-utilisateurs', 'Facturation', 'Collaboration', 'Vivier candidats'],
  },
  interim: {
    name: "Agence d'interim / Travail temporaire",
    shortName: 'Interim',
    icon: '⏱️',
    description:
      'Vous gerez des placements a court terme avec un volume eleve. Integration paie et gestion contractuelle sont cles.',
    keyNeeds: ['Contrats courts', 'Volume eleve', 'Integration paie', 'Gestion contractuelle'],
  },
  'collectif-recruteurs': {
    name: 'Collectif de recruteurs',
    shortName: 'Collectif',
    icon: '👥',
    description:
      'Vous travaillez en collectif independant. Partage de vivier et collaboration sont vos besoins principaux.',
    keyNeeds: ['Collaboration', 'Vivier partage', 'Workflow', 'Repartition missions'],
  },
  'rh-interne': {
    name: 'RH interne',
    shortName: 'RH interne',
    icon: '🏠',
    description:
      'Vous recrutez pour votre entreprise (PME, ETI ou grand groupe). Simplicite et integration SIRH comptent.',
    keyNeeds: ['Multiposting', 'Simplicite', 'Integration SIRH', 'Marque employeur'],
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
  crm: 'CRM integre',
  sirh: 'SIRH integre',
  aiMatching: 'Matching IA',
  cvParsing: 'Parsing CV',
  careerPage: 'Page carriere',
  videoInterview: 'Entretien video',
  assessments: 'Tests & evaluations',
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

/** Code ISO 2 lettres pour chaque pays (utilise pour les images de drapeaux) */
export const COUNTRY_CODES: Record<string, string> = {
  France: 'fr',
  'Etats-Unis': 'us',
  'United States': 'us',
  Suede: 'se',
  Allemagne: 'de',
  'Pays-Bas': 'nl',
  Inde: 'in',
  Thailande: 'th',
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
  'Notes basees sur une synthese editoriale des avis publies sur G2, Capterra et Trustpilot. Elles ne constituent pas un classement certifie. Derniere verification a la date indiquee.';

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
