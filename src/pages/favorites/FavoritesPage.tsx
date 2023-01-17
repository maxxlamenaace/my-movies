import React, { useEffect } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { Container, Wrapper } from '@/features/common';
import { useAppStore, useFavoritesStore } from '@/stores';
import { FavoritesGrid, useFavoriteMedias } from '@/features/medias';
import { globalStyles } from '@/theme/styles';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavoritesStore();
  const { setLoading } = useAppStore();

  const { loading, favoritesDetails } = useFavoriteMedias(favorites);

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <Wrapper>
      <Box sx={{ ...globalStyles.container, display: 'flex', height: '100%' }}>
        {favoritesDetails.length > 0 ? (
          <Container header='Your favorites'>
            <FavoritesGrid medias={favoritesDetails} />
          </Container>
        ) : (
          <Box
            sx={{
              marginTop: '5rem',
              color: 'text.primary',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack spacing={2} justifyContent='center' alignItems='center' height='70%'>
              <Typography variant='h4' fontWeight='700'>
                No favorites
              </Typography>
              <Typography>
                You can add medias to your favorites and you will find all of them here.
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};

export default FavoritesPage;
