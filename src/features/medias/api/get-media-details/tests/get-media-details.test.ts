jest.mock('@/api/client');

import API from '@/api/client';

import { getMediaDetails } from '@/features/medias';

describe('getMediaDetails', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({});

    const result = await getMediaDetails({ mediaType: 'movie', mediaId: 1 });

    expect(result).toEqual({});
    expect(APIMock.get).toHaveBeenCalledWith('/movie/1');
  });
});
