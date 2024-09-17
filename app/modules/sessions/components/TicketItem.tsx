import { Ticket } from '~/shared/session-state.interface';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import { UpdateTicketBtnDialog } from './UpdateTicketBtnDialog';

export const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{ticket.title}</CardTitle>
        <UpdateTicketBtnDialog ticket={ticket} />
      </CardHeader>
      <CardContent>{ticket.description}</CardContent>
    </Card>
  );
};
