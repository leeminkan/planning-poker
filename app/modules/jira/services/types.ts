import { JiraIssue } from '~/shared/jira.interface';

export type Response<T> = {
  data: T;
};

export type SetupApiKeyResponse = Response<boolean>;
export type GetJiraIssueResponse = Response<JiraIssue[]>;
