import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ManualSwiper } from '@/features/common';

describe('ManualSwiper', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<ManualSwiper />);
    expect(asFragment()).toMatchSnapshot();
  });
});
