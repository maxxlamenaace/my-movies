import React from 'react';

import { render, cleanup } from '@testing-library/react';

import { ActorInfos } from '@/features/actors';
import { actor } from '@/tests/factories';

describe('ActorInfos', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<ActorInfos actor={actor()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
