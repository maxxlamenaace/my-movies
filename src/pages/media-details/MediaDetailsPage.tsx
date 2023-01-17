import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import {
  MediaBackgroundHeader,
  MediaInfos,
  MediaVideosSlide,
  MediaImagesSlide,
  useMediaDetails,
  MediasList,
} from '@/features/medias';

import { Container, Wrapper } from '@/features/common';
import { MediaDetailsParams } from '@/navigation/types';
import { globalStyles } from '@/theme/styles';
import { useAppStore } from '@/stores';
import { BACKDROP_URL } from '@/config';

const MediaDetailsPage: React.FC = () => {
  const { mediaType, mediaId } = useParams() as MediaDetailsParams;

  const { loading, data } = useMediaDetails(mediaType, mediaId);
  const { setLoading } = useAppStore();

  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  return data ? (
    <Wrapper>
      <MediaBackgroundHeader
        imagePath={`${BACKDROP_URL}${data.details.backdrop_path || data.details.poster_path}`}
      />
      <Box sx={{ color: 'primary.contrastText', ...globalStyles.container }}>
        <MediaInfos
          mediaType={mediaType}
          media={data.details}
          credits={data.credits}
          hasVideos={data.videos.length > 0}
          onPlayButtonClicked={() => {
            videoRef?.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </Box>

      {data.videos.length > 0 && (
        <div ref={videoRef} style={{ paddingTop: '2rem' }}>
          <Container header='videos'>
            <MediaVideosSlide videos={data.videos} />
          </Container>
        </div>
      )}

      {data.images.backdrop.length > 0 && (
        <Container header='backdrops'>
          <MediaImagesSlide images={data.images.backdrop} imageType='backdrop' />
        </Container>
      )}

      {data.images.poster.length > 0 && (
        <Container header='posters'>
          <MediaImagesSlide images={data.images.poster} imageType='poster' />
        </Container>
      )}

      {data.recommendations.length > 0 && (
        <Container header='you may also like'>
          <MediasList medias={data.recommendations} mediaType={mediaType} />
        </Container>
      )}
    </Wrapper>
  ) : null;
};

export default MediaDetailsPage;
