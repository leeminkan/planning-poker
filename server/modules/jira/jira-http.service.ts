import axios, { AxiosInstance } from 'axios';

import { JiraIssue } from '~/shared/jira.interface';

export class JiraHttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, username: string, password: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      auth: {
        username,
        password,
      },
    });
  }

  async checkValid(): Promise<boolean> {
    try {
      await this.axiosInstance.get('/rest/api/3/myself');
      return true;
    } catch (_) {
      return false;
    }
  }

  async fetchIssuesByJql(jqlQuery: string): Promise<JiraIssue[]> {
    try {
      const response = await this.axiosInstance.get('/rest/api/3/search', {
        params: {
          jql: jqlQuery,
        },
      });
      return response.data.issues;
    } catch (error) {
      console.error('Error fetching Jira issues:', error);
      throw error;
    }
  }

  async syncIssues(
    issueId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { fields }: { fields: { [key in string]: any } },
  ) {
    try {
      await this.axiosInstance.put(`/rest/api/3/issue/${issueId}`, {
        fields,
      });
    } catch (error) {
      console.error('Error sync Jira issues:', error);
      throw error;
    }
  }
}
