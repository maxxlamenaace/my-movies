import React from 'react';

import { Media, MediaType, MediaItem } from '@/features/medias';
import { ManualSwiper } from '@/features/common';
import { SwiperSlide } from 'swiper/react';

type Props = {
  medias: Media[];
  mediaType: MediaType;
};

const MediasList: React.FC<Props> = ({ mediaType, medias }) => {
  return (
    <ManualSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </ManualSwiper>
  );
};

export default MediasList;
