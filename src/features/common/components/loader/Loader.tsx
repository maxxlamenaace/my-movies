import React from 'react';
import { Paper, Box, LinearProgress, Toolbar } from '@mui/material';

import { useAppStore } from '@/stores';
import { Logo } from '@/features/common';

const Loader: React.FC = () => {
  const { loading } = useAppStore();

  return (
    <Paper
      sx={{
        opacity: loading ? 1 : 0,
        pointerEvents: 'none',
        transition: 'all .3s ease',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 999,
      }}
    >
      <Toolbar />
      <LinearProgress />
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%)' }}>
        <Logo />
      </Box>
    </Paper>
  );
};

export default Loader;
