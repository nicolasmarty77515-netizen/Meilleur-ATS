import type { Dictionary } from './type';

const en: Dictionary = {
  /* ── Navigation ─────────────────────── */
  nav: {
    logiciels: 'ATS Software',
    comparateur: 'Comparator',
    parProfil: 'By Profile',
    questionnaire: 'Quiz',
    guides: 'Guides',
    aPropos: 'About',
    comparer: 'Compare',
    favoris: 'Favorites',
    contact: 'Contact',
    accompagnement: 'Support & Consulting',
    glossaire: 'Glossary',
    etudes: 'Studies',
    changelog: 'Changelog',
    comparerLeAts: 'Compare ATS',
  },

  /* ── Common UI ──────────────────────── */
  common: {
    skipToContent: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    searchPlaceholder: 'Search for an ATS, guide, feature...',
    closeSearch: 'Close search',
    noResults: 'No results found.',
    home: 'Home',
    readMore: 'Read more',
    viewDetails: 'View details',
    seeAll: 'See all',
    exportPdf: 'Export as PDF',
    save: 'Save',
    saved: 'Saved',
    loading: 'Loading...',
    perMonth: '/month',
    onQuote: 'On quote',
    free: 'Free',
    yes: 'Yes',
    no: 'No',
    lastUpdated: 'Last updated',
    source: 'Source',
    resultsCount: '{count} results',
    mobileMenu: 'Menu',
    siteDescription:
      'Compare the best Applicant Tracking Systems (ATS) in France. Independent reviews, detailed comparisons, and guides to choose the right recruitment software.',
  },

  /* ── Homepage ───────────────────────── */
  home: {
    title: 'Find the best ATS for your business',
    subtitle:
      'Compare {count} applicant tracking systems with independent reviews and detailed analysis.',
    ctaPrimary: 'Compare ATS',
    ctaSecondary: 'Take the quiz',
  },

  /* ── Products ───────────────────────── */
  products: {
    pageTitle: 'ATS Software Comparison in France',
    pageDescription:
      'Discover and compare the best applicant tracking systems available in France. Ratings, pricing, features, and user reviews.',
    filters: 'Filters',
    noProducts: 'No software matches your criteria.',
    ratingOverall: 'Overall Rating',
    easeOfUse: 'Ease of Use',
    features: 'Features',
    support: 'Support',
    valueForMoney: 'Value for Money',
    candidateExperience: 'Candidate Experience',
    prosTitle: 'Pros',
    consTitle: 'Cons',
    featuresTitle: 'Features',
    integrationsTitle: 'Integrations',
    pricingTitle: 'Pricing',
    freeTrial: 'Free Trial',
    freeTrialDays: '{days}-day free trial',
    headquarters: 'Headquarters',
    dataHosting: 'Data Hosting',
    rgpdCompliant: 'GDPR Compliant',
    founded: 'Founded',
    browserExtensions: 'Browser Extensions',
    chromeExtension: 'Chrome Extension',
    users: 'Users',
    visitWebsite: 'Visit website',
    priceEstimator: 'Price Estimator',
    priceEstimatorDesc:
      'Estimate the monthly cost based on your team size and needs.',
    userCount: 'Number of users',
    priceDisclaimer:
      'Prices are estimates based on publicly available information. Contact the vendor for an accurate quote.',
    flatRate: 'Flat rate',
    perJobPosted: 'Per job posted',
    suggestionsTitle: 'You might also like',
  },

  /* ── Comparator ─────────────────────── */
  comparator: {
    pageTitle: 'ATS Comparator',
    pageDescription:
      'Compare applicant tracking systems side by side. Select up to 4 ATS to compare their features, ratings, and pricing.',
    selectAts: 'Select an ATS',
    selectPlaceholder: 'Choose an ATS...',
    optional: 'Optional',
    visualComparison: 'Visual Comparison',
    selectAtLeast: 'Select at least 2 ATS to start comparing',
    selectUpTo: 'Select up to {max} ATS to compare',
    fullProfile: 'Full profile',
    bestScore: 'Best score',
    criterion: 'Criterion',
  },

  /* ── Favorites ──────────────────────── */
  favorites: {
    pageTitle: 'My Favorites',
    pageDescription:
      'Your saved ATS selection. Compare your favorites side by side.',
    noFavorites: 'No favorites yet',
    noFavoritesDesc:
      'Browse our ATS catalog and save the ones that interest you.',
    discoverAts: 'Discover ATS software',
    compareFavorites: 'Compare my favorites',
    savedCount: '{count} saved',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
  },

  /* ── Reviews ────────────────────────── */
  reviews: {
    title: 'User Reviews',
    leaveReview: 'Leave a review',
    cancel: 'Cancel',
    yourName: 'Your name',
    yourRole: 'Your role',
    rating: 'Rating',
    yourReview: 'Your review',
    submit: 'Submit',
    thankYou: 'Thank you for your review!',
    noReviews: 'No reviews yet. Be the first to share your experience!',
    averageRating: 'Average rating',
    reviewCount: '{count} reviews',
  },

  /* ── Contact ────────────────────────── */
  contact: {
    pageTitle: 'Contact Us',
    pageDescription:
      'Have a question or suggestion? Get in touch with our team.',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    quickAccess: 'Quick Access',
    responseTime: 'Response Time',
    responseTimeDesc: 'We typically respond within 48 hours.',
    subjectOptions: {
      general: 'General inquiry',
      accompagnement: 'ATS selection support',
      editeur: 'I am a software vendor',
      correction: 'Report an error',
      partenariat: 'Partnership',
      autre: 'Other',
    },
  },

  /* ── Guides ─────────────────────────── */
  guides: {
    pageTitle: 'Recruitment & ATS Guides',
    pageDescription:
      'In-depth guides to help you choose and get the most out of your applicant tracking system.',
    readingTime: '{minutes} min read',
    relatedGuides: 'Related Guides',
  },

  /* ── Profiles ───────────────────────── */
  profiles: {
    bestAtsFor: 'Best ATS for {profile}',
    keyNeeds: 'Key Needs',
    recommendedAts: 'Recommended ATS',
    matchScore: 'Match score',
  },

  /* ── Questionnaire ──────────────────── */
  questionnaire: {
    pageTitle: 'Find your ideal ATS',
    next: 'Next',
    previous: 'Previous',
    seeResults: 'See results',
    restart: 'Start over',
    yourResults: 'Your Results',
    matchPercent: '{percent}% match',
  },

  /* ── Glossary ───────────────────────── */
  glossary: {
    pageTitle: 'Recruitment Glossary',
    pageDescription:
      'All the key terms and acronyms used in recruitment and applicant tracking, explained simply.',
    termCount: '{count} terms',
    seeAlso: 'See also',
  },

  /* ── Changelog ──────────────────────── */
  changelog: {
    pageTitle: 'ATS News & Updates',
    pageDescription:
      'Stay up to date with the latest ATS product updates, new features, pricing changes, and industry news.',
    types: {
      feature: 'New Feature',
      pricing: 'Pricing Update',
      integration: 'Integration',
      acquisition: 'Acquisition',
      update: 'Update',
    },
  },

  /* ── Stats ──────────────────────────── */
  stats: {
    pageTitle: 'ATS Market Statistics',
    pageDescription:
      'Key figures and trends for the applicant tracking system market in France and worldwide.',
    ourDatabase: 'Our Database',
    atsAnalyzed: 'ATS analyzed',
    avgRating: 'Average rating',
    frenchSolutions: 'French solutions',
    rgpdCompliant: 'GDPR compliant',
    withFreeTrial: 'With free trial',
    worldMarket: 'World Market',
    recruitmentNumbers: 'Recruitment in Numbers',
    techCompliance: 'Technology & Compliance',
  },

  /* ── Footer ─────────────────────────── */
  footer: {
    description:
      'The independent guide to choosing the best applicant tracking system for your recruitment needs.',
    navigation: 'Navigation',
    resources: 'Resources',
    legal: 'Legal',
    rssFeed: 'RSS Feed',
    allRightsReserved: 'All rights reserved.',
  },

  /* ── Accessibility / SEO ────────────── */
  a11y: {
    ratingLabel: '{rating} out of 5 stars',
    breadcrumb: 'Breadcrumb',
    mainNavigation: 'Main Navigation',
    footerLabel: 'Footer',
    alphabeticNav: 'Alphabetical navigation',
  },
};

export default en;
