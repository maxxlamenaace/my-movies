import React from 'react';
import { render } from '@testing-library/react';

import { PaginatorSwiper } from '@/features/common';

describe('PaginatorSwiper', () => {
  it('renders correctly', () => {
    const { asFragment, container } = render(
      <PaginatorSwiper>
        <div id='children' />
      </PaginatorSwiper>,
    );

    expect(container.querySelector('#children')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
