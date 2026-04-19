export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/** Build locale-aware path. Default locale (fr) has no prefix. */
export function localePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path}`;
}

/** Strip locale prefix from pathname (for matching). */
export function stripLocale(pathname: string): string {
  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) continue;
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
    if (pathname === `/${loc}`) return '/';
  }
  return pathname;
}

/* ── Dictionaries ─────────────────────────────────────────────── */
import type { Dictionary } from './dictionaries/type';

const dicts: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import('./dictionaries/fr').then((m) => m.default),
  en: () => import('./dictionaries/en').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dicts[locale] ?? dicts[DEFAULT_LOCALE];
  return loader();
}
