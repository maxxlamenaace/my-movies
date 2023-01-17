import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, act, fireEvent, waitFor } from '@testing-library/react';

import { Logo } from '@/features/common';

describe('Logo', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<Logo />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when user clicks on logo', () => {
    it('redirects to the root page', () => {
      const { container } = render(<Logo />, {
        wrapper: BrowserRouter,
      });

      act(() => {
        const item = container.querySelector('#logo-link');
        if (item) {
          fireEvent.click(item);
        }
      });

      waitFor(() => {
        expect(global.window.location.href).toEqual('/');
      });
    });
  });
});
