import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { MediasList, MediasAutoSwiper, useAllMedias, useMediaGenres } from '@/features/medias';

import { Container, Wrapper } from '@/features/common';
import { globalStyles } from '@/theme/styles';
import { useAppStore } from '@/stores';

const HomePage: React.FC = () => {
  const { setLoading } = useAppStore();
  const { loading, data } = useAllMedias();
  const { genres, ...useMediaGenreState } = useMediaGenres();

  useEffect(() => {
    if (!loading && !useMediaGenreState.loading) {
      setLoading(false);
    }
  }, [loading, useMediaGenreState.loading]);

  return data ? (
    <Wrapper>
      <MediasAutoSwiper mediaType='movie' medias={data.movie.top_rated} genres={genres?.movie} />

      <Box marginTop='4rem' sx={{ ...globalStyles.container }}>
        <Container header='popular movies'>
          <MediasList mediaType='movie' medias={data.movie.popular} />
        </Container>

        <Container header='popular series'>
          <MediasList mediaType='tv' medias={data.tv.popular} />
        </Container>

        <Container header='top rated movies'>
          <MediasList mediaType='movie' medias={data.movie.top_rated} />
        </Container>

        <Container header='top rated series'>
          <MediasList mediaType='tv' medias={data.tv.top_rated} />
        </Container>
      </Box>
    </Wrapper>
  ) : null;
};

export default HomePage;
