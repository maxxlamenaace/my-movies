import React, { useState } from 'react';

import { SwiperSlide } from 'swiper/react';

import { PaginatorSwiper } from '@/features/common';
import { MediaVideo, MediaVideoItem } from '@/features/medias';

type Props = {
  videos: MediaVideo[];
};

const MediaVideosSlide: React.FC<Props> = ({ videos }) => {
  const [videosDisplayed] = useState<MediaVideo[]>(videos.splice(0, 5));

  return (
    <PaginatorSwiper>
      {videosDisplayed.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideoItem video={video} />
        </SwiperSlide>
      ))}
    </PaginatorSwiper>
  );
};

export default MediaVideosSlide;
