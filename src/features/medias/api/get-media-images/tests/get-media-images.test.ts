jest.mock('@/api/client');

import API from '@/api/client';

import { getMediaImages } from '@/features/medias';

describe('getMediaImages', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({ id: 1, backdrops: [], posters: [] });

    const result = await getMediaImages({ mediaType: 'movie', mediaId: 1 });

    expect(result).toEqual({ backdrop: [], poster: [] });
    expect(APIMock.get).toHaveBeenCalledWith('/movie/1/images');
  });
});
