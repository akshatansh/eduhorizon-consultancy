import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = 'https://www.eduhorizon.online';

const routes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/about', changefreq: 'weekly', priority: '0.8' },
  { path: '/colleges', changefreq: 'daily', priority: '0.9' },
  { path: '/success-stories', changefreq: 'weekly', priority: '0.8' },
  { path: '/testimonials', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/privacy-policy', changefreq: 'monthly', priority: '0.5' },
  { path: '/terms', changefreq: 'monthly', priority: '0.5' }
];

const blogDataPath = resolve(process.cwd(), 'src/data/blogPosts.ts');
const sitemapPath = resolve(process.cwd(), 'public/sitemap.xml');

const blogData = readFileSync(blogDataPath, 'utf8');
const slugMatches = [...blogData.matchAll(/id:\s*'([^']+)'/g)];
const blogSlugs = Array.from(new Set(slugMatches.map((match) => match[1])));

const blogRoutes = blogSlugs.map((slug) => ({
  path: `/blog/${slug}`,
  changefreq: 'weekly',
  priority: '0.8'
}));

const allRoutes = [...routes, ...blogRoutes];
const lastmod = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Sitemap generated at ${sitemapPath} with ${allRoutes.length} URLs.`);
