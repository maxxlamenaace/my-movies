import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useAppStore } from '@/stores';
import { Container, Wrapper } from '@/features/common';
import { ActorDetailsParams } from '@/navigation/types';
import { useActorDetails, ActorInfos } from '@/features/actors';
import { MediasGrid } from '@/features/medias';
import { globalStyles } from '@/theme/styles';

const ActorDetailsPage: React.FC = () => {
  const { actorId } = useParams() as ActorDetailsParams;

  const [currentIndex, setCurrentIndex] = useState(1);

  const { setLoading } = useAppStore();
  const { loading, actor } = useActorDetails({ actorId });

  const onLoadMore = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <Wrapper>
      <Toolbar />
      {actor && (
        <Box sx={{ color: 'primary.contrastText', ...globalStyles.container, paddingTop: '20px' }}>
          <ActorInfos actor={actor} />
          <Container header='Known for'>
            <MediasGrid medias={actor.credits.slice(0, currentIndex * 20)} />
            {actor.credits.length > currentIndex * 20 && (
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
            )}
          </Container>
        </Box>
      )}
    </Wrapper>
  );
};

export default ActorDetailsPage;
