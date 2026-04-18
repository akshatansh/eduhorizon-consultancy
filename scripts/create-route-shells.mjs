import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const templatePath = join(distDir, 'index.html');
const template = readFileSync(templatePath, 'utf8');
const siteUrl = 'https://www.eduhorizon.online';
const defaultImage = `${siteUrl}/EDUHORIZON%20(1).jpg`;

const routes = [
  {
    path: '/',
    heading: 'Best Admission Consultancy in Noida and Greater Noida',
    title: 'Best Admission Consultancy in Noida & Greater Noida | EduHorizon',
    description:
      'EduHorizon is a trusted admission consultancy in Noida and Greater Noida for B.Tech, MBA, BCA, MCA and college counselling.',
    keywords:
      'admission consultancy in Noida, admission consultancy in Greater Noida, college counselling, direct admission Noida'
  },
  {
    path: '/about',
    heading: 'About EduHorizon | Admission Consultancy in Noida and Greater Noida',
    title: 'About EduHorizon Admission Consultancy in Noida | Expert Counsellors',
    description:
      'Learn about EduHorizon, an admission consultancy in Noida helping students compare colleges, courses, fees and career options.',
    keywords:
      'about EduHorizon, admission consultancy in Noida, education consultants, college admission guidance'
  },
  {
    path: '/colleges',
    heading: 'Top Colleges in Greater Noida 2026',
    title: 'Top Colleges in Greater Noida 2026 | B.Tech MBA BCA Admissions',
    description:
      'Compare top colleges in Greater Noida for B.Tech, MBA and BCA admissions with fees, placements, rankings and EduHorizon counselling.',
    keywords:
      'top colleges in Greater Noida, B.Tech colleges Greater Noida, MBA colleges Greater Noida, BCA admission Greater Noida'
  },
  {
    path: '/success-stories',
    heading: 'Student Success Stories from EduHorizon',
    title: 'Student Success Stories | College Admissions in Greater Noida',
    description:
      'Read EduHorizon student success stories from college admissions in Greater Noida, including placements, counselling and career outcomes.',
    keywords:
      'student success stories, college admissions Greater Noida, EduHorizon placements, admission counselling results'
  },
  {
    path: '/testimonials',
    heading: 'Student Testimonials for EduHorizon',
    title: 'Student Testimonials | Admission Consultancy in Greater Noida',
    description:
      'Read student testimonials for EduHorizon admission consultancy in Greater Noida for B.Tech, MBA, BCA and college selection support.',
    keywords:
      'student testimonials, admission consultancy Greater Noida, EduHorizon reviews, college counselling testimonials'
  },
  {
    path: '/blog',
    heading: 'Admission and Career Guidance Blog for Noida and Greater Noida',
    title: 'Admission Blog | College Guidance for Noida and Greater Noida',
    description:
      'Read EduHorizon admission blog articles on college selection, B.Tech, MBA, BCA, fees, placements and career guidance.',
    keywords:
      'admission blog, college guidance Noida, career guidance Greater Noida, college selection tips'
  },
  {
    path: '/privacy-policy',
    heading: 'Privacy Policy',
    title: 'Privacy Policy | EduHorizon Admission Consultancy',
    description:
      'EduHorizon privacy policy for students using admission consultancy, college counselling and career guidance services.',
    keywords:
      'EduHorizon privacy policy, admission consultancy privacy, college counselling privacy policy'
  },
  {
    path: '/terms',
    heading: 'Terms and Conditions',
    title: 'Terms and Conditions | EduHorizon Admission Consultancy',
    description:
      'EduHorizon terms and conditions for admission consultancy, college counselling and career guidance services in Noida.',
    keywords:
      'EduHorizon terms and conditions, admission consultancy terms, college counselling terms'
  },
  {
    path: '/blog/choosing-right-college',
    heading: 'How to Choose the Right College in Greater Noida',
    title: 'How to Choose the Right College in Greater Noida | EduHorizon',
    description:
      'Learn how to choose the right college in Greater Noida by comparing courses, fees, placements, location and admission guidance.',
    keywords:
      'choose right college Greater Noida, college selection, admission guidance, Greater Noida colleges'
  },
  {
    path: '/blog/engineering-vs-management',
    heading: 'Engineering vs Management: Choosing Your Path',
    title: 'Engineering vs Management Courses | Admission Guidance Noida',
    description:
      'Compare engineering and management courses for admission in Noida and Greater Noida with career scope, fees and college guidance.',
    keywords:
      'engineering vs management, admission guidance Noida, B.Tech admission, MBA admission'
  },
  {
    path: '/blog/campus-life-greater-noida',
    heading: 'Campus Life in Greater Noida Colleges',
    title: 'Campus Life in Greater Noida Colleges | Student Guide',
    description:
      'Explore campus life in Greater Noida colleges, including hostels, placements, facilities, student activities and admission tips.',
    keywords:
      'campus life Greater Noida colleges, student life Greater Noida, college facilities, admission tips'
  }
];

const internalLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About EduHorizon' },
  { href: '/colleges', label: 'Top Colleges' },
  { href: '/success-stories', label: 'Success Stories' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Admission Blog' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms and Conditions' }
];

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const setTag = (html, pattern, replacement) =>
  pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`);

const getStructuredData = (route, canonicalUrl) => {
  const organization = {
    '@type': 'EducationalOrganization',
    '@id': `${siteUrl}/#organization`,
    name: 'EduHorizon',
    url: siteUrl,
    logo: defaultImage,
    image: defaultImage,
    description:
      'EduHorizon provides admission consultancy, college counselling and career guidance for students in Noida and Greater Noida.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN'
    },
    areaServed: ['Noida', 'Greater Noida', 'Delhi NCR', 'India'],
    sameAs: [siteUrl]
  };
  const webPage = {
    '@type': route.path === '/about' ? 'AboutPage' : route.path.startsWith('/blog/') ? 'Article' : 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: route.title,
    headline: route.heading,
    description: route.description,
    image: defaultImage,
    isPartOf: { '@id': `${siteUrl}/#website` },
    publisher: { '@id': `${siteUrl}/#organization` }
  };

  if (route.path === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: 'EduHorizon',
          description: route.description,
          publisher: { '@id': `${siteUrl}/#organization` },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/colleges?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        },
        webPage
      ]
    };
  }

  if (route.path === '/colleges') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        webPage,
        {
          '@type': 'ItemList',
          '@id': `${canonicalUrl}#college-list`,
          name: 'Top Colleges in Greater Noida',
          description: route.description,
          numberOfItems: 6,
          itemListElement: [
            'GNIOT Greater Noida',
            'IIMT College of Engineering',
            'GL Bajaj Institute of Technology and Management',
            'NIET Greater Noida',
            'KCC Institute',
            'ITS Engineering College'
          ].map((name, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CollegeOrUniversity',
              name,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Greater Noida',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN'
              }
            }
          }))
        }
      ]
    };
  }

  if (route.path.startsWith('/blog/')) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          ...webPage,
          '@type': 'Article',
          author: { '@id': `${siteUrl}/#organization` },
          mainEntityOfPage: canonicalUrl
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
            { '@type': 'ListItem', position: 3, name: route.heading, item: canonicalUrl }
          ]
        }
      ]
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      webPage,
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: route.heading, item: canonicalUrl }
        ]
      }
    ]
  };
};

const createHtml = (route) => {
  const links = internalLinks
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join('');
  const fallback = `<div id="root"><main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:Arial,sans-serif;text-align:center"><div><h1>${escapeHtml(
    route.heading
  )}</h1><nav aria-label="Internal links" style="margin-top:1.5rem;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem">${links}</nav></div></main></div>`;
  const canonicalUrl = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  const structuredData = JSON.stringify(getStructuredData(route, canonicalUrl));

  let html = template.replace('<div id="root"></div>', fallback);
  html = setTag(html, /<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  html = setTag(
    html,
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
  );
  html = setTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/s,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
  html = setTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = setTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = setTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
  );
  html = setTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/s,
    `<meta property="og:image" content="${escapeHtml(defaultImage)}" />`
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  html = setTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/s,
    `<meta name="twitter:image" content="${escapeHtml(defaultImage)}" />`
  );
  html = setTag(
    html,
    /<script\s+id="static-schema-org"\s+type="application\/ld\+json">.*?<\/script>/s,
    `<script id="static-schema-org" type="application/ld+json">${structuredData}</script>`
  );

  return html;
};

for (const route of routes) {
  const outputPath = route.path === '/' ? templatePath : join(distDir, route.path, 'index.html');
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, createHtml(route), 'utf8');
}

console.log(`Created static HTML shells with SEO and Schema.org fallbacks for ${routes.length} routes.`);
