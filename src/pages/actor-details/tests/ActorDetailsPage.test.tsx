jest.mock('@/features/actors/hooks', () => ({ useActorDetails: jest.fn() }));

import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { useActorDetails } from '@/features/actors';
import { actor, media } from '@/tests/factories';
import { ActorDetailsPage } from '@/pages';

describe('ActorDetailsPage', () => {
  const useActorDetailsMock = jest.mocked(useActorDetails, true);

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useActorDetailsMock.mockImplementation(() => ({
      loading: false,
      actor: {
        ...actor(),
        credits: [media()],
      },
    }));
  });

  it('renders correctly', () => {
    const { asFragment } = render(<ActorDetailsPage />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when actor contains credits', () => {
    it('renders with extra medias grid', () => {
      const { container } = render(<ActorDetailsPage />, { wrapper: BrowserRouter });
      expect(container.querySelector('.medias-grid')).toBeDefined();
    });
  });
});
