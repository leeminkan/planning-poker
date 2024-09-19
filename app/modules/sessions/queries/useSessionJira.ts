import { useQuery } from 'react-query';

import { getJiraApi } from '../services/jira.service';

type UseSessionJiraParams = { sessionId: string };
export const useSessionJira = ({ sessionId }: UseSessionJiraParams) => {
  const query = useQuery({
    queryKey: ['@@session', sessionId, 'jira'],
    queryFn: async () => {
      const data = await getJiraApi({ sessionId });
      return data;
    },
    cacheTime: 0,
  });

  return query;
};
