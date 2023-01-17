import API from '@/api/client';

import { Media, MediaType, MediaDetails } from '@/features/medias';

export const getMediaDetails = async ({
  mediaId,
  mediaType,
}: {
  mediaId: Media['id'];
  mediaType: MediaType;
}): Promise<MediaDetails> => {
  return API.get<Record<string, never>, MediaDetails>(`/${mediaType}/${mediaId}`);
};
