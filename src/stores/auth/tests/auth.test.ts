import { renderHook, act } from '@testing-library/react';

import { useAuthStore } from '@/stores';

describe('Auth store', () => {
  describe('when first create', () => {
    it('initialize default state', () => {
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.username).toBeUndefined();
    });
  });

  describe('when authenticate', () => {
    it('updates the username value', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.authenticate('username');
      });

      expect(result.current.username).toEqual('username');
    });
  });

  describe('when logout', () => {
    it('set the username to undefined', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.authenticate('username');
        result.current.logout();
      });

      expect(result.current.username).toBeUndefined();
    });
  });

  describe('when isAuthenticated', () => {
    it('returns false if the user is not authenticated', () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.isAuthenticated()).toBeFalsy();
    });

    it('returns true when the user is authenticated', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.authenticate('username');
      });

      expect(result.current.isAuthenticated()).toBeTruthy();
    });
  });
});
