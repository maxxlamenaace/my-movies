import React from 'react';

import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { CircularRate, MediaType, Media, Genre } from '@/features/medias';
import { globalStyles } from '@/theme/styles';
import { BACKDROP_URL } from '@/config';

type Props = {
  medias?: Media[];
  genres?: Genre[];
  mediaType: MediaType;
};

const MediasAutoSwiper: React.FC<Props> = ({ medias = [], mediaType, genres }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'primary.contrastText',
        '&::before': {
          content: '""',
          width: '100%',
          height: '30%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          ...globalStyles.verticalGradientBackgroundImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        className='media-auto-swiper'
        role='swiper'
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: '100%', height: 'max-content' }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {medias.map((media, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: { xs: '130%', sm: '80%', md: '60%', lg: '45%' },
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundImage: `url(${BACKDROP_URL}${media.backdrop_path || media.poster_path})`,
              }}
            />

            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                ...globalStyles.horizontalGradientBackgroundImage[theme.palette.mode],
              }}
            />

            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                paddingX: { sm: '10px', md: '5rem', lg: '10rem' },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingX: '30px',
                  color: 'text.primary',
                  width: {
                    sm: 'unset',
                    md: '30%',
                    lg: '50%',
                  },
                }}
              >
                <Stack spacing={4} direction='column'>
                  <Typography
                    variant='h4'
                    fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                    fontWeight='700'
                    sx={{
                      ...globalStyles.paragraph(2, 'left'),
                    }}
                  >
                    {media.title || media.name}
                  </Typography>

                  <Stack direction='row' spacing={1} alignItems='center'>
                    <CircularRate value={media.vote_average} />
                    <Divider orientation='vertical' />
                    {genres &&
                      [...media.genre_ids]
                        .splice(0, 2)
                        .map((genreId, index) => (
                          <Chip
                            variant='filled'
                            color='primary'
                            key={index}
                            label={genres.find((e) => e.id === genreId)?.name}
                          />
                        ))}
                  </Stack>

                  <Typography variant='body1' sx={{ ...globalStyles.paragraph(2) }}>
                    {media.overview}
                  </Typography>

                  <Button
                    variant='contained'
                    size='large'
                    startIcon={<PlayArrowIcon />}
                    href={`/medias/${mediaType}/${media.id}`}
                    sx={{ width: 'max-content' }}
                  >
                    Watch now
                  </Button>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MediasAutoSwiper;
