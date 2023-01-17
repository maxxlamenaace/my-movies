import React from 'react';
import { render, cleanup, act, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { media } from '@/tests/factories';
import { MediaItem } from '@/features/medias';
import { useFavoritesStore } from '@/stores';

describe('MediaItem', () => {
  const initialFavoritesStoreState = useFavoritesStore.getState();

  beforeEach(() => {
    useFavoritesStore.setState(initialFavoritesStoreState, true);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediaItem media={media()} mediaType='movie' />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when actual item is in favorites', () => {
    it('renders with an extra favorite icon', () => {
      const item = media();
      const { container } = render(<MediaItem media={media()} mediaType='movie' />, {
        wrapper: BrowserRouter,
      });

      act(() => {
        useFavoritesStore.getState().toggleFavorite({ mediaId: item.id, mediaType: 'movie' });
      });

      expect(container.querySelector('#favorite-icon')).toBeDefined();
    });
  });

  describe('when user clicks on item', () => {
    it('redirects to the media details page', () => {
      const mediaToBeDisplayed = media();
      const { container } = render(<MediaItem media={media()} mediaType='movie' />, {
        wrapper: BrowserRouter,
      });

      act(() => {
        const item = container.querySelector('#media-item');
        if (item) {
          fireEvent.click(item);
        }
      });

      waitFor(() => {
        expect(global.window.location.pathname).toContain(`medias/movie/${mediaToBeDisplayed.id}`);
      });
    });
  });
});
