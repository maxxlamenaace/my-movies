import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { MediasGrid } from '@/features/medias';
import { media } from '@/tests/factories';

describe('MediasGrid', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediasGrid mediaType='movie' medias={[media()]} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with as many grid item as needed', () => {
    const { container } = render(<MediasGrid mediaType='movie' medias={[media(), media()]} />, {
      wrapper: BrowserRouter,
    });

    expect(container.querySelectorAll('.media-grid-item')).toHaveLength(2);
  });
});
