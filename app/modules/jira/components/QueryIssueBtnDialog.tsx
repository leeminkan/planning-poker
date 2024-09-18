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
import { useUserSessionStore } from '~/modules/user-session/stores/user-session.store';

import { useJiraStore } from '../stores/issue.store';
import { IssueItem } from './IssueItem';
import { QueryIssueForm } from './QueryIssueForm';

export const QueryIssueBtnDialog = () => {
  const { id } = useUserSessionStore();
  const [open, setOpen] = React.useState(false);
  const {
    issues,
    actions: { setIssues },
  } = useJiraStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(['m-0'])}>Query Issues</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Query Issues</DialogTitle>
        </DialogHeader>
        <QueryIssueForm
          onSuccess={(data) => {
            setIssues(data);
          }}
          userId={id}
          defaultValues={{}}
        />
        <div className="flex flex-col items-center justify-center">
          {issues.length ? (
            <ScrollArea className={cn(['h-[500px]', 'flex gap-4 flex-col'])}>
              {issues.map((issue) => (
                <div key={issue.id}>
                  <IssueItem issue={issue} />
                  <div className="p-2"></div>
                </div>
              ))}{' '}
              {issues.map((issue) => (
                <div key={issue.id}>
                  <IssueItem issue={issue} />
                  <div className="p-2"></div>
                </div>
              ))}{' '}
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
              Please add ticket!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
