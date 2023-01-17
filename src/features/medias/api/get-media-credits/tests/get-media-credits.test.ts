jest.mock('@/api/client');

import API from '@/api/client';

import { getMediaCredits } from '@/features/medias';

describe('getMediaCredits', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({ cast: [] });

    const result = await getMediaCredits({ mediaType: 'movie', mediaId: 1 });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith('/movie/1/credits');
  });
});
