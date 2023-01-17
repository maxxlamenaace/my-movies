import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { SearchType, search } from '@/features/search';
import { Media } from '@/features/medias';
import { Actor } from '@/features/actors';

export const useSearch = ({
  query,
  type,
  currentPage = 1,
}: {
  query: string;
  type: SearchType;
  currentPage?: number;
}) => {
  const [state, setState] = useState<{
    loading: boolean;
    error?: string;
    results: (Media | Actor)[];
  }>({ loading: false, results: [] });

  const searchData = useCallback(async () => {
    try {
      setState({ ...state, loading: true });

      const results = await search({ type, query, page: currentPage });

      setState({
        error: undefined,
        loading: false,
        results: currentPage === 1 ? results : [...state.results, ...results],
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        ...state,
        loading: false,
        error: error.message,
      });
    }
  }, [type, query, currentPage]);

  useEffect(() => {
    if (query) {
      searchData();
    } else {
      setState({
        loading: false,
        results: [],
      });
    }
  }, [type, query, currentPage]);

  return state;
};
