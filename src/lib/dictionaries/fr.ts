import type { Dictionary } from './type';

const fr: Dictionary = {
  /* ── Navigation ─────────────────────── */
  nav: {
    logiciels: 'Logiciels ATS',
    comparateur: 'Comparateur',
    parProfil: 'Par profil',
    questionnaire: 'Questionnaire',
    guides: 'Guides',
    aPropos: 'À propos',
    comparer: 'Comparer',
    favoris: 'Mes favoris',
    contact: 'Contact',
    accompagnement: 'Accompagnement',
    glossaire: 'Glossaire',
    etudes: 'Études & Stats',
    changelog: 'Actualités ATS',
    comparerLeAts: 'Comparer les ATS',
  },

  /* ── Common UI ──────────────────────── */
  common: {
    skipToContent: 'Aller au contenu principal',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    searchPlaceholder: 'Rechercher un ATS, un guide...',
    closeSearch: 'Fermer la recherche',
    noResults: 'Aucun résultat trouvé',
    home: 'Accueil',
    readMore: 'Lire la suite',
    viewDetails: 'Voir la fiche complète',
    seeAll: 'Voir tout',
    exportPdf: 'Exporter en PDF',
    save: 'Sauvegarder',
    saved: 'Sauvegardé',
    loading: 'Chargement...',
    perMonth: '/mois',
    onQuote: 'Sur devis',
    free: 'Gratuit',
    yes: 'Oui',
    no: 'Non',
    lastUpdated: 'Dernière mise à jour',
    source: 'Source',
    resultsCount: '{count} résultat{count, plural, one {} other {s}}',
    mobileMenu: 'Menu',
    siteDescription:
      'Comparatif indépendant des meilleurs logiciels de recrutement en France.',
  },

  /* ── Homepage ───────────────────────── */
  home: {
    title: 'Trouvez le meilleur ATS pour votre recrutement',
    subtitle:
      'Comparatif indépendant de {count}+ logiciels de recrutement en France. Que vous soyez indépendant, en cabinet, RH interne ou en intérim, trouvez la solution adaptée à votre profil.',
    ctaPrimary: 'Trouver mon ATS idéal',
    ctaSecondary: 'Comparer les ATS',
  },

  /* ── Products ───────────────────────── */
  products: {
    pageTitle: 'Comparatif des logiciels ATS en France',
    pageDescription:
      '{count} solutions de recrutement comparées. Trouvez celle qui correspond à vos besoins en termes de fonctionnalités, prix et profil.',
    filters: 'Filtres',
    noProducts: 'Aucun logiciel ne correspond à vos critères.',
    ratingOverall: 'Note globale',
    easeOfUse: "Facilité d'utilisation",
    features: 'Fonctionnalités',
    support: 'Support client',
    valueForMoney: 'Rapport qualité/prix',
    candidateExperience: 'Expérience candidat',
    prosTitle: 'Points forts',
    consTitle: 'Points faibles',
    featuresTitle: 'Fonctionnalités',
    integrationsTitle: 'Intégrations',
    pricingTitle: 'Tarifs et engagements',
    freeTrial: 'Essai gratuit',
    freeTrialDays: '{days} jours',
    headquarters: 'Siège',
    dataHosting: 'Hébergement',
    rgpdCompliant: 'Conforme RGPD',
    founded: 'Fondé en',
    browserExtensions: 'Extensions navigateur',
    chromeExtension: 'Extension Chrome',
    users: 'utilisateurs',
    visitWebsite: 'Visiter le site',
    priceEstimator: 'Estimateur de prix',
    priceEstimatorDesc:
      'Estimez le coût mensuel en fonction du nombre d\'utilisateurs.',
    userCount: 'Nombre d\'utilisateurs',
    priceDisclaimer:
      'Prix indicatifs basés sur les tarifs publics. Contactez les éditeurs pour un devis précis.',
    flatRate: 'Forfait fixe',
    perJobPosted: 'Par offre publiée',
    suggestionsTitle: 'Ces ATS pourraient aussi vous intéresser',
  },

  /* ── Comparator ─────────────────────── */
  comparator: {
    pageTitle: 'Comparateur ATS',
    pageDescription:
      'Comparez les logiciels de recrutement côte à côte : notes, fonctionnalités, intégrations et tarifs.',
    selectAts: 'Sélectionnez un ATS',
    selectPlaceholder: '— Choisir un ATS —',
    optional: 'optionnel',
    visualComparison: 'Comparaison visuelle',
    selectAtLeast: 'Sélectionnez au moins 2 ATS pour lancer la comparaison.',
    selectUpTo: 'Vous pouvez comparer jusqu\'à 3 ATS simultanément.',
    fullProfile: 'Voir la fiche complète',
    bestScore: 'Meilleur score',
    criterion: 'Critère',
  },

  /* ── Favorites ──────────────────────── */
  favorites: {
    pageTitle: 'Mes ATS favoris',
    pageDescription:
      'Retrouvez ici les logiciels de recrutement que vous avez sauvegardés.',
    noFavorites: 'Aucun favori pour le moment',
    noFavoritesDesc:
      'Cliquez sur le cœur d\'un ATS pour le sauvegarder ici.',
    discoverAts: 'Découvrir les ATS',
    compareFavorites: 'Comparer mes favoris',
    savedCount: '{count} logiciel{count, plural, one {} other {s}} sauvegardé{count, plural, one {} other {s}}',
    addToFavorites: 'Ajouter {name} aux favoris',
    removeFromFavorites: 'Retirer {name} des favoris',
  },

  /* ── Reviews ────────────────────────── */
  reviews: {
    title: 'Avis utilisateurs',
    leaveReview: 'Laisser un avis',
    cancel: 'Annuler',
    yourName: 'Votre nom',
    yourRole: 'Votre fonction',
    rating: 'Note',
    yourReview: 'Votre avis',
    submit: 'Publier l\'avis',
    thankYou: 'Merci pour votre avis sur {name} !',
    noReviews: 'Aucun avis pour le moment. Soyez le premier à donner votre avis !',
    averageRating: 'Note moyenne : {rating}/5',
    reviewCount: '{count} avis',
  },

  /* ── Contact ────────────────────────── */
  contact: {
    pageTitle: 'Contactez-nous',
    pageDescription:
      'Une question, une suggestion ou une demande d\'accompagnement ? Nous sommes à votre écoute.',
    name: 'Votre nom',
    email: 'Votre email',
    subject: 'Sujet',
    message: 'Message',
    send: 'Envoyer le message',
    quickAccess: 'Accès rapide',
    responseTime: 'Temps de réponse',
    responseTimeDesc:
      'Nous répondons généralement sous 48 heures ouvrées. Pour les demandes urgentes, précisez-le dans votre message.',
    subjectOptions: {
      general: 'Question générale',
      accompagnement: 'Demande d\'accompagnement',
      editeur: 'Référencement d\'un ATS',
      correction: 'Correction d\'information',
      partenariat: 'Partenariat',
      autre: 'Autre',
    },
  },

  /* ── Guides ─────────────────────────── */
  guides: {
    pageTitle: 'Guides du recrutement',
    pageDescription:
      'Guides pratiques pour choisir, configurer et optimiser votre logiciel de recrutement.',
    readingTime: '{minutes} min de lecture',
    relatedGuides: 'Guides associés',
  },

  /* ── Profiles ───────────────────────── */
  profiles: {
    bestAtsFor: 'Les meilleurs ATS pour {profile}',
    keyNeeds: 'Besoins clés',
    recommendedAts: 'ATS recommandés',
    matchScore: 'Score de compatibilité',
  },

  /* ── Questionnaire ──────────────────── */
  questionnaire: {
    pageTitle: 'Trouvez votre ATS idéal',
    next: 'Suivant',
    previous: 'Précédent',
    seeResults: 'Voir les résultats',
    restart: 'Recommencer',
    yourResults: 'Vos résultats',
    matchPercent: '{percent}% de compatibilité',
  },

  /* ── Glossary ───────────────────────── */
  glossary: {
    pageTitle: 'Glossaire du recrutement',
    pageDescription:
      'Définitions des termes clés du recrutement et des logiciels ATS : parsing, multidiffusion, scoring, vivier, etc.',
    termCount: '{count} terme{count, plural, one {} other {s}} défini{count, plural, one {} other {s}}',
    seeAlso: 'Voir aussi',
  },

  /* ── Changelog ──────────────────────── */
  changelog: {
    pageTitle: 'Actualités ATS',
    pageDescription:
      'Suivez les dernières actualités des logiciels de recrutement : nouvelles fonctionnalités, mises à jour tarifaires, intégrations et acquisitions.',
    types: {
      feature: 'Nouvelle fonctionnalité',
      pricing: 'Mise à jour tarifaire',
      integration: 'Nouvelle intégration',
      acquisition: 'Acquisition',
      update: 'Mise à jour',
    },
  },

  /* ── Stats ──────────────────────────── */
  stats: {
    pageTitle: 'Études & Statistiques',
    pageDescription:
      'Chiffres clés et statistiques du marché des logiciels de recrutement en France et dans le monde.',
    ourDatabase: 'Notre base de données',
    atsAnalyzed: 'ATS analysés',
    avgRating: 'Note moyenne',
    frenchSolutions: 'Solutions françaises',
    rgpdCompliant: 'Conformes RGPD',
    withFreeTrial: 'Avec essai gratuit',
    worldMarket: 'Le marché mondial',
    recruitmentNumbers: 'Le recrutement en chiffres',
    techCompliance: 'Conformité technique',
  },

  /* ── Footer ─────────────────────────── */
  footer: {
    description:
      'Comparatif indépendant des meilleurs logiciels de recrutement en France.',
    navigation: 'Navigation',
    resources: 'Ressources',
    legal: 'Mentions légales',
    rssFeed: 'Flux RSS',
    allRightsReserved: 'Tous droits réservés.',
  },

  /* ── Accessibility / SEO ────────────── */
  a11y: {
    ratingLabel: 'Note : {rating} sur 5',
    breadcrumb: 'Fil d\'Ariane',
    mainNavigation: 'Navigation principale',
    footerLabel: 'Pied de page',
    alphabeticNav: 'Navigation alphabétique',
  },
};

export default fr;
