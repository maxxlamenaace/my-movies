import React from 'react';

import { Grid } from '@mui/material';

import { Media, MediaType, MediaItem } from '@/features/medias';

type Props = {
  mediaType?: MediaType;
  medias: Media[];
};

const MediasGrid: React.FC<Props> = ({ mediaType, medias }) => {
  return (
    <Grid
      className='medias-grid'
      container
      spacing={1}
      sx={{
        paddingBottom: 2,
        paddingRight: 2,
        marginTop: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {medias.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} key={index} className='media-grid-item'>
          <MediaItem media={media} mediaType={mediaType || media.media_type} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediasGrid;
