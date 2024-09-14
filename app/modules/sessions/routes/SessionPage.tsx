import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";

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

import { Card } from "../components/Card";
import { ResultForm } from "../components/ResultForm";
import { useSessionStore } from "../stores/session.store";
import { cards } from "../constants";
import { useSessionState } from "../queries/useSessionState";
import SocketClient from "../socket-client";

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
    actions: { chooseCardByPlayerId, setIsRevealed, syncSessionState, reset },
  } = useSessionStore();
  const {
    id: userId,
    name,
    actions: { syncUser },
  } = useUserSessionStore();
  const player = players.find((player) => player.id === userId);

  const navigate = useNavigate();

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
          <Button
            onClick={() => {
              navigator.clipboard
                .writeText(`http://localhost:3000/sessions/${id}`)
                .then(() => {
                  toast("Copy successfully!");
                });
            }}
          >
            Copy Link
          </Button>
        </div>
      </header>
      <div title="page-body" className="w-full h-full mt-4">
        <div className="flex gap-2 justify-center">
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
        <div
          className={cn([
            "fixed inset-0",
            "flex items-center justify-center",
            "pointer-events-none",
          ])}
        >
          <div className={cn(["flex gap-2 justify-center", "py-4"])}>
            {players.map((player) => (
              <div
                key={player.id}
                className={cn([
                  "flex flex-col gap-2 justify-center items-center",
                ])}
              >
                <Card
                  isFlipped={isRevealed}
                  content={player.currentCard}
                ></Card>
                <div>{player.name || "NO_NAME"}</div>
              </div>
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
              <div className="flex items-center">You({name || "NO_NAME"}):</div>
              {cards.map((card) => (
                <Card
                  key={card}
                  isFlipped={true}
                  isActive={player?.currentCard === card}
                  content={card}
                  onClick={() =>
                    player && chooseCardByPlayerId(player.id, card)
                  }
                ></Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
