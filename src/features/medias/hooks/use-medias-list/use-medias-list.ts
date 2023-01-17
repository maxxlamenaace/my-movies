import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { MediaType, MediaCategory, Media, getMediasList } from '@/features/medias';

export const useMediasList = ({
  mediaType,
  mediaCategory = 'top_rated',
  currentPage,
}: {
  mediaType: MediaType;
  mediaCategory?: MediaCategory;
  currentPage: number;
}) => {
  const [state, setState] = useState<{
    loading: boolean;
    error?: string;
    medias: Media[];
  }>({
    loading: false,
    medias: [],
  });

  const getMedias = useCallback(async () => {
    try {
      setState({ ...state, loading: true });

      const medias = await getMediasList({ mediaType, mediaCategory, page: currentPage });

      setState({
        ...state,
        error: undefined,
        loading: false,
        medias: currentPage === 1 ? medias : [...state.medias, ...medias],
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        ...state,
        loading: false,
        error: error.message,
      });
    }
  }, [mediaCategory, mediaType, currentPage]);

  useEffect(() => {
    getMedias();
  }, [mediaCategory, mediaType, currentPage]);

  return state;
};
