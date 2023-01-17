import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, act, fireEvent, waitFor, cleanup } from '@testing-library/react';

import { ActorItem } from '@/features/actors';
import { actor } from '@/tests/factories';

describe('ActorItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<ActorItem actor={actor()} />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when user clicks on actor item', () => {
    it('redirects to the actor details page', () => {
      const actorToBeDisplayed = actor();
      const { container } = render(<ActorItem actor={actor()} />, {
        wrapper: BrowserRouter,
      });

      act(() => {
        const item = container.querySelector('.actor-item');
        if (item) {
          fireEvent.click(item);
        }
      });

      waitFor(() => {
        expect(global.window.location.pathname).toContain(`actors/${actorToBeDisplayed.id}`);
      });
    });
  });
});
