import React from 'react';
import { fireEvent, render, act, waitFor, cleanup } from '@testing-library/react';

import { MediaInfos } from '@/features/medias';
import { mediaDetails } from '@/tests/factories';

describe('MediaInfos', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(
      <MediaInfos media={mediaDetails()} onPlayButtonClicked={jest.fn()} mediaType='movie' />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('when user clicks on watch now button', () => {
    it('calls the onPlayButtonClicked function', () => {
      const onPlayButtonClickedMock = jest.fn();
      const { container } = render(
        <MediaInfos
          media={mediaDetails()}
          onPlayButtonClicked={onPlayButtonClickedMock}
          mediaType='movie'
        />,
      );

      act(() => {
        const button = container.querySelector('#media-infos-play-button');
        if (button) {
          fireEvent.click(button);
        }
      });

      waitFor(() => {
        expect(onPlayButtonClickedMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
