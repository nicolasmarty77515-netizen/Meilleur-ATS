import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { SITE_CONTACT_EMAIL } from '@/lib/constants';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const t = {
  fr: {
    title: 'Politique de confidentialité',
    description:
      'Comment Meilleur ATS traite vos données personnelles : données collectées, finalité, durée, hébergement et vos droits RGPD.',
    updated: 'Dernière mise à jour : juin 2026',
    blocks: [
      {
        h: 'Responsable du traitement',
        p: [
          'Le responsable du traitement est l’éditeur du site meilleur-ats.com (voir les mentions légales), joignable à l’adresse indiquée à la fin de cette page.',
        ],
      },
      {
        h: 'Données collectées',
        p: [
          'Le site ne collecte des données personnelles que lorsque vous remplissez volontairement le formulaire de contact : votre nom, votre adresse email et le contenu de votre message.',
          'Aucune création de compte n’est requise pour consulter le site. Aucune donnée de navigation n’est collectée à des fins publicitaires ou de revente.',
        ],
      },
      {
        h: 'Finalité et base légale',
        p: [
          'Ces données sont utilisées uniquement pour traiter et répondre à votre demande. La base légale est votre consentement et l’intérêt légitime à répondre à une sollicitation que vous avez initiée (article 6 du RGPD).',
        ],
      },
      {
        h: 'Comment vos messages sont transmis',
        p: [
          'Le formulaire de contact envoie votre message par email (via votre propre messagerie) à l’adresse de contact du site. Aucune donnée du formulaire n’est stockée sur les serveurs d’hébergement du site : les pages sont statiques et ne disposent d’aucune base de données.',
        ],
      },
      {
        h: 'Destinataires',
        p: [
          'Vos données sont destinées au seul éditeur du site. Elles ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales.',
        ],
      },
      {
        h: 'Durée de conservation',
        p: [
          'Les messages reçus sont conservés le temps nécessaire au traitement de votre demande, puis archivés ou supprimés, dans la limite de 24 mois.',
        ],
      },
      {
        h: 'Hébergement et transferts hors UE',
        p: [
          'Le site est hébergé par Vercel Inc. (États-Unis). Les pages étant statiques, aucune donnée de formulaire n’est traitée par l’hébergeur. La simple consultation du site implique toutefois un acheminement technique via une infrastructure pouvant être située hors de l’Union européenne. Vercel fournit des garanties contractuelles (clauses contractuelles types) encadrant ces transferts.',
        ],
      },
      {
        h: 'Stockage local (localStorage) — pas de cookies de suivi',
        p: [
          'Le site utilise le stockage local de votre navigateur (localStorage) à des fins strictement fonctionnelles : mémoriser votre préférence de thème (clair/sombre) et les logiciels que vous mettez en favori. Ces informations restent sur votre appareil et ne sont jamais transmises.',
          'Le site n’utilise aucun cookie de mesure d’audience ni cookie publicitaire. Aucun bandeau de consentement n’est donc nécessaire.',
        ],
      },
      {
        h: 'Vos droits',
        p: [
          'Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité de vos données.',
          'Pour les exercer, écrivez à l’adresse de contact ci-dessous. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).',
        ],
      },
    ],
    contactTitle: 'Contact',
    contactLine: 'Pour toute question relative à vos données :',
    home: 'Accueil',
  },
  en: {
    title: 'Privacy policy',
    description:
      'How Meilleur ATS handles your personal data: data collected, purpose, retention, hosting and your GDPR rights.',
    updated: 'Last updated: June 2026',
    blocks: [
      {
        h: 'Data controller',
        p: [
          'The data controller is the publisher of meilleur-ats.com (see legal notice), reachable at the address provided at the end of this page.',
        ],
      },
      {
        h: 'Data collected',
        p: [
          'The site only collects personal data when you voluntarily fill in the contact form: your name, your email address and the content of your message.',
          'No account is required to browse the site. No browsing data is collected for advertising or resale purposes.',
        ],
      },
      {
        h: 'Purpose and legal basis',
        p: [
          'This data is used solely to handle and respond to your request. The legal basis is your consent and the legitimate interest in answering a request you initiated (Article 6 GDPR).',
        ],
      },
      {
        h: 'How your messages are sent',
        p: [
          'The contact form sends your message by email (via your own mail client) to the site’s contact address. No form data is stored on the site’s hosting servers: the pages are static and have no database.',
        ],
      },
      {
        h: 'Recipients',
        p: [
          'Your data is intended for the site publisher only. It is never sold, rented or transferred to third parties for commercial purposes.',
        ],
      },
      {
        h: 'Retention period',
        p: [
          'Messages received are kept for as long as necessary to handle your request, then archived or deleted, within a maximum of 24 months.',
        ],
      },
      {
        h: 'Hosting and transfers outside the EU',
        p: [
          'The site is hosted by Vercel Inc. (United States). As the pages are static, no form data is processed by the host. Simply browsing the site nonetheless involves technical routing through infrastructure that may be located outside the European Union. Vercel provides contractual safeguards (Standard Contractual Clauses) governing these transfers.',
        ],
      },
      {
        h: 'Local storage (localStorage) — no tracking cookies',
        p: [
          'The site uses your browser’s local storage (localStorage) for strictly functional purposes: remembering your theme preference (light/dark) and the software you bookmark. This information stays on your device and is never transmitted.',
          'The site uses no analytics or advertising cookies. No consent banner is therefore required.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'In accordance with the GDPR and the French Data Protection Act, you have the rights of access, rectification, erasure, objection, restriction and portability of your data.',
          'To exercise them, write to the contact address below. You may also lodge a complaint with the CNIL (www.cnil.fr).',
        ],
      },
    ],
    contactTitle: 'Contact',
    contactLine: 'For any question regarding your data:',
    home: 'Home',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = t[(locale as Locale) === 'en' ? 'en' : 'fr'];
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: '/confidentialite' },
  };
}

export default async function ConfidentialitePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = (localeParam as Locale) === 'en' ? 'en' : 'fr';
  const c = t[locale];
  const dict = await getDictionary(locale);

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: c.title, url: '/confidentialite' },
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
            {c.blocks.map((block) => (
              <section key={block.h}>
                <h2>{block.h}</h2>
                {block.p.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}

            <h2>{c.contactTitle}</h2>
            <p>
              {c.contactLine}{' '}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
