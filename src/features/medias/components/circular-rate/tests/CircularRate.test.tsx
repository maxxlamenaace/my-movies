import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { CircularRate } from '@/features/medias';

describe('CircularRate', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<CircularRate value={10} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
