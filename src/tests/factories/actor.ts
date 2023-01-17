import { Actor } from '@/features/actors';
import { define, random } from 'cooky-cutter';

export const actor = define<Actor>({
  id: random,
  birthday: 'birthday',
  known_for_department: 'known_for_department',
  name: 'name',
  also_known_as: () => [],
  gender: 1,
  biography: 'biography',
  popularity: 100,
  place_of_birth: 'place_of_birth',
  profile_path: 'profile_path',
  adult: false,
  imdb_id: 'imdb_id',
  homepage: 'homepage',
});
