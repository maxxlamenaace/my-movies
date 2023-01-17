jest.mock('@/api/client');

import API from '@/api/client';

import { search } from '@/features/search';

describe('search', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request for series', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({
      results: [],
    });

    const result = await search({ type: 'serie', query: 'test' });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith('/search/tv', {
      params: { query: 'test', page: 1 },
    });
  });

  it('does a GET request for movies', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({
      results: [],
    });

    const result = await search({ type: 'movie', query: 'test' });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith('/search/movie', {
      params: { query: 'test', page: 1 },
    });
  });

  it('does a GET request for actors', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({
      results: [],
    });

    const result = await search({ type: 'actor', query: 'test' });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith('/search/person', {
      params: { query: 'test', page: 1 },
    });
  });
});
