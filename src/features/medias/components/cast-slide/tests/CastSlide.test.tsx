import React from 'react';
import { render, cleanup, act, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CastSlide } from '@/features/medias';
import { mediaCredit } from '@/tests/factories';

describe('CastSlide', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<CastSlide credits={[mediaCredit()]} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  describe('when user clicks on credit item', () => {
    it('redirects to the person details page', () => {
      const mediaCreditToDisplay = mediaCredit();
      const { container } = render(<CastSlide credits={[mediaCreditToDisplay]} />, {
        wrapper: BrowserRouter,
      });

      act(() => {
        const item = container.querySelector('#cast-slide-credit-item');
        if (item) {
          fireEvent.click(item);
        }
      });

      waitFor(() => {
        expect(global.window.location.pathname).toContain(`actors/${mediaCreditToDisplay.id}`);
      });
    });
  });
});
