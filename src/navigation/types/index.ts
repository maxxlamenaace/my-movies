import { MediaDetails, MediaType } from '@/features/medias';
import { Actor } from '@/features/actors';

export type MediaDetailsParams = {
  mediaId: MediaDetails['id'];
  mediaType: MediaType;
};

export type MediasListParams = { mediaType: MediaType };

export type ActorDetailsParams = { actorId: Actor['id'] };
