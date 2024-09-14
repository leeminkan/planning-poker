import { Socket } from "socket.io";
import {
  SocketHandlerInterface,
  SocketWithUser,
} from "~/server/websocket.interfaces";
import {
  SLE_DISCONNECT,
  SLE_JOIN_SESSION,
  SLE_PING,
  SSE_INIT_SESSION,
  SSE_PING,
  SSE_SYNC_SESSION,
  SSE_SYNC_USER,
} from "~/shared/socket-event";
import { sessionStateRepository } from "./session-state.repository";
import { userSessionRepository } from "../user-session/user-session.repository";
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
      ({ sessionId, name }: { sessionId: string; name?: string }) => {
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.addNewPlayer(socketWithUser.user.id);
        socketWithUser.user.setCurrentSession(sessionState.id);
        if (name) {
          socketWithUser.user.setName(name);
        }

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.join(socketRoomId);
        socketWithUser.emit(SSE_SYNC_USER, socketWithUser.user);
        socketWithUser.emit(SSE_INIT_SESSION, sessionState);
        socketWithUser.to(socketRoomId).emit(SSE_SYNC_SESSION, sessionState);
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
        socketWithUser.to(socketRoomId).emit(SSE_SYNC_SESSION, sessionState);
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
    socket.emit(SSE_SYNC_USER, user);
    return socket as SocketWithUser;
  }
}
