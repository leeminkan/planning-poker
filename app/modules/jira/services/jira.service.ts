import { QueryIssueDto, SetupApiKeyDto, SetupSyncDto } from '~/shared/jira.dto';

import { getAuthAxiosInstance } from '~/axios';

import {
  GetJiraIssueResponse,
  GetJiraResponse,
  SetupApiKeyResponse,
  SetupSyncResponse,
} from './types';

export const setupJiraApiKeyApi = async (payload: SetupApiKeyDto) => {
  const res = await getAuthAxiosInstance().post<SetupApiKeyResponse>(
    `/api/jira/setup-api-key`,
    payload,
  );
  return res.data.data;
};

export const setupJiraSyncApi = async (payload: SetupSyncDto) => {
  const res = await getAuthAxiosInstance().post<SetupSyncResponse>(
    `/api/jira/setup-sync`,
    payload,
  );
  return res.data.data;
};

export const getJiraIssueApi = async (payload: QueryIssueDto) => {
  const res = await getAuthAxiosInstance().post<GetJiraIssueResponse>(
    `/api/jira/issues`,
    payload,
  );
  return res.data.data;
};

export const getJiraApi = async () => {
  const res = await getAuthAxiosInstance().get<GetJiraResponse>(
    `/api/jira/setup`,
  );
  return res.data.data;
};
