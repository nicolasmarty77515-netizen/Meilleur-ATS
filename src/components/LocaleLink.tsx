'use client';

import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import type { ComponentProps } from 'react';
import { DEFAULT_LOCALE } from '@/lib/i18n';

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link that auto-prefixes the locale.
 * Default locale (fr) gets no prefix; other locales get /en/... etc.
 */
export default function Link({ href, ...props }: LinkProps) {
  const params = useParams();
  const locale = (params?.locale as string) ?? DEFAULT_LOCALE;

  let localizedHref = href;

  if (typeof href === 'string' && href.startsWith('/')) {
    // Internal path → add locale prefix for non-default locales
    if (locale !== DEFAULT_LOCALE) {
      localizedHref = `/${locale}${href}`;
    }
  } else if (typeof href === 'object' && href.pathname?.startsWith('/')) {
    if (locale !== DEFAULT_LOCALE) {
      localizedHref = { ...href, pathname: `/${locale}${href.pathname}` };
    }
  }

  return <NextLink href={localizedHref} {...props} />;
}
