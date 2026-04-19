'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from '@/components/LocaleLink';
import { usePathname } from 'next/navigation';
import { SITE_NAME } from '@/lib/constants';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useFavorites } from './FavoritesProvider';
import type { Locale } from '@/lib/i18n';

const NAV_LINKS = [
  { href: '/logiciels', label: 'Logiciels ATS', en: 'ATS Software' },
  { href: '/comparer', label: 'Comparateur', en: 'Comparator' },
  { href: '/profils/rh-interne', label: 'Par profil', en: 'By Profile', match: '/profils' },
  { href: '/questionnaire', label: 'Questionnaire', en: 'Quiz' },
  { href: '/guides', label: 'Guides', en: 'Guides' },
  { href: '/a-propos', label: 'À propos', en: 'About' },
];

interface HeaderProps {
  searchSlot?: ReactNode;
  locale?: Locale;
}

export default function Header({ searchSlot, locale = 'fr' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { count: favCount } = useFavorites();

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    pathname === link.href || (link.match && pathname.startsWith(link.match));

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link href="/" className="text-xl font-bold text-blue-700" aria-label={`${SITE_NAME} — Accueil`}>
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition hover:text-blue-700 ${isActive(link) ? 'text-blue-700' : ''}`}
                {...(isActive(link) ? { 'aria-current': 'page' as const } : {})}
              >
                {locale === 'en' ? link.en : link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {searchSlot}

          <LanguageSwitcher />
          <DarkModeToggle />

          <Link
            href="/favoris"
            className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
            aria-label={`Mes favoris${favCount > 0 ? ` (${favCount})` : ''}`}
            title="Mes favoris"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {favCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white" aria-hidden="true">
                {favCount > 9 ? '9+' : favCount}
              </span>
            )}
          </Link>

          <Link
            href="/comparer"
            className="hidden rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 sm:inline-flex"
          >
            Comparer
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 bg-white md:hidden"
          role="navigation"
          aria-label="Menu mobile"
        >
          <ul className="space-y-1 px-4 py-4" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-medium transition hover:bg-gray-50 ${
                    isActive(link) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                  {...(isActive(link) ? { 'aria-current': 'page' as const } : {})}
                >
                  {locale === 'en' ? link.en : link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/logiciels"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-lg bg-blue-700 px-3 py-2 text-center text-base font-medium text-white transition hover:bg-blue-800"
              >
                Comparer les ATS
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
