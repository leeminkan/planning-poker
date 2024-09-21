import { useEffect } from 'react';

import {
  SLE_JOIN_SESSION,
  SLE_PING,
  SSE_INIT_SESSION,
  SSE_PING,
  SSE_RESET_SESSION,
  SSE_SYNC_SESSION,
  SSE_SYNC_USER,
} from '~/shared/socket-event';
import {
  SLEJoinSessionPayload,
  SSEInitSessionPayload,
  SSESyncSessionPayload,
  SSESyncUserPayload,
} from '~/shared/socket-event.types';

import { PageError } from '~/components/PageError';
import { PageLoading } from '~/components/PageLoading';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { useUserSessionStore } from '~/modules/user-session/stores/user-session.store';

import { CardTable } from '../components/CardTable';
import { PageHeader } from '../components/PageHeader';
import { PointCard } from '../components/PointCard';
import { ResultForm } from '../components/ResultForm';
import { TicketList } from '../components/TicketList';
import { cards } from '../constants';
import useTimeout from '../hooks/useTimeout';
import { useSessionState } from '../queries/useSessionState';
import SocketClient from '../socket-client';
import { useSessionStore } from '../stores/session.store';

export const SessionPage = ({ id }: { id: string }) => {
  const { isLoading, isError } = useSessionState({ id });
  const isReady = useTimeout(1000);

  if (isLoading || !isReady) {
    return <PageLoading />;
  }

  if (isError) {
    return <PageError />;
  }

  return <GameLayout id={id} />;
};

export const GameLayout = ({ id }: { id: string }) => {
  const {
    id: sessionId,
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
      resetRound,
    },
  } = useSessionStore();
  const {
    id: userId,
    actions: { syncUser },
  } = useUserSessionStore();
  const player = players.find((player) => player.id === userId);

  useEffect(() => {
    const socket = SocketClient.init(`${window.ENV.HOST}/sessions`, userId);
    socket.on('connect', () => {
      socket.emit(SLE_PING, 'Ping from client!');
      socket.emit(SLE_JOIN_SESSION, {
        sessionId: id,
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
    socket.on(SSE_RESET_SESSION, () => {
      console.log('Received SSE_RESET_SESSION');
      resetRound({ shouldEmitSocket: false });
    });

    socket.on(SSE_SYNC_USER, (userSession: SSESyncUserPayload) => {
      console.log('Received SSE_SYNC_USER', userSession);
      syncUser(userSession);
    });

    socket.on('disconnect', () => {
      console.log('Ops, socket client is disconnected!');
    });

    return () => {
      reset({ shouldEmitSocket: false });
      SocketClient.disconnect();
    };
  }, [id, reset, resetRound, syncSessionState, syncUser, userId]);

  if (!sessionId) {
    return <PageLoading />;
  }

  return (
    <div className={cn('h-screen', 'flex flex-col', 'text-primary')}>
      <PageHeader />
      <div className={cn(['grow mt-2', 'flex'])}>
        <div className={cn(['basis-1/4', 'flex justify-center'])}></div>
        <div className={cn(['basis-1/2', 'flex flex-col justify-center'])}>
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
                    variant="outline"
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
                      resetRound({ shouldEmitSocket: true });
                    }}
                    onSuccess={() => {
                      resetRound({ shouldEmitSocket: true });
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
                        enableHover={true}
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
        <div className={cn(['basis-1/4', 'flex flex-col justify-center'])}>
          <TicketList sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
};
