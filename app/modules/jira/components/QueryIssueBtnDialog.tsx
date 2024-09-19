import React from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';
import { useSessionJira } from '~/modules/sessions/queries/useSessionJira';
import { useSessionStore } from '~/modules/sessions/stores/session.store';

import { useJiraStore } from '../stores/issue.store';
import { IssueItem } from './IssueItem';
import { QueryIssueForm } from './QueryIssueForm';

export const QueryIssueBtnDialog = () => {
  const { id } = useSessionStore();
  const [open, setOpen] = React.useState(false);
  const {
    issues,
    actions: { setIssues },
  } = useJiraStore();
  const { isLoading, data: jiraData } = useSessionJira({ sessionId: id });
  if (isLoading || !jiraData) return null;
  if (!id) {
    throw Error('This component belongs to Session');
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn(['m-0'])}>
          Query Issues
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Query Issues</DialogTitle>
        </DialogHeader>
        <QueryIssueForm
          onSuccess={(data) => {
            setIssues(data);
          }}
        />
        <div className="w-full flex flex-col items-center justify-center">
          {issues.length ? (
            <ScrollArea
              className={cn(['h-[500px] w-full ', 'flex gap-4 flex-col'])}
            >
              {issues.map((issue) => (
                <div key={issue.id}>
                  <IssueItem issue={issue} />
                  <div className="p-2"></div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div
              className={cn(['h-[500px]', 'flex items-center justify-center'])}
            >
              Please query issues with JQL!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
