import React, { useEffect, useRef } from 'react';

import { Box } from '@mui/material';

import { MediaVideo } from '@/features/medias';
import { YOUTUBE_URL } from '@/config';

type Props = {
  video: MediaVideo;
};

const MediaVideoItem: React.FC<Props> = ({ video }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const height = ((iframeRef?.current?.offsetWidth || 0) * 9) / 16 + 'px';
    iframeRef.current?.setAttribute('height', height);
  }, []);

  return (
    <Box sx={{ height: 'max-content' }} id='media-video-item'>
      <iframe
        key={video.key}
        src={YOUTUBE_URL(video.key)}
        ref={iframeRef}
        width='100%'
        title={video.id.toString()}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
};

export default MediaVideoItem;
