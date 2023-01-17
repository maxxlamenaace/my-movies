import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { act, cleanup, render, waitFor, fireEvent } from '@testing-library/react';

import { media } from '@/tests/factories';
import { FavoriteItem } from '@/features/medias';

describe('FavoriteItem', () => {
  const mediaToBeDisplayed = media();

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(
      <FavoriteItem media={mediaToBeDisplayed} mediaType='movie' onFavoriteRemoved={jest.fn()} />,
      {
        wrapper: BrowserRouter,
      },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when user clicks on delete button', () => {
    it('calls the onFavoriteRemoved function', () => {
      const onFavoriteRemovedMock = jest.fn();

      const { container } = render(
        <FavoriteItem
          media={mediaToBeDisplayed}
          mediaType='movie'
          onFavoriteRemoved={onFavoriteRemovedMock}
        />,
        {
          wrapper: BrowserRouter,
        },
      );

      act(() => {
        const deleteButton = container.querySelector('#favorite-item-delete-button');
        if (deleteButton) {
          fireEvent.click(deleteButton);
        }
      });

      waitFor(() => {
        expect(onFavoriteRemovedMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when user clicks on favorite item', () => {
    it('redirects to the media details page', () => {
      const { container } = render(
        <FavoriteItem media={mediaToBeDisplayed} mediaType='movie' onFavoriteRemoved={jest.fn()} />,
        {
          wrapper: BrowserRouter,
        },
      );

      act(() => {
        const item = container.querySelector('.favorite-item');
        if (item) {
          fireEvent.click(item);
        }
      });

      waitFor(() => {
        expect(global.window.location.pathname).toContain(`medias/movie/${mediaToBeDisplayed.id}`);
      });
    });
  });
});
