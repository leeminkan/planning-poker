import { create } from 'zustand';

import { JiraIssue } from '~/shared/jira.interface';

type JiraState = {
  issues: JiraIssue[];
};
type JiraAction = {
  setIssues: (jiraIssues: JiraIssue[]) => void;
};
type JiraStore = JiraState & {
  actions: JiraAction;
};
export const useJiraStore = create<JiraStore>((set) => ({
  issues: [],
  actions: {
    setIssues: (issues: JiraIssue[]) => set((state) => ({ ...state, issues })),
  },
}));
