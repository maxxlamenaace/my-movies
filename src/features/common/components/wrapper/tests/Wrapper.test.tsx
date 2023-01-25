import React from 'react';

import { cleanup, render, waitFor } from '@testing-library/react';

import { Wrapper } from '@/features/common';

describe('Wrapper', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(
      <Wrapper>
        <div id='children' />
      </Wrapper>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('on first render', () => {
    it('scroll to the top of the page', () => {
      render(
        <Wrapper>
          <div id='children' />
        </Wrapper>,
      );

      waitFor(() => {
        expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
      });
    });
  });
});
