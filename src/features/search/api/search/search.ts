import API from '@/api/client';

import { SearchResponse, SearchType } from '@/features/search';

export const search = async <T extends SearchType>({
  type,
  query,
  page = 1,
}: {
  type: T;
  query: string;
  page?: number;
}): Promise<SearchResponse> => {
  const { results } = await API.get<Record<string, never>, { results: SearchResponse }>(
    `/search/${type === 'actor' ? 'person' : type === 'serie' ? 'tv' : type}`,
    { params: { query, page } },
  );

  return results;
};
