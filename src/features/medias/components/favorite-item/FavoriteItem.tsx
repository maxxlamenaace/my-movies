import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Link } from 'react-router-dom';
import { Typography, Box, IconButton, Stack, Button } from '@mui/material';

import { Media, MediaType, CircularRate } from '@/features/medias';
import { globalStyles } from '@/theme/styles';
import { POSTER_URL } from '@/config';

type Props = {
  media: Media;
  mediaType?: MediaType;
  onFavoriteRemoved: () => void;
};

const FavoriteItem: React.FC<Props> = ({ media, mediaType, onFavoriteRemoved }) => {
  return (
    <Stack spacing={0.5}>
      <Link to={`/medias/${mediaType}/${media.id}`} className='favorite-item'>
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
      <Button
        startIcon={<DeleteIcon />}
        variant='contained'
        fullWidth
        onClick={onFavoriteRemoved}
        id='favorite-item-delete-button'
      >
        <Typography sx={{ textDecoration: 'none' }} variant='button'>
          Delete
        </Typography>
      </Button>
    </Stack>
  );
};

export default FavoriteItem;
