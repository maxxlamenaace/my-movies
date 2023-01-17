import React from 'react';

import { useTheme, Box } from '@mui/material';

import { globalStyles } from '@/theme/styles';

type Props = {
  imagePath: string;
};

const MediaBackgroundHeader: React.FC<Props> = ({ imagePath }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        zIndex: '-1',
        position: 'relative',
        paddingTop: { xs: '60%', sm: '40%', md: '35%' },
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundImage: `url(${imagePath})`,
        backgroundAttachment: 'fixed',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          ...globalStyles.verticalGradientBackgroundImage[theme.palette.mode],
        },
      }}
    />
  );
};

export default MediaBackgroundHeader;
