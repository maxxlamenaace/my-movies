import React, { PropsWithChildren } from 'react';

import { Box } from '@mui/material';
import { Swiper } from 'swiper/react';

const ManualSwiper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        '& .swiper-slide': {
          width: {
            xs: '50%',
            sm: '35%',
            md: '25%',
            lg: '20.5%',
          },
        },
      }}
    >
      <Swiper
        id='manual-swiper'
        slidesPerView='auto'
        grabCursor={true}
        style={{ width: '100%', height: 'max-content' }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default ManualSwiper;
