import { QueryIssueDto, SetupApiKeyDto } from '~/shared/jira.dto';

import { axiosInstance } from '~/axios';

import { GetJiraIssueResponse, SetupApiKeyResponse } from './types';

export const setupJiraApiKeyApi = async (payload: SetupApiKeyDto) => {
  const res = await axiosInstance.post<SetupApiKeyResponse>(
    `/api/jira/setup-api-key`,
    payload,
  );
  return res.data.data;
};

export const getJiraIssueApi = async (payload: QueryIssueDto) => {
  const res = await axiosInstance.post<GetJiraIssueResponse>(
    `/api/jira/issues`,
    payload,
  );
  return res.data.data;
};
