import React from 'react';

import { Box, Stack, Typography, IconButton, Button, Divider, Chip } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { MediaDetails, CircularRate, MediaCredit, CastSlide, MediaType } from '@/features/medias';
import { useFavoritesStore } from '@/stores';
import { globalStyles } from '@/theme/styles';
import { BACKDROP_URL } from '@/config';

type Props = {
  mediaType: MediaType;
  media: MediaDetails;
  hasVideos?: boolean;
  credits?: MediaCredit[];
  onPlayButtonClicked: () => void;
};

const MediaInfos: React.FC<Props> = ({
  mediaType,
  media,
  hasVideos = true,
  credits = [],
  onPlayButtonClicked,
}) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }}>
      <Box
        sx={{
          width: { xs: '70%', sm: '50%', md: '40%' },
          margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
        }}
      >
        <Box
          sx={{
            paddingTop: '140%',
            ...globalStyles.backgroundImage(
              `${BACKDROP_URL}${media.poster_path || media.backdrop_path}`,
            ),
          }}
        />
      </Box>

      <Box sx={{ width: { xs: '100%', md: '60%' }, color: 'text.primary' }}>
        <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }}>
          <Stack>
            <Typography
              variant='h4'
              fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
              fontWeight='700'
              sx={{ ...globalStyles.paragraph(2, 'left') }}
            >
              {media.title || media.name}
            </Typography>
            <Stack direction='row'>
              <Typography variant='h6' fontWeight='700'>
                {media.release_date || media.first_air_date}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction='row' spacing={1} alignItems='center'>
            <CircularRate value={media.vote_average} />
            <Divider orientation='vertical' />
            {media.genres.map((genre, index) => (
              <Chip key={index} label={genre.name} variant='filled' color='primary' />
            ))}
          </Stack>

          <Typography
            variant='body1'
            sx={{ ...globalStyles.paragraph(5, { xs: 'center', md: 'start' }) }}
          >
            {media.overview}
          </Typography>

          <Stack direction='row' spacing={2} justifyContent='space-between'>
            <IconButton
              color='primary'
              onClick={() =>
                toggleFavorite({
                  mediaId: media.id,
                  mediaType: mediaType,
                })
              }
            >
              {isFavorite(media.id) ? <FavoriteIcon /> : <FavoriteIconOutlined />}
            </IconButton>

            {hasVideos && (
              <Button
                id='media-infos-play-button'
                variant='contained'
                sx={{ width: 'max-content' }}
                size='large'
                startIcon={<PlayArrowIcon />}
                onClick={onPlayButtonClicked}
              >
                watch now
              </Button>
            )}
          </Stack>

          {credits.length > 0 && <CastSlide credits={credits} />}
        </Stack>
      </Box>
    </Box>
  );
};

export default MediaInfos;
