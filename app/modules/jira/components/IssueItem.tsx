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
        {jiraData && (
          <Button
            onClick={() =>
              mutate({
                sessionId: jiraData.sessionId,
                title: `[${issue.key}] ${issue.fields.summary}`,
                description: issue.self,
                jiraId: jiraData.id,
                jiraIssueId: issue.id,
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
