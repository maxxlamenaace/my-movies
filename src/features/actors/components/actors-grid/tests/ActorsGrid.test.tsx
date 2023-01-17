import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { actor } from '@/tests/factories';
import { ActorsGrid } from '@/features/actors';

describe('ActorsGrid', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<ActorsGrid actors={[actor()]} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with as many actor item as needed', () => {
    const { container } = render(<ActorsGrid actors={[actor()]} />, {
      wrapper: BrowserRouter,
    });

    expect(container.querySelectorAll('.actor-grid-item')).toHaveLength(1);
  });
});
