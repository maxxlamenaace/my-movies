jest.mock('@/features/medias/hooks', () => ({
  ...jest.requireActual('@/features/medias/hooks'),
  useFavoriteMedias: jest.fn(),
}));

import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, waitFor, act, getByText, renderHook } from '@testing-library/react';

import { useFavoriteMedias } from '@/features/medias';
import { mediaDetails } from '@/tests/factories';
import { useFavoritesStore } from '@/stores';
import { FavoritesPage } from '@/pages';

describe('FavoritesPage', () => {
  const useFavoriteMediasMock = jest.mocked(useFavoriteMedias, true);

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    act(() => {
      useFavoriteMediasMock.mockImplementation(() => ({
        loading: false,
        favoritesDetails: [],
      }));
    });

    const { asFragment } = render(<FavoritesPage />);

    waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when favorites array is empty', () => {
    it('renders an error message', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.favorites = [];
        useFavoriteMediasMock.mockImplementation(() => ({
          loading: false,
          favoritesDetails: [],
        }));
      });

      const { container } = render(<FavoritesPage />);

      waitFor(() => {
        expect(getByText(container, 'No favorites')).toBeDefined();
        expect(container.querySelector('.favorite-grid')).toBeUndefined();
      });
    });
  });

  describe('when favorites array is not empty', () => {
    it('renders with a favorite grid', () => {
      const favoriteMedia = mediaDetails();

      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.favorites = [{ mediaId: favoriteMedia.id, mediaType: 'movie' }];
        useFavoriteMediasMock.mockImplementation(() => ({
          loading: false,
          favoritesDetails: [favoriteMedia],
        }));
      });

      const { container } = render(<FavoritesPage />, { wrapper: BrowserRouter });

      waitFor(() => {
        expect(container.querySelector('.favorite-grid')).toBeDefined();
        expect(getByText(container, 'No favorites')).toBeUndefined();
      });
    });
  });
});
