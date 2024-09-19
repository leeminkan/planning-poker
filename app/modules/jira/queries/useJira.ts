import { useQuery } from 'react-query';

import { getJiraApi } from '../services/jira.service';

export const useJira = () => {
  const query = useQuery({
    queryKey: ['@@jira', 'detail'],
    queryFn: async () => {
      const data = await getJiraApi();
      return data;
    },
    cacheTime: 0,
  });

  return query;
};
