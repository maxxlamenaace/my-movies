import API from '@/api/client';

import { Actor } from '@/features/actors';

export const getActorDetails = async ({ actorId }: { actorId: number }): Promise<Actor> => {
  return API.get<Record<string, never>, Actor>(`/person/${actorId}`);
};
