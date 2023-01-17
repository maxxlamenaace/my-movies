import React from 'react';

import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import { Container } from '@/features/common';
import { MediaCredit } from '@/features/medias';
import { globalStyles } from '@/theme/styles';
import { POSTER_URL } from '@/config';

type Props = {
  credits: MediaCredit[];
};

const CastSlide: React.FC<Props> = ({ credits }) => {
  return (
    <Container header='cast'>
      <Box
        sx={{
          '& .swiper-slide': {
            width: { xs: '50%', md: '25%', lg: '20.5%' },
            color: 'primary.contrastText',
          },
        }}
      >
        <Swiper
          spaceBetween={10}
          slidesPerView='auto'
          grabCursor={true}
          style={{ width: '100%', height: 'max-content' }}
        >
          {credits.map((credit, index) => (
            <SwiperSlide key={index} id='cast-slide-credit-item'>
              <Link to={`/actors/${credit.id}`}>
                <Box
                  sx={{
                    paddingTop: '120%',
                    color: 'text.primary',
                    ...globalStyles.backgroundImage(`${POSTER_URL}${credit.profile_path}`),
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: 'max-content',
                      bottom: 0,
                      padding: '10px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                  >
                    <Typography sx={{ ...globalStyles.paragraph(1, 'left') }}>
                      {credit.name}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default CastSlide;
