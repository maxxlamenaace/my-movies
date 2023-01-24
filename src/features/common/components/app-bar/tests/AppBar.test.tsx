import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { cleanup, render, act, fireEvent, waitFor } from '@testing-library/react';

import { AppBar } from '@/features/common';
import { menuIcons } from '@/config/ui/menu-icons';
import { useThemeModeStore, useAuthStore } from '@/stores';

describe('AppBar', () => {
  const initialThemeStoreState = useThemeModeStore.getState();
  const initialAuthStoreState = useAuthStore.getState();

  beforeEach(() => {
    useThemeModeStore.setState(initialThemeStoreState, true);
    useAuthStore.setState(
      {
        ...initialAuthStoreState,
        username: 'username',
      },
      true,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<AppBar />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with as many buttons menus as needed', () => {
    const { container } = render(<AppBar />, {
      wrapper: BrowserRouter,
    });

    expect(container.querySelectorAll('#top-bar-menu-button')).toHaveLength(menuIcons.length);
  });

  it('renders with a logo', () => {
    const { container } = render(<AppBar />, {
      wrapper: BrowserRouter,
    });

    expect(container.querySelector('#logo')).toBeDefined();
  });

  describe('when user clicks on switch theme mode', () => {
    it('updates theme mode', async () => {
      const { container } = render(<AppBar />, {
        wrapper: BrowserRouter,
      });

      const swithThemeButton = container.querySelector('#top-bar-switch-theme');

      expect(useThemeModeStore.getState().mode).toEqual('dark');
      expect(swithThemeButton).toBeDefined();

      act(() => {
        if (swithThemeButton) {
          fireEvent.click(swithThemeButton);
        }
      });

      await waitFor(() => expect(useThemeModeStore.getState().mode).toEqual('light'));
    });
  });

  describe('when user click on logout', () => {
    it('logout the user', async () => {
      const { container } = render(<AppBar />, {
        wrapper: BrowserRouter,
      });

      const logoutButton = container.querySelector('#top-bar-logout');

      expect(useAuthStore.getState().username).toEqual('username');
      expect(logoutButton).toBeDefined();

      act(() => {
        if (logoutButton) {
          fireEvent.click(logoutButton);
        }
      });

      await waitFor(() => expect(useAuthStore.getState().username).toBeUndefined());
    });
  });
});
