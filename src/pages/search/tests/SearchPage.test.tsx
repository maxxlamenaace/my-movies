jest.mock('@/features/search/hooks', () => ({
  ...jest.requireActual('@/features/search/hooks'),
  useSearch: jest.fn(),
}));

import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, act, cleanup, getByText, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useSearch } from '@/features/search';
import { media } from '@/tests/factories';
import { SearchPage } from '@/pages';

describe('SearchPage', () => {
  const useSearchMock = jest.mocked(useSearch, true);

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    act(() => {
      useSearchMock.mockImplementation(() => ({
        loading: false,
        results: [],
      }));
    });

    const { asFragment } = render(<SearchPage />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe('when there is a query and no results', () => {
    it('renders an error message', () => {
      act(() => {
        useSearchMock.mockImplementation(() => ({
          loading: false,
          results: [],
        }));
      });

      const { container } = render(<SearchPage />);

      act(() => {
        const searchBarTextField = container.querySelector('.search-bar-text-field');
        if (searchBarTextField) {
          userEvent.type(searchBarTextField, 'query');
        }
      });

      waitFor(() => {
        expect(getByText(container, 'No results found')).toBeDefined();
      });
    });
  });

  describe('whne there is a query and results', () => {
    it('renders with a medias grid', () => {
      act(() => {
        useSearchMock.mockImplementation(() => ({
          loading: false,
          results: [media()],
        }));
      });

      const { container } = render(<SearchPage />, { wrapper: BrowserRouter });

      act(() => {
        const searchBarTextField = container.querySelector('.search-bar-text-field');
        if (searchBarTextField) {
          userEvent.type(searchBarTextField, 'query');
        }
      });

      waitFor(() => {
        expect(getByText(container, 'No results found')).toBeUndefined();
        expect(container.querySelector('.medias-grid')).toBeDefined();
      });
    });
  });
});
