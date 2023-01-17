import React from 'react';

import { Grid } from '@mui/material';

import { Media, FavoriteItem } from '@/features/medias';
import { useFavoritesStore } from '@/stores';

type Props = {
  medias: Media[];
};

const FavoritesGrid: React.FC<Props> = ({ medias }) => {
  const { getFavorite, toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <Grid container spacing={1} sx={{ marginRight: '-8px!important' }} className='favorite-grid'>
      {medias.map((media, index) => {
        if (isFavorite(media.id)) {
          return (
            <Grid item xs={6} sm={4} md={3} key={index} className='favorite-grid-item'>
              <FavoriteItem
                media={media}
                mediaType={getFavorite(media.id)!.mediaType}
                onFavoriteRemoved={() => {
                  toggleFavorite({
                    mediaId: media.id,
                    mediaType: getFavorite(media.id)!.mediaType,
                  });
                }}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default FavoritesGrid;
