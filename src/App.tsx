import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';

import { Routes } from '@/navigation/Routes';
import { LightTheme, DarkTheme } from '@/theme/colors';
import { useThemeModeStore } from '@/stores';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const App: React.FC = () => {
  const { isDark, mode } = useThemeModeStore();

  return (
    <ThemeProvider theme={isDark() ? DarkTheme : LightTheme}>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={mode}
      />

      <CssBaseline />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
