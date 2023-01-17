import API from '@/api/client';

import { Media } from '@/features/medias';

export const getActorCombinedCredits = async ({
  actorId,
}: {
  actorId: number;
}): Promise<Media[]> => {
  const { cast } = await API.get<Record<string, never>, { cast: Media[] }>(
    `/person/${actorId}/combined_credits`,
  );

  return cast;
};
