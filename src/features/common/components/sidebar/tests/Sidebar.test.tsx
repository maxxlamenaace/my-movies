import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { cleanup, render, act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar } from '@/features/common';
import { menuIcons } from '@/config/ui/menu-icons';
import { useAuthStore, useThemeModeStore } from '@/stores';

describe('Sidebar', () => {
  const initialThemeStoreState = useThemeModeStore.getState();
  const initialAuthStoreState = useAuthStore.getState();

  const toggleSidebarMock = jest.fn();

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
    jest.resetAllMocks();
    cleanup();
  });

  it('renders correctly', () => {
    const { baseElement } = render(<Sidebar open={true} toggleSidebar={toggleSidebarMock} />, {
      wrapper: BrowserRouter,
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('renders with as many buttons menus as needed', () => {
    const { baseElement } = render(<Sidebar open={true} toggleSidebar={toggleSidebarMock} />, {
      wrapper: BrowserRouter,
    });

    expect(baseElement.querySelectorAll('#sidebar-menu-button')).toHaveLength(menuIcons.length);
  });

  it('renders with a logo', () => {
    const { baseElement } = render(<Sidebar open={true} toggleSidebar={toggleSidebarMock} />, {
      wrapper: BrowserRouter,
    });

    expect(baseElement.querySelector('#logo')).toBeDefined();
  });

  describe('when user clicks on switch theme mode', () => {
    it('updates theme mode', async () => {
      const { baseElement } = render(<Sidebar open={true} toggleSidebar={toggleSidebarMock} />, {
        wrapper: BrowserRouter,
      });

      const swithThemeButton = baseElement.querySelector('#sidebar-switch-theme');

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

  describe('when user clicks on logout', () => {
    it('logout the user and calls the toggleSidebar function', async () => {
      const { baseElement } = render(<Sidebar open={true} toggleSidebar={toggleSidebarMock} />, {
        wrapper: BrowserRouter,
      });

      const logoutButton = baseElement.querySelector('#sidebar-logout');

      expect(useAuthStore.getState().username).toEqual('username');
      expect(logoutButton).toBeDefined();

      act(() => {
        if (logoutButton) {
          fireEvent.click(logoutButton);
        }
      });

      await waitFor(() => {
        expect(useAuthStore.getState().username).toBeUndefined();
        expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when user triggers toggle sidebar', () => {
    it('calls the toggleSidebar function', () => {
      render(<Sidebar open={true} toggleSidebar={toggleSidebarMock} />, {
        wrapper: BrowserRouter,
      });

      act(() => {
        userEvent.keyboard('{esc}');
      });

      expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
    });
  });
});
