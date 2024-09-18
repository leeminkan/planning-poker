/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JiraIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    statuscategorychangedate: string;
    issuetype: {
      self: string;
      id: string;
      description: string;
      iconUrl: string;
      name: string;
      subtask: boolean;
      avatarId: number;
      entityId: string;
      hierarchyLevel: number;
    };
    timespent: null | any; // Adjust 'any' if you have more specific time tracking data
    sprint: null | any; // Adjust 'any' if you have sprint data structure
    customfield_10030: null | any;
    project: {
      self: string;
      id: string;
      key: string;
      name: string;
      projectTypeKey: string;
      simplified: boolean;
      avatarUrls: {
        '48x48': string;
        '24x24': string;
        '16x16': string;
        '32x32': string;
      };
    };
    // ... other custom fields (adjust types as needed)
    fixVersions: any[];
    aggregatetimespent: null | any;
    resolution: null | any;
    resolutiondate: null | any;
    workratio: number;
    watches: {
      self: string;
      watchCount: number;
      isWatching: boolean;
    };
    issuerestriction: {
      issuerestrictions: any;
      shouldDisplay: boolean;
    };
    lastViewed: string;
    created: string;
    epic: null | any; // Adjust 'any' if you have epic data structure
    priority: {
      self: string;
      iconUrl: string;
      name: string;
      id: string;
    };
    labels: any[];
    customfield_10018: {
      hasEpicLinkFieldDependency: boolean;
      showField: boolean;
      nonEditableReason: {
        reason: string;
        message: string;
      };
    };
    customfield_10019: string;
    timeestimate: null | any;
    aggregatetimeoriginalestimate: null | any;
    versions: any[];
    issuelinks: any[];
    assignee: null | any; // Adjust 'any' if you have assignee data structure
    updated: string;
    status: {
      self: string;
      description: string;
      iconUrl: string;
      name: string;
      id: string;
      statusCategory: {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
      };
    };
    components: any[];
    timeoriginalestimate: null | any;
    description: string;
    timetracking: any;
    security: null | any;
    aggregatetimeestimate: null | any;
    attachment: any[];
    flagged: boolean;
    summary: string;
    creator: {
      self: string;
      accountId: string;
      emailAddress: string;
      avatarUrls: {
        '48x48': string;
        '24x24': string;
        '16x16': string;
        '32x32': string;
      };
      displayName: string;
      active: boolean;
      timeZone: string;
      accountType: string;
    };
    subtasks: any[];
    reporter: {
      self: string;
      accountId: string;
      emailAddress: string;
      avatarUrls: {
        '48x48': string;
        '24x24': string;
        '16x16': string;
        '32x32': string;
      };
      displayName: string;
      active: boolean;
      timeZone: string;
      accountType: string;
    };
    aggregateprogress: {
      progress: number;
      total: number;
    };
    environment: null | any;
    duedate: null | any;
    progress: {
      progress: number;
      total: number;
    };
    votes: {
      self: string;
      votes: number;
      hasVoted: boolean;
    };
    comment: {
      comments: any[];
      self: string;
      maxResults: number;
      total: number;
      startAt: number;
    };
    worklog: {
      startAt: number;
      maxResults: number;
      total: number;
      worklogs: any[];
    };
  };
}
