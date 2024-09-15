import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Ticket } from "~/shared/session-state.interface";

export const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ticket.title}</CardTitle>
      </CardHeader>
      <CardContent>{ticket.description}</CardContent>
    </Card>
  );
};
