import API from '@/api/client';

import { Media, MediaType } from '@/features/medias';

export const getMediaRecommendations = async ({
  mediaId,
  mediaType,
}: {
  mediaId: Media['id'];
  mediaType: MediaType;
}): Promise<Media[]> => {
  const { results } = await API.get<Record<string, never>, { id: number; results: Media[] }>(
    `/${mediaType}/${mediaId}/recommendations`,
  );

  return results;
};
