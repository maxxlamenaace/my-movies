import { Actor } from '@/features/actors';
import { Media } from '@/features/medias';

export type SearchType = 'movie' | 'serie' | 'actor';
export type SearchResponse = (Media | Actor)[];
