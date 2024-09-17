import { Ticket } from '~/shared/session-state.interface';

import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';

import { TicketItem } from '../components/TicketItem';
import { CreateTicketBtnDialog } from './CreateTicketBtnDialog';

export const TicketList = ({
  tickets,
  sessionId,
}: {
  tickets: Ticket[];
  sessionId: string;
}) => {
  return (
    <>
      <div className={cn(['w-full mb-2', 'flex justify-center'])}>Tickets</div>
      <div className={cn(['p-4', 'rounded-md border'])}>
        <ScrollArea
          title="card-list"
          className={cn(['h-[700px]', 'flex gap-4 flex-col'])}
        >
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <TicketItem ticket={ticket} />
              <div className="p-2"></div>
            </div>
          ))}
        </ScrollArea>
        <CreateTicketBtnDialog sessionId={sessionId} />
      </div>
    </>
  );
};
