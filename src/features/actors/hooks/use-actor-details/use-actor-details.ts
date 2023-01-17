import { useEffect, useCallback, useState } from 'react';

import { getActorDetails, getActorCombinedCredits, ActorDetails } from '@/features/actors';
import { toast } from 'react-toastify';

export const useActorDetails = ({ actorId }: { actorId: number }) => {
  const [state, setState] = useState<{
    loading: boolean;
    error?: string;
    actor?: ActorDetails;
  }>({ loading: false });

  const getActorData = useCallback(async () => {
    try {
      setState({ ...state, loading: true });

      const [actorDetails, actorCombinedCredits] = await Promise.all([
        getActorDetails({ actorId }),
        getActorCombinedCredits({ actorId }),
      ]);

      setState({
        loading: false,
        error: undefined,
        actor: {
          ...actorDetails,
          credits: actorCombinedCredits,
        },
      });
    } catch (error) {
      toast.error(error.message);
      setState({
        ...state,
        loading: false,
        error: error.message,
      });
    }
  }, [actorId]);

  useEffect(() => {
    getActorData();
  }, [actorId]);

  return state;
};
