import React from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { cn } from '~/lib/utils';
import { useUserSessionStore } from '~/modules/user-session/stores/user-session.store';

import { SetupJiraApiKeyForm } from './SetupJiraApiKeyForm';

export const JiraBtnDialog = () => {
  const { id } = useUserSessionStore();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(['m-0'])}>Jira</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup Jira</DialogTitle>
        </DialogHeader>
        <SetupJiraApiKeyForm
          onSuccess={() => setOpen(false)}
          userId={id}
          defaultValues={{}}
        />
      </DialogContent>
    </Dialog>
  );
};
