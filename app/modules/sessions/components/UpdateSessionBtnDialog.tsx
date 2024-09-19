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

import { useSessionStore } from '../stores/session.store';
import { UpdateSessionForm } from './UpdateSessionForm';

export const UpdateSessionBtnDialog = () => {
  const { id, name } = useSessionStore();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(['m-0'])}>Edit Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Session</DialogTitle>
        </DialogHeader>
        <UpdateSessionForm
          onSuccess={() => setOpen(false)}
          defaultValues={{ id, name }}
        />
      </DialogContent>
    </Dialog>
  );
};
