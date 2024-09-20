import { SquareArrowOutUpRight } from 'lucide-react';

import { JiraIssue } from '~/shared/jira.interface';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { useCreateTicketMutation } from '~/modules/sessions/mutations/useCreateTicketMutation';
import { useSessionJira } from '~/modules/sessions/queries/useSessionJira';
import { useSessionStore } from '~/modules/sessions/stores/session.store';

import { getJiraIssueLink } from '../utils';

export const IssueItem = ({ issue }: { issue: JiraIssue }) => {
  const { id } = useSessionStore();
  const { data: jiraData } = useSessionJira({ sessionId: id });
  const { mutate, isLoading } = useCreateTicketMutation({
    onSuccess: () => {},
  });
  if (!id) {
    throw Error('This component belongs to Session');
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="break-all">
            [{issue.key}] {issue.fields.summary}
          </CardTitle>
          <a
            href={getJiraIssueLink(jiraData?.host, issue.key)}
            rel="noreferrer"
            target="_blank"
            className="p-2 rounded-full hover:bg-primary/20"
          >
            <SquareArrowOutUpRight className="w-4 h-4" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn([
            'max-h-80 p-2',
            'whitespace-pre-wrap break-all overflow-scroll',
            'border-solid border-2 rounded-md',
          ])}
        >
          {issue.fields.description || ''}
        </div>
      </CardContent>
      <CardFooter>
        {jiraData && (
          <Button
            onClick={() =>
              mutate({
                sessionId: jiraData.sessionId,
                title: `[${issue.key}] ${issue.fields.summary}`,
                description: issue.fields.description || '',
                jiraId: jiraData.id,
                jiraIssueId: issue.id,
                jiraIssueLink: getJiraIssueLink(jiraData?.host, issue.key),
              })
            }
            disabled={isLoading}
          >
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
