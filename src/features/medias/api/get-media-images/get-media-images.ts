import API from '@/api/client';

import { Media, MediaType, MediaImage, MediaImageType } from '@/features/medias';

export const getMediaImages = async ({
  mediaId,
  mediaType,
}: {
  mediaId: Media['id'];
  mediaType: MediaType;
}): Promise<Record<MediaImageType, MediaImage[]>> => {
  const { backdrops, posters } = await API.get<
    Record<string, never>,
    { id: number; backdrops: MediaImage[]; posters: MediaImage[] }
  >(`/${mediaType}/${mediaId}/images`);

  return {
    backdrop: backdrops,
    poster: posters,
  };
};
