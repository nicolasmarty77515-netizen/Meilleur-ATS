import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { SITE_CONTACT_EMAIL } from '@/lib/constants';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const HOST = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis',
  addressEn: '440 N Barranca Avenue #4133, Covina, CA 91723, United States',
  site: 'https://vercel.com',
  email: 'privacy@vercel.com',
};

const t = {
  fr: {
    title: 'Mentions légales',
    description: 'Mentions légales du site Meilleur ATS : éditeur, directeur de la publication et hébergeur.',
    updated: 'Dernière mise à jour : juin 2026',
    editorTitle: 'Éditeur du site',
    editorBody: [
      'Le site meilleur-ats.com est édité à titre non professionnel.',
      'Conformément à l’article 6, III, 2° de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), l’éditeur — personne physique éditant à titre non professionnel — a choisi de préserver son anonymat. Son identité a été communiquée à l’hébergeur du site, qui pourra la transmettre à l’autorité judiciaire sur réquisition.',
    ],
    contactLine: 'Contact :',
    dirTitle: 'Directeur de la publication',
    dirBody: 'Le directeur de la publication peut être contacté à l’adresse indiquée ci-dessus.',
    hostTitle: 'Hébergeur',
    hostIntro: 'Le site est hébergé par :',
    ipTitle: 'Propriété intellectuelle',
    ipBody:
      'La structure générale du site, ainsi que les textes, rédactionnels et éléments graphiques produits pour le site, sont la propriété de l’éditeur et sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable, est interdite.',
    marksTitle: 'Marques et contenus de tiers',
    marksBody:
      'Les marques, noms de produits, logos et captures cités (notamment ceux des logiciels comparés) appartiennent à leurs détenteurs respectifs et sont mentionnés à des fins d’information et de comparaison. Leur citation n’implique aucun lien de partenariat, sauf mention contraire explicite.',
    liabTitle: 'Responsabilité',
    liabBody:
      'Les informations publiées (tarifs, fonctionnalités, notes) sont fournies à titre indicatif et peuvent évoluer. Elles ne constituent pas un conseil contractuel. Malgré le soin apporté, l’éditeur ne peut garantir l’exactitude ou l’exhaustivité des contenus. Pour signaler une erreur, utilisez l’adresse de contact ci-dessus.',
    dataTitle: 'Données personnelles',
    dataBody: 'Le traitement des données personnelles est décrit dans la',
    dataLink: 'Politique de confidentialité',
    lawTitle: 'Droit applicable',
    lawBody: 'Le présent site et ses mentions légales sont soumis au droit français.',
    home: 'Accueil',
  },
  en: {
    title: 'Legal notice',
    description: 'Legal notice for Meilleur ATS: publisher, publication director and hosting provider.',
    updated: 'Last updated: June 2026',
    editorTitle: 'Site publisher',
    editorBody: [
      'The meilleur-ats.com website is published on a non-professional basis.',
      'In accordance with Article 6, III, 2° of French Law No. 2004-575 of 21 June 2004 (LCEN), the publisher — a natural person publishing on a non-professional basis — has chosen to remain anonymous. Their identity has been provided to the hosting provider, who may disclose it to the judicial authority upon request.',
    ],
    contactLine: 'Contact:',
    dirTitle: 'Publication director',
    dirBody: 'The publication director can be reached at the address above.',
    hostTitle: 'Hosting provider',
    hostIntro: 'The site is hosted by:',
    ipTitle: 'Intellectual property',
    ipBody:
      'The overall structure of the site, together with the texts, editorial content and graphic elements produced for it, are the property of the publisher and protected by intellectual property law. Any reproduction or representation, in whole or in part, without prior authorisation, is prohibited.',
    marksTitle: 'Third-party trademarks and content',
    marksBody:
      'The trademarks, product names, logos and screenshots cited (in particular those of the compared software) belong to their respective owners and are mentioned for information and comparison purposes. Their citation implies no partnership, unless explicitly stated otherwise.',
    liabTitle: 'Liability',
    liabBody:
      'The information published (pricing, features, ratings) is provided for guidance only and may change. It does not constitute contractual advice. Despite the care taken, the publisher cannot guarantee the accuracy or completeness of the content. To report an error, use the contact address above.',
    dataTitle: 'Personal data',
    dataBody: 'The processing of personal data is described in the',
    dataLink: 'Privacy policy',
    lawTitle: 'Governing law',
    lawBody: 'This site and its legal notice are governed by French law.',
    home: 'Home',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = t[(locale as Locale) === 'en' ? 'en' : 'fr'];
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: '/mentions-legales' },
  };
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = (localeParam as Locale) === 'en' ? 'en' : 'fr';
  const c = t[locale];
  const dict = await getDictionary(locale);
  const isEn = locale === 'en';

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: c.title, url: '/mentions-legales' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: c.title }]} />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{c.title}</h1>
          <p className="mt-2 text-sm text-gray-500">{c.updated}</p>

          <div className="prose prose-blue mt-8 max-w-none">
            <h2>{c.editorTitle}</h2>
            {c.editorBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              {c.contactLine}{' '}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
            </p>

            <h2>{c.dirTitle}</h2>
            <p>{c.dirBody}</p>

            <h2>{c.hostTitle}</h2>
            <p>
              {c.hostIntro}
              <br />
              <strong>{HOST.name}</strong>
              <br />
              {isEn ? HOST.addressEn : HOST.address}
              <br />
              <a href={HOST.site} target="_blank" rel="noopener noreferrer">
                {HOST.site}
              </a>{' '}
              — <a href={`mailto:${HOST.email}`}>{HOST.email}</a>
            </p>

            <h2>{c.ipTitle}</h2>
            <p>{c.ipBody}</p>

            <h2>{c.marksTitle}</h2>
            <p>{c.marksBody}</p>

            <h2>{c.liabTitle}</h2>
            <p>{c.liabBody}</p>

            <h2>{c.dataTitle}</h2>
            <p>
              {c.dataBody}{' '}
              <a href={isEn ? '/en/confidentialite' : '/confidentialite'}>{c.dataLink}</a>.
            </p>

            <h2>{c.lawTitle}</h2>
            <p>{c.lawBody}</p>
          </div>
        </div>
      </section>
    </>
  );
}
