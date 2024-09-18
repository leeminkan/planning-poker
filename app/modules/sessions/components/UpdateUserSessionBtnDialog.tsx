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

import { UpdateUserSessionForm } from './UpdateUserSessionForm';

export const UpdateUserSessionBtnDialog = () => {
  const {
    id,
    name,
    actions: { syncUser },
  } = useUserSessionStore();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(['m-0'])}>Change Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Profile</DialogTitle>
        </DialogHeader>
        <UpdateUserSessionForm
          onSuccess={(data) => {
            setOpen(false);
            syncUser(data);
          }}
          defaultValues={{ id, name }}
        />
      </DialogContent>
    </Dialog>
  );
};
