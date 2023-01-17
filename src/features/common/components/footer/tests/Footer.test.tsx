import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';

import { Footer } from '@/features/common';
import { menuIcons } from '@/config/ui/menu-icons';

describe('Footer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<Footer />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with as many buttons menus as needed', () => {
    const { container } = render(<Footer />, { wrapper: BrowserRouter });
    expect(container.querySelectorAll('#footer-menu-button')).toHaveLength(menuIcons.length);
  });

  it('renders with a logo', () => {
    const { container } = render(<Footer />, { wrapper: BrowserRouter });
    expect(container.querySelector('#logo')).toBeDefined();
  });
});
