import API from '@/api/client';

import { MediaType, MediaCategory, Media } from '@/features/medias';

export const getMediasList = async ({
  mediaCategory,
  mediaType,
  page = 1,
}: {
  mediaCategory: MediaCategory;
  mediaType: MediaType;
  page?: number;
}): Promise<Media[]> => {
  const { results } = await API.get<Record<string, never>, { page: number; results: Media[] }>(
    `/${mediaType}/${mediaCategory}`,
    { params: { page } },
  );

  return results;
};
