import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { MediasListParams } from '@/navigation/types';
import { globalStyles } from '@/theme/styles';
import { Wrapper } from '@/features/common';
import { useAppStore } from '@/stores';

import {
  MediaCategory,
  MediasAutoSwiper,
  useMediaGenres,
  useMediasList,
  MediasGrid,
} from '@/features/medias';

const MediasListPage: React.FC = () => {
  const { mediaType } = useParams() as MediasListParams;

  const [currentCategory, setCurrentCategory] = useState<MediaCategory>('top_rated');
  const [currentPage, setCurrentPage] = useState(1);

  const { setLoading } = useAppStore();
  const { genres } = useMediaGenres();

  const { loading, medias } = useMediasList({
    mediaType,
    mediaCategory: currentCategory,
    currentPage,
  });

  const categories: MediaCategory[] = ['top_rated', 'popular'];

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const onChangeCategory = (category: MediaCategory) => {
    setCurrentCategory(category);
  };

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Wrapper>
      <MediasAutoSwiper mediaType={mediaType} medias={medias} genres={genres?.[mediaType]} />

      <Box sx={{ ...globalStyles.container }}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          marginBottom='20px'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography fontWeight='700' variant='h5'>
            {mediaType === 'movie' ? 'Movies' : 'Series'}
          </Typography>
          <Stack direction='row' spacing={2}>
            {categories.map((category, index) => {
              const isCurrentCategory = currentCategory === category;
              return (
                <Button
                  key={index}
                  size='large'
                  variant={isCurrentCategory ? 'contained' : 'text'}
                  onClick={() => onChangeCategory(category)}
                  sx={{
                    color: isCurrentCategory ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  {category}
                </Button>
              );
            })}
          </Stack>
        </Stack>

        <MediasGrid mediaType={mediaType} medias={medias} />

        <LoadingButton
          sx={{ marginTop: 5 }}
          fullWidth
          color='primary'
          variant='contained'
          loading={loading}
          onClick={onLoadMore}
        >
          Load more
        </LoadingButton>
      </Box>
    </Wrapper>
  );
};

export default MediasListPage;
