import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { cleanup, render, act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar } from '@/features/common';
import { menuIcons } from '@/config/ui/menu-icons';
import { useThemeModeStore } from '@/stores';

describe('Sidebar', () => {
  const initialThemeStoreState = useThemeModeStore.getState();
  const toggleSidebarMock = jest.fn();

  beforeEach(() => {
    useThemeModeStore.setState(initialThemeStoreState, true);
  });

  afterEach(() => {
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
