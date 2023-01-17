import React from 'react';

import { act, fireEvent, render, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchBar } from '@/features/search';

describe('SearchBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(
      <SearchBar onChange={jest.fn()} onSearchTypeChange={jest.fn()} searchType='actor' />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('when user click on a search type button', () => {
    it('calls the onSearchTypeChange function', () => {
      const onSearchTypeChangeMock = jest.fn();
      const { container } = render(
        <SearchBar
          onChange={jest.fn()}
          onSearchTypeChange={onSearchTypeChangeMock}
          searchType='actor'
        />,
      );

      act(() => {
        const searchTypeButtons = container.querySelectorAll('.search-bar-button');
        if (searchTypeButtons.length > 0) {
          const firstSearchTypeButton = searchTypeButtons[0];
          fireEvent.click(firstSearchTypeButton);
        }
      });

      waitFor(() => {
        expect(onSearchTypeChangeMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when user type in the text field', () => {
    it('calls the onChange function', () => {
      const onChangeMock = jest.fn();
      const { container } = render(
        <SearchBar onChange={onChangeMock} onSearchTypeChange={jest.fn()} searchType='actor' />,
      );

      act(() => {
        const searchBarTextField = container.querySelector('.search-bar-text-field');
        if (searchBarTextField) {
          userEvent.type(searchBarTextField, 'query');
        }
      });

      waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledWith('query');
      });
    });
  });
});
