import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { MediaBackgroundHeader } from '@/features/medias';

describe('MediaBackgroundHeader', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediaBackgroundHeader imagePath='imagePath' />);

    expect(asFragment()).toMatchSnapshot();
  });
});
