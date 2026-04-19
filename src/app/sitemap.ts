import type { MetadataRoute } from 'next';
import { SITE_URL, PROFILE_SLUGS } from '@/lib/constants';
import { getProductSlugs, getGuideSlugs, getComparativeSlugs } from '@/lib/mdx';

const LOCALES = ['fr', 'en'] as const;

function localeUrl(path: string, locale: string): string {
  if (locale === 'fr') return `${SITE_URL}${path}`;
  return `${SITE_URL}/${locale}${path}`;
}

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((loc) => [loc, localeUrl(path, loc)])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  // Helper to add a page for all locales
  function addPage(path: string, opts: { freq: 'weekly' | 'monthly'; priority: number }) {
    for (const locale of LOCALES) {
      entries.push({
        url: localeUrl(path, locale),
        lastModified: now,
        changeFrequency: opts.freq,
        priority: opts.priority,
        alternates: alternates(path),
      });
    }
  }

  // Static pages
  addPage('', { freq: 'weekly', priority: 1 });
  addPage('/logiciels', { freq: 'weekly', priority: 0.9 });
  addPage('/comparer', { freq: 'monthly', priority: 0.8 });
  addPage('/guides', { freq: 'weekly', priority: 0.7 });
  addPage('/questionnaire', { freq: 'monthly', priority: 0.8 });
  addPage('/glossaire', { freq: 'monthly', priority: 0.6 });
  addPage('/etudes', { freq: 'monthly', priority: 0.6 });
  addPage('/changelog', { freq: 'weekly', priority: 0.5 });
  addPage('/accompagnement', { freq: 'monthly', priority: 0.6 });
  addPage('/editeurs', { freq: 'monthly', priority: 0.5 });
  addPage('/a-propos', { freq: 'monthly', priority: 0.3 });
  addPage('/contact', { freq: 'monthly', priority: 0.4 });

  // Profile pages
  for (const slug of PROFILE_SLUGS) {
    addPage(`/profils/${slug}`, { freq: 'weekly', priority: 0.8 });
  }

  // Product pages
  for (const slug of getProductSlugs()) {
    addPage(`/logiciels/${slug}`, { freq: 'monthly', priority: 0.8 });
  }

  // Guide pages
  for (const slug of getGuideSlugs()) {
    addPage(`/guides/${slug}`, { freq: 'monthly', priority: 0.6 });
  }

  // Comparative pages
  for (const slug of getComparativeSlugs()) {
    addPage(`/comparatif/${slug}`, { freq: 'monthly', priority: 0.7 });
  }

  return entries;
}
