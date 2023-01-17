jest.mock('@/features/medias/hooks', () => ({
  ...jest.requireActual('@/features/medias/hooks'),
  useMediaDetails: jest.fn(),
}));

import React from 'react';

import { render, cleanup } from '@testing-library/react';

import { useMediaDetails } from '@/features/medias';
import { MediaDetailsPage } from '@/pages';
import { mediaDetails } from '@/tests';

describe('MediaDetailsPage', () => {
  const useMediaDetailsMock = jest.mocked(useMediaDetails, true);

  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useMediaDetailsMock.mockImplementation(() => ({
      loading: false,
      data: {
        recommendations: [],
        details: mediaDetails(),
        videos: [],
        credits: [],
        images: {
          backdrop: [],
          poster: [],
        },
      },
    }));
  });

  it('renders correctly', () => {
    const { asFragment } = render(<MediaDetailsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
