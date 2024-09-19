import { JiraEntityInterface, JiraIssue } from '~/shared/jira.interface';

export type Response<T> = {
  data: T;
};

export type SetupApiKeyResponse = Response<JiraEntityInterface>;
export type SetupSyncResponse = Response<JiraEntityInterface>;
export type GetJiraIssueResponse = Response<JiraIssue[]>;
export type GetJiraResponse = Response<JiraEntityInterface>;
