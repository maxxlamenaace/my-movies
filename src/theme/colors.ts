import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

export type ThemeModes = 'dark' | 'light';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f44336',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#131313',
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: colors.grey['100'],
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});
