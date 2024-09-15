import { useEffect } from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  SLE_JOIN_SESSION,
  SLE_PING,
  SSE_INIT_SESSION,
  SSE_PING,
  SSE_SYNC_SESSION,
  SSE_SYNC_USER,
} from "~/shared/socket-event";
import {
  SLEJoinSessionPayload,
  SSEInitSessionPayload,
  SSESyncSessionPayload,
  SSESyncUserPayload,
} from "~/shared/socket-event.types";
import { useUserSessionStore } from "~/modules/user-session/stores/user-session.store";

import { PointCard } from "../components/PointCard";
import { ResultForm } from "../components/ResultForm";
import { useSessionStore } from "../stores/session.store";
import { cards } from "../constants";
import { useSessionState } from "../queries/useSessionState";
import SocketClient from "../socket-client";
import { TicketList } from "../components/TicketList";
import { PageHeader } from "../components/PageHeader";

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
    tickets,
    actions: { chooseCardByPlayerId, setIsRevealed, syncSessionState, reset },
  } = useSessionStore();
  const {
    id: userId,
    name,
    actions: { syncUser },
  } = useUserSessionStore();
  const player = players.find((player) => player.id === userId);

  useEffect(() => {
    const socket = SocketClient.init("http://localhost:3000/sessions");

    socket.on("connect", () => {
      socket.emit(SLE_PING, "Ping from client!");
      socket.emit(SLE_JOIN_SESSION, {
        sessionId: id,
        name,
      } as SLEJoinSessionPayload);
    });
    socket.on(SSE_PING, (value) => {
      console.log("Received SSE_PING", value);
    });

    socket.on(SSE_INIT_SESSION, (sessionState: SSEInitSessionPayload) => {
      console.log("Received SSE_INIT_SESSION", sessionState);
      syncSessionState(sessionState);
    });

    socket.on(SSE_SYNC_SESSION, (sessionState: SSESyncSessionPayload) => {
      console.log("Received SSE_SYNC_SESSION", sessionState);
      syncSessionState(sessionState);
    });

    socket.on(SSE_SYNC_USER, (userSession: SSESyncUserPayload) => {
      console.log("Received SSE_SYNC_USER", userSession);
      syncUser(userSession);
    });

    socket.on("disconnect", () => {
      console.log("Ops, socket client is disconnected!");
    });

    return () => {
      SocketClient.disconnect();
    };
  }, [id, name, syncSessionState, syncUser]);

  return (
    <div className={cn("h-screen", "flex flex-col")}>
      <PageHeader id={id} />
      <div title="page-body" className={cn(["grow mt-2", "flex"])}>
        <div
          title="page-body-left"
          className={cn(["basis-1/4", "flex justify-center"])}
        >
          <div>LEFT</div>
        </div>
        <div
          title="page-body-main"
          className={cn(["basis-1/2", "flex flex-col justify-center"])}
        >
          {/* TOP */}
          <div
            className={cn(["basis-1/4", "flex justify-center items-center"])}
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
                averagePoint={averagePoint}
                onReset={() => {
                  reset();
                }}
              ></ResultForm>
            )}
          </div>
          {/* CENTER */}
          <div className={cn(["basis-1/2", "flex gap-2 justify-center"])}>
            {players.map((player) => (
              <div
                key={player.id}
                className={cn([
                  "flex flex-col gap-2 justify-center items-center",
                ])}
              >
                <PointCard
                  isFlipped={isRevealed}
                  content={player.currentCard}
                ></PointCard>
                <div>{player.name || "Anonymous user"}</div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className={cn(["flex justify-center basis-1/4"])}>
            {!isRevealed && (
              <div className={cn(["flex gap-2 justify-center"])}>
                {cards.map((card) => (
                  <PointCard
                    key={card}
                    isFlipped={true}
                    isActive={player?.currentCard === card}
                    content={card}
                    onClick={() =>
                      player && chooseCardByPlayerId(player.id, card)
                    }
                  ></PointCard>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          title="page-body-right"
          className={cn(["basis-1/4", "flex flex-col justify-center"])}
        >
          <TicketList tickets={tickets} />
        </div>
      </div>
    </div>
  );
};
