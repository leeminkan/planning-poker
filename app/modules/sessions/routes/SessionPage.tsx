import { io } from "socket.io-client";
import { useEffect } from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  SLE_JOIN_SESSION,
  SLE_PING,
  SSE_INIT_SESSION,
  SSE_PING,
  SSE_SYNC_USER,
} from "~/shared/socket-event";
import { SessionStateInterface } from "~/shared/session-state.interface";
import { UserSessionInterface } from "~/shared/user-session.interface";
import { useUserSessionStore } from "~/modules/user-session/stores/user-session.store";

import { Card } from "../components/Card";
import { ResultForm } from "../components/ResultForm";
import { useSessionStore } from "../stores/session.store";
import { cards } from "../constants";
import { useSessionState } from "../queries/useSessionState";
import { useNavigate } from "@remix-run/react";

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
    activeCard,
    isRevealed,
    players,
    averagePoint,
    actions: { setActiveCard, setIsRevealed, syncSessionState },
  } = useSessionStore();
  const {
    name,
    actions: { syncUser },
  } = useUserSessionStore();

  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:3000/sessions");

    socket.on("connect", () => {
      socket.emit(SLE_PING, "Ping from client!");
      socket.emit(SLE_JOIN_SESSION, {
        sessionId: id,
        name,
      });
    });
    socket.on(SSE_PING, (value) => {
      console.log("Received SSE_PING", value);
    });

    socket.on(SSE_INIT_SESSION, (sessionState: SessionStateInterface) => {
      console.log("Received SSE_INIT_SESSION", sessionState);
      syncSessionState(sessionState);
    });

    socket.on(SSE_SYNC_USER, (userSession: UserSessionInterface) => {
      console.log("Received SSE_SYNC_USER", userSession);
      syncUser(userSession);
    });

    socket.on("disconnect", () => {
      console.log("Ops, socket client is disconnected!");
    });

    return () => {
      socket.disconnect();
    };
  }, [id, name, syncSessionState, syncUser]);

  return (
    <div className="w-full">
      <header
        title="page-header"
        className={cn([
          "w-full p-4",
          "bg-white shadow-md",
          "flex items-center justify-between",
        ])}
      >
        <Button onClick={() => navigate(-1)}>Back</Button>
        <div>Session: {id}</div>
        <div>
          <Button>Copy Link</Button>
        </div>
      </header>
      <div title="page-body" className="w-full h-full mt-4">
        <div className="flex gap-2 justify-center">
          {!isRevealed ? (
            <Button onClick={() => setIsRevealed(true)}>Reveal</Button>
          ) : (
            <ResultForm
              averagePoint={averagePoint}
              onReset={() => {
                setIsRevealed(false);
                setActiveCard(null);
              }}
            ></ResultForm>
          )}
        </div>
        <div
          className={cn([
            "fixed inset-0",
            "flex items-center justify-center",
            "pointer-events-none",
          ])}
        >
          <div className={cn(["flex gap-2 justify-center", "py-4"])}>
            {players.map((player) => (
              <Card
                key={player.id}
                isFlipped={isRevealed}
                content={player.currentCard}
              ></Card>
            ))}
          </div>
          {!isRevealed && (
            <div
              className={cn([
                "w-full flex gap-2 justify-center",
                "fixed bottom-0",
                "py-4",
                "pointer-events-auto",
              ])}
            >
              <div className="flex items-center">You({name}):</div>
              {cards.map((card) => (
                <Card
                  key={card}
                  isFlipped={true}
                  isActive={activeCard === card}
                  content={card}
                  onClick={() => setActiveCard(card)}
                ></Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
