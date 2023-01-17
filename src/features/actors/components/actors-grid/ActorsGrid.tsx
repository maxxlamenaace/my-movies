import React from 'react';

import { Grid } from '@mui/material';

import { Actor, ActorItem } from '@/features/actors';

type Props = {
  actors: Actor[];
};

const ActorsGrid: React.FC<Props> = ({ actors }) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        paddingBottom: 2,
        paddingRight: 2,
        marginTop: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {actors.map((actor, index) => (
        <Grid item xs={6} sm={4} md={3} key={index} className='actor-grid-item'>
          <ActorItem actor={actor} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorsGrid;
