export interface Dictionary {
  /* ── Navigation ─────────────────────── */
  nav: {
    logiciels: string;
    comparateur: string;
    parProfil: string;
    questionnaire: string;
    guides: string;
    aPropos: string;
    comparer: string;
    favoris: string;
    contact: string;
    accompagnement: string;
    glossaire: string;
    etudes: string;
    changelog: string;
    comparerLeAts: string;
  };

  /* ── Common UI ──────────────────────── */
  common: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    darkMode: string;
    lightMode: string;
    searchPlaceholder: string;
    closeSearch: string;
    noResults: string;
    home: string;
    readMore: string;
    viewDetails: string;
    seeAll: string;
    exportPdf: string;
    save: string;
    saved: string;
    loading: string;
    perMonth: string;
    onQuote: string;
    free: string;
    yes: string;
    no: string;
    lastUpdated: string;
    source: string;
    resultsCount: string;
    mobileMenu: string;
    siteDescription: string;
  };

  /* ── Homepage ───────────────────────── */
  home: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  /* ── Products ───────────────────────── */
  products: {
    pageTitle: string;
    pageDescription: string;
    filters: string;
    noProducts: string;
    ratingOverall: string;
    easeOfUse: string;
    features: string;
    support: string;
    valueForMoney: string;
    candidateExperience: string;
    prosTitle: string;
    consTitle: string;
    featuresTitle: string;
    integrationsTitle: string;
    pricingTitle: string;
    freeTrial: string;
    freeTrialDays: string;
    headquarters: string;
    dataHosting: string;
    rgpdCompliant: string;
    founded: string;
    browserExtensions: string;
    chromeExtension: string;
    users: string;
    visitWebsite: string;
    priceEstimator: string;
    priceEstimatorDesc: string;
    userCount: string;
    priceDisclaimer: string;
    flatRate: string;
    perJobPosted: string;
    suggestionsTitle: string;
  };

  /* ── Comparator ─────────────────────── */
  comparator: {
    pageTitle: string;
    pageDescription: string;
    selectAts: string;
    selectPlaceholder: string;
    optional: string;
    visualComparison: string;
    selectAtLeast: string;
    selectUpTo: string;
    fullProfile: string;
    bestScore: string;
    criterion: string;
  };

  /* ── Favorites ──────────────────────── */
  favorites: {
    pageTitle: string;
    pageDescription: string;
    noFavorites: string;
    noFavoritesDesc: string;
    discoverAts: string;
    compareFavorites: string;
    savedCount: string;
    addToFavorites: string;
    removeFromFavorites: string;
  };

  /* ── Reviews ────────────────────────── */
  reviews: {
    title: string;
    leaveReview: string;
    cancel: string;
    yourName: string;
    yourRole: string;
    rating: string;
    yourReview: string;
    submit: string;
    thankYou: string;
    noReviews: string;
    averageRating: string;
    reviewCount: string;
  };

  /* ── Contact ────────────────────────── */
  contact: {
    pageTitle: string;
    pageDescription: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    quickAccess: string;
    responseTime: string;
    responseTimeDesc: string;
    subjectOptions: {
      general: string;
      accompagnement: string;
      editeur: string;
      correction: string;
      partenariat: string;
      autre: string;
    };
  };

  /* ── Guides ─────────────────────────── */
  guides: {
    pageTitle: string;
    pageDescription: string;
    readingTime: string;
    relatedGuides: string;
  };

  /* ── Profiles ───────────────────────── */
  profiles: {
    bestAtsFor: string;
    keyNeeds: string;
    recommendedAts: string;
    matchScore: string;
  };

  /* ── Questionnaire ──────────────────── */
  questionnaire: {
    pageTitle: string;
    next: string;
    previous: string;
    seeResults: string;
    restart: string;
    yourResults: string;
    matchPercent: string;
  };

  /* ── Glossary ───────────────────────── */
  glossary: {
    pageTitle: string;
    pageDescription: string;
    termCount: string;
    seeAlso: string;
  };

  /* ── Changelog ──────────────────────── */
  changelog: {
    pageTitle: string;
    pageDescription: string;
    types: {
      feature: string;
      pricing: string;
      integration: string;
      acquisition: string;
      update: string;
    };
  };

  /* ── Stats ──────────────────────────── */
  stats: {
    pageTitle: string;
    pageDescription: string;
    ourDatabase: string;
    atsAnalyzed: string;
    avgRating: string;
    frenchSolutions: string;
    rgpdCompliant: string;
    withFreeTrial: string;
    worldMarket: string;
    recruitmentNumbers: string;
    techCompliance: string;
  };

  /* ── Footer ─────────────────────────── */
  footer: {
    description: string;
    navigation: string;
    resources: string;
    legal: string;
    rssFeed: string;
    allRightsReserved: string;
  };

  /* ── Accessibility / SEO ────────────── */
  a11y: {
    ratingLabel: string;
    breadcrumb: string;
    mainNavigation: string;
    footerLabel: string;
    alphabeticNav: string;
  };
}
