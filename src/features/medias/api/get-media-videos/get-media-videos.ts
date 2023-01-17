import API from '@/api/client';

import { Media, MediaType, MediaVideo } from '@/features/medias';

export const getMediaVideos = async ({
  mediaId,
  mediaType,
}: {
  mediaId: Media['id'];
  mediaType: MediaType;
}): Promise<MediaVideo[]> => {
  const { results } = await API.get<Record<string, never>, { id: number; results: MediaVideo[] }>(
    `/${mediaType}/${mediaId}/videos`,
  );

  return results;
};
