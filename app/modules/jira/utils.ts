export const getJiraIssueLink = (host: string = '', issueKey: string) => {
  return `${host}/browse/${issueKey}`;
};
