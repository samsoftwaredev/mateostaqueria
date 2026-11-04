import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import WebApp from './AppPlatform.web';
import { SEO_BY_PAGE } from './seo';

describe('web application', () => {
  it('keeps the document vertically scrollable on desktop', () => {
    render(<WebApp />);

    expect(getComputedStyle(document.body).overflowY).toBe('auto');
  });

  it('navigates to the menu and filters dishes by search', () => {
    render(<WebApp />);

    fireEvent.click(screen.getAllByRole('link', { name: /^Menu$/ })[0]!);
    expect(screen.getByRole('heading', { name: 'EXPLORE THE MENU' })).toBeInTheDocument();
    expect(document.title).toBe(SEO_BY_PAGE.menu.title);

    fireEvent.change(screen.getByPlaceholderText('Search menu...'), {
      target: { value: 'flan' },
    });
    expect(screen.getByText('Homemade Flan')).toBeInTheDocument();
    expect(screen.queryByText('Street Taco Plate')).not.toBeInTheDocument();
  });

  it('adds an item to the local demo bag', () => {
    render(<WebApp />);

    fireEvent.click(screen.getByLabelText('Add Street Taco Plate'));

    expect(screen.getByLabelText('Open bag with 1 items')).toBeInTheDocument();
    expect(window.localStorage.getItem('mateos-demo-cart')).toContain('street-tacos');
  });

  it('renders a catering estimate from the selected package and guest count', () => {
    window.history.replaceState({}, '', '/catering');
    render(<WebApp />);

    const guestInput = screen.getByLabelText('Guests');
    fireEvent.change(guestInput, { target: { value: '45' } });

    expect(screen.getByText('$945.00')).toBeInTheDocument();
    expect(screen.getByText('45 guests × $21.00 per person')).toBeInTheDocument();
  });
});
