import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Media, MediaType, MediaCategory, getMediasList } from '@/features/medias';

export const useAllMedias = () => {
  const [state, setState] = useState<{
    loading: boolean;
    error?: string;
    data?: Record<MediaType, Record<MediaCategory, Media[]>>;
  }>({ loading: false });

  const getMedias = async () => {
    try {
      setState({ loading: true });
      const [topRatedMovies, popularMovies, topRatedSeries, popularSeries] = await Promise.all([
        getMediasList({ mediaCategory: 'top_rated', mediaType: 'movie' }),
        getMediasList({ mediaCategory: 'popular', mediaType: 'movie' }),
        getMediasList({ mediaCategory: 'top_rated', mediaType: 'tv' }),
        getMediasList({ mediaCategory: 'popular', mediaType: 'tv' }),
      ]);

      setState({
        loading: false,
        data: {
          movie: {
            top_rated: topRatedMovies,
            popular: popularMovies,
          },
          tv: {
            top_rated: topRatedSeries,
            popular: popularSeries,
          },
        },
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    getMedias();
  }, []);

  return { ...state, getMedias };
};
