jest.mock('@/features/medias', () => ({
  ...jest.requireActual('@/features/medias'),
  getMediaDetails: jest.fn().mockResolvedValueOnce({}),
  getMediaCredits: jest.fn().mockResolvedValueOnce([]),
  getMediaImages: jest.fn().mockResolvedValueOnce({ backdrop: [], poster: [] }),
  getMediaVideos: jest.fn().mockResolvedValueOnce([]),
  getMediaRecommendations: jest.fn().mockResolvedValueOnce([]),
}));

import { renderHook, waitFor } from '@testing-library/react';

import {
  useMediaDetails,
  getMediaDetails,
  getMediaCredits,
  getMediaImages,
  getMediaVideos,
  getMediaRecommendations,
} from '@/features/medias';

describe('useMediaDetails', () => {
  const getMediaDetailsMock = jest.mocked(getMediaDetails, true);
  const getMediaCreditsMock = jest.mocked(getMediaCredits, true);
  const getMediaImagesMock = jest.mocked(getMediaImages, true);
  const getMediaVideosMock = jest.mocked(getMediaVideos, true);
  const getMediaRecommendationsMock = jest.mocked(getMediaRecommendations, true);

  describe('when first render', () => {
    it('fetches the media details', () => {
      const { result } = renderHook(() => useMediaDetails('movie', 1));

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toEqual({
          details: {},
          videos: [],
          images: { backdrop: [], poster: [] },
          credits: [],
          recommendations: [],
          reviews: [],
        });

        expect(getMediaDetailsMock).toHaveBeenCalledTimes(1);
        expect(getMediaCreditsMock).toHaveBeenCalledTimes(1);
        expect(getMediaImagesMock).toHaveBeenCalledTimes(1);
        expect(getMediaVideosMock).toHaveBeenCalledTimes(1);
        expect(getMediaRecommendationsMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
