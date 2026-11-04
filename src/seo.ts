import { BUSINESS, type Page } from './data';

export const SITE_URL = 'https://mateostaqueria.com';
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/images/hero-tacos.jpg`;

export interface SeoMetadata {
  title: string;
  description: string;
  path: string;
}

export const SEO_BY_PAGE: Record<Page, SeoMetadata> = {
  home: {
    title: "Mateo's Taqueria | Authentic Mexican Food in Arlington, TX",
    description:
      "Discover homemade Mexican food, street tacos, family recipes, and fresh catering from Mateo's Taqueria in Arlington, Texas.",
    path: '/',
  },
  menu: {
    title: "Mexican Food Menu | Mateo's Taqueria Arlington",
    description:
      'Explore street tacos, enchiladas, burritos, appetizers, breakfast favorites, drinks, and desserts made with fresh ingredients.',
    path: '/menu',
  },
  catering: {
    title: "Mexican Catering in Arlington, TX | Mateo's Taqueria",
    description:
      'Plan your next event with taco stations, fajitas, enchiladas, and fresh Mexican catering packages for groups in Arlington, Texas.',
    path: '/catering',
  },
  rewards: {
    title: "Rewards & Specials | Mateo's Taqueria",
    description:
      "See what's coming to Mateo's Taqueria, including future rewards, seasonal offers, and special menu updates.",
    path: '/rewards',
  },
  locations: {
    title: "Mateo's Taqueria Arlington Location & Directions",
    description:
      "Find Mateo's Taqueria at 2425 SE Green Oaks Blvd, Suite 103, Arlington, TX 76018, and get directions or catering contact details.",
    path: '/locations',
  },
  about: {
    title: "Our Story | Mateo's Taqueria Arlington",
    description:
      "Learn about Mateo's Taqueria and our love for fresh ingredients, homemade recipes, Mexican flavors, and food that brings people together.",
    path: '/about',
  },
};

export const restaurantStructuredData = {
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: BUSINESS.name,
  description: SEO_BY_PAGE.home.description,
  url: SITE_URL,
  logo: `${SITE_URL}/images/icon.png`,
  image: DEFAULT_SOCIAL_IMAGE,
  telephone: '+1-214-799-7852',
  priceRange: '$$',
  servesCuisine: ['Mexican', 'Tex-Mex'],
  hasMenu: `${SITE_URL}/menu`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${BUSINESS.street}, ${BUSINESS.suite}`,
    addressLocality: 'Arlington',
    addressRegion: 'TX',
    postalCode: '76018',
    addressCountry: 'US',
  },
  hasMap: BUSINESS.maps,
};

export const websiteStructuredData = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BUSINESS.name,
  alternateName: "Mateo's",
  inLanguage: 'en-US',
  publisher: { '@id': restaurantStructuredData['@id'] },
};

export const structuredDataGraph = {
  '@context': 'https://schema.org',
  '@graph': [websiteStructuredData, restaurantStructuredData],
};

function upsertMeta(
  selector: string,
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function applySeoMetadata(page: Page) {
  const metadata = SEO_BY_PAGE[page];
  const canonicalUrl = `${SITE_URL}${metadata.path}`;

  document.title = metadata.title;
  document.documentElement.lang = 'en-US';
  upsertMeta('meta[name="description"]', 'name', 'description', metadata.description);
  upsertMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', BUSINESS.name);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', DEFAULT_SOCIAL_IMAGE);
  upsertMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  upsertMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '1060');
  upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');
  upsertMeta(
    'meta[property="og:image:alt"]',
    'property',
    'og:image:alt',
    'Mexican street tacos from Mateo’s Taqueria',
  );
  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
  upsertMeta(
    'meta[name="twitter:description"]',
    'name',
    'twitter:description',
    metadata.description,
  );
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', DEFAULT_SOCIAL_IMAGE);
  upsertMeta(
    'meta[name="twitter:image:alt"]',
    'name',
    'twitter:image:alt',
    'Mexican street tacos from Mateo’s Taqueria',
  );

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  let structuredData = document.head.querySelector<HTMLScriptElement>(
    '#restaurant-structured-data',
  );
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.id = 'restaurant-structured-data';
    structuredData.type = 'application/ld+json';
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify(structuredDataGraph);
}
