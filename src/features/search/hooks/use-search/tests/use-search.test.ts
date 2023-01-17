jest.mock('@/features/search', () => ({
  ...jest.requireActual('@/features/search'),
  search: jest.fn().mockResolvedValue([]),
}));

import { renderHook, waitFor } from '@testing-library/react';

import { useSearch, search } from '@/features/search';

describe('useSearch', () => {
  const searchMock = jest.mocked(search, true);

  describe('when query is empty', () => {
    it('does nothing', () => {
      const { result } = renderHook(() => useSearch({ type: 'actor', query: '' }));

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.results).toEqual([]);

        expect(searchMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('when query is not empty', () => {
    it('searches medias or actors', () => {
      const { result } = renderHook(() => useSearch({ type: 'actor', query: 'query' }));

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.results).toEqual([]);

        expect(searchMock).toHaveBeenCalledWith({ type: 'actor', query: 'query', page: 1 });
      });
    });
  });
});
