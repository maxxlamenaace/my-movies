import { Media } from '@/features/medias';

export type Actor = {
  id: number;
  birthday: string;
  known_for_department: string;
  deathday?: string;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;
};

export type ActorImage = {
  id: number;
  profiles: ActorImageProfile[];
};

export type ActorImageProfile = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
};

export type ActorDetails = {
  credits: Media[];
} & Actor;
