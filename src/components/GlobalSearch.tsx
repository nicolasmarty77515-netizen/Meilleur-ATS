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
  ];

  return <SearchModal items={items} />;
}
