import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import {
  Media,
  MediaType,
  MediaDetails,
  MediaImage,
  MediaImageType,
  MediaVideo,
  MediaCredit,
  getMediaCredits,
  getMediaDetails,
  getMediaImages,
  getMediaRecommendations,
  getMediaVideos,
} from '@/features/medias';

export const useMediaDetails = (mediaType: MediaType, mediaId: Media['id']) => {
  const [state, setState] = useState<{
    loading: boolean;
    error?: string;
    data?: {
      details: MediaDetails;
      images: Record<MediaImageType, MediaImage[]>;
      videos: MediaVideo[];
      credits: MediaCredit[];
      recommendations: Media[];
    };
  }>({ loading: false });

  const getMediaData = useCallback(async () => {
    try {
      setState({ loading: true });
      const [mediaDetails, mediaCredits, mediaVideos, { backdrop, poster }, mediaRecommendations] =
        await Promise.all([
          getMediaDetails({ mediaId, mediaType }),
          getMediaCredits({ mediaId, mediaType }),
          getMediaVideos({ mediaId, mediaType }),
          getMediaImages({ mediaId, mediaType }),
          getMediaRecommendations({ mediaId, mediaType }),
        ]);

      setState({
        loading: false,
        data: {
          details: mediaDetails,
          credits: mediaCredits,
          videos: mediaVideos,
          images: { backdrop, poster },
          recommendations: mediaRecommendations,
        },
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        loading: false,
        error: error.message,
      });
    }
  }, [mediaId, mediaType]);

  useEffect(() => {
    getMediaData();
  }, [mediaId, mediaType]);

  return state;
};
