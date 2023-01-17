jest.mock('@/api/client');

import API from '@/api/client';

import { getActorCombinedCredits } from '@/features/actors';

describe('getActorCombinedCredits', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    (APIMock.get as jest.Mock).mockResolvedValueOnce({ cast: [] });

    const result = await getActorCombinedCredits({ actorId: 1 });

    expect(result).toEqual([]);
    expect(APIMock.get).toHaveBeenCalledWith(`/person/${1}/combined_credits`);
  });
});
