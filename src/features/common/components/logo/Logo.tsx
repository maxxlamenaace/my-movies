import React from 'react';

import { Link } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';

const Logo: React.FC = () => {
  const theme = useTheme();

  return (
    <Link to='/' style={{ textDecoration: 'none' }} id='logo-link'>
      <Typography
        fontWeight='700'
        fontSize='1.7rem'
        id='logo'
        style={{ color: theme.palette.text.primary }}
      >
        my
        <span
          style={{
            color: theme.palette.primary.main,
          }}
        >
          Movies
        </span>
      </Typography>
    </Link>
  );
};

export default Logo;
