import { ThickArrowRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { cn } from '~/lib/utils';

import { TicketItem } from '../components/TicketItem';
import { useSessionStore } from '../stores/session.store';
import { CreateTicketBtnDialog } from './CreateTicketBtnDialog';

const TicketListContent = () => {
  const {
    id: sessionId,
    tickets,
    currentTicketId,
    actions: { chooseTicket, resetRound },
  } = useSessionStore();

  return (
    <div className="flex flex-col justify-center z-20">
      <div className={cn(['p-4', 'rounded-md', ' bg-primary/50'])}>
        <div
          className={cn([
            'w-full mb-2',
            'flex items-center justify-around',
            'text-primary-foreground text-xl font-bold',
          ])}
        >
          <div>Tickets</div>
        </div>
        {tickets.length ? (
          <ScrollArea
            className={cn(['h-[600px] md:h-[700px]', 'flex gap-4 flex-col'])}
          >
            {tickets.map((ticket) => (
              <div key={ticket.id}>
                <TicketItem
                  ticket={ticket}
                  isChosen={currentTicketId === ticket.id}
                  chooseTicket={chooseTicket}
                  reset={() => resetRound({ shouldEmitSocket: true })}
                />
                <div className="p-2"></div>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div
            className={cn([
              'h-[600px] md:h-[700px]',
              'flex items-center justify-center',
            ])}
          >
            Please add ticket!
          </div>
        )}

        <CreateTicketBtnDialog sessionId={sessionId} />
      </div>
    </div>
  );
};

export const TicketList = () => {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className="relative h-full">
      <div
        className={cn([
          'h-full flex items-center justify-end mr-2',
          'absolute top-0 right-0',
        ])}
      >
        {showMenu ? (
          <Button
            className="rounded-none rounded-l-full bg-primary/50 hover:bg-primary/60 ml-2"
            variant="default"
            size="icon"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <ThickArrowRightIcon />
          </Button>
        ) : (
          <Button
            className="rounded-none rounded-l-full"
            variant="default"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            Tickets
          </Button>
        )}

        {showMenu && <TicketListContent />}
      </div>
    </div>
  );
};
