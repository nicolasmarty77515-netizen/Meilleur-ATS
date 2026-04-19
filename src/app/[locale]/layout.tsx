import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import GlobalSearch from '@/components/GlobalSearch';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { FavoritesProvider } from '@/components/FavoritesProvider';
import { generateWebsiteSchema } from '@/lib/schema';
import { isValidLocale, getDictionary, LOCALES, type Locale } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {dict.common.skipToContent}
      </a>
      <FavoritesProvider>
        <SchemaMarkup schema={generateWebsiteSchema()} />
        <Header searchSlot={<GlobalSearch />} locale={locale as Locale} />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale as Locale} />
      </FavoritesProvider>
    </>
  );
}
