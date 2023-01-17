import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { MediaImagesSlide } from '@/features/medias';
import { mediaImage } from '@/tests/factories';

describe('MediaImagesSlide', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(
      <MediaImagesSlide imageType='backdrop' images={[mediaImage()]} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('when image type is backdrop', () => {
    it('renders with paginator swiper', () => {
      const { container } = render(
        <MediaImagesSlide imageType='backdrop' images={[mediaImage()]} />,
      );

      expect(container.querySelector('#paginator-swiper')).toBeDefined();
    });
  });

  describe('when image type is poster', () => {
    it('renders with manual swiper', () => {
      const { container } = render(<MediaImagesSlide imageType='poster' images={[mediaImage()]} />);

      expect(container.querySelector('#manual-swiper')).toBeDefined();
    });
  });
});
