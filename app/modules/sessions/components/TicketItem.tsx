import { ExternalLinkIcon } from '@radix-ui/react-icons';

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
    <Card className={cn([isChosen ? 'text-primary bg-purple-200' : ''])}>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="break-all">{ticket.title}</CardTitle>
          {ticket.jiraIssueLink && (
            <a
              href={ticket.jiraIssueLink}
              rel="noreferrer"
              target="_blank"
              className="p-1 text-primary rounded-md border-primary border-solid border hover:bg-primary hover:text-white"
            >
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn([
            'max-h-60 p-2 min-h-20',
            'whitespace-pre-wrap break-all overflow-scroll ',
            'border-solid border-2 rounded-md',
            isChosen ? 'border-primary/50' : '',
          ])}
        >
          {ticket.description}
        </div>
      </CardContent>
      <CardFooter
        className={cn(['flex flex-row gap-2 items-center justify-between'])}
      >
        {ticket.point ? (
          <Badge variant="accent">{ticket.point}</Badge>
        ) : (
          <div></div>
        )}
        <div className="flex gap-2">
          {isChosen ? (
            <Button variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          ) : (
            <Button variant="outline" onClick={() => chooseTicket(ticket.id)}>
              Vote
            </Button>
          )}
          <UpdateTicketBtnDialog ticket={ticket} />
          <Button
            variant="destructive-outline"
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
