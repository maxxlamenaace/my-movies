import React from 'react';

import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

import { MediaImage, MediaImageType } from '@/features/medias';
import { PaginatorSwiper, ManualSwiper } from '@/features/common';
import { BACKDROP_URL, POSTER_URL } from '@/config';

type Props = {
  images: MediaImage[];
  imageType: MediaImageType;
};

const MediaImagesSlide: React.FC<Props> = ({ images, imageType }) => {
  const CustomSwiper = imageType === 'backdrop' ? PaginatorSwiper : ManualSwiper;

  return (
    <CustomSwiper>
      {images.splice(0, 10).map((image, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: imageType === 'backdrop' ? '60%' : '160%',
              backgroundPosition: imageType === 'backdrop' ? 'top' : 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${imageType === 'backdrop' ? BACKDROP_URL : POSTER_URL}${
                image.file_path
              })`,
            }}
          />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

export default MediaImagesSlide;
