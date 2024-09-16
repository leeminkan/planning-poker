import { useQuery } from 'react-query';

import { getSessionState } from '../services/session.service';
import { useSessionStore } from '../stores/session.store';

type UseSessionStateParams = { id: string };
export const useSessionState = ({ id }: UseSessionStateParams) => {
  const {
    actions: { syncSessionState },
  } = useSessionStore();
  const query = useQuery<UseSessionStateParams>({
    queryKey: ['@@sessions', 'detail', id],
    queryFn: async () => {
      const data = await getSessionState({ id });
      // sync with SessionStore
      syncSessionState(data);
      return data;
    },
    cacheTime: 0,
  });

  return query;
};
