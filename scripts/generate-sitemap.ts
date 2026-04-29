import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a path to avoid "__dirname is not defined" in ES modules if any
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the data
import { blogPosts } from '../src/data/blogPosts';
import { citiesData } from '../src/data/citiesData';

const BASE_URL = 'https://www.eduhorizon.online';

function generateSitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/colleges',
    '/success-stories',
    '/testimonials',
    '/blog',
    '/faq',
    '/cities-we-serve',
    '/privacy-policy',
    '/terms',
  ];

  const currentDate = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  for (const route of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
    xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Dynamic City routes
  for (const city of citiesData) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/best-admission-consultation-in-${city.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  }

  // Dynamic Blog routes
  for (const post of blogPosts) {
    // Assuming blog date is YYYY-MM-DD
    const postDate = new Date(post.date).toISOString();
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/blog/${post.id}</loc>\n`;
    xml += `    <lastmod>${postDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Sitemap successfully generated at: ${outputPath}`);
}

generateSitemap();
