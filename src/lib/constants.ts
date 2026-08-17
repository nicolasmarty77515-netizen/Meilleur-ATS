import type { ProfileSlug } from './types';

export const SITE_NAME = 'Meilleur ATS';
export const SITE_URL = 'https://meilleur-ats.com';
export const SITE_DESCRIPTION =
  'Comparatif indépendant des meilleurs logiciels de recrutement (ATS) en France. Trouvez la solution adaptée à votre profil : cabinet, indépendant, RH, intérim.';

/** Adresse de contact publique (mentions légales, confidentialité, formulaire).
 *  ⚠️ Doit pointer vers une boîte qui RÉPOND : créer la boîte ou une redirection chez OVH. */
export const SITE_CONTACT_EMAIL = 'contact@meilleur-ats.com';

// ---------------------------------------------------------------------------
// Publication phases (progressive SEO launch)
// ---------------------------------------------------------------------------
// Phase 1 = "vitrine"      : ~30 pages (homepage + 10 ATS phares + 5 guides + pages info)
// Phase 2 = "expansion"    : + tous les ATS + profils + comparatifs principaux
// Phase 3 = "profondeur"   : tout (406 pages)
//
// Pages hors phase => rendues mais en <meta robots="noindex"> et exclues du sitemap.
// Change la valeur + push => Vercel redéploie en ~90s.
//
// 📅 CALENDRIER DE LANCEMENT
//   🚀 Phase 1 : 19 avril 2026 (lancement sur meilleur-ats.com)
//   ⏰ Phase 2 : ~10 mai 2026   (J+21 — un agent Claude programmé te le rappellera)
//   ⏰ Phase 3 : ~15 juin 2026  (J+57 — un agent Claude programmé te le rappellera)
//
// Critères "feu vert" avant de passer à la phase suivante :
//   - Les pages de la phase courante sont indexées par Google (vérif via Search Console)
//   - Pas d'erreurs crawl / sitemap dans GSC
//   - Au moins 3-5 backlinks naturels pointent déjà vers le site
// ---------------------------------------------------------------------------
export type PublicationPhase = 1 | 2 | 3;
export const PUBLICATION_PHASE: PublicationPhase = 3;

/** Slugs ATS publiés en phase 1 (têtes de gondole). */
export const PHASE_1_PRODUCT_SLUGS = new Set<string>([
  'nicoka',
  'ashby',
  'greenhouse',
  'lever',
  'workable',
  'recruitee',
  'teamtailor',
  'softgarden',
  'jobaffinity',
  'cegid-talent',
]);

/** Slugs guides publiés en phase 1. */
export const PHASE_1_GUIDE_SLUGS = new Set<string>([
  'comment-choisir-ats',
  'ats-cabinet-recrutement',
  'ats-recruteur-independant',
  'meilleur-ats-ia',
  'multiposting-guide',
]);

// ---------------------------------------------------------------------------
// Pages comparatives « X vs Y » indexées (sélection « France-first »)
// ---------------------------------------------------------------------------
// On GÉNÈRE et on INDEXE uniquement les paires entre ces ATS (C(n,2) paires).
// Objectif : éviter les milliers de pages auto-générées « thin » (risque de
// pénalité Google « scaled content »). Les autres paires restent en noindex.
//
// ⚠️ Nicoka est volontairement ABSENT : aucune paire nicoka-vs-X n'est indexée
//    pour l'instant (revue prévue septembre 2026). Liste 100 % éditable.
// ---------------------------------------------------------------------------
export const INDEXED_VERSUS_ATS: string[] = [
  // Géants mondiaux à forte recherche en France
  'workday', 'personio', 'bamboohr', 'greenhouse', 'lever',
  'teamtailor', 'smartrecruiters', 'workable', 'recruitee', 'ashby', 'bullhorn',
  // Éditeurs français (meilleur ROI SEO, moins concurrentiels)
  'lucca', 'flatchr', 'taleez', 'cegid-talent', 'beetween',
  'digital-recruiters', 'cleverconnect', 'softy', 'jobaffinity',
];

