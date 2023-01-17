import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { media, genre } from '@/tests/factories';
import { MediasAutoSwiper } from '@/features/medias';
import { act } from 'react-dom/test-utils';

describe('MediasAutoSwiper', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', async () => {
    const { asFragment } = render(
      <MediasAutoSwiper medias={[media()]} mediaType='movie' genres={[genre()]} />,
      { wrapper: BrowserRouter },
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('when user clicks on watch now button', () => {
    it('redirects to the media details page', () => {
      const mediaToBeDisplayed = media();
      const { getAllByText } = render(
        <MediasAutoSwiper medias={[mediaToBeDisplayed]} mediaType='movie' genres={[genre()]} />,
        { wrapper: BrowserRouter },
      );

      act(() => {
        fireEvent.click(getAllByText('Watch now')[0]);
      });

      waitFor(() => {
        expect(global.window.location.pathname).toContain(`medias/movie/${mediaToBeDisplayed.id}`);
      });
    });
  });
});
