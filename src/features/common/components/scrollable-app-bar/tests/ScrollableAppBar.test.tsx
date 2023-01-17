import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { ScrollableAppBar } from '@/features/common';

describe('ScrollableAppBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(
      <ScrollableAppBar>
        <div id='children' />
      </ScrollableAppBar>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with children', () => {
    const { container } = render(
      <ScrollableAppBar>
        <div id='children' />
      </ScrollableAppBar>,
    );
    expect(container.querySelector('#children')).toBeDefined();
  });
});
