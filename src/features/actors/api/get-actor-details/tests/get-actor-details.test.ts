jest.mock('@/api/client');

import API from '@/api/client';

import { getActorDetails } from '@/features/actors';

describe('getActorDetails', () => {
  const APIMock = jest.mocked(API);

  it('does a GET request', async () => {
    await getActorDetails({ actorId: 1 });

    expect(APIMock.get).toHaveBeenCalledWith(`/person/${1}`);
  });
});
