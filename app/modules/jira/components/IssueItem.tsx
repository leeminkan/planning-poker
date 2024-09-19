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
import { useSessionStore } from '~/modules/sessions/stores/session.store';

import { useJira } from '../queries/useJira';

export const IssueItem = ({ issue }: { issue: JiraIssue }) => {
  const { id } = useSessionStore();
  const { data: jiraData } = useJira();
  const { mutate, isLoading } = useCreateTicketMutation({
    onSuccess: () => {},
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="break-all">
          [{issue.key}] {issue.fields.summary}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <a
          href={issue.self}
          className={cn([
            'max-h-60 p-2',
            'whitespace-pre-wrap break-all overflow-scroll ',
            'border-solid border-2 rounded-md',
          ])}
        >
          {issue.self}
        </a>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            mutate({
              sessionId: id,
              title: `[${issue.key}] ${issue.fields.summary}`,
              description: issue.self,
              jiraId: jiraData?.id,
              jiraIssueId: issue.id,
            })
          }
          disabled={isLoading}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};
