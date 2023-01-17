import { renderHook, act } from '@testing-library/react';

import { useThemeModeStore } from '@/stores';

describe('Theme mode store', () => {
  describe('when first create', () => {
    it('initialize default state', () => {
      const { result } = renderHook(() => useThemeModeStore());

      expect(result.current.mode).toEqual('dark');
    });
  });

  describe('when switchMode', () => {
    it('updates the theme mode', () => {
      const { result } = renderHook(() => useThemeModeStore());

      expect(result.current.mode).toEqual('dark');

      act(() => {
        result.current.switchMode();
      });

      expect(result.current.mode).toEqual('light');
    });
  });

  describe('when isDark', () => {
    it('returns true if actual mode is dark', () => {
      const { result } = renderHook(() => useThemeModeStore());
      expect(result.current.isDark()).toBeTruthy();
    });

    it('returns false if actual mode is not dark', () => {
      const { result } = renderHook(() => useThemeModeStore());

      act(() => {
        result.current.switchMode();
      });

      expect(result.current.isDark()).toBeFalsy();
    });
  });
});
