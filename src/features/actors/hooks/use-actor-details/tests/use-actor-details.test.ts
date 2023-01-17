jest.mock('@/features/actors', () => ({
  ...jest.requireActual('@/features/actors'),
  getActorDetails: jest.fn().mockResolvedValue({}),
  getActorCombinedCredits: jest.fn().mockResolvedValue([]),
}));

import { renderHook, waitFor } from '@testing-library/react';

import { getActorCombinedCredits, getActorDetails, useActorDetails } from '@/features/actors';

describe('useActorDetails', () => {
  const getActorDetailsMock = jest.mocked(getActorDetails, true);
  const getActorCombinedCreditsMock = jest.mocked(getActorCombinedCredits, true);

  describe('when first render', () => {
    it('fetches the actor details and combined credits', () => {
      const { result } = renderHook(() => useActorDetails({ actorId: 1 }));

      waitFor(() => {
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toBeNull();
        expect(result.current.actor).toEqual({ credits: [] });

        expect(getActorDetailsMock).toHaveBeenCalledWith({ actorId: 1 });
        expect(getActorCombinedCreditsMock).toHaveBeenCalledWith({ actor: 1 });
      });
    });
  });
});
