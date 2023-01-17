import React from 'react';

import { Link } from 'react-router-dom';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import { Actor } from '@/features/actors';
import { globalStyles } from '@/theme/styles';
import { POSTER_URL } from '@/config';

type Props = {
  actor: Actor;
};

const ActorItem: React.FC<Props> = ({ actor }) => {
  return (
    <Link to={`/actors/${actor.id}`} className='actor-item'>
      <Box
        sx={{
          ...globalStyles.backgroundImage(`${POSTER_URL}${actor.profile_path}`),
          paddingTop: '160%',
          '&:hover .media-info': {
            opacity: 1,
          },
          '&:hover .media-back-drop, &:hover .media-play-btn': { opacity: 1 },
          color: 'primary.contrastText',
        }}
      >
        <Box
          className='media-back-drop'
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: 'all 0.3s ease',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
          }}
        />

        <IconButton
          className='media-play-btn'
          sx={{
            display: { xs: 'none', md: 'flex' },
            opacity: 0,
            backgroundColor: 'primary.main',
            transition: 'all 0.3s ease',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PersonSearchIcon sx={{ color: 'primary.contrastText' }} />
        </IconButton>

        <Box
          className='media-info'
          sx={{
            transition: 'all 0.3s ease',
            opacity: { xs: 1, md: 0 },
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 'max-content',
            boxSizing: 'border-box',
            padding: { xs: '10px', md: '2rem 1rem' },
          }}
        >
          <Stack spacing={1}>
            <Typography
              variant='body1'
              fontWeight='700'
              sx={{ fontSize: '1rem', ...globalStyles.paragraph(1, 'left') }}
            >
              {actor.name}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default ActorItem;
