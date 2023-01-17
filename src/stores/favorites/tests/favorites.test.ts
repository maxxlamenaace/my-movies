import { renderHook, act } from '@testing-library/react';

import { useFavoritesStore } from '@/stores';

describe('Favorites store', () => {
  describe('when first create', () => {
    it('initialize default state', () => {
      const { result } = renderHook(() => useFavoritesStore());

      expect(result.current.favorites).toHaveLength(0);
    });
  });

  describe('when setFavorites', () => {
    it('updates the favorites list', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.setFavorites([
          { mediaId: 1, mediaType: 'movie' },
          { mediaId: 1, mediaType: 'tv' },
        ]);
      });

      expect(result.current.favorites).toHaveLength(2);
    });
  });

  describe('when toggleFavorite', () => {
    it('should add new favorite if it does not already exist', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.setFavorites([]);
      });

      expect(result.current.favorites).toHaveLength(0);

      act(() => {
        result.current.toggleFavorite({ mediaId: 1, mediaType: 'movie' });
      });

      expect(result.current.favorites).toHaveLength(1);
    });

    it('should remove favorite if it does already exist', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.setFavorites([
          { mediaId: 1, mediaType: 'movie' },
          { mediaId: 2, mediaType: 'tv' },
        ]);
      });

      expect(result.current.favorites).toHaveLength(2);

      act(() => {
        result.current.toggleFavorite({ mediaId: 1, mediaType: 'movie' });
      });

      expect(result.current.favorites).toHaveLength(1);
      expect(result.current.isFavorite(1)).toBeFalsy();
    });
  });

  describe('getFavorite', () => {
    it('returns undefined if the media is not in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.setFavorites([{ mediaId: 1, mediaType: 'movie' }]);
      });

      expect(result.current.getFavorite(2)).toBeUndefined();
    });

    it('returns the favorite item if the media is already in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.setFavorites([{ mediaId: 1, mediaType: 'movie' }]);
      });

      expect(result.current.getFavorite(1)).toEqual({ mediaId: 1, mediaType: 'movie' });
    });
  });

  describe('when isFavorite', () => {
    it('returns false if the media is not already in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.setFavorites([{ mediaId: 1, mediaType: 'movie' }]);
      });

      expect(result.current.isFavorite(2)).toBeFalsy();
    });

    it('returns true if the media is already in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());

      act(() => {
        result.current.setFavorites([
          { mediaId: 1, mediaType: 'movie' },
          { mediaId: 2, mediaType: 'movie' },
        ]);
      });

      expect(result.current.isFavorite(2)).toBeTruthy();
    });
  });
});
