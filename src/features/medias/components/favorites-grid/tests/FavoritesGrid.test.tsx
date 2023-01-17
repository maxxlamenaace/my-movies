import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { act, cleanup, render, renderHook } from '@testing-library/react';

import { mediaDetails } from '@/tests/factories';
import { FavoritesGrid } from '@/features/medias';
import { useFavoritesStore } from '@/stores';

describe('FavoritesGrid', () => {
  const media = mediaDetails();

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.setFavorites([{ mediaId: media.id, mediaType: 'movie' }]);
    });

    const { asFragment } = render(<FavoritesGrid medias={[media]} />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with as many favorite grid items as needed', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.setFavorites([{ mediaId: media.id, mediaType: 'movie' }]);
    });

    const { container } = render(<FavoritesGrid medias={[media]} />, { wrapper: BrowserRouter });

    expect(container.querySelectorAll('.favorite-grid-item')).toHaveLength(1);
  });
});
