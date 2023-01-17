import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Container } from '@/features/common';

describe('Container', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<Container />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when header is defined', () => {
    it('renders with a header', () => {
      render(<Container header='header' />);

      expect(document.querySelector('#container-header')).toBeDefined();
    });
  });

  describe('when container contains children', () => {
    it('renders with the children', () => {
      render(
        <Container>
          <div className='children' />
        </Container>,
      );

      expect(document.querySelector('#children')).toBeDefined();
    });
  });
});
