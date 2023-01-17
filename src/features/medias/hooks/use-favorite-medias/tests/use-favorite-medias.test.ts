jest.mock('@/features/medias', () => ({
  ...jest.requireActual('@/features/medias'),
  getMediasList: jest.fn().mockResolvedValue([]),
}));

import { renderHook, waitFor } from '@testing-library/react';

import { useFavoriteMedias, getMediasList } from '@/features/medias';

describe('useFavoriteMedias', () => {
  const getMediasListMock = jest.mocked(getMediasList, true);

  describe('when first render', () => {
    it('fetches all the favorite medias', () => {
      const { result } = renderHook(() => useFavoriteMedias([{ mediaId: 1, mediaType: 'movie' }]));

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.favoritesDetails).toEqual([]);

        expect(getMediasListMock).toHaveBeenCalledWith({
          mediaId: 1,
          mediaType: 'movie',
        });
      });
    });
  });

  describe('when user does not have any favorite medias', () => {
    it('fetches nothing', () => {
      const { result } = renderHook(() => useFavoriteMedias([]));

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.favoritesDetails).toEqual([]);

        expect(getMediasListMock).not.toHaveBeenCalled();
      });
    });
  });
});
