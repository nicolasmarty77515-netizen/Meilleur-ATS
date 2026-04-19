'use client';

import NextLink from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

const LABELS: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
};

const FULL_LABELS: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = (params?.locale as Locale) ?? DEFAULT_LOCALE;

  // Build the equivalent path in the other locale
  function getLocalePath(targetLocale: Locale): string {
    // Strip current locale prefix from pathname
    let cleanPath = pathname;
    for (const loc of LOCALES) {
      if (loc === DEFAULT_LOCALE) continue;
      if (cleanPath.startsWith(`/${loc}/`)) {
        cleanPath = cleanPath.slice(loc.length + 1);
        break;
      }
      if (cleanPath === `/${loc}`) {
        cleanPath = '/';
        break;
      }
    }

    // Add target locale prefix (none for default)
    if (targetLocale === DEFAULT_LOCALE) return cleanPath;
    return `/${targetLocale}${cleanPath}`;
  }

  // Only show the "other" locale as a simple toggle
  const otherLocale = currentLocale === 'fr' ? 'en' : 'fr';

  return (
    <NextLink
      href={getLocalePath(otherLocale as Locale)}
      className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
      aria-label={`Switch to ${FULL_LABELS[otherLocale as Locale]}`}
      title={FULL_LABELS[otherLocale as Locale]}
      hrefLang={otherLocale}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
      {LABELS[otherLocale as Locale]}
    </NextLink>
  );
}
