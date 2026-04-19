import { getAllProducts, getAllGuides, getAllComparatives } from '@/lib/mdx';
import { PROFILES, PROFILE_SLUGS } from '@/lib/constants';
import SearchModal from './SearchModal';

export default function GlobalSearch() {
  const products = getAllProducts();
  const guides = getAllGuides();
  const comparatives = getAllComparatives();

  const items = [
    // Products
    ...products.map((p) => ({
      type: 'logiciel' as const,
      title: p.name,
      description: p.description,
      url: `/logiciels/${p.slug}`,
      extra: `${p.headquarter} ${p.dataHosting}`,
    })),
    // Guides
    ...guides.map((g) => ({
      type: 'guide' as const,
      title: g.title,
      description: g.description,
      url: `/guides/${g.slug}`,
      extra: g.keywords?.join(' ') ?? '',
    })),
    // Comparatives
    ...comparatives.map((c) => ({
      type: 'comparatif' as const,
      title: c.title,
      description: c.description,
      url: `/comparatif/${c.slug}`,
      extra: `${c.productA} ${c.productB}`,
    })),
    // Profiles
    ...PROFILE_SLUGS.map((slug) => ({
      type: 'profil' as const,
      title: PROFILES[slug].name,
      description: PROFILES[slug].description,
      url: `/profils/${slug}`,
      extra: PROFILES[slug].keyNeeds.join(' '),
    })),
    // Questionnaire
    {
      type: 'guide' as const,
      title: 'Questionnaire - Trouvez votre ATS idéal',
      description: 'Répondez à 5 questions pour découvrir les meilleurs ATS adaptés à vos besoins.',
      url: '/questionnaire',
      extra: 'questionnaire quiz recommandation conseil accompagnement',
    },
    // Éditeurs
    {
      type: 'guide' as const,
      title: 'Éditeurs - Référencez votre logiciel ATS',
      description: 'Référencez ou mettez à jour votre solution ATS sur Meilleur ATS.',
      url: '/editeurs',
      extra: 'éditeur référencement solution logiciel vendeur partenaire',
    },
    // Accompagnement
    {
      type: 'guide' as const,
      title: 'Accompagnement au choix d\u2019un ATS',
      description: 'Cabinets de conseil, agences et intégrateurs pour vous aider à choisir votre ATS.',
      url: '/accompagnement',
      extra: 'accompagnement conseil agence cabinet AMOA SIRH aide choix intégrateur',
    },
    // Comparateur
    {
      type: 'comparatif' as const,
      title: 'Comparateur ATS interactif',
      description: 'Comparez jusqu\u2019à 3 logiciels de recrutement côte à côte.',
      url: '/comparer',
      extra: 'comparateur comparer interactif côte à côte',
    },
    // Glossaire
    {
      type: 'guide' as const,
      title: 'Glossaire du recrutement',
      description: 'Définitions des termes clés du recrutement et des logiciels ATS.',
      url: '/glossaire',
      extra: 'glossaire définition lexique termes vocabulaire',
    },
    // Études
    {
      type: 'guide' as const,
      title: 'Études & Statistiques du marché ATS',
      description: 'Chiffres clés du marché des logiciels ATS et du recrutement en France.',
      url: '/etudes',
      extra: 'statistiques chiffres études marché données',
    },
    // Changelog
    {
      type: 'guide' as const,
      title: 'Actualités des logiciels ATS',
      description: 'Dernières mises à jour, nouvelles fonctionnalités et changements de prix.',
      url: '/changelog',
      extra: 'actualités mises à jour changelog nouveautés',
    },
    // Contact
    {
      type: 'guide' as const,
      title: 'Contact',
      description: 'Contactez l\u2019équipe Meilleur ATS.',
      url: '/contact',
      extra: 'contact email message formulaire',
    },
    // Favoris
    {
      type: 'guide' as const,
      title: 'Mes ATS favoris',
      description: 'Retrouvez les logiciels de recrutement que vous avez sauvegardés.',
      url: '/favoris',
      extra: 'favoris sauvegardés sélection liste',
    },
  ];

  return <SearchModal items={items} />;
}
