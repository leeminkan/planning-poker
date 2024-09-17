import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';

import { TicketItem } from '../components/TicketItem';
import { useSessionStore } from '../stores/session.store';
import { CreateTicketBtnDialog } from './CreateTicketBtnDialog';

export const TicketList = ({ sessionId }: { sessionId: string }) => {
  const {
    tickets,
    currentTicketId,
    actions: { chooseTicket, reset },
  } = useSessionStore();

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
              <TicketItem
                ticket={ticket}
                isChosen={currentTicketId === ticket.id}
                chooseTicket={chooseTicket}
                reset={reset}
              />
              <div className="p-2"></div>
            </div>
          ))}
        </ScrollArea>
        <CreateTicketBtnDialog sessionId={sessionId} />
      </div>
    </>
  );
};
