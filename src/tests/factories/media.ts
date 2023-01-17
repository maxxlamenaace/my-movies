import { define, random, extend } from 'cooky-cutter';

import { Media, MediaCredit, MediaDetails, MediaVideo, MediaImage } from '@/features/medias';

export const media = define<Media>({
  id: random,
  adult: false,
  overview: 'overview',
  genre_ids: (i: number) => [i],
  original_title: 'original_title',
  original_language: 'original_language',
  title: 'title',
  poster_path: 'poster_path',
  backdrop_path: 'backdrop_path',
  popularity: 10,
  vote_count: 1500,
  video: false,
  vote_average: 9,
});

export const mediaDetails = extend<Media, MediaDetails>(media, {
  budget: random,
  genres: (i: number) => [{ id: i, name: 'name' }],
  homepage: 'homepage',
  revenue: random,
  runtime: random,
  status: 'status',
  tagline: 'tagline',
});

export const mediaCredit = define<MediaCredit>({
  id: random,
  adult: false,
  gender: 1,
  known_for_department: 'known_for_department',
  name: 'name',
  original_name: 'original_name',
  popularity: 10,
  profile_path: 'profile_path',
  cast_id: 1,
  character: 'character',
  credit_id: 'credit_id',
  order: 2,
});

export const mediaImage = define<MediaImage>({
  aspect_ratio: 1,
  file_path: 'file_path',
  height: 10,
  width: 10,
});

export const mediaVideo = define<MediaVideo>({
  id: random,
  type: 'type',
  official: true,
  name: 'name',
  site: 'site',
  size: 1000,
  published_at: () => new Date(),
  key: 'key',
});