// ---------------------------------------------------------------------------
// Comparatifs RÉDIGÉS indexés en phase 3 (hors allowlist France-first)
// ---------------------------------------------------------------------------
// Ces paires ont un fichier MDX écrit à la main dans src/content/comparatifs/ :
// contenu éditorial propre, donc aucun risque « scaled content » à les indexer.
// Elles restent noindex en phase 1-2, et passent en index dès la phase 3.
//
// ⚠️ Les 57 comparatifs « Nicoka vs X » sont volontairement ABSENTS : Nicoka
//    appartient à l'éditeur du site, indexer ces pages sur un comparatif
//    présenté comme indépendant pose une question de conflit d'intérêt.
//    Revue prévue septembre 2026 (cf. INDEXED_VERSUS_ATS ci-dessus).
// ---------------------------------------------------------------------------
export const INDEXED_VERSUS_WRITTEN_SLUGS = new Set<string>([
  'altays-vs-cegid-talent',
  'bamboohr-vs-breezy-hr',
  'beetween-vs-we-recruit',
  'breezy-hr-vs-workable',
  'bullhorn-vs-eolia',
  'bullhorn-vs-gestmax',
  'bullhorn-vs-jarvi',
  'bullhorn-vs-neostaff',
  'bullhorn-vs-zoho-recruit',
  'cegid-talent-vs-successfactors',
  'eolia-vs-gestmax',
  'eqwa-vs-flatchr',
  'eqwa-vs-taleez',
  'flatchr-vs-we-recruit',
  'gestmax-vs-neostaff',
  'jarvi-vs-jobaffinity',
  'jarvi-vs-manatal',
  'jarvi-vs-zoho-recruit',
  'layan-vs-manatal',
  'layan-vs-taleez',
  'manatal-vs-workable',
  'successfactors-vs-taleo',
  'taleez-vs-we-recruit',
]);

/** Slug canonique d'une paire comparative (ordre alphabétique → 1 seule URL/paire). */
export function versusSlug(a: string, b: string): string {
  return [a, b].sort().join('-vs-');
}

/** Toutes les paires indexées = combinaisons des INDEXED_VERSUS_ATS (slugs canoniques). */
export const INDEXED_VERSUS_SLUGS: ReadonlySet<string> = (() => {
  const set = new Set<string>();
  const ats = [...INDEXED_VERSUS_ATS].sort();
  for (let i = 0; i < ats.length; i++) {
    for (let j = i + 1; j < ats.length; j++) {
      set.add(versusSlug(ats[i], ats[j]));
    }
  }
  return set;
})();

export type IndexableType = 'home' | 'page' | 'product' | 'guide' | 'versus' | 'profile';

/** True si la page doit être indexée par Google en fonction de PUBLICATION_PHASE. */
export function isIndexable(type: IndexableType, slug?: string): boolean {
  // Pages statiques info : toujours indexées
  if (type === 'home' || type === 'page') return true;
  // Comparatifs « X vs Y » : allowlist France-first (toutes phases), + comparatifs
  // rédigés à la main à partir de la phase 3.
  if (type === 'versus') {
    if (!slug) return false;
    if (INDEXED_VERSUS_SLUGS.has(slug)) return true;
    return PUBLICATION_PHASE >= 3 && INDEXED_VERSUS_WRITTEN_SLUGS.has(slug);
  }
  // Phase 3 : tout le reste indexé
  if (PUBLICATION_PHASE >= 3) return true;

  if (type === 'product') {
    if (PUBLICATION_PHASE >= 2) return true;
    return slug ? PHASE_1_PRODUCT_SLUGS.has(slug) : false;
  }
  if (type === 'guide') {
    if (PUBLICATION_PHASE >= 2) return true;
    return slug ? PHASE_1_GUIDE_SLUGS.has(slug) : false;
  }
  if (type === 'profile') return PUBLICATION_PHASE >= 2;

  return false;
}

/** Metadata helper : retourne { robots: { index: false } } quand la page n'est pas encore publiée. */
export function getIndexableMetadata(type: IndexableType, slug?: string) {
  return isIndexable(type, slug)
    ? undefined
    : { robots: { index: false, follow: true } };
}

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
  Croatie: 'hr',
  Luxembourg: 'lu',
  Australie: 'au',
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
