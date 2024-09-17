import { Ticket } from '~/shared/session-state.interface';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { cn } from '~/lib/utils';

import { UpdateTicketBtnDialog } from './UpdateTicketBtnDialog';

export const TicketItem = ({
  ticket,
  chooseTicket,
  reset,
  isChosen,
}: {
  ticket: Ticket;
  chooseTicket: (ticketId: string) => void;
  reset: () => void;
  isChosen: boolean;
}) => {
  return (
    <Card className={cn([isChosen ? 'bg-slate-500' : ''])}>
      <CardHeader
        className={cn(['flex flex-row items-center justify-between'])}
      >
        <CardTitle>{ticket.title}</CardTitle>
        <div className="flex gap-2">
          {isChosen ? (
            <Button onClick={() => reset()}>Reset</Button>
          ) : (
            <Button onClick={() => chooseTicket(ticket.id)}>Vote</Button>
          )}
          <UpdateTicketBtnDialog ticket={ticket} />
        </div>
      </CardHeader>
      <CardContent>{ticket.description}</CardContent>
    </Card>
  );
};
