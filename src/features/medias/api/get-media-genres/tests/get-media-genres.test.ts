jest.mock('@/api/client');

import API from '@/api/client';

import { getMediaGenres } from '@/features/medias';

describe('getMediaGenres', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({
      genres: [],
    });

    const result = await getMediaGenres({ mediaType: 'movie' });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith(`/genre/movie/list`);
  });
});
