import { SquareArrowOutUpRight } from 'lucide-react';

import { Ticket } from '~/shared/session-state.interface';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { cn } from '~/lib/utils';

import { useDeleteTicketMutation } from '../mutations/useDeleteTicketMutation';
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
  const { isLoading, mutate } = useDeleteTicketMutation({
    onSuccess: () => {},
  });
  return (
    <Card className={cn([isChosen ? 'bg-purple-200' : ''])}>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="break-all">{ticket.title}</CardTitle>
          {ticket.jiraIssueLink && (
            <a href={ticket.jiraIssueLink} rel="noreferrer" target="_blank">
              <SquareArrowOutUpRight />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn([
            'max-h-60 p-2',
            'whitespace-pre-wrap break-all overflow-scroll ',
            'border-solid border-2 rounded-md',
          ])}
        >
          {ticket.description}
        </div>
      </CardContent>
      <CardFooter
        className={cn(['flex flex-row gap-2 items-center justify-between'])}
      >
        {ticket.point ? <Badge>{ticket.point}</Badge> : <div></div>}
        <div className="flex gap-2">
          {isChosen ? (
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          ) : (
            <Button onClick={() => chooseTicket(ticket.id)}>Vote</Button>
          )}
          <UpdateTicketBtnDialog ticket={ticket} />
          <Button
            variant="destructive"
            onClick={() => mutate({ id: ticket.id })}
            disabled={isLoading}
          >
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
