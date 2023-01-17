import React from 'react';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { CircularRate, Media, MediaType } from '@/features/medias';
import { useFavoritesStore } from '@/stores';
import { globalStyles } from '@/theme/styles';
import { POSTER_URL } from '@/config';

type Props = {
  media: Media;
  mediaType?: MediaType;
};

const MediaItem: React.FC<Props> = ({ media, mediaType }) => {
  const { isFavorite } = useFavoritesStore();

  return (
    <Link to={`/medias/${mediaType}/${media.id}`} id='media-item'>
      <Box
        sx={{
          ...globalStyles.backgroundImage(
            `${POSTER_URL}${media.poster_path || media.backdrop_path}`,
          ),
          paddingTop: '160%',
          '&:hover .media-info': {
            opacity: 1,
          },
          '&:hover .media-back-drop, &:hover .media-play-btn': { opacity: 1 },
          color: 'primary.contrastText',
        }}
      >
        {isFavorite(media.id) && (
          <FavoriteIcon
            id='favorite-icon'
            color='primary'
            sx={{ position: 'absolute', top: 10, right: 10, fontSize: '2rem' }}
          />
        )}

        <Box
          className='media-back-drop'
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: 'all 0.3s ease',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
          }}
        />

        <IconButton
          className='media-play-btn'
          sx={{
            display: { xs: 'none', md: 'flex' },
            opacity: 0,
            backgroundColor: 'primary.main',
            transition: 'all 0.3s ease',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlayArrowIcon sx={{ color: 'primary.contrastText' }} />
        </IconButton>

        <Box
          className='media-info'
          sx={{
            transition: 'all 0.3s ease',
            opacity: { xs: 1, md: 0 },
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 'max-content',
            boxSizing: 'border-box',
            padding: { xs: '10px', md: '2rem 1rem' },
          }}
        >
          <Stack spacing={1}>
            {(media.vote_average || media.vote_count) && (
              <CircularRate value={media.vote_average || media.vote_count} />
            )}
            <Typography>{media.release_date || media.first_air_date}</Typography>
            <Typography
              variant='body1'
              fontWeight='700'
              sx={{ fontSize: '1rem', ...globalStyles.paragraph(1, 'left') }}
            >
              {media.title || media.name}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default MediaItem;
