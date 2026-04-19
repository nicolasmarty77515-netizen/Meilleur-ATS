import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { SITE_NAME } from '@/lib/constants';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumb from '@/components/Breadcrumb';
import { getDictionary, type Locale } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageDescription,
    alternates: { canonical: '/contact' },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const breadcrumb = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.contact.pageTitle, url: '/contact' },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumb} />

      <div className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: dict.common.home, href: '/' }, { label: dict.contact.pageTitle }]} />

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{dict.contact.pageTitle}</h1>
          <p className="mt-4 text-lg text-gray-600">
            {dict.contact.pageDescription}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Contact form */}
            <form
              action={`mailto:contact@meilleur-ats.fr?subject=Contact depuis ${SITE_NAME}`}
              method="POST"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
                  {dict.contact.name} *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
                  {dict.contact.email} *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="jean@exemple.fr"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700">
                  {dict.contact.subject} *
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">---</option>
                  <option value="question">{dict.contact.subjectOptions.general}</option>
                  <option value="accompagnement">{dict.contact.subjectOptions.accompagnement}</option>
                  <option value="editeur">{dict.contact.subjectOptions.editeur}</option>
                  <option value="correction">{dict.contact.subjectOptions.correction}</option>
                  <option value="partenariat">{dict.contact.subjectOptions.partenariat}</option>
                  <option value="autre">{dict.contact.subjectOptions.autre}</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">
                  {dict.contact.message} *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                {dict.contact.send}
              </button>
            </form>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-lg font-bold text-gray-900">{dict.contact.quickAccess}</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <Link href="/questionnaire" className="text-blue-700 hover:underline">
                      🎯 {dict.nav.questionnaire}
                    </Link>
                  </li>
                  <li>
                    <Link href="/accompagnement" className="text-blue-700 hover:underline">
                      🤝 {dict.nav.accompagnement}
                    </Link>
                  </li>
                  <li>
                    <Link href="/comparer" className="text-blue-700 hover:underline">
                      ⚖️ {dict.nav.comparateur}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900">{dict.contact.responseTime}</h2>
                <p className="mt-2 text-sm text-gray-600">
                  {dict.contact.responseTimeDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
