import React from 'react';

import { Ticket } from '~/shared/session-state.interface';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { cn } from '~/lib/utils';

import { UpdateTicketForm } from './UpdateTicketForm';

export const UpdateTicketBtnDialog = ({ ticket }: { ticket: Ticket }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(['m-0'])}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Ticket</DialogTitle>
        </DialogHeader>
        <UpdateTicketForm
          onSuccess={() => setOpen(false)}
          defaultValues={ticket}
        />
      </DialogContent>
    </Dialog>
  );
};
