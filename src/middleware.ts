import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['fr', 'en'] as const;
const DEFAULT_LOCALE = 'fr';

function getPreferredLocale(request: NextRequest): string {
  const accept = request.headers.get('accept-language') ?? '';
  // Simple check: if first preference starts with 'en', use English
  if (/^en/i.test(accept.split(',')[0])) return 'en';
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API, feed, images, et metadata files Next.js.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/feed.xml' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/favicon.ico' ||
    // Next.js metadata routes (icon.tsx, apple-icon.tsx, opengraph-image.tsx…)
    pathname === '/icon' ||
    pathname === '/apple-icon' ||
    pathname === '/opengraph-image' ||
    pathname === '/twitter-image' ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/manifest.json' ||
    /\.(?:png|jpg|jpeg|svg|gif|ico|webp|woff2?|ttf|css|js|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if path already has a locale prefix
  const segments = pathname.split('/');
  const maybeLocale = segments[1];

  if (LOCALES.includes(maybeLocale as (typeof LOCALES)[number])) {
    // If default locale prefix is present, redirect to remove it
    // e.g. /fr/logiciels → /logiciels
    if (maybeLocale === DEFAULT_LOCALE) {
      const stripped = '/' + segments.slice(2).join('/') || '/';
      const url = request.nextUrl.clone();
      url.pathname = stripped;
      return NextResponse.redirect(url);
    }
    // Non-default locale prefix (/en/...) → serve as-is
    return NextResponse.next();
  }

  // No locale prefix → rewrite internally to /fr/...
  // Browser URL stays clean (no /fr/ prefix)
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Match all routes except static files
  matcher: [
    '/((?!_next|api|feed\\.xml|sitemap\\.xml|robots\\.txt|favicon\\.ico|icon|apple-icon|opengraph-image|twitter-image|manifest\\.(?:webmanifest|json)|.*\\..+).*)',
  ],
};
