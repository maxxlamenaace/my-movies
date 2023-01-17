import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { MainLayout } from '@/layouts';

describe('MainLayout', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MainLayout />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
