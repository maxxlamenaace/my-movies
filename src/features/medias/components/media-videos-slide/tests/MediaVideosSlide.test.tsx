import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { MediaVideosSlide } from '@/features/medias';
import { mediaVideo } from '@/tests/factories';

describe('MediaVideosSlide', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediaVideosSlide videos={[mediaVideo()]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with as many media video item as needed', () => {
    const mediaVideoToBeRendered = mediaVideo();
    const { container } = render(<MediaVideosSlide videos={[mediaVideoToBeRendered]} />);

    expect(container.querySelectorAll('#media-video-item')).toHaveLength(1);
  });
});
