jest.mock('@/features/medias', () => ({
  ...jest.requireActual('@/features/medias'),
  getMediasList: jest.fn().mockResolvedValue([]),
}));

import { renderHook, waitFor } from '@testing-library/react';

import { useAllMedias, getMediasList } from '@/features/medias';

describe('useAllMedias', () => {
  const getMediasListMock = jest.mocked(getMediasList, true);

  describe('when first render', () => {
    it('fetches all the medias', () => {
      const { result } = renderHook(() => useAllMedias());

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toEqual({
          tv: {
            top_rated: [],
            popular: [],
          },
          movie: {
            top_rated: [],
            popular: [],
          },
        });

        expect(getMediasListMock).toHaveBeenCalledTimes(4);
      });
    });
  });
});
