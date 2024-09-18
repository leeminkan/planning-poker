import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';
import { JiraBtnDialog } from '~/modules/jira/components/JiraBtnDialog';
import { QueryIssueBtnDialog } from '~/modules/jira/components/QueryIssueBtnDialog';

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
      <div className={cn(['w-full mb-2', 'flex items-center justify-around'])}>
        <div>Tickets</div>
        <div className="flex gap-2">
          <QueryIssueBtnDialog />
          <JiraBtnDialog />
        </div>
      </div>
      <div className={cn(['p-4', 'rounded-md border'])}>
        {tickets.length ? (
          <ScrollArea className={cn(['h-[700px]', 'flex gap-4 flex-col'])}>
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
        ) : (
          <div
            className={cn(['h-[700px]', 'flex items-center justify-center'])}
          >
            Please add ticket!
          </div>
        )}

        <CreateTicketBtnDialog sessionId={sessionId} />
      </div>
    </>
  );
};
