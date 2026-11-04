import fs from 'node:fs';
import path from 'node:path';

import {
  DEFAULT_SOCIAL_IMAGE,
  SEO_BY_PAGE,
  SITE_URL,
  structuredDataGraph,
  type SeoMetadata,
} from '../src/seo';

const outputDirectory = path.resolve(import.meta.dirname, '..', 'dist');
const indexPath = path.join(outputDirectory, 'index.html');
const siteUrl = SITE_URL;
const socialImage = DEFAULT_SOCIAL_IMAGE;
const socialImageAlt = 'Mexican street tacos from Mateo\u2019s Taqueria';
const pages = SEO_BY_PAGE;

if (!fs.existsSync(indexPath)) {
  throw new Error(`Expo output was not found at ${indexPath}`);
}

const template = fs.readFileSync(indexPath, 'utf8');
const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const structuredData = JSON.stringify(structuredDataGraph);

function removeManagedHeadTags(html: string): string {
  return html
    .replace(
      /<meta\s+(?:name|property)=["'](?:description|robots|og:[^"']+|twitter:[^"']+)["'][^>]*>\s*/gi,
      '',
    )
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<script\s+id=["']restaurant-structured-data["'][^>]*>[\s\S]*?<\/script>\s*/gi, '');
}

function renderPage({ path: routePath, title, description }: SeoMetadata): string {
  const canonical = `${siteUrl}${routePath}`;
  const head = `
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Mateo's Taqueria">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${socialImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="1060">
    <meta property="og:image:alt" content="${socialImageAlt}">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${socialImage}">
    <meta name="twitter:image:alt" content="${socialImageAlt}">
    <script id="restaurant-structured-data" type="application/ld+json">${structuredData}</script>`;

  return removeManagedHeadTags(template)
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
    .replace('</head>', () => `${head}\n  </head>`);
}

for (const [name, metadata] of Object.entries(pages)) {
  const target = name === 'home' ? indexPath : path.join(outputDirectory, `${name}.html`);
  fs.writeFileSync(target, renderPage(metadata));
}

console.log(`Generated SEO metadata for ${Object.keys(pages).length} routes.`);
