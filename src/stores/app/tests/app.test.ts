import { renderHook, act } from '@testing-library/react';

import { useAppStore } from '@/stores';

describe('App store', () => {
  describe('when first create', () => {
    it('initialize default state', () => {
      const { result } = renderHook(() => useAppStore());

      expect(result.current.loading).toBeTruthy();
    });
  });

  describe('when setLoading', () => {
    it('updates the loading value', () => {
      const { result } = renderHook(() => useAppStore());

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.loading).toBeFalsy();
    });
  });
});
