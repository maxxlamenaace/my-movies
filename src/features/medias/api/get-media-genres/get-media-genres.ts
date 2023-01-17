import API from '@/api/client';

import { MediaType, Genre } from '@/features/medias';

export const getMediaGenres = async ({ mediaType }: { mediaType: MediaType }): Promise<Genre[]> => {
  const { genres } = await API.get<Record<string, never>, { genres: Genre[] }>(
    `/genre/${mediaType}/list`,
  );

  return genres;
};
