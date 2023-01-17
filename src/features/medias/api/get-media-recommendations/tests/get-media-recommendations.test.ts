jest.mock('@/api/client');

import API from '@/api/client';

import { getMediaRecommendations } from '@/features/medias';

describe('getMediaImages', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({ id: 1, results: [] });

    const result = await getMediaRecommendations({ mediaType: 'movie', mediaId: 1 });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith('/movie/1/recommendations');
  });
});
