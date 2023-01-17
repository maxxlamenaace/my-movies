jest.mock('@/features/medias', () => ({
  ...jest.requireActual('@/features/medias'),
  getMediaGenres: jest.fn().mockResolvedValue([]),
}));

import { renderHook, waitFor } from '@testing-library/react';

import { useMediaGenres, getMediaGenres } from '@/features/medias';

describe('useMediaGenres', () => {
  const getMediaGenresMock = jest.mocked(getMediaGenres, true);

  describe('when first render', () => {
    it('fetches the media genres', () => {
      const { result } = renderHook(() => useMediaGenres());

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.genres).toEqual({
          tv: [],
          movie: [],
        });

        expect(getMediaGenresMock).toHaveBeenCalledTimes(2);
      });
    });
  });
});
