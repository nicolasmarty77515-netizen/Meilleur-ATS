import type { MetadataRoute } from 'next';
import { SITE_URL, PROFILE_SLUGS } from '@/lib/constants';
import { getProductSlugs, getGuideSlugs, getComparativeSlugs } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/logiciels`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/questionnaire`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/a-propos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const profilePages: MetadataRoute.Sitemap = PROFILE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/profils/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = getProductSlugs().map((slug) => ({
    url: `${SITE_URL}/logiciels/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = getGuideSlugs().map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const comparativePages: MetadataRoute.Sitemap = getComparativeSlugs().map((slug) => ({
    url: `${SITE_URL}/comparatif/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...profilePages, ...productPages, ...guidePages, ...comparativePages];
}
