import React from 'react';

import { Stack, Box, Typography } from '@mui/material';

import { Actor } from '@/features/actors';
import { globalStyles } from '@/theme/styles';
import { POSTER_URL } from '@/config';

type Props = {
  actor: Actor;
};

const ActorInfos: React.FC<Props> = ({ actor }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }}>
      <Box
        sx={{
          width: { xs: '70%', sm: '50%', md: '40%' },
          margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
        }}
      >
        <Box
          sx={{
            paddingTop: '140%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'darkgrey',
            backgroundImage: `url(${POSTER_URL}${actor.profile_path})`,
          }}
        />
      </Box>
      <Box sx={{ width: { xs: '100%', md: '60%' }, color: 'text.primary' }}>
        <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }}>
          <Stack alignItems={{ xs: 'center', md: 'flex-start' }}>
            <Typography
              variant='h4'
              fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
              fontWeight='700'
              sx={{ ...globalStyles.paragraph(2, 'left') }}
            >
              {actor.name}
            </Typography>
            <Stack direction='row'>
              <Typography variant='h6' fontWeight='700'>
                {actor.birthday}
              </Typography>
              {actor.deathday && (
                <Typography variant='h6' fontWeight='700'>
                  {` - ${actor.deathday}`}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Typography
            variant='body1'
            sx={{ ...globalStyles.paragraph(5, { xs: 'center', md: 'start' }) }}
          >
            {actor.biography}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ActorInfos;
