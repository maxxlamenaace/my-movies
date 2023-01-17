jest.mock('@/features/medias', () => ({
  ...jest.requireActual('@/features/medias'),
  getMediasList: jest.fn().mockResolvedValue([]),
}));

import { renderHook, waitFor } from '@testing-library/react';

import { useMediasList, getMediasList } from '@/features/medias';

describe('useMediasList', () => {
  const getMediasListMock = jest.mocked(getMediasList, true);

  describe('when first render', () => {
    it('fetches the medias list for the specific media type', () => {
      const { result } = renderHook(() => useMediasList({ mediaType: 'movie', currentPage: 1 }));

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.medias).toEqual({
          top_rated: [],
          popular: [],
        });

        expect(getMediasListMock).toHaveBeenCalledWith({
          mediaType: 'movie',
          mediaCategory: 'top_rated',
          page: 1,
        });
      });
    });
  });
});
