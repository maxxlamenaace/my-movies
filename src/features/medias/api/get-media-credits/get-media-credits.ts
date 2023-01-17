import API from '@/api/client';

import { Media, MediaCredit, MediaType } from '@/features/medias';

export const getMediaCredits = async ({
  mediaId,
  mediaType,
}: {
  mediaId: Media['id'];
  mediaType: MediaType;
}): Promise<MediaCredit[]> => {
  const { cast } = await API.get<Record<string, never>, { cast: MediaCredit[] }>(
    `/${mediaType}/${mediaId}/credits`,
  );

  return cast;
};
