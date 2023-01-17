import { define, random } from 'cooky-cutter';

import { Genre } from '@/features/medias';

export const genre = define<Genre>({
  id: random(),
  name: 'name',
});
