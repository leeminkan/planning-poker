import { Player } from '~/shared/session-state.interface';

import { cn } from '~/lib/utils';

import { useSessionStore } from '../stores/session.store';
import { PointCard } from './PointCard';

export const CardTable = () => {
  const { players, isRevealed, tickets, currentTicketId } = useSessionStore();
  const playerPositions = players.reduce(
    (position, player, index) => {
      switch (index % 2) {
        case 0:
          position.top.push(player);
          break;
        case 1:
          position.bottom.push(player);
          break;
        default:
          break;
      }
      return position;
    },
    {
      top: [] as Player[],
      bottom: [] as Player[],
    },
  );

  const selectedTicket = tickets.find(
    (ticket) => ticket.id === currentTicketId,
  );

  return (
    <div
      className={cn([
        'flex flex-col gap-4 justify-center items-center',
        'text-black',
      ])}
    >
      <div className={cn(['flex items-center justify-center gap-2'])}>
        {playerPositions.top.map((player) => (
          <div
            key={player.id}
            className={cn(['flex flex-col gap-2 justify-center items-center'])}
          >
            <div>{player.name || 'Anonymous user'}</div>
            <PointCard
              isFlipped={isRevealed}
              content={player.currentCard}
            ></PointCard>
          </div>
        ))}
      </div>
      <div
        className={cn([
          'w-[300px] h-[150px] p-2',
          'flex items-center justify-center',
          'border-solid border-2 bg-green-700 rounded-lg shadow-inner',
          'text-primary-foreground font-bold',
        ])}
      >
        <p className="truncate">{selectedTicket?.title}</p>
      </div>
      <div className={cn(['flex items-center justify-center gap-2'])}>
        {playerPositions.bottom.map((player) => (
          <div
            key={player.id}
            className={cn(['flex flex-col gap-2 justify-center items-center'])}
          >
            <PointCard
              isFlipped={isRevealed}
              content={player.currentCard}
            ></PointCard>
            <div>{player.name || 'Anonymous user'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
