import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { MediaVideoItem } from '@/features/medias';
import { mediaVideo } from '@/tests/factories';

describe('MediaVideoItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediaVideoItem video={mediaVideo()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
