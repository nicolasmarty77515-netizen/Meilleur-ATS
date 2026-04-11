import type { ProductFrontmatter, ComparativeFrontmatter } from './types';
import { SITE_NAME, SITE_URL } from './constants';

export function generateProductSchema(product: ProductFrontmatter) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    url: product.website,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    image: `${SITE_URL}${product.logo}`,
    offers: product.pricing.startingPrice
      ? {
          '@type': 'Offer',
          price: product.pricing.startingPrice,
          priceCurrency: product.pricing.currency,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratings.overall,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 50,
    },
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.ratings.overall,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: product.description,
      datePublished: product.updatedAt,
    },
  };
}

export function generateProductListSchema(
  products: ProductFrontmatter[],
  title: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description,
    url: `${SITE_URL}${url}`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.description,
        url: `${SITE_URL}/logiciels/${product.slug}`,
        applicationCategory: 'BusinessApplication',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.ratings.overall,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };
}

export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function generateComparisonSchema(
  comparative: ComparativeFrontmatter,
  productA: ProductFrontmatter,
  productB: ProductFrontmatter
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: comparative.title,
    description: comparative.description,
    url: `${SITE_URL}/comparatif/${comparative.slug}`,
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: generateProductSchema(productA),
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: generateProductSchema(productB),
      },
    ],
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Comparatif independant des meilleurs logiciels de recrutement (ATS) en France.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
