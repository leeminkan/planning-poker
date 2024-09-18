import { useEffect } from 'react';

import {
  SLE_JOIN_SESSION,
  SLE_PING,
  SSE_INIT_SESSION,
  SSE_PING,
  SSE_SYNC_SESSION,
  SSE_SYNC_USER,
} from '~/shared/socket-event';
import {
  SLEJoinSessionPayload,
  SSEInitSessionPayload,
  SSESyncSessionPayload,
  SSESyncUserPayload,
} from '~/shared/socket-event.types';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useUserSessionStore } from '~/modules/user-session/stores/user-session.store';

import { CardTable } from '../components/CardTable';
import { PageHeader } from '../components/PageHeader';
import { PointCard } from '../components/PointCard';
import { ResultForm } from '../components/ResultForm';
import { TicketList } from '../components/TicketList';
import { cards } from '../constants';
import { useSessionState } from '../queries/useSessionState';
import SocketClient from '../socket-client';
import { useSessionStore } from '../stores/session.store';

export const SessionPage = ({ id }: { id: string }) => {
  const { isLoading, isError } = useSessionState({ id });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <GameLayout id={id} />;
};

export const GameLayout = ({ id }: { id: string }) => {
  const {
    isRevealed,
    players,
    averagePoint,
    currentTicketId,
    actions: {
      chooseCardByPlayerId,
      unselectCardByPlayerId,
      setIsRevealed,
      syncSessionState,
      reset,
    },
  } = useSessionStore();
  const {
    id: userId,
    name,
    actions: { syncUser },
  } = useUserSessionStore();
  const player = players.find((player) => player.id === userId);

  useEffect(() => {
    const socket = SocketClient.init(`${window.ENV.HOST}/sessions`, userId);
    socket.on('connect', () => {
      socket.emit(SLE_PING, 'Ping from client!');
      socket.emit(SLE_JOIN_SESSION, {
        sessionId: id,
        name,
      } as SLEJoinSessionPayload);
    });
    socket.on(SSE_PING, (value) => {
      console.log('Received SSE_PING', value);
    });

    socket.on(SSE_INIT_SESSION, (sessionState: SSEInitSessionPayload) => {
      console.log('Received SSE_INIT_SESSION', sessionState);
      syncSessionState(sessionState);
    });

    socket.on(SSE_SYNC_SESSION, (sessionState: SSESyncSessionPayload) => {
      console.log('Received SSE_SYNC_SESSION', sessionState);
      syncSessionState(sessionState);
    });

    socket.on(SSE_SYNC_USER, (userSession: SSESyncUserPayload) => {
      console.log('Received SSE_SYNC_USER', userSession);
      syncUser(userSession);
    });

    socket.on('disconnect', () => {
      console.log('Ops, socket client is disconnected!');
    });

    return () => {
      reset();
      SocketClient.disconnect();
    };
  }, [id, name, reset, syncSessionState, syncUser, userId]);

  return (
    <div className={cn('h-screen', 'flex flex-col')}>
      <PageHeader />
      <div title="page-body" className={cn(['grow mt-2', 'flex'])}>
        <div
          title="page-body-left"
          className={cn(['basis-1/4', 'flex justify-center'])}
        ></div>
        <div
          title="page-body-main"
          className={cn(['basis-1/2', 'flex flex-col justify-center'])}
        >
          {currentTicketId && (
            <>
              {/* TOP */}
              <div
                className={cn([
                  'basis-1/4',
                  'flex justify-center items-center',
                ])}
              >
                {!isRevealed ? (
                  <Button
                    onClick={() => {
                      setIsRevealed(true);
                    }}
                  >
                    Reveal
                  </Button>
                ) : (
                  <ResultForm
                    currentTicketId={currentTicketId}
                    averagePoint={averagePoint}
                    onReset={() => {
                      reset();
                    }}
                    onSuccess={() => {
                      reset();
                    }}
                  ></ResultForm>
                )}
              </div>
              {/* CENTER */}
              <div
                className={cn([
                  'basis-1/2',
                  'flex gap-2 justify-center',
                  'select-none',
                ])}
              >
                <CardTable />
              </div>
              {/* BOTTOM */}
              <div
                className={cn([
                  'mt-20',
                  'flex justify-center basis-1/4',
                  'select-none',
                ])}
              >
                {!isRevealed && (
                  <div className={cn(['flex gap-2 justify-center'])}>
                    {cards.map((card) => (
                      <PointCard
                        key={card}
                        isFlipped={true}
                        isActive={player?.currentCard === card}
                        content={card}
                        onClick={() => {
                          if (player) {
                            if (player.currentCard === card) {
                              unselectCardByPlayerId(player.id);
                            } else {
                              chooseCardByPlayerId(player.id, card);
                            }
                          }
                        }}
                      ></PointCard>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div
          title="page-body-right"
          className={cn(['basis-1/4', 'flex flex-col justify-center'])}
        >
          <TicketList sessionId={id} />
        </div>
      </div>
    </div>
  );
};
