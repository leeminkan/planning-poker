import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { TicketItem } from '../components/TicketItem';
import { Ticket } from '~/shared/session-state.interface';

export const TicketList = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <>
      <div className={cn(['w-full mb-2', 'flex justify-center'])}>Tickets</div>
      <div className={cn(['p-4', 'rounded-md border'])}>
        <ScrollArea
          title="card-list"
          className={cn(['h-[700px]', 'flex gap-4 flex-col'])}
        >
          {tickets.map((ticket) => (
            <>
              <TicketItem key={ticket.id} ticket={ticket} />
              <div className="p-2"></div>
            </>
          ))}
        </ScrollArea>
        <Button className={cn(['w-full mt-2'])}>Add</Button>
      </div>
    </>
  );
};
