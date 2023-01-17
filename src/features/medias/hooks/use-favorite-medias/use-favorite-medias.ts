import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { FavoriteItem } from '@/stores/favorites';
import { getMediaDetails, MediaDetails } from '@/features/medias';

export const useFavoriteMedias = (favorites: FavoriteItem[]) => {
  const [state, setState] = useState<{
    loading: boolean;
    error?: string;
    favoritesDetails: MediaDetails[];
  }>({ loading: false, favoritesDetails: [] });

  const getFavoritesDetails = useCallback(async () => {
    try {
      const results = await Promise.all(
        favorites.map(async (favorite) => {
          return getMediaDetails({ mediaId: favorite.mediaId, mediaType: favorite.mediaType });
        }),
      );

      console.log(results);

      setState({
        error: undefined,
        loading: false,
        favoritesDetails: results,
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        ...state,
        loading: false,
        error: error.message,
      });
    }
  }, [favorites]);

  useEffect(() => {
    getFavoritesDetails();
  }, [favorites]);

  return state;
};
