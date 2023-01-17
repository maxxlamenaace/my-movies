jest.mock('@/api/client');

import API from '@/api/client';

import { getMediasList } from '@/features/medias';

describe('getMediasList', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({
      page: 1,
      results: [],
    });

    const result = await getMediasList({ mediaCategory: 'popular', mediaType: 'movie' });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith(`/movie/popular`, {
      params: { page: 1 },
    });
  });
});
