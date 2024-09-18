import { useQuery } from 'react-query';

import { getRecentSessions } from '../services/session.service';

export const useRecentSessions = () => {
  const query = useQuery({
    queryKey: ['@@sessions', 'recent'],
    queryFn: async () => {
      const data = await getRecentSessions();
      return data;
    },
    cacheTime: 0,
  });

  return query;
};
