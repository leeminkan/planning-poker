import { getAuthAxiosInstance } from '~/axios';

import { GetJiraResponse } from './types';

export const getJiraApi = async ({ sessionId }: { sessionId: string }) => {
  const res = await getAuthAxiosInstance().get<GetJiraResponse>(
    `/api/sessions/${sessionId}/jira`,
  );
  return res.data.data;
};
