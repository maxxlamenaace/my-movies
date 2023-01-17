jest.mock('@/features/medias/hooks', () => ({
  ...jest.requireActual('@/features/medias/hooks'),
  useMediasList: jest.fn(),
  useMediaGenres: jest.fn(),
}));

import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, waitFor } from '@testing-library/react';

import { useMediasList, useMediaGenres } from '@/features/medias';
import { media } from '@/tests/factories';
import { MediasListPage } from '@/pages';

describe('MediasListPage', () => {
  const useMediasListMock = jest.mocked(useMediasList, true);
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

    useMediasListMock.mockImplementation(() => ({
      loading: false,
      medias: [media()],
    }));
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediasListPage />, { wrapper: BrowserRouter });

    waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('renders with an auto swiper and medias grids', () => {
    const { container } = render(<MediasListPage />, { wrapper: BrowserRouter });

    waitFor(() => {
      expect(container.querySelectorAll('.medias-grid')).toHaveLength(4);
      expect(container.querySelector('.media-auto-swiper')).toBeDefined();
    });
  });
});
