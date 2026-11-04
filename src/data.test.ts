import { describe, expect, it } from 'vitest';

import { BUSINESS, CATERING, MENU, imageUrl, money } from './data';

describe('restaurant content model', () => {
  it('keeps menu item IDs unique and prices positive', () => {
    const ids = MENU.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(MENU.every(({ price }) => price > 0)).toBe(true);
  });

  it('keeps catering package IDs unique and package details complete', () => {
    const ids = CATERING.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      CATERING.every(
        ({ includes, price, serving }) => includes.length > 0 && price > 0 && serving.length > 0,
      ),
    ).toBe(true);
  });

  it('provides valid contact and asset-path data', () => {
    expect(BUSINESS.phone).toMatch(/^\d{10}$/);
    expect(BUSINESS.website).toMatch(/^https:\/\//);
    expect(imageUrl('street-tacos.jpg')).toBe('/images/street-tacos.jpg');
  });

  it('uses dish-specific web photography for previously mismatched menu items', () => {
    const expectedPhotos = {
      'crispy-tacos': 'crispy-tacos-web.jpg',
      quesadilla: 'quesadilla-web.jpg',
      burrito: 'burrito-web.jpg',
      sopes: 'sopes-web.jpg',
      chimichanga: 'chimichanga-web.jpg',
      torta: 'torta-web.jpg',
      'huevos-rancheros': 'huevos-rancheros-web.jpg',
      'huevos-chorizo': 'huevos-chorizo-web.jpg',
    } as const;

    for (const [id, photo] of Object.entries(expectedPhotos)) {
      expect(MENU.find((item) => item.id === id)?.photo).toBe(photo);
    }
  });

  it('formats prices in US dollars', () => {
    expect(money(13.5)).toBe('$13.50');
  });
});
