import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Loader, AppBar, Footer } from '@/features/common';

const MainLayout: React.FC = () => {
  return (
    <>
      <Loader />
      <Box display='flex' minHeight='100vh'>
        <AppBar />
        <Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh'>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
