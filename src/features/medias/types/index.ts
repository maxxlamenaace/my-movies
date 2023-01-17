export type MediaType = 'movie' | 'tv';
export type MediaCategory = 'popular' | 'top_rated';
export type MediaImageType = 'poster' | 'backdrop';

export type Media = {
  id: number;
  poster_path?: string;
  adult: boolean;
  overview: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  media_type?: MediaType;
  title?: string; // Only for movies
  name?: string; // Only for series
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  release_date?: string; // Only for movies
  first_air_date?: string; // Only for series
};

export type MediaDetails = {
  id: number;
  budget: number;
  genres: Genre[];
  homepage: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
} & Media;

export type MediaCredit = {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type MediaVideo = {
  id: number;
  type: string;
  official: boolean;
  name: string;
  site: string;
  size: number;
  published_at: Date;
  key: string;
};

export type MediaImage = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
};

/* export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  iso_639_1: string;
  name: string;
}; */

export type Genre = {
  id: number;
  name: string;
};
