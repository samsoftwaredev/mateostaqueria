import { describe, expect, it } from 'vitest';

import {
  applySeoMetadata,
  restaurantStructuredData,
  SEO_BY_PAGE,
  SITE_URL,
  structuredDataGraph,
} from './seo';

describe('SEO metadata', () => {
  it('defines unique metadata and canonical paths for every page', () => {
    const entries = Object.values(SEO_BY_PAGE);

    expect(new Set(entries.map(({ title }) => title)).size).toBe(entries.length);
    expect(new Set(entries.map(({ description }) => description)).size).toBe(entries.length);
    expect(entries.every(({ description }) => description.length >= 100)).toBe(true);
  });

  it('updates the document metadata when the route changes', () => {
    applySeoMetadata('catering');

    expect(document.title).toBe(SEO_BY_PAGE.catering.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      SEO_BY_PAGE.catering.description,
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE_URL}/catering`,
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      SEO_BY_PAGE.catering.title,
    );
  });

  it('publishes valid restaurant structured data', () => {
    applySeoMetadata('home');

    const script = document.querySelector('#restaurant-structured-data');
    expect(JSON.parse(script?.textContent ?? '{}')).toEqual(structuredDataGraph);
    expect(restaurantStructuredData.address.addressLocality).toBe('Arlington');
    expect(restaurantStructuredData.hasMenu).toBe(`${SITE_URL}/menu`);
    expect(restaurantStructuredData.priceRange).toBe('$$');
  });
});
