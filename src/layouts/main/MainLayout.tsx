import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Loader, AppBar, Footer } from '@/features/common';
import { AuthModal } from '@/features/auth';
import { useAuthStore } from '@/stores';

const MainLayout: React.FC = () => {
  const { isAuthenticated, authenticate } = useAuthStore();

  return (
    <>
      <Loader />
      <AuthModal isOpen={!isAuthenticated()} onSubmit={authenticate} />
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
