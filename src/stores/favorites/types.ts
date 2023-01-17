import { MediaType, Media } from '@/features/medias';

export type FavoriteItem = {
  mediaType: MediaType;
  mediaId: Media['id'];
};
