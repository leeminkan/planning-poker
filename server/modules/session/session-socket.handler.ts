import { Socket } from "socket.io";

import {
  SocketHandlerInterface,
  SocketWithUser,
} from "~/server/websocket.interfaces";
import {
  SLE_CHOOSE_CARD,
  SLE_DISCONNECT,
  SLE_JOIN_SESSION,
  SLE_PING,
  SLE_RESET_SESSION,
  SLE_SET_IS_REVEALED_SESSION,
  SSE_INIT_SESSION,
  SSE_PING,
  SSE_SYNC_SESSION,
  SSE_SYNC_USER,
} from "~/shared/socket-event";
import {
  SLEChooseCardPayload,
  SLEJoinSessionPayload,
  SLEResetSessionPayload,
  SLESetIsRevealedSessionPayload,
  SSESyncSessionPayload,
  SSESyncUserPayload,
} from "~/shared/socket-event.types";

import { userSessionRepository } from "../user-session/user-session.repository";
import { sessionStateRepository } from "./session-state.repository";
import { getFormattedSessionRoom } from "./utils";

export class SessionSocket implements SocketHandlerInterface {
  handleConnection(socket: Socket) {
    const socketWithUser = this.initUser(socket);

    socketWithUser.emit(SSE_PING, "Ping from server!");
    socketWithUser.on(SLE_PING, (value) => {
      console.log("Received", value);
    });

    socketWithUser.on(
      SLE_JOIN_SESSION,
      ({ sessionId, name }: SLEJoinSessionPayload) => {
        console.log("SLE_JOIN_SESSION", { sessionId, name });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        socketWithUser.user.setCurrentSession(sessionState.id);
        if (name) {
          socketWithUser.user.setName(name);
        }
        sessionState.addNewPlayer({
          id: socketWithUser.user.id,
          name: socketWithUser.user.name,
        });

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.join(socketRoomId);
        socketWithUser.emit(
          SSE_SYNC_USER,
          socketWithUser.user as SSESyncUserPayload
        );
        socketWithUser.emit(
          SSE_INIT_SESSION,
          sessionState as SSESyncSessionPayload
        );
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      }
    );

    socketWithUser.on(
      SLE_SET_IS_REVEALED_SESSION,
      ({ sessionId, isRevealed }: SLESetIsRevealedSessionPayload) => {
        console.log("SLE_SET_IS_REVEALED_SESSION", { sessionId, isRevealed });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.setIsRevealed(isRevealed);

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      }
    );

    socketWithUser.on(
      SLE_RESET_SESSION,
      ({ sessionId }: SLEResetSessionPayload) => {
        console.log("SLE_RESET_SESSION", { sessionId });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.reset();

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      }
    );

    socketWithUser.on(
      SLE_CHOOSE_CARD,
      ({ sessionId, card }: SLEChooseCardPayload) => {
        console.log("SLE_CHOOSE_CARD", { sessionId });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.chooseCardByPlayerId(socketWithUser.user.id, card);

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      }
    );

    socketWithUser.on(SLE_DISCONNECT, () => {
      console.log("CLIENT DISCONNECT", socketWithUser.user.id);
      if (socketWithUser.user.currentSessionId) {
        const sessionState = sessionStateRepository.findById(
          socketWithUser.user.currentSessionId
        );
        if (!sessionState) return;
        sessionState.removePlayer(socketWithUser.user.id);

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middlewareImplementation(socket: Socket, next: any) {
    //Implement your middleware for session here
    return next();
  }

  initUser(socket: Socket): SocketWithUser {
    const user = userSessionRepository.create();
    (socket as SocketWithUser).user = user;
    socket.emit(SSE_SYNC_USER, user as SSESyncUserPayload);
    return socket as SocketWithUser;
  }
}
