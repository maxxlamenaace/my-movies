jest.mock('@/features/medias/hooks', () => ({
  ...jest.requireActual('@/features/medias/hooks'),
  useAllMedias: jest.fn(),
  useMediaGenres: jest.fn(),
}));

import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, waitFor } from '@testing-library/react';

import { useAllMedias, useMediaGenres } from '@/features/medias';
import { media } from '@/tests/factories';
import { HomePage } from '@/pages';

describe('HomePage', () => {
  const useAllMediasMock = jest.mocked(useAllMedias, true);
  const useMediaGenresMock = jest.mocked(useMediaGenres, true);

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useMediaGenresMock.mockImplementation(() => ({
      loading: false,
      genres: { movie: [], tv: [] },
      getGenres: jest.fn(),
    }));

    useAllMediasMock.mockImplementation(() => ({
      loading: false,
      getMedias: jest.fn(),
      data: {
        movie: { top_rated: [media()], popular: [media()] },
        tv: { top_rated: [media()], popular: [media()] },
      },
    }));
  });

  it('renders correctly', () => {
    const { asFragment } = render(<HomePage />, { wrapper: BrowserRouter });

    waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('renders with an auto swiper and medias grids', () => {
    const { container } = render(<HomePage />, { wrapper: BrowserRouter });

    waitFor(() => {
      expect(container.querySelectorAll('.medias-grid')).toHaveLength(4);
      expect(container.querySelector('.media-auto-swiper')).toBeDefined();
    });
  });
});
