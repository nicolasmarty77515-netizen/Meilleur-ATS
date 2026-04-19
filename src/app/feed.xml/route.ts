import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';
import { getAllGuides, getAllProducts } from '@/lib/mdx';

export function GET() {
  const guides = getAllGuides();
  const products = getAllProducts();

  const items = [
    ...guides.map((g) => ({
      title: g.title,
      description: g.description,
      url: `${SITE_URL}/guides/${g.slug}`,
      date: g.publishedAt ?? g.updatedAt ?? new Date().toISOString(),
      category: 'Guide',
    })),
    ...products.map((p) => ({
      title: `${p.name} - Avis et test complet`,
      description: p.description,
      url: `${SITE_URL}/logiciels/${p.slug}`,
      date: p.updatedAt ?? new Date().toISOString(),
      category: 'Logiciel ATS',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
${items
  .slice(0, 50)
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(SITE_NAME)}</dc:creator>
      <category>${escapeXml(item.category)}</category>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
