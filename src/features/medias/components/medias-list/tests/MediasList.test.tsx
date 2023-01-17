import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MediasList } from '@/features/medias';
import { media } from '@/tests/factories';

describe('MediasList', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediasList mediaType='movie' medias={[media()]} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as many media items as needed', () => {
    const { container } = render(<MediasList mediaType='movie' medias={[media(), media()]} />, {
      wrapper: BrowserRouter,
    });
    expect(container.querySelectorAll('#media-item')).toHaveLength(2);
  });
});
