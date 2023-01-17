import React, { useEffect, useState } from 'react';
import { Paper, Box, LinearProgress, Toolbar } from '@mui/material';

import { useAppStore } from '@/stores';
import { Logo } from '@/features/common';

const Loader: React.FC = () => {
  const { loading } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <Paper
      sx={{
        opacity: isLoading ? 1 : 0,
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
