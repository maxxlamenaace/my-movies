import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { Loader } from '@/features/common';

describe('Loader', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<Loader />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
