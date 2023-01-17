import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { MediaType, Genre, getMediaGenres } from '@/features/medias';

export const useMediaGenres = () => {
  const [state, setState] = useState<{
    loading: boolean;
    error?: string;
    genres?: Record<MediaType, Genre[]>;
  }>({ loading: false });

  const getGenres = async () => {
    try {
      setState({ loading: true });
      const [serieGenres, movieGenres] = await Promise.all([
        getMediaGenres({ mediaType: 'tv' }),
        getMediaGenres({ mediaType: 'movie' }),
      ]);

      setState({
        loading: false,
        genres: {
          tv: serieGenres,
          movie: movieGenres,
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
    getGenres();
  }, []);

  return { ...state, getGenres };
};
